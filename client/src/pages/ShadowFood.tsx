import { useState } from "react";
import { motion } from "framer-motion";
import {
  Utensils,
  Star,
  Clock,
  MapPin,
  Plus,
  Minus,
  ShoppingCart,
  Zap,
  Coins,
  Search,
  Flame,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const RESTAURANTS = [
  {
    id: 1,
    name: "CryptoBurger Co.",
    cuisine: "American",
    rating: 4.8,
    deliveryTime: "25-35 min",
    deliveryFee: "Free",
    minOrder: "10 SKY",
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80",
    tag: "🔥 Popular",
    accepts: ["SKY4444", "TRUMP", "DOGE"],
  },
  {
    id: 2,
    name: "ShadowSushi",
    cuisine: "Japanese",
    rating: 4.9,
    deliveryTime: "30-45 min",
    deliveryFee: "5 SKY",
    minOrder: "20 SKY",
    img: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&q=80",
    tag: "⭐ Top Rated",
    accepts: ["SKY4444", "BTC", "USDT"],
  },
  {
    id: 3,
    name: "Skyler's BBQ Pit",
    cuisine: "BBQ",
    rating: 4.7,
    deliveryTime: "40-55 min",
    deliveryFee: "Free",
    minOrder: "15 SKY",
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80",
    tag: "🏆 Local Fav",
    accepts: ["SKY4444", "Card"],
  },
  {
    id: 4,
    name: "Web3 Pizza",
    cuisine: "Italian",
    rating: 4.6,
    deliveryTime: "20-30 min",
    deliveryFee: "Free",
    minOrder: "12 SKY",
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80",
    tag: "⚡ Fast",
    accepts: ["SKY4444", "TRUMP", "DOGE", "Card"],
  },
];

const MENU_ITEMS = [
  {
    id: 1,
    name: "Shadow Smash Burger",
    price: "12 SKY4444",
    desc: "Double patty, special sauce, crypto pickles",
    emoji: "🍔",
    popular: true,
  },
  {
    id: 2,
    name: "Crypto Chicken Wings (12pc)",
    price: "18 SKY4444",
    desc: "Choice of 6 sauces, celery, ranch",
    emoji: "🍗",
    popular: true,
  },
  {
    id: 3,
    name: "TRUMP Tower Fries",
    price: "8 SKY4444",
    desc: "Loaded with cheese, bacon, jalapeños",
    emoji: "🍟",
    popular: false,
  },
  {
    id: 4,
    name: "ShadowShake (Vanilla/Choc)",
    price: "7 SKY4444",
    desc: "Thick premium milkshake",
    emoji: "🥤",
    popular: false,
  },
  {
    id: 5,
    name: "NFT Nuggets (20pc)",
    price: "14 SKY4444",
    desc: "Each nugget has a unique shape — collect them!",
    emoji: "🍘",
    popular: true,
  },
];

export default function ShadowFood() {
  const [tab, setTab] = useState<"restaurants" | "menu" | "cart" | "orders">(
    "restaurants"
  );
  const [cart, setCart] = useState<
    { item: (typeof MENU_ITEMS)[0]; qty: number }[]
  >([]);
  const [search, setSearch] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState<
    (typeof RESTAURANTS)[0] | null
  >(null);

  const addToCart = (item: (typeof MENU_ITEMS)[0]) => {
    setCart(c => {
      const existing = c.find(x => x.item.id === item.id);
      if (existing)
        return c.map(x =>
          x.item.id === item.id ? { ...x, qty: x.qty + 1 } : x
        );
      return [...c, { item, qty: 1 }];
    });
    toast.success(`Added ${item.name} to cart!`);
  };

  const removeFromCart = (itemId: number) => {
    setCart(c =>
      c
        .map(x => (x.item.id === itemId ? { ...x, qty: x.qty - 1 } : x))
        .filter(x => x.qty > 0)
    );
  };

  const cartTotal = cart.reduce(
    (s, x) => s + parseInt(x.item.price) * x.qty,
    0
  );
  const cartCount = cart.reduce((s, x) => s + x.qty, 0);

  const filtered = RESTAURANTS.filter(
    r =>
      search === "" ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Utensils className="h-6 w-6 text-orange-400" />
            ShadowFood
          </h1>
          <p className="text-sm text-muted-foreground">
            Order food, pay with SKY4444, earn rewards
          </p>
        </div>
        <button onClick={() => setTab("cart")} className="relative">
          <ShoppingCart className="h-6 w-6 text-orange-400" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-orange-600 text-white text-xs flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      <div className="flex gap-2">
        {(["restaurants", "menu", "cart", "orders"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-orange-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t === "cart" && cartCount > 0 ? `Cart (${cartCount})` : t}
          </button>
        ))}
      </div>

      {tab === "restaurants" && (
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search restaurants..."
              className="pl-9 h-9 text-xs"
            />
          </div>
          {filtered.map((rest, i) => (
            <motion.div
              key={rest.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Card
                className="border-border/50 overflow-hidden hover:border-orange-500/20 transition-all cursor-pointer"
                onClick={() => {
                  setSelectedRestaurant(rest);
                  setTab("menu");
                }}
              >
                <div className="relative">
                  <img
                    src={rest.img}
                    alt={rest.name}
                    className="w-full h-32 object-cover"
                  />
                  <Badge className="absolute top-2 left-2 text-xs bg-black/60 text-white border-0">
                    {rest.tag}
                  </Badge>
                </div>
                <CardContent className="py-3 px-4">
                  <div className="flex items-start justify-between mb-1">
                    <p className="font-black text-sm">{rest.name}</p>
                    <div className="flex items-center gap-1 text-xs">
                      <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                      <span className="font-bold">{rest.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">
                    {rest.cuisine}
                  </p>
                  <div className="flex gap-3 text-xs text-muted-foreground">
                    <span>
                      <Clock className="h-3 w-3 inline mr-0.5" />
                      {rest.deliveryTime}
                    </span>
                    <span>Delivery: {rest.deliveryFee}</span>
                    <span>Min: {rest.minOrder}</span>
                  </div>
                  <div className="flex gap-1 mt-1.5">
                    {rest.accepts.map(coin => (
                      <Badge
                        key={coin}
                        className="text-xs bg-muted text-muted-foreground"
                      >
                        {coin}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "menu" && (
        <div className="space-y-3">
          {selectedRestaurant && (
            <Card className="border-orange-500/20 bg-orange-900/5">
              <CardContent className="py-2 px-4 flex items-center gap-3">
                <span className="text-2xl">🍽️</span>
                <div>
                  <p className="font-bold text-sm">{selectedRestaurant.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {selectedRestaurant.deliveryTime} ·{" "}
                    {selectedRestaurant.deliveryFee} delivery
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
          {MENU_ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card className="border-border/50">
                <CardContent className="py-3 px-4">
                  <div className="flex items-start gap-3">
                    <span className="text-3xl shrink-0">{item.emoji}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="font-bold text-sm">{item.name}</p>
                        {item.popular && (
                          <Badge className="text-xs bg-orange-500/10 text-orange-400 border-orange-500/20">
                            <Flame className="h-2.5 w-2.5 mr-0.5" />
                            Popular
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">
                        {item.desc}
                      </p>
                      <p className="font-black text-sm text-orange-400">
                        {item.price}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      className="h-8 w-8 p-0 bg-orange-600 text-white border-0 shrink-0"
                      onClick={() => addToCart(item)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "cart" && (
        <div className="space-y-3">
          {cart.length === 0 ? (
            <Card className="border-border/50 text-center py-8">
              <p className="text-muted-foreground text-sm">
                Your cart is empty
              </p>
              <Button
                size="sm"
                className="mt-2 h-8 text-xs bg-orange-600 text-white border-0"
                onClick={() => setTab("restaurants")}
              >
                Browse Restaurants
              </Button>
            </Card>
          ) : (
            <>
              {cart.map(({ item, qty }) => (
                <Card key={item.id} className="border-border/50">
                  <CardContent className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.emoji}</span>
                      <div className="flex-1">
                        <p className="font-bold text-sm">{item.name}</p>
                        <p className="text-xs text-orange-400 font-bold">
                          {parseInt(item.price) * qty} SKY4444
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="h-7 w-7 rounded-full bg-muted flex items-center justify-center"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="font-bold text-sm w-4 text-center">
                          {qty}
                        </span>
                        <button
                          onClick={() => addToCart(item)}
                          className="h-7 w-7 rounded-full bg-orange-600 flex items-center justify-center"
                        >
                          <Plus className="h-3 w-3 text-white" />
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Card className="border-orange-500/20 bg-orange-900/5">
                <CardContent className="py-3 px-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Subtotal</span>
                    <span className="font-bold">{cartTotal} SKY4444</span>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Delivery</span>
                    <span className="text-green-400 font-bold">Free</span>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Rewards (5%)</span>
                    <span className="text-yellow-400 font-bold">
                      -{Math.round(cartTotal * 0.05)} SKY4444
                    </span>
                  </div>
                  <div className="flex justify-between font-black text-base border-t border-border/30 pt-2 mt-2">
                    <span>Total</span>
                    <span className="text-orange-400">
                      {Math.round(cartTotal * 0.95)} SKY4444
                    </span>
                  </div>
                  <Button
                    className="w-full h-10 text-xs mt-3 bg-orange-600 text-white border-0 font-bold"
                    onClick={() => {
                      toast.success(
                        "🎉 Order placed! Estimated delivery: 30 min"
                      );
                      setCart([]);
                      setTab("orders");
                    }}
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Place Order — {Math.round(cartTotal * 0.95)} SKY4444
                  </Button>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      )}

      {tab === "orders" && (
        <div className="space-y-3">
          <Card className="border-green-500/20 bg-green-900/5">
            <CardContent className="py-3 px-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🍔</span>
                <div className="flex-1">
                  <p className="font-bold text-sm">CryptoBurger Co.</p>
                  <p className="text-xs text-muted-foreground">
                    Shadow Smash Burger x2, Crypto Wings
                  </p>
                  <p className="text-xs text-green-400 font-bold">
                    Arriving in ~12 minutes 🚗
                  </p>
                </div>
                <Badge className="text-xs bg-green-500/10 text-green-400 border-green-500/20 animate-pulse">
                  On the Way
                </Badge>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="py-3 px-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🍣</span>
                <div className="flex-1">
                  <p className="font-bold text-sm">ShadowSushi</p>
                  <p className="text-xs text-muted-foreground">
                    Dragon Roll x2, Miso Soup
                  </p>
                  <p className="text-xs text-muted-foreground">
                    May 14, 2026 · 38 SKY4444
                  </p>
                </div>
                <Badge className="text-xs bg-muted text-muted-foreground">
                  Delivered
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
