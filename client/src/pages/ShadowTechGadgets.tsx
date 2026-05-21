/**
 * ShadowChat — Tech Gadgets
 * Production-grade · Global appeal · SKY4444 integrated
 */
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ShadowTechGadgets() {
  const items = [
    {
      icon: "⛏️",
      title: "ASIC Miner",
      desc: "Antminer S19 · $2,499",
      badge: "Pro",
    },
    {
      icon: "🖥️",
      title: "Mining GPU",
      desc: "RTX 4090 · $1,199",
      badge: "Powerful",
    },
    {
      icon: "⌨️",
      title: "RGB Keyboard",
      desc: "Mechanical · $34.99",
      badge: "Gaming",
    },
    {
      icon: "🖱️",
      title: "Gaming Mouse",
      desc: "16K DPI · $29.99",
      badge: "Precise",
    },
    {
      icon: "📡",
      title: "WiFi 6 Router",
      desc: "AX6000 · $149.99",
      badge: "Fast",
    },
    {
      icon: "💡",
      title: "Smart Lights",
      desc: "RGB 10M · $18.99",
      badge: "Fun",
    },
  ];
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-black">Tech Gadgets</h1>
        <p className="text-xs text-muted-foreground">
          Mining hardware · Gaming gear · Smart devices · Crypto tools
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
            Gear up for mining and gaming. Pay with SKY4444.
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
