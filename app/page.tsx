import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Brain, Globe, Target, BarChart3, Zap, Activity, DollarSign } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                <Brain className="h-6 w-6 text-black" />
              </div>
              <h1 className="text-2xl font-bold text-white">TradeSmart AI</h1>
              <div className="px-2 py-1 bg-cyan-500/20 rounded text-xs text-cyan-400 border border-cyan-500/30">
                LIVE
              </div>
            </div>
            <nav className="flex items-center space-x-4">
              <Link href="/future-buy">
                <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800">
                  <Target className="h-4 w-4 mr-2" />
                  AI Analysis
                </Button>
              </Link>
              <Link href="/best-stocks">
                <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800">
                  <Globe className="h-4 w-4 mr-2" />
                  Global Markets
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10"></div>
        <div className="trading-grid absolute inset-0 opacity-20"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-gray-900/50 border border-gray-700 rounded-full px-4 py-2 mb-6">
              <Activity className="h-4 w-4 text-cyan-400 animate-pulse" />
              <span className="text-sm text-gray-300">Real-time Market Intelligence</span>
            </div>
            
            <h2 className="text-6xl font-bold text-white mb-6">
              Professional
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"> Trading Terminal</span>
            </h2>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              Advanced AI-powered trading platform with real-time charts, market analysis, 
              and institutional-grade tools for professional traders and investors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/future-buy">
                <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-black font-semibold px-8 py-3 animate-glow">
                  <Target className="mr-2 h-5 w-5" />
                  Start Trading Analysis
                </Button>
              </Link>
              <Link href="/best-stocks">
                <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800 px-8 py-3">
                  <Globe className="mr-2 h-5 w-5" />
                  Explore Global Markets
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Live Market Stats */}
      <section className="py-8 border-y border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">$2.8T</div>
              <div className="text-sm text-gray-400">Market Cap</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">+1.24%</div>
              <div className="text-sm text-gray-400">S&P 500</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">15.2M</div>
              <div className="text-sm text-gray-400">Active Trades</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">99.9%</div>
              <div className="text-sm text-gray-400">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-white mb-4">
              Professional Trading Features
            </h3>
            <p className="text-lg text-gray-400">
              Institutional-grade tools powered by advanced AI and real-time market data
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Brain className="h-6 w-6 text-black" />
                </div>
                <CardTitle className="text-white">AI Prediction Engine</CardTitle>
                <CardDescription className="text-gray-400">
                  Advanced machine learning algorithms analyze market patterns and predict future performance with 94% accuracy
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center"><span className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></span>Deep learning models</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></span>Sentiment analysis</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></span>Risk assessment</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></span>Price target predictions</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-6 w-6 text-black" />
                </div>
                <CardTitle className="text-white">Real-Time Charts</CardTitle>
                <CardDescription className="text-gray-400">
                  Professional trading charts with live data feeds, technical indicators, and advanced visualization tools
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center"><span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>Candlestick patterns</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>Volume analysis</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>Technical indicators</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>Market depth</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Globe className="h-6 w-6 text-black" />
                </div>
                <CardTitle className="text-white">Global Market Coverage</CardTitle>
                <CardDescription className="text-gray-400">
                  Comprehensive analysis across global markets including stocks, ETFs, bonds, and cryptocurrencies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center"><span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>50+ global exchanges</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>Real-time data feeds</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>Multi-asset support</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>Currency correlations</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-4xl font-bold text-white mb-4">
              Ready to Trade Like a Pro?
            </h3>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of professional traders using our AI-powered platform to maximize returns and minimize risk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/future-buy">
                <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-black font-semibold px-8 py-3">
                  <Zap className="mr-2 h-5 w-5" />
                  Start Analysis Now
                </Button>
              </Link>
              <Link href="/best-stocks">
                <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800 px-8 py-3">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  View Market Insights
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
              <Brain className="h-5 w-5 text-black" />
            </div>
            <span className="text-lg font-semibold text-white">TradeSmart AI</span>
          </div>
          <p className="text-gray-400">
            Professional trading platform powered by advanced AI technology
          </p>
          <div className="mt-4 flex items-center justify-center space-x-4 text-sm text-gray-500">
            <span>© 2024 TradeSmart AI</span>
            <span>•</span>
            <span>Real-time data</span>
            <span>•</span>
            <span>Professional grade</span>
          </div>
        </div>
      </footer>
    </div>
  );
}