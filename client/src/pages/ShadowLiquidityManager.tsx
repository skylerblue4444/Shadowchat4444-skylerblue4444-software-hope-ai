/**
 * ShadowChat — Liquidity Manager
 */
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ShadowLiquidityManager() {
  const items = [
    {
      icon: "💧",
      title: "30 Protocols",
      desc: "Uniswap Curve Balancer +27",
      badge: "Complete",
    },
    {
      icon: "📊",
      title: "Position Tracker",
      desc: "All LP positions in one view",
      badge: "Clear",
    },
    {
      icon: "🔄",
      title: "Auto-Compound",
      desc: "Reinvest rewards automatically",
      badge: "Passive",
    },
    {
      icon: "💰",
      title: "Fee Earnings",
      desc: "Track fee income in real-time",
      badge: "Profitable",
    },
    {
      icon: "⚠️",
      title: "IL Calculator",
      desc: "Impermanent loss calculator",
      badge: "Aware",
    },
    {
      icon: "✦",
      title: "SKY4444",
      desc: "SKY4444 LP pools available",
      badge: "Native",
    },
  ];
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-black">Liquidity Manager</h1>
        <p className="text-xs text-muted-foreground">
          Manage LP positions across 30 protocols · Auto-compound
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
            Maximize your liquidity mining returns.
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
