
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  format?: (value: any) => string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon: Icon, format }) => {
  const displayValue = format ? format(value) : value;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <CardDescription className="text-2xl font-bold">{displayValue}</CardDescription>
      </CardHeader>
      <CardContent>
        <Icon className="h-8 w-8 text-gray-400" />
      </CardContent>
    </Card>
  );
};

export default MetricCard;
