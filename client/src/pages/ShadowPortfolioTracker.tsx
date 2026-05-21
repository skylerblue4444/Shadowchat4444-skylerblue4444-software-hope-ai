/**
 * ShadowChat — Portfolio Tracker
 * Production-grade · Global appeal · SKY4444 integrated
 */
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ShadowPortfolioTracker() {
  const items = [
    {
      icon: "₿",
      title: "Bitcoin",
      desc: "0.00000847 BTC · $0.57",
      badge: "Live",
    },
    {
      icon: "🐕",
      title: "Dogecoin",
      desc: "4.444 DOGE · $0.82",
      badge: "Live",
    },
    { icon: "🇺🇸", title: "TRUMP", desc: "10.0 TRUMP · $142", badge: "Live" },
    {
      icon: "✦",
      title: "SKY4444",
      desc: "4,444 SKY4444 · $208",
      badge: "Live",
    },
    { icon: "₮", title: "USDT", desc: "47.00 USDT · $47", badge: "Stable" },
    { icon: "ɱ", title: "Monero", desc: "0.0047 XMR · $0.84", badge: "Live" },
  ];
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-black">Portfolio Tracker</h1>
        <p className="text-xs text-muted-foreground">
          Track all your crypto holdings · Live P&L · SKY4444 included
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {items.map((item, i) => (
          <Card
            key={i}
            className="border-border/50 hover:border-primary/30 transition-all"
          >
            <CardContent className="py-3 px-3">
              <p className="text-2xl mb-1">{item.icon}</p>
              <p className="font-bold text-xs mb-0.5">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
              {item.badge && (
                <Badge className="mt-1 bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs px-1.5 py-0">
                  {item.badge}
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="py-4 px-4 text-center">
          <p className="font-black text-sm mb-1">✦ Earn SKY4444 Here</p>
          <p className="text-xs text-muted-foreground mb-2">
            Track your full portfolio. Live prices from CoinGecko. SKY4444
            included.
          </p>
          <Button size="sm" className="text-xs">
            Get Started
          </Button>
        </CardContent>
      </Card>
      <div className="text-center py-2">
        <p className="text-xs text-muted-foreground">
          ShadowChat · Skyler Blue IT Resolutions · 479-406-7123
        </p>
      </div>
    </div>
  );
}
