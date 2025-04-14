
import React from 'react';
import { format } from 'date-fns';
import { Button } from "@/components/ui/button";
import {
  Table, TableCaption, TableHeader, TableBody, TableHead, TableRow, TableCell
} from "@/components/ui/table";
import { Order, OrderStatus } from '@/hooks/useOrders';

interface RecentOrdersTableProps {
  orders: Order[];
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => Promise<void>;
}

const RecentOrdersTable: React.FC<RecentOrdersTableProps> = ({ orders, updateOrderStatus }) => {
  return (
    <Table>
      <TableCaption>Orders as of {format(new Date(), 'MMMM d, yyyy')}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders?.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center">
              No orders found
            </TableCell>
          </TableRow>
        ) : (
          orders?.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">#{order.id.substring(0, 8)}</TableCell>
              <TableCell>{order.customer_name}</TableCell>
              <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(order.created_at).toLocaleTimeString()}</TableCell>
              <TableCell>{order.items?.length || 0}</TableCell>
              <TableCell>${order.total_amount.toFixed(2)}</TableCell>
              <TableCell>
                {order.order_status === 'New' && (
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => updateOrderStatus(order.id, 'In Progress')}
                    >
                      Start
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-red-500 hover:text-red-700"
                      onClick={() => updateOrderStatus(order.id, 'Cancelled')}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
                
                {order.order_status === 'In Progress' && (
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => updateOrderStatus(order.id, 'Completed')}
                    >
                      Complete
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-red-500 hover:text-red-700"
                      onClick={() => updateOrderStatus(order.id, 'Cancelled')}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
                
                {['Completed', 'Cancelled'].includes(order.order_status) && (
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    order.order_status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {order.order_status}
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default RecentOrdersTable;
