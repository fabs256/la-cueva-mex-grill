import React, { createContext, useContext, useState, useEffect } from 'react';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  dietary?: string[];
  quantity: number;
  specialInstructions?: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
  specialInstructions?: string;
}

interface ShoppingBagContextType {
  items: CartItem[];
  addItem: (item: MenuItem, quantity?: number, specialInstructions?: string) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  updateSpecialInstructions: (itemId: string, instructions: string) => void;
  clearBag: () => void;
  itemCount: number;
  subtotal: number;
}

const ShoppingBagContext = createContext<ShoppingBagContextType | undefined>(undefined);

export const ShoppingBagProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  
  // Load from localStorage on initial render
  useEffect(() => {
    const savedItems = localStorage.getItem('shoppingBag');
    if (savedItems) {
      try {
        setItems(JSON.parse(savedItems));
      } catch (error) {
        console.error('Error parsing shopping bag from localStorage', error);
        localStorage.removeItem('shoppingBag');
      }
    }
  }, []);
  
  // Save to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('shoppingBag', JSON.stringify(items));
  }, [items]);

  const addItem = (item: MenuItem, quantity = 1, specialInstructions = '') => {
    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(i => i.id === item.id);
      
      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
          specialInstructions: specialInstructions || updatedItems[existingItemIndex].specialInstructions
        };
        return updatedItems;
      } else {
        // Add new item
        return [...prevItems, { ...item, quantity, specialInstructions }];
      }
    });
  };

  const removeItem = (itemId: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const updateSpecialInstructions = (itemId: string, instructions: string) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId ? { ...item, specialInstructions: instructions } : item
      )
    );
  };

  const clearBag = () => {
    setItems([]);
    localStorage.removeItem('shoppingBag');
  };

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <ShoppingBagContext.Provider 
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        updateSpecialInstructions,
        clearBag,
        itemCount,
        subtotal
      }}
    >
      {children}
    </ShoppingBagContext.Provider>
  );
};

export const useShoppingBag = (): ShoppingBagContextType => {
  const context = useContext(ShoppingBagContext);
  if (context === undefined) {
    throw new Error('useShoppingBag must be used within a ShoppingBagProvider');
  }
  return context;
};
