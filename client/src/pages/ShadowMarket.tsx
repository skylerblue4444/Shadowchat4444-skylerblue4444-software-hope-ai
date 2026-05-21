import { useState } from "react";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Star,
  Truck,
  Shield,
  Zap,
  Search,
  Filter,
  Heart,
  ShoppingCart,
  ChevronRight,
  Tag,
  Clock,
  TrendingUp,
  Package,
  Globe,
  Coins,
  Check,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const CATEGORIES = [
  { id: "all", label: "All", emoji: "🛍️" },
  { id: "electronics", label: "Electronics", emoji: "📱" },
  { id: "crypto", label: "Crypto Gear", emoji: "₿" },
  { id: "fashion", label: "Fashion", emoji: "👕" },
  { id: "gaming", label: "Gaming", emoji: "🎮" },
  { id: "home", label: "Home & Office", emoji: "🏠" },
  { id: "nft", label: "NFT Merch", emoji: "🎨" },
  { id: "it", label: "IT Equipment", emoji: "💻" },
];

const DEALS = [
  {
    label: "Flash Sale",
    emoji: "⚡",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    ends: "02:44:28",
  },
  {
    label: "Daily Deal",
    emoji: "🔥",
    color: "text-red-400",
    bg: "bg-red-500/10",
    ends: "08:12:44",
  },
  {
    label: "Crypto Discount",
    emoji: "₿",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    ends: "24:00:00",
  },
];

const PRODUCTS = [
  {
    id: "p1",
    name: "Ledger Nano X Hardware Wallet",
    category: "crypto",
    price: 149,
    originalPrice: 179,
    rating: 4.9,
    reviews: 12840,
    emoji: "🔒",
    badge: "Best Seller",
    badgeColor: "bg-yellow-500/10 text-yellow-400",
    shipping: "Free",
    delivery: "2-3 days",
    inStock: true,
    cryptoDiscount: 10,
    seller: "CryptoSecure",
    sellerRating: 4.9,
  },
  {
    id: "p2",
    name: 'Gaming Monitor 27" 4K 144Hz',
    category: "gaming",
    price: 449,
    originalPrice: 599,
    rating: 4.8,
    reviews: 4284,
    emoji: "🖥️",
    badge: "Deal",
    badgeColor: "bg-red-500/10 text-red-400",
    shipping: "Free",
    delivery: "1-2 days",
    inStock: true,
    cryptoDiscount: 15,
    seller: "TechWorld",
    sellerRating: 4.7,
  },
  {
    id: "p3",
    name: "ShadowChat Official Hoodie — SKY4444 Edition",
    category: "fashion",
    price: 84,
    originalPrice: 99,
    rating: 4.7,
    reviews: 844,
    emoji: "👕",
    badge: "New",
    badgeColor: "bg-blue-500/10 text-blue-400",
    shipping: "Free $50+",
    delivery: "3-5 days",
    inStock: true,
    cryptoDiscount: 20,
    seller: "ShadowMerch",
    sellerRating: 5.0,
  },
  {
    id: "p4",
    name: "iPhone 16 Pro Max 256GB",
    category: "electronics",
    price: 1199,
    originalPrice: 1299,
    rating: 4.9,
    reviews: 28400,
    emoji: "📱",
    badge: "Hot",
    badgeColor: "bg-orange-500/10 text-orange-400",
    shipping: "Free",
    delivery: "Next day",
    inStock: true,
    cryptoDiscount: 5,
    seller: "TechStore",
    sellerRating: 4.8,
  },
  {
    id: "p5",
    name: "Mechanical Keyboard — RGB Backlit",
    category: "gaming",
    price: 129,
    originalPrice: 159,
    rating: 4.6,
    reviews: 2840,
    emoji: "⌨️",
    badge: null,
    badgeColor: "",
    shipping: "Free $50+",
    delivery: "2-4 days",
    inStock: true,
    cryptoDiscount: 8,
    seller: "GamerGear",
    sellerRating: 4.6,
  },
  {
    id: "p6",
    name: "Standing Desk — Electric Height Adjustable",
    category: "home",
    price: 399,
    originalPrice: 549,
    rating: 4.8,
    reviews: 1284,
    emoji: "🪑",
    badge: "Flash Sale",
    badgeColor: "bg-yellow-500/10 text-yellow-400",
    shipping: "Free",
    delivery: "5-7 days",
    inStock: false,
    cryptoDiscount: 12,
    seller: "HomeOffice",
    sellerRating: 4.7,
  },
  {
    id: "p7",
    name: "NFT Art Print — ShadowChain Genesis #001",
    category: "nft",
    price: 444,
    originalPrice: 444,
    rating: 5.0,
    reviews: 44,
    emoji: "🖼️",
    badge: "1-of-1",
    badgeColor: "bg-purple-500/10 text-purple-400",
    shipping: "Digital",
    delivery: "Instant",
    inStock: true,
    cryptoDiscount: 0,
    seller: "CryptoArtist",
    sellerRating: 5.0,
  },
  {
    id: "p8",
    name: "Dell XPS 15 Laptop — Core i9",
    category: "it",
    price: 1899,
    originalPrice: 2199,
    rating: 4.8,
    reviews: 3284,
    emoji: "💻",
    badge: "IT Pick",
    badgeColor: "bg-blue-500/10 text-blue-400",
    shipping: "Free",
    delivery: "2-3 days",
    inStock: true,
    cryptoDiscount: 10,
    seller: "SkyBlueIT",
    sellerRating: 4.9,
  },
];

export default function ShadowMarket() {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<
    "popular" | "price_asc" | "price_desc" | "rating"
  >("popular");

  const addToCart = (id: string, name: string) => {
    setCart(prev => [...prev, id]);
    toast.success(`${name} added to cart! 🛒`);
  };

  const toggleWishlist = (id: string) => {
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id]
    );
  };

  let displayProducts = PRODUCTS.filter(
    p =>
      (category === "all" || p.category === category) &&
      p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (sortBy === "price_asc") displayProducts.sort((a, b) => a.price - b.price);
  else if (sortBy === "price_desc")
    displayProducts.sort((a, b) => b.price - a.price);
  else if (sortBy === "rating")
    displayProducts.sort((a, b) => b.rating - a.rating);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-orange-400" />
            ShadowMarket
          </h1>
          <p className="text-sm text-muted-foreground">
            Shop with crypto — earn SKY4444 on every purchase
          </p>
        </div>
        <button
          className="relative h-10 w-10 rounded-xl bg-muted flex items-center justify-center"
          onClick={() => toast.info(`${cart.length} items in cart`)}
        >
          <ShoppingCart className="h-5 w-5" />
          {cart.length > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-orange-600 text-white border-0 rounded-full flex items-center justify-center">
              {cart.length}
            </Badge>
          )}
        </button>
      </div>

      {/* Search */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search ShadowMarket..."
            className="pl-10 h-10"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select
          className="px-3 h-10 rounded-xl bg-muted border border-border/50 text-xs"
          value={sortBy}
          onChange={e => setSortBy(e.target.value as typeof sortBy)}
        >
          <option value="popular">Popular</option>
          <option value="price_asc">Price ↑</option>
          <option value="price_desc">Price ↓</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      {/* Flash Deals */}
      <div className="grid grid-cols-3 gap-2">
        {DEALS.map(deal => (
          <Card
            key={deal.label}
            className="border-border/50 cursor-pointer hover:border-border/80 transition-colors"
            onClick={() => toast.info(`${deal.label} deals...`)}
          >
            <CardContent className="py-2.5 px-3 text-center">
              <span className="text-xl">{deal.emoji}</span>
              <p className="font-bold text-xs mt-0.5">{deal.label}</p>
              <p className={`text-xs font-mono font-bold ${deal.color}`}>
                {deal.ends}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Crypto Payment Banner */}
      <div className="p-3 rounded-xl bg-gradient-to-r from-orange-900/20 to-yellow-900/20 border border-orange-500/20 flex items-center gap-3">
        <Coins className="h-5 w-5 text-yellow-400 shrink-0" />
        <div className="flex-1">
          <p className="text-xs font-bold">
            Pay with SKY4444, BTC, ETH, DOGE — Get up to 20% off!
          </p>
          <p className="text-xs text-muted-foreground">
            Earn 1% cashback in SKY4444 on every purchase
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors shrink-0 ${category === cat.id ? "bg-orange-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            <span>{cat.emoji}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayProducts.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="border-border/50 hover:border-orange-500/20 transition-all h-full">
              <CardContent className="pt-4 pb-4 flex flex-col h-full">
                <div className="flex items-start gap-3 mb-3">
                  <div className="h-16 w-16 rounded-2xl bg-muted/30 flex items-center justify-center text-4xl shrink-0 relative">
                    {product.emoji}
                    <button
                      className={`absolute -top-1.5 -right-1.5 h-6 w-6 rounded-full flex items-center justify-center transition-colors ${wishlist.includes(product.id) ? "bg-red-500 text-white" : "bg-muted text-muted-foreground"}`}
                      onClick={() => toggleWishlist(product.id)}
                    >
                      <Heart className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-1">
                      <p className="font-black text-sm leading-tight">
                        {product.name}
                      </p>
                      {product.badge && (
                        <Badge
                          className={`text-xs shrink-0 ${product.badgeColor}`}
                        >
                          {product.badge}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      {[...Array(5)].map((_, j) => (
                        <Star
                          key={j}
                          className={`h-3 w-3 ${j < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`}
                        />
                      ))}
                      <span className="text-xs text-muted-foreground">
                        ({product.reviews.toLocaleString()})
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      by {product.seller} ⭐{product.sellerRating}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Truck className="h-3 w-3" />
                    {product.shipping} shipping
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {product.delivery}
                  </div>
                  {product.cryptoDiscount > 0 && (
                    <Badge className="text-xs bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                      -{product.cryptoDiscount}% crypto
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-black text-lg">
                        ${product.price}
                      </span>
                    </div>
                    {product.originalPrice > product.price && (
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-muted-foreground line-through">
                          ${product.originalPrice}
                        </span>
                        <Badge className="text-xs bg-red-500/10 text-red-400 border-red-500/20">
                          -
                          {Math.round(
                            (1 - product.price / product.originalPrice) * 100
                          )}
                          %
                        </Badge>
                      </div>
                    )}
                  </div>
                  <Button
                    size="sm"
                    className={`h-9 text-xs font-bold ${product.inStock ? "bg-orange-600 text-white border-0" : "bg-muted text-muted-foreground"}`}
                    disabled={!product.inStock}
                    onClick={() => addToCart(product.id, product.name)}
                  >
                    {product.inStock ? (
                      <>
                        <ShoppingCart className="h-3.5 w-3.5 mr-1.5" />
                        Add to Cart
                      </>
                    ) : (
                      "Out of Stock"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Sell CTA */}
      <Card className="border-orange-500/20 bg-orange-500/3">
        <CardContent className="py-4 text-center">
          <p className="font-black text-sm mb-1">🛍️ Sell on ShadowMarket</p>
          <p className="text-xs text-muted-foreground mb-3">
            List your products and accept crypto payments. 0% fees for SKY4444
            holders.
          </p>
          <Button
            size="sm"
            className="bg-orange-600 text-white border-0"
            onClick={() => toast.success("Opening seller registration...")}
          >
            Start Selling
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
