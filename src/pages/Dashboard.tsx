
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, ChefHat, CreditCard, Utensils, DollarSign, TrendingUp } from "lucide-react";

// Sample data for demonstration
const orderData = [
  { id: 1, customer: "John Doe", items: "Burrito, Chips & Salsa", total: 15.99, status: "Completed", time: "12:30 PM" },
  { id: 2, customer: "Maria Garcia", items: "Taco Combo, Horchata", total: 12.50, status: "In Progress", time: "12:45 PM" },
  { id: 3, customer: "Robert Smith", items: "Enchiladas, Mexican Rice", total: 18.75, status: "Ready", time: "1:00 PM" },
  { id: 4, customer: "Sarah Johnson", items: "Quesadilla, Guacamole", total: 14.25, status: "New", time: "1:15 PM" },
  { id: 5, customer: "Michael Brown", items: "Nachos Grande, Soda", total: 16.50, status: "New", time: "1:20 PM" }
];

const salesData = [
  { name: 'Mon', sales: 2400 },
  { name: 'Tue', sales: 1398 },
  { name: 'Wed', sales: 9800 },
  { name: 'Thu', sales: 3908 },
  { name: 'Fri', sales: 4800 },
  { name: 'Sat', sales: 5800 },
  { name: 'Sun', sales: 4300 }
];

const popularItems = [
  { name: "Burrito", orders: 45 },
  { name: "Tacos", orders: 38 },
  { name: "Enchiladas", orders: 25 },
  { name: "Quesadilla", orders: 22 },
  { name: "Nachos Grande", orders: 18 }
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-lacueva-red mb-4 md:mb-0">Kitchen Dashboard</h1>
        <div className="flex space-x-2">
          <button 
            onClick={() => navigate('/')}
            className="bg-lacueva-brown text-white px-4 py-2 rounded hover:bg-lacueva-red transition-colors"
          >
            Home
          </button>
          <button 
            onClick={() => navigate('/menu')}
            className="bg-lacueva-brown text-white px-4 py-2 rounded hover:bg-lacueva-red transition-colors"
          >
            Menu
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <SummaryCard 
          title="Today's Orders" 
          value="24" 
          description="+5 from yesterday" 
          icon={<Utensils className="h-6 w-6" />} 
        />
        <SummaryCard 
          title="Revenue" 
          value="$458.90" 
          description="+12% from last week" 
          icon={<DollarSign className="h-6 w-6" />} 
        />
        <SummaryCard 
          title="Avg. Order Value" 
          value="$19.12" 
          description="+$1.35 from last month" 
          icon={<CreditCard className="h-6 w-6" />} 
        />
        <SummaryCard 
          title="Active Cooks" 
          value="3" 
          description="2 assigned to orders" 
          icon={<ChefHat className="h-6 w-6" />} 
        />
      </div>

      <Tabs defaultValue="orders">
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
              <Table>
                <TableCaption>Current orders as of today</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order #</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderData.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.items}</TableCell>
                      <TableCell>{order.time}</TableCell>
                      <TableCell>${order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <StatusBadge status={order.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <button className="text-lacueva-red hover:underline">View All Orders</button>
              <button className="bg-lacueva-red text-white px-4 py-2 rounded hover:bg-lacueva-brown transition-colors">
                Update Orders
              </button>
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
              <div className="h-80 w-full">
                <ChartContainer 
                  config={{ 
                    sales: { color: "#9b87f5" } 
                  }}
                >
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="sales" name="Sales ($)" fill="var(--color-sales)" />
                  </BarChart>
                </ChartContainer>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                <TrendingUp className="inline h-4 w-4 mr-1" /> Sales are up 12% from last week
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="popular">
          <Card>
            <CardHeader>
              <CardTitle>Most Popular Items</CardTitle>
              <CardDescription>Items with the most orders this week</CardDescription>
            </CardHeader>
            <CardContent>
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
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                <Calendar className="inline h-4 w-4 mr-1" /> Data from the last 7 days
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
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

const StatusBadge = ({ status }: { status: string }) => {
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
        <p className="text-sm">{`Sales: $${payload[0].value}`}</p>
      </ChartTooltipContent>
    );
  }
  return null;
};

export default Dashboard;
