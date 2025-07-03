"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine,
  ComposedChart
} from "recharts";
import { 
  TrendingUp, 
  TrendingDown, 
  Activity,
  BarChart3,
  PieChartIcon,
  Zap,
  Target,
  DollarSign
} from "lucide-react";

interface RealTimeChartsProps {
  symbol: string;
  data: Array<{ time: string; open: number; high: number; low: number; close: number; volume: number }>;
  currentPrice: number;
  change: number;
  changePercent: number;
}

export function RealTimeCharts({ symbol, data, currentPrice, change, changePercent }: RealTimeChartsProps) {
  const [liveData, setLiveData] = useState(data);
  const [isLive, setIsLive] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isLive) {
      intervalRef.current = setInterval(() => {
        setLiveData(prevData => {
          const lastPrice = prevData[prevData.length - 1]?.close || currentPrice;
          const priceChange = (Math.random() - 0.5) * 2; // Random price movement
          const newPrice = Math.max(lastPrice + priceChange, 1);
          
          const newDataPoint = {
            time: new Date().toISOString(),
            open: lastPrice,
            high: Math.max(lastPrice, newPrice) + Math.random(),
            low: Math.min(lastPrice, newPrice) - Math.random(),
            close: newPrice,
            volume: Math.random() * 10000000 + 1000000
          };

          return [...prevData.slice(-50), newDataPoint];
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isLive, currentPrice]);

  // Prepare data for different chart types
  const chartData = liveData.slice(-30).map((item, index) => ({
    time: new Date(item.time).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    }),
    price: item.close,
    volume: item.volume / 1000000,
    high: item.high,
    low: item.low,
    open: item.open,
    change: index > 0 ? item.close - liveData[index - 1]?.close : 0
  }));

  // Portfolio allocation data for pie chart
  const portfolioData = [
    { name: 'Stocks', value: 45, color: '#00ff88' },
    { name: 'ETFs', value: 25, color: '#0099ff' },
    { name: 'Bonds', value: 20, color: '#ff6b6b' },
    { name: 'Cash', value: 10, color: '#ffd700' }
  ];

  // Sector performance data
  const sectorData = [
    { sector: 'Tech', performance: 12.5, volume: 45 },
    { sector: 'Finance', performance: 8.2, volume: 32 },
    { sector: 'Healthcare', performance: 6.8, volume: 28 },
    { sector: 'Energy', performance: -2.1, volume: 15 },
    { sector: 'Consumer', performance: 4.3, volume: 38 },
    { sector: 'Industrial', performance: 3.7, volume: 22 }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/90 border border-cyan-500/30 rounded-lg p-3 shadow-xl">
          <p className="text-cyan-400 text-sm font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-white text-sm">
              <span style={{ color: entry.color }}>{entry.dataKey}: </span>
              {entry.dataKey === 'price' ? `$${entry.value.toFixed(2)}` : 
               entry.dataKey === 'volume' ? `${entry.value.toFixed(1)}M` :
               entry.value.toFixed(2)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Chart Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h3 className="text-2xl font-bold text-white">{symbol} Real-Time Analytics</h3>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
            <span className="text-sm text-gray-400">{isLive ? 'LIVE' : 'PAUSED'}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant={isLive ? "default" : "outline"}
            onClick={() => setIsLive(!isLive)}
            className="bg-cyan-600 hover:bg-cyan-700"
          >
            <Activity className="h-4 w-4 mr-2" />
            {isLive ? 'Pause' : 'Resume'}
          </Button>
        </div>
      </div>

      {/* Main Price Chart */}
      <Card className="border-gray-800 bg-black/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-cyan-400" />
              <span>Live Price Movement</span>
            </CardTitle>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-white">
                  ${liveData[liveData.length - 1]?.close.toFixed(2)}
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  change >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  <span>{change >= 0 ? '+' : ''}{change.toFixed(2)} ({changePercent >= 0 ? '+' : ''}{changePercent.toFixed(2)}%)</span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData}>
                <defs>
                  <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00ff88" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00ff88" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="time" 
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                  axisLine={{ stroke: '#374151' }}
                />
                <YAxis 
                  yAxisId="price"
                  orientation="right"
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                  axisLine={{ stroke: '#374151' }}
                  tickFormatter={(value) => `$${value.toFixed(0)}`}
                />
                <YAxis 
                  yAxisId="volume"
                  orientation="left"
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                  axisLine={{ stroke: '#374151' }}
                  tickFormatter={(value) => `${value.toFixed(0)}M`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  yAxisId="volume"
                  dataKey="volume" 
                  fill="rgba(0, 255, 255, 0.2)" 
                  stroke="rgba(0, 255, 255, 0.5)"
                />
                <Area
                  yAxisId="price"
                  type="monotone"
                  dataKey="price"
                  stroke="#00ff88"
                  strokeWidth={2}
                  fill="url(#priceGradient)"
                />
                <Line
                  yAxisId="price"
                  type="monotone"
                  dataKey="price"
                  stroke="#00ff88"
                  strokeWidth={3}
                  dot={{ fill: '#00ff88', strokeWidth: 2, r: 3 }}
                  activeDot={{ r: 6, stroke: '#00ff88', strokeWidth: 2, fill: '#000' }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Portfolio Allocation Pie Chart */}
        <Card className="border-gray-800 bg-black/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <PieChartIcon className="h-5 w-5 text-purple-400" />
              <span>Portfolio Allocation</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={portfolioData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {portfolioData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-black/90 border border-cyan-500/30 rounded-lg p-3">
                            <p className="text-white font-medium">{data.name}</p>
                            <p className="text-cyan-400">{data.value}%</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {portfolioData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-gray-300">{item.name}</span>
                  <span className="text-sm font-medium text-white">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sector Performance */}
        <Card className="border-gray-800 bg-black/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-blue-400" />
              <span>Sector Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sectorData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    type="number" 
                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                    axisLine={{ stroke: '#374151' }}
                  />
                  <YAxis 
                    type="category" 
                    dataKey="sector"
                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                    axisLine={{ stroke: '#374151' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="performance" 
                    fill={(entry: any) => entry.performance >= 0 ? '#00ff88' : '#ff4757'}
                    radius={[0, 4, 4, 0]}
                  >
                    {sectorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.performance >= 0 ? '#00ff88' : '#ff4757'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Volume Analysis */}
      <Card className="border-gray-800 bg-black/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Activity className="h-5 w-5 text-yellow-400" />
            <span>Volume Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ffd700" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ffd700" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="time" 
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                  axisLine={{ stroke: '#374151' }}
                />
                <YAxis 
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                  axisLine={{ stroke: '#374151' }}
                  tickFormatter={(value) => `${value.toFixed(1)}M`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="volume"
                  stroke="#ffd700"
                  strokeWidth={2}
                  fill="url(#volumeGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Real-time Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="border-gray-800 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">24h Volume</p>
                <p className="text-2xl font-bold text-white">
                  {(chartData.reduce((acc, item) => acc + item.volume, 0)).toFixed(1)}M
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-cyan-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">24h High</p>
                <p className="text-2xl font-bold text-white">
                  ${Math.max(...chartData.map(d => d.high)).toFixed(2)}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-gradient-to-br from-red-500/10 to-pink-500/10 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">24h Low</p>
                <p className="text-2xl font-bold text-white">
                  ${Math.min(...chartData.map(d => d.low)).toFixed(2)}
                </p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Volatility</p>
                <p className="text-2xl font-bold text-white">
                  {(Math.max(...chartData.map(d => d.high)) - Math.min(...chartData.map(d => d.low))).toFixed(2)}
                </p>
              </div>
              <Zap className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}