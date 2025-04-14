
import React from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SubstituteOption {
  from: string;
  to: string[];
}

interface SubstituteIngredientsProps {
  meatOptions: SubstituteOption[];
  otherOptions: string[];
  substitutions: {[key: string]: string};
  onSubstitute: (from: string, to: string) => void;
}

const SubstituteIngredients: React.FC<SubstituteIngredientsProps> = ({ 
  meatOptions, 
  otherOptions, 
  substitutions, 
  onSubstitute 
}) => {
  return (
    <div className="pt-2 space-y-3">
      {meatOptions.map((option) => (
        <div key={`sub-meat-${option.from}`} className="space-y-1">
          <p className="text-sm font-medium">Substitute {option.from} with:</p>
          <Select 
            value={substitutions[option.from] || ''} 
            onValueChange={(value) => onSubstitute(option.from, value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select substitute" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {option.to.map((subOption) => (
                  <SelectItem key={`sub-option-${subOption}`} value={subOption}>
                    {subOption}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      ))}

      <div className="space-y-1">
        <p className="text-sm font-medium">Other substitutions:</p>
        <div className="grid grid-cols-2 gap-1">
          {otherOptions.map((ingredient) => {
            const isSubstituted = Object.keys(substitutions).includes(ingredient);
            return (
              <div
                key={`sub-other-${ingredient}`}
                className={`flex items-center justify-between p-2 rounded cursor-pointer border ${
                  isSubstituted ? 'bg-lacueva-red text-white border-lacueva-red' : 'bg-white'
                }`}
              >
                <span className="text-sm">{ingredient}</span>
                <Select 
                  value={substitutions[ingredient] || ''}
                  onValueChange={(value) => {
                    if (value === 'none') {
                      const newSubs = {...substitutions};
                      delete newSubs[ingredient];
                      onSubstitute(ingredient, value);
                    } else {
                      onSubstitute(ingredient, value);
                    }
                  }}
                >
                  <SelectTrigger className="h-7 w-24 text-xs border-0 bg-transparent">
                    <SelectValue placeholder="Replace" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="Vegan cheese">Vegan cheese</SelectItem>
                    <SelectItem value="Red onions">Red onions</SelectItem>
                    <SelectItem value="Spinach">Spinach</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SubstituteIngredients;
