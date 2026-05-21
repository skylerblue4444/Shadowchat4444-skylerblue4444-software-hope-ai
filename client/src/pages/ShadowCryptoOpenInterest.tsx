/**
 * ShadowChat — Open Interest Tracker
 */
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ShadowCryptoOpenInterest() {
  const items = [
    {
      icon: "📊",
      title: "Total OI",
      desc: "Open interest by coin",
      badge: "Scale",
    },
    {
      icon: "📈",
      title: "OI Change",
      desc: "Rising falling OI",
      badge: "Direction",
    },
    {
      icon: "🏦",
      title: "By Exchange",
      desc: "OI breakdown by venue",
      badge: "Distribution",
    },
    {
      icon: "📉",
      title: "Price Correlation",
      desc: "OI vs price relationship",
      badge: "Insight",
    },
    {
      icon: "🔔",
      title: "OI Spike",
      desc: "Unusual OI alerts",
      badge: "Signal",
    },
    {
      icon: "✦",
      title: "SKY4444",
      desc: "SKY4444 OI tracking",
      badge: "Native",
    },
  ];
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-black">Open Interest Tracker</h1>
        <p className="text-xs text-muted-foreground">
          Total OI across exchanges · Changes · Price correlation
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
            Open interest reveals conviction.
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
