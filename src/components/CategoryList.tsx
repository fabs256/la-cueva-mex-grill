
import React from 'react';
import { cn } from '@/lib/utils';

interface CategoryListProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ 
  categories, 
  activeCategory, 
  onSelectCategory 
}) => {
  return (
    <div className="category-list overflow-x-auto sticky top-16 bg-white z-10 shadow-sm">
      <div className="flex justify-center space-x-1 px-2 py-3 min-w-max">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
              activeCategory === category 
                ? "bg-lacueva-red text-white" 
                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
            )}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
