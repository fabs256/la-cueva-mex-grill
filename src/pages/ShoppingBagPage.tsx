
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useShoppingBag } from '@/contexts/ShoppingBagContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import EmptyBagMessage from '@/components/shopping-bag/EmptyBagMessage';
import CartItem from '@/components/shopping-bag/CartItem';
import OrderSummary from '@/components/shopping-bag/OrderSummary';
import PaymentForm, { PaymentFormValues } from '@/components/shopping-bag/PaymentForm';
import Footer from '@/components/Footer';

const ShoppingBagPage: React.FC = () => {
  const { items, removeItem, updateQuantity, subtotal, itemCount, clearBag } = useShoppingBag();
  const { user } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: PaymentFormValues) => {
    try {
      const sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_name: data.name,
          customer_email: data.email,
          customer_phone: '', // Add phone field if needed
          total_amount: subtotal * 1.0825, // Including tax
          order_status: 'New',
          special_instructions: '',
          order_type: 'pickup',
          session_id: sessionId,
          user_id: user?.id // Add user ID if logged in
        })
        .select()
        .single();

      if (orderError) throw orderError;

      const orderItems = items.map(item => ({
        order_id: orderData.id,
        menu_item_id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      clearBag();
      
      toast.success('Order submitted successfully!');
      navigate('/order-confirmation', {
        state: {
          orderId: orderData.id,
          totalAmount: subtotal * 1.0825
        }
      });
    } catch (error) {
      console.error('Error submitting order:', error);
      toast.error('Failed to submit order. Please try again.');
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto py-10">
          <EmptyBagMessage />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Your Order</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-4">
              <h2 className="text-xl font-semibold mb-4">Items ({itemCount})</h2>
              
              <div className="divide-y">
                {items.map((item) => (
                  <CartItem 
                    key={item.id} 
                    item={item} 
                    removeItem={removeItem} 
                    updateQuantity={updateQuantity} 
                  />
                ))}
              </div>
            </div>
            
            <Link to="/menu">
              <Button variant="outline" className="mt-2">
                Continue Shopping
              </Button>
            </Link>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <OrderSummary subtotal={subtotal} />
            </div>
            
            <PaymentForm onSubmit={onSubmit} total={subtotal * 1.0825} />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ShoppingBagPage;
