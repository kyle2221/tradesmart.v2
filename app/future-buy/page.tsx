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
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { AIAnalysisResult } from "@/components/ai-analysis-result";
import { PredictionChart } from "@/components/prediction-chart";
import { RiskAssessment } from "@/components/risk-assessment";

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
  priceHistory: Array<{ date: string; price: number }>;
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
      price += (Math.random() - 0.5) * 10;
      history.push({
        date: date.toISOString().split('T')[0],
        price: Math.max(price, 10)
      });
    }
    return history;
  };

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
                <Target className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Future Buy Analysis</h1>
              </div>
            </div>
            <Link href="/best-stocks">
              <Button variant="outline">Best Stocks Global</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <Card className="mb-8 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-6 w-6 text-blue-600" />
              <span>AI Investment Analysis</span>
            </CardTitle>
            <CardDescription>
              Enter a stock symbol, ETF, or bond to get detailed AI-powered investment analysis and future predictions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <div className="flex-1">
                <Label htmlFor="symbol">Stock Symbol / Ticker</Label>
                <Input
                  id="symbol"
                  placeholder="e.g., AAPL, GOOGL, SPY, QQQ"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && analyzeStock()}
                  className="mt-1"
                />
              </div>
              <div className="flex items-end">
                <Button 
                  onClick={analyzeStock} 
                  disabled={loading || !symbol.trim()}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
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
              <Label className="text-sm text-gray-600 dark:text-gray-400">Popular Symbols:</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'NVDA', 'SPY', 'QQQ'].map((ticker) => (
                  <Badge 
                    key={ticker}
                    variant="outline" 
                    className="cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900"
                    onClick={() => setSymbol(ticker)}
                  >
                    {ticker}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Loading State */}
        {loading && (
          <Card className="mb-8 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="py-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
                  <Brain className="h-8 w-8 text-blue-600 animate-pulse" />
                </div>
                <h3 className="text-lg font-semibold mb-2">AI Analysis in Progress</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Our AI is analyzing market data, technical indicators, and fundamental metrics...
                </p>
                <Progress value={33} className="w-64 mx-auto" />
                <div className="mt-4 space-y-2 text-sm text-gray-500">
                  <div>✓ Fetching real-time market data</div>
                  <div>✓ Analyzing technical indicators</div>
                  <div className="animate-pulse">⏳ Processing AI predictions...</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Analysis Results */}
        {analysis && !loading && (
          <div className="space-y-6">
            {/* Main Analysis Card */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">{analysis.symbol}</CardTitle>
                    <CardDescription className="text-lg">{analysis.name}</CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">${analysis.currentPrice.toFixed(2)}</div>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge 
                        variant={analysis.prediction === 'BUY' ? 'default' : analysis.prediction === 'HOLD' ? 'secondary' : 'destructive'}
                        className="text-sm"
                      >
                        {analysis.prediction === 'BUY' && <TrendingUp className="h-3 w-3 mr-1" />}
                        {analysis.prediction === 'SELL' && <TrendingDown className="h-3 w-3 mr-1" />}
                        {analysis.prediction}
                      </Badge>
                      <Badge variant="outline">{analysis.confidence.toFixed(0)}% Confidence</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">AI Score</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <Progress value={analysis.aiScore} className="flex-1" />
                        <span className="text-sm font-medium">{analysis.aiScore.toFixed(0)}/100</span>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Target Price</Label>
                      <div className="text-2xl font-bold text-green-600">${analysis.targetPrice.toFixed(2)}</div>
                      <div className="text-sm text-gray-500">{analysis.timeframe}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Risk Level</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <Shield className={`h-4 w-4 ${
                          analysis.riskLevel === 'LOW' ? 'text-green-500' : 
                          analysis.riskLevel === 'MEDIUM' ? 'text-yellow-500' : 'text-red-500'
                        }`} />
                        <Badge variant={
                          analysis.riskLevel === 'LOW' ? 'default' : 
                          analysis.riskLevel === 'MEDIUM' ? 'secondary' : 'destructive'
                        }>
                          {analysis.riskLevel}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Potential Return</Label>
                      <div className="text-2xl font-bold text-blue-600">
                        {((analysis.targetPrice - analysis.currentPrice) / analysis.currentPrice * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Market Cap</Label>
                      <div className="text-lg font-semibold">{analysis.fundamentals.marketCap}</div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">P/E Ratio</Label>
                      <div className="text-lg font-semibold">{analysis.fundamentals.peRatio.toFixed(1)}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Analysis Tabs */}
            <Tabs defaultValue="analysis" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
                <TabsTrigger value="technical">Technical</TabsTrigger>
                <TabsTrigger value="fundamental">Fundamental</TabsTrigger>
                <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
              </TabsList>

              <TabsContent value="analysis">
                <AIAnalysisResult analysis={analysis} />
              </TabsContent>

              <TabsContent value="technical">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <BarChart3 className="h-5 w-5" />
                        <span>Technical Indicators</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>RSI (14)</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={analysis.technicalIndicators.rsi} className="w-20" />
                          <span className="text-sm font-medium">{analysis.technicalIndicators.rsi.toFixed(0)}</span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span>MACD</span>
                        <Badge variant={analysis.technicalIndicators.macd === 'Bullish' ? 'default' : 'destructive'}>
                          {analysis.technicalIndicators.macd}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Moving Average</span>
                        <span className="text-sm">{analysis.technicalIndicators.movingAverage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Volume</span>
                        <span className="text-sm">{analysis.technicalIndicators.volume}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <PredictionChart data={analysis.priceHistory} targetPrice={analysis.targetPrice} />
                </div>
              </TabsContent>

              <TabsContent value="fundamental">
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <DollarSign className="h-5 w-5" />
                      <span>Fundamental Analysis</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{analysis.fundamentals.peRatio.toFixed(1)}</div>
                        <div className="text-sm text-gray-500">P/E Ratio</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{analysis.fundamentals.marketCap}</div>
                        <div className="text-sm text-gray-500">Market Cap</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{analysis.fundamentals.dividend.toFixed(2)}%</div>
                        <div className="text-sm text-gray-500">Dividend Yield</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${analysis.fundamentals.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {analysis.fundamentals.growth >= 0 ? '+' : ''}{analysis.fundamentals.growth.toFixed(1)}%
                        </div>
                        <div className="text-sm text-gray-500">Growth Rate</div>
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
  );
}