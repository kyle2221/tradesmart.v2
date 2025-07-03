"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  BarChart3,
  DollarSign,
  Calendar,
  Zap,
  ArrowLeft,
  Activity
} from "lucide-react";
import Link from "next/link";
import { AIAnalysisResult } from "@/components/ai-analysis-result";
import { RealTimeCharts } from "@/components/real-time-charts";
import { RiskAssessment } from "@/components/risk-assessment";
import { MarketDashboard } from "@/components/market-dashboard";
import { Watchlist } from "@/components/watchlist";
import { MarketNews } from "@/components/market-news";

interface AnalysisResult {
  symbol: string;
  name: string;
  currentPrice: number;
  prediction: 'BUY' | 'HOLD' | 'SELL';
  confidence: number;
  targetPrice: number;
  timeframe: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  aiScore: number;
  reasons: string[];
  warnings: string[];
  technicalIndicators: {
    rsi: number;
    macd: string;
    movingAverage: string;
    volume: string;
  };
  fundamentals: {
    peRatio: number;
    marketCap: string;
    dividend: number;
    growth: number;
  };
  priceHistory: Array<{ time: string; open: number; high: number; low: number; close: number; volume: number }>;
}

export default function FutureBuyPage() {
  const [symbol, setSymbol] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  const analyzeStock = async () => {
    if (!symbol.trim()) return;
    
    setLoading(true);
    
    // Simulate AI analysis with realistic data
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockAnalysis: AnalysisResult = {
      symbol: symbol.toUpperCase(),
      name: getCompanyName(symbol.toUpperCase()),
      currentPrice: Math.random() * 200 + 50,
      prediction: Math.random() > 0.4 ? 'BUY' : Math.random() > 0.7 ? 'HOLD' : 'SELL',
      confidence: Math.random() * 30 + 70,
      targetPrice: Math.random() * 250 + 75,
      timeframe: "6-12 months",
      riskLevel: Math.random() > 0.6 ? 'LOW' : Math.random() > 0.3 ? 'MEDIUM' : 'HIGH',
      aiScore: Math.random() * 30 + 70,
      reasons: generateReasons(symbol.toUpperCase()),
      warnings: generateWarnings(),
      technicalIndicators: {
        rsi: Math.random() * 100,
        macd: Math.random() > 0.5 ? 'Bullish' : 'Bearish',
        movingAverage: Math.random() > 0.5 ? 'Above 50-day MA' : 'Below 50-day MA',
        volume: Math.random() > 0.5 ? 'Above Average' : 'Below Average'
      },
      fundamentals: {
        peRatio: Math.random() * 30 + 10,
        marketCap: `$${(Math.random() * 500 + 50).toFixed(1)}B`,
        dividend: Math.random() * 5,
        growth: Math.random() * 20 - 5
      },
      priceHistory: generatePriceHistory()
    };
    
    setAnalysis(mockAnalysis);
    setLoading(false);
  };

  const getCompanyName = (symbol: string): string => {
    const companies: { [key: string]: string } = {
      'AAPL': 'Apple Inc.',
      'GOOGL': 'Alphabet Inc.',
      'MSFT': 'Microsoft Corporation',
      'AMZN': 'Amazon.com Inc.',
      'TSLA': 'Tesla Inc.',
      'NVDA': 'NVIDIA Corporation',
      'META': 'Meta Platforms Inc.',
      'NFLX': 'Netflix Inc.',
      'SPY': 'SPDR S&P 500 ETF',
      'QQQ': 'Invesco QQQ Trust'
    };
    return companies[symbol] || `${symbol} Corporation`;
  };

  const generateReasons = (symbol: string): string[] => {
    const reasons = [
      "Strong quarterly earnings growth exceeding analyst expectations",
      "Expanding market share in key business segments",
      "Robust cash flow generation and healthy balance sheet",
      "Innovative product pipeline driving future revenue",
      "Favorable industry trends and market positioning",
      "Strong management team with proven track record",
      "Undervalued compared to industry peers",
      "Positive analyst sentiment and price target revisions",
      "Growing dividend payments and shareholder returns",
      "Strategic partnerships and acquisition opportunities"
    ];
    return reasons.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 3);
  };

  const generateWarnings = (): string[] => {
    const warnings = [
      "High market volatility may impact short-term performance",
      "Regulatory changes could affect business operations",
      "Increased competition in core markets",
      "Economic uncertainty may impact consumer spending",
      "Currency fluctuations for international operations"
    ];
    return Math.random() > 0.3 ? warnings.slice(0, Math.floor(Math.random() * 2) + 1) : [];
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

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-gray-800">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <Target className="h-6 w-6 text-black" />
                </div>
                <h1 className="text-2xl font-bold text-white">AI Trading Terminal</h1>
                <div className="px-2 py-1 bg-green-500/20 rounded text-xs text-green-400 border border-green-500/30 animate-pulse">
                  LIVE
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-cyan-400 border-cyan-500/30 bg-cyan-500/10">
                <Activity className="h-3 w-3 mr-1 animate-pulse" />
                Real-time Data
              </Badge>
              <Link href="/best-stocks">
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-800">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Global Markets
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Watchlist />
            <MarketNews />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search Section */}
            <Card className="border-gray-800 bg-black/50 backdrop-blur-sm glass-effect">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-6 w-6 text-cyan-400" />
                  <span className="text-white">AI Investment Analysis</span>
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Enter a stock symbol, ETF, or bond to get detailed AI-powered investment analysis and future predictions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <Label htmlFor="symbol" className="text-gray-300">Stock Symbol / Ticker</Label>
                    <Input
                      id="symbol"
                      placeholder="e.g., AAPL, GOOGL, SPY, QQQ"
                      value={symbol}
                      onChange={(e) => setSymbol(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && analyzeStock()}
                      className="mt-1 bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-500"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button 
                      onClick={analyzeStock} 
                      disabled={loading || !symbol.trim()}
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-black font-semibold animate-glow"
                    >
                      {loading ? (
                        <>
                          <Zap className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Brain className="mr-2 h-4 w-4" />
                          Analyze
                        </>
                      )}
                    </Button>
                  </div>
                </div>
                
                {/* Popular Symbols */}
                <div className="mt-4">
                  <Label className="text-sm text-gray-400">Popular Symbols:</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'NVDA', 'SPY', 'QQQ'].map((ticker) => (
                      <Badge 
                        key={ticker}
                        variant="outline" 
                        className="cursor-pointer hover:bg-cyan-500/20 border-gray-600 text-gray-300 hover:text-white hover:border-cyan-500"
                        onClick={() => setSymbol(ticker)}
                      >
                        {ticker}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Market Dashboard */}
            <MarketDashboard />

            {/* Loading State */}
            {loading && (
              <Card className="border-gray-800 bg-black/50 backdrop-blur-sm glass-effect">
                <CardContent className="py-8">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-500/20 rounded-full mb-4 animate-pulse">
                      <Brain className="h-8 w-8 text-cyan-400" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-white">AI Analysis in Progress</h3>
                    <p className="text-gray-400 mb-4">
                      Our AI is analyzing market data, technical indicators, and fundamental metrics...
                    </p>
                    <Progress value={33} className="w-64 mx-auto bg-gray-800" />
                    <div className="mt-4 space-y-2 text-sm text-gray-500">
                      <div className="text-green-400">✓ Fetching real-time market data</div>
                      <div className="text-green-400">✓ Analyzing technical indicators</div>
                      <div className="animate-pulse text-cyan-400">⏳ Processing AI predictions...</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Analysis Results */}
            {analysis && !loading && (
              <div className="space-y-6">
                {/* Real-Time Charts */}
                <RealTimeCharts
                  symbol={analysis.symbol}
                  data={analysis.priceHistory}
                  currentPrice={analysis.currentPrice}
                  change={analysis.currentPrice - analysis.priceHistory[analysis.priceHistory.length - 2]?.close || 0}
                  changePercent={((analysis.currentPrice - analysis.priceHistory[analysis.priceHistory.length - 2]?.close || 0) / analysis.currentPrice) * 100}
                />

                {/* Main Analysis Card */}
                <Card className="border-gray-800 bg-black/50 backdrop-blur-sm glass-effect">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl text-white">{analysis.symbol}</CardTitle>
                        <CardDescription className="text-lg text-gray-400">{analysis.name}</CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-white">${analysis.currentPrice.toFixed(2)}</div>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge 
                            variant={analysis.prediction === 'BUY' ? 'default' : analysis.prediction === 'HOLD' ? 'secondary' : 'destructive'}
                            className={`text-sm ${
                              analysis.prediction === 'BUY' ? 'bg-green-600 hover:bg-green-700' :
                              analysis.prediction === 'HOLD' ? 'bg-yellow-600 hover:bg-yellow-700' :
                              'bg-red-600 hover:bg-red-700'
                            }`}
                          >
                            {analysis.prediction === 'BUY' && <TrendingUp className="h-3 w-3 mr-1" />}
                            {analysis.prediction === 'SELL' && <TrendingDown className="h-3 w-3 mr-1" />}
                            {analysis.prediction}
                          </Badge>
                          <Badge variant="outline" className="border-cyan-500/30 text-cyan-400">
                            {analysis.confidence.toFixed(0)}% Confidence
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-400">AI Score</Label>
                          <div className="flex items-center space-x-2 mt-1">
                            <Progress value={analysis.aiScore} className="flex-1 bg-gray-800" />
                            <span className="text-sm font-medium text-white">{analysis.aiScore.toFixed(0)}/100</span>
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-400">Target Price</Label>
                          <div className="text-2xl font-bold text-green-400">${analysis.targetPrice.toFixed(2)}</div>
                          <div className="text-sm text-gray-500">{analysis.timeframe}</div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-400">Risk Level</Label>
                          <div className="flex items-center space-x-2 mt-1">
                            <Shield className={`h-4 w-4 ${
                              analysis.riskLevel === 'LOW' ? 'text-green-400' : 
                              analysis.riskLevel === 'MEDIUM' ? 'text-yellow-400' : 'text-red-400'
                            }`} />
                            <Badge variant={
                              analysis.riskLevel === 'LOW' ? 'default' : 
                              analysis.riskLevel === 'MEDIUM' ? 'secondary' : 'destructive'
                            } className={
                              analysis.riskLevel === 'LOW' ? 'bg-green-600' : 
                              analysis.riskLevel === 'MEDIUM' ? 'bg-yellow-600' : 'bg-red-600'
                            }>
                              {analysis.riskLevel}
                            </Badge>
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-400">Potential Return</Label>
                          <div className="text-2xl font-bold text-cyan-400">
                            {((analysis.targetPrice - analysis.currentPrice) / analysis.currentPrice * 100).toFixed(1)}%
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-400">Market Cap</Label>
                          <div className="text-lg font-semibold text-white">{analysis.fundamentals.marketCap}</div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-400">P/E Ratio</Label>
                          <div className="text-lg font-semibold text-white">{analysis.fundamentals.peRatio.toFixed(1)}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Detailed Analysis Tabs */}
                <Tabs defaultValue="analysis" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-3 bg-gray-900/50 border border-gray-700">
                    <TabsTrigger value="analysis" className="text-gray-300 data-[state=active]:bg-cyan-600 data-[state=active]:text-black">AI Analysis</TabsTrigger>
                    <TabsTrigger value="technical" className="text-gray-300 data-[state=active]:bg-cyan-600 data-[state=active]:text-black">Technical</TabsTrigger>
                    <TabsTrigger value="risk" className="text-gray-300 data-[state=active]:bg-cyan-600 data-[state=active]:text-black">Risk Assessment</TabsTrigger>
                  </TabsList>

                  <TabsContent value="analysis">
                    <AIAnalysisResult analysis={analysis} />
                  </TabsContent>

                  <TabsContent value="technical">
                    <Card className="border-gray-800 bg-black/50 backdrop-blur-sm glass-effect">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2 text-white">
                          <BarChart3 className="h-5 w-5" />
                          <span>Technical Analysis</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-400">RSI (14)</span>
                              <div className="flex items-center space-x-2">
                                <Progress value={analysis.technicalIndicators.rsi} className="w-20 bg-gray-800" />
                                <span className="text-sm font-medium text-white">{analysis.technicalIndicators.rsi.toFixed(0)}</span>
                              </div>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">MACD</span>
                              <Badge variant={analysis.technicalIndicators.macd === 'Bullish' ? 'default' : 'destructive'} 
                                     className={analysis.technicalIndicators.macd === 'Bullish' ? 'bg-green-600' : 'bg-red-600'}>
                                {analysis.technicalIndicators.macd}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Moving Average</span>
                              <span className="text-sm text-white">{analysis.technicalIndicators.movingAverage}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Volume</span>
                              <span className="text-sm text-white">{analysis.technicalIndicators.volume}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="risk">
                    <RiskAssessment analysis={analysis} />
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}