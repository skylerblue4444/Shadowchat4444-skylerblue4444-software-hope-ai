import { useState } from "react";
import { motion } from "framer-motion";
import {
  Map,
  Home,
  Building2,
  ShoppingBag,
  Coins,
  TrendingUp,
  Users,
  Star,
  Zap,
  Globe,
  Lock,
  Unlock,
  Plus,
  Eye,
  Edit,
  DollarSign,
  BarChart2,
  Crown,
  Layers,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const DISTRICTS = [
  {
    id: "d1",
    name: "ShadowCity Center",
    emoji: "🏙️",
    parcels: 1000,
    available: 124,
    floorPrice: 2400,
    volume24h: 48400,
    change: +12.4,
    type: "Commercial",
  },
  {
    id: "d2",
    name: "Crypto Valley",
    emoji: "💎",
    parcels: 500,
    available: 48,
    floorPrice: 8400,
    volume24h: 124000,
    change: +28.4,
    type: "Premium",
  },
  {
    id: "d3",
    name: "Meme District",
    emoji: "🐕",
    parcels: 2000,
    available: 840,
    floorPrice: 480,
    volume24h: 12400,
    change: -4.2,
    type: "Residential",
  },
  {
    id: "d4",
    name: "SKY4444 Plaza",
    emoji: "⚡",
    parcels: 444,
    available: 12,
    floorPrice: 44400,
    volume24h: 284000,
    change: +84.4,
    type: "Exclusive",
  },
  {
    id: "d5",
    name: "DeFi Gardens",
    emoji: "🌿",
    parcels: 800,
    available: 280,
    floorPrice: 1200,
    volume24h: 28400,
    change: +8.2,
    type: "Mixed",
  },
];

const MY_PARCELS = [
  {
    id: "p1",
    district: "ShadowCity Center",
    coords: "(42, 88)",
    size: "1x1",
    value: 3200,
    income: 48,
    status: "rented",
    tenant: "CryptoKing88",
  },
  {
    id: "p2",
    district: "SKY4444 Plaza",
    coords: "(4, 44)",
    size: "2x2",
    value: 48000,
    income: 0,
    status: "owned",
    tenant: null,
  },
  {
    id: "p3",
    district: "Crypto Valley",
    coords: "(12, 34)",
    size: "1x1",
    value: 9200,
    income: 124,
    status: "rented",
    tenant: "NFT_Queen",
  },
];

const BUILDINGS = [
  {
    name: "Crypto Exchange",
    emoji: "📈",
    cost: 5000,
    income: 200,
    type: "Commercial",
    description: "Earn trading fees from visitors",
  },
  {
    name: "NFT Gallery",
    emoji: "🎨",
    cost: 3000,
    income: 120,
    type: "Art",
    description: "Display and sell NFTs to visitors",
  },
  {
    name: "SkyBlue IT Office",
    emoji: "💻",
    cost: 8000,
    income: 400,
    type: "Business",
    description: "IT services hub in the metaverse",
  },
  {
    name: "Meme Casino",
    emoji: "🎰",
    cost: 12000,
    income: 800,
    type: "Entertainment",
    description: "Crypto gambling with SKY4444",
  },
  {
    name: "TRUMP Tower",
    emoji: "🏛️",
    cost: 44444,
    income: 2000,
    type: "Landmark",
    description: "Iconic landmark with premium rent",
  },
  {
    name: "Charity Hub",
    emoji: "❤️",
    cost: 2000,
    income: 80,
    type: "Social",
    description: "Community space for charity events",
  },
];

const TYPE_COLORS: Record<string, string> = {
  Commercial: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Premium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Residential: "bg-green-500/10 text-green-400 border-green-500/20",
  Exclusive: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Mixed: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  Art: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  Business: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Entertainment: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  Landmark: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Social: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function VirtualLand() {
  const [tab, setTab] = useState<"map" | "my-land" | "marketplace" | "build">(
    "map"
  );

  const totalValue = MY_PARCELS.reduce((s, p) => s + p.value, 0);
  const totalIncome = MY_PARCELS.reduce((s, p) => s + p.income, 0);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2">
          <Map className="h-6 w-6 text-emerald-400" />
          Virtual Land
        </h1>
        <p className="text-sm text-muted-foreground">
          Own, build, and earn in the ShadowChain Metaverse
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        {[
          {
            label: "My Parcels",
            value: String(MY_PARCELS.length),
            color: "text-emerald-400",
          },
          {
            label: "Total Value",
            value: `$${(totalValue / 1000).toFixed(1)}K`,
            color: "text-yellow-400",
          },
          {
            label: "Daily Income",
            value: `${totalIncome} SKY`,
            color: "text-green-400",
          },
          {
            label: "Rented",
            value: `${MY_PARCELS.filter(p => p.status === "rented").length}/${MY_PARCELS.length}`,
            color: "text-blue-400",
          },
        ].map(({ label, value, color }) => (
          <Card key={label} className="border-border/50">
            <CardContent className="pt-2 pb-2 text-center">
              <p className={`font-black text-sm ${color}`}>{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["map", "my-land", "marketplace", "build"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${tab === t ? "bg-emerald-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t.replace("-", " ")}
          </button>
        ))}
      </div>

      {tab === "map" && (
        <div className="space-y-3">
          {/* Map Visualization */}
          <Card className="border-border/50">
            <CardContent className="pt-4 pb-4">
              <div className="aspect-square max-h-64 bg-gradient-to-br from-gray-900 to-black rounded-xl border border-border/30 relative overflow-hidden flex items-center justify-center">
                <div className="grid grid-cols-8 gap-1 p-4">
                  {Array.from({ length: 64 }).map((_, i) => {
                    const isOwned = [10, 11, 18, 19, 35, 42].includes(i);
                    const isAvailable = [5, 12, 20, 28, 36, 44, 52].includes(i);
                    const isPremium = [25, 26, 33, 34].includes(i);
                    return (
                      <div
                        key={i}
                        className={`h-6 w-6 rounded-sm cursor-pointer transition-all hover:scale-110 ${isOwned ? "bg-blue-500" : isPremium ? "bg-yellow-500" : isAvailable ? "bg-green-500/60" : "bg-gray-800"}`}
                        onClick={() =>
                          toast.info(
                            isOwned
                              ? "Your parcel"
                              : isAvailable
                                ? "Available — click to buy"
                                : "Unavailable"
                          )
                        }
                      />
                    );
                  })}
                </div>
              </div>
              <div className="flex gap-4 mt-3 justify-center text-xs">
                {[
                  { color: "bg-blue-500", label: "Your Land" },
                  { color: "bg-yellow-500", label: "Premium" },
                  { color: "bg-green-500/60", label: "Available" },
                  { color: "bg-gray-800", label: "Taken" },
                ].map(({ color, label }) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <div className={`h-3 w-3 rounded-sm ${color}`} />
                    <span className="text-muted-foreground">{label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Districts */}
          <h3 className="font-bold text-sm">Districts</h3>
          {DISTRICTS.map((district, i) => (
            <motion.div
              key={district.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="border-border/50">
                <CardContent className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{district.emoji}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="font-black text-sm">{district.name}</p>
                        <Badge
                          className={`text-xs ${TYPE_COLORS[district.type]}`}
                        >
                          {district.type}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {district.available} of {district.parcels} available
                      </p>
                      <Progress
                        value={
                          ((district.parcels - district.available) /
                            district.parcels) *
                          100
                        }
                        className="h-1 mt-1"
                      />
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-black text-sm">
                        ${district.floorPrice.toLocaleString()}
                      </p>
                      <p
                        className={`text-xs font-bold ${district.change >= 0 ? "text-green-400" : "text-red-400"}`}
                      >
                        {district.change >= 0 ? "+" : ""}
                        {district.change}%
                      </p>
                    </div>
                    <Button
                      size="sm"
                      className="h-7 text-xs bg-emerald-600 text-white border-0 shrink-0"
                      onClick={() =>
                        toast.success(`Viewing ${district.name} parcels...`)
                      }
                    >
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "my-land" && (
        <div className="space-y-3">
          {MY_PARCELS.map((parcel, i) => (
            <Card key={parcel.id} className="border-border/50">
              <CardContent className="py-4 px-4">
                <div className="flex items-start gap-3">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-900 to-blue-900 flex items-center justify-center text-2xl shrink-0">
                    🏗️
                  </div>
                  <div className="flex-1">
                    <p className="font-black text-sm">{parcel.district}</p>
                    <p className="text-xs text-muted-foreground">
                      Coords: {parcel.coords} · Size: {parcel.size}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        className={`text-xs ${parcel.status === "rented" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-blue-500/10 text-blue-400 border-blue-500/20"}`}
                      >
                        {parcel.status === "rented"
                          ? `Rented to ${parcel.tenant}`
                          : "Owned"}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-black">
                      ${parcel.value.toLocaleString()}
                    </p>
                    {parcel.income > 0 && (
                      <p className="text-xs text-green-400">
                        +{parcel.income} SKY/day
                      </p>
                    )}
                    <div className="flex gap-1 mt-1">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-6 text-xs px-2"
                        onClick={() => toast.info("Opening parcel editor...")}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-6 text-xs px-2"
                        onClick={() => toast.info("Listing for sale...")}
                      >
                        <DollarSign className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          <Card className="border-border/50 text-center">
            <CardContent className="py-3">
              <p className="font-black text-green-400">
                +{totalIncome} SKY4444/day
              </p>
              <p className="text-xs text-muted-foreground">
                Total passive income from rented parcels
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "marketplace" && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Buy and sell virtual land parcels
          </p>
          {DISTRICTS.map((district, i) => (
            <Card key={district.id} className="border-border/50">
              <CardContent className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{district.emoji}</span>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{district.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {district.available} parcels · Vol: $
                      {(district.volume24h / 1000).toFixed(0)}K/24h
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-black">
                      ${district.floorPrice.toLocaleString()}
                    </p>
                    <p
                      className={`text-xs font-bold ${district.change >= 0 ? "text-green-400" : "text-red-400"}`}
                    >
                      {district.change >= 0 ? "+" : ""}
                      {district.change}%
                    </p>
                  </div>
                  <Button
                    size="sm"
                    className="h-7 text-xs bg-emerald-600 text-white border-0 shrink-0"
                    onClick={() =>
                      toast.success(`Purchasing parcel in ${district.name}!`)
                    }
                  >
                    Buy
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "build" && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Place buildings on your parcels to earn passive income
          </p>
          <div className="grid grid-cols-2 gap-3">
            {BUILDINGS.map((building, i) => (
              <Card key={building.name} className="border-border/50">
                <CardContent className="py-4 px-3 text-center">
                  <span className="text-4xl">{building.emoji}</span>
                  <p className="font-black text-sm mt-2">{building.name}</p>
                  <Badge
                    className={`text-xs mt-1 ${TYPE_COLORS[building.type]}`}
                  >
                    {building.type}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    {building.description}
                  </p>
                  <div className="flex justify-between text-xs mt-2">
                    <span className="text-muted-foreground">
                      Cost:{" "}
                      <span className="text-yellow-400 font-bold">
                        {building.cost.toLocaleString()} SKY
                      </span>
                    </span>
                    <span className="text-green-400 font-bold">
                      +{building.income}/day
                    </span>
                  </div>
                  <Button
                    size="sm"
                    className="w-full mt-2 h-7 text-xs bg-emerald-600 text-white border-0"
                    onClick={() => toast.success(`Building ${building.name}!`)}
                  >
                    Build
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
