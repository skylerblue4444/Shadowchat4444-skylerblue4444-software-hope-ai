/**
 * ShadowChat — SKY4444 Staking Pool
 * Production-grade · Global appeal · SKY4444 integrated
 */
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ShadowStakingPool() {
  const items = [
    {
      icon: "✦",
      title: "Flexible Stake",
      desc: "44.4% APY · Unstake anytime",
      badge: "Hot",
    },
    {
      icon: "🔒",
      title: "30-Day Lock",
      desc: "88.8% APY · Higher rewards",
      badge: "Best",
    },
    {
      icon: "💎",
      title: "90-Day Lock",
      desc: "133.2% APY · Diamond tier",
      badge: "Elite",
    },
    {
      icon: "🏆",
      title: "1-Year Lock",
      desc: "177.6% APY · Founder tier",
      badge: "Rare",
    },
    {
      icon: "📊",
      title: "Pool Stats",
      desc: "4.44M SKY4444 staked",
      badge: "Live",
    },
    {
      icon: "💰",
      title: "Your Rewards",
      desc: "Compound daily",
      badge: "Auto",
    },
  ];
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-black">SKY4444 Staking Pool</h1>
        <p className="text-xs text-muted-foreground">
          Stake SKY4444 · Earn 44.4% APY · Compound daily
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
            Stake SKY4444 and earn up to 177.6% APY. Rewards compound daily.
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
