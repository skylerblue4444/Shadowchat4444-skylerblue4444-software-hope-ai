import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Coins, Dice5, ShieldCheck, Sparkles, Trophy } from "lucide-react";

const games = [
  { name: "Sky Dice", edge: "Demo odds", reward: "SKY4444", color: "from-amber-400 to-orange-500" },
  { name: "Shadow Slots", edge: "Social jackpot", reward: "SHADOW", color: "from-purple-500 to-fuchsia-500" },
  { name: "DOGE Dash", edge: "Arcade race", reward: "DOGE", color: "from-yellow-300 to-lime-400" },
];

export default function PolishedCasino() {
  const [credits, setCredits] = useState(4444);
  const [streak, setStreak] = useState(3);
  const [lastResult, setLastResult] = useState("Ready for a beta demo round.");

  const tableHealth = useMemo(() => Math.min(100, 62 + streak * 7), [streak]);

  function playDemoRound() {
    const win = Math.random() > 0.42;
    const delta = win ? 144 : -44;
    setCredits((current) => Math.max(0, current + delta));
    setStreak((current) => (win ? current + 1 : 0));
    setLastResult(win ? `Demo win: +${delta} SKY4444 credits.` : "Demo miss: -44 SKY4444 credits.");
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#3b2206,#09090b_42%)] p-6 text-white">
      <section className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-4 rounded-3xl border border-amber-400/30 bg-black/45 p-8 shadow-2xl shadow-amber-500/10 md:flex-row md:items-end md:justify-between">
          <div>
            <Badge className="mb-4 border-amber-400/40 bg-amber-400/10 text-amber-200">Beta Playground</Badge>
            <h1 className="text-4xl font-black tracking-tight md:text-6xl">SkyCasino Social Arcade</h1>
            <p className="mt-3 max-w-2xl text-sm text-zinc-300 md:text-base">
              A launchable demo casino hub for social challenges, token-themed mini-games, wallet-ready rewards, and compliance-forward entertainment. This beta uses demo credits only and does not provide real-money gambling.
            </p>
          </div>
          <div className="rounded-2xl border border-amber-400/30 bg-amber-400/10 p-5 text-right">
            <p className="text-xs uppercase tracking-widest text-amber-200">Demo Balance</p>
            <p className="text-4xl font-black text-amber-300">{credits.toLocaleString()} SKY</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {games.map((game) => (
            <Card key={game.name} className="border-white/10 bg-zinc-950/80 text-white">
              <CardHeader>
                <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${game.color}`}>
                  <Dice5 className="h-7 w-7 text-black" />
                </div>
                <CardTitle>{game.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-zinc-300">
                <p>{game.edge}</p>
                <div className="flex items-center justify-between rounded-xl bg-white/5 p-3">
                  <span>Reward rail</span>
                  <Badge variant="outline" className="border-amber-400/40 text-amber-200">{game.reward}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-emerald-400/20 bg-zinc-950/85 text-white">
          <CardContent className="grid gap-6 p-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Trophy className="h-6 w-6 text-amber-300" />
                <h2 className="text-2xl font-black">Featured Demo Round</h2>
              </div>
              <p className="text-sm text-zinc-300">{lastResult}</p>
              <Progress value={tableHealth} className="h-3" />
              <p className="text-xs text-zinc-400">Table energy: {tableHealth}% based on current streak.</p>
            </div>
            <div className="space-y-3">
              <Button onClick={playDemoRound} className="h-14 w-full bg-amber-400 text-lg font-black text-black hover:bg-amber-300">
                <Sparkles className="mr-2 h-5 w-5" /> Play Demo Round
              </Button>
              <div className="flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-3 text-xs text-emerald-200">
                <ShieldCheck className="h-4 w-4" /> Compliance note: demo credits only, no deposits, no real payout promise.
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/10 p-3 text-xs text-cyan-200">
                <Coins className="h-4 w-4" /> Ready for future wallet, leaderboards, and responsible-play controls.
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
