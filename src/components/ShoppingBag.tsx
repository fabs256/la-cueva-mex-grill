
import React from 'react';
import { Trash2, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useShoppingBag } from '@/contexts/ShoppingBagContext';
import { Link } from 'react-router-dom';

const ShoppingBag: React.FC = () => {
  const { items, removeItem, updateQuantity, subtotal, itemCount } = useShoppingBag();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <h3 className="text-2xl font-semibold mb-2">Your bag is empty</h3>
        <p className="text-gray-500 mb-6">Add items from our menu to get started</p>
        <Link to="/menu">
          <Button className="bg-lacueva-red hover:bg-lacueva-brown">
            Browse Menu
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="py-4 border-b">
        <h2 className="text-2xl font-bold">Your Order</h2>
        <p className="text-gray-500">{itemCount} item{itemCount !== 1 ? 's' : ''}</p>
      </div>

      <div className="flex-grow overflow-y-auto py-4 space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-start border-b pb-4">
            {item.image && (
              <div className="w-20 h-20 rounded-md overflow-hidden mr-4">
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

      <div className="border-t py-4 mt-auto">
        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-4 font-bold">
          <span>Total</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <Button className="w-full bg-lacueva-red hover:bg-lacueva-brown">
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default ShoppingBag;
