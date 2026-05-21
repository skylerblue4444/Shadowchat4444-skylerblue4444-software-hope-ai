/**
 * ShadowChat — Stablecoin Yield
 */
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ShadowStablecoinYield() {
  const items = [
    {
      icon: "💵",
      title: "USDT Yield",
      desc: "8% APY on Tether",
      badge: "Stable",
    },
    { icon: "🔵", title: "USDC Yield", desc: "9% APY on USDC", badge: "Safe" },
    { icon: "🌈", title: "DAI Yield", desc: "10% APY on DAI", badge: "DeFi" },
    {
      icon: "📊",
      title: "Auto-Compound",
      desc: "Earnings compound daily",
      badge: "Grow",
    },
    {
      icon: "🛡️",
      title: "Audited",
      desc: "Security-audited protocols",
      badge: "Safe",
    },
    {
      icon: "✦",
      title: "SKY4444",
      desc: "Extra SKY4444 bonus yield",
      badge: "Bonus",
    },
  ];
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-black">Stablecoin Yield</h1>
        <p className="text-xs text-muted-foreground">
          Earn 8-15% APY on USDT USDC DAI · Safe and stable
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
            Stable returns on stable coins.
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
