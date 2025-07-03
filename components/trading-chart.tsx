"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Activity,
  Volume2,
  Target,
  Clock
} from "lucide-react";

interface TradingChartProps {
  symbol: string;
  data: Array<{ time: string; open: number; high: number; low: number; close: number; volume: number }>;
  currentPrice: number;
  change: number;
  changePercent: number;
}

export function TradingChart({ symbol, data, currentPrice, change, changePercent }: TradingChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [timeframe, setTimeframe] = useState('1D');
  const [chartType, setChartType] = useState('candlestick');
  const [showVolume, setShowVolume] = useState(true);

  useEffect(() => {
    if (!chartContainerRef.current || typeof window === 'undefined') return;

    // Simulate TradingView-style chart
    const container = chartContainerRef.current;
    container.innerHTML = '';

    // Create chart container
    const chartDiv = document.createElement('div');
    chartDiv.style.width = '100%';
    chartDiv.style.height = '400px';
    chartDiv.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)';
    chartDiv.style.position = 'relative';
    chartDiv.style.borderRadius = '8px';
    chartDiv.style.overflow = 'hidden';

    // Create grid lines
    const gridSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    gridSvg.style.position = 'absolute';
    gridSvg.style.width = '100%';
    gridSvg.style.height = '100%';
    gridSvg.style.top = '0';
    gridSvg.style.left = '0';
    gridSvg.style.pointerEvents = 'none';

    // Add horizontal grid lines
    for (let i = 0; i <= 10; i++) {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', '0');
      line.setAttribute('y1', `${i * 10}%`);
      line.setAttribute('x2', '100%');
      line.setAttribute('y2', `${i * 10}%`);
      line.setAttribute('stroke', 'rgba(255,255,255,0.1)');
      line.setAttribute('stroke-width', '1');
      gridSvg.appendChild(line);
    }

    // Add vertical grid lines
    for (let i = 0; i <= 10; i++) {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', `${i * 10}%`);
      line.setAttribute('y1', '0');
      line.setAttribute('x2', `${i * 10}%`);
      line.setAttribute('y2', '100%');
      line.setAttribute('stroke', 'rgba(255,255,255,0.1)');
      line.setAttribute('stroke-width', '1');
      gridSvg.appendChild(line);
    }

    chartDiv.appendChild(gridSvg);

    // Create price line
    const priceSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    priceSvg.style.position = 'absolute';
    priceSvg.style.width = '100%';
    priceSvg.style.height = '100%';
    priceSvg.style.top = '0';
    priceSvg.style.left = '0';

    // Generate price path
    const points = data.slice(-50).map((item, index) => {
      const x = (index / 49) * 100;
      const y = 100 - ((item.close - Math.min(...data.slice(-50).map(d => d.low))) / 
                      (Math.max(...data.slice(-50).map(d => d.high)) - Math.min(...data.slice(-50).map(d => d.low)))) * 80 - 10;
      return `${x},${y}`;
    }).join(' ');

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    path.setAttribute('points', points);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', change >= 0 ? '#00ff88' : '#ff4757');
    path.setAttribute('stroke-width', '2');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');

    // Add glow effect
    const glowPath = path.cloneNode() as SVGElement;
    glowPath.setAttribute('stroke-width', '4');
    glowPath.setAttribute('opacity', '0.3');
    glowPath.setAttribute('filter', 'blur(2px)');

    priceSvg.appendChild(glowPath);
    priceSvg.appendChild(path);

    // Add area fill
    const area = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    const areaPoints = `0,100 ${points} 100,100`;
    area.setAttribute('points', areaPoints);
    area.setAttribute('fill', `url(#gradient-${symbol})`);
    area.setAttribute('opacity', '0.2');

    // Create gradient
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.setAttribute('id', `gradient-${symbol}`);
    gradient.setAttribute('x1', '0%');
    gradient.setAttribute('y1', '0%');
    gradient.setAttribute('x2', '0%');
    gradient.setAttribute('y2', '100%');

    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', change >= 0 ? '#00ff88' : '#ff4757');
    stop1.setAttribute('stop-opacity', '0.8');

    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('stop-color', change >= 0 ? '#00ff88' : '#ff4757');
    stop2.setAttribute('stop-opacity', '0');

    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    defs.appendChild(gradient);
    priceSvg.appendChild(defs);
    priceSvg.appendChild(area);

    chartDiv.appendChild(priceSvg);

    // Add price labels
    const priceLabel = document.createElement('div');
    priceLabel.style.position = 'absolute';
    priceLabel.style.top = '10px';
    priceLabel.style.right = '10px';
    priceLabel.style.background = 'rgba(0,0,0,0.8)';
    priceLabel.style.color = 'white';
    priceLabel.style.padding = '8px 12px';
    priceLabel.style.borderRadius = '4px';
    priceLabel.style.fontSize = '14px';
    priceLabel.style.fontWeight = 'bold';
    priceLabel.textContent = `$${currentPrice.toFixed(2)}`;
    chartDiv.appendChild(priceLabel);

    container.appendChild(chartDiv);

  }, [data, symbol, currentPrice, change, timeframe, chartType]);

  const timeframes = ['1m', '5m', '15m', '1H', '4H', '1D', '1W', '1M'];

  return (
    <div className="space-y-4">
      {/* Chart Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div>
            <h3 className="text-2xl font-bold">{symbol}</h3>
            <div className="flex items-center space-x-2">
              <span className="text-3xl font-bold">${currentPrice.toFixed(2)}</span>
              <div className={`flex items-center space-x-1 ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                <span className="font-medium">
                  {change >= 0 ? '+' : ''}{change.toFixed(2)} ({changePercent >= 0 ? '+' : ''}{changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Controls */}
        <div className="flex items-center space-x-2">
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            {timeframes.map((tf) => (
              <Button
                key={tf}
                variant={timeframe === tf ? "default" : "ghost"}
                size="sm"
                onClick={() => setTimeframe(tf)}
                className="h-8 px-3 text-xs"
              >
                {tf}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chart */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-gray-900 to-blue-900 text-white overflow-hidden">
        <CardContent className="p-0">
          <div ref={chartContainerRef} className="w-full" />
        </CardContent>
      </Card>

      {/* Chart Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="technicals">Technicals</TabsTrigger>
          <TabsTrigger value="volume">Volume</TabsTrigger>
          <TabsTrigger value="orderbook">Order Book</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">Market Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Open</span>
                  <span className="font-medium">${data[data.length - 1]?.open.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">High</span>
                  <span className="font-medium text-green-600">${Math.max(...data.slice(-1).map(d => d.high)).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Low</span>
                  <span className="font-medium text-red-600">${Math.min(...data.slice(-1).map(d => d.low)).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Volume</span>
                  <span className="font-medium">{(data[data.length - 1]?.volume / 1000000).toFixed(1)}M</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">1D Change</span>
                  <span className={`font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {changePercent.toFixed(2)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">1W Change</span>
                  <span className="font-medium text-green-600">+2.34%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">1M Change</span>
                  <span className="font-medium text-green-600">+8.91%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">YTD Change</span>
                  <span className="font-medium text-green-600">+24.67%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">Key Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Market Cap</span>
                  <span className="font-medium">$2.8T</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">P/E Ratio</span>
                  <span className="font-medium">28.4</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Dividend</span>
                  <span className="font-medium">0.52%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Beta</span>
                  <span className="font-medium">1.24</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="technicals">
          <TechnicalIndicators symbol={symbol} />
        </TabsContent>

        <TabsContent value="volume">
          <VolumeAnalysis data={data} />
        </TabsContent>

        <TabsContent value="orderbook">
          <OrderBook symbol={symbol} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function TechnicalIndicators({ symbol }: { symbol: string }) {
  const indicators = [
    { name: 'RSI (14)', value: 67.3, signal: 'Neutral', color: 'text-yellow-600' },
    { name: 'MACD', value: 0.45, signal: 'Bullish', color: 'text-green-600' },
    { name: 'Bollinger Bands', value: 0.82, signal: 'Overbought', color: 'text-red-600' },
    { name: 'Stochastic', value: 73.2, signal: 'Overbought', color: 'text-red-600' },
    { name: 'Williams %R', value: -28.4, signal: 'Bullish', color: 'text-green-600' },
    { name: 'CCI', value: 145.7, signal: 'Overbought', color: 'text-red-600' },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span>Technical Indicators</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {indicators.map((indicator, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{indicator.name}</div>
                  <div className="text-sm text-gray-500">{indicator.value}</div>
                </div>
                <Badge variant="outline" className={indicator.color}>
                  {indicator.signal}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Support & Resistance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="text-sm text-gray-500 mb-2">Resistance Levels</div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-red-600">R3</span>
                  <span className="font-medium">$195.40</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-600">R2</span>
                  <span className="font-medium">$192.80</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-600">R1</span>
                  <span className="font-medium">$190.20</span>
                </div>
              </div>
            </div>
            <div className="border-t pt-4">
              <div className="text-sm text-gray-500 mb-2">Support Levels</div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-green-600">S1</span>
                  <span className="font-medium">$185.60</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-600">S2</span>
                  <span className="font-medium">$183.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-600">S3</span>
                  <span className="font-medium">$180.40</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function VolumeAnalysis({ data }: { data: Array<{ time: string; open: number; high: number; low: number; close: number; volume: number }> }) {
  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Volume2 className="h-5 w-5" />
          <span>Volume Analysis</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4">
          <div className="flex items-end justify-between h-full space-x-1">
            {data.slice(-20).map((item, index) => (
              <div
                key={index}
                className="bg-blue-500 rounded-t"
                style={{
                  height: `${(item.volume / Math.max(...data.slice(-20).map(d => d.volume))) * 100}%`,
                  width: '4%'
                }}
              />
            ))}
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">
              {(data[data.length - 1]?.volume / 1000000).toFixed(1)}M
            </div>
            <div className="text-sm text-gray-500">Current Volume</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">
              {(data.slice(-10).reduce((acc, d) => acc + d.volume, 0) / 10 / 1000000).toFixed(1)}M
            </div>
            <div className="text-sm text-gray-500">Avg Volume (10D)</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">1.34</div>
            <div className="text-sm text-gray-500">Volume Ratio</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function OrderBook({ symbol }: { symbol: string }) {
  const bids = [
    { price: 188.45, size: 1250, total: 1250 },
    { price: 188.44, size: 890, total: 2140 },
    { price: 188.43, size: 2100, total: 4240 },
    { price: 188.42, size: 750, total: 4990 },
    { price: 188.41, size: 1800, total: 6790 },
  ];

  const asks = [
    { price: 188.46, size: 980, total: 980 },
    { price: 188.47, size: 1450, total: 2430 },
    { price: 188.48, size: 670, total: 3100 },
    { price: 188.49, size: 2200, total: 5300 },
    { price: 188.50, size: 1100, total: 6400 },
  ];

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart3 className="h-5 w-5" />
          <span>Order Book</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Bids */}
          <div>
            <div className="text-sm font-medium text-green-600 mb-3">Bids</div>
            <div className="space-y-1">
              <div className="grid grid-cols-3 gap-2 text-xs text-gray-500 pb-2 border-b">
                <span>Price</span>
                <span className="text-right">Size</span>
                <span className="text-right">Total</span>
              </div>
              {bids.map((bid, index) => (
                <div key={index} className="grid grid-cols-3 gap-2 text-sm">
                  <span className="text-green-600 font-medium">${bid.price}</span>
                  <span className="text-right">{bid.size}</span>
                  <span className="text-right text-gray-500">{bid.total}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Asks */}
          <div>
            <div className="text-sm font-medium text-red-600 mb-3">Asks</div>
            <div className="space-y-1">
              <div className="grid grid-cols-3 gap-2 text-xs text-gray-500 pb-2 border-b">
                <span>Price</span>
                <span className="text-right">Size</span>
                <span className="text-right">Total</span>
              </div>
              {asks.map((ask, index) => (
                <div key={index} className="grid grid-cols-3 gap-2 text-sm">
                  <span className="text-red-600 font-medium">${ask.price}</span>
                  <span className="text-right">{ask.size}</span>
                  <span className="text-right text-gray-500">{ask.total}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Spread */}
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Spread</span>
            <div className="text-right">
              <div className="font-medium">$0.01</div>
              <div className="text-xs text-gray-500">0.005%</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}