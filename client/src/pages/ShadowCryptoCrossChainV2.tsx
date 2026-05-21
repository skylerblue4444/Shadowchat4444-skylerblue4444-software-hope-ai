/**
 * ShadowChat — Cross-Chain Hub V2
 * Skyler Blue | 479-406-7123 | skycoin444
 */
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
export default function ShadowCryptoCrossChainV2() {
  const [a, sA] = useState<number | null>(null);
  const items = [
    {
      icon: "🌉",
      title: "30+ Chains",
      desc: "Connect any chain to any chain",
      badge: "Universal",
    },
    {
      icon: "💰",
      title: "Best Rates",
      desc: "AI finds best cross-chain rate",
      badge: "Optimal",
    },
    {
      icon: "💬",
      title: "Messaging",
      desc: "Cross-chain message passing",
      badge: "Communicate",
    },
    {
      icon: "⚡",
      title: "Fast",
      desc: "Most bridges under 2 minutes",
      badge: "Quick",
    },
    {
      icon: "🛡️",
      title: "Secure",
      desc: "Audited bridge contracts",
      badge: "Safe",
    },
    {
      icon: "✦",
      title: "SKY4444",
      desc: "SKY4444 on every chain",
      badge: "Native",
    },
  ];
  return (
    <div className="space-y-4 pb-6">
      <div className="border-b border-border/40 pb-3">
        <h1 className="text-2xl font-black">Cross-Chain Hub V2</h1>
        <p className="text-xs text-muted-foreground">
          Bridge swap message across 30+ chains · Best rates · Fast
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
            Move anything anywhere instantly.
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
