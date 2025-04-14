
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

interface LocationState {
  orderId: string;
  totalAmount: number;
}

const OrderConfirmation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;
  
  // If no order details are present, redirect to menu
  if (!state?.orderId) {
    navigate('/menu');
    return null;
  }

  // Calculate estimated ready time (20 minutes from now)
  const readyTime = new Date();
  readyTime.setMinutes(readyTime.getMinutes() + 20);
  const formattedTime = readyTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-grow">
        <Card className="max-w-2xl mx-auto p-8 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Order Successfully Placed!
          </h1>
          
          <p className="text-lg text-gray-600 mb-6">
            Thank you for your order #{state.orderId.substring(0, 8)}
          </p>
          
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <p className="text-gray-600 mb-2">
              Your order will be ready for pickup at approximately:
              <br />
              <span className="text-xl font-bold text-green-600">{formattedTime}</span>
            </p>
            <div className="mt-4 p-4 bg-white rounded-lg">
              <h3 className="font-semibold mb-2">Pickup Location:</h3>
              <p className="text-gray-600">La Cueva Mex Grill</p>
              <p className="text-gray-600">18486 Prospect Rd</p>
              <p className="text-gray-600">Saratoga, CA 95070</p>
            </div>
          </div>
          
          <div className="space-x-4">
            <Button
              onClick={() => navigate('/menu')}
              variant="outline"
            >
              Return to Menu
            </Button>
            <Button
              onClick={() => navigate('/')}
              className="bg-lacueva-red hover:bg-lacueva-brown"
            >
              Go Home
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OrderConfirmation;
