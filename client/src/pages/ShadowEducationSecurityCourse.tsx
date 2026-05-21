/**
 * ShadowChat — Crypto Security Course
 * Skyler Blue | 479-406-7123 | skycoin444
 */
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
export default function ShadowEducationSecurityCourse() {
  const [a, sA] = useState<number | null>(null);
  const items = [
    {
      icon: "🔐",
      title: "Hardware Wallet",
      desc: "Ledger Trezor setup guide",
      badge: "Safe",
    },
    {
      icon: "🔑",
      title: "Seed Phrase",
      desc: "Secure seed phrase storage",
      badge: "Critical",
    },
    { icon: "📱", title: "2FA", desc: "Best 2FA practices", badge: "Secure" },
    {
      icon: "🎣",
      title: "Phishing",
      desc: "Spot phishing attacks",
      badge: "Aware",
    },
    {
      icon: "🌐",
      title: "OpSec",
      desc: "Online security practices",
      badge: "Private",
    },
    {
      icon: "💰",
      title: "Earn",
      desc: "Earn SKY4444 for completing",
      badge: "Incentive",
    },
  ];
  return (
    <div className="space-y-4 pb-6">
      <div className="border-b border-border/40 pb-3">
        <h1 className="text-2xl font-black">Crypto Security Course</h1>
        <p className="text-xs text-muted-foreground">
          Protect your crypto · Hardware wallets · OpSec · No more hacks
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {items.map((item, i) => (
          <Card
            key={i}
            onClick={() => sA(i === a ? null : i)}
            className={`border-border/40 hover:border-yellow-500/40 cursor-pointer transition-all ${a === i ? "border-yellow-500/50 bg-yellow-500/5" : ""}`}
          >
            <CardContent className="py-3 px-3">
              <p className="text-xl mb-1">{item.icon}</p>
              <p className="font-bold text-xs mb-0.5">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
              <Badge className="mt-1 bg-yellow-500/15 text-yellow-400 border-yellow-500/25 text-xs px-1.5 py-0 h-4">
                {item.badge}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="border-yellow-500/30 bg-gradient-to-br from-yellow-500/5 to-orange-500/5">
        <CardContent className="py-4 text-center space-y-2">
          <p className="font-black text-sm">✦ SKY4444 · ShadowChat</p>
          <p className="text-xs text-muted-foreground">
            Never get hacked. Ever.
          </p>
          <div className="flex gap-2 justify-center">
            <Button
              size="sm"
              className="text-xs h-7 bg-yellow-500 hover:bg-yellow-400 text-black font-bold"
            >
              Launch
            </Button>
            <Button size="sm" variant="outline" className="text-xs h-7">
              Details
            </Button>
          </div>
        </CardContent>
      </Card>
      <p className="text-center text-xs text-muted-foreground/60">
        Skyler Blue IT · 479-406-7123
      </p>
    </div>
  );
}
