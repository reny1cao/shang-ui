export interface StockData {
  date: string;
  actual: number | null;
  predicted: number | null;
  volume: number;
}

export interface TimeRange {
  label: string;
  value: string;
  days: number;
}

export interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ComponentType;
  trend: 'up' | 'down' | 'neutral';
}