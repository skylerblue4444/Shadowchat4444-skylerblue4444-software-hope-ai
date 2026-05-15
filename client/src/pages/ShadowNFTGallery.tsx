import { useState } from "react";
import { motion } from "framer-motion";
import { Image, Heart, Share2, Eye, TrendingUp, Star, Filter, Grid3x3, List, Zap, ShoppingCart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const NFTS = [
  { id: 1, name: "ShadowPunk #4444", collection: "ShadowPunks", price: "44.4 ETH", usd: "$177,600", rarity: "Legendary", likes: 4444, views: 44444, image: "https://images.unsplash.com/photo-1634193295627-1cdddf751ebf?w=300&h=300&fit=crop", owned: true },
  { id: 2, name: "SKY Ape #0001", collection: "SKY Apes", price: "8.88 ETH", usd: "$35,520", rarity: "Epic", likes: 888, views: 8888, image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=300&h=300&fit=crop", owned: false },
  { id: 3, name: "Shadow Dragon #777", collection: "Shadow Dragons", price: "4.44 ETH", usd: "$17,760", rarity: "Rare", likes: 444, views: 4444, image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=300&fit=crop", owned: false },
  { id: 4, name: "TRUMP Card #45", collection: "TRUMP Cards", price: "44 TRUMP", usd: "$1,954", rarity: "Uncommon", likes: 4500, views: 45000, image: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=300&h=300&fit=crop", owned: true },
  { id: 5, name: "Cyber Skyler #1", collection: "Cyber Portraits", price: "1.44 ETH", usd: "$5,760", rarity: "Epic", likes: 1444, views: 14440, image: "https://images.unsplash.com/photo-1633177317976-3f9bc45e1d1d?w=300&h=300&fit=crop", owned: false },
  { id: 6, name: "Shadow Genesis #0", collection: "Shadow Genesis", price: "444 ETH", usd: "$1,776,000", rarity: "One of One", likes: 44444, views: 444444, image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=300&h=300&fit=crop", owned: false },
];

const COLLECTIONS = [
  { name: "ShadowPunks", floor: "12.4 ETH", items: 4444, volume: "44,444 ETH" },
  { name: "SKY Apes", floor: "8.88 ETH", items: 8888, volume: "8,888 ETH" },
  { name: "Shadow Dragons", floor: "4.44 ETH", items: 4444, volume: "4,444 ETH" },
  { name: "TRUMP Cards", floor: "44 TRUMP", items: 450, volume: "44,000 TRUMP" },
];

const RARITY_COLOR: Record<string, string> = {
  "Legendary": "#f59e0b",
  "Epic": "#8b5cf6",
  "Rare": "#3b82f6",
  "Uncommon": "#22c55e",
  "One of One": "#ef4444",
};

export default function ShadowNFTGallery() {
  const [tab, setTab] = useState<"gallery" | "collections" | "owned">("gallery");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [filter, setFilter] = useState("all");

  const toggleLike = (id: number) => {
    setLiked(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  const filtered = tab === "owned" ? NFTS.filter(n => n.owned) : filter === "all" ? NFTS : NFTS.filter(n => n.rarity.toLowerCase() === filter);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Image className="h-6 w-6 text-purple-400" />NFT Gallery</h1>
          <p className="text-sm text-muted-foreground">Discover, collect, and showcase rare digital art</p>
        </div>
        <div className="flex gap-1">
          <Button size="sm" variant={view === "grid" ? "default" : "outline"} className="h-8 w-8 p-0" onClick={() => setView("grid")}><Grid3x3 className="h-4 w-4" /></Button>
          <Button size="sm" variant={view === "list" ? "default" : "outline"} className="h-8 w-8 p-0" onClick={() => setView("list")}><List className="h-4 w-4" /></Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Total Value", value: "$1.8M", icon: TrendingUp, color: "text-green-400" },
          { label: "NFTs Owned", value: "2", icon: Star, color: "text-yellow-400" },
          { label: "Collections", value: "4", icon: Grid3x3, color: "text-purple-400" },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="py-2.5 px-2">
              <s.icon className={`h-5 w-5 mx-auto mb-1 ${s.color}`} />
              <p className={`font-black text-sm ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-2">
        {(["gallery", "collections", "owned"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-purple-600 text-white" : "bg-muted text-muted-foreground"}`}>{t}</button>
        ))}
      </div>

      {(tab === "gallery" || tab === "owned") && (
        <>
          {tab === "gallery" && (
            <div className="flex gap-1.5 overflow-x-auto pb-1">
              {["all", "legendary", "epic", "rare", "uncommon"].map(f => (
                <button key={f} onClick={() => setFilter(f)} className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium capitalize transition-colors ${filter === f ? "bg-purple-600 text-white" : "bg-muted text-muted-foreground"}`}>{f}</button>
              ))}
            </div>
          )}
          <div className={view === "grid" ? "grid grid-cols-2 gap-3" : "space-y-2"}>
            {filtered.map((nft, i) => (
              <motion.div key={nft.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.06 }}>
                {view === "grid" ? (
                  <Card className="border-border/50 overflow-hidden hover:border-purple-500/30 transition-all">
                    <div className="relative">
                      <img src={nft.image} alt={nft.name} className="w-full h-36 object-cover" />
                      <div className="absolute top-2 right-2">
                        <Badge className="text-xs font-bold" style={{ backgroundColor: RARITY_COLOR[nft.rarity] + "20", color: RARITY_COLOR[nft.rarity], borderColor: RARITY_COLOR[nft.rarity] + "40" }}>{nft.rarity}</Badge>
                      </div>
                      {nft.owned && <div className="absolute top-2 left-2"><Badge className="text-xs bg-green-500/80 text-white border-0">Owned</Badge></div>}
                    </div>
                    <CardContent className="py-2 px-3">
                      <p className="font-black text-xs truncate">{nft.name}</p>
                      <p className="text-xs text-muted-foreground">{nft.collection}</p>
                      <p className="font-bold text-xs text-purple-400 mt-1">{nft.price}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <button onClick={() => toggleLike(nft.id)} className="flex items-center gap-1">
                          <Heart className={`h-3.5 w-3.5 ${liked.has(nft.id) ? "fill-red-400 text-red-400" : "text-muted-foreground"}`} />
                          <span className="text-xs text-muted-foreground">{(nft.likes + (liked.has(nft.id) ? 1 : 0)).toLocaleString()}</span>
                        </button>
                        <button className="flex items-center gap-1" onClick={() => toast.success(`Shared ${nft.name}!`)}>
                          <Share2 className="h-3.5 w-3.5 text-muted-foreground" />
                        </button>
                        <Button size="sm" className="ml-auto h-6 text-xs px-2 bg-purple-600 text-white border-0 font-bold" onClick={() => toast.success(`Buying ${nft.name} for ${nft.price}...`)}>
                          <ShoppingCart className="h-3 w-3 mr-1" />Buy
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="border-border/50">
                    <CardContent className="py-2.5 px-3 flex items-center gap-3">
                      <img src={nft.image} alt={nft.name} className="h-12 w-12 rounded-xl object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm truncate">{nft.name}</p>
                        <p className="text-xs text-muted-foreground">{nft.collection}</p>
                        <Badge className="text-xs mt-0.5" style={{ backgroundColor: RARITY_COLOR[nft.rarity] + "20", color: RARITY_COLOR[nft.rarity], borderColor: RARITY_COLOR[nft.rarity] + "40" }}>{nft.rarity}</Badge>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-black text-sm text-purple-400">{nft.price}</p>
                        <p className="text-xs text-muted-foreground">{nft.usd}</p>
                        <Button size="sm" className="h-6 text-xs px-2 mt-1 bg-purple-600 text-white border-0 font-bold" onClick={() => toast.success(`Buying ${nft.name}...`)}>Buy</Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            ))}
          </div>
        </>
      )}

      {tab === "collections" && (
        <div className="space-y-2">
          {COLLECTIONS.map((col, i) => (
            <motion.div key={col.name} initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}>
              <Card className="border-border/50 hover:border-purple-500/20 transition-all">
                <CardContent className="py-3 px-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-black text-xs shrink-0">{col.name.slice(0, 2)}</div>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{col.name}</p>
                    <p className="text-xs text-muted-foreground">{col.items.toLocaleString()} items</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Floor</p>
                    <p className="font-black text-sm text-purple-400">{col.floor}</p>
                    <p className="text-xs text-muted-foreground">{col.volume} vol</p>
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
