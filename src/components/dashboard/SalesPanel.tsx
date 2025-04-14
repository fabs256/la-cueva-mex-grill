
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { DailySales } from '@/hooks/useSalesData';
import SalesChart from './SalesChart';

interface SalesPanelProps {
  salesByDay: DailySales[];
  growthRate: number;
  loading: boolean;
}

const SalesPanel: React.FC<SalesPanelProps> = ({ salesByDay, growthRate, loading }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Analytics</CardTitle>
        <CardDescription>View your restaurant's performance over time.</CardDescription>
      </CardHeader>
      <CardContent>
        <SalesChart 
          salesByDay={salesByDay}
          growthRate={growthRate}
          loading={loading}
        />
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-muted-foreground">
      </CardFooter>
    </Card>
  );
};

export default SalesPanel;
