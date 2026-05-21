/**
 * ShadowChat — Spot Trading V2
 * Skyler Blue | 479-406-7123 | skycoin444
 */
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
export default function ShadowTradingSpotV2() {
  const [a, sA] = useState<number | null>(null);
  const items = [
    {
      icon: "📊",
      title: "Advanced Charts",
      desc: "TradingView-style charts",
      badge: "Professional",
    },
    {
      icon: "📋",
      title: "Order Types",
      desc: "Limit market stop OCO",
      badge: "Flexible",
    },
    {
      icon: "💧",
      title: "Deep Liquidity",
      desc: "Tight spreads deep books",
      badge: "Quality",
    },
    {
      icon: "⚡",
      title: "Fast Execution",
      desc: "Sub-millisecond execution",
      badge: "Speed",
    },
    {
      icon: "💰",
      title: "Low Fees",
      desc: "0.05% maker 0.1% taker",
      badge: "Cheap",
    },
    {
      icon: "✦",
      title: "SKY4444",
      desc: "SKY4444 spot trading",
      badge: "Native",
    },
  ];
  return (
    <div className="space-y-4 pb-6">
      <div className="border-b border-border/40 pb-3">
        <h1 className="text-2xl font-black">Spot Trading V2</h1>
        <p className="text-xs text-muted-foreground">
          Advanced spot trading · Limit market stop · All pairs
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
            Spot trading like a professional.
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
