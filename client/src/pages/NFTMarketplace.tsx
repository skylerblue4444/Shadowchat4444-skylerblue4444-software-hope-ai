import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Heart, Eye, TrendingUp, Zap, Award, Crown,
  Filter, Search, Grid3X3, List, Share2, Clock, Users,
  ArrowRight, CheckCircle, Star, Shield, Flame, Plus, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const NFT_LISTINGS = [
  {
    id: "nft1", title: "Impact Story #001 — Clean Water Initiative",
    artist: "SkylerBlue_Official", artistBadge: "⭐",
    priceTrump: 500, priceUSD: 241, rarity: "Legendary",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=400&fit=crop",
    likes: 1243, views: 8432, edition: "1/1", charity: "Clean Water Fund",
    traits: [{ name: "Impact", value: "High" }, { name: "Cause", value: "Water" }, { name: "Agent", value: "Manus" }],
    endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: "nft2", title: "TRUMP Diamond Hands #2024",
    artist: "CryptoWhale_88", artistBadge: "🐋",
    priceTrump: 1000, priceUSD: 482, rarity: "Epic",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=400&fit=crop",
    likes: 892, views: 5621, edition: "5/10", charity: "MAGA Foundation",
    traits: [{ name: "Rarity", value: "Diamond" }, { name: "Coin", value: "TRUMP" }, { name: "Hold", value: "365 days" }],
    endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: "nft3", title: "SKY4444 Genesis Token",
    artist: "SkylerBlue_Official", artistBadge: "⭐",
    priceTrump: 2500, priceUSD: 1205, rarity: "Mythic",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    likes: 3241, views: 18432, edition: "1/1", charity: "Tech Education",
    traits: [{ name: "Type", value: "Genesis" }, { name: "Platform", value: "SkyPlatform" }, { name: "Utility", value: "Governance" }],
    endTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: "nft4", title: "DeFi Wizard Portrait",
    artist: "NFT_Artist_Pro", artistBadge: "🎨",
    priceTrump: 250, priceUSD: 120, rarity: "Rare",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop",
    likes: 421, views: 3210, edition: "3/20", charity: "DeFi Education",
    traits: [{ name: "Style", value: "Digital Art" }, { name: "Series", value: "Wizards" }, { name: "Number", value: "#007" }],
    endTime: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
  },
  {
    id: "nft5", title: "Charity Gaming Champion #1",
    artist: "GameFi_Master", artistBadge: "🎮",
    priceTrump: 750, priceUSD: 361, rarity: "Epic",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=400&fit=crop",
    likes: 654, views: 4321, edition: "1/5", charity: "Children's Hospital",
    traits: [{ name: "Game", value: "Charity Slots" }, { name: "Score", value: "99,999" }, { name: "Cause", value: "Medical" }],
    endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: "nft6", title: "Arkansas IT Resolutions Badge",
    artist: "SkylerBlue_Official", artistBadge: "⭐",
    priceTrump: 100, priceUSD: 48, rarity: "Common",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop",
    likes: 234, views: 1892, edition: "50/100", charity: "Local Tech Education",
    traits: [{ name: "Type", value: "Membership" }, { name: "Tier", value: "IT Pro" }, { name: "Discount", value: "20%" }],
    endTime: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  },
];

const RARITY_COLORS: Record<string, string> = {
  Mythic: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Legendary: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Epic: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  Rare: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Common: "bg-gray-500/10 text-gray-400 border-gray-500/20",
};

function NFTCard({ nft, onBuy }: { nft: typeof NFT_LISTINGS[0]; onBuy: (id: string) => void }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(nft.likes);
  const timeLeft = Math.max(0, nft.endTime.getTime() - Date.now());
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Card className="border-border/50 hover:border-purple-500/30 transition-all overflow-hidden group">
        <div className="relative overflow-hidden">
          <img src={nft.image} alt={nft.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute top-2 left-2">
            <Badge className={`text-xs ${RARITY_COLORS[nft.rarity]}`}>{nft.rarity}</Badge>
          </div>
          <div className="absolute top-2 right-2 flex gap-1">
            <button onClick={() => { setLiked(l => !l); setLikes(c => liked ? c - 1 : c + 1); }} className="h-7 w-7 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Heart className={`h-3.5 w-3.5 ${liked ? "fill-red-400 text-red-400" : "text-white"}`} />
            </button>
            <button className="h-7 w-7 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm" onClick={() => toast.success("Link copied!")}>
              <Share2 className="h-3.5 w-3.5 text-white" />
            </button>
          </div>
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
            <div className="flex items-center gap-1 text-white text-xs">
              <Eye className="h-3 w-3" />{nft.views.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 text-white text-xs">
              <Clock className="h-3 w-3" />{days > 0 ? `${days}d ${hours}h` : `${hours}h`}
            </div>
          </div>
        </div>

        <CardContent className="pt-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="h-5 w-5 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">{nft.artist[0]}</div>
            <span className="text-xs text-muted-foreground">{nft.artist} {nft.artistBadge}</span>
            <span className="text-xs text-muted-foreground ml-auto">{nft.edition}</span>
          </div>
          <h3 className="font-bold text-sm mb-1 line-clamp-1">{nft.title}</h3>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
            <Heart className="h-3 w-3 text-red-400" />
            <span className="text-red-400">{likes.toLocaleString()}</span>
            <span className="mx-1">·</span>
            <Shield className="h-3 w-3 text-green-400" />
            <span className="text-green-400">{nft.charity}</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Current Price</p>
              <div className="flex items-baseline gap-1">
                <span className="font-black text-lg text-yellow-400">{nft.priceTrump}</span>
                <span className="text-xs text-muted-foreground">TRUMP</span>
              </div>
              <p className="text-xs text-muted-foreground">${nft.priceUSD}</p>
            </div>
            <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 h-8 text-xs" onClick={() => onBuy(nft.id)}>
              Buy Now <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function NFTMarketplace() {
  const [search, setSearch] = useState("");
  const [rarityFilter, setRarityFilter] = useState("All");

  // Correct tRPC hook pattern
  const { data: serverListings } = trpc.nftMarketplace.listListings.useQuery();
  const buyMutation = trpc.nftMarketplace.buy.useMutation({
    onSuccess: (data) => toast.success(`NFT purchased! TX: ${data.tx.slice(0, 10)}...`),
    onError: () => toast.error("Purchase failed. Please try again."),
  });

  const handleBuy = (id: string) => {
    buyMutation.mutate({ listingId: id });
  };

  const filtered = NFT_LISTINGS.filter(n => {
    const matchSearch = n.title.toLowerCase().includes(search.toLowerCase()) || n.artist.toLowerCase().includes(search.toLowerCase());
    const matchRarity = rarityFilter === "All" || n.rarity === rarityFilter;
    return matchSearch && matchRarity;
  });

  const STATS = [
    { label: "Total Volume", value: "2.4M TRUMP", icon: TrendingUp, color: "text-green-400" },
    { label: "NFTs Minted", value: "8,432", icon: Sparkles, color: "text-purple-400" },
    { label: "Charity Raised", value: "$124K", icon: Heart, color: "text-red-400" },
    { label: "Active Listings", value: "342", icon: Grid3X3, color: "text-blue-400" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-purple-400" />Impact Story NFT Marketplace
        </h1>
        <p className="text-sm text-muted-foreground">Mint, buy, and sell NFTs that fund real-world charitable causes</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {STATS.map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="border-border/50">
            <CardContent className="pt-4 pb-3">
              <div className="flex items-center gap-2 mb-1">
                <Icon className={`h-4 w-4 ${color}`} />
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
              <p className="text-base font-black">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search + Filter */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search NFTs, artists..." className="pl-9 h-10" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-2 flex-wrap">
          {["All", "Mythic", "Legendary", "Epic", "Rare", "Common"].map(r => (
            <button key={r} onClick={() => setRarityFilter(r)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${rarityFilter === r ? "bg-purple-600 text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>{r}</button>
          ))}
        </div>
      </div>

      {/* Mint Banner */}
      <Card className="border-purple-500/20 bg-gradient-to-r from-purple-950/30 to-pink-950/20">
        <CardContent className="py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="font-bold">Mint Your Impact Story NFT</h3>
              <p className="text-sm text-muted-foreground">Turn your charitable contributions into unique NFTs. 50% of mint fees go directly to your chosen cause.</p>
            </div>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0" onClick={() => toast.info("Connect wallet to mint NFTs")}>
              <Plus className="h-4 w-4 mr-2" />Mint NFT
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* NFT Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((nft, i) => (
          <motion.div key={nft.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <NFTCard nft={nft} onBuy={handleBuy} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
