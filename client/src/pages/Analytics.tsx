import { useState } from "react";
import { LineChart, Line, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, Activity } from "lucide-react";

const portfolioData = [
  { date: "Mon", value: 10000 },
  { date: "Tue", value: 10500 },
  { date: "Wed", value: 10200 },
  { date: "Thu", value: 11000 },
  { date: "Fri", value: 11500 },
  { date: "Sat", value: 11200 },
  { date: "Sun", value: 12000 },
];

const assetAllocation = [
  { name: "SKY", value: 45 },
  { name: "BTC", value: 25 },
  { name: "ETH", value: 20 },
  { name: "USDC", value: 10 },
];

const COLORS = ["#a855f7", "#3b82f6", "#10b981", "#f59e0b"];

const volumeData = [
  { time: "00:00", volume: 45000 },
  { time: "04:00", volume: 52000 },
  { time: "08:00", volume: 48000 },
  { time: "12:00", volume: 61000 },
  { time: "16:00", volume: 55000 },
  { time: "20:00", volume: 67000 },
  { time: "24:00", volume: 72000 },
];

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("7d");

  const holdings = [
    { symbol: "SKY", amount: 5000, value: 222, change: 12.5 },
    { symbol: "BTC", amount: 0.5, value: 25000, change: 8.3 },
    { symbol: "ETH", amount: 5, value: 20000, change: -2.1 },
    { symbol: "USDC", amount: 10000, value: 10000, change: 0 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Portfolio Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-400">$77,222</div>
            <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +12.5% (7d)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Daily Change</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-400">+$2,000</div>
            <p className="text-xs text-gray-500 mt-1">+2.7% today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">24h Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-400">$2.4M</div>
            <p className="text-xs text-gray-500 mt-1">+18% vs yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Top Performer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-400">SKY</div>
            <p className="text-xs text-green-400 mt-1">+12.5% (7d)</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Portfolio Performance</CardTitle>
              <CardDescription>7-day portfolio value trend</CardDescription>
            </div>
            <div className="flex gap-2">
              {["24h", "7d", "30d", "90d", "1y"].map((range) => (
                <Button
                  key={range}
                  variant={timeRange === range ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeRange(range)}
                  className={timeRange === range ? "bg-purple-600" : ""}
                >
                  {range}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={portfolioData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a5a" />
              <XAxis dataKey="date" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip contentStyle={{ backgroundColor: "#0a0a2a", border: "1px solid #2a2a5a" }} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#a855f7"
                dot={{ fill: "#a855f7" }}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Asset Allocation</CardTitle>
            <CardDescription>Portfolio breakdown by asset</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={assetAllocation}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {assetAllocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "#0a0a2a", border: "1px solid #2a2a5a" }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>24h Volume</CardTitle>
            <CardDescription>Trading volume by hour</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={volumeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a5a" />
                <XAxis dataKey="time" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip contentStyle={{ backgroundColor: "#0a0a2a", border: "1px solid #2a2a5a" }} />
                <Bar dataKey="volume" fill="#a855f7" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Holdings</CardTitle>
          <CardDescription>Your current asset positions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-2 text-gray-400">Asset</th>
                  <th className="text-right py-2 text-gray-400">Amount</th>
                  <th className="text-right py-2 text-gray-400">Value</th>
                  <th className="text-right py-2 text-gray-400">% of Portfolio</th>
                  <th className="text-right py-2 text-gray-400">24h Change</th>
                </tr>
              </thead>
              <tbody>
                {holdings.map((holding) => (
                  <tr key={holding.symbol} className="border-b border-gray-800 hover:bg-gray-900/50">
                    <td className="py-3 font-semibold">{holding.symbol}</td>
                    <td className="text-right">{holding.amount.toLocaleString()}</td>
                    <td className="text-right">${holding.value.toLocaleString()}</td>
                    <td className="text-right">
                      {((holding.value / 77222) * 100).toFixed(1)}%
                    </td>
                    <td className={`text-right flex items-center justify-end gap-1 ${holding.change >= 0 ? "text-green-400" : "text-red-400"}`}>
                      {holding.change >= 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      {holding.change >= 0 ? "+" : ""}{holding.change}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
