"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { TrendingUp } from "lucide-react";

interface PredictionChartProps {
  data: Array<{ date: string; price: number }>;
  targetPrice: number;
}

export function PredictionChart({ data, targetPrice }: PredictionChartProps) {
  const currentPrice = data[data.length - 1]?.price || 0;
  
  // Add future prediction point
  const futureDate = new Date();
  futureDate.setMonth(futureDate.getMonth() + 6);
  
  const chartData = [
    ...data,
    {
      date: futureDate.toISOString().split('T')[0],
      price: targetPrice,
      isPrediction: true
    }
  ];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border rounded-lg shadow-lg">
          <p className="text-sm font-medium">{formatDate(label)}</p>
          <p className="text-sm">
            <span className={data.isPrediction ? "text-blue-600" : "text-gray-600"}>
              {data.isPrediction ? "Target: " : "Price: "}
            </span>
            <span className="font-semibold">${payload[0].value.toFixed(2)}</span>
          </p>
          {data.isPrediction && (
            <p className="text-xs text-blue-500">AI Prediction</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5" />
          <span>Price Chart & AI Prediction</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                domain={['dataMin - 5', 'dataMax + 5']}
                tickFormatter={(value) => `$${value.toFixed(0)}`}
                tick={{ fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine 
                y={currentPrice} 
                stroke="#6b7280" 
                strokeDasharray="2 2" 
                label={{ value: "Current", position: "right" }}
              />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={(props) => {
                  const { payload } = props;
                  if (payload?.isPrediction) {
                    return <circle {...props} fill="#3b82f6" stroke="#3b82f6" strokeWidth={2} r={4} />;
                  }
                  return <circle {...props} fill="#3b82f6" r={2} />;
                }}
                connectNulls={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <div>Historical Price Movement</div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-0.5 bg-blue-500"></div>
              <span>Price Trend</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-0.5 bg-gray-400 border-dashed"></div>
              <span>Current Price</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}