"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Globe, 
  TrendingUp, 
  TrendingDown, 
  Star,
  DollarSign,
  BarChart3,
  Shield,
  Zap,
  ArrowLeft,
  RefreshCw,
  Crown,
  AlertTriangle,
  Activity,
  Target
} from "lucide-react";
import Link from "next/link";
import { MarketHeatmap } from "@/components/market-heatmap";
import { TradingChart } from "@/components/trading-chart";

interface StockPick {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: string;
  aiScore: number;
  category: 'cheap' | 'best' | 'worst';
  reason: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  targetPrice: number;
  timeframe: string;
  region: string;
  sector: string;
  volume: number;
  priceHistory: Array<{ time: string; open: number; high: number; low: number; close: number; volume: number }>;
}

export default function BestStocksPage() {
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [stocks, setStocks] = useState<StockPick[]>([]);
  const [etfs, setEtfs] = useState<StockPick[]>([]);
  const [bonds, setBonds] = useState<StockPick[]>([]);
  const [selectedStock, setSelectedStock] = useState<StockPick | null>(null);

  useEffect(() => {
    loadGlobalPicks();
  }, []);

  const loadGlobalPicks = async () => {
    setLoading(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setStocks(generateStockPicks());
    setEtfs(generateETFPicks());
    setBonds(generateBondPicks());
    setLastUpdated(new Date());
    setLoading(false);
  };

  const generatePriceHistory = () => {
    const history = [];
    let price = Math.random() * 200 + 50;
    for (let i = 30; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const open = price;
      const change = (Math.random() - 0.5) * 10;
      const close = Math.max(open + change, 10);
      const high = Math.max(open, close) + Math.random() * 5;
      const low = Math.min(open, close) - Math.random() * 5;
      const volume = Math.random() * 10000000 + 1000000;
      
      history.push({
        time: date.toISOString().split('T')[0],
        open,
        high,
        low,
        close,
        volume
      });
      price = close;
    }
    return history;
  };

  const generateStockPicks = (): StockPick[] => {
    const stockData = [
      { symbol: 'NVDA', name: 'NVIDIA Corporation', sector: 'Technology', region: 'US' },
      { symbol: 'ASML', name: 'ASML Holding N.V.', sector: 'Technology', region: 'Europe' },
      { symbol: 'TSM', name: 'Taiwan Semiconductor', sector: 'Technology', region: 'Asia' },
      { symbol: 'SHOP', name: 'Shopify Inc.', sector: 'E-commerce', region: 'North America' },
      { symbol: 'PLTR', name: 'Palantir Technologies', sector: 'Software', region: 'US' },
      { symbol: 'AMD', name: 'Advanced Micro Devices', sector: 'Technology', region: 'US' },
      { symbol: 'BABA', name: 'Alibaba Group', sector: 'E-commerce', region: 'Asia' },
      { symbol: 'NFLX', name: 'Netflix Inc.', sector: 'Entertainment', region: 'Global' },
      { symbol: 'INTC', name: 'Intel Corporation', sector: 'Technology', region: 'US' }
    ];

    return stockData.map((stock, index) => ({
      ...stock,
      price: Math.random() * 300 + 50,
      change: (Math.random() - 0.5) * 20,
      changePercent: (Math.random() - 0.5) * 10,
      marketCap: `$${(Math.random() * 500 + 50).toFixed(0)}B`,
      aiScore: Math.random() * 30 + 70,
      category: index < 3 ? 'best' : index < 6 ? 'cheap' : 'worst',
      reason: generateReason(index < 3 ? 'best' : index < 6 ? 'cheap' : 'worst'),
      riskLevel: Math.random() > 0.6 ? 'LOW' : Math.random() > 0.3 ? 'MEDIUM' : 'HIGH',
      targetPrice: Math.random() * 400 + 100,
      timeframe: '6-12 months',
      volume: Math.random() * 50000000 + 10000000,
      priceHistory: generatePriceHistory()
    }));
  };

  const generateETFPicks = (): StockPick[] => {
    const etfData = [
      { symbol: 'QQQ', name: 'Invesco QQQ Trust', sector: 'Technology', region: 'US' },
      { symbol: 'SPY', name: 'SPDR S&P 500 ETF', sector: 'Diversified', region: 'US' },
      { symbol: 'VTI', name: 'Vanguard Total Stock Market', sector: 'Diversified', region: 'US' },
      { symbol: 'ARKK', name: 'ARK Innovation ETF', sector: 'Innovation', region: 'Global' },
      { symbol: 'EEM', name: 'iShares MSCI Emerging Markets', sector: 'Emerging Markets', region: 'Global' },
      { symbol: 'VEA', name: 'Vanguard FTSE Developed Markets', sector: 'International', region: 'Global' }
    ];

    return etfData.map((etf, index) => ({
      ...etf,
      price: Math.random() * 200 + 100,
      change: (Math.random() - 0.5) * 10,
      changePercent: (Math.random() - 0.5) * 5,
      marketCap: `$${(Math.random() * 100 + 10).toFixed(0)}B`,
      aiScore: Math.random() * 25 + 75,
      category: index < 2 ? 'best' : index < 4 ? 'cheap' : 'worst',
      reason: generateETFReason(index < 2 ? 'best' : index < 4 ? 'cheap' : 'worst'),
      riskLevel: index < 3 ? 'LOW' : 'MEDIUM',
      targetPrice: Math.random() * 250 + 120,
      timeframe: '12-18 months',
      volume: Math.random() * 20000000 + 5000000,
      priceHistory: generatePriceHistory()
    }));
  };

  const generateBondPicks = (): StockPick[] => {
    const bondData = [
      { symbol: 'TLT', name: 'iShares 20+ Year Treasury Bond', sector: 'Government Bonds', region: 'US' },
      { symbol: 'HYG', name: 'iShares iBoxx High Yield Corporate', sector: 'Corporate Bonds', region: 'US' },
      { symbol: 'LQD', name: 'iShares iBoxx Investment Grade', sector: 'Corporate Bonds', region: 'US' },
      { symbol: 'EMB', name: 'iShares J.P. Morgan USD Emerging Markets', sector: 'Emerging Market Bonds', region: 'Global' },
      { symbol: 'AGG', name: 'iShares Core U.S. Aggregate Bond', sector: 'Aggregate Bonds', region: 'US' }
    ];

    return bondData.map((bond, index) => ({
      ...bond,
      price: Math.random() * 50 + 80,
      change: (Math.random() - 0.5) * 2,
      changePercent: (Math.random() - 0.5) * 2,
      marketCap: `$${(Math.random() * 50 + 10).toFixed(0)}B`,
      aiScore: Math.random() * 20 + 70,
      category: index < 2 ? 'best' : index < 3 ? 'cheap' : 'worst',
      reason: generateBondReason(index < 2 ? 'best' : index < 3 ? 'cheap' : 'worst'),
      riskLevel: index === 0 ? 'LOW' : index < 3 ? 'MEDIUM' : 'HIGH',
      targetPrice: Math.random() * 60 + 90,
      timeframe: '6-24 months',
      volume: Math.random() * 5000000 + 1000000,
      priceHistory: generatePriceHistory()
    }));
  };

  const generateReason = (category: string): string => {
    const reasons = {
      best: [
        "Strong AI and semiconductor growth potential with expanding market share",
        "Leading market position in emerging technology sectors",
        "Exceptional revenue growth and profit margins exceeding expectations",
        "Dominant position in high-growth market segment with strong moat"
      ],
      cheap: [
        "Undervalued relative to growth potential and peer comparison",
        "Trading below historical P/E ratios with strong fundamentals",
        "Strong fundamentals with temporary market discount opportunity",
        "Oversold conditions present attractive buying opportunity"
      ],
      worst: [
        "Facing significant competitive pressures and market headwinds",
        "Declining market share in core business segments",
        "Regulatory challenges impacting growth prospects",
        "High debt levels and margin compression concerns"
      ]
    };
    return reasons[category as keyof typeof reasons][Math.floor(Math.random() * reasons[category as keyof typeof reasons].length)];
  };

  const generateETFReason = (category: string): string => {
    const reasons = {
      best: [
        "Diversified exposure to high-growth sectors with low fees",
        "Low expense ratio with strong historical performance track record",
        "Excellent liquidity and institutional backing with consistent flows"
      ],
      cheap: [
        "Attractive valuation with broad market exposure opportunity",
        "Temporary discount to underlying asset value presents value",
        "Strong dividend yield with growth potential in current environment"
      ],
      worst: [
        "High expense ratio reducing long-term returns for investors",
        "Concentrated exposure to declining sectors with limited upside",
        "Poor liquidity and tracking error issues affecting performance"
      ]
    };
    return reasons[category as keyof typeof reasons][Math.floor(Math.random() * reasons[category as keyof typeof reasons].length)];
  };

  const generateBondReason = (category: string): string => {
    const reasons = {
      best: [
        "Attractive yield in current interest rate environment with stability",
        "Strong credit quality with stable returns and low volatility",
        "Excellent portfolio diversification benefits in uncertain times"
      ],
      cheap: [
        "High yield compensates for credit risk in current market",
        "Oversold conditions in bond market present opportunity",
        "Duration risk priced in at current levels with upside potential"
      ],
      worst: [
        "High duration risk in rising rate environment with losses",
        "Credit quality concerns with economic uncertainty ahead",
        "Poor liquidity and high expense ratios affecting returns"
      ]
    };
    return reasons[category as keyof typeof reasons][Math.floor(Math.random() * reasons[category as keyof typeof reasons].length)];
  };

  const StockCard = ({ stock }: { stock: StockPick }) => (
    <Card 
      className="border-0 shadow-lg bg-black/40 backdrop-blur-sm text-white hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={() => setSelectedStock(stock)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg text-white">{stock.symbol}</CardTitle>
            <CardDescription className="text-sm text-gray-300">{stock.name}</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            {stock.category === 'best' && <Crown className="h-4 w-4 text-yellow-400" />}
            {stock.category === 'worst' && <AlertTriangle className="h-4 w-4 text-red-400" />}
            <Badge variant={
              stock.category === 'best' ? 'default' : 
              stock.category === 'cheap' ? 'secondary' : 'destructive'
            }>
              {stock.category.toUpperCase()}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-white">${stock.price.toFixed(2)}</div>
            <div className={`flex items-center space-x-1 text-sm ${
              stock.change >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {stock.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              <span>{stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400">AI Score</div>
            <div className="flex items-center space-x-2">
              <Progress value={stock.aiScore} className="w-16" />
              <span className="text-sm font-medium text-white">{stock.aiScore.toFixed(0)}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Market Cap</span>
            <span className="font-medium text-white">{stock.marketCap}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Target Price</span>
            <span className="font-medium text-green-400">${stock.targetPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Risk Level</span>
            <Badge variant={
              stock.riskLevel === 'LOW' ? 'default' : 
              stock.riskLevel === 'MEDIUM' ? 'secondary' : 'destructive'
            } className="text-xs">
              {stock.riskLevel}
            </Badge>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Volume</span>
            <span className="font-medium text-white">{(stock.volume / 1000000).toFixed(1)}M</span>
          </div>
        </div>

        <div className="pt-2 border-t border-white/20">
          <p className="text-sm text-gray-300">{stock.reason}</p>
        </div>

        <Link href={`/future-buy?symbol=${stock.symbol}`}>
          <Button className="w-full bg-blue-600 hover:bg-blue-700" variant="outline">
            <BarChart3 className="mr-2 h-4 w-4" />
            Detailed Analysis
          </Button>
        </Link>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="border-b bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Globe className="h-8 w-8 text-blue-400" />
                <h1 className="text-2xl font-bold text-white">Global Market Intelligence</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-white border-white/30">
                <Activity className="h-3 w-3 mr-1" />
                Last updated: {lastUpdated.toLocaleTimeString()}
              </Badge>
              <Button onClick={loadGlobalPicks} disabled={loading} variant="outline" className="text-white border-white/30 hover:bg-white/10">
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Link href="/future-buy">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Target className="h-4 w-4 mr-2" />
                  AI Analysis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            AI-Curated Global Investment Picks
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our AI analyzes thousands of global securities to identify the best performing, 
            most undervalued, and worst performing investments across stocks, ETFs, and bonds.
          </p>
        </div>

        {/* Market Heatmap */}
        <div className="mb-8">
          <MarketHeatmap />
        </div>

        {loading ? (
          <Card className="border-0 shadow-2xl bg-black/40 backdrop-blur-sm text-white">
            <CardContent className="py-12">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-full mb-4">
                  <Globe className="h-8 w-8 text-blue-400 animate-pulse" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Analyzing Global Markets</h3>
                <p className="text-gray-300 mb-4">
                  AI is scanning thousands of securities across global markets...
                </p>
                <Progress value={66} className="w-64 mx-auto" />
                <div className="mt-4 space-y-2 text-sm text-gray-400">
                  <div>✓ Scanning US markets (NYSE, NASDAQ)</div>
                  <div>✓ Analyzing European exchanges</div>
                  <div className="animate-pulse">⏳ Processing Asian markets...</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Selected Stock Chart */}
            {selectedStock && (
              <div className="mb-8">
                <TradingChart
                  symbol={selectedStock.symbol}
                  data={selectedStock.priceHistory}
                  currentPrice={selectedStock.price}
                  change={selectedStock.change}
                  changePercent={selectedStock.changePercent}
                />
              </div>
            )}

            <Tabs defaultValue="stocks" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 bg-black/40">
                <TabsTrigger value="stocks" className="flex items-center space-x-2 text-white data-[state=active]:bg-blue-600">
                  <TrendingUp className="h-4 w-4" />
                  <span>Stocks</span>
                </TabsTrigger>
                <TabsTrigger value="etfs" className="flex items-center space-x-2 text-white data-[state=active]:bg-blue-600">
                  <BarChart3 className="h-4 w-4" />
                  <span>ETFs</span>
                </TabsTrigger>
                <TabsTrigger value="bonds" className="flex items-center space-x-2 text-white data-[state=active]:bg-blue-600">
                  <Shield className="h-4 w-4" />
                  <span>Bonds</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="stocks" className="space-y-6">
                <div className="grid gap-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center space-x-2 text-white">
                      <Crown className="h-6 w-6 text-yellow-400" />
                      <span>Best Performing Stocks</span>
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {stocks.filter(s => s.category === 'best').map((stock) => (
                        <StockCard key={stock.symbol} stock={stock} />
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center space-x-2 text-white">
                      <DollarSign className="h-6 w-6 text-green-400" />
                      <span>Best Value Stocks</span>
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {stocks.filter(s => s.category === 'cheap').map((stock) => (
                        <StockCard key={stock.symbol} stock={stock} />
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center space-x-2 text-white">
                      <AlertTriangle className="h-6 w-6 text-red-400" />
                      <span>Underperforming Stocks</span>
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {stocks.filter(s => s.category === 'worst').map((stock) => (
                        <StockCard key={stock.symbol} stock={stock} />
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="etfs" className="space-y-6">
                <div className="grid gap-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center space-x-2 text-white">
                      <Crown className="h-6 w-6 text-yellow-400" />
                      <span>Top ETFs</span>
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {etfs.filter(e => e.category === 'best').map((etf) => (
                        <StockCard key={etf.symbol} stock={etf} />
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center space-x-2 text-white">
                      <DollarSign className="h-6 w-6 text-green-400" />
                      <span>Value ETFs</span>
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {etfs.filter(e => e.category === 'cheap').map((etf) => (
                        <StockCard key={etf.symbol} stock={etf} />
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center space-x-2 text-white">
                      <AlertTriangle className="h-6 w-6 text-red-400" />
                      <span>Underperforming ETFs</span>
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {etfs.filter(e => e.category === 'worst').map((etf) => (
                        <StockCard key={etf.symbol} stock={etf} />
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="bonds" className="space-y-6">
                <div className="grid gap-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center space-x-2 text-white">
                      <Crown className="h-6 w-6 text-yellow-400" />
                      <span>Top Bond Funds</span>
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {bonds.filter(b => b.category === 'best').map((bond) => (
                        <StockCard key={bond.symbol} stock={bond} />
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center space-x-2 text-white">
                      <DollarSign className="h-6 w-6 text-green-400" />
                      <span>High-Yield Bonds</span>
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {bonds.filter(b => b.category === 'cheap').map((bond) => (
                        <StockCard key={bond.symbol} stock={bond} />
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center space-x-2 text-white">
                      <AlertTriangle className="h-6 w-6 text-red-400" />
                      <span>Risky Bond Funds</span>
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {bonds.filter(b => b.category === 'worst').map((bond) => (
                        <StockCard key={bond.symbol} stock={bond} />
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </div>
  );
}