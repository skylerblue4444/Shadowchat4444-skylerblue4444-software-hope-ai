/**
 * ShadowChat — 24/7 IT Support
 */
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ShadowITSupport247() {
  const items = [
    {
      icon: "🕐",
      title: "24/7",
      desc: "Support every hour of every day",
      badge: "Always",
    },
    {
      icon: "⚡",
      title: "Fast Response",
      desc: "Under 15-minute response",
      badge: "Quick",
    },
    {
      icon: "🖥️",
      title: "Remote",
      desc: "Fix most issues remotely",
      badge: "Efficient",
    },
    {
      icon: "🚗",
      title: "On-Site",
      desc: "On-site for complex issues",
      badge: "Available",
    },
    {
      icon: "📊",
      title: "Ticket System",
      desc: "Track every issue",
      badge: "Organized",
    },
    { icon: "📞", title: "Call Now", desc: "479-406-7123", badge: "Immediate" },
  ];
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-black">24/7 IT Support</h1>
        <p className="text-xs text-muted-foreground">
          Round-the-clock IT support · Remote and on-site · Arkansas
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
            IT support that never sleeps.
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
