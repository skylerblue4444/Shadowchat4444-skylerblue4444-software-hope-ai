import { useState } from "react";
import { motion } from "framer-motion";
import {
  Rocket,
  Coins,
  Clock,
  Users,
  TrendingUp,
  Star,
  CheckCircle,
  Zap,
  Lock,
  Gift,
  Globe,
  Shield,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const TIERS = [
  {
    name: "Seed Round",
    price: "$0.001",
    allocation: "44,444,444 SKY",
    raised: "100%",
    status: "sold-out",
    bonus: "100% bonus",
    min: "$100",
    max: "$10,000",
  },
  {
    name: "Private Sale",
    price: "$0.004",
    allocation: "88,888,888 SKY",
    raised: "100%",
    status: "sold-out",
    bonus: "50% bonus",
    min: "$500",
    max: "$50,000",
  },
  {
    name: "Public Sale A",
    price: "$0.010",
    allocation: "111,111,111 SKY",
    raised: "88%",
    status: "live",
    bonus: "25% bonus",
    min: "$100",
    max: "$100,000",
  },
  {
    name: "Public Sale B",
    price: "$0.020",
    allocation: "111,111,111 SKY",
    raised: "0%",
    status: "upcoming",
    bonus: "10% bonus",
    min: "$50",
    max: "$500,000",
  },
  {
    name: "Exchange Listing",
    price: "$0.044",
    allocation: "Market",
    raised: "—",
    status: "upcoming",
    bonus: "None",
    min: "—",
    max: "—",
  },
];

const TOKENOMICS = [
  { label: "Public Sale", pct: 25, color: "bg-blue-500" },
  { label: "Team & Advisors", pct: 15, color: "bg-purple-500" },
  { label: "Ecosystem Fund", pct: 20, color: "bg-green-500" },
  { label: "Staking Rewards", pct: 20, color: "bg-yellow-500" },
  { label: "Treasury", pct: 10, color: "bg-orange-500" },
  { label: "Liquidity", pct: 10, color: "bg-pink-500" },
];

const ROADMAP = [
  {
    phase: "Q1 2026",
    title: "Platform Launch",
    items: ["ShadowChat v1.0", "SKY4444 Token Deploy", "Seed Round"],
    done: true,
  },
  {
    phase: "Q2 2026",
    title: "ICO & Exchange",
    items: ["Public Sale", "DEX Listing", "100+ Pages"],
    done: true,
  },
  {
    phase: "Q3 2026",
    title: "Ecosystem Growth",
    items: ["CEX Listing (Binance)", "Mobile App", "IT Services Launch"],
    done: false,
  },
  {
    phase: "Q4 2026",
    title: "Global Expansion",
    items: ["China Market Entry", "EU Compliance", "1M Users"],
    done: false,
  },
];

export default function ShadowICO() {
  const [tab, setTab] = useState<"overview" | "buy" | "tokenomics" | "roadmap">(
    "overview"
  );
  const [investAmount, setInvestAmount] = useState("");
  const [whitelisted, setWhitelisted] = useState(false);
  const [email, setEmail] = useState("");

  const skyReceived = investAmount
    ? Math.floor((parseFloat(investAmount) / 0.01) * 1.25)
    : 0;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Rocket className="h-6 w-6 text-orange-400" />
            SKY4444 ICO
          </h1>
          <p className="text-sm text-muted-foreground">
            Official token sale — invest in the future of ShadowChat
          </p>
        </div>
        <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/20 font-bold animate-pulse">
          🔴 LIVE
        </Badge>
      </div>

      {/* Raise Progress */}
      <Card className="border-orange-500/20 bg-gradient-to-br from-orange-900/10 to-red-900/10">
        <CardContent className="py-4 px-4">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-muted-foreground">Total Raised</span>
            <span className="font-black text-orange-400">
              $4,444,444 / $10,000,000
            </span>
          </div>
          <Progress value={44.4} className="h-3 mb-2" />
          <div className="grid grid-cols-3 gap-2 text-xs text-center">
            <div>
              <p className="font-black text-orange-400">44.4%</p>
              <p className="text-muted-foreground">Funded</p>
            </div>
            <div>
              <p className="font-black text-orange-400">8,888</p>
              <p className="text-muted-foreground">Investors</p>
            </div>
            <div>
              <p className="font-black text-orange-400">14 days</p>
              <p className="text-muted-foreground">Remaining</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        {(["overview", "buy", "tokenomics", "roadmap"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-orange-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="space-y-3">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Card
                className={`border ${tier.status === "live" ? "border-orange-500/30 bg-orange-900/5" : tier.status === "sold-out" ? "border-border/30 opacity-60" : "border-border/50"}`}
              >
                <CardContent className="py-3 px-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 ${tier.status === "live" ? "bg-orange-500/10" : tier.status === "sold-out" ? "bg-green-500/10" : "bg-muted"}`}
                    >
                      {tier.status === "live" ? (
                        <Zap className="h-4 w-4 text-orange-400" />
                      ) : tier.status === "sold-out" ? (
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      ) : (
                        <Clock className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="font-black text-sm">{tier.name}</p>
                        <Badge
                          className={`text-xs ${tier.status === "live" ? "bg-orange-500/10 text-orange-400 border-orange-500/20" : tier.status === "sold-out" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-muted text-muted-foreground"}`}
                        >
                          {tier.status === "live"
                            ? "🔴 Live"
                            : tier.status === "sold-out"
                              ? "✓ Sold Out"
                              : "⏳ Soon"}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-1 text-xs">
                        <div>
                          <p className="text-muted-foreground">Price</p>
                          <p className="font-bold text-orange-400">
                            {tier.price}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Bonus</p>
                          <p className="font-bold text-green-400">
                            {tier.bonus}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Min/Max</p>
                          <p className="font-bold">
                            {tier.min}/{tier.max}
                          </p>
                        </div>
                      </div>
                      {tier.raised !== "—" && tier.raised !== "100%" && (
                        <div className="mt-1.5">
                          <Progress
                            value={parseFloat(tier.raised)}
                            className="h-1.5"
                          />
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {tier.raised} filled
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "buy" && (
        <div className="space-y-3">
          {!whitelisted ? (
            <Card className="border-orange-500/20 bg-orange-900/5">
              <CardContent className="py-4 px-4 space-y-3">
                <p className="font-bold text-sm">Join the Whitelist</p>
                <p className="text-xs text-muted-foreground">
                  Get early access and guaranteed allocation for Public Sale A.
                </p>
                <Input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  type="email"
                  placeholder="your@email.com"
                  className="h-9 text-xs"
                />
                <Button
                  className="w-full h-10 text-xs bg-orange-600 text-white border-0 font-bold"
                  onClick={() => {
                    if (!email) {
                      toast.error("Enter your email");
                      return;
                    }
                    setWhitelisted(true);
                    toast.success(
                      "✅ Whitelisted! Check your email for confirmation."
                    );
                  }}
                >
                  <Star className="h-4 w-4 mr-2" />
                  Join Whitelist — Free
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-green-500/20 bg-green-900/5">
              <CardContent className="py-3 px-4 flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-green-400 shrink-0" />
                <div>
                  <p className="font-bold text-sm text-green-400">
                    ✓ Whitelisted
                  </p>
                  <p className="text-xs text-muted-foreground">
                    You have guaranteed allocation in Public Sale A
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="border-orange-500/20 bg-orange-900/5">
            <CardContent className="py-4 px-4 space-y-3">
              <p className="font-bold text-sm">Buy SKY4444 — Public Sale A</p>
              <p className="text-xs text-muted-foreground">
                Current price: $0.010 · 25% bonus · Min $100
              </p>
              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  Investment Amount (USD)
                </p>
                <Input
                  value={investAmount}
                  onChange={e => setInvestAmount(e.target.value)}
                  type="number"
                  placeholder="100"
                  className="h-9 text-xs"
                />
              </div>
              {investAmount && (
                <div className="p-2.5 rounded-xl bg-black/10 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      SKY4444 Received
                    </span>
                    <span className="font-black text-orange-400">
                      {skyReceived.toLocaleString()} SKY
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bonus (25%)</span>
                    <span className="text-green-400 font-bold">
                      +{Math.floor(skyReceived * 0.2).toLocaleString()} SKY
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Vesting</span>
                    <span>6-month cliff, 18-month linear</span>
                  </div>
                </div>
              )}
              <div className="flex gap-2">
                {["$100", "$500", "$1,000", "$5,000"].map(amt => (
                  <button
                    key={amt}
                    onClick={() =>
                      setInvestAmount(amt.replace("$", "").replace(",", ""))
                    }
                    className="flex-1 py-2 rounded-xl bg-muted text-xs font-bold hover:bg-muted/80 transition-colors"
                  >
                    {amt}
                  </button>
                ))}
              </div>
              <Button
                className="w-full h-11 text-sm font-black bg-orange-600 text-white border-0"
                onClick={() => {
                  if (!investAmount || parseFloat(investAmount) < 100) {
                    toast.error("Minimum investment is $100");
                    return;
                  }
                  toast.success(
                    `✅ Invested $${investAmount}! You'll receive ${skyReceived.toLocaleString()} SKY4444.`
                  );
                  setInvestAmount("");
                }}
              >
                <Rocket className="h-4 w-4 mr-2" />
                Invest Now
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "tokenomics" && (
        <div className="space-y-3">
          <Card className="border-border/50">
            <CardContent className="py-4 px-4">
              <p className="font-bold text-sm mb-1">Total Supply</p>
              <p className="text-2xl font-black text-orange-400">
                444,444,444 SKY4444
              </p>
              <p className="text-xs text-muted-foreground">
                Fixed supply — no minting after launch
              </p>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="py-4 px-4">
              <p className="font-bold text-sm mb-3">Token Distribution</p>
              {TOKENOMICS.map((t, i) => (
                <div key={t.label} className="mb-2">
                  <div className="flex justify-between text-xs mb-0.5">
                    <span className="flex items-center gap-1.5">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${t.color} inline-block`}
                      />
                      {t.label}
                    </span>
                    <span className="font-bold">{t.pct}%</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${t.pct}%` }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className={`h-full ${t.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "roadmap" && (
        <div className="space-y-3">
          {ROADMAP.map((phase, i) => (
            <Card
              key={phase.phase}
              className={`border ${phase.done ? "border-green-500/20 bg-green-900/5" : "border-border/50"}`}
            >
              <CardContent className="py-3 px-4">
                <div className="flex items-start gap-3">
                  <div
                    className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 ${phase.done ? "bg-green-500/10" : "bg-muted"}`}
                  >
                    {phase.done ? (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : (
                      <Clock className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="font-black text-sm">{phase.phase}</p>
                      <Badge className="text-xs bg-muted text-muted-foreground">
                        {phase.title}
                      </Badge>
                    </div>
                    {phase.items.map(item => (
                      <p
                        key={item}
                        className="text-xs text-muted-foreground flex items-center gap-1"
                      >
                        {phase.done ? (
                          <CheckCircle className="h-3 w-3 text-green-400 shrink-0" />
                        ) : (
                          <span className="h-3 w-3 rounded-full border border-muted-foreground/30 shrink-0 inline-block" />
                        )}
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
