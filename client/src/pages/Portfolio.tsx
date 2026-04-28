import { useState } from "react";
import { LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Eye, EyeOff } from "lucide-react";

interface Asset {
  symbol: string;
  name: string;
  amount: number;
  price: number;
  value: number;
  change24h: number;
  allocation: number;
}

interface PortfolioData {
  date: string;
  value: number;
  btc: number;
  eth: number;
  sky: number;
}

export default function Portfolio() {
  const [showValues, setShowValues] = useState(true);

  const assets: Asset[] = [
    { symbol: "SKY", name: "SkyCoin", amount: 50000, price: 0.045, value: 2250, change24h: 5.2, allocation: 35 },
    { symbol: "BTC", name: "Bitcoin", amount: 0.5, price: 67500, value: 33750, change24h: 2.1, allocation: 52 },
    { symbol: "ETH", name: "Ethereum", amount: 10, price: 3500, value: 35000, change24h: -1.3, allocation: 13 },
  ];

  const portfolioData: PortfolioData[] = [
    { date: "Jan 1", value: 45000, btc: 30000, eth: 12000, sky: 3000 },
    { date: "Jan 8", value: 48000, btc: 31500, eth: 13000, sky: 3500 },
    { date: "Jan 15", value: 52000, btc: 34000, eth: 14000, sky: 4000 },
    { date: "Jan 22", value: 55000, btc: 35500, eth: 15000, sky: 4500 },
    { date: "Jan 29", value: 58000, btc: 37000, eth: 16000, sky: 5000 },
    { date: "Feb 5", value: 61000, btc: 39000, eth: 17000, sky: 5000 },
    { date: "Feb 12", value: 65000, btc: 40000, eth: 18000, sky: 7000 },
  ];

  const totalValue = assets.reduce((sum, a) => sum + a.value, 0);
  const totalChange = 8500;
  const totalChangePercent = 15.1;

  const colors = ["#a855f7", "#3b82f6", "#10b981"];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Portfolio</h2>
          <p className="text-sm text-gray-400 mt-1">Track your assets and performance</p>
        </div>
        <Button
          onClick={() => setShowValues(!showValues)}
          variant="outline"
          size="sm"
        >
          {showValues ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-400">
              {showValues ? `$${totalValue.toLocaleString()}` : "••••••"}
            </div>
            <p className="text-xs text-gray-500 mt-1">All assets</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">24h Change</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold flex items-center gap-2 ${totalChange >= 0 ? "text-green-400" : "text-red-400"}`}>
              {showValues ? `$${totalChange.toLocaleString()}` : "••••••"}
              {totalChange >= 0 ? (
                <TrendingUp className="w-6 h-6" />
              ) : (
                <TrendingDown className="w-6 h-6" />
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">+{totalChangePercent}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-400">{assets.length}</div>
            <p className="text-xs text-gray-500 mt-1">Diversified</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Portfolio Performance</CardTitle>
          <CardDescription>Value over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={portfolioData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                }}
                formatter={(value) => `$${value.toLocaleString()}`}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#a855f7"
                fillOpacity={1}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Asset Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={assets}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ symbol, allocation }) => `${symbol} ${allocation}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {assets.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Holdings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {assets.map((asset) => (
              <div key={asset.symbol} className="p-3 border border-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold text-sm">{asset.name}</p>
                    <p className="text-xs text-gray-400">{asset.amount} {asset.symbol}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm text-purple-400">
                      {showValues ? `$${asset.value.toLocaleString()}` : "••••••"}
                    </p>
                    <Badge
                      className={`text-xs ${
                        asset.change24h >= 0
                          ? "bg-green-600 text-white"
                          : "bg-red-600 text-white"
                      }`}
                    >
                      {asset.change24h >= 0 ? "+" : ""}{asset.change24h}%
                    </Badge>
                  </div>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                    style={{ width: `${asset.allocation}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Asset Composition</CardTitle>
          <CardDescription>Breakdown by asset class</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={portfolioData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                }}
                formatter={(value) => `$${value.toLocaleString()}`}
              />
              <Legend />
              <Bar dataKey="btc" stackId="a" fill="#f59e0b" name="Bitcoin" />
              <Bar dataKey="eth" stackId="a" fill="#3b82f6" name="Ethereum" />
              <Bar dataKey="sky" stackId="a" fill="#a855f7" name="SkyCoin" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <Button variant="outline" className="w-full">Buy</Button>
          <Button variant="outline" className="w-full">Sell</Button>
          <Button variant="outline" className="w-full">Swap</Button>
          <Button variant="outline" className="w-full">Stake</Button>
        </CardContent>
      </Card>
    </div>
  );
}
