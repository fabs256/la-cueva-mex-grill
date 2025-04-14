
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export interface DailySales {
  name: string;
  sales: number;
  date: string;
}

export const useSalesData = () => {
  const [salesData, setSalesData] = useState<DailySales[]>([]);
  const [popularItems, setPopularItems] = useState<{name: string, orders: number}[]>([]);
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
      const salesByDay: Record<string, number> = {};
      
      // Initialize all days with 0 sales
      formattedDates.forEach(({ date, name }) => {
        salesByDay[date] = 0;
      });
      
      // Sum up sales by day
      if (ordersByDay) {
        ordersByDay.forEach(order => {
          const orderDate = new Date(order.created_at).toISOString().split('T')[0];
          if (salesByDay[orderDate] !== undefined) {
            salesByDay[orderDate] += Number(order.total_amount);
          }
        });
      }
      
      // Format data for the chart
      const chartData: DailySales[] = formattedDates.map(({ date, name }) => ({
        name,
        sales: salesByDay[date] || 0,
        date
      }));

      setSalesData(chartData);

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

  return { salesData, popularItems, loading, error };
};
