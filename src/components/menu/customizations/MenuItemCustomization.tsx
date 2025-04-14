
import React from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import AddIngredients from './AddIngredients';
import RemoveIngredients from './RemoveIngredients';
import SubstituteIngredients from './SubstituteIngredients';

// Customization options - move to constants file if needed
export const CUSTOMIZATION_OPTIONS = {
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

interface MenuItemCustomizationProps {
  addIngredients: string[];
  removeIngredients: string[];
  substitutions: {[key: string]: string};
  isAddOpen: boolean;
  isRemoveOpen: boolean;
  isSubstituteOpen: boolean;
  setIsAddOpen: (value: boolean) => void;
  setIsRemoveOpen: (value: boolean) => void;
  setIsSubstituteOpen: (value: boolean) => void;
  toggleAddIngredient: (ingredient: string) => void;
  toggleRemoveIngredient: (ingredient: string) => void;
  handleSubstitute: (from: string, to: string) => void;
}

const MenuItemCustomization: React.FC<MenuItemCustomizationProps> = ({
  addIngredients,
  removeIngredients,
  substitutions,
  isAddOpen,
  isRemoveOpen,
  isSubstituteOpen,
  setIsAddOpen,
  setIsRemoveOpen,
  setIsSubstituteOpen,
  toggleAddIngredient,
  toggleRemoveIngredient,
  handleSubstitute
}) => {
  return (
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
          <AddIngredients 
            options={CUSTOMIZATION_OPTIONS.add} 
            selected={addIngredients} 
            onToggle={toggleAddIngredient} 
          />
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
          <RemoveIngredients 
            options={CUSTOMIZATION_OPTIONS.remove} 
            selected={removeIngredients} 
            onToggle={toggleRemoveIngredient} 
          />
        </CollapsibleContent>
      </Collapsible>

      <Collapsible open={isSubstituteOpen} onOpenChange={setIsSubstituteOpen} className="border rounded-md p-2">
        <CollapsibleTrigger className="flex w-full items-center justify-between">
          <span className="font-medium text-sm">Substitute ingredients</span>
          <span className="text-xs text-gray-500">
            {Object.keys(substitutions).length > 0 
              ? Object.entries(substitutions).map(([from, to]) => `${from} → ${to}`).join(', ') 
              : 'Select options'
            }
          </span>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2 space-y-3">
          <SubstituteIngredients 
            meatOptions={CUSTOMIZATION_OPTIONS.substitute.meat}
            otherOptions={CUSTOMIZATION_OPTIONS.substitute.other}
            substitutions={substitutions}
            onSubstitute={handleSubstitute}
          />
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default MenuItemCustomization;
