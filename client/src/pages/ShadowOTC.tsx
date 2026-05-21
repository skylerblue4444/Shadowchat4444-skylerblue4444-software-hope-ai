import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  DollarSign,
  Shield,
  Zap,
  Clock,
  CheckCircle,
  TrendingUp,
  Users,
  Phone,
  Mail,
  FileText,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const RECENT_TRADES = [
  {
    pair: "BTC/USDT",
    side: "buy",
    amount: "$2,500,000",
    rate: "$104,200",
    time: "5 min ago",
    status: "completed",
  },
  {
    pair: "SKY4444/USDT",
    side: "sell",
    amount: "$444,444",
    rate: "$0.044",
    time: "1 hr ago",
    status: "completed",
  },
  {
    pair: "ETH/BTC",
    side: "buy",
    amount: "$1,000,000",
    rate: "0.0301 BTC",
    time: "3 hrs ago",
    status: "completed",
  },
];

const BENEFITS = [
  {
    icon: Shield,
    title: "Zero Slippage",
    desc: "Fixed price quotes for large orders — no market impact",
  },
  {
    icon: Zap,
    title: "Instant Settlement",
    desc: "T+0 settlement for verified institutional clients",
  },
  {
    icon: Building2,
    title: "Dedicated Desk",
    desc: "Personal OTC trader assigned to your account",
  },
  {
    icon: DollarSign,
    title: "Best Rates",
    desc: "Tighter spreads than any exchange for $50K+ orders",
  },
];

export default function ShadowOTC() {
  const [tab, setTab] = useState<"rfq" | "history" | "about">("rfq");
  const [asset, setAsset] = useState("SKY4444");
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState("");
  const [requesting, setRequesting] = useState(false);
  const [quote, setQuote] = useState<null | {
    price: string;
    total: string;
    expires: number;
  }>(null);

  const requestQuote = async () => {
    if (!amount || parseFloat(amount) < 50000) {
      toast.error("Minimum OTC order: $50,000");
      return;
    }
    setRequesting(true);
    await new Promise(r => setTimeout(r, 2000));
    setRequesting(false);
    setQuote({
      price:
        asset === "SKY4444"
          ? "$0.0438"
          : asset === "BTC"
            ? "$104,180"
            : "$3,810",
      total: `$${(parseFloat(amount) * 0.998).toLocaleString()}`,
      expires: 30,
    });
    toast.success("✅ Quote received! Valid for 30 seconds.");
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Building2 className="h-6 w-6 text-emerald-400" />
            OTC Trading Desk
          </h1>
          <p className="text-sm text-muted-foreground">
            Institutional block trades — $50,000+ minimum
          </p>
        </div>
        <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 font-bold">
          🏛️ Institutional
        </Badge>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-2 gap-2">
        {BENEFITS.map(b => (
          <Card key={b.title} className="border-border/50">
            <CardContent className="py-3 px-3 flex items-start gap-2">
              <b.icon className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-xs">{b.title}</p>
                <p className="text-xs text-muted-foreground leading-tight">
                  {b.desc}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-2">
        {(["rfq", "history", "about"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium uppercase transition-colors ${tab === t ? "bg-emerald-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t === "rfq" ? "Request Quote" : t}
          </button>
        ))}
      </div>

      {tab === "rfq" && (
        <div className="space-y-3">
          <Card className="border-emerald-500/20 bg-emerald-900/5">
            <CardContent className="py-4 px-4 space-y-3">
              <p className="font-bold text-sm">Request for Quote (RFQ)</p>
              <div className="flex gap-2">
                {(["buy", "sell"] as const).map(s => (
                  <button
                    key={s}
                    onClick={() => setSide(s)}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase transition-colors ${side === s ? (s === "buy" ? "bg-green-600 text-white" : "bg-red-600 text-white") : "bg-muted text-muted-foreground"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Asset</p>
                <select
                  value={asset}
                  onChange={e => setAsset(e.target.value)}
                  className="w-full h-9 rounded-xl border border-border bg-background px-3 text-xs focus:outline-none"
                >
                  {[
                    "SKY4444",
                    "BTC",
                    "ETH",
                    "TRUMP",
                    "USDT",
                    "DOGE",
                    "XMR",
                  ].map(a => (
                    <option key={a}>{a}</option>
                  ))}
                </select>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  USD Amount (min $50,000)
                </p>
                <Input
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  type="number"
                  placeholder="100,000"
                  className="h-9 text-xs"
                />
              </div>
              {quote && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-xl bg-emerald-900/20 border border-emerald-500/20 space-y-1"
                >
                  <p className="font-bold text-xs text-emerald-400">
                    Quote Received — Expires in {quote.expires}s
                  </p>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Price</span>
                    <span className="font-bold">{quote.price}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">
                      You {side === "buy" ? "pay" : "receive"}
                    </span>
                    <span className="font-bold text-emerald-400">
                      {quote.total}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Spread</span>
                    <span className="font-bold">0.2%</span>
                  </div>
                  <Button
                    className="w-full h-9 text-xs bg-emerald-600 text-white border-0 font-bold mt-2"
                    onClick={() => {
                      setQuote(null);
                      toast.success(
                        `✅ OTC ${side.toUpperCase()} order executed! Settlement in 5 minutes.`
                      );
                    }}
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Accept Quote & Execute
                  </Button>
                </motion.div>
              )}
              {!quote && (
                <Button
                  className="w-full h-10 text-xs bg-emerald-600 text-white border-0 font-bold"
                  onClick={requestQuote}
                  disabled={requesting}
                >
                  {requesting ? (
                    "Getting best price..."
                  ) : (
                    <>
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Get Instant Quote
                    </>
                  )}
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "history" && (
        <div className="space-y-2">
          {RECENT_TRADES.map((trade, i) => (
            <Card key={i} className="border-border/50">
              <CardContent className="py-3 px-4 flex items-center gap-3">
                <div
                  className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 font-bold text-xs ${trade.side === "buy" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}
                >
                  {trade.side.toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm">{trade.pair}</p>
                  <p className="text-xs text-muted-foreground">
                    Rate: {trade.rate} · {trade.time}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-black text-sm text-emerald-400">
                    {trade.amount}
                  </p>
                  <Badge className="text-xs bg-green-500/10 text-green-400 border-green-500/20">
                    ✓ {trade.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "about" && (
        <Card className="border-border/50">
          <CardContent className="py-4 px-4 space-y-3">
            <p className="font-black text-base">ShadowChat OTC Desk</p>
            <p className="text-sm text-muted-foreground">
              Our OTC trading desk provides institutional and high-net-worth
              individuals with the ability to execute large block trades at
              competitive rates without market impact.
            </p>
            <div className="space-y-2">
              {[
                {
                  icon: DollarSign,
                  label: "Minimum Order",
                  value: "$50,000 USD",
                },
                { icon: Clock, label: "Settlement", value: "T+0 (instant)" },
                { icon: Shield, label: "KYC Required", value: "Level 4+" },
                { icon: Phone, label: "Hotline", value: "479-406-7123" },
                {
                  icon: Mail,
                  label: "Email",
                  value: "skylerblue4444@gmail.com",
                },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3">
                  <item.icon className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span className="text-xs text-muted-foreground">
                    {item.label}:
                  </span>
                  <span className="text-xs font-bold">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
