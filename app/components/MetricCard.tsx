"use client";

import { MetricCardProps } from "../types/stock";
import { cn } from "@/lib/utils";

export default function MetricCard({ title, value, change, icon: Icon, trend }: MetricCardProps) {
  return (
    <div className="bg-card p-6 rounded-lg border" role="status">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <Icon className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
      </div>
      <div className="space-y-1">
        <p className="text-2xl font-bold">{value}</p>
        <p className={cn(
          "text-sm",
          trend === "up" && "text-green-500",
          trend === "down" && "text-red-500",
          trend === "neutral" && "text-muted-foreground"
        )}>
          {change}
        </p>
      </div>
    </div>
  );
}