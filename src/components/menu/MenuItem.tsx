
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useShoppingBag, MenuItem as MenuItemType } from '@/contexts/ShoppingBagContext';
import { useToast } from '@/components/ui/use-toast';
import MenuItemImage from './MenuItemImage';
import MenuItemBadges from './MenuItemBadges';
import MenuItemQuantityControl from './MenuItemQuantityControl';
import MenuItemCustomization from './customizations/MenuItemCustomization';

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [addIngredients, setAddIngredients] = useState<string[]>([]);
  const [removeIngredients, setRemoveIngredients] = useState<string[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isRemoveOpen, setIsRemoveOpen] = useState(false);
  const [isSubstituteOpen, setIsSubstituteOpen] = useState(false);
  const [substitutions, setSubstitutions] = useState<{[key: string]: string}>({});
  const { addItem } = useShoppingBag();
  const { toast } = useToast();

  const handleAddToCart = () => {
    let specialInstructions = '';
    
    if (addIngredients.length > 0) {
      specialInstructions += `Add: ${addIngredients.join(', ')}. `;
    }
    
    if (removeIngredients.length > 0) {
      specialInstructions += `Remove: ${removeIngredients.join(', ')}. `;
    }
    
    if (Object.keys(substitutions).length > 0) {
      const substitutionText = Object.entries(substitutions)
        .map(([from, to]) => `Substitute ${from} with ${to}`)
        .join(', ');
      specialInstructions += `Substitute: ${substitutionText}. `;
    }
    
    addItem(item, quantity, specialInstructions.trim());
    setIsOpen(false);
    setQuantity(1);
    setAddIngredients([]);
    setRemoveIngredients([]);
    setSubstitutions({});
    
    toast({
      title: "Added to bag",
      description: `${item.name} × ${quantity} added to your order`,
      duration: 2000,
    });
  };

  const toggleAddIngredient = (ingredient: string) => {
    setAddIngredients(current => 
      current.includes(ingredient) 
        ? current.filter(i => i !== ingredient)
        : [...current, ingredient]
    );
  };

  const toggleRemoveIngredient = (ingredient: string) => {
    setRemoveIngredients(current => 
      current.includes(ingredient) 
        ? current.filter(i => i !== ingredient)
        : [...current, ingredient]
    );
  };
  
  const handleSubstitute = (from: string, to: string) => {
    setSubstitutions(current => ({
      ...current,
      [from]: to
    }));
  };

  return (
    <>
      <div 
        className="border rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <MenuItemImage image={item.image} name={item.name} />
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg">{item.name}</h3>
            <span className="text-lacueva-red font-medium">${item.price.toFixed(2)}</span>
          </div>
          <p className="text-gray-500 text-sm mt-1 line-clamp-2">{item.description}</p>
          
          <MenuItemBadges dietary={item.dietary} />
          
          <Button 
            size="sm"
            variant="outline"
            className="mt-3 w-full border-lacueva-red text-lacueva-red hover:bg-lacueva-red hover:text-white"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(true);
            }}
          >
            <Plus className="h-4 w-4 mr-1" /> Add to order
          </Button>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{item.name}</DialogTitle>
            <DialogDescription>{item.description}</DialogDescription>
          </DialogHeader>
          
          <MenuItemImage image={item.image} name={item.name} inDialog={true} />
          
          <div className="space-y-4 py-4">
            <MenuItemBadges dietary={item.dietary} />
            
            <div>
              <h4 className="font-medium mb-2">Quantity</h4>
              <MenuItemQuantityControl 
                quantity={quantity} 
                onDecrease={() => setQuantity(Math.max(1, quantity - 1))} 
                onIncrease={() => setQuantity(quantity + 1)}
              />
            </div>
            
            <MenuItemCustomization
              addIngredients={addIngredients}
              removeIngredients={removeIngredients}
              substitutions={substitutions}
              isAddOpen={isAddOpen}
              isRemoveOpen={isRemoveOpen}
              isSubstituteOpen={isSubstituteOpen}
              setIsAddOpen={setIsAddOpen}
              setIsRemoveOpen={setIsRemoveOpen}
              setIsSubstituteOpen={setIsSubstituteOpen}
              toggleAddIngredient={toggleAddIngredient}
              toggleRemoveIngredient={toggleRemoveIngredient}
              handleSubstitute={handleSubstitute}
            />
          </div>
          
          <DialogFooter>
            <Button 
              className="w-full bg-lacueva-red hover:bg-lacueva-brown"
              onClick={handleAddToCart}
            >
              Add to order · ${(item.price * quantity).toFixed(2)}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MenuItem;
