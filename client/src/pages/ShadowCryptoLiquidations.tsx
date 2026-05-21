/**
 * ShadowChat — Liquidation Tracker
 */
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ShadowCryptoLiquidations() {
  const items = [
    {
      icon: "💥",
      title: "Live Liquidations",
      desc: "Real-time liquidation feed",
      badge: "Dramatic",
    },
    {
      icon: "🗺️",
      title: "Liquidation Map",
      desc: "Price levels with most longs/shorts",
      badge: "Risk",
    },
    {
      icon: "📊",
      title: "Cascade Risk",
      desc: "Identify cascade zones",
      badge: "Danger",
    },
    {
      icon: "💰",
      title: "Total Liquidated",
      desc: "24h liquidation volume",
      badge: "Scale",
    },
    {
      icon: "🔔",
      title: "Alerts",
      desc: "Get alerted before cascades",
      badge: "Protect",
    },
    {
      icon: "✦",
      title: "SKY4444",
      desc: "SKY4444 liquidation data",
      badge: "Native",
    },
  ];
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-black">Liquidation Tracker</h1>
        <p className="text-xs text-muted-foreground">
          Real-time liquidation map · Cascades · Risk zones
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {items.map((item, i) => (
          <Card
            key={i}
            className="border-border/50 hover:border-primary/30 transition-all cursor-pointer"
          >
            <CardContent className="py-3 px-3">
              <p className="text-2xl mb-1">{item.icon}</p>
              <p className="font-bold text-xs mb-0.5">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
              <Badge className="mt-1 bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs px-1.5 py-0">
                {item.badge}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="py-4 px-4 text-center">
          <p className="font-black text-sm mb-1">✦ SKY4444 · ShadowChat</p>
          <p className="text-xs text-muted-foreground mb-2">
            See where the pain is before it happens.
          </p>
          <Button size="sm" className="text-xs">
            Launch
          </Button>
        </CardContent>
      </Card>
      <p className="text-center text-xs text-muted-foreground">
        Skyler Blue IT Resolutions · 479-406-7123
      </p>
    </div>
  );
}
