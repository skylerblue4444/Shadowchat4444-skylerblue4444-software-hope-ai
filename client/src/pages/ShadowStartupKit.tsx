/**
 * ShadowChat — Startup Kit
 */
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ShadowStartupKit() {
  const items = [
    {
      icon: "📋",
      title: "Business Plan",
      desc: "Crypto startup template",
      badge: "Ready",
    },
    {
      icon: "💰",
      title: "Tokenomics",
      desc: "Design your token economy",
      badge: "Guide",
    },
    {
      icon: "⚖️",
      title: "Legal Templates",
      desc: "Terms · Privacy · AML",
      badge: "Compliant",
    },
    {
      icon: "🔌",
      title: "API Starter",
      desc: "Connect to ShadowChat",
      badge: "Code",
    },
    {
      icon: "📊",
      title: "Pitch Deck",
      desc: "Investor presentation",
      badge: "Template",
    },
    {
      icon: "✦",
      title: "SKY4444 Grant",
      desc: "500 SKY4444 for startups",
      badge: "Free",
    },
  ];
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-black">Startup Kit</h1>
        <p className="text-xs text-muted-foreground">
          Everything you need to launch a crypto startup · Templates · Code ·
          Guides
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
            Launch your crypto startup with ShadowChat tools and templates.
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
