import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowRightLeft, Zap, TrendingUp, Lock } from "lucide-react";

interface Bridge {
  id: string;
  fromChain: string;
  toChain: string;
  asset: string;
  fee: number;
  time: string;
  liquidity: number;
  volume24h: number;
}

interface Transaction {
  id: string;
  fromChain: string;
  toChain: string;
  asset: string;
  amount: number;
  status: "completed" | "pending" | "failed";
  timestamp: string;
}

export default function CrossChainBridge() {
  const [bridges] = useState<Bridge[]>([
    {
      id: "1",
      fromChain: "Solana",
      toChain: "Ethereum",
      asset: "SKY",
      fee: 0.5,
      time: "~2 minutes",
      liquidity: 5000000,
      volume24h: 2500000,
    },
    {
      id: "2",
      fromChain: "Ethereum",
      toChain: "Polygon",
      asset: "SKY",
      fee: 0.3,
      time: "~1 minute",
      liquidity: 3000000,
      volume24h: 1800000,
    },
    {
      id: "3",
      fromChain: "Solana",
      toChain: "Polygon",
      asset: "SKY",
      fee: 0.4,
      time: "~3 minutes",
      liquidity: 2000000,
      volume24h: 900000,
    },
    {
      id: "4",
      fromChain: "Ethereum",
      toChain: "Arbitrum",
      asset: "SKY",
      fee: 0.2,
      time: "~30 seconds",
      liquidity: 4000000,
      volume24h: 3200000,
    },
  ]);

  const [transactions] = useState<Transaction[]>([
    {
      id: "1",
      fromChain: "Solana",
      toChain: "Ethereum",
      asset: "SKY",
      amount: 5000,
      status: "completed",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      fromChain: "Ethereum",
      toChain: "Polygon",
      asset: "SKY",
      amount: 2500,
      status: "completed",
      timestamp: "5 hours ago",
    },
    {
      id: "3",
      fromChain: "Solana",
      toChain: "Arbitrum",
      asset: "SKY",
      amount: 10000,
      status: "pending",
      timestamp: "15 minutes ago",
    },
  ]);

  const [fromChain, setFromChain] = useState("Solana");
  const [toChain, setToChain] = useState("Ethereum");
  const [amount, setAmount] = useState("");

  const totalVolume = bridges.reduce((sum, b) => sum + b.volume24h, 0);
  const totalLiquidity = bridges.reduce((sum, b) => sum + b.liquidity, 0);

  const chains = ["Solana", "Ethereum", "Polygon", "Arbitrum", "Optimism", "Base"];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Liquidity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-400">
              ${(totalLiquidity / 1000000).toFixed(1)}M
            </div>
            <p className="text-xs text-gray-500 mt-1">Across all bridges</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">24h Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-400">
              ${(totalVolume / 1000000).toFixed(1)}M
            </div>
            <p className="text-xs text-gray-500 mt-1">Total bridged</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Active Bridges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-400">{bridges.length}</div>
            <p className="text-xs text-gray-500 mt-1">Chains supported</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowRightLeft className="w-5 h-5" />
            Bridge Assets
          </CardTitle>
          <CardDescription>Transfer SKY tokens between blockchains</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold mb-2 block">From Chain</label>
              <div className="grid grid-cols-2 gap-2">
                {chains.map((chain) => (
                  <Button
                    key={chain}
                    onClick={() => setFromChain(chain)}
                    variant={fromChain === chain ? "default" : "outline"}
                    className={fromChain === chain ? "bg-purple-600" : ""}
                    size="sm"
                  >
                    {chain}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold mb-2 block">To Chain</label>
              <div className="grid grid-cols-2 gap-2">
                {chains.map((chain) => (
                  <Button
                    key={chain}
                    onClick={() => setToChain(chain)}
                    variant={toChain === chain ? "default" : "outline"}
                    className={toChain === chain ? "bg-purple-600" : ""}
                    size="sm"
                  >
                    {chain}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold mb-2 block">Amount</label>
            <Input
              type="number"
              placeholder="Enter amount in SKY"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-gray-900 border-gray-700"
            />
          </div>

          <Button className="w-full bg-purple-600 hover:bg-purple-700">
            <ArrowRightLeft className="w-4 h-4 mr-2" />
            Bridge Now
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Available Bridges</CardTitle>
          <CardDescription>Supported cross-chain routes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {bridges.map((bridge) => (
              <div
                key={bridge.id}
                className="p-4 border border-gray-700 rounded-lg hover:border-purple-500/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="text-sm font-semibold">{bridge.fromChain}</div>
                    <ArrowRightLeft className="w-4 h-4 text-gray-400" />
                    <div className="text-sm font-semibold">{bridge.toChain}</div>
                    <Badge variant="outline" className="text-xs">
                      {bridge.asset}
                    </Badge>
                  </div>
                  <Button size="sm" variant="outline">
                    Bridge
                  </Button>
                </div>

                <div className="grid grid-cols-4 gap-2 p-3 bg-gray-900/50 rounded border border-gray-700">
                  <div>
                    <p className="text-xs text-gray-400">Fee</p>
                    <p className="text-sm font-bold text-yellow-400 mt-1">{bridge.fee}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Time</p>
                    <p className="text-sm font-bold text-blue-400 mt-1">{bridge.time}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Liquidity</p>
                    <p className="text-sm font-bold text-green-400 mt-1">
                      ${(bridge.liquidity / 1000000).toFixed(1)}M
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">24h Volume</p>
                    <p className="text-sm font-bold text-purple-400 mt-1">
                      ${(bridge.volume24h / 1000000).toFixed(1)}M
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-3 border border-gray-700 rounded-lg"
              >
                <div className="flex-1">
                  <p className="text-sm font-semibold">
                    {tx.fromChain} → {tx.toChain}
                  </p>
                  <p className="text-xs text-gray-400">
                    {tx.amount.toLocaleString()} {tx.asset} • {tx.timestamp}
                  </p>
                </div>
                <Badge
                  className={`text-xs ${
                    tx.status === "completed"
                      ? "bg-green-600 text-white"
                      : tx.status === "pending"
                        ? "bg-yellow-600 text-white"
                        : "bg-red-600 text-white"
                  }`}
                >
                  {tx.status.toUpperCase()}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-green-400" />
            Security Features
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-gray-300">
            ✓ Multi-signature verification across all chains
          </p>
          <p className="text-sm text-gray-300">
            ✓ Atomic swaps with instant settlement
          </p>
          <p className="text-sm text-gray-300">
            ✓ Insurance coverage for all bridged assets
          </p>
          <p className="text-sm text-gray-300">
            ✓ Real-time monitoring and anomaly detection
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
