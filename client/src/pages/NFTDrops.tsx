import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Zap,
  Clock,
  Star,
  Users,
  DollarSign,
  CheckCircle,
  Lock,
  Unlock,
  ChevronRight,
  Flame,
  Trophy,
  Globe,
  Calendar,
  Bell,
  Heart,
  Share2,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const DROPS = [
  {
    id: "d1",
    name: "ShadowChat Genesis Pass",
    artist: "SkyBlue Studios",
    image: "🌌",
    gradient: "from-purple-900 to-blue-900",
    status: "live",
    price: 0.5,
    currency: "ETH",
    priceUSD: 1699,
    supply: 4444,
    minted: 3284,
    maxPerWallet: 5,
    whitelisted: true,
    description:
      "The original ShadowChat Genesis Pass — unlocks lifetime premium features, DAO voting power, and exclusive rewards.",
    traits: [
      "Lifetime Premium",
      "DAO Voting",
      "10% Revenue Share",
      "Exclusive Channels",
    ],
    countdown: null,
  },
  {
    id: "d2",
    name: "TRUMP Meme Collection",
    artist: "CryptoArtist_88",
    image: "🇺🇸",
    gradient: "from-red-900 to-blue-900",
    status: "upcoming",
    price: 100,
    currency: "TRUMP",
    priceUSD: 2.34,
    supply: 10000,
    minted: 0,
    maxPerWallet: 10,
    whitelisted: false,
    description:
      "1,000 unique TRUMP-themed meme NFTs. Each one is a piece of crypto history.",
    traits: ["Meme Rarity", "Political Satire", "Community Access"],
    countdown: { hours: 2, minutes: 34, seconds: 18 },
  },
  {
    id: "d3",
    name: "SKY4444 Founders Badge",
    artist: "Skyler Blue",
    image: "⚡",
    gradient: "from-cyan-900 to-blue-900",
    status: "upcoming",
    price: 4444,
    currency: "SKY4444",
    priceUSD: 111.1,
    supply: 444,
    minted: 0,
    maxPerWallet: 1,
    whitelisted: true,
    description:
      "Only 444 ever minted. Founders Badge holders receive 1% of all SKY4444 trading fees forever.",
    traits: [
      "1% Trading Fee Share",
      "Founders Council",
      "Exclusive Discord",
      "Physical Merch",
    ],
    countdown: { hours: 23, minutes: 12, seconds: 44 },
  },
  {
    id: "d4",
    name: "ShadowChat AI Portraits",
    artist: "AI_Genesis_Lab",
    image: "🤖",
    gradient: "from-green-900 to-emerald-900",
    status: "ended",
    price: 0.08,
    currency: "ETH",
    priceUSD: 271.84,
    supply: 8888,
    minted: 8888,
    maxPerWallet: 3,
    whitelisted: false,
    description:
      "AI-generated portraits of ShadowChat community members. All 8,888 sold out in 4 minutes.",
    traits: ["AI Generated", "Community Portrait", "Metaverse Ready"],
    countdown: null,
  },
];

function Countdown({
  hours,
  minutes,
  seconds,
}: {
  hours: number;
  minutes: number;
  seconds: number;
}) {
  const [time, setTime] = useState({ hours, minutes, seconds });
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0)
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0)
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        clearInterval(interval);
        return prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex gap-2">
      {[
        { label: "HRS", value: time.hours },
        { label: "MIN", value: time.minutes },
        { label: "SEC", value: time.seconds },
      ].map(({ label, value }) => (
        <div key={label} className="text-center">
          <div className="h-10 w-12 rounded-xl bg-black/40 flex items-center justify-center">
            <span className="text-lg font-black">
              {String(value).padStart(2, "0")}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
        </div>
      ))}
    </div>
  );
}

const STATUS_COLORS: Record<string, string> = {
  live: "bg-green-500/10 text-green-400 border-green-500/20",
  upcoming: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  ended: "bg-gray-500/10 text-gray-400 border-gray-500/20",
};

export default function NFTDrops() {
  const [tab, setTab] = useState<"all" | "live" | "upcoming" | "ended">("all");
  const [mintQty, setMintQty] = useState<Record<string, number>>({
    d1: 1,
    d2: 1,
    d3: 1,
  });

  const filtered = tab === "all" ? DROPS : DROPS.filter(d => d.status === tab);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2">
          <Zap className="h-6 w-6 text-yellow-400" />
          NFT Drops
        </h1>
        <p className="text-sm text-muted-foreground">
          Exclusive NFT launches — whitelist, mint, and collect
        </p>
      </div>

      {/* Featured Drop */}
      <div
        className={`p-5 rounded-2xl bg-gradient-to-br ${DROPS[0].gradient} border border-purple-500/20 relative overflow-hidden`}
      >
        <div className="absolute top-3 right-3">
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 animate-pulse">
            ● LIVE NOW
          </Badge>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-7xl">{DROPS[0].image}</span>
          <div className="flex-1">
            <p className="text-white font-black text-xl">{DROPS[0].name}</p>
            <p className="text-white/60 text-sm">by {DROPS[0].artist}</p>
            <div className="flex items-center gap-3 mt-2">
              <p className="text-white font-black">
                {DROPS[0].price} {DROPS[0].currency}
              </p>
              <p className="text-white/60 text-sm">
                (~${DROPS[0].priceUSD.toLocaleString()})
              </p>
            </div>
            <div className="mt-2">
              <div className="flex justify-between text-xs text-white/60 mb-1">
                <span>
                  {DROPS[0].minted.toLocaleString()} /{" "}
                  {DROPS[0].supply.toLocaleString()} minted
                </span>
                <span>
                  {((DROPS[0].minted / DROPS[0].supply) * 100).toFixed(1)}%
                </span>
              </div>
              <Progress
                value={(DROPS[0].minted / DROPS[0].supply) * 100}
                className="h-2"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-4">
          <div className="flex items-center gap-1">
            <button
              className="h-8 w-8 rounded-xl bg-white/10 flex items-center justify-center text-white font-bold"
              onClick={() =>
                setMintQty(p => ({ ...p, d1: Math.max(1, p.d1 - 1) }))
              }
            >
              −
            </button>
            <span className="h-8 w-12 flex items-center justify-center text-white font-black">
              {mintQty.d1}
            </span>
            <button
              className="h-8 w-8 rounded-xl bg-white/10 flex items-center justify-center text-white font-bold"
              onClick={() =>
                setMintQty(p => ({ ...p, d1: Math.min(5, p.d1 + 1) }))
              }
            >
              +
            </button>
          </div>
          <Button
            className="flex-1 bg-white text-purple-900 border-0 font-black"
            onClick={() =>
              toast.success(`Minting ${mintQty.d1} Genesis Pass NFT(s)!`)
            }
          >
            Mint Now — {(DROPS[0].price * mintQty.d1).toFixed(2)} ETH
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["all", "live", "upcoming", "ended"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${tab === t ? "bg-yellow-500 text-black" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Drop Cards */}
      <div className="space-y-4">
        {filtered.map((drop, i) => (
          <motion.div
            key={drop.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="border-border/50 overflow-hidden">
              <div
                className={`h-32 bg-gradient-to-br ${drop.gradient} flex items-center justify-center relative`}
              >
                <span className="text-7xl">{drop.image}</span>
                <div className="absolute top-3 left-3">
                  <Badge className={`capitalize ${STATUS_COLORS[drop.status]}`}>
                    {drop.status === "live" ? "● " : ""}
                    {drop.status}
                  </Badge>
                </div>
                {drop.whitelisted && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Whitelisted
                    </Badge>
                  </div>
                )}
              </div>
              <CardContent className="py-4 px-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-black">{drop.name}</p>
                    <p className="text-xs text-muted-foreground">
                      by {drop.artist}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-black">
                      {drop.price} {drop.currency}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ~${drop.priceUSD.toLocaleString()}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  {drop.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {drop.traits.map(trait => (
                    <span
                      key={trait}
                      className="text-xs px-2 py-0.5 rounded-full bg-muted/40 text-muted-foreground"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
                {drop.status !== "ended" && (
                  <div className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">
                        {drop.minted.toLocaleString()} /{" "}
                        {drop.supply.toLocaleString()} minted
                      </span>
                      <span className="font-bold">
                        {((drop.minted / drop.supply) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <Progress
                      value={(drop.minted / drop.supply) * 100}
                      className="h-1.5"
                    />
                  </div>
                )}
                {drop.countdown && (
                  <div className="mb-3">
                    <p className="text-xs text-muted-foreground mb-2">
                      Drops in:
                    </p>
                    <Countdown {...drop.countdown} />
                  </div>
                )}
                <div className="flex gap-2">
                  {drop.status === "live" && (
                    <Button
                      className="flex-1 bg-yellow-500 text-black border-0 font-bold text-sm"
                      onClick={() => toast.success(`Minting ${drop.name}!`)}
                    >
                      <Zap className="h-4 w-4 mr-2" />
                      Mint Now
                    </Button>
                  )}
                  {drop.status === "upcoming" && !drop.whitelisted && (
                    <Button
                      className="flex-1 bg-blue-600 text-white border-0 font-bold text-sm"
                      onClick={() => toast.success("Added to whitelist!")}
                    >
                      <Bell className="h-4 w-4 mr-2" />
                      Join Whitelist
                    </Button>
                  )}
                  {drop.status === "upcoming" && drop.whitelisted && (
                    <Button
                      className="flex-1 bg-green-600 text-white border-0 font-bold text-sm"
                      disabled
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Whitelisted ✓
                    </Button>
                  )}
                  {drop.status === "ended" && (
                    <Button
                      className="flex-1 bg-muted text-muted-foreground border-0 text-sm"
                      onClick={() => toast.info("View on secondary market")}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Secondary Market
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 w-9 p-0"
                    onClick={() => toast.success("Added to watchlist!")}
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 w-9 p-0"
                    onClick={() => toast.success("Link copied!")}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
