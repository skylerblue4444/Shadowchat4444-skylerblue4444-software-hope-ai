import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Navigation,
  Search,
  Star,
  Clock,
  Coins,
  ChevronRight,
  Zap,
  Coffee,
  Utensils,
  Laptop,
  Building,
  Fuel,
  ShoppingBag,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const CATEGORIES = [
  { id: "all", name: "All", emoji: "🗺️" },
  { id: "it", name: "IT Services", emoji: "💻" },
  { id: "atm", name: "Crypto ATM", emoji: "🏧" },
  { id: "food", name: "Dining", emoji: "🍽️" },
  { id: "coffee", name: "Coffee", emoji: "☕" },
  { id: "shop", name: "Shopping", emoji: "🛍️" },
  { id: "fuel", name: "Gas", emoji: "⛽" },
  { id: "events", name: "Events", emoji: "🎪" },
];

const LOCATIONS = [
  {
    id: 1,
    name: "Skyler Blue IT Resolutions",
    category: "it",
    emoji: "💻",
    address: "Fort Smith, AR",
    distance: "1.2 mi",
    rating: 4.9,
    reviews: 144,
    accepts: ["SKY4444", "TRUMP", "BTC", "USDT", "Card"],
    open: true,
    hours: "9AM-6PM",
    phone: "479-406-7123",
    featured: true,
  },
  {
    id: 2,
    name: "ShadowCafe",
    category: "coffee",
    emoji: "☕",
    address: "123 Main St",
    distance: "0.1 mi",
    rating: 4.7,
    reviews: 88,
    accepts: ["SKY4444", "DOGE", "Card"],
    open: true,
    hours: "7AM-8PM",
    phone: "",
    featured: false,
  },
  {
    id: 3,
    name: "CryptoATM Hub",
    category: "atm",
    emoji: "🏧",
    address: "456 Commerce Blvd",
    distance: "0.3 mi",
    rating: 4.5,
    reviews: 234,
    accepts: ["BTC", "ETH", "USDT"],
    open: true,
    hours: "24/7",
    phone: "",
    featured: false,
  },
  {
    id: 4,
    name: "TechStore Pro",
    category: "shop",
    emoji: "💻",
    address: "789 Tech Ave",
    distance: "0.5 mi",
    rating: 4.6,
    reviews: 67,
    accepts: ["BTC", "SKY4444", "Card"],
    open: true,
    hours: "10AM-9PM",
    phone: "",
    featured: false,
  },
  {
    id: 5,
    name: "CryptoEats Restaurant",
    category: "food",
    emoji: "🍔",
    distance: "0.3 mi",
    address: "321 Crypto Lane",
    rating: 4.4,
    reviews: 156,
    accepts: ["SKY4444", "DOGE", "USDT", "Card"],
    open: true,
    hours: "11AM-10PM",
    phone: "",
    featured: false,
  },
  {
    id: 6,
    name: "FuelUp Station",
    category: "fuel",
    emoji: "⛽",
    distance: "0.8 mi",
    address: "654 Highway Dr",
    rating: 4.2,
    reviews: 45,
    accepts: ["DOGE", "SKY4444", "Card"],
    open: true,
    hours: "24/7",
    phone: "",
    featured: false,
  },
  {
    id: 7,
    name: "ShadowMall",
    category: "shop",
    emoji: "🛍️",
    distance: "1.5 mi",
    address: "987 Mall Rd",
    rating: 4.3,
    reviews: 312,
    accepts: ["SKY4444", "TRUMP", "BTC", "Card"],
    open: true,
    hours: "10AM-9PM",
    phone: "",
    featured: false,
  },
  {
    id: 8,
    name: "Crypto Conference Center",
    category: "events",
    emoji: "🎪",
    distance: "2.1 mi",
    address: "111 Event Plaza",
    rating: 4.8,
    reviews: 89,
    accepts: ["SKY4444", "BTC", "USDT"],
    open: false,
    hours: "Event days only",
    phone: "",
    featured: false,
  },
];

export default function ShadowMaps() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [selected, setSelected] = useState<(typeof LOCATIONS)[0] | null>(null);

  const filtered = LOCATIONS.filter(
    l =>
      (category === "all" || l.category === category) &&
      (search === "" || l.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <MapPin className="h-6 w-6 text-rose-400" />
            ShadowMaps
          </h1>
          <p className="text-sm text-muted-foreground">
            Find nearby crypto-accepting businesses, ATMs, and events
          </p>
        </div>
        <Badge className="bg-rose-500/10 text-rose-400 border-rose-500/20 font-bold">
          📍 {filtered.length} Nearby
        </Badge>
      </div>

      {/* Map Placeholder */}
      <Card className="border-rose-500/20 bg-gradient-to-br from-rose-900/10 to-blue-900/10 overflow-hidden">
        <CardContent className="p-0">
          <div className="h-48 relative flex items-center justify-center">
            <div className="absolute inset-0 opacity-20">
              {/* Grid lines simulating map */}
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute border-b border-white/20"
                  style={{ top: `${i * 12.5}%`, width: "100%" }}
                />
              ))}
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute border-r border-white/20"
                  style={{ left: `${i * 12.5}%`, height: "100%" }}
                />
              ))}
            </div>
            {/* Location pins */}
            {filtered.slice(0, 6).map((loc, i) => (
              <motion.button
                key={loc.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelected(loc)}
                className="absolute"
                style={{
                  left: `${15 + (i % 3) * 30}%`,
                  top: `${20 + Math.floor(i / 3) * 40}%`,
                }}
              >
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center text-sm shadow-lg border-2 ${selected?.id === loc.id ? "border-yellow-400 scale-125" : "border-white/50"} bg-rose-600`}
                >
                  {loc.emoji}
                </div>
              </motion.button>
            ))}
            <div className="absolute bottom-3 right-3 flex gap-2">
              <Button
                size="sm"
                className="h-7 text-xs bg-white/10 backdrop-blur border border-white/20"
                onClick={() => toast.info("Centering on your location...")}
              >
                <Navigation className="h-3 w-3 mr-1" />
                My Location
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Location Detail */}
      {selected && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card
            className={`border ${selected.featured ? "border-yellow-500/30 bg-yellow-900/5" : "border-rose-500/20 bg-rose-900/5"}`}
          >
            <CardContent className="py-4 px-4">
              <div className="flex items-start gap-3">
                <span className="text-3xl">{selected.emoji}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-black text-sm">{selected.name}</p>
                    {selected.featured && (
                      <Badge className="text-xs bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                        ⭐ Featured
                      </Badge>
                    )}
                    <Badge
                      className={`text-xs ${selected.open ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"}`}
                    >
                      {selected.open ? "● Open" : "● Closed"}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {selected.address} · {selected.distance}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {selected.hours}
                    {selected.phone && ` · ${selected.phone}`}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-400" />
                      {selected.rating}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({selected.reviews} reviews)
                    </span>
                  </div>
                  <div className="flex gap-1 mt-2 flex-wrap">
                    {selected.accepts.map(coin => (
                      <Badge
                        key={coin}
                        className="text-xs bg-muted text-muted-foreground"
                      >
                        {coin}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Button
                    size="sm"
                    className="h-7 text-xs bg-rose-600 text-white border-0"
                    onClick={() =>
                      toast.info(`Getting directions to ${selected.name}...`)
                    }
                  >
                    Directions
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs"
                    onClick={() => toast.info(`Opening ${selected.name}...`)}
                  >
                    Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Search & Filter */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search nearby..."
            className="pl-9 h-9 text-xs"
          />
        </div>
      </div>
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${category === cat.id ? "bg-rose-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {cat.emoji} {cat.name}
          </button>
        ))}
      </div>

      {/* Location List */}
      <div className="space-y-2">
        {filtered.map((loc, i) => (
          <motion.div
            key={loc.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <Card
              className={`border cursor-pointer transition-all ${selected?.id === loc.id ? "border-rose-500/30" : "border-border/50 hover:border-rose-500/20"}`}
              onClick={() => setSelected(loc)}
            >
              <CardContent className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <span className="text-xl shrink-0">{loc.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-sm truncate">{loc.name}</p>
                      <Badge
                        className={`text-xs shrink-0 ${loc.open ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"}`}
                      >
                        {loc.open ? "Open" : "Closed"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>
                        <MapPin className="h-3 w-3 inline mr-0.5" />
                        {loc.distance}
                      </span>
                      <span>
                        <Star className="h-3 w-3 inline mr-0.5 text-yellow-400" />
                        {loc.rating}
                      </span>
                      <span>
                        {loc.accepts.slice(0, 2).join(", ")}
                        {loc.accepts.length > 2
                          ? ` +${loc.accepts.length - 2}`
                          : ""}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
