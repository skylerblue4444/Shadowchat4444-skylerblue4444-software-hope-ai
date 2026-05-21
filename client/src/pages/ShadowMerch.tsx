import { useState } from "react";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Star,
  Heart,
  Filter,
  Search,
  Truck,
  Shield,
  Zap,
  Tag,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const PRODUCTS = [
  {
    id: 1,
    name: "ShadowChat Hoodie",
    price: 59.99,
    sky: 1363,
    category: "Apparel",
    rating: 4.9,
    reviews: 144,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=300&h=300&fit=crop",
    badge: "Best Seller",
    nft: false,
  },
  {
    id: 2,
    name: "SKY4444 Snapback Cap",
    price: 34.99,
    sky: 795,
    category: "Apparel",
    rating: 4.8,
    reviews: 88,
    image:
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=300&h=300&fit=crop",
    badge: "New",
    nft: false,
  },
  {
    id: 3,
    name: "ShadowChat Tee (Limited)",
    price: 29.99,
    sky: 681,
    category: "Apparel",
    rating: 4.7,
    reviews: 222,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
    badge: "Limited",
    nft: true,
  },
  {
    id: 4,
    name: "Shadow Crypto Mug",
    price: 19.99,
    sky: 454,
    category: "Accessories",
    rating: 4.9,
    reviews: 333,
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=300&h=300&fit=crop",
    badge: "Fan Fav",
    nft: false,
  },
  {
    id: 5,
    name: "SKY4444 Sticker Pack (50)",
    price: 9.99,
    sky: 227,
    category: "Accessories",
    rating: 5.0,
    reviews: 444,
    image:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300&h=300&fit=crop",
    badge: "🔥 Hot",
    nft: false,
  },
  {
    id: 6,
    name: "ShadowChat NFT Hoodie",
    price: 149.99,
    sky: 3409,
    category: "NFT-Linked",
    rating: 4.9,
    reviews: 44,
    image:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=300&h=300&fit=crop",
    badge: "NFT",
    nft: true,
  },
  {
    id: 7,
    name: "Shadow Crypto Mousepad XL",
    price: 24.99,
    sky: 568,
    category: "Accessories",
    rating: 4.8,
    reviews: 111,
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&h=300&fit=crop",
    badge: null,
    nft: false,
  },
  {
    id: 8,
    name: "Skyler Blue IT Resolutions Polo",
    price: 44.99,
    sky: 1022,
    category: "IT Brand",
    rating: 4.9,
    reviews: 22,
    image:
      "https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=300&h=300&fit=crop",
    badge: "New",
    nft: false,
  },
];

const CATEGORIES = ["All", "Apparel", "Accessories", "NFT-Linked", "IT Brand"];

export default function ShadowMerch() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState<number[]>([]);
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const [payWith, setPayWith] = useState<"usd" | "sky4444">("usd");

  const filtered = PRODUCTS.filter(p => {
    const matchSearch =
      !search || p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || p.category === category;
    return matchSearch && matchCat;
  });

  const addToCart = (id: number, name: string) => {
    setCart(prev => [...prev, id]);
    toast.success(`🛒 Added ${name} to cart!`);
  };

  const toggleWishlist = (id: number) => {
    setWishlist(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const cartTotal = cart.reduce((sum, id) => {
    const p = PRODUCTS.find(p => p.id === id);
    return sum + (p ? p.price : 0);
  }, 0);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-orange-400" />
            Shadow Merch
          </h1>
          <p className="text-sm text-muted-foreground">
            Official ShadowChat & SKY4444 merchandise
          </p>
        </div>
        <Button
          size="sm"
          className="h-9 text-xs bg-orange-600 text-white border-0 font-bold relative"
          onClick={() =>
            toast.info(`Cart: ${cart.length} items · $${cartTotal.toFixed(2)}`)
          }
        >
          <ShoppingBag className="h-4 w-4 mr-1" />
          Cart ({cart.length})
        </Button>
      </div>

      {/* Perks */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { icon: Truck, label: "Free Shipping", sub: "Orders $50+" },
          { icon: Shield, label: "Secure Pay", sub: "Crypto + Stripe" },
          { icon: Zap, label: "SKY4444 Rewards", sub: "5% back in SKY4444" },
        ].map(p => (
          <Card key={p.label} className="border-border/50 text-center">
            <CardContent className="pt-2 pb-2">
              <p.icon className="h-5 w-5 text-orange-400 mx-auto mb-1" />
              <p className="font-bold text-xs">{p.label}</p>
              <p className="text-xs text-muted-foreground">{p.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search merch..."
            className="h-9 pl-9 text-xs"
          />
        </div>
        <div className="flex gap-1.5">
          {(["usd", "sky4444"] as const).map(p => (
            <button
              key={p}
              onClick={() => setPayWith(p)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase transition-colors ${payWith === p ? "bg-orange-600 text-white" : "bg-muted text-muted-foreground"}`}
            >
              {p === "usd" ? "USD" : "SKY4444"}
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {CATEGORIES.map(c => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${category === c ? "bg-orange-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-3">
        {filtered.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="border-border/50 hover:border-orange-500/20 transition-all overflow-hidden">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-32 object-cover"
                  onError={e => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop";
                  }}
                />
                <button
                  className="absolute top-2 right-2 h-7 w-7 rounded-full bg-background/80 flex items-center justify-center"
                  onClick={() => toggleWishlist(product.id)}
                >
                  <Heart
                    className={`h-4 w-4 ${wishlist.has(product.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"}`}
                  />
                </button>
                {product.badge && (
                  <Badge className="absolute top-2 left-2 text-xs bg-orange-600 text-white border-0">
                    {product.badge}
                  </Badge>
                )}
                {product.nft && (
                  <Badge className="absolute bottom-2 left-2 text-xs bg-purple-600 text-white border-0">
                    🎨 NFT-Linked
                  </Badge>
                )}
              </div>
              <CardContent className="py-2.5 px-3">
                <p className="font-bold text-xs leading-tight mb-1">
                  {product.name}
                </p>
                <div className="flex items-center gap-1 mb-2">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-bold">{product.rating}</span>
                  <span className="text-xs text-muted-foreground">
                    ({product.reviews})
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-black text-sm text-orange-400">
                      {payWith === "usd"
                        ? `$${product.price}`
                        : `${product.sky.toLocaleString()} SKY`}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    className="h-7 text-xs bg-orange-600 text-white border-0 font-bold px-2"
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

      {cart.length > 0 && (
        <Card className="border-orange-500/20 bg-orange-900/5">
          <CardContent className="py-3 px-4 flex items-center justify-between">
            <div>
              <p className="font-bold text-sm">{cart.length} items in cart</p>
              <p className="text-xs text-muted-foreground">
                Total: ${cartTotal.toFixed(2)}
              </p>
            </div>
            <Button
              className="h-9 text-xs bg-orange-600 text-white border-0 font-bold"
              onClick={() => toast.success("🛒 Proceeding to checkout...")}
            >
              Checkout
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
