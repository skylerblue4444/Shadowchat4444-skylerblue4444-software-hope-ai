import { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  DollarSign,
  Clock,
  TrendingUp,
  CheckCircle,
  Lock,
  Star,
  ArrowRight,
  Zap,
  BarChart3,
  Award,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Bond {
  id: number;
  name: string;
  ticker: string;
  yield: string;
  duration: string;
  minInvest: string;
  currency: string;
  type: string;
  rating: string;
  maturity: string;
  issued: string;
  available: string;
  description: string;
  features: string[];
}

const BONDS: Bond[] = [
  {
    id: 1,
    name: "SKY4444 Foundation Bond",
    ticker: "SKY-BOND-1Y",
    yield: "12.5% APY",
    duration: "12 months",
    minInvest: "$100",
    currency: "SKY4444 / USDT",
    type: "Platform Bond",
    rating: "AA",
    maturity: "May 2027",
    issued: "May 2026",
    available: "$2.4M / $5M",
    description:
      "Fixed-rate bond backed by ShadowChat platform revenue. Guaranteed 12.5% APY paid monthly in SKY4444.",
    features: [
      "Monthly interest payments",
      "Principal guaranteed",
      "Early exit at 90-day penalty",
      "Backed by platform revenue",
    ],
  },
  {
    id: 2,
    name: "IT Resolutions Revenue Bond",
    ticker: "SKYIT-BOND",
    yield: "9.8% APY",
    duration: "6 months",
    minInvest: "$500",
    currency: "USDT / USD",
    type: "Business Bond",
    rating: "A+",
    maturity: "Nov 2026",
    issued: "May 2026",
    available: "$850K / $2M",
    description:
      "Revenue-backed bond from Skyler Blue IT Resolutions managed IT contracts. Quarterly payments in USDT.",
    features: [
      "Quarterly USDT payments",
      "Backed by IT contracts",
      "6-month term",
      "Skyler Blue IT guarantee",
    ],
  },
  {
    id: 3,
    name: "ShadowDeFi Liquidity Bond",
    ticker: "DEFI-BOND",
    yield: "18.2% APY",
    duration: "3 months",
    minInvest: "$50",
    currency: "SKY4444",
    type: "DeFi Bond",
    rating: "BBB",
    maturity: "Aug 2026",
    issued: "May 2026",
    available: "$1.1M / $3M",
    description:
      "Higher-yield bond providing liquidity to ShadowDEX. Yield generated from trading fees. Higher risk, higher reward.",
    features: [
      "Weekly SKY4444 payments",
      "DEX fee-backed yield",
      "3-month term",
      "Auto-compound option",
    ],
  },
  {
    id: 4,
    name: "ShadowDAO Treasury Bond",
    ticker: "DAO-BOND-2Y",
    yield: "8.0% APY",
    duration: "24 months",
    minInvest: "$1,000",
    currency: "USDT",
    type: "DAO Bond",
    rating: "AA+",
    maturity: "May 2028",
    issued: "May 2026",
    available: "$3.2M / $10M",
    description:
      "Long-term DAO treasury bond with the highest credit rating. Backed by the full ShadowChat DAO treasury of $24M.",
    features: [
      "Bi-annual payments",
      "DAO treasury backed",
      "Governance voting rights",
      "Highest credit rating",
    ],
  },
  {
    id: 5,
    name: "Charity Impact Bond",
    ticker: "CHARITY-BOND",
    yield: "6.5% APY",
    duration: "12 months",
    minInvest: "$25",
    currency: "SKY4444 / TRUMP",
    type: "Impact Bond",
    rating: "A",
    maturity: "May 2027",
    issued: "May 2026",
    available: "$420K / $1M",
    description:
      "Social impact bond where 50% of yield goes to verified charities. Earn while doing good.",
    features: [
      "50% to charity",
      "Monthly payments",
      "Impact certificate NFT",
      "Tax-deductible portion",
    ],
  },
];

const RATING_COLORS: Record<string, string> = {
  "AA+": "text-green-400",
  AA: "text-green-400",
  "A+": "text-cyan-400",
  A: "text-cyan-400",
  BBB: "text-yellow-400",
};

export default function ShadowBonds() {
  const [selected, setSelected] = useState<Bond | null>(null);
  const [investAmount, setInvestAmount] = useState("");

  const calcReturn = (bond: Bond, amt: number) => {
    const rate = parseFloat(bond.yield) / 100;
    const months = parseInt(bond.duration);
    return ((amt * rate * months) / 12).toFixed(2);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Shield className="h-6 w-6 text-indigo-400" />
            ShadowBonds
          </h1>
          <p className="text-sm text-muted-foreground">
            Fixed-income crypto bonds with guaranteed yields and principal
            protection
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Total Issued", value: "$21M", color: "text-indigo-400" },
          { label: "Best Yield", value: "18.2%", color: "text-green-400" },
          { label: "Investors", value: "4,821", color: "text-cyan-400" },
          { label: "Paid Out", value: "$1.8M", color: "text-yellow-400" },
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
        {/* Bond List */}
        <div className="lg:col-span-2 space-y-3">
          {BONDS.map((bond, i) => (
            <motion.div
              key={bond.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Card
                className={`border-border/50 hover:border-indigo-500/20 transition-all cursor-pointer ${selected?.id === bond.id ? "border-indigo-500/40 bg-indigo-900/5" : ""}`}
                onClick={() => setSelected(bond)}
              >
                <CardContent className="py-4 px-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Shield className="h-5 w-5 text-indigo-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-black text-sm">{bond.name}</p>
                          <Badge className="text-xs bg-muted text-muted-foreground border-0">
                            {bond.type}
                          </Badge>
                          <span
                            className={`text-xs font-black ${RATING_COLORS[bond.rating] || "text-muted-foreground"}`}
                          >
                            {bond.rating}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {bond.ticker} · {bond.currency} · Min {bond.minInvest}
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-black text-base text-green-400">
                        {bond.yield}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {bond.duration}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">
                        Availability
                      </span>
                      <span className="font-medium">{bond.available}</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-500 rounded-full"
                        style={{
                          width: `${(parseFloat(bond.available.split("/")[0].replace("$", "").replace("M", "").replace("K", "")) / parseFloat(bond.available.split("/")[1].replace("$", "").replace("M", "").replace("K", ""))) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Detail Panel */}
        <div>
          {selected ? (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="border-indigo-500/20 bg-indigo-900/5 sticky top-4">
                <CardContent className="py-5 px-4 space-y-4">
                  <div>
                    <p className="font-black text-base">{selected.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {selected.ticker}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {selected.description}
                  </p>
                  <div className="space-y-1.5">
                    {selected.features.map(f => (
                      <div key={f} className="flex items-center gap-2 text-xs">
                        <CheckCircle className="h-3.5 w-3.5 text-green-400 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      { label: "Yield", value: selected.yield, green: true },
                      { label: "Duration", value: selected.duration },
                      { label: "Maturity", value: selected.maturity },
                      { label: "Rating", value: selected.rating },
                    ].map(s => (
                      <div
                        key={s.label}
                        className="bg-muted/50 rounded-lg px-2 py-1.5 text-center"
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
                  <input
                    type="number"
                    placeholder={`Min ${selected.minInvest}`}
                    value={investAmount}
                    onChange={e => setInvestAmount(e.target.value)}
                    className="w-full h-10 px-4 rounded-xl bg-muted text-sm border border-border/50 focus:outline-none focus:border-indigo-500/40"
                  />
                  {investAmount && parseFloat(investAmount) > 0 && (
                    <div className="bg-green-900/10 border border-green-500/20 rounded-xl px-3 py-2 text-xs text-center">
                      <p className="text-muted-foreground">Estimated Return</p>
                      <p className="font-black text-green-400 text-base">
                        +${calcReturn(selected, parseFloat(investAmount))}
                      </p>
                      <p className="text-muted-foreground">
                        over {selected.duration}
                      </p>
                    </div>
                  )}
                  <Button
                    className="w-full h-10 bg-indigo-600 text-white border-0 font-bold text-sm"
                    onClick={() => {
                      toast.success(
                        `Bond purchase confirmed! ${selected.ticker} — $${investAmount || "0"}`
                      );
                      setInvestAmount("");
                    }}
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Purchase Bond
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <Card className="border-border/50">
              <CardContent className="py-8 px-4 text-center text-muted-foreground">
                <Shield className="h-8 w-8 mx-auto mb-2 opacity-40" />
                <p className="text-sm">
                  Select a bond to view details and invest
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
