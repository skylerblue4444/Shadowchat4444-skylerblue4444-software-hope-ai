import { useState } from "react";
import { motion } from "framer-motion";
import {
  Coins,
  Flame,
  Lock,
  TrendingUp,
  Users,
  BarChart3,
  ArrowUpRight,
  Zap,
  Shield,
  Globe,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const ALLOCATION = [
  {
    label: "Public Sale (ICO)",
    pct: 30,
    amount: "300M SKY",
    color: "#6366f1",
    locked: false,
  },
  {
    label: "Ecosystem & Rewards",
    pct: 25,
    amount: "250M SKY",
    color: "#22c55e",
    locked: false,
  },
  {
    label: "Team & Advisors",
    pct: 15,
    amount: "150M SKY",
    color: "#f59e0b",
    locked: true,
    vestingMonths: 24,
  },
  {
    label: "Treasury & DAO",
    pct: 15,
    amount: "150M SKY",
    color: "#06b6d4",
    locked: true,
    vestingMonths: 12,
  },
  {
    label: "Marketing & Partnerships",
    pct: 10,
    amount: "100M SKY",
    color: "#ec4899",
    locked: false,
  },
  {
    label: "Liquidity Pool",
    pct: 5,
    amount: "50M SKY",
    color: "#ef4444",
    locked: true,
    vestingMonths: 6,
  },
];

const BURN_EVENTS = [
  {
    date: "May 1, 2025",
    amount: "4,444,444 SKY",
    value: "$195,555",
    txHash: "0x4444...4444",
  },
  {
    date: "Apr 1, 2025",
    amount: "2,222,222 SKY",
    value: "$97,778",
    txHash: "0x2222...2222",
  },
  {
    date: "Mar 1, 2025",
    amount: "1,111,111 SKY",
    value: "$48,889",
    txHash: "0x1111...1111",
  },
];

const METRICS = [
  {
    label: "Total Supply",
    value: "1,000,000,000",
    sub: "1 Billion SKY4444",
    icon: Coins,
    color: "text-purple-400",
  },
  {
    label: "Circulating Supply",
    value: "444,444,444",
    sub: "44.4% of total",
    icon: Globe,
    color: "text-blue-400",
  },
  {
    label: "Total Burned",
    value: "7,777,777",
    sub: "0.78% burned forever",
    icon: Flame,
    color: "text-red-400",
  },
  {
    label: "Staked",
    value: "188,888,888",
    sub: "42.5% of circulating",
    icon: Lock,
    color: "text-green-400",
  },
];

export default function ShadowTokenomics() {
  const [tab, setTab] = useState<
    "overview" | "allocation" | "burns" | "utility"
  >("overview");

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Coins className="h-6 w-6 text-purple-400" />
            SKY4444 Tokenomics
          </h1>
          <p className="text-sm text-muted-foreground">
            Complete token economics, supply breakdown, and burn mechanics
          </p>
        </div>
        <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 font-bold">
          SKY4444
        </Badge>
      </div>

      {/* Price Card */}
      <Card className="border-purple-500/20 bg-gradient-to-br from-purple-900/20 to-blue-900/10">
        <CardContent className="py-4 px-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">SKY4444 Price</p>
              <p className="font-black text-3xl text-purple-400">$0.0444</p>
              <p className="text-xs text-green-400 font-bold">
                +1,444% since ICO launch
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Market Cap</p>
              <p className="font-black text-xl text-purple-400">$19.7M</p>
              <p className="text-xs text-muted-foreground">Rank #444</p>
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <Button
              size="sm"
              className="flex-1 h-8 text-xs bg-purple-600 text-white border-0 font-bold"
              onClick={() => toast.success("Opening SKY4444 buy flow...")}
            >
              Buy SKY4444
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex-1 h-8 text-xs font-bold"
              onClick={() => toast.success("Opening staking...")}
            >
              Stake & Earn
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        {(["overview", "allocation", "burns", "utility"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-purple-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="space-y-2">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Card className="border-border/50">
                <CardContent className="py-3 px-4 flex items-center gap-3">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 bg-muted`}
                  >
                    <m.icon className={`h-5 w-5 ${m.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{m.label}</p>
                    <p className="text-xs text-muted-foreground">{m.sub}</p>
                  </div>
                  <p className={`font-black text-sm ${m.color}`}>{m.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "allocation" && (
        <div className="space-y-3">
          {/* Visual pie-like bar */}
          <Card className="border-border/50">
            <CardContent className="py-3 px-4">
              <p className="font-bold text-sm mb-2">Token Distribution</p>
              <div className="flex h-4 rounded-full overflow-hidden gap-0.5">
                {ALLOCATION.map(a => (
                  <div
                    key={a.label}
                    className="h-full"
                    style={{ width: `${a.pct}%`, backgroundColor: a.color }}
                    title={`${a.label}: ${a.pct}%`}
                  />
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {ALLOCATION.map(a => (
                  <div key={a.label} className="flex items-center gap-1">
                    <div
                      className="h-2 w-2 rounded-full shrink-0"
                      style={{ backgroundColor: a.color }}
                    />
                    <span className="text-xs text-muted-foreground">
                      {a.pct}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          {ALLOCATION.map((alloc, i) => (
            <motion.div
              key={alloc.label}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Card className="border-border/50">
                <CardContent className="py-3 px-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full shrink-0"
                        style={{ backgroundColor: alloc.color }}
                      />
                      <p className="font-bold text-sm">{alloc.label}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {alloc.locked && (
                        <Badge className="text-xs bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                          <Lock className="h-3 w-3 mr-0.5" />
                          {alloc.vestingMonths}mo vesting
                        </Badge>
                      )}
                      <p
                        className="font-black text-sm"
                        style={{ color: alloc.color }}
                      >
                        {alloc.pct}%
                      </p>
                    </div>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: alloc.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${alloc.pct * 3}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {alloc.amount}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "burns" && (
        <div className="space-y-3">
          <Card className="border-red-500/20 bg-red-900/5">
            <CardContent className="py-3 px-4 text-center">
              <Flame className="h-10 w-10 text-red-400 mx-auto mb-2" />
              <p className="font-black text-2xl text-red-400">
                7,777,777 SKY4444
              </p>
              <p className="text-xs text-muted-foreground">
                Total burned forever — deflationary by design
              </p>
              <p className="text-xs text-red-400 font-bold mt-1">
                ≈ $345,333 in value destroyed
              </p>
            </CardContent>
          </Card>
          <p className="text-xs font-bold text-muted-foreground">
            BURN HISTORY
          </p>
          {BURN_EVENTS.map((burn, i) => (
            <Card key={burn.date} className="border-border/50">
              <CardContent className="py-3 px-4 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                  <Flame className="h-4 w-4 text-red-400" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm text-red-400">
                    {burn.amount}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {burn.date} · {burn.txHash}
                  </p>
                </div>
                <p className="font-bold text-sm text-muted-foreground">
                  {burn.value}
                </p>
              </CardContent>
            </Card>
          ))}
          <Card className="border-orange-500/20 bg-orange-900/5">
            <CardContent className="py-3 px-4">
              <p className="font-bold text-sm mb-1">Burn Mechanics</p>
              {[
                "1% of all trading fees burned monthly",
                "0.1% of marketplace transactions burned",
                "Community vote can trigger extra burns",
                "Target: 50% total supply burned by 2030",
              ].map(m => (
                <div key={m} className="flex items-center gap-2 py-1">
                  <Flame className="h-3 w-3 text-orange-400 shrink-0" />
                  <p className="text-xs text-muted-foreground">{m}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "utility" && (
        <div className="space-y-2">
          {[
            {
              icon: "💳",
              title: "Payment",
              desc: "Pay for all services across the ShadowChat ecosystem",
            },
            {
              icon: "🗳️",
              title: "Governance",
              desc: "Vote on platform decisions — 1 SKY4444 = 1 vote",
            },
            {
              icon: "🔒",
              title: "Staking",
              desc: "Stake to earn up to 124.5% APY and unlock premium features",
            },
            {
              icon: "🎮",
              title: "Gaming",
              desc: "Entry fees, prizes, and rewards in all ShadowChat games",
            },
            {
              icon: "🏷️",
              title: "Fee Discounts",
              desc: "Hold SKY4444 for up to 50% discount on trading fees",
            },
            {
              icon: "🚀",
              title: "ICO Access",
              desc: "Early access to new token launches on ShadowLaunchpad",
            },
            {
              icon: "🎨",
              title: "NFT Minting",
              desc: "Required to mint NFTs on the ShadowNFT platform",
            },
            {
              icon: "🌍",
              title: "Cross-Chain",
              desc: "Bridge SKY4444 across 12 blockchain networks",
            },
          ].map(u => (
            <Card key={u.title} className="border-border/50">
              <CardContent className="py-2.5 px-4 flex items-center gap-3">
                <span className="text-xl shrink-0">{u.icon}</span>
                <div>
                  <p className="font-bold text-sm">{u.title}</p>
                  <p className="text-xs text-muted-foreground">{u.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
