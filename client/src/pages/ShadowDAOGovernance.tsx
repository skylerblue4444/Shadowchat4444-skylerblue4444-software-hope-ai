/**
 * ShadowChat — DAO Governance
 */
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ShadowDAOGovernance() {
  const items = [
    {
      icon: "🗳️",
      title: "Vote",
      desc: "1 SKY4444 = 1 vote",
      badge: "Democratic",
    },
    {
      icon: "📋",
      title: "Proposals",
      desc: "Submit improvement proposals",
      badge: "Open",
    },
    {
      icon: "💰",
      title: "Treasury",
      desc: "4.44M SKY4444 community fund",
      badge: "Managed",
    },
    {
      icon: "📊",
      title: "Results",
      desc: "Transparent on-chain voting",
      badge: "Public",
    },
    {
      icon: "🏆",
      title: "Top Voters",
      desc: "Earn governance rewards",
      badge: "Incentivized",
    },
    { icon: "✦", title: "Quorum", desc: "10% of supply needed", badge: "Fair" },
  ];
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-black">DAO Governance</h1>
        <p className="text-xs text-muted-foreground">
          SKY4444 holders vote · Proposals · Treasury · Community
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
          <p className="font-black text-sm mb-1">✦ SKY4444 Integrated</p>
          <p className="text-xs text-muted-foreground mb-2">
            SKY4444 holders govern ShadowChat. Your tokens = your voice.
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
