import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingCart,
  Heart,
  Star,
  Filter,
  ChevronDown,
  Package,
  Truck,
  Shield,
  RefreshCw,
  Zap,
  TrendingUp,
  Eye,
  Share2,
  ChevronLeft,
  ChevronRight,
  X,
  Plus,
  Minus,
  CheckCircle,
  Globe,
  Award,
  Clock,
  ArrowRight,
  Tag,
  Flame,
  SlidersHorizontal,
  Grid3X3,
  List,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

// ─── Product Data (DHgate/Alibaba style) ────────────────────────────────────
const PRODUCTS = [
  {
    id: 1,
    title: "Wireless Earbuds Pro Max TWS Bluetooth 5.3 Noise Cancelling",
    price: 12.99,
    originalPrice: 45.0,
    rating: 4.7,
    reviews: 8432,
    sold: 52000,
    supplier: "ShenZhen AudioTech",
    origin: "China",
    minOrder: 1,
    shipping: "Free Shipping",
    shippingDays: "7-15 days",
    category: "Electronics",
    badge: "Best Seller",
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=400&fit=crop",
    ],
    description:
      "Premium TWS earbuds with active noise cancellation, 40hr battery life, IPX5 waterproof. Compatible with iOS and Android.",
    specs: {
      Battery: "40 hours total",
      Connectivity: "Bluetooth 5.3",
      "Water Resistance": "IPX5",
      Driver: "13mm dynamic",
    },
    verified: true,
    topSupplier: true,
  },
  {
    id: 2,
    title: "Smart Watch Ultra Series 9 Health Monitor GPS Fitness Tracker",
    price: 24.5,
    originalPrice: 89.0,
    rating: 4.6,
    reviews: 5621,
    sold: 31000,
    supplier: "WearTech Global",
    origin: "China",
    minOrder: 1,
    shipping: "Free Shipping",
    shippingDays: "10-18 days",
    category: "Electronics",
    badge: "Hot",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop",
    ],
    description:
      "Full-featured smartwatch with heart rate, SpO2, GPS tracking, 100+ sport modes, and 7-day battery life.",
    specs: {
      Display: '1.9" AMOLED',
      Battery: "7 days",
      GPS: "Built-in",
      "Water Resistance": "5ATM",
    },
    verified: true,
    topSupplier: false,
  },
  {
    id: 3,
    title: "LED Ring Light 18 Inch with Tripod Stand Phone Holder Selfie",
    price: 18.75,
    originalPrice: 55.0,
    rating: 4.8,
    reviews: 12043,
    sold: 89000,
    supplier: "PhotoPro Supplies",
    origin: "China",
    minOrder: 1,
    shipping: "Free Shipping",
    shippingDays: "8-14 days",
    category: "Photography",
    badge: "Top Rated",
    images: [
      "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    ],
    description:
      "Professional 18-inch ring light with adjustable color temperature, 10 brightness levels, and 67-inch tripod.",
    specs: {
      Size: "18 inch",
      "Color Temp": "3200K-5500K",
      Brightness: "10 levels",
      "Tripod Height": "67 inch",
    },
    verified: true,
    topSupplier: true,
  },
  {
    id: 4,
    title: "Mechanical Gaming Keyboard RGB Backlit Blue Switch 104 Keys",
    price: 31.2,
    originalPrice: 95.0,
    rating: 4.5,
    reviews: 7891,
    sold: 44000,
    supplier: "GamerGear Factory",
    origin: "China",
    minOrder: 1,
    shipping: "Free Shipping",
    shippingDays: "9-16 days",
    category: "Gaming",
    badge: "Popular",
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop",
    ],
    description:
      "Full-size mechanical keyboard with blue switches, per-key RGB lighting, N-key rollover, and aluminum frame.",
    specs: {
      Switch: "Blue Mechanical",
      Keys: "104",
      Lighting: "Per-key RGB",
      Interface: "USB-C",
    },
    verified: true,
    topSupplier: false,
  },
  {
    id: 5,
    title: "4K Action Camera Waterproof 60FPS Wide Angle Sports Camera",
    price: 42.0,
    originalPrice: 130.0,
    rating: 4.6,
    reviews: 4320,
    sold: 28000,
    supplier: "ActionCam Direct",
    origin: "China",
    minOrder: 1,
    shipping: "Free Shipping",
    shippingDays: "10-20 days",
    category: "Photography",
    badge: "New",
    images: [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop",
    ],
    description:
      "4K/60fps action camera with EIS stabilization, 170° wide angle, 40m waterproof, and 2-inch touchscreen.",
    specs: {
      Resolution: "4K/60fps",
      Waterproof: "40m",
      Screen: '2" Touch',
      Battery: "1350mAh",
    },
    verified: true,
    topSupplier: true,
  },
  {
    id: 6,
    title: "Portable Bluetooth Speaker 360° Surround Sound Waterproof IPX7",
    price: 19.99,
    originalPrice: 60.0,
    rating: 4.7,
    reviews: 9876,
    sold: 67000,
    supplier: "SoundWave Electronics",
    origin: "China",
    minOrder: 1,
    shipping: "Free Shipping",
    shippingDays: "7-14 days",
    category: "Electronics",
    badge: "Best Seller",
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&h=400&fit=crop",
    ],
    description:
      "360° surround sound with deep bass, IPX7 waterproof, 24-hour battery, and built-in microphone.",
    specs: {
      Output: "20W",
      Battery: "24 hours",
      Waterproof: "IPX7",
      Bluetooth: "5.0",
    },
    verified: true,
    topSupplier: false,
  },
  {
    id: 7,
    title: "Drone with 4K Camera GPS Auto Return Foldable RC Quadcopter",
    price: 89.0,
    originalPrice: 280.0,
    rating: 4.5,
    reviews: 3241,
    sold: 18000,
    supplier: "SkyDrone Factory",
    origin: "China",
    minOrder: 1,
    shipping: "$5.99 Shipping",
    shippingDays: "12-22 days",
    category: "Electronics",
    badge: "Hot",
    images: [
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=400&h=400&fit=crop",
    ],
    description:
      "Professional foldable drone with 4K camera, GPS auto-return, 30-min flight time, and obstacle avoidance.",
    specs: {
      Camera: "4K/30fps",
      "Flight Time": "30 min",
      Range: "1.5 km",
      GPS: "Yes",
    },
    verified: true,
    topSupplier: true,
  },
  {
    id: 8,
    title: "USB-C Hub 10-in-1 Docking Station 4K HDMI 100W PD Charging",
    price: 22.5,
    originalPrice: 70.0,
    rating: 4.8,
    reviews: 6543,
    sold: 41000,
    supplier: "ConnectPro Tech",
    origin: "China",
    minOrder: 1,
    shipping: "Free Shipping",
    shippingDays: "8-15 days",
    category: "Electronics",
    badge: "Top Rated",
    images: [
      "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop",
    ],
    description:
      "10-in-1 USB-C hub with 4K HDMI, 3x USB-A, SD/microSD, Ethernet, and 100W pass-through charging.",
    specs: {
      Ports: "10-in-1",
      HDMI: "4K@60Hz",
      "PD Charging": "100W",
      Ethernet: "Gigabit",
    },
    verified: true,
    topSupplier: false,
  },
  {
    id: 9,
    title: "Ergonomic Office Chair Lumbar Support Mesh Adjustable Height",
    price: 78.0,
    originalPrice: 220.0,
    rating: 4.6,
    reviews: 4892,
    sold: 22000,
    supplier: "ErgoFurniture Direct",
    origin: "China",
    minOrder: 1,
    shipping: "$12.99 Shipping",
    shippingDays: "15-25 days",
    category: "Furniture",
    badge: "Popular",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop",
    ],
    description:
      "Full mesh ergonomic chair with adjustable lumbar support, 3D armrests, headrest, and 300lb capacity.",
    specs: {
      Material: "Full Mesh",
      Capacity: "300 lbs",
      Armrests: "3D Adjustable",
      Warranty: "2 years",
    },
    verified: true,
    topSupplier: true,
  },
  {
    id: 10,
    title: "LED Strip Lights 32.8ft RGB Smart WiFi App Control Music Sync",
    price: 9.99,
    originalPrice: 35.0,
    rating: 4.7,
    reviews: 21043,
    sold: 150000,
    supplier: "LightMaster Co.",
    origin: "China",
    minOrder: 1,
    shipping: "Free Shipping",
    shippingDays: "7-12 days",
    category: "Home",
    badge: "Best Seller",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    ],
    description:
      "32.8ft smart LED strip with 16M colors, music sync, app control, and Alexa/Google Home compatibility.",
    specs: {
      Length: "32.8 ft",
      Colors: "16M RGB",
      Control: "App/Voice",
      Compatibility: "Alexa/Google",
    },
    verified: true,
    topSupplier: false,
  },
  {
    id: 11,
    title: "Portable Power Bank 26800mAh Fast Charging USB-C PD 65W",
    price: 28.0,
    originalPrice: 80.0,
    rating: 4.8,
    reviews: 11234,
    sold: 73000,
    supplier: "PowerMax Battery",
    origin: "China",
    minOrder: 1,
    shipping: "Free Shipping",
    shippingDays: "8-16 days",
    category: "Electronics",
    badge: "Top Rated",
    images: [
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=400&fit=crop",
    ],
    description:
      "26800mAh power bank with 65W PD fast charging, 3 outputs, LCD display, and airline-safe design.",
    specs: {
      Capacity: "26800mAh",
      Output: "65W PD",
      Ports: "3 outputs",
      Display: "LCD",
    },
    verified: true,
    topSupplier: true,
  },
  {
    id: 12,
    title: "Wireless Gaming Mouse RGB 25600 DPI 7 Buttons Rechargeable",
    price: 16.5,
    originalPrice: 55.0,
    rating: 4.6,
    reviews: 8765,
    sold: 55000,
    supplier: "GamerGear Factory",
    origin: "China",
    minOrder: 1,
    shipping: "Free Shipping",
    shippingDays: "9-15 days",
    category: "Gaming",
    badge: "Hot",
    images: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&h=400&fit=crop",
    ],
    description:
      "Wireless gaming mouse with 25600 DPI, 7 programmable buttons, RGB lighting, and 70-hour battery.",
    specs: {
      DPI: "25600",
      Buttons: "7 programmable",
      Battery: "70 hours",
      Connectivity: "2.4GHz",
    },
    verified: true,
    topSupplier: false,
  },
];

const CATEGORIES = [
  "All",
  "Electronics",
  "Gaming",
  "Photography",
  "Home",
  "Furniture",
  "Fashion",
  "Beauty",
];

const REVIEWS_DATA = [
  {
    user: "Mike T.",
    rating: 5,
    date: "2 days ago",
    text: "Amazing quality for the price! Shipped faster than expected. Will definitely order again.",
    helpful: 42,
    avatar: "M",
    verified: true,
  },
  {
    user: "Sarah K.",
    rating: 5,
    date: "1 week ago",
    text: "Exceeded my expectations. Packaging was excellent and product works perfectly.",
    helpful: 38,
    avatar: "S",
    verified: true,
  },
  {
    user: "James R.",
    rating: 4,
    date: "2 weeks ago",
    text: "Good product overall. Minor issue with the charging cable but supplier sent replacement immediately.",
    helpful: 29,
    avatar: "J",
    verified: true,
  },
  {
    user: "Emma L.",
    rating: 5,
    date: "3 weeks ago",
    text: "Perfect! Exactly as described. Fast shipping to the US, only took 10 days.",
    helpful: 51,
    avatar: "E",
    verified: true,
  },
  {
    user: "David W.",
    rating: 4,
    date: "1 month ago",
    text: "Great value. Build quality is surprisingly good. Would recommend to anyone looking for budget options.",
    helpful: 23,
    avatar: "D",
    verified: false,
  },
];

type MarketplaceProduct = {
  id: number;
  catalogItemId?: number;
  title: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  sold: number;
  supplier: string;
  origin: string;
  minOrder: number;
  shipping: string;
  shippingDays: string;
  category: string;
  badge?: string;
  images: string[];
  description: string;
  specs: Record<string, string>;
  verified: boolean;
  topSupplier: boolean;
  provider?:
    | "dhgate"
    | "alibaba"
    | "admin_import"
    | "private_supplier"
    | "mixed";
  sourceLabel?: string;
  reviewLabel?: string;
  serviceFee?: number;
  marginPercent?: number;
  providerStatus?: string;
  sourceUrl?: string | null;
};

type CartItem = { product: MarketplaceProduct; qty: number };

function ProductModal({
  product,
  onClose,
  onAddToCart,
}: {
  product: MarketplaceProduct;
  onClose: () => void;
  onAddToCart: (p: MarketplaceProduct, qty: number) => void;
}) {
  const [imgIdx, setImgIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("details");
  const discount = Math.round(
    (1 - product.price / product.originalPrice) * 100
  );

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-background border border-border rounded-2xl max-w-4xl w-full shadow-2xl my-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-bold text-sm line-clamp-1 pr-4">
            {product.title}
          </h2>
          <button
            onClick={onClose}
            className="shrink-0 h-8 w-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Images */}
          <div className="p-6 border-r border-border/50">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-muted mb-3">
              <img
                src={product.images[imgIdx]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setImgIdx(i => Math.max(0, i - 1))}
                    className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-black/50 rounded-full flex items-center justify-center"
                  >
                    <ChevronLeft className="h-4 w-4 text-white" />
                  </button>
                  <button
                    onClick={() =>
                      setImgIdx(i => Math.min(product.images.length - 1, i + 1))
                    }
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-black/50 rounded-full flex items-center justify-center"
                  >
                    <ChevronRight className="h-4 w-4 text-white" />
                  </button>
                </>
              )}
              <Badge className="absolute top-2 left-2 bg-red-600 text-white border-0">
                -{discount}%
              </Badge>
            </div>
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  className={`h-14 w-14 rounded-lg overflow-hidden border-2 transition-colors ${imgIdx === i ? "border-blue-500" : "border-border"}`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          {/* Details */}
          <div className="p-6">
            <div className="flex items-center gap-2 mb-3">
              {product.verified && (
                <Badge className="bg-green-500/10 text-green-400 border-green-500/20 text-xs">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified Supplier
                </Badge>
              )}
              {product.topSupplier && (
                <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20 text-xs">
                  <Award className="h-3 w-3 mr-1" />
                  Top Supplier
                </Badge>
              )}
              {product.sourceLabel && (
                <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-xs">
                  <Globe className="h-3 w-3 mr-1" />
                  {product.sourceLabel}
                </Badge>
              )}
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl font-bold text-green-400">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-lg text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center gap-3 mb-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted"}`}
                  />
                ))}
                <span className="font-medium text-foreground ml-1">
                  {product.rating}
                </span>
              </div>
              <span>{product.reviews.toLocaleString()} reviews</span>
              <span>{product.sold.toLocaleString()} sold</span>
            </div>
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Globe className="h-4 w-4" />
                <span>
                  {product.supplier} · {product.origin}
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Truck className="h-4 w-4" />
                <span>
                  {product.shipping} · {product.shippingDays}
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Package className="h-4 w-4" />
                <span>Min. order: {product.minOrder} piece</span>
              </div>
            </div>
            {/* Qty */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm text-muted-foreground">Quantity:</span>
              <div className="flex items-center border border-border rounded-lg">
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="h-9 w-9 flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-10 text-center text-sm font-medium">
                  {qty}
                </span>
                <button
                  onClick={() => setQty(q => q + 1)}
                  className="h-9 w-9 flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
              <span className="text-sm font-bold">
                = ${(product.price * qty).toFixed(2)}
              </span>
            </div>
            <div className="flex gap-2 mb-4">
              <Button
                className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white border-0"
                onClick={() => {
                  onAddToCart(product, qty);
                  onClose();
                }}
              >
                <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
              </Button>
              <Button
                variant="outline"
                onClick={() => toast.success("Saved to wishlist!")}
              >
                <Heart className="h-4 w-4" />
              </Button>
            </div>
            {/* Tabs */}
            <div className="flex gap-2 border-b border-border mb-3">
              {["details", "specs", "reviews"].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 text-xs font-medium capitalize transition-colors border-b-2 ${activeTab === tab ? "border-blue-500 text-blue-400" : "border-transparent text-muted-foreground hover:text-foreground"}`}
                >
                  {tab}
                </button>
              ))}
            </div>
            {activeTab === "details" && (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
                <div className="rounded-lg border border-orange-500/20 bg-orange-500/5 p-2 text-xs text-muted-foreground">
                  Admin-reviewed commerce: carts are queued for quote, provider
                  availability, shipping, and compliance review before any
                  supplier order or charge. Service fee target: $
                  {product.serviceFee ?? 44} per reviewed cart.
                </div>
                {product.reviewLabel && (
                  <p className="text-xs text-blue-300">
                    Review source: {product.reviewLabel}
                  </p>
                )}
              </div>
            )}
            {activeTab === "specs" && (
              <div className="space-y-1.5">
                {Object.entries(product.specs).map(([k, v]) => (
                  <div key={k} className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="font-medium">{v}</span>
                  </div>
                ))}
              </div>
            )}
            {activeTab === "reviews" && (
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {REVIEWS_DATA.slice(0, 3).map((r, i) => (
                  <div key={i} className="text-xs">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                        {r.avatar}
                      </div>
                      <span className="font-medium">{r.user}</span>
                      {r.verified && (
                        <CheckCircle className="h-3 w-3 text-green-400" />
                      )}
                      <div className="flex">
                        {[...Array(r.rating)].map((_, j) => (
                          <Star
                            key={j}
                            className="h-3 w-3 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <span className="text-muted-foreground ml-auto">
                        {r.date}
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {r.text}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function CartDrawer({
  cart,
  onClose,
  onRemove,
  onQtyChange,
  onCheckout,
  isCheckingOut = false,
}: {
  cart: CartItem[];
  onClose: () => void;
  onRemove: (id: number) => void;
  onQtyChange: (id: number, qty: number) => void;
  onCheckout: () => void;
  isCheckingOut?: boolean;
}) {
  const total = cart.reduce((s, i) => s + i.product.price * i.qty, 0);
  const serviceFee = cart.length > 0 ? 44 : 0;
  const reviewedTotal = total + serviceFee;
  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex justify-end"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25 }}
        className="bg-background border-l border-border w-full max-w-md h-full flex flex-col shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-bold flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" /> Cart ({cart.length})
          </h2>
          <button
            onClick={onClose}
            className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            cart.map(item => (
              <div
                key={item.product.id}
                className="flex gap-3 p-3 bg-muted/30 rounded-xl"
              >
                <img
                  src={item.product.images[0]}
                  alt=""
                  className="h-16 w-16 rounded-lg object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium line-clamp-2 mb-1">
                    {item.product.title}
                  </p>
                  <p className="text-sm font-bold text-green-400">
                    ${item.product.price.toFixed(2)}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex items-center border border-border rounded-md">
                      <button
                        onClick={() =>
                          onQtyChange(
                            item.product.id,
                            Math.max(1, item.qty - 1)
                          )
                        }
                        className="h-6 w-6 flex items-center justify-center text-xs hover:bg-muted"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-6 text-center text-xs">
                        {item.qty}
                      </span>
                      <button
                        onClick={() =>
                          onQtyChange(item.product.id, item.qty + 1)
                        }
                        className="h-6 w-6 flex items-center justify-center text-xs hover:bg-muted"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <button
                      onClick={() => onRemove(item.product.id)}
                      className="text-xs text-red-400 hover:text-red-300"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="p-4 border-t border-border space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-bold">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                Admin review / cart service fee
              </span>
              <span className="text-orange-400">${serviceFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-blue-400">
                Quoted after supplier review
              </span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Review estimate</span>
              <span className="text-lg">${reviewedTotal.toFixed(2)}</span>
            </div>
            <Button
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white border-0"
              onClick={onCheckout}
              disabled={isCheckingOut}
            >
              {isCheckingOut ? "Queuing review..." : "Send to Admin Review"}{" "}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              No supplier order or payment is submitted until admin quote
              approval. Payment rails can include USD, BTC, DOGE, TRUMP, or
              SKY4444 after review.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function Marketplace() {
  const [, setLocation] = useLocation();
  const utils = trpc.useUtils();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedProduct, setSelectedProduct] =
    useState<MarketplaceProduct | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);

  const supplierStatus = trpc.marketplaceLive.supplierProviderStatus.useQuery(
    undefined,
    { refetchInterval: 60000 }
  );
  const supplierCatalog = trpc.marketplaceLive.listSupplierCatalog.useQuery(
    {
      search: search || undefined,
      category: category === "All" ? undefined : category,
      limit: 80,
    },
    { refetchInterval: 60000 }
  );
  const mySupplierOrders =
    trpc.marketplaceLive.mySupplierOrderRequests.useQuery(undefined, {
      retry: false,
      refetchInterval: 60000,
    });
  const createSupplierOrder =
    trpc.marketplaceLive.createSupplierOrderRequest.useMutation({
      onSuccess: async result => {
        const orderId =
          (result as any)?.order?.id ?? (result as any)?.id ?? "new";
        toast.success(
          `Supplier order request #${orderId} queued for admin review.`,
          {
            description:
              "No payment or supplier submission happens until the quote is approved.",
          }
        );
        setCart([]);
        setShowCart(false);
        await utils.marketplaceLive.mySupplierOrderRequests.invalidate();
      },
      onError: error => toast.error(error.message),
    });

  const providerProducts: MarketplaceProduct[] = (
    (supplierCatalog.data ?? []) as any[]
  ).map((item, index) => {
    const price = Number(item.price ?? 0);
    const compareAtPrice = Number(
      item.compareAtPrice ?? (price ? price * 1.6 : price + 25)
    );
    const images =
      Array.isArray(item.imageUrls) && item.imageUrls.length
        ? item.imageUrls
        : [
            "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=400&h=400&fit=crop",
          ];
    const specs =
      item.specs && typeof item.specs === "object" && !Array.isArray(item.specs)
        ? Object.fromEntries(
            Object.entries(item.specs).map(([key, value]) => [
              key,
              String(value),
            ])
          )
        : {
            Source: String(item.sourceLabel ?? "Supplier catalog"),
            Status: String(item.providerStatus ?? "reviewed"),
          };
    return {
      id: Number(item.id ?? 100000 + index),
      catalogItemId:
        item.providerStatus === "curated_seed" ? undefined : Number(item.id),
      title: String(item.title ?? "Supplier Product"),
      price,
      originalPrice: Math.max(compareAtPrice, price || 1),
      rating: Number(item.rating ?? 0),
      reviews: Number(item.reviewCount ?? 0),
      sold: Number(item.soldCount ?? 0),
      supplier: String(item.supplierName ?? "Supplier"),
      origin: String(item.supplierCountry ?? "Global"),
      minOrder: Number(item.minOrder ?? 1),
      shipping: String(item.shippingSummary ?? "Supplier quoted shipping"),
      shippingDays: String(item.shippingDays ?? "Quoted after review"),
      category: String(item.category ?? "General"),
      badge:
        item.providerStatus === "live_api"
          ? "Live API"
          : item.providerStatus === "admin_import"
            ? "Admin Import"
            : "Curated",
      images,
      description: String(
        item.description ??
          "Supplier catalog item queued for admin-reviewed fulfillment."
      ),
      specs,
      verified: item.reviewStatus === "approved",
      topSupplier: item.provider === "dhgate" || item.provider === "alibaba",
      provider: item.provider ?? "admin_import",
      sourceLabel: item.sourceLabel,
      reviewLabel: item.reviewLabel,
      serviceFee: Number(item.serviceFee ?? 44),
      marginPercent: Number(item.marginPercent ?? 18),
      providerStatus: item.providerStatus,
      sourceUrl: item.sourceUrl,
    };
  });
  const displayProducts: MarketplaceProduct[] = providerProducts.length
    ? providerProducts
    : (PRODUCTS as unknown as MarketplaceProduct[]);
  const categoryOptions = Array.from(
    new Set([
      "All",
      ...CATEGORIES.filter(cat => cat !== "All"),
      ...displayProducts.map(p => p.category),
    ])
  );
  const supplierProviderRows = ((supplierStatus.data as any)?.providers ??
    []) as any[];
  const pendingOrderCount = ((mySupplierOrders.data as any[]) ?? []).filter(
    order => ["queued", "admin_review", "approved"].includes(order.orderStatus)
  ).length;

  const filtered = displayProducts
    .filter(p => {
      const matchSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase()) ||
        p.supplier.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === "All" || p.category === category;
      return matchSearch && matchCat;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "newest") return b.id - a.id;
      return b.sold - a.sold;
    });

  const addToCart = (product: MarketplaceProduct, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing)
        return prev.map(i =>
          i.product.id === product.id ? { ...i, qty: i.qty + qty } : i
        );
      return [...prev, { product, qty }];
    });
    toast.success("Added to cart!", {
      description: product.title.slice(0, 40) + "...",
    });
  };

  const removeFromCart = (id: number) =>
    setCart(prev => prev.filter(i => i.product.id !== id));
  const updateQty = (id: number, qty: number) =>
    setCart(prev => prev.map(i => (i.product.id === id ? { ...i, qty } : i)));
  const toggleWishlist = (id: number) => {
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
    toast.success(
      wishlist.includes(id) ? "Removed from wishlist" : "Added to wishlist!"
    );
  };

  const handleSupplierCheckout = () => {
    if (!cart.length) return;
    createSupplierOrder.mutate({
      serviceFee: 44,
      buyerNote:
        "Marketplace cart submitted for admin supplier quote, compliance review, and provider availability confirmation.",
      items: cart.map(item => ({
        catalogItemId: item.product.catalogItemId,
        title: item.product.title,
        provider: item.product.provider ?? "admin_import",
        price: item.product.price,
        quantity: item.qty,
        imageUrl: item.product.images[0],
        supplierName: item.product.supplier,
      })),
    });
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}
      <AnimatePresence>
        {showCart && (
          <CartDrawer
            cart={cart}
            onClose={() => setShowCart(false)}
            onRemove={removeFromCart}
            onQtyChange={updateQty}
            onCheckout={handleSupplierCheckout}
            isCheckingOut={createSupplierOrder.isPending}
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border/40">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-2 flex-1">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                <Package className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-lg">SkyMarket</span>
              <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/20 text-xs">
                DHgate · Alibaba · Direct
              </Badge>
            </div>
            <button
              onClick={() => setShowCart(true)}
              className="relative h-9 w-9 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search live supplier API + admin-import catalog..."
                className="pl-9 h-9"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <select
              className="h-9 rounded-md border border-input bg-background px-2 text-xs focus:outline-none"
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Top Rated</option>
              <option value="price-low">Price: Low</option>
              <option value="price-high">Price: High</option>
              <option value="newest">Newest</option>
            </select>
            <button
              onClick={() => setViewMode(v => (v === "grid" ? "list" : "grid"))}
              className="h-9 w-9 flex items-center justify-center rounded-md border border-input hover:bg-muted transition-colors"
            >
              {viewMode === "grid" ? (
                <List className="h-4 w-4" />
              ) : (
                <Grid3X3 className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
        {/* Category tabs */}
        <div className="flex gap-1 px-4 pb-2 overflow-x-auto">
          {categoryOptions.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-colors ${category === cat ? "bg-orange-500 text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Trust Badges */}
      <div className="flex gap-4 px-4 py-3 overflow-x-auto border-b border-border/40 bg-muted/10">
        {[
          { icon: Shield, text: "Buyer Protection", color: "text-green-400" },
          { icon: Truck, text: "Free Shipping", color: "text-blue-400" },
          { icon: RefreshCw, text: "Easy Returns", color: "text-purple-400" },
          { icon: Award, text: "Verified Suppliers", color: "text-yellow-400" },
          { icon: Zap, text: "Crypto Payments", color: "text-orange-400" },
        ].map(b => (
          <div
            key={b.text}
            className="flex items-center gap-1.5 shrink-0 text-xs text-muted-foreground"
          >
            <b.icon className={`h-3.5 w-3.5 ${b.color}`} />
            <span>{b.text}</span>
          </div>
        ))}
      </div>

      {/* Supplier API + Import Status */}
      <div className="px-4 py-4 border-b border-border/40 bg-gradient-to-r from-orange-500/5 via-blue-500/5 to-purple-500/5">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <Card className="border-orange-500/20 bg-orange-500/5">
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="h-4 w-4 text-orange-400" />
                <span className="font-semibold text-sm">
                  Real Supplier Engine
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                DHgate and Alibaba-style provider adapters are server-side and
                credential-gated. Admin imports can immediately power the
                catalog with real supplier rows, photos, prices, review
                summaries, and source URLs.
              </p>
            </CardContent>
          </Card>
          <Card className="border-blue-500/20 bg-blue-500/5">
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-blue-400" />
                <span className="font-semibold text-sm">
                  Admin-Reviewed Orders
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Each cart becomes a review queue item with a $44 service-fee
                target, supplier-cost estimate, margin tracking, and no
                automatic charge until admin quote approval.
              </p>
            </CardContent>
          </Card>
          <Card className="border-purple-500/20 bg-purple-500/5">
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-purple-400" />
                <span className="font-semibold text-sm">
                  Economic Powerhouse
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Eleven streams: cart fees, supplier margin, promoted drops,
                video shopping, tips, memberships, ads, data insights, affiliate
                rails, Space Quest rewards, and premium admin sourcing.
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          {supplierProviderRows.map(provider => (
            <Badge
              key={provider.provider}
              className="bg-background/80 text-muted-foreground border-border"
            >
              {provider.label}: {provider.status}
            </Badge>
          ))}
          {pendingOrderCount > 0 && (
            <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
              {pendingOrderCount} active review request
              {pendingOrderCount === 1 ? "" : "s"}
            </Badge>
          )}
          {supplierCatalog.isLoading && (
            <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">
              Loading supplier catalog
            </Badge>
          )}
        </div>
      </div>

      {/* Products */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">
              {filtered.length}
            </span>{" "}
            products found
          </p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Flame className="h-3.5 w-3.5 text-orange-400" />
            <span>Trending deals updated hourly</span>
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {filtered.map((product, i) => {
              const discount = Math.round(
                (1 - product.price / product.originalPrice) * 100
              );
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <Card className="border-border/50 hover:border-orange-500/30 transition-all hover:-translate-y-0.5 hover:shadow-lg cursor-pointer group overflow-hidden">
                    <div
                      className="relative aspect-square overflow-hidden"
                      onClick={() => setSelectedProduct(product)}
                    >
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-1.5 left-1.5 bg-red-600 text-white border-0 text-xs px-1.5 py-0.5">
                        -{discount}%
                      </Badge>
                      {product.badge && (
                        <Badge className="absolute top-1.5 right-1.5 bg-orange-500 text-white border-0 text-xs px-1.5 py-0.5">
                          {product.badge}
                        </Badge>
                      )}
                      {product.sourceLabel && (
                        <Badge className="absolute bottom-1.5 left-1.5 bg-black/70 text-white border-0 text-[10px] px-1.5 py-0.5">
                          {product.sourceLabel}
                        </Badge>
                      )}
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          toggleWishlist(product.id);
                        }}
                        className="absolute bottom-1.5 right-1.5 h-7 w-7 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Heart
                          className={`h-3.5 w-3.5 ${wishlist.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                        />
                      </button>
                    </div>
                    <CardContent className="p-2.5">
                      <p
                        className="text-xs font-medium line-clamp-2 mb-1.5 leading-snug"
                        onClick={() => setSelectedProduct(product)}
                      >
                        {product.title}
                      </p>
                      <div className="flex items-center gap-1 mb-1.5">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-medium">
                          {product.rating}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ({product.reviews.toLocaleString()})
                        </span>
                      </div>
                      <div className="flex items-baseline gap-1 mb-1">
                        <span className="text-sm font-bold text-green-400">
                          ${product.price.toFixed(2)}
                        </span>
                        <span className="text-xs text-muted-foreground line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-[10px] text-muted-foreground mb-2">
                        {product.supplier} · {product.shippingDays}
                      </p>
                      <Button
                        size="sm"
                        className="w-full h-7 text-xs bg-gradient-to-r from-orange-500 to-red-500 text-white border-0"
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((product, i) => {
              const discount = Math.round(
                (1 - product.price / product.originalPrice) * 100
              );
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <Card className="border-border/50 hover:border-orange-500/30 transition-all cursor-pointer">
                    <CardContent className="p-3 flex gap-4">
                      <div
                        className="relative h-24 w-24 shrink-0 rounded-lg overflow-hidden"
                        onClick={() => setSelectedProduct(product)}
                      >
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                        <Badge className="absolute top-1 left-1 bg-red-600 text-white border-0 text-xs px-1 py-0">
                          -{discount}%
                        </Badge>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-sm font-medium line-clamp-2 mb-1"
                          onClick={() => setSelectedProduct(product)}
                        >
                          {product.title}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1.5">
                          <div className="flex items-center gap-0.5">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span>{product.rating}</span>
                          </div>
                          <span>·</span>
                          <span>
                            {product.reviews.toLocaleString()} reviews
                          </span>
                          <span>·</span>
                          <span>{product.sold.toLocaleString()} sold</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-base font-bold text-green-400">
                            ${product.price.toFixed(2)}
                          </span>
                          <span className="text-xs text-muted-foreground line-through">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            · {product.shipping}
                          </span>
                          {product.sourceLabel && (
                            <span className="text-xs text-blue-300">
                              · {product.sourceLabel}
                            </span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="h-7 text-xs bg-gradient-to-r from-orange-500 to-red-500 text-white border-0"
                            onClick={() => addToCart(product)}
                          >
                            Add to Cart
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 text-xs"
                            onClick={() => setSelectedProduct(product)}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Reviews Section */}
      <div className="px-4 pb-8 border-t border-border/40 mt-4 pt-6">
        <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {REVIEWS_DATA.map((review, i) => (
            <Card key={i} className="border-border/50">
              <CardContent className="pt-4">
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                    {review.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm">
                        {review.user}
                      </span>
                      {review.verified && (
                        <Badge className="bg-green-500/10 text-green-400 border-green-500/20 text-xs px-1.5 py-0">
                          <CheckCircle className="h-2.5 w-2.5 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[...Array(review.rating)].map((_, j) => (
                          <Star
                            key={j}
                            className="h-3 w-3 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {review.date}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {review.text}
                    </p>
                    <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                      <button className="hover:text-foreground transition-colors">
                        👍 Helpful ({review.helpful})
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
