
import React from 'react';
import { Trash2, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MenuItem } from '@/contexts/ShoppingBagContext';

interface CartItemProps {
  item: MenuItem;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, removeItem, updateQuantity }) => {
  return (
    <div className="py-4 flex">
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
  );
};

export default CartItem;
