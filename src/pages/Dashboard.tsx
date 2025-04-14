
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useOrders, OrderStatus } from '@/hooks/useOrders';
import { useSalesData } from '@/hooks/useSalesData';
import { format } from 'date-fns';
import Navbar from '@/components/Navbar';
import {
  Utensils, DollarSign, CreditCard, ChefHat, TrendingUp
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table, TableCaption, TableHeader, TableBody, TableHead, TableRow, TableCell
} from "@/components/ui/table";
import { toast } from "sonner";
import {
  ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, 
  Tooltip, Legend, Bar
} from 'recharts';
import { ChartContainer } from '@/components/ui/chart';

const Dashboard: React.FC = () => {
  const { user, isStaff } = useAuth();
  const navigate = useNavigate();
  const { orders, loading: ordersLoading, updateOrderStatus } = useOrders();
  const { salesData, salesByDay, popularItems, topSellingItems, totalRevenue, averageOrderValue, growthRate, loading: salesLoading } = useSalesData();
  const [activeTab, setActiveTab] = useState('orders');
  
  // Chart configuration
  const chartConfig = {
    revenue: {
      label: 'Revenue',
      color: '#8884d8',
    },
  };
  
  // Protect this route - only staff can access
  useEffect(() => {
    if (user && !isStaff) {
      navigate('/');
      toast.error("You don't have permission to access the dashboard");
    } else if (!user) {
      navigate('/auth');
    }
  }, [user, isStaff, navigate]);

  
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => setActiveTab('orders')}
              className={activeTab === 'orders' ? 'bg-primary/10' : ''}
            >
              Orders
            </Button>
            <Button 
              variant="outline"
              onClick={() => setActiveTab('sales')} 
              className={activeTab === 'sales' ? 'bg-primary/10' : ''}
            >
              Sales
            </Button>
            <Button 
              variant="outline"
              onClick={() => setActiveTab('inventory')}
              className={activeTab === 'inventory' ? 'bg-primary/10' : ''}
            >
              Inventory
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <CardDescription className="text-2xl font-bold">{orders?.length || 0}</CardDescription>
            </CardHeader>
            <CardContent>
              <Utensils className="h-8 w-8 text-gray-400" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <CardDescription className="text-2xl font-bold">
                ${totalRevenue?.toFixed(2) || "0.00"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DollarSign className="h-8 w-8 text-gray-400" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
              <CardDescription className="text-2xl font-bold">
                ${averageOrderValue?.toFixed(2) || "0.00"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CreditCard className="h-8 w-8 text-gray-400" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Popular Items</CardTitle>
              <CardDescription className="text-2xl font-bold">{topSellingItems?.[0]?.name || "None"}</CardDescription>
            </CardHeader>
            <CardContent>
              <ChefHat className="h-8 w-8 text-gray-400" />
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="orders" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="orders">Recent Orders</TabsTrigger>
            <TabsTrigger value="sales">Sales Analytics</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
          </TabsList>
          
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Manage and view the latest customer orders.</CardDescription>
              </CardHeader>
              <CardContent>
                {ordersLoading ? (
                  <div className="text-center py-8">Loading orders...</div>
                ) : (
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
                                    onClick={() => updateOrderStatus(order.id, 'Cancelled' as OrderStatus)}
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
                                    onClick={() => updateOrderStatus(order.id, 'Cancelled' as OrderStatus)}
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
          </TabsContent>
          
          <TabsContent value="sales">
            <Card>
              <CardHeader>
                <CardTitle>Sales Analytics</CardTitle>
                <CardDescription>View your restaurant's performance over time.</CardDescription>
              </CardHeader>
              <CardContent>
                {salesLoading ? (
                  <div className="text-center py-8">Loading sales data...</div>
                ) : (
                  <ChartContainer className="h-[400px]" config={chartConfig}>
                    {salesByDay && salesByDay.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={salesByDay}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="revenue" fill="#8884d8" name="Revenue" />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <p className="text-muted-foreground">No sales data available</p>
                      </div>
                    )}
                  </ChartContainer>
                )}
              </CardContent>
              <CardFooter className="flex justify-between text-sm text-muted-foreground">
                <div className="flex items-center">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  {growthRate !== undefined ? `${growthRate > 0 ? '+' : ''}${growthRate.toFixed(1)}% from previous period` : 'No growth data available'}
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="inventory">
            <Card>
              <CardHeader>
                <CardTitle>Inventory Status</CardTitle>
                <CardDescription>Track your restaurant inventory.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item</TableHead>
                          <TableHead className="text-right">Stock Level</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {/* Placeholder inventory data */}
                        <TableRow>
                          <TableCell>Tortillas</TableCell>
                          <TableCell className="text-right">High</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Ground Beef</TableCell>
                          <TableCell className="text-right">Medium</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Chicken</TableCell>
                          <TableCell className="text-right">High</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Salsa</TableCell>
                          <TableCell className="text-right">Medium</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Avocados</TableCell>
                          <TableCell className="text-right">Low</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" disabled>
                  Update Inventory
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
