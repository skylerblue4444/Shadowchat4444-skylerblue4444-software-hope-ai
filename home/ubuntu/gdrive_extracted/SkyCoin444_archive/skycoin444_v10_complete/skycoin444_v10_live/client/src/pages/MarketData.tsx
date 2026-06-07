import { useState } from "react";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Zap } from "lucide-react";

interface Coin {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  ath: number;
  atl: number;
}

interface MarketData {
  time: string;
  btc: number;
  eth: number;
  sky: number;
  volume: number;
}

export default function MarketData() {
  const [coins] = useState<Coin[]>([
    {
      symbol: "BTC",
      name: "Bitcoin",
      price: 67500,
      change24h: 2.1,
      volume24h: 28500000000,
      marketCap: 1320000000000,
      ath: 69000,
      atl: 15500,
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      price: 3500,
      change24h: -1.3,
      volume24h: 15200000000,
      marketCap: 420000000000,
      ath: 4900,
      atl: 0.5,
    },
    {
      symbol: "SKY",
      name: "SkyCoin",
      price: 0.045,
      change24h: 5.2,
      volume24h: 2500000,
      marketCap: 2250000,
      ath: 0.15,
      atl: 0.001,
    },
    {
      symbol: "SOL",
      name: "Solana",
      price: 180,
      change24h: 3.8,
      volume24h: 1200000000,
      marketCap: 58000000000,
      ath: 260,
      atl: 1.5,
    },
  ]);

  const marketData: MarketData[] = [
    { time: "00:00", btc: 66500, eth: 3450, sky: 0.042, volume: 22000000000 },
    { time: "04:00", btc: 66800, eth: 3480, sky: 0.043, volume: 24000000000 },
    { time: "08:00", btc: 67200, eth: 3520, sky: 0.044, volume: 26000000000 },
    { time: "12:00", btc: 67000, eth: 3490, sky: 0.045, volume: 28000000000 },
    { time: "16:00", btc: 67300, eth: 3510, sky: 0.046, volume: 27500000000 },
    { time: "20:00", btc: 67500, eth: 3500, sky: 0.045, volume: 28500000000 },
  ];

  const dominance = [
    { name: "Bitcoin", value: 48 },
    { name: "Ethereum", value: 18 },
    { name: "Others", value: 34 },
  ];

  const colors = ["#f59e0b", "#3b82f6", "#a855f7"];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Market Data</h2>
        <p className="text-sm text-gray-400 mt-1">Real-time cryptocurrency market analysis</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Market Cap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-400">$1.80T</div>
            <p className="text-xs text-green-400 mt-1">+2.3% 24h</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">24h Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-400">$85.2B</div>
            <p className="text-xs text-green-400 mt-1">+5.1% 24h</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">BTC Dominance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-400">48%</div>
            <p className="text-xs text-red-400 mt-1">-0.5% 24h</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Fear & Greed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-400">72</div>
            <p className="text-xs text-gray-400 mt-1">Greed</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Market Trends (24h)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={marketData}>
              <defs>
                <linearGradient id="colorBTC" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" yAxisId="left" />
              <YAxis stroke="#9ca3af" yAxisId="right" orientation="right" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="btc"
                stroke="#f59e0b"
                fill="url(#colorBTC)"
                name="Bitcoin"
              />
              <Line yAxisId="right" type="monotone" dataKey="eth" stroke="#3b82f6" name="Ethereum" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h3 className="font-semibold text-lg">Top Cryptocurrencies</h3>
        {coins.map((coin, index) => (
          <Card key={coin.symbol}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{coin.name}</p>
                    <p className="text-xs text-gray-400">{coin.symbol}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold text-sm">${coin.price.toLocaleString()}</p>
                  <Badge
                    className={`text-xs ${
                      coin.change24h >= 0
                        ? "bg-green-600 text-white"
                        : "bg-red-600 text-white"
                    }`}
                  >
                    {coin.change24h >= 0 ? "+" : ""}{coin.change24h}%
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-3 bg-gray-900/50 rounded border border-gray-700">
                <div>
                  <p className="text-xs text-gray-400">Market Cap</p>
                  <p className="text-sm font-bold text-purple-400 mt-1">
                    ${(coin.marketCap / 1000000000).toFixed(1)}B
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">24h Volume</p>
                  <p className="text-sm font-bold text-blue-400 mt-1">
                    ${(coin.volume24h / 1000000000).toFixed(1)}B
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">ATH</p>
                  <p className="text-sm font-bold text-green-400 mt-1">${coin.ath.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">ATL</p>
                  <p className="text-sm font-bold text-yellow-400 mt-1">${coin.atl.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Market Sentiment</CardTitle>
          <CardDescription>Community sentiment and analysis</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 border border-gray-700 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold">Bullish Sentiment</p>
              <Badge className="bg-green-600 text-white text-xs">72%</Badge>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: "72%" }} />
            </div>
          </div>

          <div className="p-3 border border-gray-700 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold">Neutral Sentiment</p>
              <Badge className="bg-yellow-600 text-white text-xs">18%</Badge>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "18%" }} />
            </div>
          </div>

          <div className="p-3 border border-gray-700 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold">Bearish Sentiment</p>
              <Badge className="bg-red-600 text-white text-xs">10%</Badge>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-red-500 h-2 rounded-full" style={{ width: "10%" }} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            Market Alerts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="p-3 border border-green-700/50 bg-green-900/20 rounded-lg">
            <p className="text-sm text-green-300">✓ Bitcoin broke above $67K resistance</p>
          </div>
          <div className="p-3 border border-yellow-700/50 bg-yellow-900/20 rounded-lg">
            <p className="text-sm text-yellow-300">⚠ Ethereum volatility increasing</p>
          </div>
          <div className="p-3 border border-blue-700/50 bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-300">📈 SkyCoin showing strong momentum</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
