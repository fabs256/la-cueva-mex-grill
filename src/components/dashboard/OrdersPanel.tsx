
import React from 'react';
import { format } from 'date-fns';
import { Button } from "@/components/ui/button";
import {
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
} from "@/components/ui/card";
import { Order, OrderStatus } from '@/hooks/useOrders';
import RecentOrdersTable from './RecentOrdersTable';

interface OrdersPanelProps {
  orders: Order[];
  loading: boolean;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => Promise<void>;
}

const OrdersPanel: React.FC<OrdersPanelProps> = ({ orders, loading, updateOrderStatus }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>Manage and view the latest customer orders.</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8">Loading orders...</div>
        ) : (
          <RecentOrdersTable orders={orders} updateOrderStatus={updateOrderStatus} />
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {orders?.length || 0} orders
        </div>
        <Button variant="outline" size="sm" disabled>
          Export CSV
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OrdersPanel;
