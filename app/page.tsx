"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, TrendingUp, DollarSign, Activity, AlertCircle, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import StockChart from "./components/StockChart";
import Sidebar from "./components/Sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Home() {
  const [stockSymbol, setStockSymbol] = useState("AAPL");

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 border-r">
        <Sidebar onSelectStock={setStockSymbol} currentStock={stockSymbol} />
      </div>

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">AI Stock Predictor</h1>
              <p className="text-muted-foreground">Advanced stock price predictions powered by AI</p>
            </div>
            
            {/* Mobile Sidebar Trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <Sidebar onSelectStock={setStockSymbol} currentStock={stockSymbol} />
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex gap-4 mb-8">
            <div className="flex-1">
              <Input
                value={stockSymbol}
                onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
                placeholder="Enter stock symbol (e.g., AAPL)"
                className="text-lg"
              />
            </div>
            <Button size="lg" className="gap-2">
              <Search className="w-4 h-4" /> Analyze
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <MetricCard
              title="Current Price"
              value="$180.25"
              change="+2.5%"
              icon={DollarSign}
              trend="up"
            />
            <MetricCard
              title="Predicted Price"
              value="$192.00"
              change="+6.5%"
              icon={TrendingUp}
              trend="up"
            />
            <MetricCard
              title="Trading Volume"
              value="12.5M"
              change="-3.2%"
              icon={Activity}
              trend="down"
            />
            <MetricCard
              title="Risk Level"
              value="Moderate"
              change="Medium"
              icon={AlertCircle}
              trend="neutral"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <StockChart />
            <MetricsCard />
          </div>
        </div>
      </main>
    </div>
  );
}

function MetricCard({ title, value, change, icon: Icon, trend }) {
  return (
    <div className="bg-card p-6 rounded-lg border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <Icon className="w-5 h-5 text-muted-foreground" />
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

function MetricsCard() {
  return (
    <div className="bg-card p-6 rounded-lg border">
      <h2 className="text-2xl font-semibold mb-4">Prediction Metrics</h2>
      <div className="space-y-4">
        <MetricRow label="Confidence Score" value="85%" />
        <MetricRow label="Price Target (3m)" value="$192.00" />
        <MetricRow label="Support Level" value="$175.50" />
        <MetricRow label="Resistance Level" value="$188.75" />
        <MetricRow label="AI Sentiment" value="Bullish" />
        <MetricRow label="Market Trend" value="Upward" />
        <MetricRow label="Volatility" value="Low" />
        <MetricRow label="Prediction Window" value="3 Months" />
      </div>
    </div>
  );
}

function MetricRow({ label, value }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-border last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}