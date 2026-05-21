import { useState } from "react";
import { motion } from "framer-motion";
import {
  Palette,
  Upload,
  Zap,
  Star,
  DollarSign,
  Hash,
  Globe,
  Lock,
  CheckCircle,
  Plus,
  Trash2,
  Image,
  Music,
  Video,
  FileText,
  Settings,
  Eye,
  Share2,
  ChevronRight,
  Coins,
  Award,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const COLLECTIONS = [
  { id: "c1", name: "ShadowChat Genesis", items: 42, floor: 0.05, icon: "⚡" },
  { id: "c2", name: "TRUMP Legends", items: 18, floor: 0.12, icon: "🇺🇸" },
  { id: "c3", name: "SKY4444 Originals", items: 7, floor: 0.08, icon: "🌌" },
];

const BLOCKCHAINS = [
  { name: "Ethereum", symbol: "ETH", fee: "~$12", icon: "Ξ", fast: false },
  { name: "Polygon", symbol: "MATIC", fee: "~$0.01", icon: "⬡", fast: true },
  { name: "Solana", symbol: "SOL", fee: "~$0.001", icon: "◎", fast: true },
  {
    name: "ShadowChain",
    symbol: "SKY4444",
    fee: "FREE",
    icon: "⚡",
    fast: true,
  },
];

const PROPERTIES_TEMPLATE = [
  { trait: "Background", value: "" },
  { trait: "Rarity", value: "" },
  { trait: "Edition", value: "" },
];

export default function NFTCreator() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [royalty, setRoyalty] = useState("10");
  const [supply, setSupply] = useState("1");
  const [price, setPrice] = useState("");
  const [selectedChain, setSelectedChain] = useState(BLOCKCHAINS[3]);
  const [selectedCollection, setSelectedCollection] = useState(COLLECTIONS[0]);
  const [properties, setProperties] = useState(PROPERTIES_TEMPLATE);
  const [unlockable, setUnlockable] = useState(false);
  const [fileType, setFileType] = useState<"image" | "video" | "audio" | "3d">(
    "image"
  );

  const handleMint = () => {
    if (!name) {
      toast.error("Enter NFT name");
      return;
    }
    toast.success(`🎨 Minting "${name}" on ${selectedChain.name}...`);
    setTimeout(
      () =>
        toast.success(`✅ "${name}" minted successfully! View on marketplace`),
      2500
    );
  };

  const STEPS = ["Upload", "Details", "Settings", "Review & Mint"];

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2">
          <Palette className="h-6 w-6 text-pink-400" />
          NFT Creator
        </h1>
        <p className="text-sm text-muted-foreground">
          Mint your digital art, music, video, or any file as an NFT
        </p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-2">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <button
              onClick={() => setStep(i + 1)}
              className={`flex items-center gap-2 shrink-0 ${step > i + 1 ? "text-green-400" : step === i + 1 ? "text-pink-400" : "text-muted-foreground"}`}
            >
              <div
                className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${step > i + 1 ? "border-green-400 bg-green-400/10" : step === i + 1 ? "border-pink-400 bg-pink-400/10" : "border-border/40"}`}
              >
                {step > i + 1 ? <CheckCircle className="h-4 w-4" /> : i + 1}
              </div>
              <span className="text-xs font-medium hidden md:block">{s}</span>
            </button>
            {i < STEPS.length - 1 && (
              <div
                className={`flex-1 h-0.5 rounded-full ${step > i + 1 ? "bg-green-400" : "bg-border/30"}`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Upload */}
      {step === 1 && (
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold">
              Upload Your File
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              {(["image", "video", "audio", "3d"] as const).map(type => {
                const icons = {
                  image: Image,
                  video: Video,
                  audio: Music,
                  "3d": Globe,
                };
                const Icon = icons[type];
                return (
                  <button
                    key={type}
                    onClick={() => setFileType(type)}
                    className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-xl border transition-colors capitalize text-xs font-medium ${fileType === type ? "border-pink-500/40 bg-pink-500/10 text-pink-400" : "border-border/30 text-muted-foreground"}`}
                  >
                    <Icon className="h-5 w-5" />
                    {type}
                  </button>
                );
              })}
            </div>
            <div
              className="border-2 border-dashed border-border/50 rounded-2xl p-16 text-center hover:border-pink-500/40 transition-colors cursor-pointer"
              onClick={() => toast.info("File picker opened")}
            >
              <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="font-bold">Drop your {fileType} here</p>
              <p className="text-sm text-muted-foreground mt-1">
                PNG, GIF, MP4, MP3, GLB · Max 100MB
              </p>
              <Button
                className="mt-4 bg-pink-600 text-white border-0"
                size="sm"
              >
                Choose File
              </Button>
            </div>
            <div className="p-3 rounded-xl bg-muted/20 border border-border/30">
              <p className="text-xs text-muted-foreground">
                💡 <strong>Tip:</strong> High-quality 1:1 ratio images perform
                best on marketplaces. Recommended: 1080×1080px minimum.
              </p>
            </div>
            <Button
              className="w-full bg-pink-600 text-white border-0"
              onClick={() => setStep(2)}
            >
              Continue <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Details */}
      {step === 2 && (
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold">NFT Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                NFT Name *
              </label>
              <Input
                placeholder="e.g. Shadow Genesis #001"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                Description
              </label>
              <textarea
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm h-24 resize-none"
                placeholder="Describe your NFT..."
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">
                  Supply
                </label>
                <Input
                  type="number"
                  min="1"
                  placeholder="1"
                  value={supply}
                  onChange={e => setSupply(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">
                  Royalty %
                </label>
                <Input
                  type="number"
                  min="0"
                  max="50"
                  placeholder="10"
                  value={royalty}
                  onChange={e => setRoyalty(e.target.value)}
                />
              </div>
            </div>

            {/* Collection */}
            <div>
              <label className="text-xs text-muted-foreground mb-2 block">
                Collection
              </label>
              <div className="grid grid-cols-3 gap-2">
                {COLLECTIONS.map(col => (
                  <button
                    key={col.id}
                    onClick={() => setSelectedCollection(col)}
                    className={`p-3 rounded-xl border text-left transition-colors ${selectedCollection.id === col.id ? "border-pink-500/40 bg-pink-500/10" : "border-border/30"}`}
                  >
                    <span className="text-2xl">{col.icon}</span>
                    <p className="text-xs font-bold mt-1 line-clamp-1">
                      {col.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {col.items} items
                    </p>
                  </button>
                ))}
                <button
                  onClick={() => toast.info("Create new collection")}
                  className="p-3 rounded-xl border border-dashed border-border/40 flex flex-col items-center justify-center gap-1 text-muted-foreground hover:border-pink-500/30 transition-colors"
                >
                  <Plus className="h-5 w-5" />
                  <span className="text-xs">New</span>
                </button>
              </div>
            </div>

            {/* Properties */}
            <div>
              <label className="text-xs text-muted-foreground mb-2 block">
                Properties / Traits
              </label>
              <div className="space-y-2">
                {properties.map((prop, i) => (
                  <div key={i} className="flex gap-2">
                    <Input
                      placeholder="Trait type"
                      value={prop.trait}
                      onChange={e =>
                        setProperties(prev =>
                          prev.map((p, j) =>
                            j === i ? { ...p, trait: e.target.value } : p
                          )
                        )
                      }
                      className="flex-1"
                    />
                    <Input
                      placeholder="Value"
                      value={prop.value}
                      onChange={e =>
                        setProperties(prev =>
                          prev.map((p, j) =>
                            j === i ? { ...p, value: e.target.value } : p
                          )
                        )
                      }
                      className="flex-1"
                    />
                    <button
                      onClick={() =>
                        setProperties(prev => prev.filter((_, j) => j !== i))
                      }
                      className="h-9 w-9 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center hover:bg-red-500/20 transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs"
                  onClick={() =>
                    setProperties(prev => [...prev, { trait: "", value: "" }])
                  }
                >
                  <Plus className="h-3.5 w-3.5 mr-1" />
                  Add Property
                </Button>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button
                className="flex-1 bg-pink-600 text-white border-0"
                onClick={() => setStep(3)}
              >
                Continue <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Settings */}
      {step === 3 && (
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold">
              Blockchain & Pricing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-xs text-muted-foreground mb-2 block">
                Blockchain
              </label>
              <div className="grid grid-cols-2 gap-2">
                {BLOCKCHAINS.map(chain => (
                  <button
                    key={chain.name}
                    onClick={() => setSelectedChain(chain)}
                    className={`p-3 rounded-xl border text-left transition-colors ${selectedChain.name === chain.name ? "border-pink-500/40 bg-pink-500/10" : "border-border/30"}`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">{chain.icon}</span>
                      <span className="font-bold text-sm">{chain.name}</span>
                      {chain.fast && (
                        <Badge className="text-xs bg-green-500/10 text-green-400 border-green-500/20">
                          Fast
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Mint fee:{" "}
                      <span
                        className={
                          chain.fee === "FREE" ? "text-green-400 font-bold" : ""
                        }
                      >
                        {chain.fee}
                      </span>
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                List Price (optional)
              </label>
              <div className="relative">
                <Input
                  placeholder="0.00"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  className="pr-20"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  {selectedChain.symbol}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/20 border border-border/30">
              <div className="flex-1">
                <p className="text-sm font-medium">Unlockable Content</p>
                <p className="text-xs text-muted-foreground">
                  Add exclusive content only visible to the owner
                </p>
              </div>
              <button
                onClick={() => setUnlockable(!unlockable)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${unlockable ? "bg-pink-500" : "bg-muted"}`}
              >
                <span
                  className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${unlockable ? "translate-x-4" : "translate-x-1"}`}
                />
              </button>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button
                className="flex-1 bg-pink-600 text-white border-0"
                onClick={() => setStep(4)}
              >
                Review <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Review & Mint */}
      {step === 4 && (
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold">Review & Mint</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-pink-950/30 to-purple-950/30 border border-pink-500/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-3xl">
                  🎨
                </div>
                <div>
                  <p className="font-black text-lg">{name || "Untitled NFT"}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedCollection.name}
                  </p>
                  <Badge className="text-xs bg-pink-500/10 text-pink-400 border-pink-500/20 mt-1">
                    {selectedChain.name}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {[
                  ["Supply", supply],
                  ["Royalty", `${royalty}%`],
                  ["Mint Fee", selectedChain.fee],
                  [
                    "List Price",
                    price ? `${price} ${selectedChain.symbol}` : "Not listed",
                  ],
                  ["Unlockable", unlockable ? "Yes" : "No"],
                  ["Chain", selectedChain.name],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="font-medium">{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(3)}>
                Back
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 text-white border-0 font-black"
                onClick={handleMint}
              >
                <Zap className="h-4 w-4 mr-2" />
                Mint NFT on {selectedChain.name}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
