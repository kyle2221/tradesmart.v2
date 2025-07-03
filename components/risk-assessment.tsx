import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, TrendingDown, BarChart3 } from "lucide-react";

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

interface RiskAssessmentProps {
  analysis: AnalysisResult;
}

export function RiskAssessment({ analysis }: RiskAssessmentProps) {
  const getRiskScore = (level: string): number => {
    switch (level) {
      case 'LOW': return 25;
      case 'MEDIUM': return 55;
      case 'HIGH': return 85;
      default: return 50;
    }
  };

  const getVolatilityScore = (): number => {
    // Calculate volatility based on price history
    const prices = analysis.priceHistory.map(p => p.price);
    const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
    const variance = prices.reduce((acc, price) => acc + Math.pow(price - avgPrice, 2), 0) / prices.length;
    const volatility = Math.sqrt(variance) / avgPrice * 100;
    return Math.min(volatility * 2, 100); // Scale to 0-100
  };

  const getLiquidityScore = (): number => {
    // Simulate liquidity score based on market cap
    const marketCapValue = parseFloat(analysis.fundamentals.marketCap.replace(/[^0-9.]/g, ''));
    if (marketCapValue > 100) return 90; // Large cap
    if (marketCapValue > 10) return 70;  // Mid cap
    return 40; // Small cap
  };

  const getConcentrationRisk = (): number => {
    // Simulate concentration risk
    return Math.random() * 60 + 20; // 20-80 range
  };

  const riskScore = getRiskScore(analysis.riskLevel);
  const volatilityScore = getVolatilityScore();
  const liquidityScore = getLiquidityScore();
  const concentrationRisk = getConcentrationRisk();

  const riskFactors = [
    {
      name: "Overall Risk Level",
      score: riskScore,
      description: `${analysis.riskLevel} risk investment based on fundamental and technical analysis`,
      icon: Shield
    },
    {
      name: "Price Volatility",
      score: volatilityScore,
      description: "Historical price movement patterns and market volatility",
      icon: TrendingDown
    },
    {
      name: "Liquidity Risk",
      score: 100 - liquidityScore,
      description: "Ease of buying/selling without affecting price significantly",
      icon: BarChart3
    },
    {
      name: "Concentration Risk",
      score: concentrationRisk,
      description: "Risk from lack of diversification in single security",
      icon: AlertTriangle
    }
  ];

  const overallRisk = (riskScore + volatilityScore + (100 - liquidityScore) + concentrationRisk) / 4;

  return (
    <div className="space-y-6">
      {/* Overall Risk Score */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-blue-600" />
            <span>Risk Assessment Overview</span>
          </CardTitle>
          <CardDescription>
            Comprehensive risk analysis based on multiple factors and market conditions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-6 bg-gradient-to-r from-red-50 to-yellow-50 dark:from-red-900/20 dark:to-yellow-900/20 rounded-lg">
            <div>
              <div className="text-3xl font-bold">
                {overallRisk.toFixed(0)}/100
              </div>
              <div className="text-lg text-gray-600 dark:text-gray-400">
                Overall Risk Score
              </div>
            </div>
            <div className="text-right">
              <Badge variant={
                overallRisk < 30 ? 'default' : 
                overallRisk < 60 ? 'secondary' : 'destructive'
              } className="text-lg px-4 py-2">
                {overallRisk < 30 ? 'LOW RISK' : 
                 overallRisk < 60 ? 'MEDIUM RISK' : 'HIGH RISK'}
              </Badge>
              <div className="text-sm text-gray-500 mt-2">
                Risk Classification
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Factors Breakdown */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Risk Factors Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {riskFactors.map((factor, index) => {
              const Icon = factor.icon;
              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon className={`h-5 w-5 ${
                        factor.score < 30 ? 'text-green-500' : 
                        factor.score < 60 ? 'text-yellow-500' : 'text-red-500'
                      }`} />
                      <span className="font-medium">{factor.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Progress 
                        value={factor.score} 
                        className="w-24"
                      />
                      <span className="text-sm font-medium w-8">
                        {factor.score.toFixed(0)}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 ml-7">
                    {factor.description}
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Risk Mitigation Strategies */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-green-600" />
            <span>Risk Mitigation Strategies</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                Recommended Actions
              </h4>
              <ul className="space-y-2 text-sm text-green-700 dark:text-green-300">
                <li>• Diversify across multiple sectors and asset classes</li>
                <li>• Consider position sizing based on risk tolerance</li>
                <li>• Set stop-loss orders to limit downside risk</li>
                <li>• Monitor key technical and fundamental indicators</li>
              </ul>
            </div>
            
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                Portfolio Allocation Suggestion
              </h4>
              <div className="text-sm text-blue-700 dark:text-blue-300">
                Based on the {analysis.riskLevel.toLowerCase()} risk level, consider allocating{' '}
                {analysis.riskLevel === 'LOW' ? '5-10%' : 
                 analysis.riskLevel === 'MEDIUM' ? '3-7%' : '1-3%'} of your total portfolio to this position.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}