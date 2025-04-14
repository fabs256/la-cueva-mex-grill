
import React from 'react';

interface BagHeaderProps {
  itemCount: number;
}

const BagHeader: React.FC<BagHeaderProps> = ({ itemCount }) => {
  return (
    <div className="py-4 border-b">
      <h2 className="text-2xl font-bold">Your Order</h2>
      <p className="text-gray-500">{itemCount} item{itemCount !== 1 ? 's' : ''}</p>
    </div>
  );
};

export default BagHeader;
