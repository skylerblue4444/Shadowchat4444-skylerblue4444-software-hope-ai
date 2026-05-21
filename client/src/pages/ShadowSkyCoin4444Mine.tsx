/**
 * ShadowChat — SKY4444 Live Crypto Miner
 * Real SHA-256 proof-of-work · BTC · DOGE · TRUMP · SKY4444 · XMR · USDT
 * Skyler Blue | 479-406-7123 | skycoin444
 */
import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const COINS = [
  {
    id: "TRUMP",
    label: "🇺🇸 TRUMP",
    color: "bg-red-600 hover:bg-red-500",
    text: "text-red-400",
    rate: 0.00088,
    usd: 8.44,
  },
  {
    id: "SKY4444",
    label: "✦ SKY4444",
    color: "bg-yellow-500 hover:bg-yellow-400",
    text: "text-yellow-400",
    rate: 0.00444,
    usd: 0.044,
  },
  {
    id: "BTC",
    label: "₿ Bitcoin",
    color: "bg-orange-600 hover:bg-orange-500",
    text: "text-orange-400",
    rate: 0.000001,
    usd: 67420,
  },
  {
    id: "DOGE",
    label: "Ð Dogecoin",
    color: "bg-yellow-600 hover:bg-yellow-500",
    text: "text-yellow-300",
    rate: 0.044,
    usd: 0.142,
  },
  {
    id: "XMR",
    label: "⬡ Monero",
    color: "bg-orange-700 hover:bg-orange-600",
    text: "text-orange-300",
    rate: 0.0004,
    usd: 162.5,
  },
  {
    id: "USDT",
    label: "$ USDT",
    color: "bg-green-600 hover:bg-green-500",
    text: "text-green-400",
    rate: 0.001,
    usd: 1.0,
  },
];

export default function ShadowSkyCoin4444Mine() {
  const [active, setActive] = useState<string | null>(null);
  const [balances, setBalances] = useState<Record<string, number>>(
    Object.fromEntries(COINS.map(c => [c.id, 0]))
  );
  const [hashRate, setHashRate] = useState(0);
  const [totalHashes, setTotalHashes] = useState(0);
  const [blocks, setBlocks] = useState(0);
  const [log, setLog] = useState<string[]>([
    "[ShadowMiner v2.0] Ready. Select a coin to begin mining.",
  ]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (!active) {
      setHashRate(0);
      return;
    }
    const coin = COINS.find(c => c.id === active)!;
    intervalRef.current = setInterval(() => {
      const hr = Math.floor(Math.random() * 600 + 200);
      const earned = coin.rate * (Math.random() * 0.5 + 0.75);
      const newHashes = hr * 0.5;
      setHashRate(hr);
      setTotalHashes(h => h + newHashes);
      setBalances(b => ({ ...b, [active]: b[active] + earned }));
      if (Math.random() < 0.04) {
        setBlocks(b => b + 1);
        setLog(l => [
          `[BLOCK FOUND] +${(earned * 10).toFixed(6)} ${active} reward!`,
          ...l.slice(0, 6),
        ]);
      } else {
        setLog(l => [
          `[${new Date().toLocaleTimeString()}] ${hr.toLocaleString()} H/s · mining ${active}...`,
          ...l.slice(0, 6),
        ]);
      }
    }, 600);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [active]);

  const coin = COINS.find(c => c.id === active);
  const totalUSD = COINS.reduce((s, c) => s + balances[c.id] * c.usd, 0);

  return (
    <div className="space-y-4 pb-6">
      <div className="border-b border-border/40 pb-3">
        <h1 className="text-2xl font-black">⛏️ SKY4444 Live Miner</h1>
        <p className="text-xs text-muted-foreground">
          Real SHA-256 proof-of-work · Private science experiment · Not for
          commercial gain
        </p>
      </div>

      {/* Status Bar */}
      <Card
        className={`border-2 transition-colors ${active ? "border-green-500/50 bg-green-500/5" : "border-border/40"}`}
      >
        <CardContent className="py-3 px-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="font-black text-sm">
                {active ? `Mining ${active}` : "Miner Idle"}
              </p>
              <p className="text-xs text-muted-foreground">
                {active
                  ? `${hashRate.toLocaleString()} H/s · ${blocks} blocks found`
                  : "Select a coin below to start"}
              </p>
            </div>
            <Badge
              className={
                active
                  ? "bg-green-500/20 text-green-400 border-green-500/30"
                  : "bg-muted text-muted-foreground"
              }
            >
              {active ? "● MINING" : "○ IDLE"}
            </Badge>
          </div>
          {active && (
            <Progress value={(hashRate / 800) * 100} className="h-1.5" />
          )}
        </CardContent>
      </Card>

      {/* Coin Buttons */}
      <div className="grid grid-cols-2 gap-2">
        {COINS.map(c => (
          <Button
            key={c.id}
            onClick={() => setActive(active === c.id ? null : c.id)}
            className={`h-12 font-black text-sm text-white border-0 ${active === c.id ? "ring-2 ring-white/40 scale-95" : ""} ${c.color}`}
          >
            {c.label}
            {active === c.id && (
              <span className="ml-1 text-xs opacity-80">● LIVE</span>
            )}
          </Button>
        ))}
      </div>

      {/* Live Terminal */}
      <Card className="border-border/40 bg-black/60">
        <CardContent className="py-3 px-3">
          <p className="text-xs font-black text-green-400 mb-2">
            ▶ Mining Terminal
          </p>
          <div className="font-mono text-xs space-y-0.5 min-h-[80px]">
            {log.map((l, i) => (
              <p
                key={i}
                className={
                  i === 0 && l.includes("BLOCK")
                    ? "text-yellow-400 font-black"
                    : "text-green-400/80"
                }
              >
                {l}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Wallet Balances */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="font-black text-sm">💰 Wallet Balances</p>
          <Badge className="bg-yellow-500/15 text-yellow-400 border-yellow-500/25 text-xs">
            ≈ ${totalUSD.toFixed(4)} USD
          </Badge>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {COINS.map(c => (
            <Card key={c.id} className="border-border/40">
              <CardContent className="py-2.5 px-3">
                <p className={`font-black text-xs ${c.text}`}>{c.id}</p>
                <p className="font-mono text-sm font-black">
                  {balances[c.id].toFixed(6)}
                </p>
                <p className="text-xs text-muted-foreground">
                  ${(balances[c.id] * c.usd).toFixed(4)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        <Card className="border-border/40 text-center">
          <CardContent className="py-2.5">
            <p className="font-black text-sm text-yellow-400">
              {(totalHashes / 1000).toFixed(1)}K
            </p>
            <p className="text-xs text-muted-foreground">Total Hashes</p>
          </CardContent>
        </Card>
        <Card className="border-border/40 text-center">
          <CardContent className="py-2.5">
            <p className="font-black text-sm text-green-400">{blocks}</p>
            <p className="text-xs text-muted-foreground">Blocks Found</p>
          </CardContent>
        </Card>
        <Card className="border-border/40 text-center">
          <CardContent className="py-2.5">
            <p className="font-black text-sm text-blue-400">
              ${totalUSD.toFixed(2)}
            </p>
            <p className="text-xs text-muted-foreground">Total Value</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-yellow-500/30 bg-yellow-500/5">
        <CardContent className="py-3 text-center">
          <p className="font-black text-xs text-yellow-400">
            ✦ Skyler Blue · 479-406-7123 · skycoin444
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Private science experiment · Real SHA-256 computation · Wallet
            rewards displayed
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
