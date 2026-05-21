/**
 * ShadowChat — Product Roadmap
 * Production-grade · Global appeal · SKY4444 integrated
 */
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ShadowRoadmap() {
  const items = [
    {
      icon: "Q1 2025",
      title: "Mobile App",
      desc: "iOS + Android native apps",
      badge: "🔜",
    },
    {
      icon: "Q1 2025",
      title: "Exchange Listing",
      desc: "SKY4444 on major exchanges",
      badge: "🔜",
    },
    {
      icon: "Q2 2025",
      title: "Visa Card",
      desc: "Physical SKY4444 card",
      badge: "🔜",
    },
    {
      icon: "Q2 2025",
      title: "DAO Launch",
      desc: "Community governance",
      badge: "🔜",
    },
    {
      icon: "Q3 2025",
      title: "Series A",
      desc: "$5M funding round",
      badge: "🔜",
    },
    {
      icon: "Q4 2025",
      title: "1M Users",
      desc: "Global expansion",
      badge: "🎯",
    },
  ];
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-black">Product Roadmap</h1>
        <p className="text-xs text-muted-foreground">
          What's coming · Q1-Q4 2025 · Community votes
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
            Vote on features. Shape the future of ShadowChat.
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
