/**
 * ShadowChat — Mobile Onboarding
 */
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ShadowMobileOnboarding() {
  const items = [
    {
      icon: "⏱️",
      title: "60 Seconds",
      desc: "Account ready instantly",
      badge: "Fast",
    },
    {
      icon: "📧",
      title: "Email Only",
      desc: "No phone number needed",
      badge: "Private",
    },
    {
      icon: "🔑",
      title: "Auto-Wallet",
      desc: "Wallet created automatically",
      badge: "Easy",
    },
    {
      icon: "⛏️",
      title: "Mine Now",
      desc: "Start mining SKY4444 immediately",
      badge: "Instant",
    },
    {
      icon: "📚",
      title: "Tutorial",
      desc: "Interactive 5-step guide",
      badge: "Helpful",
    },
    {
      icon: "✦",
      title: "Welcome Bonus",
      desc: "44 SKY4444 on signup",
      badge: "Reward",
    },
  ];
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-black">Mobile Onboarding</h1>
        <p className="text-xs text-muted-foreground">
          Get started in 60 seconds · No KYC for basic use
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
            Start your crypto journey in 60 seconds.
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
