/**
 * ShadowChat — Crypto Academy
 * Production-grade · Global appeal · SKY4444 integrated
 */
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ShadowCryptoAcademy() {
  const items = [
    {
      icon: "📚",
      title: "Crypto Basics",
      desc: "What is Bitcoin? Start here",
      badge: "Beginner",
    },
    {
      icon: "📈",
      title: "Trading 101",
      desc: "Charts · Indicators · Strategy",
      badge: "Intermediate",
    },
    {
      icon: "⛏️",
      title: "Mining Guide",
      desc: "How to mine any coin",
      badge: "Hands-on",
    },
    {
      icon: "🔐",
      title: "Security",
      desc: "Keep your crypto safe",
      badge: "Essential",
    },
    {
      icon: "🌐",
      title: "DeFi Deep Dive",
      desc: "Yield · Staking · Liquidity",
      badge: "Advanced",
    },
    {
      icon: "✦",
      title: "SKY4444 Rewards",
      desc: "Earn for every lesson",
      badge: "Motivated",
    },
  ];
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-black">Crypto Academy</h1>
        <p className="text-xs text-muted-foreground">
          Learn crypto · Free courses · Earn SKY4444 for completing
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
            Learn crypto from scratch. Earn SKY4444 for every course completed.
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
