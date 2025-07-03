"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Newspaper, 
  Clock, 
  TrendingUp, 
  TrendingDown,
  ExternalLink,
  Zap
} from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  timestamp: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  relatedSymbols: string[];
  impact: 'high' | 'medium' | 'low';
  imageUrl?: string;
}

export function MarketNews() {
  const newsItems: NewsItem[] = [
    {
      id: '1',
      title: 'Apple Reports Record Q4 Earnings, Beats Analyst Expectations',
      summary: 'Apple Inc. reported quarterly earnings that exceeded Wall Street expectations, driven by strong iPhone sales and services revenue growth.',
      source: 'Reuters',
      timestamp: '2 hours ago',
      sentiment: 'positive',
      relatedSymbols: ['AAPL'],
      impact: 'high'
    },
    {
      id: '2',
      title: 'Federal Reserve Signals Potential Rate Cut in Next Meeting',
      summary: 'Fed officials hint at monetary policy easing amid cooling inflation data, potentially boosting market sentiment.',
      source: 'Bloomberg',
      timestamp: '4 hours ago',
      sentiment: 'positive',
      relatedSymbols: ['SPY', 'QQQ'],
      impact: 'high'
    },
    {
      id: '3',
      title: 'Tesla Faces Production Challenges in Shanghai Factory',
      summary: 'Supply chain disruptions and regulatory hurdles impact Tesla\'s production capacity at its Shanghai Gigafactory.',
      source: 'Financial Times',
      timestamp: '6 hours ago',
      sentiment: 'negative',
      relatedSymbols: ['TSLA'],
      impact: 'medium'
    },
    {
      id: '4',
      title: 'NVIDIA Announces New AI Chip Architecture',
      summary: 'The semiconductor giant unveils next-generation GPU architecture designed for advanced AI workloads and data centers.',
      source: 'TechCrunch',
      timestamp: '8 hours ago',
      sentiment: 'positive',
      relatedSymbols: ['NVDA'],
      impact: 'medium'
    },
    {
      id: '5',
      title: 'Oil Prices Surge on Middle East Tensions',
      summary: 'Crude oil futures jump 3% as geopolitical tensions in the Middle East raise supply concerns.',
      source: 'CNBC',
      timestamp: '10 hours ago',
      sentiment: 'neutral',
      relatedSymbols: ['XOM', 'CVX'],
      impact: 'medium'
    }
  ];

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'negative': return <TrendingDown className="h-4 w-4 text-red-500" />;
      default: return <Zap className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'border-l-green-500 bg-green-50 dark:bg-green-900/20';
      case 'negative': return 'border-l-red-500 bg-red-50 dark:bg-red-900/20';
      default: return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
    }
  };

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case 'high': return <Badge variant="destructive" className="text-xs">High Impact</Badge>;
      case 'medium': return <Badge variant="secondary" className="text-xs">Medium Impact</Badge>;
      default: return <Badge variant="outline" className="text-xs">Low Impact</Badge>;
    }
  };

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Newspaper className="h-6 w-6 text-blue-600" />
            <span>Market News</span>
          </CardTitle>
          <Button size="sm" variant="outline">
            View All
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {newsItems.map((news) => (
          <div
            key={news.id}
            className={`border-l-4 p-4 rounded-r-lg ${getSentimentColor(news.sentiment)} hover:shadow-md transition-all duration-200 cursor-pointer`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                {getSentimentIcon(news.sentiment)}
                <span className="text-sm font-medium text-gray-600">{news.source}</span>
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  <span>{news.timestamp}</span>
                </div>
              </div>
              {getImpactBadge(news.impact)}
            </div>

            <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
              {news.title}
            </h3>

            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
              {news.summary}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {news.relatedSymbols.map((symbol) => (
                  <Badge key={symbol} variant="outline" className="text-xs">
                    {symbol}
                  </Badge>
                ))}
              </div>
              <Button size="sm" variant="ghost" className="h-6 px-2">
                <ExternalLink className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}

        {/* Breaking News Alert */}
        <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Zap className="h-5 w-5 animate-pulse" />
            <span className="font-bold">BREAKING NEWS</span>
          </div>
          <p className="text-sm">
            Major tech earnings season begins next week with Apple, Microsoft, and Google reporting results.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}