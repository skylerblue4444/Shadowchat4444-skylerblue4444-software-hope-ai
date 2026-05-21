import { useState } from "react";
import { motion } from "framer-motion";
import {
  Globe,
  MapPin,
  ShoppingCart,
  Star,
  TrendingUp,
  Filter,
  Search,
  Package,
  Truck,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const REGIONS = [
  {
    code: "US",
    name: "United States",
    flag: "🇺🇸",
    currency: "USD",
    products: 44444,
  },
  { code: "CN", name: "China", flag: "🇨🇳", currency: "CNY", products: 88888 },
  { code: "EU", name: "Europe", flag: "🇪🇺", currency: "EUR", products: 33333 },
  { code: "JP", name: "Japan", flag: "🇯🇵", currency: "JPY", products: 22222 },
  { code: "IN", name: "India", flag: "🇮🇳", currency: "INR", products: 55555 },
  { code: "BR", name: "Brazil", flag: "🇧🇷", currency: "BRL", products: 11111 },
  { code: "AE", name: "UAE", flag: "🇦🇪", currency: "AED", products: 8888 },
  {
    code: "KR",
    name: "South Korea",
    flag: "🇰🇷",
    currency: "KRW",
    products: 16666,
  },
];

const GLOBAL_PRODUCTS = [
  {
    id: 1,
    name: "Xiaomi 14 Ultra",
    price: "$899",
    sky: 20431,
    region: "CN",
    category: "Electronics",
    rating: 4.9,
    reviews: 8888,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop",
    shipping: "7-14 days",
    seller: "Xiaomi Official",
  },
  {
    id: 2,
    name: "Samsung Galaxy S25",
    price: "$1,199",
    sky: 27250,
    region: "KR",
    category: "Electronics",
    rating: 4.8,
    reviews: 4444,
    image:
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=300&h=300&fit=crop",
    shipping: "3-7 days",
    seller: "Samsung Store",
  },
  {
    id: 3,
    name: "Handmade Silk Saree",
    price: "$89",
    sky: 2022,
    region: "IN",
    category: "Fashion",
    rating: 4.7,
    reviews: 1111,
    image:
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=300&h=300&fit=crop",
    shipping: "10-20 days",
    seller: "IndiaHandcraft",
  },
  {
    id: 4,
    name: "Japanese Matcha Set",
    price: "$44",
    sky: 1000,
    region: "JP",
    category: "Food",
    rating: 5.0,
    reviews: 2222,
    image:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300&h=300&fit=crop",
    shipping: "5-10 days",
    seller: "KyotoTea",
  },
  {
    id: 5,
    name: "Dubai Gold Bracelet",
    price: "$444",
    sky: 10090,
    region: "AE",
    category: "Jewelry",
    rating: 4.9,
    reviews: 444,
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300&h=300&fit=crop",
    shipping: "3-5 days",
    seller: "DubaiGold",
  },
  {
    id: 6,
    name: "Brazilian Coffee 1kg",
    price: "$24",
    sky: 545,
    region: "BR",
    category: "Food",
    rating: 4.8,
    reviews: 3333,
    image:
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=300&h=300&fit=crop",
    shipping: "14-21 days",
    seller: "CafeAmazon",
  },
];

const CATEGORIES = [
  "All",
  "Electronics",
  "Fashion",
  "Food",
  "Jewelry",
  "Home",
  "Sports",
];

export default function ShadowWorldMarket() {
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<number[]>([]);
  const [tab, setTab] = useState<"browse" | "regions" | "trending">("browse");

  const filtered = GLOBAL_PRODUCTS.filter(p => {
    const matchRegion = selectedRegion === "All" || p.region === selectedRegion;
    const matchCat = category === "All" || p.category === category;
    const matchSearch =
      !search || p.name.toLowerCase().includes(search.toLowerCase());
    return matchRegion && matchCat && matchSearch;
  });

  const addToCart = (id: number, name: string) => {
    setCart(prev => [...prev, id]);
    toast.success(`Added ${name} to cart!`);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Globe className="h-6 w-6 text-blue-400" />
            World Market
          </h1>
          <p className="text-sm text-muted-foreground">
            Shop globally — pay with SKY4444 or local currency
          </p>
        </div>
        <Button
          size="sm"
          className="h-9 text-xs bg-blue-600 text-white border-0 font-bold"
          onClick={() => toast.info(`Cart: ${cart.length} items`)}
        >
          <ShoppingCart className="h-4 w-4 mr-1" />({cart.length})
        </Button>
      </div>

      <div className="flex gap-2">
        {(["browse", "regions", "trending"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "regions" && (
        <div className="grid grid-cols-2 gap-2">
          {REGIONS.map((region, i) => (
            <motion.div
              key={region.code}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card
                className={`border cursor-pointer transition-all ${selectedRegion === region.code ? "border-blue-500/40 bg-blue-900/10" : "border-border/50 hover:border-blue-500/20"}`}
                onClick={() => {
                  setSelectedRegion(region.code);
                  setTab("browse");
                }}
              >
                <CardContent className="py-3 px-3 flex items-center gap-2">
                  <span className="text-2xl">{region.flag}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-xs truncate">{region.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {region.currency} · {region.products.toLocaleString()}{" "}
                      items
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          <Card
            className={`border cursor-pointer transition-all col-span-2 ${selectedRegion === "All" ? "border-blue-500/40 bg-blue-900/10" : "border-border/50"}`}
            onClick={() => {
              setSelectedRegion("All");
              setTab("browse");
            }}
          >
            <CardContent className="py-3 px-3 text-center">
              <p className="font-bold text-sm">🌍 All Regions</p>
              <p className="text-xs text-muted-foreground">
                280,000+ products worldwide
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "browse" && (
        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search global products..."
                className="h-9 pl-9 text-xs"
              />
            </div>
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {CATEGORIES.map(c => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${category === c ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground"}`}
              >
                {c}
              </button>
            ))}
          </div>
          {selectedRegion !== "All" && (
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-xs">
                {REGIONS.find(r => r.code === selectedRegion)?.flag}{" "}
                {REGIONS.find(r => r.code === selectedRegion)?.name}
              </Badge>
              <button
                className="text-xs text-muted-foreground underline"
                onClick={() => setSelectedRegion("All")}
              >
                Clear
              </button>
            </div>
          )}
          <div className="grid grid-cols-2 gap-3">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Card className="border-border/50 hover:border-blue-500/20 transition-all overflow-hidden">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-28 object-cover"
                      onError={e => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop";
                      }}
                    />
                    <Badge className="absolute top-2 left-2 text-xs bg-background/80 text-foreground border-0">
                      {REGIONS.find(r => r.code === product.region)?.flag}
                    </Badge>
                  </div>
                  <CardContent className="py-2.5 px-3">
                    <p className="font-bold text-xs leading-tight mb-1">
                      {product.name}
                    </p>
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-bold">
                        {product.rating}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({product.reviews})
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      <Truck className="h-3 w-3 inline mr-1" />
                      {product.shipping}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="font-black text-sm text-blue-400">
                        {product.price}
                      </p>
                      <Button
                        size="sm"
                        className="h-7 text-xs bg-blue-600 text-white border-0 font-bold px-2"
                        onClick={() => addToCart(product.id, product.name)}
                      >
                        Add
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {tab === "trending" && (
        <div className="space-y-2">
          <p className="text-xs font-bold text-muted-foreground">
            TRENDING GLOBALLY THIS WEEK
          </p>
          {[
            {
              rank: 1,
              name: "Xiaomi 14 Ultra",
              region: "🇨🇳",
              change: "+444%",
              price: "$899",
            },
            {
              rank: 2,
              name: "Dubai Gold Bracelet",
              region: "🇦🇪",
              change: "+188%",
              price: "$444",
            },
            {
              rank: 3,
              name: "Japanese Matcha Set",
              region: "🇯🇵",
              change: "+144%",
              price: "$44",
            },
            {
              rank: 4,
              name: "Samsung Galaxy S25",
              region: "🇰🇷",
              change: "+88%",
              price: "$1,199",
            },
            {
              rank: 5,
              name: "Brazilian Coffee 1kg",
              region: "🇧🇷",
              change: "+44%",
              price: "$24",
            },
          ].map(item => (
            <Card key={item.rank} className="border-border/50">
              <CardContent className="py-3 px-4 flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center font-black text-sm text-blue-400 shrink-0">
                  #{item.rank}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.region} · {item.price}
                  </p>
                </div>
                <p className="text-xs font-bold text-green-400">
                  {item.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
