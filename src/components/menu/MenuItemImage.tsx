
import React from 'react';

interface MenuItemImageProps {
  image: string;
  name: string;
  inDialog?: boolean;
}

const MenuItemImage: React.FC<MenuItemImageProps> = ({ image, name, inDialog = false }) => {
  if (!image) return null;
  
  return (
    <div className={`${inDialog ? 'h-48 overflow-hidden rounded-md -mx-6' : 'h-48 overflow-hidden'}`}>
      <img 
        src={image} 
        alt={name}
        className={`w-full h-full object-cover ${!inDialog && 'transform hover:scale-105 transition-transform duration-300'}`}
      />
    </div>
  );
};

export default MenuItemImage;
