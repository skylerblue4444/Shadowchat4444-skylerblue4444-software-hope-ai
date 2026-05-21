/**
 * ShadowChat — DeFi V4 Smart Vaults
 * Built by Skyler Blue | 479-406-7123 | skycoin444
 */
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ShadowDeFiV4Vaults() {
  const [active, setActive] = useState<number | null>(null);
  const items = [
    {
      icon: "🏦",
      title: "Auto-Compound",
      desc: "Yields compound every hour",
      badge: "Automatic",
    },
    {
      icon: "🤖",
      title: "AI Strategy",
      desc: "AI picks best yield strategy",
      badge: "Smart",
    },
    {
      icon: "🛡️",
      title: "Audited",
      desc: "Triple-audited smart contracts",
      badge: "Safe",
    },
    {
      icon: "📊",
      title: "Live APY",
      desc: "Real-time yield tracking",
      badge: "Transparent",
    },
    {
      icon: "🔄",
      title: "Rebalance",
      desc: "Auto-rebalances for max yield",
      badge: "Optimal",
    },
    {
      icon: "✦",
      title: "SKY4444",
      desc: "Extra 4.44% SKY4444 boost",
      badge: "Bonus",
    },
  ];
  return (
    <div className="space-y-4 pb-6">
      <div className="border-b border-border/40 pb-3">
        <h1 className="text-2xl font-black tracking-tight">
          DeFi V4 Smart Vaults
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Auto-compounding yield vaults · Strategy optimization · SKY4444 boost
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {items.map((item, i) => (
          <Card
            key={i}
            onClick={() => setActive(i === active ? null : i)}
            className={`border-border/40 hover:border-yellow-500/40 transition-all cursor-pointer ${active === i ? "border-yellow-500/60 bg-yellow-500/5" : ""}`}
          >
            <CardContent className="py-3 px-3">
              <p className="text-xl mb-1">{item.icon}</p>
              <p className="font-bold text-xs leading-tight mb-0.5">
                {item.title}
              </p>
              <p className="text-xs text-muted-foreground leading-tight">
                {item.desc}
              </p>
              <Badge className="mt-1.5 bg-yellow-500/15 text-yellow-400 border-yellow-500/25 text-xs px-1.5 py-0 h-4">
                {item.badge}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="border-yellow-500/30 bg-gradient-to-br from-yellow-500/5 to-orange-500/5">
        <CardContent className="py-4 px-4 text-center space-y-2">
          <p className="font-black text-sm">✦ SKY4444 · ShadowChat Platform</p>
          <p className="text-xs text-muted-foreground">
            The smartest yield vaults in DeFi.
          </p>
          <div className="flex gap-2 justify-center">
            <Button
              size="sm"
              className="text-xs h-7 bg-yellow-500 hover:bg-yellow-400 text-black font-bold"
            >
              Launch Now
            </Button>
            <Button size="sm" variant="outline" className="text-xs h-7">
              Learn More
            </Button>
          </div>
        </CardContent>
      </Card>
      <p className="text-center text-xs text-muted-foreground/60">
        Skyler Blue IT Resolutions · 479-406-7123 · skycoin444
      </p>
    </div>
  );
}
