import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Brain, Globe, Target, BarChart3, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">TradeSmart AI</h1>
            </div>
            <nav className="flex items-center space-x-4">
              <Link href="/future-buy">
                <Button variant="ghost">Future Buy Analysis</Button>
              </Link>
              <Link href="/best-stocks">
                <Button variant="ghost">Best Stocks Global</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              AI-Powered Investment
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Intelligence</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Harness the power of artificial intelligence to make smarter investment decisions. 
              Get detailed analysis, future predictions, and global market insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/future-buy">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Target className="mr-2 h-5 w-5" />
                  Analyze Future Buys
                </Button>
              </Link>
              <Link href="/best-stocks">
                <Button size="lg" variant="outline">
                  <Globe className="mr-2 h-5 w-5" />
                  Discover Best Stocks
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Advanced AI Features
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Comprehensive investment analysis powered by cutting-edge AI technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>AI Prediction Engine</CardTitle>
                <CardDescription>
                  Advanced machine learning algorithms analyze market patterns and predict future performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• Technical analysis integration</li>
                  <li>• Sentiment analysis</li>
                  <li>• Risk assessment</li>
                  <li>• Price target predictions</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Real-Time Analysis</CardTitle>
                <CardDescription>
                  Live market data integration with instant AI-powered insights and recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• Live price monitoring</li>
                  <li>• Volume analysis</li>
                  <li>• Market momentum tracking</li>
                  <li>• Breaking news impact</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Global Market Coverage</CardTitle>
                <CardDescription>
                  Comprehensive analysis across global markets including stocks, ETFs, and bonds
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• US, European, Asian markets</li>
                  <li>• Cryptocurrency analysis</li>
                  <li>• Commodity insights</li>
                  <li>• Currency correlations</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Make Smarter Investments?
            </h3>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of investors using AI to optimize their portfolios and maximize returns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/future-buy">
                <Button size="lg" variant="secondary">
                  <Zap className="mr-2 h-5 w-5" />
                  Start Analysis Now
                </Button>
              </Link>
              <Link href="/best-stocks">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  View Best Picks
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Brain className="h-6 w-6 text-blue-400" />
            <span className="text-lg font-semibold">TradeSmart AI</span>
          </div>
          <p className="text-gray-400">
            Powered by advanced AI technology for intelligent investment decisions
          </p>
        </div>
      </footer>
    </div>
  );
}