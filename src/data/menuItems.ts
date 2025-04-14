
import { MenuItem } from '@/contexts/ShoppingBagContext';

// Menu items data extracted from MenuDisplay component
export const MENU_ITEMS: MenuItem[] = [
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
export const extractCategories = (items: MenuItem[]): string[] => {
  const categoriesSet = new Set(items.map(item => item.category));
  return Array.from(categoriesSet);
};
