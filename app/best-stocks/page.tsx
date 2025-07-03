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
  AlertTriangle
} from "lucide-react";
import Link from "next/link";

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
}

export default function BestStocksPage() {
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [stocks, setStocks] = useState<StockPick[]>([]);
  const [etfs, setEtfs] = useState<StockPick[]>([]);
  const [bonds, setBonds] = useState<StockPick[]>([]);

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
      timeframe: '6-12 months'
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
      timeframe: '12-18 months'
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
      timeframe: '6-24 months'
    }));
  };

  const generateReason = (category: string): string => {
    const reasons = {
      best: [
        "Strong AI and semiconductor growth potential",
        "Leading market position in emerging technology",
        "Exceptional revenue growth and profit margins",
        "Dominant position in high-growth market segment"
      ],
      cheap: [
        "Undervalued relative to growth potential",
        "Trading below historical P/E ratios",
        "Strong fundamentals with temporary market discount",
        "Oversold conditions present buying opportunity"
      ],
      worst: [
        "Facing significant competitive pressures",
        "Declining market share in core business",
        "Regulatory challenges impacting growth",
        "High debt levels and margin compression"
      ]
    };
    return reasons[category as keyof typeof reasons][Math.floor(Math.random() * reasons[category as keyof typeof reasons].length)];
  };

  const generateETFReason = (category: string): string => {
    const reasons = {
      best: [
        "Diversified exposure to high-growth sectors",
        "Low expense ratio with strong historical performance",
        "Excellent liquidity and institutional backing"
      ],
      cheap: [
        "Attractive valuation with broad market exposure",
        "Temporary discount to underlying asset value",
        "Strong dividend yield with growth potential"
      ],
      worst: [
        "High expense ratio reducing returns",
        "Concentrated exposure to declining sectors",
        "Poor liquidity and tracking error issues"
      ]
    };
    return reasons[category as keyof typeof reasons][Math.floor(Math.random() * reasons[category as keyof typeof reasons].length)];
  };

  const generateBondReason = (category: string): string => {
    const reasons = {
      best: [
        "Attractive yield in current interest rate environment",
        "Strong credit quality with stable returns",
        "Excellent portfolio diversification benefits"
      ],
      cheap: [
        "High yield compensates for credit risk",
        "Oversold conditions in bond market",
        "Duration risk priced in at current levels"
      ],
      worst: [
        "High duration risk in rising rate environment",
        "Credit quality concerns with economic uncertainty",
        "Poor liquidity and high expense ratios"
      ]
    };
    return reasons[category as keyof typeof reasons][Math.floor(Math.random() * reasons[category as keyof typeof reasons].length)];
  };

  const StockCard = ({ stock }: { stock: StockPick }) => (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{stock.symbol}</CardTitle>
            <CardDescription className="text-sm">{stock.name}</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            {stock.category === 'best' && <Crown className="h-4 w-4 text-yellow-500" />}
            {stock.category === 'worst' && <AlertTriangle className="h-4 w-4 text-red-500" />}
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
            <div className="text-2xl font-bold">${stock.price.toFixed(2)}</div>
            <div className={`flex items-center space-x-1 text-sm ${
              stock.change >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {stock.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              <span>{stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">AI Score</div>
            <div className="flex items-center space-x-2">
              <Progress value={stock.aiScore} className="w-16" />
              <span className="text-sm font-medium">{stock.aiScore.toFixed(0)}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Market Cap</span>
            <span className="font-medium">{stock.marketCap}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Target Price</span>
            <span className="font-medium text-green-600">${stock.targetPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Risk Level</span>
            <Badge variant={
              stock.riskLevel === 'LOW' ? 'default' : 
              stock.riskLevel === 'MEDIUM' ? 'secondary' : 'destructive'
            } className="text-xs">
              {stock.riskLevel}
            </Badge>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Region</span>
            <span className="font-medium">{stock.region}</span>
          </div>
        </div>

        <div className="pt-2 border-t">
          <p className="text-sm text-gray-600 dark:text-gray-400">{stock.reason}</p>
        </div>

        <Link href={`/future-buy?symbol=${stock.symbol}`}>
          <Button className="w-full" variant="outline">
            <BarChart3 className="mr-2 h-4 w-4" />
            Detailed Analysis
          </Button>
        </Link>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Globe className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Best Stocks Global</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </div>
              <Button onClick={loadGlobalPicks} disabled={loading} variant="outline">
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Link href="/future-buy">
                <Button>Future Buy Analysis</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            AI-Curated Global Investment Picks
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our AI analyzes thousands of global securities to identify the best performing, 
            most undervalued, and worst performing investments across stocks, ETFs, and bonds.
          </p>
        </div>

        {loading ? (
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="py-12">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
                  <Globe className="h-8 w-8 text-blue-600 animate-pulse" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Analyzing Global Markets</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  AI is scanning thousands of securities across global markets...
                </p>
                <Progress value={66} className="w-64 mx-auto" />
                <div className="mt-4 space-y-2 text-sm text-gray-500">
                  <div>✓ Scanning US markets (NYSE, NASDAQ)</div>
                  <div>✓ Analyzing European exchanges</div>
                  <div className="animate-pulse">⏳ Processing Asian markets...</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Tabs defaultValue="stocks" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="stocks" className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4" />
                <span>Stocks</span>
              </TabsTrigger>
              <TabsTrigger value="etfs" className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4" />
                <span>ETFs</span>
              </TabsTrigger>
              <TabsTrigger value="bonds" className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>Bonds</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="stocks" className="space-y-6">
              <div className="grid gap-6">
                <div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center space-x-2">
                    <Crown className="h-6 w-6 text-yellow-500" />
                    <span>Best Performing Stocks</span>
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stocks.filter(s => s.category === 'best').map((stock) => (
                      <StockCard key={stock.symbol} stock={stock} />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center space-x-2">
                    <DollarSign className="h-6 w-6 text-green-500" />
                    <span>Best Value Stocks</span>
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stocks.filter(s => s.category === 'cheap').map((stock) => (
                      <StockCard key={stock.symbol} stock={stock} />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center space-x-2">
                    <AlertTriangle className="h-6 w-6 text-red-500" />
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
                  <h3 className="text-2xl font-bold mb-4 flex items-center space-x-2">
                    <Crown className="h-6 w-6 text-yellow-500" />
                    <span>Top ETFs</span>
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {etfs.filter(e => e.category === 'best').map((etf) => (
                      <StockCard key={etf.symbol} stock={etf} />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center space-x-2">
                    <DollarSign className="h-6 w-6 text-green-500" />
                    <span>Value ETFs</span>
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {etfs.filter(e => e.category === 'cheap').map((etf) => (
                      <StockCard key={etf.symbol} stock={etf} />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center space-x-2">
                    <AlertTriangle className="h-6 w-6 text-red-500" />
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
                  <h3 className="text-2xl font-bold mb-4 flex items-center space-x-2">
                    <Crown className="h-6 w-6 text-yellow-500" />
                    <span>Top Bond Funds</span>
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bonds.filter(b => b.category === 'best').map((bond) => (
                      <StockCard key={bond.symbol} stock={bond} />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center space-x-2">
                    <DollarSign className="h-6 w-6 text-green-500" />
                    <span>High-Yield Bonds</span>
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bonds.filter(b => b.category === 'cheap').map((bond) => (
                      <StockCard key={bond.symbol} stock={bond} />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center space-x-2">
                    <AlertTriangle className="h-6 w-6 text-red-500" />
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
        )}
      </div>
    </div>
  );
}