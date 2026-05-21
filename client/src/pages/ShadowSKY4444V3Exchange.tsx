/**
 * ShadowChat — SKY4444 V3 Exchange
 * Skyler Blue | 479-406-7123 | skycoin444
 */
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
export default function ShadowSKY4444V3Exchange() {
  const [a, sA] = useState<number | null>(null);
  const items = [
    {
      icon: "📊",
      title: "100+ Pairs",
      desc: "SKY4444 vs 100+ coins",
      badge: "Wide",
    },
    {
      icon: "💰",
      title: "0.05% Fee",
      desc: "Lowest trading fee",
      badge: "Cheap",
    },
    {
      icon: "💧",
      title: "Deep Liquidity",
      desc: "$10M+ in liquidity",
      badge: "Deep",
    },
    { icon: "⚡", title: "Fast", desc: "Sub-10ms execution", badge: "Speed" },
    {
      icon: "📱",
      title: "Mobile",
      desc: "Trade on mobile",
      badge: "Convenient",
    },
    {
      icon: "✦",
      title: "SKY4444",
      desc: "Native SKY4444 exchange",
      badge: "Core",
    },
  ];
  return (
    <div className="space-y-4 pb-6">
      <div className="border-b border-border/40 pb-3">
        <h1 className="text-2xl font-black">SKY4444 V3 Exchange</h1>
        <p className="text-xs text-muted-foreground">
          Trade SKY4444 against 100+ pairs · Lowest fees · Deepest liquidity
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {items.map((item, i) => (
          <Card
            key={i}
            onClick={() => sA(i === a ? null : i)}
            className={`border-border/40 hover:border-yellow-500/40 cursor-pointer transition-all ${a === i ? "border-yellow-500/50 bg-yellow-500/5" : ""}`}
          >
            <CardContent className="py-3 px-3">
              <p className="text-xl mb-1">{item.icon}</p>
              <p className="font-bold text-xs mb-0.5">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
              <Badge className="mt-1 bg-yellow-500/15 text-yellow-400 border-yellow-500/25 text-xs px-1.5 py-0 h-4">
                {item.badge}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="border-yellow-500/30 bg-gradient-to-br from-yellow-500/5 to-orange-500/5">
        <CardContent className="py-4 text-center space-y-2">
          <p className="font-black text-sm">✦ SKY4444 · ShadowChat</p>
          <p className="text-xs text-muted-foreground">
            The best place to trade SKY4444.
          </p>
          <div className="flex gap-2 justify-center">
            <Button
              size="sm"
              className="text-xs h-7 bg-yellow-500 hover:bg-yellow-400 text-black font-bold"
            >
              Launch
            </Button>
            <Button size="sm" variant="outline" className="text-xs h-7">
              Details
            </Button>
          </div>
        </CardContent>
      </Card>
      <p className="text-center text-xs text-muted-foreground/60">
        Skyler Blue IT · 479-406-7123
      </p>
    </div>
  );
}
