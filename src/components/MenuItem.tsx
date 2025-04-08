import React, { useState } from 'react';
import { Plus, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useShoppingBag, MenuItem as MenuItemType } from '@/contexts/ShoppingBagContext';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface MenuItemProps {
  item: MenuItemType;
}

const CUSTOMIZATION_OPTIONS = {
  add: [
    "Extra cheese", 
    "Avocado", 
    "Jalapeños", 
    "Sour cream", 
    "Pico de gallo", 
    "Guacamole", 
    "Cilantro"
  ],
  remove: [
    "Cheese", 
    "Onions", 
    "Tomatoes", 
    "Lettuce", 
    "Cilantro", 
    "Sour cream"
  ],
  substitute: {
    meat: [
      { from: "Chicken", to: ["Steak", "Carnitas", "Barbacoa", "Ground Beef", "Shrimp", "Vegetarian (Plant-based)"] }
    ],
    other: [
      "Cheese", 
      "Onions", 
      "Tomatoes", 
      "Lettuce", 
      "Cilantro", 
      "Sour cream"
    ]
  }
};

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [addIngredients, setAddIngredients] = useState<string[]>([]);
  const [removeIngredients, setRemoveIngredients] = useState<string[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isRemoveOpen, setIsRemoveOpen] = useState(false);
  const { addItem } = useShoppingBag();
  const { toast } = useToast();

  const handleAddToCart = () => {
    let specialInstructions = '';
    
    if (addIngredients.length > 0) {
      specialInstructions += `Add: ${addIngredients.join(', ')}. `;
    }
    
    if (removeIngredients.length > 0) {
      specialInstructions += `Remove: ${removeIngredients.join(', ')}.`;
    }
    
    addItem(item, quantity, specialInstructions.trim());
    setIsOpen(false);
    setQuantity(1);
    setAddIngredients([]);
    setRemoveIngredients([]);
    
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

  return (
    <>
      <div 
        className="border rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        {item.image && (
          <div className="h-48 overflow-hidden">
            <img 
              src={item.image} 
              alt={item.name}
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg">{item.name}</h3>
            <span className="text-lacueva-red font-medium">${item.price.toFixed(2)}</span>
          </div>
          <p className="text-gray-500 text-sm mt-1 line-clamp-2">{item.description}</p>
          
          {item.dietary && item.dietary.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {item.dietary.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          
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
          
          {item.image && (
            <div className="h-48 overflow-hidden rounded-md -mx-6">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="space-y-4 py-4">
            {item.dietary && item.dietary.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {item.dietary.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            
            <div>
              <h4 className="font-medium mb-2">Quantity</h4>
              <div className="flex items-center border rounded-md w-fit">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-9 w-9"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="w-10 text-center font-medium">{quantity}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-9 w-9"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">Customizations</h4>
              
              <Collapsible open={isAddOpen} onOpenChange={setIsAddOpen} className="border rounded-md p-2">
                <CollapsibleTrigger className="flex w-full items-center justify-between">
                  <span className="font-medium text-sm">Add ingredients</span>
                  <span className="text-xs text-gray-500">
                    {addIngredients.length > 0 ? addIngredients.join(', ') : 'Select options'}
                  </span>
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2">
                  <div className="grid grid-cols-2 gap-1">
                    {CUSTOMIZATION_OPTIONS.add.map((ingredient) => (
                      <div
                        key={`add-${ingredient}`}
                        className={`flex items-center space-x-2 p-2 rounded cursor-pointer border ${
                          addIngredients.includes(ingredient) ? 'bg-lacueva-red text-white border-lacueva-red' : 'bg-white'
                        }`}
                        onClick={() => toggleAddIngredient(ingredient)}
                      >
                        {addIngredients.includes(ingredient) && <Check className="h-4 w-4" />}
                        <span className="text-sm">{ingredient}</span>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
              
              <Collapsible open={isRemoveOpen} onOpenChange={setIsRemoveOpen} className="border rounded-md p-2">
                <CollapsibleTrigger className="flex w-full items-center justify-between">
                  <span className="font-medium text-sm">Remove ingredients</span>
                  <span className="text-xs text-gray-500">
                    {removeIngredients.length > 0 ? removeIngredients.join(', ') : 'Select options'}
                  </span>
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2">
                  <div className="grid grid-cols-2 gap-1">
                    {CUSTOMIZATION_OPTIONS.remove.map((ingredient) => (
                      <div
                        key={`remove-${ingredient}`}
                        className={`flex items-center space-x-2 p-2 rounded cursor-pointer border ${
                          removeIngredients.includes(ingredient) ? 'bg-lacueva-red text-white border-lacueva-red' : 'bg-white'
                        }`}
                        onClick={() => toggleRemoveIngredient(ingredient)}
                      >
                        {removeIngredients.includes(ingredient) && <Check className="h-4 w-4" />}
                        <span className="text-sm">{ingredient}</span>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
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
