import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Shield,
  Search,
  Filter,
  Star,
  CheckCircle,
  Clock,
  AlertTriangle,
  MessageSquare,
  Lock,
  Unlock,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Zap,
  Flag,
  Plus,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const OFFERS = [
  {
    id: "o1",
    type: "buy",
    user: "CryptoWhale_88",
    rating: 4.9,
    trades: 1842,
    token: "TRUMP",
    amount: 50000,
    price: 0.0238,
    minOrder: 100,
    maxOrder: 10000,
    payment: ["Bank Transfer", "PayPal", "Zelle"],
    completion: "99.2%",
    online: true,
    verified: true,
    country: "🇺🇸",
  },
  {
    id: "o2",
    type: "sell",
    user: "SkyTrader_Pro",
    rating: 4.8,
    trades: 924,
    token: "TRUMP",
    amount: 25000,
    price: 0.0229,
    minOrder: 500,
    maxOrder: 25000,
    payment: ["Venmo", "CashApp", "USDC"],
    completion: "98.8%",
    online: true,
    verified: true,
    country: "🇺🇸",
  },
  {
    id: "o3",
    type: "buy",
    user: "DeFi_Master_CN",
    rating: 4.7,
    trades: 3210,
    token: "SKY4444",
    amount: 100000,
    price: 0.0255,
    minOrder: 1000,
    maxOrder: 50000,
    payment: ["WeChat Pay", "Alipay", "Bank"],
    completion: "97.4%",
    online: false,
    verified: true,
    country: "🇨🇳",
  },
  {
    id: "o4",
    type: "sell",
    user: "BitLord_EU",
    rating: 4.6,
    trades: 512,
    token: "BTC",
    amount: 0.5,
    price: 100200,
    minOrder: 0.001,
    maxOrder: 0.5,
    payment: ["SEPA", "Revolut", "USDT"],
    completion: "96.1%",
    online: true,
    verified: false,
    country: "🇩🇪",
  },
  {
    id: "o5",
    type: "buy",
    user: "ArabTrader_AE",
    rating: 4.9,
    trades: 2140,
    token: "DOGE",
    amount: 500000,
    price: 0.152,
    minOrder: 1000,
    maxOrder: 100000,
    payment: ["Bank Transfer", "Crypto"],
    completion: "99.8%",
    online: true,
    verified: true,
    country: "🇦🇪",
  },
];

const MY_TRADES = [
  {
    id: "t1",
    type: "buy",
    token: "TRUMP",
    amount: 5000,
    value: 117.0,
    counterparty: "SkyTrader_Pro",
    status: "escrow",
    time: "5 min ago",
  },
  {
    id: "t2",
    type: "sell",
    token: "SKY4444",
    amount: 10000,
    value: 250.0,
    counterparty: "DeFi_Master_CN",
    status: "completed",
    time: "2 days ago",
  },
];

const STATUS_CONFIG: Record<
  string,
  { color: string; label: string; icon: any }
> = {
  escrow: {
    color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    label: "In Escrow",
    icon: Lock,
  },
  completed: {
    color: "bg-green-500/10 text-green-400 border-green-500/20",
    label: "Completed",
    icon: CheckCircle,
  },
  disputed: {
    color: "bg-red-500/10 text-red-400 border-red-500/20",
    label: "Disputed",
    icon: AlertTriangle,
  },
};

export default function P2PExchange() {
  const [tab, setTab] = useState<"buy" | "sell" | "my-trades">("buy");
  const [token, setToken] = useState("TRUMP");
  const [search, setSearch] = useState("");

  const filtered = OFFERS.filter(o => o.type === tab && o.token === token);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Users className="h-6 w-6 text-green-400" />
            P2P Exchange
          </h1>
          <p className="text-sm text-muted-foreground">
            Peer-to-peer trading with escrow protection
          </p>
        </div>
        <Button
          className="bg-green-600 text-white border-0"
          onClick={() => toast.info("Create offer form")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Post Offer
        </Button>
      </div>

      {/* Escrow Banner */}
      <div className="flex items-center gap-3 p-3 rounded-xl bg-green-500/5 border border-green-500/20">
        <Shield className="h-5 w-5 text-green-400 shrink-0" />
        <div>
          <p className="text-sm font-bold text-green-300">Escrow Protected</p>
          <p className="text-xs text-muted-foreground">
            All trades are secured by ShadowChat smart contract escrow. Funds
            are released only after both parties confirm.
          </p>
        </div>
      </div>

      {/* Tabs & Token Filter */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex gap-1 p-1 bg-muted/30 rounded-xl">
          {(["buy", "sell", "my-trades"] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${tab === t ? (t === "buy" ? "bg-green-600 text-white" : t === "sell" ? "bg-red-600 text-white" : "bg-blue-600 text-white") : "text-muted-foreground"}`}
            >
              {t.replace("-", " ")}
            </button>
          ))}
        </div>
        {tab !== "my-trades" && (
          <div className="flex gap-2">
            {["TRUMP", "SKY4444", "BTC", "ETH", "DOGE", "USDC"].map(t => (
              <button
                key={t}
                onClick={() => setToken(t)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${token === t ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground"}`}
              >
                {t}
              </button>
            ))}
          </div>
        )}
      </div>

      {tab !== "my-trades" ? (
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p>
                No {tab} offers for {token} right now
              </p>
              <Button
                className="mt-3 bg-green-600 text-white border-0"
                size="sm"
                onClick={() => toast.info("Create offer")}
              >
                Post an Offer
              </Button>
            </div>
          ) : (
            filtered.map((offer, i) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="border-border/50 hover:border-green-500/20 transition-colors">
                  <CardContent className="py-4 px-4">
                    <div className="flex items-center gap-4">
                      {/* Trader Info */}
                      <div className="flex items-center gap-2 w-48 shrink-0">
                        <div className="relative">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                            {offer.user[0]}
                          </div>
                          <div
                            className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background ${offer.online ? "bg-green-400" : "bg-muted-foreground"}`}
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-1">
                            <p className="text-sm font-bold">{offer.user}</p>
                            {offer.verified && (
                              <CheckCircle className="h-3.5 w-3.5 text-blue-400" />
                            )}
                            <span>{offer.country}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-0.5">
                              <Star className="h-3 w-3 text-yellow-400" />
                              {offer.rating}
                            </span>
                            <span>{offer.trades} trades</span>
                            <span className="text-green-400">
                              {offer.completion}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Price & Amount */}
                      <div className="flex-1">
                        <div className="flex items-center gap-4 flex-wrap">
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Price
                            </p>
                            <p className="font-black text-lg">
                              ${offer.price.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Available
                            </p>
                            <p className="font-bold">
                              {offer.amount.toLocaleString()} {offer.token}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Limits
                            </p>
                            <p className="text-sm">
                              {offer.minOrder.toLocaleString()} –{" "}
                              {offer.maxOrder.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Payment
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {offer.payment.map(p => (
                                <Badge
                                  key={p}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {p}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action */}
                      <Button
                        className={`shrink-0 ${tab === "buy" ? "bg-green-600" : "bg-red-600"} text-white border-0`}
                        onClick={() =>
                          toast.success(`Opening trade with ${offer.user}`)
                        }
                      >
                        {tab === "buy" ? "Buy" : "Sell"} {offer.token}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <h3 className="font-bold text-sm">My Active & Recent Trades</h3>
          {MY_TRADES.map((trade, i) => {
            const statusCfg = STATUS_CONFIG[trade.status];
            const StatusIcon = statusCfg.icon;
            return (
              <Card key={trade.id} className="border-border/50">
                <CardContent className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${trade.type === "buy" ? "bg-green-500/10" : "bg-red-500/10"}`}
                    >
                      {trade.type === "buy" ? (
                        <TrendingUp className="h-4 w-4 text-green-400" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold capitalize">
                        {trade.type} {trade.amount.toLocaleString()}{" "}
                        {trade.token}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        with {trade.counterparty} · {trade.time}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${trade.value}</p>
                      <Badge className={`text-xs ${statusCfg.color}`}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {statusCfg.label}
                      </Badge>
                    </div>
                    {trade.status === "escrow" && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="h-7 text-xs bg-green-600 text-white border-0"
                          onClick={() =>
                            toast.success("Payment confirmed! Escrow released.")
                          }
                        >
                          Confirm Payment
                        </Button>
                        <Button
                          size="sm"
                          className="h-7 text-xs"
                          variant="outline"
                          onClick={() => toast.info("Opening chat")}
                        >
                          <MessageSquare className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
