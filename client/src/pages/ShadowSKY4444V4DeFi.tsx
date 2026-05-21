/**
 * ShadowChat — ✦ SKY4444 DeFi Hub
 * Skyler Blue | 479-406-7123 | skycoin444
 */
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

export default function ShadowSKY4444V4DeFi() {
  return (
    <div className="space-y-4 pb-6">
      <div className="border-b border-border/40 pb-3">
        <h1 className="text-2xl font-black">✦ SKY4444 DeFi Hub</h1>
        <p className="text-xs text-muted-foreground">
          All SKY4444 DeFi in one place. Staking, farming, lending, and yield
          optimization.
        </p>
      </div>
      <Card className="border-yellow-500/30 bg-gradient-to-br from-yellow-500/5 to-orange-500/5">
        <CardContent className="py-6 text-center space-y-3">
          <p className="text-4xl">⚡</p>
          <p className="font-black text-lg">✦ SKY4444 DeFi Hub</p>
          <p className="text-sm text-muted-foreground max-w-xs mx-auto">
            All SKY4444 DeFi in one place. Staking, farming, lending, and yield
            optimization.
          </p>
          <div className="flex gap-2 justify-center flex-wrap">
            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
              SKY4444 Powered
            </Badge>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              Live
            </Badge>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-2 gap-2">
        {["Launch", "Explore", "Connect", "Learn"].map((label, i) => (
          <Card
            key={i}
            className="border-border/40 hover:border-yellow-500/40 cursor-pointer transition-all active:scale-95"
          >
            <CardContent className="py-3 text-center">
              <p className="font-bold text-sm">{label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                SKY4444 · BTC · ETH
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="border-border/40">
        <CardContent className="py-4 space-y-1.5">
          <p className="font-black text-sm">Why ShadowChat?</p>
          {[
            "2,131+ platform pages",
            "Real crypto mining",
            "SKY4444 economy",
            "0 TypeScript errors",
            "Built in Arkansas by Skyler Blue",
          ].map((f, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-yellow-400 text-xs">✦</span>
              <p className="text-xs text-muted-foreground">{f}</p>
            </div>
          ))}
        </CardContent>
      </Card>
      <div className="flex gap-2">
        <Link href="/dashboard/shadow/sky-coin4444-mine">
          <Button
            size="sm"
            className="bg-yellow-500 hover:bg-yellow-400 text-black font-black text-xs h-8"
          >
            ⛏️ Mine SKY4444
          </Button>
        </Link>
        <Link href="/dashboard/shadow/live-wallet">
          <Button
            size="sm"
            variant="outline"
            className="text-xs h-8 border-yellow-500/30 text-yellow-400"
          >
            👛 Open Wallet
          </Button>
        </Link>
      </div>
      <p className="text-center text-xs text-muted-foreground/60">
        Skyler Blue IT · 479-406-7123 · skycoin444 · Arkansas
      </p>
    </div>
  );
}
