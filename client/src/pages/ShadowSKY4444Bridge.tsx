/**
 * ShadowChat — SKY4444 Bridge
 */
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ShadowSKY4444Bridge() {
  const items = [
    {
      icon: "🌉",
      title: "ETH Bridge",
      desc: "SKY4444 on Ethereum",
      badge: "ERC-20",
    },
    {
      icon: "☀️",
      title: "SOL Bridge",
      desc: "SKY4444 on Solana",
      badge: "SPL",
    },
    {
      icon: "🟡",
      title: "BNB Bridge",
      desc: "SKY4444 on BNB Chain",
      badge: "BEP-20",
    },
    { icon: "🟣", title: "Polygon", desc: "SKY4444 on Polygon", badge: "L2" },
    {
      icon: "🔺",
      title: "Avalanche",
      desc: "SKY4444 on Avalanche",
      badge: "C-Chain",
    },
    {
      icon: "✦",
      title: "Native",
      desc: "SKY4444 everywhere",
      badge: "Omnichain",
    },
  ];
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-black">SKY4444 Bridge</h1>
        <p className="text-xs text-muted-foreground">
          Bridge SKY4444 to Ethereum Solana BNB Polygon Avalanche
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
            SKY4444 on every major chain.
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
