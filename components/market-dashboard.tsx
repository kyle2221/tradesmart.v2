"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  LineChart, 
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Legend
} from "recharts";
import { 
  TrendingUp, 
  TrendingDown, 
  Activity,
  Globe,
  DollarSign,
  BarChart3,
  PieChartIcon,
  Zap,
  Target,
  AlertTriangle
} from "lucide-react";

export function MarketDashboard() {
  const [marketData, setMarketData] = useState({
    indices: [
      { name: 'S&P 500', value: 4756.50, change: 23.45, changePercent: 0.49 },
      { name: 'NASDAQ', value: 14845.12, change: -45.23, changePercent: -0.30 },
      { name: 'DOW', value: 37123.89, change: 156.78, changePercent: 0.42 },
      { name: 'Russell 2000', value: 2089.34, change: 12.67, changePercent: 0.61 }
    ],
    sectors: [
      { name: 'Technology', value: 28.5, change: 1.2, color: '#00ff88' },
      { name: 'Healthcare', value: 15.3, change: 0.8, color: '#0099ff' },
      { name: 'Financial', value: 13.2, change: -0.5, color: '#ff6b6b' },
      { name: 'Consumer', value: 12.8, change: 0.3, color: '#ffd700' },
      { name: 'Industrial', value: 10.1, change: 0.6, color: '#ff9500' },
      { name: 'Energy', value: 8.9, change: -1.1, color: '#9c27b0' },
      { name: 'Materials', value: 6.2, change: 0.4, color: '#4caf50' },
      { name: 'Utilities', value: 5.0, change: 0.1, color: '#607d8b' }
    ],
    topMovers: [
      { symbol: 'NVDA', name: 'NVIDIA Corp', price: 875.43, change: 45.67, changePercent: 5.51 },
      { symbol: 'TSLA', name: 'Tesla Inc', price: 234.12, change: -12.34, changePercent: -5.01 },
      { symbol: 'AAPL', name: 'Apple Inc', price: 188.45, change: 8.90, changePercent: 4.95 },
      { symbol: 'GOOGL', name: 'Alphabet Inc', price: 142.56, change: -6.78, changePercent: -4.54 },
      { symbol: 'MSFT', name: 'Microsoft Corp', price: 412.78, change: 15.23, changePercent: 3.83 }
    ],
    globalMarkets: [
      { name: 'Nikkei 225', value: 33486.89, change: 234.56, changePercent: 0.70, region: 'Asia' },
      { name: 'FTSE 100', value: 7623.45, change: -23.12, changePercent: -0.30, region: 'Europe' },
      { name: 'DAX', value: 16789.23, change: 89.45, changePercent: 0.54, region: 'Europe' },
      { name: 'Shanghai', value: 3045.67, change: 12.34, changePercent: 0.41, region: 'Asia' }
    ]
  });

  const [cryptoData] = useState([
    { name: 'Bitcoin', symbol: 'BTC', price: 67234.56, change: 1234.67, changePercent: 1.87 },
    { name: 'Ethereum', symbol: 'ETH', price: 3456.78, change: -123.45, changePercent: -3.45 },
    { name: 'Solana', symbol: 'SOL', price: 156.89, change: 8.90, changePercent: 6.01 },
    { name: 'Cardano', symbol: 'ADA', price: 0.67, change: 0.03, changePercent: 4.69 }
  ]);

  const [fearGreedIndex] = useState(72); // 0-100 scale

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData(prev => ({
        ...prev,
        indices: prev.indices.map(index => ({
          ...index,
          value: index.value + (Math.random() - 0.5) * 10,
          change: index.change + (Math.random() - 0.5) * 2,
          changePercent: index.changePercent + (Math.random() - 0.5) * 0.1
        }))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/90 border border-cyan-500/30 rounded-lg p-3 shadow-xl">
          <p className="text-cyan-400 text-sm font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-white text-sm">
              <span style={{ color: entry.color }}>{entry.dataKey}: </span>
              {typeof entry.value === 'number' ? entry.value.toFixed(2) : entry.value}
              {entry.dataKey === 'value' && '%'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Market Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        {marketData.indices.map((index, i) => (
          <Card key={i} className="border-gray-800 bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">{index.name}</p>
                  <p className="text-xl font-bold text-white">{index.value.toFixed(2)}</p>
                  <div className={`flex items-center space-x-1 text-sm ${
                    index.change >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {index.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    <span>{index.change >= 0 ? '+' : ''}{index.change.toFixed(2)} ({index.changePercent >= 0 ? '+' : ''}{index.changePercent.toFixed(2)}%)</span>
                  </div>
                </div>
                <Activity className="h-8 w-8 text-cyan-400 animate-pulse" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Sector Allocation */}
        <Card className="border-gray-800 bg-black/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <PieChartIcon className="h-5 w-5 text-purple-400" />
              <span>Market Sector Allocation</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={marketData.sectors}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    innerRadius={60}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {marketData.sectors.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    wrapperStyle={{ color: '#fff', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Fear & Greed Index */}
        <Card className="border-gray-800 bg-black/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Target className="h-5 w-5 text-yellow-400" />
              <span>Fear & Greed Index</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center">
              <div className="relative">
                <ResponsiveContainer width={300} height={300}>
                  <RadialBarChart 
                    cx="50%" 
                    cy="50%" 
                    innerRadius="60%" 
                    outerRadius="90%" 
                    data={[{ value: fearGreedIndex, fill: fearGreedIndex > 75 ? '#ff4757' : fearGreedIndex > 50 ? '#ffd700' : fearGreedIndex > 25 ? '#ff9500' : '#00ff88' }]}
                    startAngle={180}
                    endAngle={0}
                  >
                    <RadialBar dataKey="value" cornerRadius={10} />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <div className="text-4xl font-bold text-white">{fearGreedIndex}</div>
                  <div className="text-sm text-gray-400">
                    {fearGreedIndex > 75 ? 'Extreme Greed' : 
                     fearGreedIndex > 50 ? 'Greed' : 
                     fearGreedIndex > 25 ? 'Fear' : 'Extreme Fear'}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Movers */}
      <Card className="border-gray-800 bg-black/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Zap className="h-5 w-5 text-yellow-400" />
            <span>Top Market Movers</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-5 gap-4">
            {marketData.topMovers.map((stock, index) => (
              <div key={index} className="p-4 rounded-lg bg-gray-900/50 border border-gray-700 hover:border-cyan-500/50 transition-all">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="text-black font-bold text-sm">{stock.symbol.slice(0, 2)}</span>
                  </div>
                  <div className="font-semibold text-white text-sm">{stock.symbol}</div>
                  <div className="text-xs text-gray-400 truncate">{stock.name}</div>
                  <div className="text-lg font-bold text-white mt-2">${stock.price.toFixed(2)}</div>
                  <div className={`text-sm ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Global Markets & Crypto */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Global Markets */}
        <Card className="border-gray-800 bg-black/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Globe className="h-5 w-5 text-blue-400" />
              <span>Global Markets</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {marketData.globalMarkets.map((market, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-900/30 border border-gray-700">
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline" className="text-xs">
                      {market.region}
                    </Badge>
                    <div>
                      <div className="font-medium text-white">{market.name}</div>
                      <div className="text-sm text-gray-400">{market.value.toFixed(2)}</div>
                    </div>
                  </div>
                  <div className={`text-right ${market.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    <div className="font-medium">{market.change >= 0 ? '+' : ''}{market.change.toFixed(2)}</div>
                    <div className="text-sm">{market.changePercent >= 0 ? '+' : ''}{market.changePercent.toFixed(2)}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cryptocurrency */}
        <Card className="border-gray-800 bg-black/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-orange-400" />
              <span>Cryptocurrency</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cryptoData.map((crypto, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-900/30 border border-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-black font-bold text-xs">{crypto.symbol}</span>
                    </div>
                    <div>
                      <div className="font-medium text-white">{crypto.name}</div>
                      <div className="text-sm text-gray-400">${crypto.price.toFixed(2)}</div>
                    </div>
                  </div>
                  <div className={`text-right ${crypto.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    <div className="font-medium">{crypto.change >= 0 ? '+' : ''}{crypto.change.toFixed(2)}</div>
                    <div className="text-sm">{crypto.changePercent >= 0 ? '+' : ''}{crypto.changePercent.toFixed(2)}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Market Alerts */}
      <Card className="border-gray-800 bg-gradient-to-r from-red-500/10 to-orange-500/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            <span>Market Alerts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <span className="text-sm font-medium text-red-400">High Volatility</span>
              </div>
              <p className="text-sm text-gray-300">TSLA experiencing unusual trading volume</p>
            </div>
            <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="h-4 w-4 text-yellow-400" />
                <span className="text-sm font-medium text-yellow-400">Earnings Alert</span>
              </div>
              <p className="text-sm text-gray-300">AAPL earnings report due tomorrow</p>
            </div>
            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-400">Price Target</span>
              </div>
              <p className="text-sm text-gray-300">NVDA reached analyst price target</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}