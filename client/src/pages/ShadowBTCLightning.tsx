/**
 * ShadowChat — Bitcoin Lightning Network
 */
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ShadowBTCLightning() {
  const items = [
    {
      icon: "⚡",
      title: "Instant",
      desc: "Payments in milliseconds",
      badge: "Fast",
    },
    {
      icon: "💰",
      title: "Near-Zero Fees",
      desc: "0.001% average fee",
      badge: "Cheap",
    },
    {
      icon: "🔗",
      title: "Open Channel",
      desc: "Open Lightning channel",
      badge: "Connect",
    },
    {
      icon: "📊",
      title: "Channel Stats",
      desc: "Balance and capacity",
      badge: "Manage",
    },
    {
      icon: "🛒",
      title: "Payments",
      desc: "Accept Lightning payments",
      badge: "Merchant",
    },
    {
      icon: "✦",
      title: "SKY4444",
      desc: "Lightning + SKY4444",
      badge: "Combo",
    },
  ];
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-black">Bitcoin Lightning Network</h1>
        <p className="text-xs text-muted-foreground">
          Instant BTC payments · Near-zero fees · Open channels
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
            Bitcoin payments at the speed of light.
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
