"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

interface HeatmapData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: number;
  sector: string;
}

export function MarketHeatmap() {
  const heatmapData: HeatmapData[] = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 188.45, change: 2.34, changePercent: 1.26, marketCap: 2800, sector: 'Technology' },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 412.78, change: -1.23, changePercent: -0.30, marketCap: 3100, sector: 'Technology' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 142.56, change: 3.45, changePercent: 2.48, marketCap: 1800, sector: 'Technology' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 156.78, change: -2.11, changePercent: -1.33, marketCap: 1600, sector: 'Consumer' },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 234.12, change: 8.90, changePercent: 3.95, marketCap: 750, sector: 'Automotive' },
    { symbol: 'META', name: 'Meta Platforms', price: 498.23, change: 5.67, changePercent: 1.15, marketCap: 1300, sector: 'Technology' },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 875.43, change: 12.34, changePercent: 1.43, marketCap: 2200, sector: 'Technology' },
    { symbol: 'JPM', name: 'JPMorgan Chase', price: 178.90, change: -0.45, changePercent: -0.25, marketCap: 520, sector: 'Financial' },
    { symbol: 'JNJ', name: 'Johnson & Johnson', price: 162.34, change: 0.78, changePercent: 0.48, marketCap: 430, sector: 'Healthcare' },
    { symbol: 'V', name: 'Visa Inc.', price: 267.89, change: 1.23, changePercent: 0.46, marketCap: 580, sector: 'Financial' },
    { symbol: 'PG', name: 'Procter & Gamble', price: 156.78, change: -0.34, changePercent: -0.22, marketCap: 370, sector: 'Consumer' },
    { symbol: 'UNH', name: 'UnitedHealth Group', price: 523.45, change: 2.89, changePercent: 0.56, marketCap: 490, sector: 'Healthcare' },
  ];

  const getHeatmapColor = (changePercent: number) => {
    if (changePercent > 2) return 'bg-green-600';
    if (changePercent > 1) return 'bg-green-500';
    if (changePercent > 0) return 'bg-green-400';
    if (changePercent > -1) return 'bg-red-400';
    if (changePercent > -2) return 'bg-red-500';
    return 'bg-red-600';
  };

  const getTextColor = (changePercent: number) => {
    return Math.abs(changePercent) > 0.5 ? 'text-white' : 'text-gray-800';
  };

  const getSizeClass = (marketCap: number) => {
    if (marketCap > 2000) return 'col-span-3 row-span-2';
    if (marketCap > 1000) return 'col-span-2 row-span-2';
    if (marketCap > 500) return 'col-span-2';
    return 'col-span-1';
  };

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Activity className="h-6 w-6 text-blue-600" />
          <span>Market Heatmap</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-6 gap-2 h-96">
          {heatmapData.map((stock) => (
            <div
              key={stock.symbol}
              className={`
                ${getSizeClass(stock.marketCap)}
                ${getHeatmapColor(stock.changePercent)}
                ${getTextColor(stock.changePercent)}
                rounded-lg p-3 flex flex-col justify-between
                hover:scale-105 transition-all duration-200 cursor-pointer
                border border-white/20
              `}
            >
              <div>
                <div className="font-bold text-sm">{stock.symbol}</div>
                <div className="text-xs opacity-80 truncate">{stock.name}</div>
              </div>
              <div className="mt-auto">
                <div className="font-semibold">${stock.price.toFixed(2)}</div>
                <div className="flex items-center space-x-1 text-xs">
                  {stock.change >= 0 ? 
                    <TrendingUp className="h-3 w-3" /> : 
                    <TrendingDown className="h-3 w-3" />
                  }
                  <span>{stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-600 rounded"></div>
              <span className="text-xs text-gray-600">Strong Gains (+2%)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-400 rounded"></div>
              <span className="text-xs text-gray-600">Moderate Gains</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-400 rounded"></div>
              <span className="text-xs text-gray-600">Moderate Losses</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-600 rounded"></div>
              <span className="text-xs text-gray-600">Heavy Losses (-2%)</span>
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            Size = Market Cap
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}