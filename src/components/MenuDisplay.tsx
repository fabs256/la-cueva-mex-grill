
import React, { useState, useRef, useEffect } from 'react';
import MenuItem from './MenuItem';
import CategoryList from './CategoryList';
import { MenuItem as MenuItemType } from '@/contexts/ShoppingBagContext';

// Temporary data for our menu items
const MENU_ITEMS: MenuItemType[] = [
  {
    id: '1',
    name: 'Guacamole & Chips',
    description: 'Freshly made guacamole with ripe avocados, tomatoes, onions, cilantro, and lime juice. Served with crispy tortilla chips.',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1595020603925-41a3605dbbad?q=80&w=1000&auto=format&fit=crop',
    category: 'Appetizers',
    dietary: ['Vegetarian', 'Gluten-Free Option'],
    quantity: 0
  },
  {
    id: '2',
    name: 'Queso Fundido',
    description: 'Melted Chihuahua cheese with Mexican chorizo, served with warm tortillas.',
    price: 10.99,
    image: 'https://images.unsplash.com/photo-1582169505937-b9992bd01ed9?q=80&w=1000&auto=format&fit=crop',
    category: 'Appetizers',
    quantity: 0
  },
  {
    id: '3',
    name: 'Chicken Quesadilla',
    description: 'Flour tortilla filled with grilled chicken and melted cheese, served with sour cream and pico de gallo.',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1618040996337-11b21fb0bf26?q=80&w=1000&auto=format&fit=crop',
    category: 'Appetizers',
    quantity: 0
  },
  {
    id: '4',
    name: 'Carne Asada Tacos',
    description: 'Three corn tortillas filled with marinated grilled steak, onions, and cilantro. Served with salsa verde.',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?q=80&w=1000&auto=format&fit=crop',
    category: 'Tacos',
    dietary: ['Gluten-Free Option'],
    quantity: 0
  },
  {
    id: '5',
    name: 'Chicken Tinga Tacos',
    description: 'Three corn tortillas with shredded chicken in a chipotle-tomato sauce, topped with avocado and queso fresco.',
    price: 13.99,
    image: 'https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?q=80&w=1000&auto=format&fit=crop',
    category: 'Tacos',
    dietary: ['Gluten-Free Option'],
    quantity: 0
  },
  {
    id: '6',
    name: 'Vegetarian Tacos',
    description: 'Three corn tortillas filled with grilled vegetables, black beans, and queso fresco. Topped with avocado sauce.',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?q=80&w=1000&auto=format&fit=crop',
    category: 'Tacos',
    dietary: ['Vegetarian', 'Gluten-Free Option'],
    quantity: 0
  },
  {
    id: '7',
    name: 'Enchiladas Verdes',
    description: 'Three corn tortillas filled with chicken, covered in green tomatillo sauce and melted cheese. Served with rice and beans.',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1534352956036-cd81e27dd615?q=80&w=1000&auto=format&fit=crop',
    category: 'Entrees',
    dietary: ['Gluten-Free'],
    quantity: 0
  },
  {
    id: '8',
    name: 'Chiles Rellenos',
    description: 'Two poblano peppers stuffed with cheese, dipped in egg batter, fried, and topped with ranchero sauce.',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1544601255-328f864ed49c?q=80&w=1000&auto=format&fit=crop',
    category: 'Entrees',
    dietary: ['Vegetarian'],
    quantity: 0
  },
  {
    id: '9',
    name: 'Carne Asada',
    description: 'Grilled marinated flank steak served with rice, beans, guacamole, and tortillas.',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1611250188496-e966043a0629?q=80&w=1000&auto=format&fit=crop',
    category: 'Entrees',
    quantity: 0
  },
  {
    id: '10',
    name: 'Horchata',
    description: 'Traditional Mexican rice drink with cinnamon and vanilla.',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1614063305624-83a1763fd3db?q=80&w=1000&auto=format&fit=crop',
    category: 'Beverages',
    dietary: ['Vegetarian', 'Vegan'],
    quantity: 0
  },
  {
    id: '11',
    name: 'Mexican Coca-Cola',
    description: 'Made with real cane sugar.',
    price: 3.49,
    image: 'https://images.unsplash.com/photo-1629203432180-71e9b18d33e3?q=80&w=1000&auto=format&fit=crop',
    category: 'Beverages',
    dietary: ['Vegetarian', 'Vegan'],
    quantity: 0
  },
  {
    id: '12',
    name: 'Churros con Chocolate',
    description: 'Fried dough pastry rolled in cinnamon sugar, served with warm chocolate dipping sauce.',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1624001877690-b61842255ecd?q=80&w=1000&auto=format&fit=crop',
    category: 'Desserts',
    dietary: ['Vegetarian'],
    quantity: 0
  },
  {
    id: '13',
    name: 'Flan',
    description: 'Traditional Mexican caramel custard.',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1551651065-dd3a0d50a2d3?q=80&w=1000&auto=format&fit=crop',
    category: 'Desserts',
    dietary: ['Vegetarian', 'Gluten-Free'],
    quantity: 0
  }
];

// Extract unique categories from menu items
const extractCategories = (items: MenuItemType[]): string[] => {
  const categoriesSet = new Set(items.map(item => item.category));
  return Array.from(categoriesSet);
};

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
          <div 
            key={category}
            ref={el => categoryRefs.current[category] = el}
            className="menu-category"
          >
            <h2 className="text-2xl font-bold font-playfair mb-4">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map(item => (
                <MenuItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        ))}
        
        {filteredItems.length === 0 && (
          <div className="text-center py-10">
            <h3 className="text-xl font-semibold mb-2">No menu items found</h3>
            <p className="text-gray-500">
              Try adjusting your search or browse a different category
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuDisplay;
