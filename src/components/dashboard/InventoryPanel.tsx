
import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
} from "@/components/ui/card";
import {
  Table, TableHeader, TableBody, TableHead, TableRow, TableCell
} from "@/components/ui/table";

// Placeholder inventory data
const INVENTORY_ITEMS = [
  { name: 'Tortillas', level: 'High' },
  { name: 'Ground Beef', level: 'Medium' },
  { name: 'Chicken', level: 'High' },
  { name: 'Salsa', level: 'Medium' },
  { name: 'Avocados', level: 'Low' },
];

const InventoryPanel: React.FC = () => {
  return (
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
                {INVENTORY_ITEMS.map(item => (
                  <TableRow key={item.name}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell className="text-right">{item.level}</TableCell>
                  </TableRow>
                ))}
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
  );
};

export default InventoryPanel;
