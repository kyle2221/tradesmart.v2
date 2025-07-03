"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Star, 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  X,
  Search,
  Bell,
  MoreVertical
} from "lucide-react";

interface WatchlistItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  alertPrice?: number;
  isAlertActive: boolean;
}

export function Watchlist() {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([
    { symbol: 'AAPL', name: 'Apple Inc.', price: 188.45, change: 2.34, changePercent: 1.26, alertPrice: 190, isAlertActive: true },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 142.56, change: 3.45, changePercent: 2.48, isAlertActive: false },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 412.78, change: -1.23, changePercent: -0.30, alertPrice: 400, isAlertActive: true },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 234.12, change: 8.90, changePercent: 3.95, isAlertActive: false },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 875.43, change: 12.34, changePercent: 1.43, alertPrice: 900, isAlertActive: true },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const removeFromWatchlist = (symbol: string) => {
    setWatchlist(prev => prev.filter(item => item.symbol !== symbol));
  };

  const toggleAlert = (symbol: string) => {
    setWatchlist(prev => prev.map(item => 
      item.symbol === symbol 
        ? { ...item, isAlertActive: !item.isAlertActive }
        : item
    ));
  };

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Star className="h-6 w-6 text-yellow-500" />
            <span>Watchlist</span>
          </CardTitle>
          <Button size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Stock
          </Button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search watchlist..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-2">
        {watchlist
          .filter(item => 
            item.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((item) => (
            <div
              key={item.symbol}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  {item.symbol.slice(0, 2)}
                </div>
                <div>
                  <div className="font-semibold">{item.symbol}</div>
                  <div className="text-sm text-gray-500 truncate max-w-32">{item.name}</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* Price */}
                <div className="text-right">
                  <div className="font-semibold">${item.price.toFixed(2)}</div>
                  <div className={`flex items-center space-x-1 text-sm ${
                    item.change >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {item.change >= 0 ? 
                      <TrendingUp className="h-3 w-3" /> : 
                      <TrendingDown className="h-3 w-3" />
                    }
                    <span>{item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%</span>
                  </div>
                </div>

                {/* Alert */}
                <Button
                  size="sm"
                  variant={item.isAlertActive ? "default" : "outline"}
                  onClick={() => toggleAlert(item.symbol)}
                  className="h-8 w-8 p-0"
                >
                  <Bell className="h-3 w-3" />
                </Button>

                {/* Remove */}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => removeFromWatchlist(item.symbol)}
                  className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}

        {watchlist.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Star className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Your watchlist is empty</p>
            <p className="text-sm">Add stocks to track their performance</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}