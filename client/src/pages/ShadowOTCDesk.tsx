/**
 * ShadowChat — OTC Trading Desk
 * Production-grade · Global appeal · SKY4444 integrated
 */
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ShadowOTCDesk() {
  const items = [
    {
      icon: "💰",
      title: "Min Trade",
      desc: "$10,000 minimum",
      badge: "Institutional",
    },
    {
      icon: "⚡",
      title: "Instant Fill",
      desc: "No slippage · Best price",
      badge: "Pro",
    },
    {
      icon: "🔒",
      title: "Escrow",
      desc: "SKY4444 escrow protection",
      badge: "Safe",
    },
    {
      icon: "📞",
      title: "Dedicated Desk",
      desc: "479-406-7123 · 24/7",
      badge: "Personal",
    },
    {
      icon: "🌍",
      title: "Global",
      desc: "USD · CNY · EUR · Crypto",
      badge: "Multi-currency",
    },
    {
      icon: "📊",
      title: "Price Discovery",
      desc: "Real-time OTC rates",
      badge: "Transparent",
    },
  ];
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-black">OTC Trading Desk</h1>
        <p className="text-xs text-muted-foreground">
          Large trades · No slippage · Direct settlement · SKY4444
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
            Trade large amounts without moving the market.
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
