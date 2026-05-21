import { useState } from "react";
import { motion } from "framer-motion";
import {
  Palette,
  Upload,
  Coins,
  Star,
  TrendingUp,
  Layers,
  Zap,
  Eye,
  Heart,
  Share2,
  Settings,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const MY_COLLECTIONS = [
  {
    id: 1,
    name: "ShadowGenesis",
    items: 44,
    floor: "0.44 ETH",
    volume: "88 ETH",
    image:
      "https://images.unsplash.com/photo-1634193295627-1cdddf751ebf?w=200&q=80",
    verified: true,
  },
  {
    id: 2,
    name: "SkyBlue IT Badges",
    items: 12,
    floor: "0.088 ETH",
    volume: "4.4 ETH",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=200&q=80",
    verified: false,
  },
];

const MY_NFTS = [
  {
    id: 1,
    name: "Shadow #001",
    collection: "ShadowGenesis",
    price: "0.44 ETH",
    views: 244,
    likes: 88,
    image:
      "https://images.unsplash.com/photo-1634193295627-1cdddf751ebf?w=200&q=80",
    listed: true,
  },
  {
    id: 2,
    name: "Shadow #002",
    collection: "ShadowGenesis",
    price: "0.88 ETH",
    views: 188,
    likes: 44,
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=200&q=80",
    listed: false,
  },
  {
    id: 3,
    name: "IT Badge Gold",
    collection: "SkyBlue IT Badges",
    price: "0.088 ETH",
    views: 44,
    likes: 12,
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&q=80",
    listed: true,
  },
];

export default function ShadowNFTStudio() {
  const [tab, setTab] = useState<
    "collections" | "mint" | "mynfts" | "earnings"
  >("collections");
  const [nftName, setNftName] = useState("");
  const [nftDesc, setNftDesc] = useState("");
  const [royalty, setRoyalty] = useState("10");
  const [minting, setMinting] = useState(false);

  const mintNFT = async () => {
    if (!nftName) {
      toast.error("Please enter an NFT name");
      return;
    }
    setMinting(true);
    await new Promise(r => setTimeout(r, 2000));
    setMinting(false);
    toast.success(
      `✅ ${nftName} minted successfully! 0.01 ETH gas fee charged.`
    );
    setNftName("");
    setNftDesc("");
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Palette className="h-6 w-6 text-pink-400" />
            NFT Studio
          </h1>
          <p className="text-sm text-muted-foreground">
            Create, manage, and monetize your NFT collections
          </p>
        </div>
        <Badge className="bg-pink-500/10 text-pink-400 border-pink-500/20 font-bold">
          🎨 Creator Hub
        </Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Collections", value: MY_COLLECTIONS.length, emoji: "📦" },
          { label: "NFTs Minted", value: "56", emoji: "🖼️" },
          { label: "Total Volume", value: "92.4 ETH", emoji: "💎" },
          { label: "Royalties", value: "4.4 ETH", emoji: "💰" },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="pt-2 pb-2">
              <p className="text-base">{s.emoji}</p>
              <p className="font-black text-xs text-pink-400">{s.value}</p>
              <p className="text-xs text-muted-foreground leading-tight">
                {s.label}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-2">
        {(["collections", "mint", "mynfts", "earnings"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-pink-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t === "mynfts" ? "My NFTs" : t}
          </button>
        ))}
      </div>

      {tab === "collections" && (
        <div className="space-y-3">
          <Button
            className="w-full h-10 text-xs bg-pink-600 text-white border-0 font-bold"
            onClick={() => toast.info("Opening collection creator...")}
          >
            <Layers className="h-4 w-4 mr-2" />
            Create New Collection
          </Button>
          {MY_COLLECTIONS.map((col, i) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card
                className="border-border/50 hover:border-pink-500/20 transition-all cursor-pointer"
                onClick={() => toast.info(`Opening ${col.name}...`)}
              >
                <CardContent className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={col.image}
                      alt={col.name}
                      className="h-14 w-14 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <p className="font-black text-sm">{col.name}</p>
                        {col.verified && (
                          <CheckCircle className="h-3.5 w-3.5 text-blue-400 fill-blue-400" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {col.items} items
                      </p>
                      <div className="flex gap-3 text-xs mt-0.5">
                        <span className="text-pink-400 font-bold">
                          Floor: {col.floor}
                        </span>
                        <span className="text-muted-foreground">
                          Vol: {col.volume}
                        </span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 text-xs shrink-0"
                      onClick={e => {
                        e.stopPropagation();
                        toast.info("Opening collection settings...");
                      }}
                    >
                      <Settings className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "mint" && (
        <div className="space-y-3">
          <Card className="border-pink-500/20 bg-pink-900/5">
            <CardContent className="py-4 px-4 space-y-3">
              <p className="font-bold text-sm">Mint a New NFT</p>

              {/* Upload Area */}
              <div
                className="border-2 border-dashed border-pink-500/30 rounded-xl p-6 text-center cursor-pointer hover:border-pink-500/50 transition-colors"
                onClick={() => toast.info("Opening file picker...")}
              >
                <Upload className="h-8 w-8 text-pink-400 mx-auto mb-2" />
                <p className="text-sm font-bold">Upload Artwork</p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG, GIF, MP4, WEBM up to 100MB
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-1">NFT Name</p>
                <Input
                  value={nftName}
                  onChange={e => setNftName(e.target.value)}
                  placeholder="e.g. Shadow #044"
                  className="h-9 text-xs"
                />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  Description
                </p>
                <Input
                  value={nftDesc}
                  onChange={e => setNftDesc(e.target.value)}
                  placeholder="Describe your NFT..."
                  className="h-9 text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Collection
                  </p>
                  <select className="w-full h-9 rounded-xl border border-border bg-background px-3 text-xs focus:outline-none">
                    <option>ShadowGenesis</option>
                    <option>SkyBlue IT Badges</option>
                    <option>New Collection</option>
                  </select>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Royalty %
                  </p>
                  <Input
                    value={royalty}
                    onChange={e => setRoyalty(e.target.value)}
                    type="number"
                    min="0"
                    max="50"
                    className="h-9 text-xs"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    List Price (ETH)
                  </p>
                  <Input
                    type="number"
                    placeholder="0.44"
                    className="h-9 text-xs"
                  />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Blockchain
                  </p>
                  <select className="w-full h-9 rounded-xl border border-border bg-background px-3 text-xs focus:outline-none">
                    <option>Ethereum</option>
                    <option>Polygon</option>
                    <option>SKY4444 Chain</option>
                  </select>
                </div>
              </div>
              <Button
                className="w-full h-10 text-xs bg-pink-600 text-white border-0 font-bold"
                onClick={mintNFT}
                disabled={minting}
              >
                {minting ? (
                  <>
                    <Zap className="h-4 w-4 mr-2 animate-pulse" />
                    Minting...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Mint NFT — 0.01 ETH Gas
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "mynfts" && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 gap-3">
            {MY_NFTS.map((nft, i) => (
              <Card key={nft.id} className="border-border/50">
                <CardContent className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={nft.image}
                      alt={nft.name}
                      className="h-16 w-16 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1">
                      <p className="font-black text-sm">{nft.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {nft.collection}
                      </p>
                      <p className="text-xs text-pink-400 font-bold">
                        {nft.price}
                      </p>
                      <div className="flex gap-3 text-xs text-muted-foreground mt-0.5">
                        <span>
                          <Eye className="h-3 w-3 inline mr-0.5" />
                          {nft.views}
                        </span>
                        <span>
                          <Heart className="h-3 w-3 inline mr-0.5" />
                          {nft.likes}
                        </span>
                      </div>
                    </div>
                    <div className="shrink-0 space-y-1">
                      <Badge
                        className={`text-xs block text-center ${nft.listed ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-muted text-muted-foreground"}`}
                      >
                        {nft.listed ? "Listed" : "Unlisted"}
                      </Badge>
                      <Button
                        size="sm"
                        className="h-7 text-xs w-full bg-pink-600 text-white border-0"
                        onClick={() =>
                          toast.info(
                            `${nft.listed ? "Unlisting" : "Listing"} ${nft.name}...`
                          )
                        }
                      >
                        {nft.listed ? "Unlist" : "List"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {tab === "earnings" && (
        <div className="space-y-3">
          <Card className="border-pink-500/20 bg-pink-900/5">
            <CardContent className="py-4 px-4">
              <p className="text-xs text-muted-foreground">Total Earnings</p>
              <p className="text-3xl font-black text-pink-400">4.4 ETH</p>
              <p className="text-xs text-green-400 font-bold">≈ $14,080 USD</p>
            </CardContent>
          </Card>
          {[
            { label: "Primary Sales", value: "3.2 ETH", emoji: "💎" },
            { label: "Royalties", value: "1.2 ETH", emoji: "🔄" },
            { label: "Pending Payout", value: "0.44 ETH", emoji: "⏳" },
          ].map(e => (
            <Card key={e.label} className="border-border/50">
              <CardContent className="py-3 px-4 flex items-center gap-3">
                <span className="text-2xl">{e.emoji}</span>
                <div className="flex-1">
                  <p className="font-bold text-sm">{e.label}</p>
                </div>
                <p className="font-black text-sm text-pink-400">{e.value}</p>
              </CardContent>
            </Card>
          ))}
          <Button
            className="w-full h-10 text-xs bg-pink-600 text-white border-0 font-bold"
            onClick={() => toast.success("✅ 0.44 ETH withdrawn to wallet!")}
          >
            Withdraw Earnings
          </Button>
        </div>
      )}
    </div>
  );
}
