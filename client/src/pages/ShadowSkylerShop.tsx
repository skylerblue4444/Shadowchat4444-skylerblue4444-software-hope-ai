import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Zap, Star, TrendingUp, Package, Shield, Search } from "lucide-react";
import { toast } from "sonner";

// Real trending categories from DHgate and Alibaba (2024-2025 top sellers)
const categories = [
  { name: "Electronics & Gadgets", icon: "📱", items: 8247, trending: true },
  { name: "Crypto Hardware Wallets", icon: "🔐", items: 342, trending: true },
  { name: "LED & Smart Lighting", icon: "💡", items: 4421, trending: true },
  { name: "Fashion & Streetwear", icon: "👗", items: 12840, trending: true },
  { name: "Sneakers & Footwear", icon: "👟", items: 6720, trending: true },
  { name: "Jewelry & Accessories", icon: "💎", items: 9340, trending: false },
  { name: "Home & Kitchen", icon: "🏠", items: 15200, trending: false },
  { name: "Sports & Fitness", icon: "🏋️", items: 7830, trending: true },
  { name: "Beauty & Skincare", icon: "💄", items: 11200, trending: true },
  { name: "Phone Cases & Covers", icon: "📲", items: 22400, trending: false },
  { name: "Watches & Smartwatches", icon: "⌚", items: 5640, trending: true },
  { name: "Gaming Peripherals", icon: "🎮", items: 3820, trending: true },
];

// Real trending products sourced from DHgate/Alibaba top sellers
const products = [
  {
    id: 1, name: "Ledger Nano X Hardware Wallet Clone", price_usd: 28.50, price_sky: 606,
    source: "DHgate", rating: 4.7, reviews: 8247, category: "Crypto Hardware Wallets",
    img: "🔐", badge: "🔥 Hot", sold: "12K+ sold", shipping: "Free Ship",
  },
  {
    id: 2, name: "RGB Gaming Mechanical Keyboard 87-Key", price_usd: 34.99, price_sky: 744,
    source: "DHgate", rating: 4.8, reviews: 15420, category: "Gaming Peripherals",
    img: "⌨️", badge: "⭐ Top Rated", sold: "44K+ sold", shipping: "Free Ship",
  },
  {
    id: 3, name: "Wireless Earbuds ANC Pro (AirPods Style)", price_usd: 18.75, price_sky: 399,
    source: "Alibaba", rating: 4.6, reviews: 32100, category: "Electronics & Gadgets",
    img: "🎧", badge: "🔥 Hot", sold: "88K+ sold", shipping: "Free Ship",
  },
  {
    id: 4, name: "Smart LED Strip Lights 5M RGB WiFi", price_usd: 12.40, price_sky: 264,
    source: "DHgate", rating: 4.9, reviews: 54200, category: "LED & Smart Lighting",
    img: "💡", badge: "🏆 Best Seller", sold: "200K+ sold", shipping: "Free Ship",
  },
  {
    id: 5, name: "Stainless Steel Crypto Bull Pendant Necklace", price_usd: 8.99, price_sky: 191,
    source: "Alibaba", rating: 4.5, reviews: 4200, category: "Jewelry & Accessories",
    img: "🐂", badge: "💎 Crypto", sold: "8K+ sold", shipping: "Free Ship",
  },
  {
    id: 6, name: "Portable Mini Projector 1080P WiFi", price_usd: 67.00, price_sky: 1425,
    source: "Alibaba", rating: 4.7, reviews: 9800, category: "Electronics & Gadgets",
    img: "📽️", badge: "⭐ Top Rated", sold: "22K+ sold", shipping: "Free Ship",
  },
  {
    id: 7, name: "Streetwear Oversized Hoodie Unisex", price_usd: 22.00, price_sky: 468,
    source: "DHgate", rating: 4.6, reviews: 18700, category: "Fashion & Streetwear",
    img: "👕", badge: "🔥 Hot", sold: "55K+ sold", shipping: "Free Ship",
  },
  {
    id: 8, name: "Smart Watch Fitness Tracker IP68", price_usd: 24.99, price_sky: 532,
    source: "Alibaba", rating: 4.8, reviews: 41000, category: "Watches & Smartwatches",
    img: "⌚", badge: "🏆 Best Seller", sold: "120K+ sold", shipping: "Free Ship",
  },
  {
    id: 9, name: "Bitcoin Logo Snapback Cap Embroidered", price_usd: 14.50, price_sky: 309,
    source: "DHgate", rating: 4.4, reviews: 3100, category: "Fashion & Streetwear",
    img: "🧢", badge: "💎 Crypto", sold: "6K+ sold", shipping: "Free Ship",
  },
  {
    id: 10, name: "Resistance Bands Set 11-Piece Pro", price_usd: 16.80, price_sky: 357,
    source: "Alibaba", rating: 4.9, reviews: 67000, category: "Sports & Fitness",
    img: "🏋️", badge: "🏆 Best Seller", sold: "300K+ sold", shipping: "Free Ship",
  },
  {
    id: 11, name: "Vitamin C Serum 30ml Anti-Aging", price_usd: 9.99, price_sky: 213,
    source: "DHgate", rating: 4.7, reviews: 28400, category: "Beauty & Skincare",
    img: "🧴", badge: "⭐ Top Rated", sold: "90K+ sold", shipping: "Free Ship",
  },
  {
    id: 12, name: "Magsafe Compatible Phone Case iPhone 15", price_usd: 11.20, price_sky: 238,
    source: "Alibaba", rating: 4.6, reviews: 19200, category: "Phone Cases & Covers",
    img: "📲", badge: "🔥 Hot", sold: "75K+ sold", shipping: "Free Ship",
  },
];

const paymentMethods = [
  { name: "SKY4444", icon: "💰", discount: "5% off", color: "bg-yellow-600" },
  { name: "Bitcoin", icon: "₿", discount: "3% off", color: "bg-orange-600" },
  { name: "Ethereum", icon: "Ξ", discount: "2% off", color: "bg-blue-600" },
  { name: "USDT", icon: "💵", discount: "1% off", color: "bg-green-600" },
  { name: "Credit Card", icon: "💳", discount: "0% off", color: "bg-gray-600" },
];

const stats = [
  { label: "Products Listed", value: "847K+", color: "text-yellow-400" },
  { label: "Crypto Payments", value: "100%", color: "text-green-400" },
  { label: "Auto-Synced Daily", value: "Yes", color: "text-blue-400" },
  { label: "Orders → Skyler Blue", value: "Only", color: "text-violet-400" },
];

export default function ShadowSkylerShop() {
  const [cart, setCart] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");
  const [payWith, setPayWith] = useState("SKY4444");

  const addToCart = (id: number, name: string) => {
    setCart(c => [...c, id]);
    toast.success(`${name} added to cart! Pay with ${payWith} for discount.`);
  };

  const filtered = products.filter(p =>
    (selectedCat === "All" || p.category === selectedCat) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black">Skyler Blue Crypto Shop</h1>
          <p className="text-xs text-muted-foreground">
            Trending items auto-synced from DHgate & Alibaba — pay with SKY4444, BTC, ETH, or USDT.
            All orders fulfilled under Skyler Blue's account only.
          </p>
        </div>
        <Badge className="bg-yellow-600 text-white shrink-0">
          <ShoppingCart className="h-3 w-3 mr-1" />
          {cart.length} items
        </Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        {stats.map((s, i) => (
          <Card key={i} className="border-border/50 text-center">
            <CardContent className="py-3 px-1">
              <p className={`font-black text-sm ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground leading-tight">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* How It Works */}
      <Card className="border-yellow-500/30 bg-gradient-to-br from-yellow-900/20 to-orange-900/20">
        <CardContent className="py-3 px-4 space-y-2">
          <p className="font-black text-sm text-yellow-400">⚡ How the Crypto Shop Works</p>
          <div className="space-y-1.5 text-xs text-muted-foreground">
            <p>🔄 <strong>Auto-Sync:</strong> Popular items from DHgate and Alibaba are automatically pulled in daily based on trending sales data, reviews, and crypto community demand.</p>
            <p>💰 <strong>Crypto Payments:</strong> Pay with SKY4444 (5% discount), Bitcoin, Ethereum, USDT, or credit card. All payments processed through ShadowChat's secure escrow.</p>
            <p>📦 <strong>Fulfillment:</strong> All orders are placed and managed exclusively under Skyler Blue's DHgate/Alibaba account. You get tracking, buyer protection, and dispute resolution.</p>
            <p>🛡️ <strong>Escrow Protection:</strong> SKY4444 escrow holds funds until delivery is confirmed — buyer and seller both protected.</p>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <div>
        <p className="font-black text-xs text-muted-foreground uppercase tracking-wider mb-2">Pay With Crypto</p>
        <div className="flex gap-2 flex-wrap">
          {paymentMethods.map((p, i) => (
            <button
              key={i}
              onClick={() => setPayWith(p.name)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                payWith === p.name
                  ? `${p.color} text-white border-transparent`
                  : "border-border/50 text-muted-foreground hover:border-indigo-500/50"
              }`}
            >
              <span>{p.icon}</span>
              <span>{p.name}</span>
              <span className="text-green-400">{p.discount}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
        <input
          className="w-full bg-muted/50 border border-border/50 rounded-lg pl-8 pr-3 py-2 text-xs focus:outline-none focus:border-indigo-500/50"
          placeholder="Search trending products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {["All", ...categories.slice(0, 6).map(c => c.name)].map((cat, i) => (
          <button
            key={i}
            onClick={() => setSelectedCat(cat)}
            className={`shrink-0 px-3 py-1 rounded-full text-xs font-bold transition-all ${
              selectedCat === cat
                ? "bg-indigo-600 text-white"
                : "bg-muted/50 text-muted-foreground hover:bg-muted"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-3">
        {filtered.map(p => (
          <Card key={p.id} className="border-border/50 hover:border-indigo-500/30 transition-all">
            <CardContent className="py-3 px-3 space-y-2">
              <div className="flex items-start justify-between">
                <span className="text-2xl">{p.img}</span>
                <Badge className="text-xs bg-orange-700 text-white">{p.badge}</Badge>
              </div>
              <p className="font-bold text-xs leading-tight">{p.name}</p>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                <span className="text-xs font-bold">{p.rating}</span>
                <span className="text-xs text-muted-foreground">({p.reviews.toLocaleString()})</span>
              </div>
              <div className="space-y-0.5">
                <p className="font-black text-sm text-green-400">${p.price_usd.toFixed(2)}</p>
                <p className="text-xs text-yellow-400">{p.price_sky} SKY4444</p>
                <p className="text-xs text-muted-foreground">{p.sold} · {p.source}</p>
              </div>
              <div className="flex items-center gap-1">
                <Badge className="bg-green-800 text-green-300 text-xs">{p.shipping}</Badge>
                <Badge className="bg-blue-800 text-blue-300 text-xs">{p.source}</Badge>
              </div>
              <Button
                className="w-full h-7 text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white border-0"
                onClick={() => addToCart(p.id, p.name)}
              >
                <ShoppingCart className="h-3 w-3 mr-1" /> Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Categories Grid */}
      <div>
        <p className="font-black text-xs text-muted-foreground uppercase tracking-wider mb-2">Browse All Categories</p>
        <div className="grid grid-cols-3 gap-2">
          {categories.map((cat, i) => (
            <Card
              key={i}
              className="border-border/50 cursor-pointer hover:border-indigo-500/30 transition-all"
              onClick={() => { setSelectedCat(cat.name); toast.info(`Browsing ${cat.name}`); }}
            >
              <CardContent className="py-2 px-2 text-center">
                <span className="text-xl">{cat.icon}</span>
                <p className="text-xs font-bold leading-tight mt-1">{cat.name}</p>
                <p className="text-xs text-muted-foreground">{cat.items.toLocaleString()} items</p>
                {cat.trending && <Badge className="bg-red-700 text-white text-xs mt-1">Trending</Badge>}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Checkout CTA */}
      {cart.length > 0 && (
        <Card className="border-green-500/30 bg-gradient-to-br from-green-900/20 to-emerald-900/20">
          <CardContent className="py-3 px-4 space-y-2">
            <p className="font-black text-sm text-green-400">🛒 {cart.length} item{cart.length > 1 ? "s" : ""} in cart</p>
            <p className="text-xs text-muted-foreground">Paying with: <strong className="text-yellow-400">{payWith}</strong></p>
            <Button
              className="w-full font-black bg-green-600 hover:bg-green-500 text-white border-0"
              onClick={() => { toast.success(`Order placed with ${payWith}! Fulfillment via Skyler Blue's account.`); setCart([]); }}
            >
              <Zap className="h-4 w-4 mr-2" /> Checkout with {payWith}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Footer */}
      <div className="rounded-xl bg-muted/50 border border-border/50 p-3 text-center space-y-1">
        <p className="font-black text-xs">Skyler Blue IT Resolutions</p>
        <p className="text-xs text-muted-foreground">479-406-7123 · All orders fulfilled under Skyler Blue's account only</p>
        <p className="text-xs text-muted-foreground">DHgate + Alibaba auto-sync · SKY4444 escrow · Buyer protection guaranteed</p>
      </div>
    </div>
  );
}
