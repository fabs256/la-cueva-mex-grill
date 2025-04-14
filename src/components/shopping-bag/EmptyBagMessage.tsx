
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const EmptyBagMessage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <h3 className="text-2xl font-semibold mb-2">Your bag is empty</h3>
      <p className="text-gray-500 mb-6">Add items from our menu to get started</p>
      <Link to="/menu">
        <Button className="bg-lacueva-red hover:bg-lacueva-brown">
          Browse Menu
        </Button>
      </Link>
    </div>
  );
};

export default EmptyBagMessage;
