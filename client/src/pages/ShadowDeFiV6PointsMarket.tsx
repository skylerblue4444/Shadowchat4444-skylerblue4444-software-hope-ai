/**
 * ShadowChat — 🎯 Points Market V6
 * Skyler Blue | 479-406-7123 | skycoin444
 */
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

export default function ShadowDeFiV6PointsMarket() {
  return (
    <div className="space-y-4 pb-6">
      <div className="border-b border-border/40 pb-3">
        <h1 className="text-2xl font-black">🎯 Points Market V6</h1>
        <p className="text-xs text-muted-foreground">
          Trade protocol points before TGE. SKY4444 pairs available.
        </p>
      </div>
      <Card className="border-yellow-500/30 bg-gradient-to-br from-yellow-500/5 to-orange-500/5">
        <CardContent className="py-6 text-center space-y-3">
          <p className="text-4xl">✦</p>
          <p className="font-black text-lg">🎯 Points Market V6</p>
          <p className="text-sm text-muted-foreground max-w-xs mx-auto">
            Trade protocol points before TGE. SKY4444 pairs available.
          </p>
          <div className="flex gap-2 justify-center">
            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
              SKY4444
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
              Live
            </Badge>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              Free
            </Badge>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-2 gap-2">
        {["Get Started", "View Demo", "Connect Wallet", "Learn More"].map(
          (label, i) => (
            <Card
              key={i}
              className="border-border/40 hover:border-yellow-500/40 cursor-pointer transition-all active:scale-95"
            >
              <CardContent className="py-3 text-center">
                <p className="font-bold text-xs">{label}</p>
              </CardContent>
            </Card>
          )
        )}
      </div>
      <div className="flex gap-2">
        <Link href="/dashboard/shadow/sky-coin4444-mine">
          <Button
            size="sm"
            className="bg-yellow-500 hover:bg-yellow-400 text-black font-black text-xs h-8"
          >
            ⛏️ Mine SKY4444
          </Button>
        </Link>
        <Link href="/dashboard/shadow/skyler-shop">
          <Button
            size="sm"
            variant="outline"
            className="text-xs h-8 border-border/40"
          >
            🛒 Shop
          </Button>
        </Link>
      </div>
      <p className="text-center text-xs text-muted-foreground/60">
        Skyler Blue IT · 479-406-7123 · skycoin444 · Arkansas · 2,191+ pages
      </p>
    </div>
  );
}
