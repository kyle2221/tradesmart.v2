import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle, AlertTriangle, TrendingUp, Brain } from "lucide-react";

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

interface AIAnalysisResultProps {
  analysis: AnalysisResult;
}

export function AIAnalysisResult({ analysis }: AIAnalysisResultProps) {
  return (
    <div className="space-y-6">
      {/* AI Recommendation */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-6 w-6 text-blue-600" />
            <span>AI Investment Recommendation</span>
          </CardTitle>
          <CardDescription>
            Comprehensive analysis based on technical indicators, fundamental data, and market sentiment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
            <div className="flex items-center space-x-4">
              {analysis.prediction === 'BUY' && <CheckCircle className="h-12 w-12 text-green-500" />}
              {analysis.prediction === 'HOLD' && <AlertTriangle className="h-12 w-12 text-yellow-500" />}
              {analysis.prediction === 'SELL' && <XCircle className="h-12 w-12 text-red-500" />}
              <div>
                <div className="text-3xl font-bold">{analysis.prediction}</div>
                <div className="text-lg text-gray-600 dark:text-gray-400">
                  {analysis.confidence.toFixed(0)}% Confidence
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Expected Return</div>
              <div className="text-2xl font-bold text-green-600">
                {((analysis.targetPrice - analysis.currentPrice) / analysis.currentPrice * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-gray-500">{analysis.timeframe}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Reasons */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <span>Key Investment Reasons</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {analysis.reasons.map((reason, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700 dark:text-gray-300">{reason}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Warnings */}
      {analysis.warnings.length > 0 && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-2">
              <div className="font-medium">Risk Considerations:</div>
              {analysis.warnings.map((warning, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <span className="text-yellow-600">•</span>
                  <span>{warning}</span>
                </div>
              ))}
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Investment Summary */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Investment Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Current Price</span>
                <span className="font-semibold">${analysis.currentPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Target Price</span>
                <span className="font-semibold text-green-600">${analysis.targetPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Time Horizon</span>
                <span className="font-semibold">{analysis.timeframe}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Risk Level</span>
                <Badge variant={
                  analysis.riskLevel === 'LOW' ? 'default' : 
                  analysis.riskLevel === 'MEDIUM' ? 'secondary' : 'destructive'
                }>
                  {analysis.riskLevel}
                </Badge>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">AI Confidence</span>
                <span className="font-semibold">{analysis.confidence.toFixed(0)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">AI Score</span>
                <span className="font-semibold">{analysis.aiScore.toFixed(0)}/100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Market Cap</span>
                <span className="font-semibold">{analysis.fundamentals.marketCap}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Dividend Yield</span>
                <span className="font-semibold">{analysis.fundamentals.dividend.toFixed(2)}%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}