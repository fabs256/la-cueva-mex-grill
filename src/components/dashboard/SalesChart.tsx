
import React from 'react';
import { ChartContainer } from '@/components/ui/chart';
import {
  ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, 
  Tooltip, Legend, Bar
} from 'recharts';
import { DailySales } from '@/hooks/useSalesData';
import { TrendingUp } from 'lucide-react';

interface SalesChartProps {
  salesByDay: DailySales[];
  growthRate: number;
  loading: boolean;
}

const SalesChart: React.FC<SalesChartProps> = ({ salesByDay, growthRate, loading }) => {
  // Chart configuration
  const chartConfig = {
    revenue: {
      label: 'Revenue',
      color: '#8884d8',
    },
  };

  return (
    <>
      {loading ? (
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

      <div className="flex items-center mt-4">
        <TrendingUp className="mr-2 h-4 w-4" />
        {growthRate !== undefined ? `${growthRate > 0 ? '+' : ''}${growthRate.toFixed(1)}% from previous period` : 'No growth data available'}
      </div>
    </>
  );
};

export default SalesChart;
