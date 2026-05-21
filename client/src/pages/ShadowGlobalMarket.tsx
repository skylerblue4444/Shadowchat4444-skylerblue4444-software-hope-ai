/**
 * ShadowChat — Global Marketplace
 * USA · China · EU · Pay with SKY4444/BTC/ETH/USDT
 * Skyler Blue | 479-406-7123
 */
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const REGIONS = [
  {
    id: "usa",
    flag: "🇺🇸",
    name: "USA",
    currency: "USD",
    products: ["Electronics", "Crypto Hardware", "Apparel", "Home & Garden"],
  },
  {
    id: "china",
    flag: "🇨🇳",
    name: "China",
    currency: "CNY",
    products: ["LED Lighting", "Smart Devices", "Fashion", "Tools"],
  },
  {
    id: "eu",
    flag: "🇪🇺",
    name: "Europe",
    currency: "EUR",
    products: ["Luxury Goods", "Organic Food", "Design Items", "Automotive"],
  },
  {
    id: "asia",
    flag: "🌏",
    name: "SE Asia",
    currency: "USD",
    products: ["Skincare", "Streetwear", "Electronics", "Food"],
  },
];

const TRENDING = [
  {
    name: "RGB Keyboard 60%",
    price: "$34.99",
    sky: 795,
    region: "🇨🇳",
    hot: true,
  },
  {
    name: "Crypto Hardware Wallet",
    price: "$89.99",
    sky: 2045,
    region: "🇺🇸",
    hot: true,
  },
  {
    name: "LED Strip 10M",
    price: "$12.99",
    sky: 295,
    region: "🇨🇳",
    hot: false,
  },
  {
    name: "Smart Watch Pro",
    price: "$49.99",
    sky: 1136,
    region: "🌏",
    hot: true,
  },
  {
    name: "Wireless Earbuds",
    price: "$22.99",
    sky: 522,
    region: "🇨🇳",
    hot: false,
  },
  {
    name: "SKY4444 Merch Hoodie",
    price: "$29.99",
    sky: 681,
    region: "🇺🇸",
    hot: true,
  },
];

const PAY = ["SKY4444 -5%", "BTC", "ETH", "USDT", "Card"];

export default function ShadowGlobalMarket() {
  const [region, setRegion] = useState("usa");
  const [pay, setPay] = useState("SKY4444 -5%");
  const [cart, setCart] = useState<string[]>([]);

  return (
    <div className="space-y-4 pb-6">
      <div className="border-b border-border/40 pb-3">
        <h1 className="text-2xl font-black">🌍 Global Marketplace</h1>
        <p className="text-xs text-muted-foreground">
          USA · China · EU · SE Asia · Pay with SKY4444 for 5% off
        </p>
      </div>

      {/* Region Selector */}
      <div className="grid grid-cols-4 gap-1.5">
        {REGIONS.map(r => (
          <button
            key={r.id}
            onClick={() => setRegion(r.id)}
            className={`py-2 rounded-lg text-center border transition-all ${region === r.id ? "border-yellow-500/50 bg-yellow-500/10" : "border-border/40 bg-muted/20"}`}
          >
            <p className="text-xl">{r.flag}</p>
            <p className="text-xs font-bold mt-0.5">{r.name}</p>
          </button>
        ))}
      </div>

      {/* Payment */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {PAY.map(p => (
          <button
            key={p}
            onClick={() => setPay(p)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${pay === p ? "border-yellow-500/50 bg-yellow-500/10 text-yellow-400" : "border-border/40 text-muted-foreground"}`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Categories for selected region */}
      {REGIONS.filter(r => r.id === region).map(r => (
        <Card key={r.id} className="border-border/40">
          <CardContent className="py-3 px-4">
            <p className="font-black text-sm mb-2">
              {r.flag} {r.name} Categories
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {r.products.map((cat, i) => (
                <div
                  key={i}
                  className="bg-muted/30 rounded-lg px-3 py-2 text-xs font-bold cursor-pointer hover:bg-yellow-500/10 transition-colors"
                >
                  {cat}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Trending */}
      <div>
        <p className="font-black text-sm mb-2">🔥 Trending Now</p>
        <div className="grid grid-cols-2 gap-2">
          {TRENDING.map((p, i) => (
            <Card
              key={i}
              className={`border-border/40 ${cart.includes(p.name) ? "border-yellow-500/40 bg-yellow-500/5" : ""}`}
            >
              <CardContent className="py-3 px-3 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-base">{p.region}</span>
                  {p.hot && (
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs px-1.5 py-0 h-4">
                      HOT
                    </Badge>
                  )}
                </div>
                <p className="font-bold text-xs leading-tight">{p.name}</p>
                <p className="font-black text-sm">{p.price}</p>
                <p className="text-xs text-yellow-400">{p.sky} SKY4444</p>
                <Button
                  onClick={() =>
                    setCart(c =>
                      c.includes(p.name)
                        ? c.filter(x => x !== p.name)
                        : [...c, p.name]
                    )
                  }
                  size="sm"
                  className={`w-full h-7 text-xs border-0 font-bold ${cart.includes(p.name) ? "bg-yellow-500 text-black" : "bg-muted hover:bg-muted/80"}`}
                >
                  {cart.includes(p.name) ? "✓ Added" : "Add to Cart"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {cart.length > 0 && (
        <Card className="border-yellow-500/40 bg-yellow-500/5">
          <CardContent className="py-3 px-4 flex items-center justify-between">
            <p className="font-black text-sm">
              {cart.length} items · Pay with {pay}
            </p>
            <Button
              size="sm"
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-black text-xs h-8 border-0"
            >
              Checkout
            </Button>
          </CardContent>
        </Card>
      )}

      <p className="text-center text-xs text-muted-foreground/60">
        Skyler Blue · 479-406-7123 · Global Marketplace · SKY4444 economy
      </p>
    </div>
  );
}
