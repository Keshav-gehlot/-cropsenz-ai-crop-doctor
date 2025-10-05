import { useState } from 'react';
import { ArrowLeft, Search, TrendingUp, TrendingDown, Calculator, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Screen } from '../App';

interface MarketScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function MarketScreen({ onNavigate }: MarketScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [storageDays, setStorageDays] = useState('');
  const [storageCost, setStorageCost] = useState('');

  const marketData = [
    { crop: 'Wheat', price: 2150, change: 2.5, location: 'Mandi Gobindgarh', trend: 'up' },
    { crop: 'Rice', price: 3200, change: -1.2, location: 'Karnal', trend: 'down' },
    { crop: 'Maize', price: 1850, change: 4.8, location: 'Ludhiana', trend: 'up' },
    { crop: 'Cotton', price: 5800, change: 1.5, location: 'Sirsa', trend: 'up' },
    { crop: 'Sugarcane', price: 350, change: -0.8, location: 'Muzaffarnagar', trend: 'down' },
    { crop: 'Soybean', price: 4200, change: 3.2, location: 'Indore', trend: 'up' },
  ];

  const priceHistory = [
    { date: 'Jan', price: 2000 },
    { date: 'Feb', price: 2050 },
    { date: 'Mar', price: 1980 },
    { date: 'Apr', price: 2100 },
    { date: 'May', price: 2080 },
    { date: 'Jun', price: 2150 },
  ];

  const recommendation = {
    action: 'Hold',
    reason: 'Price expected to increase by 8-12% in next 2 weeks due to reduced supply and upcoming festival demand.',
    confidence: 78,
    expectedPrice: 2320,
    timeline: '10-14 days'
  };

  const filteredData = marketData.filter(item =>
    item.crop.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const calculateProfit = () => {
    if (!storageDays || !storageCost) return null;
    const currentPrice = 2150;
    const expectedPrice = 2320;
    const totalStorageCost = parseInt(storageDays) * parseInt(storageCost);
    const netProfit = (expectedPrice - currentPrice) - totalStorageCost;
    return { netProfit, totalStorageCost, expectedPrice };
  };

  const profitCalculation = calculateProfit();

  return (
    <div className="min-h-screen bg-background">
      {}
      <div className="bg-primary text-white p-4 flex items-center gap-3">
        <div className="container-responsive max-w-7xl mx-auto flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={() => onNavigate('home')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold">Market Prices</h1>
        </div>
      </div>

      <div className="container-responsive max-w-7xl mx-auto p-4">
        <Tabs defaultValue="prices" className="space-y-4">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="prices">Live Prices</TabsTrigger>
            <TabsTrigger value="forecast">Forecast</TabsTrigger>
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
          </TabsList>

          <TabsContent value="prices" className="space-y-4">
            {}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search crop name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {}
            <div className="space-y-3">
              {filteredData.map((item, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.crop}</h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          {item.location}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">₹{item.price}/q</p>
                        <div className="flex items-center gap-1">
                          {item.trend === 'up' ? (
                            <TrendingUp className="w-4 h-4 text-green-600" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-red-600" />
                          )}
                          <span className={`text-sm ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                            {item.trend === 'up' ? '+' : ''}{item.change}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {}
            <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  AI Market Advisor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant={recommendation.action === 'Hold' ? 'secondary' : 'default'}>
                      {recommendation.action}
                    </Badge>
                    <span className="text-sm">Confidence: {recommendation.confidence}%</span>
                  </div>
                  <p className="text-sm">{recommendation.reason}</p>
                  <div className="flex justify-between text-sm">
                    <span>Expected Price:</span>
                    <span className="font-semibold text-green-600">₹{recommendation.expectedPrice}/q</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Timeline:</span>
                    <span>{recommendation.timeline}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="forecast" className="space-y-4">
            {}
            <Card>
              <CardHeader>
                <CardTitle>Wheat Price Trend (6 Months)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={priceHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip
                        formatter={(value) => [`₹${value}/q`, 'Price']}
                        labelFormatter={(label) => `Month: ${label}`}
                      />
                      <Line
                        type="monotone"
                        dataKey="price"
                        stroke="hsl(var(--primary))"
                        strokeWidth={3}
                        dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {}
            <Card>
              <CardHeader>
                <CardTitle>Market Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-sm">
                      <strong>Bullish Trend:</strong> Prices expected to rise 8-12% in next 2 weeks
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm">
                      <strong>Supply Alert:</strong> 15% reduction in supply due to weather conditions
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">
                      <strong>Demand Surge:</strong> Festival season approaching, 20% demand increase expected
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calculator" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Storage Cost Calculator
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Storage Days</label>
                    <Input
                      type="number"
                      placeholder="Enter number of days"
                      value={storageDays}
                      onChange={(e) => setStorageDays(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Storage Cost per Day (₹/quintal)</label>
                    <Input
                      type="number"
                      placeholder="Enter daily cost"
                      value={storageCost}
                      onChange={(e) => setStorageCost(e.target.value)}
                    />
                  </div>

                  {profitCalculation && (
                    <div className="mt-4 p-4 bg-muted rounded-lg space-y-2">
                      <h4 className="font-semibold">Profit Analysis</h4>
                      <div className="flex justify-between">
                        <span>Current Price:</span>
                        <span>₹2,150/q</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Expected Price:</span>
                        <span>₹{profitCalculation.expectedPrice}/q</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Storage Cost:</span>
                        <span>₹{profitCalculation.totalStorageCost}/q</span>
                      </div>
                      <div className="flex justify-between font-semibold border-t pt-2">
                        <span>Net Profit:</span>
                        <span className={profitCalculation.netProfit > 0 ? 'text-green-600' : 'text-red-600'}>
                          ₹{profitCalculation.netProfit}/q
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
