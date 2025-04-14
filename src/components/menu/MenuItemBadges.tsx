
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface MenuItemBadgesProps {
  dietary?: string[];
}

const MenuItemBadges: React.FC<MenuItemBadgesProps> = ({ dietary }) => {
  if (!dietary || dietary.length === 0) return null;
  
  return (
    <div className="mt-2 flex flex-wrap gap-1">
      {dietary.map((tag) => (
        <Badge key={tag} variant="outline" className="text-xs">
          {tag}
        </Badge>
      ))}
    </div>
  );
};

export default MenuItemBadges;
