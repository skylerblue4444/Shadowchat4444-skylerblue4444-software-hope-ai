import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Shield,
  Zap,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Plus,
  Info,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface ETFProduct {
  id: number;
  ticker: string;
  name: string;
  price: number;
  change24h: number;
  aum: string;
  expense: string;
  category: string;
  ytd: string;
  holdings: number;
  description: string;
  topHoldings: { symbol: string; weight: number }[];
  rebalance: string;
  inception: string;
}

const ETF_PRODUCTS: ETFProduct[] = [
  {
    id: 1,
    ticker: "SKYBLUE",
    name: "ShadowChat Blue Chip Index",
    price: 142.8,
    change24h: 3.4,
    aum: "$8.2M",
    expense: "0.45%",
    category: "Blue Chip",
    ytd: "+67.4%",
    holdings: 10,
    description:
      "Top 10 crypto assets by market cap, rebalanced monthly. Includes BTC, ETH, BNB, SOL, and SKY4444.",
    topHoldings: [
      { symbol: "BTC", weight: 35 },
      { symbol: "ETH", weight: 25 },
      { symbol: "SKY4444", weight: 15 },
      { symbol: "SOL", weight: 10 },
      { symbol: "BNB", weight: 8 },
    ],
    rebalance: "Monthly",
    inception: "Jan 2025",
  },
  {
    id: 2,
    ticker: "SKYDEFI",
    name: "ShadowDeFi Index",
    price: 89.4,
    change24h: 5.8,
    aum: "$3.4M",
    expense: "0.65%",
    category: "DeFi",
    ytd: "+124.2%",
    holdings: 15,
    description:
      "Diversified exposure to the top DeFi protocols. Includes UNI, AAVE, CRV, MKR, and SKY4444 DeFi tokens.",
    topHoldings: [
      { symbol: "SKY4444", weight: 20 },
      { symbol: "UNI", weight: 18 },
      { symbol: "AAVE", weight: 16 },
      { symbol: "CRV", weight: 12 },
      { symbol: "MKR", weight: 10 },
    ],
    rebalance: "Weekly",
    inception: "Mar 2025",
  },
  {
    id: 3,
    ticker: "SKYMEME",
    name: "ShadowMeme Index",
    price: 24.6,
    change24h: -2.1,
    aum: "$1.8M",
    expense: "0.85%",
    category: "Meme",
    ytd: "+312.8%",
    holdings: 8,
    description:
      "High-risk, high-reward meme coin basket. Includes DOGE, SHIB, TRUMP, PEPE, and SKY4444.",
    topHoldings: [
      { symbol: "TRUMP", weight: 30 },
      { symbol: "DOGE", weight: 25 },
      { symbol: "SKY4444", weight: 20 },
      { symbol: "SHIB", weight: 15 },
      { symbol: "PEPE", weight: 10 },
    ],
    rebalance: "Bi-weekly",
    inception: "Jun 2025",
  },
  {
    id: 4,
    ticker: "SKYAI",
    name: "ShadowAI Crypto Index",
    price: 67.2,
    change24h: 7.2,
    aum: "$2.1M",
    expense: "0.75%",
    category: "AI",
    ytd: "+189.6%",
    holdings: 12,
    description:
      "Exposure to AI-related crypto projects and tokens powering the next generation of intelligent applications.",
    topHoldings: [
      { symbol: "SKY4444", weight: 25 },
      { symbol: "FET", weight: 20 },
      { symbol: "AGIX", weight: 18 },
      { symbol: "OCEAN", weight: 15 },
      { symbol: "NMR", weight: 12 },
    ],
    rebalance: "Monthly",
    inception: "Sep 2025",
  },
  {
    id: 5,
    ticker: "SKYWEB3",
    name: "ShadowWeb3 Infrastructure",
    price: 112.5,
    change24h: 1.9,
    aum: "$4.7M",
    expense: "0.55%",
    category: "Web3 Infra",
    ytd: "+88.3%",
    holdings: 20,
    description:
      "Layer 1 and Layer 2 infrastructure tokens powering the decentralized web. BTC, ETH, SOL, MATIC, and more.",
    topHoldings: [
      { symbol: "ETH", weight: 30 },
      { symbol: "SOL", weight: 20 },
      { symbol: "MATIC", weight: 15 },
      { symbol: "AVAX", weight: 12 },
      { symbol: "SKY4444", weight: 10 },
    ],
    rebalance: "Monthly",
    inception: "Nov 2024",
  },
];

export default function ShadowETF() {
  const [selected, setSelected] = useState<ETFProduct | null>(null);
  const [action, setAction] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState("");

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-blue-400" />
            ShadowETF
          </h1>
          <p className="text-sm text-muted-foreground">
            Crypto index funds and ETF products powered by SKY4444
          </p>
        </div>
        <Button
          className="bg-blue-600 text-white border-0 font-bold h-9 text-sm"
          onClick={() => toast.info("Custom ETF creation coming soon!")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Custom ETF
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Total AUM", value: "$20.2M", color: "text-blue-400" },
          { label: "Products", value: "5", color: "text-cyan-400" },
          { label: "Best YTD", value: "+312%", color: "text-green-400" },
          { label: "Avg Expense", value: "0.65%", color: "text-yellow-400" },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="py-3 px-2">
              <p className={`font-black text-lg ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* ETF List */}
        <div className="lg:col-span-2 space-y-3">
          {ETF_PRODUCTS.map((etf, i) => (
            <motion.div
              key={etf.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card
                className={`border-border/50 hover:border-blue-500/20 transition-all cursor-pointer ${selected?.id === etf.id ? "border-blue-500/40 bg-blue-900/5" : ""}`}
                onClick={() => setSelected(etf)}
              >
                <CardContent className="py-4 px-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                        <span className="text-xs font-black text-blue-400">
                          {etf.ticker.slice(3, 6)}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-black text-sm">{etf.ticker}</p>
                          <Badge className="text-xs bg-muted text-muted-foreground border-0">
                            {etf.category}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {etf.name}
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-black text-sm">
                        ${etf.price.toFixed(2)}
                      </p>
                      <p
                        className={`text-xs font-bold flex items-center justify-end gap-0.5 ${etf.change24h >= 0 ? "text-green-400" : "text-red-400"}`}
                      >
                        {etf.change24h >= 0 ? (
                          <ArrowUpRight className="h-3 w-3" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3" />
                        )}
                        {Math.abs(etf.change24h)}%
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-4 gap-1.5 text-xs">
                    {[
                      { label: "AUM", value: etf.aum },
                      { label: "YTD", value: etf.ytd, green: true },
                      { label: "Expense", value: etf.expense },
                      { label: "Holdings", value: etf.holdings.toString() },
                    ].map(s => (
                      <div
                        key={s.label}
                        className="bg-muted/50 rounded-lg px-1.5 py-1 text-center"
                      >
                        <p className="text-muted-foreground text-[10px]">
                          {s.label}
                        </p>
                        <p
                          className={`font-bold ${s.green ? "text-green-400" : ""}`}
                        >
                          {s.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Detail / Buy Panel */}
        <div className="space-y-3">
          {selected ? (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="border-blue-500/20 bg-blue-900/5 sticky top-4">
                <CardContent className="py-5 px-4 space-y-4">
                  <div>
                    <p className="font-black text-base">{selected.ticker}</p>
                    <p className="text-xs text-muted-foreground">
                      {selected.name}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {selected.description}
                  </p>
                  <div className="space-y-2">
                    <p className="text-xs font-bold">Top Holdings</p>
                    {selected.topHoldings.map(h => (
                      <div key={h.symbol} className="space-y-0.5">
                        <div className="flex justify-between text-xs">
                          <span className="font-medium">{h.symbol}</span>
                          <span className="text-muted-foreground">
                            {h.weight}%
                          </span>
                        </div>
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${h.weight}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-muted/50 rounded-lg px-2 py-1.5 text-center">
                      <p className="text-muted-foreground">Rebalance</p>
                      <p className="font-bold">{selected.rebalance}</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg px-2 py-1.5 text-center">
                      <p className="text-muted-foreground">Inception</p>
                      <p className="font-bold">{selected.inception}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setAction("buy")}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors ${action === "buy" ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"}`}
                    >
                      Buy
                    </button>
                    <button
                      onClick={() => setAction("sell")}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors ${action === "sell" ? "bg-red-500 text-white" : "bg-muted text-muted-foreground"}`}
                    >
                      Sell
                    </button>
                  </div>
                  <input
                    type="number"
                    placeholder="Amount in USD"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    className="w-full h-10 px-4 rounded-xl bg-muted text-sm border border-border/50 focus:outline-none focus:border-blue-500/40"
                  />
                  {amount && (
                    <p className="text-xs text-muted-foreground text-center">
                      ≈ {(parseFloat(amount) / selected.price).toFixed(4)}{" "}
                      {selected.ticker} shares
                    </p>
                  )}
                  <Button
                    className={`w-full h-10 border-0 font-bold text-sm text-white ${action === "buy" ? "bg-green-600" : "bg-red-600"}`}
                    onClick={() => {
                      toast.success(
                        `${action === "buy" ? "Bought" : "Sold"} ${selected.ticker} — $${amount || "0"}!`
                      );
                      setAmount("");
                    }}
                  >
                    {action === "buy" ? "Buy" : "Sell"} {selected.ticker}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <Card className="border-border/50">
              <CardContent className="py-8 px-4 text-center text-muted-foreground">
                <BarChart3 className="h-8 w-8 mx-auto mb-2 opacity-40" />
                <p className="text-sm">
                  Select an ETF to view details and trade
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
