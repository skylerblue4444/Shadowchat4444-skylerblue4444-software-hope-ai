import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gavel,
  Clock,
  TrendingUp,
  Eye,
  Heart,
  Zap,
  Star,
  Award,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const AUCTIONS = [
  {
    id: 1,
    title: "ShadowPunk #4444",
    type: "NFT",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80",
    currentBid: "44,444 SKY4444",
    currentBidUSD: "$1,956",
    minBid: "45,000 SKY4444",
    endsIn: { h: 2, m: 44, s: 44 },
    bids: 44,
    watchers: 444,
    seller: "SkylerBlue.eth",
    featured: true,
    reserve: false,
  },
  {
    id: 2,
    title: "1-on-1 IT Consultation (4hrs)",
    type: "Service",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&q=80",
    currentBid: "8,888 SKY4444",
    currentBidUSD: "$391",
    minBid: "9,000 SKY4444",
    endsIn: { h: 8, m: 22, s: 11 },
    bids: 12,
    watchers: 88,
    seller: "SkylerBlueIT.eth",
    featured: false,
    reserve: true,
  },
  {
    id: 3,
    title: "ShadowChat Genesis Badge",
    type: "NFT",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&q=80",
    currentBid: "22,222 SKY4444",
    currentBidUSD: "$978",
    minBid: "23,000 SKY4444",
    endsIn: { h: 23, m: 59, s: 59 },
    bids: 22,
    watchers: 222,
    seller: "ShadowDAO.eth",
    featured: false,
    reserve: false,
  },
  {
    id: 4,
    title: "SKY4444 Founding Investor NFT",
    type: "NFT",
    image:
      "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=400&q=80",
    currentBid: "100,000 SKY4444",
    currentBidUSD: "$4,400",
    minBid: "105,000 SKY4444",
    endsIn: { h: 47, m: 30, s: 0 },
    bids: 8,
    watchers: 1000,
    seller: "ICO.eth",
    featured: true,
    reserve: true,
  },
];

type Auction = (typeof AUCTIONS)[0];

export default function ShadowAuctions() {
  const [selected, setSelected] = useState<Auction | null>(null);
  const [bidAmount, setBidAmount] = useState("");
  const [tab, setTab] = useState<"live" | "ending" | "won" | "selling">("live");
  const [timers, setTimers] = useState(AUCTIONS.map(a => ({ ...a.endsIn })));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(prev =>
        prev.map(t => {
          if (t.s > 0) return { ...t, s: t.s - 1 };
          if (t.m > 0) return { ...t, m: t.m - 1, s: 59 };
          if (t.h > 0) return { ...t, h: t.h - 1, m: 59, s: 59 };
          return t;
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (t: { h: number; m: number; s: number }) =>
    `${String(t.h).padStart(2, "0")}:${String(t.m).padStart(2, "0")}:${String(t.s).padStart(2, "0")}`;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Gavel className="h-6 w-6 text-amber-400" />
            ShadowAuctions
          </h1>
          <p className="text-sm text-muted-foreground">
            Live auctions for NFTs, services, and exclusive digital assets
          </p>
        </div>
        <Button
          size="sm"
          className="h-8 text-xs bg-amber-600 text-white border-0 font-bold"
          onClick={() => toast.success("Opening auction creator...")}
        >
          <Gavel className="h-3.5 w-3.5 mr-1" />
          List Item
        </Button>
      </div>

      <div className="flex gap-2">
        {(["live", "ending", "won", "selling"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-amber-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "live" && !selected && (
        <div className="space-y-3">
          {AUCTIONS.map((auction, i) => (
            <motion.div
              key={auction.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Card
                className="border-border/50 hover:border-amber-500/20 transition-all cursor-pointer overflow-hidden"
                onClick={() => setSelected(auction)}
              >
                <div className="flex">
                  <img
                    src={auction.image}
                    alt={auction.title}
                    className="h-24 w-24 object-cover shrink-0"
                  />
                  <CardContent className="py-2.5 px-3 flex-1 space-y-1">
                    <div className="flex items-start justify-between gap-1">
                      <div>
                        <p className="font-bold text-sm leading-snug">
                          {auction.title}
                        </p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <Badge className="text-xs bg-muted text-muted-foreground">
                            {auction.type}
                          </Badge>
                          {auction.featured && (
                            <Badge className="text-xs bg-amber-500/10 text-amber-400 border-amber-500/20">
                              ⭐ Featured
                            </Badge>
                          )}
                          {auction.reserve && (
                            <Badge className="text-xs bg-blue-500/10 text-blue-400 border-blue-500/20">
                              Reserve
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Current Bid
                        </p>
                        <p className="font-black text-sm text-amber-400">
                          {auction.currentBid}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {auction.currentBidUSD}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Ends In</p>
                        <p className="font-black text-sm text-red-400">
                          {formatTime(timers[i])}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {auction.bids} bids · {auction.watchers} watching
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "live" && selected && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs font-bold"
            onClick={() => setSelected(null)}
          >
            ← Back to Auctions
          </Button>
          <Card className="border-amber-500/20 overflow-hidden">
            <img
              src={selected.image}
              alt={selected.title}
              className="w-full h-48 object-cover"
            />
            <CardContent className="py-4 px-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-black text-lg">{selected.title}</p>
                  <p className="text-xs text-muted-foreground">
                    by {selected.seller}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => toast.success("Added to watchlist!")}
                >
                  <Heart className="h-4 w-4 text-red-400" />
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-muted/50 rounded-lg p-2">
                  <p className="text-muted-foreground">Current Bid</p>
                  <p className="font-black text-amber-400">
                    {selected.currentBid}
                  </p>
                </div>
                <div className="bg-muted/50 rounded-lg p-2">
                  <p className="text-muted-foreground">Bids</p>
                  <p className="font-black">{selected.bids}</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-2">
                  <p className="text-muted-foreground">Watching</p>
                  <p className="font-black">{selected.watchers}</p>
                </div>
              </div>
              <div className="bg-red-900/10 border border-red-500/20 rounded-xl p-3 text-center">
                <p className="text-xs text-muted-foreground">Auction Ends In</p>
                <p className="font-black text-2xl text-red-400">
                  {formatTime(
                    timers[AUCTIONS.findIndex(a => a.id === selected.id)]
                  )}
                </p>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={bidAmount}
                  onChange={e => setBidAmount(e.target.value)}
                  placeholder={`Min: ${selected.minBid}`}
                  className="flex-1 h-10 px-3 rounded-xl bg-muted text-sm border border-border/50 focus:outline-none focus:border-amber-500/40"
                />
                <Button
                  className="h-10 px-4 text-sm bg-amber-600 text-white border-0 font-bold"
                  onClick={() => {
                    toast.success(
                      `Bid of ${bidAmount || selected.minBid} placed!`
                    );
                    setSelected(null);
                  }}
                >
                  <Gavel className="h-4 w-4 mr-2" />
                  Bid
                </Button>
              </div>
              <Button
                className="w-full h-10 text-sm bg-green-600 text-white border-0 font-bold"
                onClick={() =>
                  toast.success(
                    `Buy Now! ${selected.title} purchased for ${selected.currentBid}`
                  )
                }
              >
                <Zap className="h-4 w-4 mr-2" />
                Buy Now
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {tab === "ending" && (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">
            Auctions ending in the next 3 hours
          </p>
          {AUCTIONS.filter((_, i) => timers[i].h < 3).map((a, i) => (
            <Card key={a.id} className="border-red-500/20 bg-red-900/5">
              <CardContent className="py-2.5 px-4 flex items-center gap-3">
                <img
                  src={a.image}
                  alt={a.title}
                  className="h-10 w-10 rounded-lg object-cover shrink-0"
                />
                <div className="flex-1">
                  <p className="font-bold text-sm">{a.title}</p>
                  <p className="text-xs text-amber-400 font-bold">
                    {a.currentBid}
                  </p>
                </div>
                <p className="font-black text-sm text-red-400">
                  {formatTime(timers[AUCTIONS.findIndex(x => x.id === a.id)])}
                </p>
              </CardContent>
            </Card>
          ))}
          {AUCTIONS.filter((_, i) => timers[i].h >= 3).length ===
            AUCTIONS.length && (
            <p className="text-center text-sm text-muted-foreground py-4">
              No auctions ending soon
            </p>
          )}
        </div>
      )}

      {tab === "won" && (
        <Card className="border-border/50">
          <CardContent className="py-8 px-4 text-center">
            <Award className="h-12 w-12 text-amber-400 mx-auto mb-3" />
            <p className="font-bold text-base">No Won Auctions Yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Place bids on live auctions to win exclusive NFTs and services!
            </p>
            <Button
              className="mt-4 h-9 text-xs bg-amber-600 text-white border-0 font-bold"
              onClick={() => setTab("live")}
            >
              Browse Auctions
            </Button>
          </CardContent>
        </Card>
      )}

      {tab === "selling" && (
        <Card className="border-amber-500/20 bg-amber-900/5">
          <CardContent className="py-4 px-4 space-y-3">
            <p className="font-black text-base">List Item for Auction</p>
            {[
              { label: "Item Title", placeholder: "ShadowPunk #8888" },
              {
                label: "Type",
                placeholder: "NFT / Service / Physical / Digital",
              },
              { label: "Starting Bid (SKY4444)", placeholder: "1,000" },
              { label: "Reserve Price (optional)", placeholder: "10,000" },
              { label: "Duration", placeholder: "24h / 48h / 7 days" },
            ].map(f => (
              <div key={f.label}>
                <p className="text-xs font-bold mb-1">{f.label}</p>
                <input
                  className="w-full h-9 px-3 rounded-xl bg-muted text-sm border border-border/50 focus:outline-none focus:border-amber-500/40"
                  placeholder={f.placeholder}
                />
              </div>
            ))}
            <Button
              className="w-full h-10 text-sm bg-amber-600 text-white border-0 font-bold"
              onClick={() =>
                toast.success("Auction listed! Goes live after review.")
              }
            >
              <Gavel className="h-4 w-4 mr-2" />
              List Auction
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
