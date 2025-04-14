
import React from 'react';
import { useShoppingBag } from '@/contexts/ShoppingBagContext';
import EmptyBagMessage from './shopping-bag/EmptyBagMessage';
import BagHeader from './shopping-bag/BagHeader';
import BagItem from './shopping-bag/BagItem';
import BagSummary from './shopping-bag/BagSummary';

const ShoppingBag: React.FC = () => {
  const { items, removeItem, updateQuantity, subtotal, itemCount } = useShoppingBag();

  if (items.length === 0) {
    return <EmptyBagMessage />;
  }

  return (
    <div className="flex flex-col h-full">
      <BagHeader itemCount={itemCount} />
      
      <div className="flex-grow overflow-y-auto py-4 space-y-4">
        {items.map((item) => (
          <BagItem
            key={item.id}
            item={item}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
          />
        ))}
      </div>

      <BagSummary subtotal={subtotal} />
    </div>
  );
};

export default ShoppingBag;
