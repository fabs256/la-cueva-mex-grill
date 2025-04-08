
import React from 'react';
import Navbar from '@/components/Navbar';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useShoppingBag } from '@/contexts/ShoppingBagContext';
import { Trash2, Minus, Plus, CreditCard } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type PaymentFormValues = {
  name: string;
  email: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  billingAddress: string;
};

const ShoppingBagPage: React.FC = () => {
  const { items, removeItem, updateQuantity, subtotal, itemCount } = useShoppingBag();
  
  const form = useForm<PaymentFormValues>({
    defaultValues: {
      name: '',
      email: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      billingAddress: '',
    },
  });

  const onSubmit = (data: PaymentFormValues) => {
    // In a real app, you would process the payment here
    console.log('Submitting order:', data);
    toast.success('Order submitted successfully!');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto py-10">
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <h3 className="text-2xl font-semibold mb-2">Your bag is empty</h3>
            <p className="text-gray-500 mb-6">Add items from our menu to get started</p>
            <Link to="/menu">
              <Button className="bg-lacueva-red hover:bg-lacueva-brown">
                Browse Menu
              </Button>
            </Link>
          </div>
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
          {/* Shopping Bag Items */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-4">
              <h2 className="text-xl font-semibold mb-4">Items ({itemCount})</h2>
              
              <div className="divide-y">
                {items.map((item) => (
                  <div key={item.id} className="py-4 flex">
                    {item.image && (
                      <div className="w-24 h-24 rounded-md overflow-hidden mr-4">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{item.name}</h4>
                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-1">{item.description}</p>
                      
                      {/* Item quantity controls */}
                      <div className="flex items-center mt-3 space-x-3">
                        <div className="flex items-center border rounded-md">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8" 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8" 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50" 
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {item.specialInstructions && (
                        <p className="text-xs mt-2 italic text-gray-500">
                          Note: {item.specialInstructions}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <Link to="/menu">
              <Button variant="outline" className="mt-2">
                Continue Shopping
              </Button>
            </Link>
          </div>
          
          {/* Order Summary and Payment */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${(subtotal * 0.0825).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${(subtotal * 1.0825).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <CreditCard className="mr-2 h-5 w-5" />
                Payment Information
              </h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" required {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="you@example.com" required {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Card Number</FormLabel>
                        <FormControl>
                          <Input placeholder="1234 5678 9012 3456" required {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="expiryDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expiry Date</FormLabel>
                          <FormControl>
                            <Input placeholder="MM/YY" required {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="cvv"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CVV</FormLabel>
                          <FormControl>
                            <Input placeholder="123" required {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="billingAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Billing Address</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter your full address" required {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-lacueva-red hover:bg-lacueva-brown mt-4"
                  >
                    Place Order - ${(subtotal * 1.0825).toFixed(2)}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="bg-gray-900 text-white py-8 px-4 mt-16">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">La Cueva Mex Grill</h2>
          <p className="mb-2">18486 Prospect Rd, Saratoga, CA 95070</p>
          <p className="mb-4">Open: 10:00 AM - 3:00 PM, 5:00 PM - 8:00 PM</p>
          <p className="text-sm opacity-75">© 2025 La Cueva Mex Grill. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ShoppingBagPage;
