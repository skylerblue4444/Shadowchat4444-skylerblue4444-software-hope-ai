/**
 * ShadowChat — Skyler Blue Crypto Shop
 * DHgate & Alibaba trending items · Pay with SKY4444/BTC/ETH/USDT
 * All orders fulfilled under Skyler Blue · 479-406-7123
 */
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const PRODUCTS = [
  {
    id: 1,
    name: "RGB LED Strip Lights 10M",
    price: 12.99,
    sky: 295,
    src: "DHgate",
    cat: "Electronics",
    rating: 4.8,
    sold: 12847,
    trending: true,
    img: "💡",
  },
  {
    id: 2,
    name: "Crypto Hardware Wallet Case",
    price: 24.99,
    sky: 568,
    src: "Alibaba",
    cat: "Crypto",
    rating: 4.9,
    sold: 8234,
    trending: true,
    img: "🔐",
  },
  {
    id: 3,
    name: "Mechanical RGB Keyboard 60%",
    price: 34.99,
    sky: 795,
    src: "DHgate",
    cat: "Electronics",
    rating: 4.7,
    sold: 6721,
    trending: true,
    img: "⌨️",
  },
  {
    id: 4,
    name: "Smart Watch Fitness Tracker",
    price: 29.99,
    sky: 681,
    src: "Alibaba",
    cat: "Wearables",
    rating: 4.6,
    sold: 15234,
    trending: false,
    img: "⌚",
  },
  {
    id: 5,
    name: "Streetwear Hoodie Oversized",
    price: 19.99,
    sky: 454,
    src: "DHgate",
    cat: "Fashion",
    rating: 4.5,
    sold: 9876,
    trending: true,
    img: "👕",
  },
  {
    id: 6,
    name: "Wireless Earbuds Pro",
    price: 22.99,
    sky: 522,
    src: "Alibaba",
    cat: "Electronics",
    rating: 4.8,
    sold: 21345,
    trending: true,
    img: "🎧",
  },
  {
    id: 7,
    name: "Portable Solar Charger 20000mAh",
    price: 27.99,
    sky: 636,
    src: "DHgate",
    cat: "Electronics",
    rating: 4.7,
    sold: 4532,
    trending: false,
    img: "☀️",
  },
  {
    id: 8,
    name: "Crypto Trading Journal Notebook",
    price: 9.99,
    sky: 227,
    src: "Alibaba",
    cat: "Crypto",
    rating: 4.9,
    sold: 3421,
    trending: false,
    img: "📓",
  },
  {
    id: 9,
    name: "SKY4444 Logo T-Shirt",
    price: 14.99,
    sky: 340,
    src: "Skyler Blue",
    cat: "Merch",
    rating: 5.0,
    sold: 444,
    trending: true,
    img: "✦",
  },
  {
    id: 10,
    name: "Gym Resistance Bands Set",
    price: 11.99,
    sky: 272,
    src: "DHgate",
    cat: "Fitness",
    rating: 4.6,
    sold: 18923,
    trending: false,
    img: "💪",
  },
  {
    id: 11,
    name: "Skincare Vitamin C Serum",
    price: 8.99,
    sky: 204,
    src: "Alibaba",
    cat: "Beauty",
    rating: 4.7,
    sold: 32145,
    trending: true,
    img: "✨",
  },
  {
    id: 12,
    name: "Mini Drone with Camera",
    price: 49.99,
    sky: 1136,
    src: "DHgate",
    cat: "Electronics",
    rating: 4.5,
    sold: 7654,
    trending: true,
    img: "🚁",
  },
];

const CATS = [
  "All",
  "Electronics",
  "Crypto",
  "Fashion",
  "Fitness",
  "Beauty",
  "Merch",
  "Wearables",
];
const PAY_METHODS = ["SKY4444", "BTC", "ETH", "USDT", "Card"];

export default function ShadowSkylerShop() {
  const [cat, setCat] = useState("All");
  const [pay, setPay] = useState("SKY4444");
  const [cart, setCart] = useState<number[]>([]);
  const [bought, setBought] = useState<number[]>([]);

  const filtered =
    cat === "All" ? PRODUCTS : PRODUCTS.filter(p => p.cat === cat);
  const cartTotal = cart.reduce(
    (s, id) => s + (PRODUCTS.find(p => p.id === id)?.price || 0),
    0
  );
  const cartSkyCost = cart.reduce(
    (s, id) => s + (PRODUCTS.find(p => p.id === id)?.sky || 0),
    0
  );

  const addCart = (id: number) =>
    setCart(c => (c.includes(id) ? c.filter(x => x !== id) : [...c, id]));
  const checkout = () => {
    setBought(b => [...b, ...cart]);
    setCart([]);
  };

  return (
    <div className="space-y-4 pb-6">
      <div className="border-b border-border/40 pb-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black">🛒 Skyler Blue Shop</h1>
            <p className="text-xs text-muted-foreground">
              DHgate & Alibaba trending items · Pay with crypto · All orders to
              Skyler Blue
            </p>
          </div>
          {cart.length > 0 && (
            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 font-black">
              {cart.length} items
            </Badge>
          )}
        </div>
      </div>

      {/* Payment Method */}
      <div>
        <p className="text-xs font-bold mb-1.5 text-muted-foreground">
          Payment Method
        </p>
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {PAY_METHODS.map(m => (
            <button
              key={m}
              onClick={() => setPay(m)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${pay === m ? "border-yellow-500/50 bg-yellow-500/10 text-yellow-400" : "border-border/40 text-muted-foreground"}`}
            >
              {m}
              {m === "SKY4444" && (
                <span className="ml-1 text-green-400">-5%</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {CATS.map(c => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${cat === c ? "border-border bg-foreground text-background" : "border-border/40 text-muted-foreground"}`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <Card className="border-yellow-500/40 bg-yellow-500/5">
          <CardContent className="py-3 px-4 flex items-center justify-between">
            <div>
              <p className="font-black text-sm">{cart.length} items in cart</p>
              <p className="text-xs text-muted-foreground">
                {pay === "SKY4444"
                  ? `${cartSkyCost} SKY4444 (5% off)`
                  : `$${(cartTotal * (pay === "SKY4444" ? 0.95 : 1)).toFixed(2)}`}
              </p>
            </div>
            <Button
              onClick={checkout}
              size="sm"
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-black text-xs h-8"
            >
              Checkout
            </Button>
          </CardContent>
        </Card>
      )}

      {bought.length > 0 && (
        <Card className="border-green-500/40 bg-green-500/5">
          <CardContent className="py-3 text-center">
            <p className="font-black text-sm text-green-400">✓ Order Placed!</p>
            <p className="text-xs text-muted-foreground">
              Order sent to Skyler Blue · 479-406-7123 · Tracking in 24h
            </p>
          </CardContent>
        </Card>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-2">
        {filtered.map(p => (
          <Card
            key={p.id}
            className={`border-border/40 transition-all ${cart.includes(p.id) ? "border-yellow-500/50 bg-yellow-500/5" : ""}`}
          >
            <CardContent className="py-3 px-3 space-y-2">
              <div className="flex items-start justify-between">
                <span className="text-2xl">{p.img}</span>
                <div className="flex flex-col items-end gap-0.5">
                  {p.trending && (
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs px-1.5 py-0 h-4">
                      HOT
                    </Badge>
                  )}
                  <Badge className="bg-muted text-muted-foreground border-border/40 text-xs px-1.5 py-0 h-4">
                    {p.src}
                  </Badge>
                </div>
              </div>
              <div>
                <p className="font-bold text-xs leading-tight">{p.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  ⭐ {p.rating} · {p.sold.toLocaleString()} sold
                </p>
              </div>
              <div>
                <p className="font-black text-sm">${p.price}</p>
                <p className="text-xs text-yellow-400">{p.sky} SKY4444</p>
              </div>
              <Button
                onClick={() => addCart(p.id)}
                size="sm"
                className={`w-full h-7 text-xs font-bold border-0 ${cart.includes(p.id) ? "bg-yellow-500 text-black" : "bg-muted hover:bg-muted/80 text-foreground"}`}
              >
                {cart.includes(p.id) ? "✓ In Cart" : "Add to Cart"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-yellow-500/30 bg-yellow-500/5">
        <CardContent className="py-3 text-center">
          <p className="font-black text-xs text-yellow-400">
            ✦ Skyler Blue · 479-406-7123 · All orders fulfilled personally
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Pay with SKY4444 for 5% discount · DHgate & Alibaba sourced
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
