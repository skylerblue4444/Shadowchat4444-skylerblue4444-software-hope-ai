/**
 * ShadowChat — Crypto Estate Planning
 */
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ShadowCryptoEstate() {
  const items = [
    {
      icon: "🔐",
      title: "Multi-Sig",
      desc: "Require multiple keys",
      badge: "Secure",
    },
    {
      icon: "⏰",
      title: "Dead Man Switch",
      desc: "Auto-transfer if inactive",
      badge: "Protected",
    },
    {
      icon: "📋",
      title: "Will",
      desc: "Digital asset will template",
      badge: "Legal",
    },
    {
      icon: "👥",
      title: "Heirs",
      desc: "Assign multiple beneficiaries",
      badge: "Fair",
    },
    {
      icon: "🔑",
      title: "Key Recovery",
      desc: "Secure key recovery system",
      badge: "Safe",
    },
    {
      icon: "✦",
      title: "SKY4444",
      desc: "Include SKY4444 in estate",
      badge: "Native",
    },
  ];
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-black">Crypto Estate Planning</h1>
        <p className="text-xs text-muted-foreground">
          Secure your crypto for heirs · Multi-sig · Dead man switch
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
            Protect your crypto legacy.
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
