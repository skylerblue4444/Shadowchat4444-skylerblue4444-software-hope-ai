/**
 * ShadowChat — Token Vesting
 */
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ShadowTokenVesting() {
  const items = [
    {
      icon: "👑",
      title: "Founder",
      desc: "20% · 4-year vest · 1-year cliff",
      badge: "Aligned",
    },
    {
      icon: "💰",
      title: "Investors",
      desc: "15% · 2-year vest · 6-mo cliff",
      badge: "Protected",
    },
    {
      icon: "👥",
      title: "Team",
      desc: "15% · 3-year vest · 1-year cliff",
      badge: "Motivated",
    },
    {
      icon: "🌍",
      title: "Community",
      desc: "40% · Distributed over 4 years",
      badge: "Fair",
    },
    {
      icon: "🔒",
      title: "Treasury",
      desc: "10% · DAO controlled",
      badge: "Governed",
    },
    {
      icon: "📊",
      title: "Schedule",
      desc: "Full vesting calendar",
      badge: "Transparent",
    },
  ];
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-black">Token Vesting</h1>
        <p className="text-xs text-muted-foreground">
          SKY4444 vesting schedules · Team · Investors · Community
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
            Transparent SKY4444 token distribution and vesting schedule.
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
