
import React from 'react';
import { Button } from '@/components/ui/button';

interface MenuItemQuantityControlProps {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
}

const MenuItemQuantityControl: React.FC<MenuItemQuantityControlProps> = ({
  quantity,
  onDecrease,
  onIncrease
}) => {
  return (
    <div className="flex items-center border rounded-md w-fit">
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-9 w-9"
        onClick={onDecrease}
      >
        -
      </Button>
      <span className="w-10 text-center font-medium">{quantity}</span>
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-9 w-9"
        onClick={onIncrease}
      >
        +
      </Button>
    </div>
  );
};

export default MenuItemQuantityControl;
