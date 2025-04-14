
import React from 'react';
import MenuItem from './MenuItem';
import { MenuItem as MenuItemType } from '@/contexts/ShoppingBagContext';

interface MenuCategorySectionProps {
  category: string;
  items: MenuItemType[];
  referenceRef: (el: HTMLDivElement | null) => void;
}

const MenuCategorySection: React.FC<MenuCategorySectionProps> = ({ category, items, referenceRef }) => {
  return (
    <div 
      ref={referenceRef}
      className="menu-category"
    >
      <h2 className="text-2xl font-bold font-playfair mb-4">{category}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default MenuCategorySection;
