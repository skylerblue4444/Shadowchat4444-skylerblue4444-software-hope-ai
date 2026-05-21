/**
 * ShadowChat — DeFi Yield Optimizer
 * Production-grade · Global appeal · SKY4444 integrated
 */
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ShadowDeFiYield() {
  const items = [
    {
      icon: "🔄",
      title: "Auto-Compound",
      desc: "Reinvest rewards automatically",
      badge: "Auto",
    },
    {
      icon: "📊",
      title: "Best Rate Finder",
      desc: "Scans 50+ protocols",
      badge: "Live",
    },
    {
      icon: "⚡",
      title: "Flash Harvest",
      desc: "Claim all rewards in one tx",
      badge: "Fast",
    },
    {
      icon: "🛡️",
      title: "Risk Score",
      desc: "Low/Medium/High ratings",
      badge: "Safe",
    },
    {
      icon: "💰",
      title: "Total Earned",
      desc: "$4,444 this month",
      badge: "Hot",
    },
    {
      icon: "✦",
      title: "SKY4444 Bonus",
      desc: "+10% on all yields",
      badge: "Bonus",
    },
  ];
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-black">DeFi Yield Optimizer</h1>
        <p className="text-xs text-muted-foreground">
          Auto-compound yields · Best rates across protocols · SKY4444 rewards
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
            Maximize your DeFi yields automatically. SKY4444 bonus on all
            positions.
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
