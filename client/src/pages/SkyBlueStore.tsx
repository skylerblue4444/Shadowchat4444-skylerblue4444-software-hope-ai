import { useState } from "react";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Star,
  Shield,
  Zap,
  Monitor,
  Wifi,
  Server,
  HardDrive,
  Headphones,
  Package,
  CheckCircle,
  ChevronRight,
  Filter,
  Search,
  Tag,
  Truck,
  RefreshCw,
  Lock,
  Phone,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const CATEGORIES = [
  { id: "all", label: "All Products", emoji: "🛒" },
  { id: "hardware", label: "Hardware", emoji: "💻" },
  { id: "networking", label: "Networking", emoji: "🌐" },
  { id: "security", label: "Security", emoji: "🔒" },
  { id: "software", label: "Software", emoji: "📦" },
  { id: "services", label: "Services", emoji: "⚙️" },
  { id: "accessories", label: "Accessories", emoji: "🎧" },
];

const PRODUCTS = [
  {
    id: "p1",
    name: "SkyBlue Managed IT Pro Plan",
    category: "services",
    price: 299,
    originalPrice: 399,
    unit: "/mo",
    emoji: "⚡",
    rating: 4.9,
    reviews: 284,
    badge: "Best Seller",
    badgeColor: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    features: [
      "Unlimited helpdesk support",
      "24/7 monitoring",
      "Monthly security audit",
      "Cloud backup 1TB",
      "Up to 25 devices",
    ],
    inStock: true,
  },
  {
    id: "p2",
    name: "Enterprise Firewall — Cisco ASA 5506-X",
    category: "security",
    price: 1249,
    originalPrice: 1599,
    unit: "",
    emoji: "🔒",
    rating: 4.8,
    reviews: 128,
    badge: "Top Rated",
    badgeColor: "bg-green-500/10 text-green-400 border-green-500/20",
    features: [
      "Next-gen firewall",
      "IPS/IDS included",
      "VPN support",
      "1Gbps throughput",
      "1-year warranty",
    ],
    inStock: true,
  },
  {
    id: "p3",
    name: "Business WiFi 6 Access Point — Ubiquiti UniFi",
    category: "networking",
    price: 189,
    originalPrice: 229,
    unit: "",
    emoji: "📡",
    rating: 4.9,
    reviews: 412,
    badge: "New",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    features: [
      "WiFi 6 (802.11ax)",
      "4x4 MU-MIMO",
      "Up to 300 clients",
      "PoE powered",
      "Cloud managed",
    ],
    inStock: true,
  },
  {
    id: "p4",
    name: "NAS Storage Server — Synology DS923+",
    category: "hardware",
    price: 699,
    originalPrice: 799,
    unit: "",
    emoji: "🗄️",
    rating: 4.7,
    reviews: 89,
    badge: null,
    badgeColor: "",
    features: [
      "4-bay NAS",
      "AMD Ryzen R1600",
      "4GB ECC RAM",
      "10GbE ready",
      "Surveillance Station",
    ],
    inStock: true,
  },
  {
    id: "p5",
    name: "Microsoft 365 Business Premium",
    category: "software",
    price: 22,
    originalPrice: 26,
    unit: "/user/mo",
    emoji: "📊",
    rating: 4.6,
    reviews: 1284,
    badge: "Popular",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    features: [
      "Word/Excel/PowerPoint",
      "Teams & Exchange",
      "1TB OneDrive",
      "Intune MDM",
      "Azure AD P1",
    ],
    inStock: true,
  },
  {
    id: "p6",
    name: "SkyBlue Cybersecurity Audit",
    category: "services",
    price: 1499,
    originalPrice: 2499,
    unit: "",
    emoji: "🛡️",
    rating: 5.0,
    reviews: 44,
    badge: "Limited",
    badgeColor: "bg-red-500/10 text-red-400 border-red-500/20",
    features: [
      "Full network penetration test",
      "Vulnerability report",
      "Remediation roadmap",
      "Executive briefing",
      "30-day follow-up",
    ],
    inStock: true,
  },
  {
    id: "p7",
    name: "Managed Cloud Backup — 5TB",
    category: "services",
    price: 49,
    originalPrice: 79,
    unit: "/mo",
    emoji: "☁️",
    rating: 4.8,
    reviews: 192,
    badge: null,
    badgeColor: "",
    features: [
      "5TB cloud storage",
      "Automated daily backups",
      "30-day retention",
      "Instant restore",
      "AES-256 encryption",
    ],
    inStock: true,
  },
  {
    id: "p8",
    name: "Noise-Canceling Headset — Jabra Evolve2 85",
    category: "accessories",
    price: 379,
    originalPrice: 449,
    unit: "",
    emoji: "🎧",
    rating: 4.7,
    reviews: 328,
    badge: "Staff Pick",
    badgeColor: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    features: [
      "Active noise cancellation",
      "37hr battery",
      "Bluetooth 5.2",
      "Teams certified",
      "Leather ear cushions",
    ],
    inStock: false,
  },
];

export default function SkyBlueStore() {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<
    "popular" | "price_asc" | "price_desc" | "rating"
  >("popular");

  const addToCart = (id: string, name: string) => {
    setCart(prev => [...prev, id]);
    toast.success(`${name} added to cart! 🛒`);
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
            <ShoppingCart className="h-6 w-6 text-blue-400" />
            SkyBlue IT Store
          </h1>
          <p className="text-sm text-muted-foreground">
            Skyler Blue's Innovative IT Resolutions · 479-406-7123
          </p>
        </div>
        <button
          className="relative h-10 w-10 rounded-xl bg-muted flex items-center justify-center"
          onClick={() => toast.info(`${cart.length} items in cart`)}
        >
          <ShoppingCart className="h-5 w-5" />
          {cart.length > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-blue-600 text-white border-0 rounded-full flex items-center justify-center">
              {cart.length}
            </Badge>
          )}
        </button>
      </div>

      {/* Promo Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/20">
        <div className="flex items-center gap-3">
          <span className="text-3xl">⚡</span>
          <div>
            <p className="font-black text-sm">
              Pay with SKY4444 — Get 10% Extra Discount!
            </p>
            <p className="text-xs text-muted-foreground">
              All products available with crypto payment: BTC, ETH, DOGE,
              SKY4444
            </p>
          </div>
          <Button
            size="sm"
            className="ml-auto bg-blue-600 text-white border-0 shrink-0 h-8 text-xs"
            onClick={() => toast.info("Crypto payment info...")}
          >
            Learn More
          </Button>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-3 gap-2">
        {[
          {
            icon: Shield,
            label: "Certified IT Partner",
            color: "text-green-400",
          },
          { icon: Truck, label: "Free Shipping $500+", color: "text-blue-400" },
          {
            icon: RefreshCw,
            label: "30-Day Returns",
            color: "text-purple-400",
          },
        ].map(({ icon: Icon, label, color }) => (
          <div
            key={label}
            className="flex items-center gap-2 p-2 rounded-xl bg-muted/20 border border-border/30"
          >
            <Icon className={`h-4 w-4 ${color} shrink-0`} />
            <p className="text-xs font-medium">{label}</p>
          </div>
        ))}
      </div>

      {/* Search & Sort */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-8 h-9 text-sm"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select
          className="px-3 h-9 rounded-xl bg-muted border border-border/50 text-xs"
          value={sortBy}
          onChange={e => setSortBy(e.target.value as typeof sortBy)}
        >
          <option value="popular">Most Popular</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors shrink-0 ${category === cat.id ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            <span>{cat.emoji}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayProducts.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <Card className="border-border/50 hover:border-blue-500/30 transition-all h-full">
              <CardContent className="pt-4 pb-4 flex flex-col h-full">
                <div className="flex items-start gap-3 mb-3">
                  <div className="h-14 w-14 rounded-2xl bg-muted/30 flex items-center justify-center text-4xl shrink-0">
                    {product.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
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
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, j) => (
                        <Star
                          key={j}
                          className={`h-3 w-3 ${j < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`}
                        />
                      ))}
                      <span className="text-xs text-muted-foreground">
                        ({product.reviews})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1 mb-3 flex-1">
                  {product.features.slice(0, 3).map(feat => (
                    <div
                      key={feat}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground"
                    >
                      <CheckCircle className="h-3 w-3 text-green-400 shrink-0" />
                      {feat}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-black text-lg">
                        ${product.price.toLocaleString()}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {product.unit}
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
                    className={`h-9 text-xs font-bold ${product.inStock ? "bg-blue-600 text-white border-0" : "bg-muted text-muted-foreground"}`}
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

      {/* Contact CTA */}
      <Card className="border-blue-500/20 bg-blue-500/3">
        <CardContent className="py-4 px-4 text-center">
          <p className="font-black text-sm mb-1">Need a Custom IT Solution?</p>
          <p className="text-xs text-muted-foreground mb-3">
            Talk to Skyler Blue directly for enterprise pricing and custom
            configurations
          </p>
          <div className="flex gap-2 justify-center">
            <Button
              size="sm"
              className="h-8 text-xs bg-blue-600 text-white border-0"
              onClick={() => toast.success("Calling 479-406-7123...")}
            >
              <Phone className="h-3.5 w-3.5 mr-1.5" />
              479-406-7123
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-8 text-xs"
              onClick={() => toast.success("Opening email...")}
            >
              skylerblue4444@gmail.com
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
