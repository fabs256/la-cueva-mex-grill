
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export type OrderStatus = 'New' | 'In Progress' | 'Ready' | 'Completed' | 'Cancelled';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customer_name: string;
  items: OrderItem[];
  total_amount: number;
  order_status: OrderStatus;
  status?: OrderStatus; // Added for compatibility with Dashboard component
  created_at: string;
  special_instructions?: string;
  customer_email: string;
  customer_phone: string;
  time?: string; // Added for compatibility
}

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Function to fetch orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      
      // Fetch orders from the database
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;

      // For each order, fetch its items
      const ordersWithItems = await Promise.all(
        ordersData.map(async (order) => {
          const { data: orderItems, error: itemsError } = await supabase
            .from('order_items')
            .select('*')
            .eq('order_id', order.id);

          if (itemsError) throw itemsError;

          // Format the time from the timestamp
          const orderTime = new Date(order.created_at).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
          });

          return {
            ...order,
            items: orderItems || [],
            time: orderTime,
            status: order.order_status as OrderStatus,
            order_status: order.order_status as OrderStatus
          };
        })
      );

      setOrders(ordersWithItems as Order[]);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      toast({
        title: 'Error fetching orders',
        description: 'Could not load orders. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Function to update order status
  const updateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ order_status: newStatus })
        .eq('id', orderId);
        
      if (error) throw error;

      // Update local state
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId 
            ? { ...order, order_status: newStatus, status: newStatus }
            : order
        )
      );

      toast({
        title: 'Order updated',
        description: `Order #${orderId.substring(0, 8)} marked as ${newStatus}`,
      });
    } catch (err) {
      console.error('Error updating order status:', err);
      toast({
        title: 'Error updating order',
        description: 'Could not update order status. Please try again.',
        variant: 'destructive',
      });
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchOrders();
  }, []);

  // Subscribe to real-time updates
  useEffect(() => {
    fetchOrders();
    
    // Set up realtime subscription for orders table
    const channel = supabase
      .channel('orders-channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders'
        },
        () => {
          console.log('Received real-time update');
          fetchOrders();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { orders, loading, error, updateOrderStatus, fetchOrders };
};
