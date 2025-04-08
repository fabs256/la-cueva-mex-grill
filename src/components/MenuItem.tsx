
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useShoppingBag, MenuItem as MenuItemType } from '@/contexts/ShoppingBagContext';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const { addItem } = useShoppingBag();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addItem(item, quantity, specialInstructions);
    setIsOpen(false);
    setQuantity(1);
    setSpecialInstructions('');
    
    toast({
      title: "Added to bag",
      description: `${item.name} × ${quantity} added to your order`,
      duration: 2000,
    });
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
            
            <div>
              <h4 className="font-medium mb-2">Special Instructions</h4>
              <Textarea 
                placeholder="Any specific preferences? (optional)"
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="resize-none"
              />
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
