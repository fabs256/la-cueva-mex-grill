
import React from 'react';
import { Check } from 'lucide-react';

interface RemoveIngredientsProps {
  options: string[];
  selected: string[];
  onToggle: (ingredient: string) => void;
}

const RemoveIngredients: React.FC<RemoveIngredientsProps> = ({ options, selected, onToggle }) => {
  return (
    <div className="grid grid-cols-2 gap-1">
      {options.map((ingredient) => (
        <div
          key={`remove-${ingredient}`}
          className={`flex items-center space-x-2 p-2 rounded cursor-pointer border ${
            selected.includes(ingredient) ? 'bg-lacueva-red text-white border-lacueva-red' : 'bg-white'
          }`}
          onClick={() => onToggle(ingredient)}
        >
          {selected.includes(ingredient) && <Check className="h-4 w-4" />}
          <span className="text-sm">{ingredient}</span>
        </div>
      ))}
    </div>
  );
};

export default RemoveIngredients;
