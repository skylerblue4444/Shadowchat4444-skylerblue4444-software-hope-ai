/**
 * ShadowChat — Crypto Remittance
 * Built by Skyler Blue | 479-406-7123 | skycoin444
 */
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ShadowFintechRemittance() {
  const [active, setActive] = useState<number | null>(null);
  const items = [
    {
      icon: "🌍",
      title: "Global",
      desc: "Send to 150+ countries",
      badge: "Worldwide",
    },
    {
      icon: "💰",
      title: "90% Cheaper",
      desc: "vs Western Union MoneyGram",
      badge: "Save",
    },
    {
      icon: "⚡",
      title: "Instant",
      desc: "Arrives in under 1 minute",
      badge: "Fast",
    },
    {
      icon: "📱",
      title: "Mobile",
      desc: "Send from your phone",
      badge: "Easy",
    },
    {
      icon: "💵",
      title: "Any Currency",
      desc: "USD EUR GBP + 50 more",
      badge: "Flexible",
    },
    {
      icon: "✦",
      title: "SKY4444",
      desc: "Send SKY4444 globally",
      badge: "Native",
    },
  ];
  return (
    <div className="space-y-4 pb-6">
      <div className="border-b border-border/40 pb-3">
        <h1 className="text-2xl font-black tracking-tight">
          Crypto Remittance
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Send money globally · 90% cheaper than Western Union
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
            Send money home. Keep 90% more.
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
