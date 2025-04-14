
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, ChefHat, CreditCard, Utensils, DollarSign, TrendingUp } from "lucide-react";
import { format } from 'date-fns';
import { useOrders, OrderStatus } from "@/hooks/useOrders";
import { useSalesData } from "@/hooks/useSalesData";
import { useToast } from "@/components/ui/use-toast";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { orders, loading: ordersLoading, updateOrderStatus } = useOrders();
  const { salesData, popularItems, loading: salesLoading } = useSalesData();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("orders");
  
  // Calculate summary metrics
  const todayOrdersCount = orders.filter(order => {
    const orderDate = new Date(order.created_at).toISOString().split('T')[0];
    const today = new Date().toISOString().split('T')[0];
    return orderDate === today;
  }).length;
  
  const todayRevenue = orders
    .filter(order => {
      const orderDate = new Date(order.created_at).toISOString().split('T')[0];
      const today = new Date().toISOString().split('T')[0];
      return orderDate === today;
    })
    .reduce((sum, order) => sum + Number(order.total_amount), 0);
  
  const avgOrderValue = todayOrdersCount > 0 
    ? (todayRevenue / todayOrdersCount).toFixed(2)
    : "0.00";

  const handleStatusUpdate = async (orderId: string, newStatus: OrderStatus) => {
    await updateOrderStatus(orderId, newStatus);
    
    toast({
      title: "Order status updated",
      description: `Order status changed to ${newStatus}`,
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-lacueva-red mb-4 md:mb-0">Kitchen Dashboard</h1>
          <div className="flex space-x-2">
            <Button 
              onClick={() => navigate('/')}
              className="bg-lacueva-brown text-white px-4 py-2 rounded hover:bg-lacueva-red transition-colors"
            >
              Home
            </Button>
            <Button 
              onClick={() => navigate('/menu')}
              className="bg-lacueva-brown text-white px-4 py-2 rounded hover:bg-lacueva-red transition-colors"
            >
              Menu
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <SummaryCard 
            title="Today's Orders" 
            value={todayOrdersCount.toString()} 
            description={`As of ${format(new Date(), 'h:mm a')}`} 
            icon={<Utensils className="h-6 w-6" />} 
          />
          <SummaryCard 
            title="Revenue" 
            value={`$${todayRevenue.toFixed(2)}`} 
            description="Today's sales" 
            icon={<DollarSign className="h-6 w-6" />} 
          />
          <SummaryCard 
            title="Avg. Order Value" 
            value={`$${avgOrderValue}`} 
            description="Per order today" 
            icon={<CreditCard className="h-6 w-6" />} 
          />
          <SummaryCard 
            title="Active Orders" 
            value={orders.filter(o => o.status !== 'Completed').length.toString()} 
            description="Pending preparation" 
            icon={<ChefHat className="h-6 w-6" />} 
          />
        </div>

        <Tabs defaultValue="orders" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full mb-4">
            <TabsTrigger value="orders">Current Orders</TabsTrigger>
            <TabsTrigger value="sales">Sales Analysis</TabsTrigger>
            <TabsTrigger value="popular">Popular Items</TabsTrigger>
          </TabsList>
          
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Today's Orders</CardTitle>
                <CardDescription>Manage and track today's customer orders</CardDescription>
              </CardHeader>
              <CardContent>
                {ordersLoading ? (
                  <p className="text-center py-4">Loading orders...</p>
                ) : orders.length === 0 ? (
                  <p className="text-center py-4">No orders to display</p>
                ) : (
                  <Table>
                    <TableCaption>Current orders as of {format(new Date(), 'MMMM d, yyyy h:mm a')}</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order #</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => {
                        // Format the items string
                        const itemsText = order.items
                          .map(item => `${item.name} (${item.quantity})`)
                          .join(', ');
                        
                        // Format the time
                        const orderTime = new Date(order.created_at).toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: 'numeric',
                          hour12: true
                        });
                        
                        return (
                          <TableRow key={order.id}>
                            <TableCell>{order.id.substring(0, 8)}</TableCell>
                            <TableCell>{order.customer_name}</TableCell>
                            <TableCell className="max-w-[200px] truncate" title={itemsText}>
                              {itemsText}
                            </TableCell>
                            <TableCell>{orderTime}</TableCell>
                            <TableCell>${Number(order.total_amount).toFixed(2)}</TableCell>
                            <TableCell>
                              <StatusBadge status={order.status as OrderStatus} />
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-1">
                                {order.status !== 'In Progress' && (
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    onClick={() => handleStatusUpdate(order.id, 'In Progress')}
                                    className="text-xs"
                                  >
                                    Start
                                  </Button>
                                )}
                                {order.status !== 'Ready' && order.status !== 'Completed' && (
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    onClick={() => handleStatusUpdate(order.id, 'Ready')}
                                    className="text-xs"
                                  >
                                    Ready
                                  </Button>
                                )}
                                {order.status !== 'Completed' && (
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    onClick={() => handleStatusUpdate(order.id, 'Completed')}
                                    className="text-xs"
                                  >
                                    Complete
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <p className="text-sm text-muted-foreground">
                  {orders.length} order{orders.length !== 1 ? 's' : ''} total
                </p>
                <Button 
                  className="bg-lacueva-red text-white px-4 py-2 rounded hover:bg-lacueva-brown transition-colors"
                  onClick={() => window.location.reload()}
                >
                  Refresh Orders
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="sales">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Sales Overview</CardTitle>
                <CardDescription>Track your sales performance</CardDescription>
              </CardHeader>
              <CardContent>
                {salesLoading ? (
                  <p className="text-center py-4">Loading sales data...</p>
                ) : (
                  <div className="h-80 w-full">
                    <ChartContainer 
                      config={{ 
                        sales: { color: "#9b87f5" } 
                      }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={salesData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend />
                          <Bar dataKey="sales" name="Sales ($)" fill="var(--color-sales)" />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">
                  <TrendingUp className="inline h-4 w-4 mr-1" /> Sales data for the last 7 days
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="popular">
            <Card>
              <CardHeader>
                <CardTitle>Most Popular Items</CardTitle>
                <CardDescription>Items with the most orders</CardDescription>
              </CardHeader>
              <CardContent>
                {salesLoading ? (
                  <p className="text-center py-4">Loading popular items...</p>
                ) : popularItems.length === 0 ? (
                  <p className="text-center py-4">No data available</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead className="text-right">Orders</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {popularItems.map((item) => (
                        <TableRow key={item.name}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell className="text-right">{item.orders}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">
                  <Calendar className="inline h-4 w-4 mr-1" /> Data from all orders
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const SummaryCard = ({ title, value, description, icon }: { 
  title: string, 
  value: string, 
  description: string, 
  icon: React.ReactNode 
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-lacueva-lightBg flex items-center justify-center">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

const StatusBadge = ({ status }: { status: OrderStatus }) => {
  let color;
  switch (status) {
    case 'New':
      color = 'bg-blue-100 text-blue-800';
      break;
    case 'In Progress':
      color = 'bg-yellow-100 text-yellow-800';
      break;
    case 'Ready':
      color = 'bg-green-100 text-green-800';
      break;
    case 'Completed':
      color = 'bg-purple-100 text-purple-800';
      break;
    default:
      color = 'bg-gray-100 text-gray-800';
  }
  
  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${color}`}>
      {status}
    </span>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <ChartTooltipContent>
        <p className="font-medium">{`${label}`}</p>
        <p className="text-sm">{`Sales: $${payload[0].value.toFixed(2)}`}</p>
      </ChartTooltipContent>
    );
  }
  return null;
};

export default Dashboard;
