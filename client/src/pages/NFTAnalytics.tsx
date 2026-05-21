import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart2,
  TrendingUp,
  TrendingDown,
  Star,
  Zap,
  Eye,
  Heart,
  DollarSign,
  Activity,
  Globe,
  Clock,
  ChevronUp,
  ChevronDown,
  Filter,
  Search,
  RefreshCw,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const TOP_COLLECTIONS = [
  {
    rank: 1,
    name: "ShadowChain Genesis",
    emoji: "⚡",
    floor: 4.44,
    change: +28.4,
    volume: 284000,
    items: 4444,
    owners: 2840,
    listed: 8.4,
  },
  {
    rank: 2,
    name: "TRUMP Meme Lords",
    emoji: "🇺🇸",
    floor: 2.84,
    change: +84.2,
    volume: 1240000,
    items: 10000,
    owners: 7200,
    listed: 12.8,
  },
  {
    rank: 3,
    name: "Diamond Hands Club",
    emoji: "💎",
    floor: 8.44,
    change: -4.2,
    volume: 480000,
    items: 888,
    owners: 720,
    listed: 5.2,
  },
  {
    rank: 4,
    name: "Moon Mission Apes",
    emoji: "🌕",
    floor: 1.24,
    change: +12.4,
    volume: 124000,
    items: 5000,
    owners: 3200,
    listed: 18.4,
  },
  {
    rank: 5,
    name: "SKY4444 Founders",
    emoji: "🚀",
    floor: 44.44,
    change: +124.4,
    volume: 4440000,
    items: 444,
    owners: 380,
    listed: 2.4,
  },
];

const MY_NFTS = [
  {
    id: "n1",
    name: "Genesis #0042",
    collection: "ShadowChain Genesis",
    emoji: "⚡",
    rarity: "Legendary",
    rarityRank: 12,
    floorValue: 4.44,
    lastSale: 3.8,
    pnl: +16.8,
  },
  {
    id: "n2",
    name: "TRUMP Lord #1776",
    collection: "TRUMP Meme Lords",
    emoji: "🇺🇸",
    rarity: "Rare",
    rarityRank: 284,
    floorValue: 2.84,
    lastSale: 1.2,
    pnl: +136.7,
  },
  {
    id: "n3",
    name: "Diamond #0007",
    collection: "Diamond Hands Club",
    emoji: "💎",
    rarity: "Epic",
    rarityRank: 48,
    floorValue: 8.44,
    lastSale: 9.2,
    pnl: -8.3,
  },
  {
    id: "n4",
    name: "SKY Founder #0004",
    collection: "SKY4444 Founders",
    emoji: "🚀",
    rarity: "Mythic",
    rarityRank: 4,
    floorValue: 44.44,
    lastSale: 12.0,
    pnl: +270.3,
  },
];

const RARITY_COLORS: Record<string, string> = {
  Common: "bg-gray-500/10 text-gray-400 border-gray-500/20",
  Uncommon: "bg-green-500/10 text-green-400 border-green-500/20",
  Rare: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Epic: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Legendary: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Mythic: "bg-red-500/10 text-red-400 border-red-500/20",
};

const MARKET_EVENTS = [
  {
    type: "sale",
    collection: "SKY4444 Founders",
    item: "#0001",
    price: 120.0,
    time: "2m ago",
    emoji: "🚀",
  },
  {
    type: "listing",
    collection: "ShadowChain Genesis",
    item: "#0088",
    price: 5.2,
    time: "8m ago",
    emoji: "⚡",
  },
  {
    type: "sale",
    collection: "TRUMP Meme Lords",
    item: "#1984",
    price: 3.4,
    time: "12m ago",
    emoji: "🇺🇸",
  },
  {
    type: "offer",
    collection: "Diamond Hands Club",
    item: "#0007",
    price: 7.8,
    time: "18m ago",
    emoji: "💎",
  },
  {
    type: "sale",
    collection: "Moon Mission Apes",
    item: "#2048",
    price: 1.8,
    time: "24m ago",
    emoji: "🌕",
  },
];

export default function NFTAnalytics() {
  const [tab, setTab] = useState<
    "market" | "portfolio" | "rarity" | "activity"
  >("market");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"volume" | "floor" | "change">("volume");

  const totalPortfolioValue = MY_NFTS.reduce((s, n) => s + n.floorValue, 0);
  const totalPnl = MY_NFTS.reduce((s, n) => s + (n.floorValue - n.lastSale), 0);

  const sortedCollections = [...TOP_COLLECTIONS].sort((a, b) => {
    if (sortBy === "volume") return b.volume - a.volume;
    if (sortBy === "floor") return b.floor - a.floor;
    return b.change - a.change;
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2">
          <BarChart2 className="h-6 w-6 text-purple-400" />
          NFT Analytics
        </h1>
        <p className="text-sm text-muted-foreground">
          Market intelligence, rarity tools, and portfolio tracking
        </p>
      </div>

      {/* Market Stats */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "24h Volume", value: "$6.57M", change: "+28.4%", up: true },
          { label: "Total Sales", value: "12,840", change: "+12.2%", up: true },
          {
            label: "Active Wallets",
            value: "28,400",
            change: "+8.4%",
            up: true,
          },
          {
            label: "Avg Sale Price",
            value: "$512",
            change: "-4.2%",
            up: false,
          },
        ].map(({ label, value, change, up }) => (
          <Card key={label} className="border-border/50">
            <CardContent className="pt-2 pb-2 text-center">
              <p className="font-black text-sm">{value}</p>
              <p
                className={`text-xs font-bold ${up ? "text-green-400" : "text-red-400"}`}
              >
                {change}
              </p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["market", "portfolio", "rarity", "activity"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${tab === t ? "bg-purple-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "market" && (
        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search collections..."
                className="pl-9"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-1">
              {(["volume", "floor", "change"] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setSortBy(s)}
                  className={`px-3 py-2 rounded-xl text-xs font-medium capitalize border transition-all ${sortBy === s ? "border-purple-500 bg-purple-500/10 text-purple-400" : "border-border/30 text-muted-foreground"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            {sortedCollections
              .filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
              .map((col, i) => (
                <motion.div
                  key={col.name}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="border-border/50">
                    <CardContent className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <span className="text-muted-foreground text-sm w-4 shrink-0">
                          #{col.rank}
                        </span>
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center text-2xl shrink-0">
                          {col.emoji}
                        </div>
                        <div className="flex-1">
                          <p className="font-black text-sm">{col.name}</p>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span>{col.items.toLocaleString()} items</span>
                            <span>{col.owners.toLocaleString()} owners</span>
                            <span>{col.listed}% listed</span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="font-black text-sm">{col.floor} ETH</p>
                          <p
                            className={`text-xs font-bold ${col.change >= 0 ? "text-green-400" : "text-red-400"}`}
                          >
                            {col.change >= 0 ? (
                              <ChevronUp className="h-3 w-3 inline" />
                            ) : (
                              <ChevronDown className="h-3 w-3 inline" />
                            )}
                            {Math.abs(col.change)}%
                          </p>
                          <p className="text-xs text-muted-foreground">
                            ${(col.volume / 1000).toFixed(0)}K vol
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </div>
        </div>
      )}

      {tab === "portfolio" && (
        <div className="space-y-3">
          {/* Portfolio Summary */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/20">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="font-black text-xl">{MY_NFTS.length}</p>
                <p className="text-xs text-muted-foreground">NFTs Owned</p>
              </div>
              <div>
                <p className="font-black text-xl">
                  {totalPortfolioValue.toFixed(2)} ETH
                </p>
                <p className="text-xs text-muted-foreground">Portfolio Value</p>
              </div>
              <div>
                <p
                  className={`font-black text-xl ${totalPnl >= 0 ? "text-green-400" : "text-red-400"}`}
                >
                  {totalPnl >= 0 ? "+" : ""}
                  {totalPnl.toFixed(2)} ETH
                </p>
                <p className="text-xs text-muted-foreground">Total P&L</p>
              </div>
            </div>
          </div>

          {MY_NFTS.map((nft, i) => (
            <Card key={nft.id} className="border-border/50">
              <CardContent className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center text-2xl shrink-0">
                    {nft.emoji}
                  </div>
                  <div className="flex-1">
                    <p className="font-black text-sm">{nft.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {nft.collection}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={`text-xs ${RARITY_COLORS[nft.rarity]}`}>
                        {nft.rarity}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        Rank #{nft.rarityRank}
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-black text-sm">{nft.floorValue} ETH</p>
                    <p
                      className={`text-xs font-bold ${nft.pnl >= 0 ? "text-green-400" : "text-red-400"}`}
                    >
                      {nft.pnl >= 0 ? "+" : ""}
                      {nft.pnl}%
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Bought: {nft.lastSale} ETH
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "rarity" && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Check rarity scores and trait analysis for any NFT
          </p>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Enter NFT contract address or name..."
              className="pl-9"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(RARITY_COLORS).map(([rarity, color]) => (
              <div
                key={rarity}
                className="p-3 rounded-xl bg-muted/20 border border-border/30"
              >
                <div className="flex items-center justify-between mb-1">
                  <Badge className={`text-xs ${color}`}>{rarity}</Badge>
                  <span className="text-xs text-muted-foreground">
                    {rarity === "Common"
                      ? "50%"
                      : rarity === "Uncommon"
                        ? "25%"
                        : rarity === "Rare"
                          ? "15%"
                          : rarity === "Epic"
                            ? "7%"
                            : rarity === "Legendary"
                              ? "2.5%"
                              : "0.5%"}
                  </span>
                </div>
                <Progress
                  value={
                    rarity === "Common"
                      ? 50
                      : rarity === "Uncommon"
                        ? 25
                        : rarity === "Rare"
                          ? 15
                          : rarity === "Epic"
                            ? 7
                            : rarity === "Legendary"
                              ? 2.5
                              : 0.5
                  }
                  className="h-1"
                />
              </div>
            ))}
          </div>
          <Button
            className="w-full bg-purple-600 text-white border-0 font-bold"
            onClick={() =>
              toast.info("Enter a collection to analyze rarity...")
            }
          >
            <Star className="h-4 w-4 mr-2" />
            Analyze Collection Rarity
          </Button>
        </div>
      )}

      {tab === "activity" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold">Live Market Activity</p>
            <button
              className="text-muted-foreground"
              onClick={() => toast.info("Refreshing...")}
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
          {MARKET_EVENTS.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="border-border/50">
                <CardContent className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{event.emoji}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Badge
                          className={`text-xs ${event.type === "sale" ? "bg-green-500/10 text-green-400 border-green-500/20" : event.type === "listing" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"}`}
                        >
                          {event.type.toUpperCase()}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {event.time}
                        </span>
                      </div>
                      <p className="text-xs font-bold mt-0.5">
                        {event.collection} {event.item}
                      </p>
                    </div>
                    <p className="font-black text-sm shrink-0">
                      {event.price} ETH
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
