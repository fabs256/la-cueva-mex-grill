
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useOrders } from '@/hooks/useOrders';
import { useSalesData } from '@/hooks/useSalesData';
import Navbar from '@/components/Navbar';
import {
  Utensils, DollarSign, CreditCard, ChefHat
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import MetricCard from '@/components/dashboard/MetricCard';
import OrdersPanel from '@/components/dashboard/OrdersPanel';
import SalesPanel from '@/components/dashboard/SalesPanel';
import InventoryPanel from '@/components/dashboard/InventoryPanel';

const Dashboard: React.FC = () => {
  const { user, isStaff } = useAuth();
  const navigate = useNavigate();
  const { orders, loading: ordersLoading, updateOrderStatus } = useOrders();
  const { 
    salesData, 
    salesByDay, 
    popularItems, 
    topSellingItems, 
    totalRevenue, 
    averageOrderValue, 
    growthRate, 
    loading: salesLoading 
  } = useSalesData();
  
  const [activeTab, setActiveTab] = useState('orders');
  
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
          <MetricCard 
            title="Total Orders"
            value={orders?.length || 0}
            icon={Utensils}
          />
          
          <MetricCard 
            title="Revenue"
            value={totalRevenue || 0}
            icon={DollarSign}
            format={(value) => `$${value.toFixed(2)}`}
          />
          
          <MetricCard 
            title="Avg. Order Value"
            value={averageOrderValue || 0}
            icon={CreditCard}
            format={(value) => `$${value.toFixed(2)}`}
          />
          
          <MetricCard 
            title="Popular Items"
            value={topSellingItems?.[0]?.name || "None"}
            icon={ChefHat}
          />
        </div>
        
        <Tabs defaultValue="orders" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="orders">Recent Orders</TabsTrigger>
            <TabsTrigger value="sales">Sales Analytics</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
          </TabsList>
          
          <TabsContent value="orders">
            <OrdersPanel 
              orders={orders}
              loading={ordersLoading}
              updateOrderStatus={updateOrderStatus}
            />
          </TabsContent>
          
          <TabsContent value="sales">
            <SalesPanel 
              salesByDay={salesByDay}
              growthRate={growthRate}
              loading={salesLoading}
            />
          </TabsContent>
          
          <TabsContent value="inventory">
            <InventoryPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
