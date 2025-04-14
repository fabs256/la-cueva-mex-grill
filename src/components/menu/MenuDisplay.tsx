
import React, { useState, useRef, useEffect } from 'react';
import CategoryList from '../CategoryList';
import { MenuItem as MenuItemType } from '@/contexts/ShoppingBagContext';
import { MENU_ITEMS, extractCategories } from '@/data/menuItems';
import MenuCategorySection from './MenuCategorySection';
import NoMenuItems from './NoMenuItems';

interface MenuDisplayProps {
  searchQuery?: string;
}

const MenuDisplay: React.FC<MenuDisplayProps> = ({ searchQuery = '' }) => {
  const [activeCategory, setActiveCategory] = useState<string>('');
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const categories = extractCategories(MENU_ITEMS);

  // Set first category as active on initial render if not set
  useEffect(() => {
    if (!activeCategory && categories.length > 0) {
      setActiveCategory(categories[0]);
    }
  }, [activeCategory, categories]);

  // Filter menu items by search query and active category
  const filteredItems = MENU_ITEMS.filter(item => {
    const matchesSearch = searchQuery === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === '' || item.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Group filtered items by category
  const itemsByCategory: Record<string, MenuItemType[]> = {};
  filteredItems.forEach(item => {
    if (!itemsByCategory[item.category]) {
      itemsByCategory[item.category] = [];
    }
    itemsByCategory[item.category].push(item);
  });

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    const element = categoryRefs.current[category];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Categories List */}
      <CategoryList 
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={handleCategoryClick}
      />
      
      {/* Menu Items */}
      <div className="mt-6 space-y-8">
        {Object.entries(itemsByCategory).map(([category, items]) => (
          <MenuCategorySection 
            key={category}
            category={category}
            items={items}
            referenceRef={el => categoryRefs.current[category] = el}
          />
        ))}
        
        {filteredItems.length === 0 && <NoMenuItems />}
      </div>
    </div>
  );
};

export default MenuDisplay;
