import { useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  DollarSign,
  Users,
  TrendingUp,
  Gift,
  Zap,
  Play,
  Image,
  Music,
  FileText,
  BarChart3,
  ArrowUpRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const CREATOR_STATS = [
  {
    label: "Total Earnings",
    value: "$44,444",
    change: "+124%",
    icon: DollarSign,
    color: "text-green-400",
  },
  {
    label: "Subscribers",
    value: "4,444",
    change: "+88%",
    icon: Users,
    color: "text-blue-400",
  },
  {
    label: "SKY4444 Earned",
    value: "444,444",
    change: "+444%",
    icon: Zap,
    color: "text-yellow-400",
  },
  {
    label: "Content Views",
    value: "1.44M",
    change: "+44%",
    icon: TrendingUp,
    color: "text-purple-400",
  },
];

const CONTENT_TYPES = [
  {
    type: "Video",
    icon: Play,
    count: 44,
    revenue: "$12,444",
    color: "#6366f1",
  },
  {
    type: "Images",
    icon: Image,
    count: 188,
    revenue: "$8,888",
    color: "#ec4899",
  },
  {
    type: "Music",
    icon: Music,
    count: 12,
    revenue: "$4,444",
    color: "#22c55e",
  },
  {
    type: "Articles",
    icon: FileText,
    count: 88,
    revenue: "$2,222",
    color: "#f59e0b",
  },
];

const TIERS = [
  {
    name: "Shadow Fan",
    price: 4.44,
    perks: [
      "Access to exclusive posts",
      "Fan badge",
      "Monthly SKY4444 airdrop",
    ],
    color: "#6366f1",
    subscribers: 2888,
  },
  {
    name: "Shadow VIP",
    price: 14.44,
    perks: [
      "All Fan perks",
      "Direct message access",
      "Early content access",
      "2x SKY4444 rewards",
    ],
    color: "#ec4899",
    subscribers: 1111,
  },
  {
    name: "Shadow Elite",
    price: 44.44,
    perks: [
      "All VIP perks",
      "Monthly 1-on-1 call",
      "NFT whitelist access",
      "5x SKY4444 rewards",
      "Co-create content",
    ],
    color: "#f59e0b",
    subscribers: 444,
  },
];

const TOP_SUPPORTERS = [
  { name: "CryptoWhale.eth", amount: "$4,444", avatar: "CW", color: "#6366f1" },
  { name: "SkyFan4444.eth", amount: "$1,888", avatar: "SF", color: "#ec4899" },
  { name: "ShadowHolder.eth", amount: "$888", avatar: "SH", color: "#22c55e" },
  { name: "TrumpBull.eth", amount: "$444", avatar: "TB", color: "#ef4444" },
];

export default function ShadowCreatorEconomy() {
  const [tab, setTab] = useState<
    "dashboard" | "tiers" | "nftdrops" | "analytics"
  >("dashboard");
  const [newTierName, setNewTierName] = useState("");
  const [newTierPrice, setNewTierPrice] = useState("");

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Star className="h-6 w-6 text-yellow-400" />
            Creator Economy
          </h1>
          <p className="text-sm text-muted-foreground">
            Monetize your content with subscriptions, tips, and NFTs
          </p>
        </div>
        <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20 font-bold">
          Creator Pro
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {CREATOR_STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card className="border-border/50">
              <CardContent className="py-3 px-3">
                <div className="flex items-center gap-2 mb-1">
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
                <p className={`font-black text-lg ${stat.color}`}>
                  {stat.value}
                </p>
                <p className="text-xs text-green-400">
                  {stat.change} this month
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-2">
        {(["dashboard", "tiers", "nftdrops", "analytics"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-yellow-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "dashboard" && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {CONTENT_TYPES.map(ct => (
              <Card key={ct.type} className="border-border/50">
                <CardContent className="py-3 px-3 flex items-center gap-2">
                  <div
                    className="h-9 w-9 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: ct.color + "20" }}
                  >
                    <ct.icon className="h-4 w-4" style={{ color: ct.color }} />
                  </div>
                  <div>
                    <p className="font-bold text-xs">{ct.type}</p>
                    <p className="text-xs text-muted-foreground">
                      {ct.count} pieces
                    </p>
                    <p className="text-xs font-bold text-green-400">
                      {ct.revenue}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="border-border/50">
            <CardContent className="py-3 px-4">
              <p className="font-bold text-sm mb-3">Top Supporters</p>
              <div className="space-y-2">
                {TOP_SUPPORTERS.map((s, i) => (
                  <div key={s.name} className="flex items-center gap-3">
                    <div
                      className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-black text-white shrink-0"
                      style={{ backgroundColor: s.color }}
                    >
                      {s.avatar}
                    </div>
                    <p className="font-bold text-xs flex-1">{s.name}</p>
                    <p className="font-black text-xs text-green-400">
                      {s.amount}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <div className="grid grid-cols-2 gap-2">
            <Button
              className="h-10 text-xs bg-yellow-600 text-white border-0 font-bold"
              onClick={() => toast.success("Opening upload studio...")}
            >
              Upload Content
            </Button>
            <Button
              variant="outline"
              className="h-10 text-xs font-bold"
              onClick={() =>
                toast.success("Sending tip request to followers...")
              }
            >
              <Gift className="h-4 w-4 mr-1" />
              Request Tips
            </Button>
          </div>
        </div>
      )}

      {tab === "tiers" && (
        <div className="space-y-3">
          {TIERS.map((tier, i) => (
            <Card key={tier.name} className="border-border/50 overflow-hidden">
              <div className="h-1.5" style={{ backgroundColor: tier.color }} />
              <CardContent className="py-3 px-4 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-black text-sm">{tier.name}</p>
                  <Badge
                    className="font-black text-sm"
                    style={{
                      backgroundColor: tier.color + "20",
                      color: tier.color,
                      borderColor: tier.color + "40",
                    }}
                  >
                    ${tier.price}/mo
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {tier.subscribers.toLocaleString()} subscribers
                </p>
                <ul className="space-y-1">
                  {tier.perks.map(perk => (
                    <li
                      key={perk}
                      className="text-xs flex items-center gap-1.5"
                    >
                      <span style={{ color: tier.color }}>✓</span> {perk}
                    </li>
                  ))}
                </ul>
                <Button
                  size="sm"
                  className="w-full h-8 text-xs font-bold text-white border-0"
                  style={{ backgroundColor: tier.color }}
                  onClick={() => toast.success(`Editing ${tier.name} tier...`)}
                >
                  Edit Tier
                </Button>
              </CardContent>
            </Card>
          ))}
          <Card className="border-dashed border-2 border-border/50">
            <CardContent className="py-4 px-4 space-y-2">
              <p className="font-bold text-sm text-center">+ Create New Tier</p>
              <Input
                value={newTierName}
                onChange={e => setNewTierName(e.target.value)}
                placeholder="Tier name"
                className="h-9 text-xs"
              />
              <Input
                value={newTierPrice}
                onChange={e => setNewTierPrice(e.target.value)}
                placeholder="Monthly price (USD)"
                className="h-9 text-xs"
                type="number"
              />
              <Button
                className="w-full h-9 text-xs bg-yellow-600 text-white border-0 font-bold"
                onClick={() => {
                  toast.success(
                    `Created ${newTierName} tier at $${newTierPrice}/mo!`
                  );
                  setNewTierName("");
                  setNewTierPrice("");
                }}
              >
                Create Tier
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "nftdrops" && (
        <div className="space-y-3">
          {[
            {
              name: "Shadow Genesis Collection",
              items: 444,
              price: "0.044 ETH",
              status: "live",
              raised: "44.4 ETH",
            },
            {
              name: "Creator Pass NFT",
              items: 100,
              price: "0.1 ETH",
              status: "upcoming",
              raised: "-",
            },
            {
              name: "Shadow Art Series #1",
              items: 1000,
              price: "0.01 ETH",
              status: "sold_out",
              raised: "10 ETH",
            },
          ].map(drop => (
            <Card key={drop.name} className="border-border/50">
              <CardContent className="py-3 px-4 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-sm">{drop.name}</p>
                  <Badge
                    className={`text-xs ${drop.status === "live" ? "bg-green-500/10 text-green-400 border-green-500/20" : drop.status === "upcoming" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" : "bg-muted text-muted-foreground"}`}
                  >
                    {drop.status === "live"
                      ? "🔴 Live"
                      : drop.status === "upcoming"
                        ? "⏳ Upcoming"
                        : "✓ Sold Out"}
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground">Items</p>
                    <p className="font-black text-xs">{drop.items}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground">Price</p>
                    <p className="font-black text-xs">{drop.price}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground">Raised</p>
                    <p className="font-black text-xs text-green-400">
                      {drop.raised}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          <Button
            className="w-full h-10 text-xs bg-yellow-600 text-white border-0 font-bold"
            onClick={() => toast.success("Opening NFT drop creator...")}
          >
            + Create NFT Drop
          </Button>
        </div>
      )}

      {tab === "analytics" && (
        <div className="space-y-3">
          {[
            { label: "Revenue This Month", value: "$4,444", trend: "+124%" },
            { label: "New Subscribers", value: "+444", trend: "+88%" },
            { label: "Content Engagement Rate", value: "44.4%", trend: "+12%" },
            { label: "SKY4444 Tips Received", value: "44,444", trend: "+444%" },
            { label: "Average Revenue Per User", value: "$9.99", trend: "+8%" },
            { label: "Churn Rate", value: "2.4%", trend: "-1.2%" },
          ].map(metric => (
            <Card key={metric.label} className="border-border/50">
              <CardContent className="py-3 px-4 flex items-center justify-between">
                <div>
                  <p className="font-bold text-sm">{metric.label}</p>
                  <p className="text-xs text-muted-foreground">vs last month</p>
                </div>
                <div className="text-right">
                  <p className="font-black text-sm text-yellow-400">
                    {metric.value}
                  </p>
                  <p
                    className={`text-xs font-bold ${metric.trend.startsWith("+") ? "text-green-400" : "text-red-400"}`}
                  >
                    {metric.trend}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
