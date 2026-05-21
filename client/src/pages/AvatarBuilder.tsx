import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Palette,
  Shirt,
  Crown,
  Star,
  Coins,
  Zap,
  RefreshCw,
  Download,
  Share2,
  Lock,
  CheckCircle,
  Sparkles,
  Trophy,
  ShoppingBag,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const CATEGORIES = [
  { id: "skin", label: "Skin", icon: User },
  { id: "hair", label: "Hair", icon: Sparkles },
  { id: "outfit", label: "Outfit", icon: Shirt },
  { id: "accessory", label: "Accessory", icon: Crown },
  { id: "background", label: "Background", icon: Palette },
];

const TRAITS: Record<
  string,
  Array<{
    id: string;
    label: string;
    emoji: string;
    rarity: string;
    price?: number;
    owned: boolean;
  }>
> = {
  skin: [
    { id: "sk1", label: "Default", emoji: "👤", rarity: "Common", owned: true },
    {
      id: "sk2",
      label: "Golden",
      emoji: "✨",
      rarity: "Rare",
      price: 500,
      owned: false,
    },
    {
      id: "sk3",
      label: "Cyber",
      emoji: "🤖",
      rarity: "Epic",
      price: 2000,
      owned: false,
    },
    {
      id: "sk4",
      label: "Shadow",
      emoji: "👻",
      rarity: "Legendary",
      price: 10000,
      owned: true,
    },
  ],
  hair: [
    { id: "h1", label: "Classic", emoji: "💇", rarity: "Common", owned: true },
    {
      id: "h2",
      label: "Mohawk",
      emoji: "🦔",
      rarity: "Uncommon",
      price: 200,
      owned: true,
    },
    {
      id: "h3",
      label: "Neon",
      emoji: "💜",
      rarity: "Rare",
      price: 800,
      owned: false,
    },
    {
      id: "h4",
      label: "Crown Hair",
      emoji: "👑",
      rarity: "Legendary",
      price: 15000,
      owned: false,
    },
  ],
  outfit: [
    { id: "o1", label: "Casual", emoji: "👕", rarity: "Common", owned: true },
    {
      id: "o2",
      label: "Suit",
      emoji: "🤵",
      rarity: "Uncommon",
      price: 400,
      owned: true,
    },
    {
      id: "o3",
      label: "Astronaut",
      emoji: "👨‍🚀",
      rarity: "Rare",
      price: 1200,
      owned: false,
    },
    {
      id: "o4",
      label: "Diamond Armor",
      emoji: "💎",
      rarity: "Legendary",
      price: 25000,
      owned: false,
    },
  ],
  accessory: [
    { id: "a1", label: "None", emoji: "✖️", rarity: "Common", owned: true },
    {
      id: "a2",
      label: "Sunglasses",
      emoji: "🕶️",
      rarity: "Common",
      price: 100,
      owned: true,
    },
    {
      id: "a3",
      label: "Laser Eyes",
      emoji: "🔴",
      rarity: "Epic",
      price: 5000,
      owned: false,
    },
    {
      id: "a4",
      label: "Halo",
      emoji: "😇",
      rarity: "Legendary",
      price: 20000,
      owned: false,
    },
  ],
  background: [
    {
      id: "bg1",
      label: "Dark Space",
      emoji: "🌌",
      rarity: "Common",
      owned: true,
    },
    {
      id: "bg2",
      label: "City",
      emoji: "🌆",
      rarity: "Uncommon",
      price: 300,
      owned: true,
    },
    {
      id: "bg3",
      label: "Moon",
      emoji: "🌕",
      rarity: "Rare",
      price: 1000,
      owned: false,
    },
    {
      id: "bg4",
      label: "ShadowChain",
      emoji: "⚡",
      rarity: "Legendary",
      price: 8000,
      owned: false,
    },
  ],
};

const RARITY_COLORS: Record<string, string> = {
  Common: "text-gray-400 border-gray-400/20 bg-gray-400/10",
  Uncommon: "text-green-400 border-green-400/20 bg-green-400/10",
  Rare: "text-blue-400 border-blue-400/20 bg-blue-400/10",
  Epic: "text-purple-400 border-purple-400/20 bg-purple-400/10",
  Legendary: "text-yellow-400 border-yellow-400/20 bg-yellow-400/10",
};

export default function AvatarBuilder() {
  const [activeCategory, setActiveCategory] = useState("skin");
  const [selected, setSelected] = useState({
    skin: "sk1",
    hair: "h1",
    outfit: "o1",
    accessory: "a1",
    background: "bg1",
  });
  const [tab, setTab] = useState<"builder" | "collection" | "marketplace">(
    "builder"
  );

  const currentTraits = TRAITS[activeCategory];
  const selectedTrait = currentTraits.find(
    t => t.id === selected[activeCategory as keyof typeof selected]
  );

  const getAvatarEmojis = () => {
    const bg =
      TRAITS.background.find(t => t.id === selected.background)?.emoji || "🌌";
    const skin = TRAITS.skin.find(t => t.id === selected.skin)?.emoji || "👤";
    const hair = TRAITS.hair.find(t => t.id === selected.hair)?.emoji || "💇";
    const outfit =
      TRAITS.outfit.find(t => t.id === selected.outfit)?.emoji || "👕";
    const acc =
      TRAITS.accessory.find(t => t.id === selected.accessory)?.emoji || "";
    return { bg, skin, hair, outfit, acc };
  };

  const emojis = getAvatarEmojis();

  const rarityScore = Object.entries(selected).reduce((score, [cat, id]) => {
    const trait = TRAITS[cat]?.find(t => t.id === id);
    const rarityPoints = {
      Common: 1,
      Uncommon: 2,
      Rare: 5,
      Epic: 15,
      Legendary: 50,
    };
    return (
      score + (rarityPoints[trait?.rarity as keyof typeof rarityPoints] || 0)
    );
  }, 0);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2">
          <User className="h-6 w-6 text-purple-400" />
          Avatar Builder
        </h1>
        <p className="text-sm text-muted-foreground">
          Create your Web3 identity — mint as NFT on ShadowChain
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["builder", "collection", "marketplace"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${tab === t ? "bg-purple-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "builder" && (
        <div className="space-y-4">
          {/* Avatar Preview */}
          <Card className="border-border/50">
            <CardContent className="pt-5 pb-5">
              <div className="flex flex-col items-center gap-4">
                <div className="relative h-40 w-40 rounded-2xl bg-gradient-to-br from-purple-900/50 to-blue-900/50 border border-purple-500/20 flex items-center justify-center overflow-hidden">
                  <span className="text-8xl absolute opacity-20">
                    {emojis.bg}
                  </span>
                  <div className="relative flex flex-col items-center">
                    <span className="text-2xl">{emojis.hair}</span>
                    <span className="text-6xl">{emojis.skin}</span>
                    <span className="text-2xl -mt-2">{emojis.outfit}</span>
                    {emojis.acc !== "✖️" && (
                      <span className="text-2xl absolute -top-2 -right-4">
                        {emojis.acc}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-center">
                  <p className="font-black">SkyBlue_Trader #4444</p>
                  <div className="flex items-center gap-2 justify-center mt-1">
                    <Trophy className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm font-bold text-yellow-400">
                      Rarity Score: {rarityScore}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    className="bg-purple-600 text-white border-0 font-bold"
                    size="sm"
                    onClick={() => toast.success("Minting avatar as NFT!")}
                  >
                    <Coins className="h-4 w-4 mr-2" />
                    Mint NFT (50 SKY4444)
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toast.success("Avatar saved!")}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toast.success("Sharing avatar!")}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category Selector */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {CATEGORIES.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveCategory(id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors shrink-0 ${activeCategory === id ? "bg-purple-600 text-white" : "bg-muted text-muted-foreground"}`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>

          {/* Traits Grid */}
          <div className="grid grid-cols-2 gap-3">
            {currentTraits.map(trait => {
              const isSelected =
                selected[activeCategory as keyof typeof selected] === trait.id;
              const isLocked = !trait.owned;
              return (
                <motion.div key={trait.id} whileTap={{ scale: 0.97 }}>
                  <Card
                    className={`border-border/50 cursor-pointer transition-all ${isSelected ? "border-purple-500 bg-purple-500/5" : ""} ${isLocked ? "opacity-60" : ""}`}
                    onClick={() => {
                      if (isLocked) {
                        toast.info(
                          `Purchase ${trait.label} for ${trait.price?.toLocaleString()} SKY4444`
                        );
                        return;
                      }
                      setSelected(prev => ({
                        ...prev,
                        [activeCategory]: trait.id,
                      }));
                    }}
                  >
                    <CardContent className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <span className="text-3xl">{trait.emoji}</span>
                        <div className="flex-1">
                          <p className="font-bold text-sm">{trait.label}</p>
                          <Badge
                            className={`text-xs ${RARITY_COLORS[trait.rarity]}`}
                          >
                            {trait.rarity}
                          </Badge>
                        </div>
                        <div className="shrink-0">
                          {isSelected ? (
                            <CheckCircle className="h-5 w-5 text-purple-400" />
                          ) : isLocked ? (
                            <Lock className="h-4 w-4 text-muted-foreground" />
                          ) : null}
                        </div>
                      </div>
                      {isLocked && trait.price && (
                        <p className="text-xs text-yellow-400 font-bold mt-1">
                          {trait.price.toLocaleString()} SKY4444
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {tab === "collection" && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Your owned wearables and avatar NFTs
          </p>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(TRAITS)
              .flatMap(([cat, traits]) =>
                traits.filter(t => t.owned).map(t => ({ ...t, category: cat }))
              )
              .map((trait, i) => (
                <Card
                  key={`${trait.category}-${trait.id}`}
                  className="border-border/50"
                >
                  <CardContent className="py-4 text-center">
                    <span className="text-4xl">{trait.emoji}</span>
                    <p className="font-bold text-sm mt-2">{trait.label}</p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {trait.category}
                    </p>
                    <Badge
                      className={`text-xs mt-1 ${RARITY_COLORS[trait.rarity]}`}
                    >
                      {trait.rarity}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      )}

      {tab === "marketplace" && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Buy rare wearables with SKY4444 tokens
          </p>
          {Object.entries(TRAITS)
            .flatMap(([cat, traits]) =>
              traits
                .filter(t => !t.owned && t.price)
                .map(t => ({ ...t, category: cat }))
            )
            .map((trait, i) => (
              <Card
                key={`${trait.category}-${trait.id}`}
                className="border-border/50"
              >
                <CardContent className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{trait.emoji}</span>
                    <div className="flex-1">
                      <p className="font-bold text-sm">{trait.label}</p>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={`text-xs ${RARITY_COLORS[trait.rarity]}`}
                        >
                          {trait.rarity}
                        </Badge>
                        <span className="text-xs text-muted-foreground capitalize">
                          {trait.category}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-yellow-400">
                        {trait.price?.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">SKY4444</p>
                    </div>
                    <Button
                      size="sm"
                      className="bg-purple-600 text-white border-0 text-xs h-7 ml-2"
                      onClick={() => toast.success(`Purchased ${trait.label}!`)}
                    >
                      Buy
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      )}
    </div>
  );
}
