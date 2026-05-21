/**
 * ShadowChat — Crypto Tax Report
 * Production-grade · Global appeal · SKY4444 integrated
 */
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ShadowTaxReport() {
  const items = [
    {
      icon: "📋",
      title: "2024 Tax Report",
      desc: "All trades · Auto-calculated",
      badge: "Ready",
    },
    {
      icon: "💰",
      title: "Capital Gains",
      desc: "Short/Long term breakdown",
      badge: "Calculated",
    },
    {
      icon: "⛏️",
      title: "Mining Income",
      desc: "Block rewards as income",
      badge: "Tracked",
    },
    {
      icon: "🛒",
      title: "Shop Purchases",
      desc: "Cost basis tracking",
      badge: "Tracked",
    },
    {
      icon: "📄",
      title: "Export PDF",
      desc: "IRS Form 8949 ready",
      badge: "Export",
    },
    {
      icon: "📊",
      title: "Export CSV",
      desc: "TurboTax compatible",
      badge: "Export",
    },
  ];
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-black">Crypto Tax Report</h1>
        <p className="text-xs text-muted-foreground">
          Auto-generate tax reports · IRS compliant · Export CSV/PDF
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
            Generate your crypto tax report in minutes. IRS compliant.
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
