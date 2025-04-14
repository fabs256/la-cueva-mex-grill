
import React from 'react';

interface OrderSummaryProps {
  subtotal: number;
  taxRate?: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ subtotal, taxRate = 0.0825 }) => {
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span>Tax</span>
        <span>${tax.toFixed(2)}</span>
      </div>
      <div className="border-t border-gray-200 pt-2 mt-2">
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
