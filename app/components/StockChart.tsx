"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from "recharts";
import { useState } from "react";

const timeRanges = [
  { label: "1 Week", value: "1W", days: 7 },
  { label: "1 Month", value: "1M", days: 30 },
  { label: "3 Months", value: "3M", days: 90 },
  { label: "6 Months", value: "6M", days: 180 },
  { label: "1 Year", value: "1Y", days: 365 },
  { label: "2 Years", value: "2Y", days: 730 },
];

const predictionRanges = [
  { label: "1 Week", value: "1W", days: 7 },
  { label: "2 Weeks", value: "2W", days: 14 },
  { label: "1 Month", value: "1M", days: 30 },
  { label: "3 Months", value: "3M", days: 90 },
  { label: "6 Months", value: "6M", days: 180 },
];

const generateMockData = (historyDays: number, predictionDays: number) => {
  const data = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - historyDays);

  for (let i = 0; i <= historyDays + predictionDays; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    const basePrice = 150 + Math.sin(i / 10) * 20 + (i / historyDays) * 30;
    
    data.push({
      date: date.toISOString().split("T")[0],
      actual: i <= historyDays ? basePrice : null,
      predicted: i > historyDays ? basePrice + Math.random() * 10 : null,
      volume: Math.floor(Math.random() * 1000000) + 500000,
    });
  }
  return data;
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== new Date().getFullYear() ? '2-digit' : undefined,
  }).format(date);
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const date = new Date(label);
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);

    return (
      <div className="bg-background border rounded-lg shadow-lg p-4">
        <p className="font-medium mb-2">{formattedDate}</p>
        {payload.map((entry: any, index: number) => (
          entry.value && (
            <p key={index} className="flex items-center gap-2" style={{ color: entry.color }}>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="font-medium">{entry.name}:</span>
              <span>${entry.value.toFixed(2)}</span>
            </p>
          )
        ))}
        {payload[0]?.payload.volume && (
          <p className="text-muted-foreground text-sm mt-2">
            Volume: {new Intl.NumberFormat().format(payload[0].payload.volume)}
          </p>
        )}
      </div>
    );
  }
  return null;
};

export default function StockChart() {
  const [selectedRange, setSelectedRange] = useState(timeRanges[2]); // Default to 3M
  const [predictionRange, setPredictionRange] = useState(predictionRanges[2]); // Default to 1M
  const data = generateMockData(selectedRange.days, predictionRange.days);
  const today = new Date().toISOString().split("T")[0];

  return (
    <Card className="col-span-2 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-semibold">Price Prediction Chart</h2>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground whitespace-nowrap">History:</span>
            <Select
              value={selectedRange.value}
              onValueChange={(value) => setSelectedRange(timeRanges.find(r => r.value === value)!)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timeRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground whitespace-nowrap">Predict:</span>
            <Select
              value={predictionRange.value}
              onValueChange={(value) => setPredictionRange(predictionRanges.find(r => r.value === value)!)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {predictionRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis
              dataKey="date"
              tickFormatter={formatDate}
              minTickGap={50}
            />
            <YAxis
              domain={['auto', 'auto']}
              tickFormatter={(value) => `$${value.toFixed(0)}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              formatter={(value) => value === "actual" ? "Historical" : "Predicted"}
            />
            <ReferenceLine 
              x={today} 
              stroke="hsl(var(--primary))" 
              strokeDasharray="3 3" 
              label={{ 
                value: "Today",
                position: "insideTopLeft",
                fill: "hsl(var(--primary))",
                fontSize: 12
              }} 
            />
            <Line
              type="monotone"
              dataKey="actual"
              name="actual"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="predicted"
              name="predicted"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 text-sm text-muted-foreground text-center">
        Showing {selectedRange.label} of historical data with {predictionRange.label} prediction
      </div>
    </Card>
  );
}