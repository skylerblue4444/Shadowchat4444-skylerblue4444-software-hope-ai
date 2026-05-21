import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Gavel,
  Clock,
  TrendingUp,
  Eye,
  Heart,
  Zap,
  Trophy,
  Star,
  ArrowUpRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const AUCTIONS = [
  {
    id: 1,
    name: "Shadow Genesis #001",
    collection: "Shadow Genesis",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop",
    currentBid: 4.44,
    reserve: 4.0,
    bids: 18,
    ends: 7200,
    watchers: 144,
    rarity: "Legendary",
    verified: true,
  },
  {
    id: 2,
    name: "SKY4444 Founder Pass",
    collection: "SKY4444 OGs",
    image:
      "https://images.unsplash.com/photo-1634193295627-1cdddf751ebf?w=400&h=400&fit=crop",
    currentBid: 12.5,
    reserve: 10.0,
    bids: 44,
    ends: 3600,
    watchers: 444,
    rarity: "Mythic",
    verified: true,
  },
  {
    id: 3,
    name: "ShadowBot #4444",
    collection: "ShadowBots",
    image:
      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&h=400&fit=crop",
    currentBid: 1.8,
    reserve: 1.5,
    bids: 7,
    ends: 14400,
    watchers: 88,
    rarity: "Rare",
    verified: false,
  },
  {
    id: 4,
    name: "Crypto Punk Shadow",
    collection: "Shadow Punks",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=400&fit=crop",
    currentBid: 8.88,
    reserve: 8.0,
    bids: 33,
    ends: 1800,
    watchers: 222,
    rarity: "Epic",
    verified: true,
  },
];

const RARITY_COLORS: Record<string, string> = {
  Common: "text-gray-400 bg-gray-500/10",
  Rare: "text-blue-400 bg-blue-500/10",
  Epic: "text-purple-400 bg-purple-500/10",
  Legendary: "text-yellow-400 bg-yellow-500/10",
  Mythic: "text-red-400 bg-red-500/10",
};

function Countdown({ seconds }: { seconds: number }) {
  const [remaining, setRemaining] = useState(seconds);
  useEffect(() => {
    const timer = setInterval(
      () => setRemaining(r => Math.max(0, r - 1)),
      1000
    );
    return () => clearInterval(timer);
  }, []);
  const h = Math.floor(remaining / 3600);
  const m = Math.floor((remaining % 3600) / 60);
  const s = remaining % 60;
  const urgent = remaining < 600;
  return (
    <span
      className={`font-mono font-black text-xs ${urgent ? "text-red-400 animate-pulse" : "text-orange-400"}`}
    >
      {h > 0 ? `${h}h ` : ""}
      {String(m).padStart(2, "0")}m {String(s).padStart(2, "0")}s
    </span>
  );
}

export default function ShadowNFTAuctions() {
  const [tab, setTab] = useState<"live" | "upcoming" | "ended" | "mybids">(
    "live"
  );
  const [bidAmounts, setBidAmounts] = useState<Record<number, string>>({});
  const [bids, setBids] = useState<Record<number, number>>({});
  const [watchlist, setWatchlist] = useState<Set<number>>(new Set());

  const placeBid = (auction: (typeof AUCTIONS)[0]) => {
    const amount = parseFloat(bidAmounts[auction.id] || "0");
    const minBid = (bids[auction.id] || auction.currentBid) + 0.1;
    if (amount < minBid) {
      toast.error(`Minimum bid: ${minBid.toFixed(2)} ETH`);
      return;
    }
    setBids(prev => ({ ...prev, [auction.id]: amount }));
    toast.success(`🎉 Bid placed: ${amount} ETH on ${auction.name}!`);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Gavel className="h-6 w-6 text-orange-400" />
            NFT Auctions
          </h1>
          <p className="text-sm text-muted-foreground">
            Live auction house — bid with ETH, SKY4444, or TRUMP
          </p>
        </div>
        <Badge className="bg-red-500/10 text-red-400 border-red-500/20 font-bold animate-pulse">
          🔴 LIVE
        </Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Live Auctions", value: "44", emoji: "🔴" },
          { label: "Total Volume", value: "888 ETH", emoji: "💎" },
          { label: "Highest Bid", value: "12.5 ETH", emoji: "🏆" },
          { label: "Active Bidders", value: "4,444", emoji: "👥" },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="pt-2 pb-2">
              <p className="text-base">{s.emoji}</p>
              <p className="font-black text-xs text-orange-400">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-2">
        {(["live", "upcoming", "ended", "mybids"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-orange-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t === "mybids" ? "My Bids" : t}
          </button>
        ))}
      </div>

      {tab === "live" && (
        <div className="space-y-4">
          {AUCTIONS.map((auction, i) => {
            const currentBid = bids[auction.id] || auction.currentBid;
            const rarityClass =
              RARITY_COLORS[auction.rarity] || "text-gray-400 bg-gray-500/10";
            return (
              <motion.div
                key={auction.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className="border-orange-500/20 overflow-hidden">
                  <div className="flex">
                    <div className="relative w-28 h-28 shrink-0">
                      <img
                        src={auction.image}
                        alt={auction.name}
                        className="w-full h-full object-cover"
                        onError={e => {
                          (e.target as HTMLImageElement).src =
                            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&h=200&fit=crop";
                        }}
                      />
                      <button
                        className="absolute top-1.5 right-1.5 h-6 w-6 rounded-full bg-background/80 flex items-center justify-center"
                        onClick={() =>
                          setWatchlist(prev => {
                            const n = new Set(prev);
                            n.has(auction.id)
                              ? n.delete(auction.id)
                              : n.add(auction.id);
                            return n;
                          })
                        }
                      >
                        <Heart
                          className={`h-3.5 w-3.5 ${watchlist.has(auction.id) ? "fill-red-500 text-red-500" : "text-white"}`}
                        />
                      </button>
                    </div>
                    <CardContent className="py-2.5 px-3 flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <p className="font-black text-sm leading-tight">
                            {auction.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {auction.collection} {auction.verified && "✓"}
                          </p>
                        </div>
                        <Badge className={`text-xs ${rarityClass}`}>
                          {auction.rarity}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 mb-2">
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Current Bid
                          </p>
                          <p className="font-black text-sm text-orange-400">
                            {currentBid.toFixed(2)} ETH
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Ends In
                          </p>
                          <Countdown seconds={auction.ends} />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Bids</p>
                          <p className="font-bold text-xs">
                            {auction.bids + (bids[auction.id] ? 1 : 0)}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-1.5">
                        <Input
                          value={bidAmounts[auction.id] || ""}
                          onChange={e =>
                            setBidAmounts(prev => ({
                              ...prev,
                              [auction.id]: e.target.value,
                            }))
                          }
                          placeholder={`Min ${(currentBid + 0.1).toFixed(2)}`}
                          className="h-8 text-xs flex-1"
                          type="number"
                          step="0.1"
                        />
                        <Button
                          size="sm"
                          className="h-8 text-xs bg-orange-600 text-white border-0 font-bold px-3 shrink-0"
                          onClick={() => placeBid(auction)}
                        >
                          <Gavel className="h-3.5 w-3.5 mr-1" />
                          Bid
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      {tab === "upcoming" && (
        <div className="space-y-3">
          {[
            {
              name: "Shadow Legends Genesis Drop",
              collection: "Shadow Legends",
              starts: "May 20, 2026 · 12:00 PM CDT",
              reserve: "5 ETH",
              supply: 44,
            },
            {
              name: "SKY4444 ICO Commemorative NFT",
              collection: "SKY4444 OGs",
              starts: "May 25, 2026 · 3:00 PM CDT",
              reserve: "0.444 ETH",
              supply: 4444,
            },
          ].map(drop => (
            <Card key={drop.name} className="border-border/50">
              <CardContent className="py-3 px-4 flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-xl shrink-0">
                  🎨
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm">{drop.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {drop.collection} · Starts: {drop.starts}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Reserve: {drop.reserve} · Supply: {drop.supply}
                  </p>
                </div>
                <Button
                  size="sm"
                  className="h-8 text-xs bg-orange-600 text-white border-0 font-bold shrink-0"
                  onClick={() => toast.success("✅ Added to calendar!")}
                >
                  Remind Me
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {(tab === "ended" || tab === "mybids") && (
        <Card className="border-border/50">
          <CardContent className="py-8 text-center">
            <Trophy className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
            <p className="font-bold text-sm">
              {tab === "mybids" ? "No active bids" : "No ended auctions"}
            </p>
            <p className="text-xs text-muted-foreground">
              Place bids on live auctions to see them here
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
