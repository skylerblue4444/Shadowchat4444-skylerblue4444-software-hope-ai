import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ShoppingBag, Star, TrendingUp, Package, Truck, CheckCircle, Zap } from "lucide-react";

const TRENDING_ITEMS = [
  {
    id: 1,
    title: "RGB Gaming Keyboard Mechanical",
    source: "Alibaba",
    price: "$24.99",
    skyprice: "5.6 SKY4444",
    rating: 4.8,
    reviews: 2847,
    trending: true,
    tag: "🔥 Hot",
    image: "⌨️",
  },
  {
    id: 2,
    title: "Wireless Earbuds ANC Pro",
    source: "DHgate",
    price: "$18.44",
    skyprice: "4.1 SKY4444",
    rating: 4.7,
    reviews: 5244,
    trending: true,
    tag: "⚡ Trending",
    image: "🎧",
  },
  {
    id: 3,
    title: "Smart Watch Fitness Tracker",
    source: "Alibaba",
    price: "$31.00",
    skyprice: "6.9 SKY4444",
    rating: 4.6,
    reviews: 3102,
    trending: true,
    tag: "🔥 Hot",
    image: "⌚",
  },
  {
    id: 4,
    title: "LED Strip Lights 10m RGB",
    source: "DHgate",
    price: "$9.99",
    skyprice: "2.2 SKY4444",
    rating: 4.9,
    reviews: 8472,
    trending: true,
    tag: "💎 Top Seller",
    image: "💡",
  },
  {
    id: 5,
    title: "Portable Charger 20000mAh",
    source: "Alibaba",
    price: "$15.44",
    skyprice: "3.4 SKY4444",
    rating: 4.7,
    reviews: 4100,
    trending: false,
    tag: "✅ Verified",
    image: "🔋",
  },
  {
    id: 6,
    title: "Phone Stand Adjustable Desk",
    source: "DHgate",
    price: "$7.44",
    skyprice: "1.6 SKY4444",
    rating: 4.8,
    reviews: 6300,
    trending: false,
    tag: "✅ Verified",
    image: "📱",
  },
];

export default function ShadowSkylerShop() {
  const [cart, setCart] = useState<number[]>([]);
  const [ordered, setOrdered] = useState<number[]>([]);

  const addToCart = (id: number, title: string) => {
    setCart((c) => [...c, id]);
    toast.success(`"${title}" added to cart`);
  };

  const checkout = (id: number, title: string, price: string) => {
    setOrdered((o) => [...o, id]);
    setCart((c) => c.filter((x) => x !== id));
    toast.success(
      `Order placed for "${title}" (${price}) — Order info sent to Skyler Blue only. Processing via Alibaba/DHgate.`
    );
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black text-green-400">Skyler Blue Shop</h1>
          <p className="text-xs text-muted-foreground">
            Auto-posted trending items from Alibaba &amp; DHgate — Pay with SKY4444 or USD
          </p>
        </div>
        <Badge className="bg-green-600 text-white shrink-0">
          <ShoppingBag className="h-3 w-3 mr-1" /> Live Shop
        </Badge>
      </div>

      {/* Auto-sync banner */}
      <Card className="border-green-500/30 bg-gradient-to-r from-green-900/20 to-teal-900/20">
        <CardContent className="py-3 px-4 flex items-center gap-3">
          <Zap className="h-5 w-5 text-green-400 shrink-0" />
          <div>
            <p className="text-xs font-bold text-green-400">Auto-Sync Active</p>
            <p className="text-xs text-muted-foreground">
              Trending items from Alibaba &amp; DHgate are automatically posted here. Reviews and purchase
              orders are processed under <span className="font-bold text-white">Skyler Blue</span> — only
              Skyler receives order info.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        <Card className="border-border/50 text-center">
          <CardContent className="py-3 px-2">
            <TrendingUp className="h-4 w-4 text-green-400 mx-auto mb-1" />
            <p className="font-black text-sm text-green-400">{TRENDING_ITEMS.filter((i) => i.trending).length}</p>
            <p className="text-xs text-muted-foreground">Trending Now</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 text-center">
          <CardContent className="py-3 px-2">
            <Package className="h-4 w-4 text-blue-400 mx-auto mb-1" />
            <p className="font-black text-sm text-blue-400">{TRENDING_ITEMS.length}</p>
            <p className="text-xs text-muted-foreground">Items Listed</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 text-center">
          <CardContent className="py-3 px-2">
            <Truck className="h-4 w-4 text-orange-400 mx-auto mb-1" />
            <p className="font-black text-sm text-orange-400">Fast</p>
            <p className="text-xs text-muted-foreground">Shipping</p>
          </CardContent>
        </Card>
      </div>

      {/* Product Grid */}
      <div className="space-y-2">
        {TRENDING_ITEMS.map((item) => (
          <Card key={item.id} className="border-border/50">
            <CardContent className="py-3 px-4">
              <div className="flex items-start gap-3">
                <div className="text-3xl">{item.image}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 flex-wrap">
                    <p className="text-sm font-bold truncate">{item.title}</p>
                    <Badge
                      className={`text-xs py-0 px-1 shrink-0 ${
                        item.trending ? "bg-red-900/40 text-red-400 border border-red-500/30" : "bg-muted/50 text-muted-foreground"
                      }`}
                    >
                      {item.tag}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs text-yellow-400 font-bold">{item.rating}</span>
                    <span className="text-xs text-muted-foreground">({item.reviews.toLocaleString()} reviews)</span>
                    <Badge variant="outline" className="text-xs py-0 px-1 ml-1">{item.source}</Badge>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <p className="text-sm font-black text-green-400">{item.price}</p>
                      <p className="text-xs text-yellow-400">{item.skyprice}</p>
                    </div>
                    <div className="flex gap-1">
                      {ordered.includes(item.id) ? (
                        <Badge className="bg-green-600 text-white text-xs">
                          <CheckCircle className="h-3 w-3 mr-1" /> Ordered
                        </Badge>
                      ) : cart.includes(item.id) ? (
                        <Button
                          size="sm"
                          className="h-7 text-xs font-bold bg-green-600 hover:bg-green-500 text-white border-0"
                          onClick={() => checkout(item.id, item.title, item.price)}
                        >
                          Checkout
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          className="h-7 text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white border-0"
                          onClick={() => addToCart(item.id, item.title)}
                        >
                          Add to Cart
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border/50 bg-muted/20">
        <CardContent className="py-3 px-4 flex items-start gap-2">
          <CheckCircle className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            All orders processed under <strong>Skyler Blue</strong>. Only Skyler Blue receives order
            confirmation and shipping info. Powered by Alibaba &amp; DHgate auto-sync with AI trend detection.
            Pay with SKY4444 tokens or USD via Stripe.
          </p>
        </CardContent>
      </Card>

      <div className="rounded-xl bg-muted/50 border border-border/50 p-3 text-center">
        <p className="font-bold text-xs">Skyler Blue IT Resolutions &bull; 479-406-7123</p>
        <p className="text-xs text-muted-foreground">skylerblue4444@gmail.com &bull; Arkansas #1 IT Partner</p>
      </div>
    </div>
  );
}
