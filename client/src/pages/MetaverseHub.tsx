import { useState } from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Map,
  Home,
  Users,
  Zap,
  Star,
  ShoppingBag,
  Music,
  Video,
  Gamepad2,
  Plus,
  ChevronRight,
  Coins,
  Building,
  Trees,
  Waves,
  Mountain,
  Crown,
  Lock,
  Eye,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const WORLDS = [
  {
    id: "w1",
    name: "ShadowCity",
    desc: "The main ShadowChat hub — trading floors, social plazas, and NFT galleries",
    users: 4842,
    type: "Social",
    icon: Building,
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=180&fit=crop",
    owned: false,
    free: true,
  },
  {
    id: "w2",
    name: "Crypto Valley",
    desc: "DeFi district with live trading floors, bank vaults, and yield farms",
    users: 2100,
    type: "Finance",
    icon: Coins,
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=300&h=180&fit=crop",
    owned: false,
    free: true,
  },
  {
    id: "w3",
    name: "NFT Art District",
    desc: "Virtual galleries showcasing the best NFT art from top creators",
    users: 1240,
    type: "Art",
    icon: Eye,
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=180&fit=crop",
    owned: false,
    free: true,
  },
  {
    id: "w4",
    name: "Sky4444 Island",
    desc: "Exclusive island for SKY4444 holders — private events and VIP perks",
    users: 840,
    type: "VIP",
    icon: Crown,
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=180&fit=crop",
    owned: false,
    free: false,
  },
  {
    id: "w5",
    name: "Game Zone",
    desc: "Multiplayer gaming arena with crypto crash, racing, and battle arenas",
    users: 3200,
    type: "Gaming",
    icon: Gamepad2,
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=180&fit=crop",
    owned: false,
    free: true,
  },
  {
    id: "w6",
    name: "My Land Parcel #4444",
    desc: "Your owned virtual land — build, rent, or host events",
    users: 0,
    type: "Owned",
    icon: Home,
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=300&h=180&fit=crop",
    owned: true,
    free: true,
  },
];

const LAND_PARCELS = [
  {
    id: "p1",
    coords: "X:42 Y:44",
    size: "16x16",
    zone: "Commercial",
    price: 2500,
    owner: "You",
    rented: false,
  },
  {
    id: "p2",
    coords: "X:10 Y:22",
    size: "8x8",
    zone: "Residential",
    price: 800,
    owner: "CryptoKing",
    rented: true,
  },
  {
    id: "p3",
    coords: "X:88 Y:12",
    size: "32x32",
    zone: "Premium",
    price: 12000,
    owner: "ShadowDAO",
    rented: false,
  },
  {
    id: "p4",
    coords: "X:55 Y:77",
    size: "8x8",
    zone: "Residential",
    price: 650,
    owner: "NFT_Artist",
    rented: false,
  },
];

const AVATAR_ITEMS = [
  {
    name: "Shadow Hoodie",
    type: "Top",
    rarity: "Rare",
    price: 500,
    icon: "👕",
  },
  {
    name: "Crypto Shades",
    type: "Accessory",
    rarity: "Epic",
    price: 1200,
    icon: "🕶️",
  },
  {
    name: "SKY4444 Wings",
    type: "Back",
    rarity: "Legendary",
    price: 5000,
    icon: "🪽",
  },
  { name: "TRUMP Hat", type: "Head", rarity: "Common", price: 100, icon: "🎩" },
];

const RARITY_COLORS: Record<string, string> = {
  Common: "text-gray-400",
  Rare: "text-blue-400",
  Epic: "text-purple-400",
  Legendary: "text-yellow-400",
};

export default function MetaverseHub() {
  const [tab, setTab] = useState<"worlds" | "land" | "avatar" | "events">(
    "worlds"
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Globe className="h-6 w-6 text-cyan-400" />
            Metaverse Hub
          </h1>
          <p className="text-sm text-muted-foreground">
            Explore virtual worlds, own land, and build your digital presence
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20">
            <Coins className="h-3 w-3 mr-1" />
            42,800 SKY4444
          </Badge>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative h-40 rounded-2xl overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=800&h=200&fit=crop"
          alt="Metaverse"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-center px-6">
          <div>
            <p className="text-white font-black text-2xl">ShadowVerse</p>
            <p className="text-white/70 text-sm">12,222 users online now</p>
            <Button
              className="mt-2 bg-cyan-500 text-black border-0 font-black"
              size="sm"
              onClick={() => toast.info("Launching ShadowVerse...")}
            >
              <Zap className="h-4 w-4 mr-2" />
              Enter Now
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["worlds", "land", "avatar", "events"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${tab === t ? "bg-cyan-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "worlds" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {WORLDS.map((world, i) => {
            const Icon = world.icon;
            return (
              <motion.div
                key={world.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Card
                  className={`border-border/50 overflow-hidden hover:border-cyan-500/20 transition-all cursor-pointer ${world.owned ? "border-cyan-500/30" : ""}`}
                  onClick={() => toast.info(`Entering ${world.name}`)}
                >
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={world.image}
                      alt={world.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute top-2 left-2 flex gap-1">
                      <Badge className="text-xs bg-black/50 text-white border-0">
                        {world.type}
                      </Badge>
                      {world.owned && (
                        <Badge className="text-xs bg-cyan-500/80 text-white border-0">
                          Owned
                        </Badge>
                      )}
                      {!world.free && (
                        <Badge className="text-xs bg-yellow-500/80 text-black border-0">
                          VIP
                        </Badge>
                      )}
                    </div>
                    <div className="absolute bottom-2 right-2 flex items-center gap-1 text-xs text-white bg-black/50 px-2 py-0.5 rounded-full">
                      <Users className="h-3 w-3" />
                      {world.users.toLocaleString()}
                    </div>
                  </div>
                  <CardContent className="pt-3 pb-3">
                    <p className="font-black text-sm">{world.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                      {world.desc}
                    </p>
                    <Button
                      className="w-full mt-2 h-7 text-xs bg-cyan-600 text-white border-0"
                      disabled={!world.free && !world.owned}
                    >
                      {!world.free && !world.owned ? (
                        <>
                          <Lock className="h-3 w-3 mr-1" />
                          VIP Only
                        </>
                      ) : (
                        "Enter World"
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      {tab === "land" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm">Land Marketplace</h3>
            <Button
              className="bg-cyan-600 text-white border-0 h-8 text-xs"
              onClick={() => toast.info("Opening land map")}
            >
              <Map className="h-3.5 w-3.5 mr-1.5" />
              View Map
            </Button>
          </div>
          {LAND_PARCELS.map((parcel, i) => (
            <Card key={parcel.id} className="border-border/50">
              <CardContent className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
                    <Map className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-sm">{parcel.coords}</p>
                      <Badge variant="outline" className="text-xs">
                        {parcel.zone}
                      </Badge>
                      {parcel.owner === "You" && (
                        <Badge className="text-xs bg-cyan-500/10 text-cyan-400 border-cyan-500/20">
                          Owned
                        </Badge>
                      )}
                      {parcel.rented && (
                        <Badge className="text-xs bg-green-500/10 text-green-400 border-green-500/20">
                          Rented
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {parcel.size} · Owner: {parcel.owner}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-black">
                      {parcel.price.toLocaleString()} SKY4444
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ${(parcel.price * 0.025).toFixed(0)} USD
                    </p>
                  </div>
                  <Button
                    size="sm"
                    className={`h-7 text-xs shrink-0 ${parcel.owner === "You" ? "bg-blue-600" : "bg-cyan-600"} text-white border-0`}
                    onClick={() =>
                      toast.success(
                        parcel.owner === "You"
                          ? "Managing your land"
                          : `Purchasing ${parcel.coords}`
                      )
                    }
                  >
                    {parcel.owner === "You" ? "Manage" : "Buy"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "avatar" && (
        <div className="space-y-4">
          {/* Avatar Preview */}
          <Card className="border-border/50">
            <CardContent className="py-6 flex flex-col items-center gap-3">
              <div className="h-32 w-32 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-6xl border-4 border-cyan-400/30">
                🧑‍💻
              </div>
              <div className="text-center">
                <p className="font-black text-lg">ShadowUser #4444</p>
                <p className="text-sm text-muted-foreground">
                  Level 42 · Shadow Elite
                </p>
              </div>
              <Button
                className="bg-cyan-600 text-white border-0"
                size="sm"
                onClick={() => toast.info("Opening avatar editor")}
              >
                Customize Avatar
              </Button>
            </CardContent>
          </Card>

          {/* Wearables Shop */}
          <h3 className="font-bold text-sm">Wearables Shop</h3>
          <div className="grid grid-cols-2 gap-3">
            {AVATAR_ITEMS.map((item, i) => (
              <Card key={item.name} className="border-border/50">
                <CardContent className="pt-4 text-center">
                  <span className="text-4xl">{item.icon}</span>
                  <p className="font-bold text-sm mt-2">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.type}</p>
                  <p
                    className={`text-xs font-bold mt-0.5 ${RARITY_COLORS[item.rarity]}`}
                  >
                    {item.rarity}
                  </p>
                  <p className="text-sm font-black mt-1">
                    {item.price} SKY4444
                  </p>
                  <Button
                    className="w-full mt-2 h-7 text-xs bg-cyan-600 text-white border-0"
                    onClick={() => toast.success(`Purchased ${item.name}!`)}
                  >
                    Buy
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {tab === "events" && (
        <div className="space-y-3">
          {[
            {
              name: "ShadowChat Live Concert",
              world: "ShadowCity",
              time: "Tonight 8PM EST",
              attendees: 2840,
              type: "Music",
              icon: "🎵",
              free: true,
            },
            {
              name: "NFT Art Gallery Opening",
              world: "NFT Art District",
              time: "May 16 6PM EST",
              attendees: 420,
              type: "Art",
              icon: "🎨",
              free: true,
            },
            {
              name: "SKY4444 VIP Meetup",
              world: "Sky4444 Island",
              time: "May 18 3PM EST",
              attendees: 120,
              type: "VIP",
              icon: "👑",
              free: false,
            },
            {
              name: "Crypto Trading Workshop",
              world: "Crypto Valley",
              time: "May 20 2PM EST",
              attendees: 680,
              type: "Education",
              icon: "📊",
              free: true,
            },
          ].map((event, i) => (
            <Card key={event.name} className="border-border/50">
              <CardContent className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl shrink-0">{event.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-sm">{event.name}</p>
                      {!event.free && (
                        <Badge className="text-xs bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                          VIP
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {event.world} · {event.time}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      <Users className="h-3 w-3 inline mr-0.5" />
                      {event.attendees.toLocaleString()} attending
                    </p>
                  </div>
                  <Button
                    size="sm"
                    className="h-7 text-xs bg-cyan-600 text-white border-0 shrink-0"
                    onClick={() => toast.success(`RSVP'd to ${event.name}!`)}
                  >
                    RSVP
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
