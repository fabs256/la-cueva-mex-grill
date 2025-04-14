
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export interface DailySales {
  name: string;
  sales: number;
  revenue: number;
  date: string;
}

export interface SalesDataResult {
  salesData: DailySales[];
  salesByDay: DailySales[];
  popularItems: {name: string, orders: number}[];
  topSellingItems: {name: string, orders: number}[];
  totalRevenue: number;
  averageOrderValue: number;
  growthRate: number;
  loading: boolean;
  error: string | null;
}

export const useSalesData = (): SalesDataResult => {
  const [salesData, setSalesData] = useState<DailySales[]>([]);
  const [salesByDay, setSalesByDay] = useState<DailySales[]>([]);
  const [popularItems, setPopularItems] = useState<{name: string, orders: number}[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [averageOrderValue, setAverageOrderValue] = useState(0);
  const [growthRate, setGrowthRate] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchSalesData = async () => {
    try {
      setLoading(true);

      // Get the dates for the last 7 days
      const today = new Date();
      const weekDays = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() - (6 - i)); // Start from 6 days ago
        return date;
      });
      
      // Format dates and get day names
      const formattedDates = weekDays.map(date => {
        return {
          date: date.toISOString().split('T')[0],
          name: date.toLocaleDateString('en-US', { weekday: 'short' })
        };
      });

      // Fetch orders grouped by day for the last 7 days
      const { data: ordersByDay, error: ordersError } = await supabase
        .from('orders')
        .select('created_at, total_amount')
        .gte('created_at', formattedDates[0].date)
        .lte('created_at', today.toISOString());

      if (ordersError) throw ordersError;

      // Group orders by day and calculate daily sales
      const salesByDayMap: Record<string, number> = {};
      
      // Initialize all days with 0 sales
      formattedDates.forEach(({ date, name }) => {
        salesByDayMap[date] = 0;
      });
      
      // Sum up sales by day
      let totalRev = 0;
      if (ordersByDay && ordersByDay.length > 0) {
        ordersByDay.forEach(order => {
          const orderDate = new Date(order.created_at).toISOString().split('T')[0];
          if (salesByDayMap[orderDate] !== undefined) {
            salesByDayMap[orderDate] += Number(order.total_amount);
            totalRev += Number(order.total_amount);
          }
        });

        // Calculate average order value
        const avgValue = totalRev / ordersByDay.length;
        setAverageOrderValue(avgValue);
        setTotalRevenue(totalRev);
        
        // Calculate growth rate (simplified)
        const firstHalfRevenue = ordersByDay
          .filter(order => {
            const date = new Date(order.created_at);
            return date < new Date(today.getTime() - 3.5 * 24 * 60 * 60 * 1000); // first 3.5 days
          })
          .reduce((sum, order) => sum + Number(order.total_amount), 0);
          
        const secondHalfRevenue = ordersByDay
          .filter(order => {
            const date = new Date(order.created_at);
            return date >= new Date(today.getTime() - 3.5 * 24 * 60 * 60 * 1000); // last 3.5 days
          })
          .reduce((sum, order) => sum + Number(order.total_amount), 0);
          
        // Calculate growth rate
        if (firstHalfRevenue > 0) {
          setGrowthRate(((secondHalfRevenue - firstHalfRevenue) / firstHalfRevenue) * 100);
        }
      } else {
        setAverageOrderValue(0);
        setTotalRevenue(0);
        setGrowthRate(0);
      }
      
      // Format data for the chart
      const chartData: DailySales[] = formattedDates.map(({ date, name }) => ({
        name,
        sales: 0,
        revenue: salesByDayMap[date] || 0,
        date
      }));

      setSalesData(chartData);
      setSalesByDay(chartData);

      // Fetch popular items (most ordered items)
      const { data: orderItems, error: itemsError } = await supabase
        .from('order_items')
        .select('name, quantity');

      if (itemsError) throw itemsError;

      // Count items by name
      const itemCounts: Record<string, number> = {};
      if (orderItems) {
        orderItems.forEach(item => {
          if (!itemCounts[item.name]) {
            itemCounts[item.name] = 0;
          }
          itemCounts[item.name] += item.quantity;
        });
      }

      // Convert to array and sort by count
      const popularItemsArray = Object.entries(itemCounts)
        .map(([name, orders]) => ({ name, orders }))
        .sort((a, b) => b.orders - a.orders)
        .slice(0, 5); // Top 5 items

      setPopularItems(popularItemsArray);
    } catch (err) {
      console.error('Error fetching sales data:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      toast({
        title: 'Error fetching sales data',
        description: 'Could not load sales data. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalesData();
    
    // Set up refresh interval - update every 15 minutes
    const intervalId = setInterval(fetchSalesData, 15 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  return { 
    salesData, 
    salesByDay,
    popularItems, 
    topSellingItems: popularItems, 
    totalRevenue, 
    averageOrderValue, 
    growthRate, 
    loading, 
    error 
  };
};
