
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface BagSummaryProps {
  subtotal: number;
}

const BagSummary: React.FC<BagSummaryProps> = ({ subtotal }) => {
  return (
    <div className="border-t py-4 mt-auto">
      <div className="flex justify-between mb-2">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-4 font-bold">
        <span>Total</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <Link to="/bag">
        <Button className="w-full bg-lacueva-red hover:bg-lacueva-brown">
          Checkout
        </Button>
      </Link>
    </div>
  );
};

export default BagSummary;
