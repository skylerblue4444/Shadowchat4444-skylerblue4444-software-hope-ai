import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { trpc } from "@/lib/trpc";
import {
  Activity,
  Coins,
  Dice5,
  Landmark,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Trophy,
} from "lucide-react";
import { toast } from "sonner";

type GameKind = "blackjack" | "roulette" | "slots" | "crash" | "dice";
type Coin = "SKY4444" | "TRUMP" | "DOGE" | "USDT" | "BTC" | "MONERO" | "SHADOW";

const defaultGames: Array<{
  game: GameKind;
  title: string;
  houseEdge: string;
  walletHook: string;
  fairness: string;
  actions: string[];
  color: string;
}> = [
  {
    game: "blackjack",
    title: "Sky Blackjack",
    houseEdge: "practice-beta dynamic edge",
    walletHook: "reward wins through beta mining ledger",
    fairness: "server seed hash + client seed + nonce",
    actions: ["deal", "hit", "stand", "double"],
    color: "from-amber-400 to-orange-500",
  },
  {
    game: "roulette",
    title: "Sky Roulette",
    houseEdge: "single-zero beta table",
    walletHook: "wager audit plus win reward credit",
    fairness: "deterministic wheel roll from HMAC digest",
    actions: ["spin"],
    color: "from-red-500 to-rose-700",
  },
  {
    game: "slots",
    title: "Sky Slots",
    houseEdge: "symbol-weighted beta reels",
    walletHook: "jackpot-style SKY4444 reward mint",
    fairness: "three independent digest windows per spin",
    actions: ["spin"],
    color: "from-purple-500 to-fuchsia-500",
  },
  {
    game: "crash",
    title: "Moon Crash",
    houseEdge: "capped beta multiplier",
    walletHook: "cashout payout through reward hook",
    fairness: "crash point derived from seed digest",
    actions: ["cashout"],
    color: "from-cyan-400 to-blue-600",
  },
  {
    game: "dice",
    title: "Shadow Dice",
    houseEdge: "transparent threshold game",
    walletHook: "fast roll reward when threshold wins",
    fairness: "1-100 roll derived from seed digest",
    actions: ["roll"],
    color: "from-emerald-400 to-lime-500",
  },
];

const coinOptions: Coin[] = [
  "SKY4444",
  "SHADOW",
  "TRUMP",
  "DOGE",
  "USDT",
  "BTC",
  "MONERO",
];

function actionForGame(game: GameKind) {
  if (game === "blackjack") return "deal" as const;
  if (game === "roulette") return "spin" as const;
  if (game === "slots") return "spin" as const;
  if (game === "crash") return "cashout" as const;
  return "roll" as const;
}

function paramsForGame(game: GameKind) {
  if (game === "roulette") return { pick: "red" };
  if (game === "crash") return { cashoutAt: 1.88 };
  if (game === "dice") return { threshold: 55 };
  return {};
}

export default function PolishedCasino() {
  const [credits, setCredits] = useState(4444);
  const [streak, setStreak] = useState(3);
  const [wager, setWager] = useState("44.44");
  const [coin, setCoin] = useState<Coin>("SKY4444");
  const [clientSeed, setClientSeed] = useState("hope-ai-unhinged-seed");
  const [activeGame, setActiveGame] = useState<GameKind>("slots");
  const [lastResult, setLastResult] = useState(
    "Ready for an audited backend beta round."
  );
  const [lastAudit, setLastAudit] = useState<Record<string, unknown> | null>(
    null
  );

  const utils = trpc.useUtils();
  const catalog = trpc.games.catalog.useQuery();
  const auditTrail = trpc.games.auditTrail.useQuery();

  const playRound = trpc.games.playRound.useMutation({
    onSuccess: result => {
      if (!result.success) {
        toast.error(result.error || "Game session could not settle.");
        setLastResult(result.error || "Game session could not settle.");
        return;
      }
      const settled = result as {
        reward?: string | number;
        game?: string;
        coin?: string;
        rewardMultiplier?: string | number;
        outcome?: unknown;
        reveal?: unknown;
        audit?: Record<string, unknown>[];
        walletReward?: unknown;
      };
      const reward = Number(settled.reward || 0);
      const rewardCoin = settled.coin || coin;
      setCredits(current =>
        Math.max(0, Number((current - Number(wager || 0) + reward).toFixed(2)))
      );
      setStreak(current => (reward > 0 ? current + 1 : 0));
      setLastResult(
        `${String(settled.game || activeGame).toUpperCase()} settled through backend audit. Reward: ${reward.toFixed(4)} ${rewardCoin}. Multiplier: ${Number(settled.rewardMultiplier || 0).toFixed(2)}x.`
      );
      setLastAudit({
        outcome: settled.outcome,
        reveal: settled.reveal,
        audit: settled.audit?.slice(-2),
        walletReward: settled.walletReward
          ? "beta reward hook called"
          : "no win reward",
      });
      toast.success(
        reward > 0
          ? `Backend win: +${reward.toFixed(4)} ${rewardCoin}`
          : "Backend round settled with no reward."
      );
      utils.games.auditTrail.invalidate();
    },
    onError: error => {
      toast.error(error.message);
      setLastResult(error.message);
    },
  });

  const startSession = trpc.games.startSession.useMutation({
    onSuccess: session => {
      if (!session.success) {
        toast.error("Could not start beta game session.");
        return;
      }
      playRound.mutate({
        sessionId: session.sessionId,
        action: actionForGame(session.game),
        params: paramsForGame(session.game),
      });
    },
    onError: error => toast.error(error.message),
  });

  const tableHealth = useMemo(() => Math.min(100, 62 + streak * 7), [streak]);
  const games = (
    catalog.data?.games?.length ? catalog.data.games : defaultGames
  ).map(game => ({
    ...game,
    color:
      defaultGames.find(item => item.game === game.game)?.color ||
      "from-amber-400 to-orange-500",
  }));
  const busy = startSession.isPending || playRound.isPending;

  function playAuditedRound(game: GameKind) {
    const parsedWager = Math.max(0, Math.min(Number(wager) || 1, 100000));
    setActiveGame(game);
    setLastResult(
      `Starting audited ${game} session with committed server seed hash.`
    );
    startSession.mutate({ game, wager: parsedWager, coin, clientSeed });
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#3b2206,#09090b_42%)] p-6 text-white">
      <section className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-4 rounded-3xl border border-amber-400/30 bg-black/45 p-8 shadow-2xl shadow-amber-500/10 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              <Badge className="border-amber-400/40 bg-amber-400/10 text-amber-200">
                Audited Beta Playground
              </Badge>
              <Badge className="border-emerald-400/40 bg-emerald-400/10 text-emerald-200">
                Backend sessions live
              </Badge>
              <Badge className="border-red-400/40 bg-red-400/10 text-red-200">
                Public gambling disabled
              </Badge>
            </div>
            <h1 className="text-4xl font-black tracking-tight md:text-6xl">
              SkyCasino Backend Arcade
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-zinc-300 md:text-base">
              Blackjack, roulette, slots, crash, and dice now create protected
              backend sessions with committed server-seed hashes, deterministic
              settlement, wallet-reward hooks, and audit trails. This remains a
              beta entertainment surface and does not claim regulated public
              gambling or cash-out payouts.
            </p>
          </div>
          <div className="rounded-2xl border border-amber-400/30 bg-amber-400/10 p-5 text-right">
            <p className="text-xs uppercase tracking-widest text-amber-200">
              Beta Arcade Balance
            </p>
            <p className="text-4xl font-black text-amber-300">
              {credits.toLocaleString()} SKY
            </p>
            <p className="mt-1 text-xs text-amber-100/70">
              Local display plus backend reward hook audit.
            </p>
          </div>
        </div>

        <Card className="border-cyan-400/20 bg-zinc-950/85 text-white">
          <CardContent className="grid gap-4 p-5 md:grid-cols-4">
            <label className="space-y-2 text-xs uppercase tracking-[0.2em] text-zinc-400">
              Wager
              <input
                value={wager}
                onChange={event => setWager(event.target.value)}
                className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm normal-case tracking-normal text-white outline-none"
              />
            </label>
            <label className="space-y-2 text-xs uppercase tracking-[0.2em] text-zinc-400">
              Coin
              <select
                value={coin}
                onChange={event => setCoin(event.target.value as Coin)}
                className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-zinc-950 px-3 text-sm normal-case tracking-normal text-white outline-none"
              >
                {coinOptions.map(item => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
            <label className="space-y-2 text-xs uppercase tracking-[0.2em] text-zinc-400 md:col-span-2">
              Client Seed
              <input
                value={clientSeed}
                onChange={event => setClientSeed(event.target.value)}
                className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm normal-case tracking-normal text-white outline-none"
              />
            </label>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-5">
          {games.map(game => (
            <Card
              key={game.game}
              className={`border-white/10 bg-zinc-950/80 text-white ${activeGame === game.game ? "ring-2 ring-amber-300/50" : ""}`}
            >
              <CardHeader>
                <div
                  className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${game.color}`}
                >
                  <Dice5 className="h-7 w-7 text-black" />
                </div>
                <CardTitle className="text-lg">{game.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-zinc-300">
                <p>{game.houseEdge}</p>
                <div className="rounded-xl bg-white/5 p-3">
                  <p className="text-xs uppercase tracking-widest text-zinc-500">
                    Fairness
                  </p>
                  <p className="mt-1 text-zinc-200">{game.fairness}</p>
                </div>
                <div className="rounded-xl bg-white/5 p-3">
                  <p className="text-xs uppercase tracking-widest text-zinc-500">
                    Reward rail
                  </p>
                  <p className="mt-1 text-zinc-200">{game.walletHook}</p>
                </div>
                <Button
                  disabled={busy}
                  onClick={() => playAuditedRound(game.game)}
                  className="w-full bg-amber-400 font-black text-black hover:bg-amber-300"
                >
                  <Sparkles className="mr-2 h-4 w-4" /> Play {game.game}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-emerald-400/20 bg-zinc-950/85 text-white">
          <CardContent className="grid gap-6 p-6 md:grid-cols-[1.1fr_0.9fr] md:items-start">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Trophy className="h-6 w-6 text-amber-300" />
                <h2 className="text-2xl font-black">Featured Audited Round</h2>
              </div>
              <p className="text-sm text-zinc-300">{lastResult}</p>
              <Progress value={tableHealth} className="h-3" />
              <p className="text-xs text-zinc-400">
                Table energy: {tableHealth}% based on current backend-settled
                streak.
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <Activity className="mb-2 h-4 w-4 text-cyan-200" />
                  <p className="text-xs text-zinc-400">Live action</p>
                  <p className="font-black text-white">
                    {busy ? "Settling" : activeGame}
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <ShieldCheck className="mb-2 h-4 w-4 text-emerald-200" />
                  <p className="text-xs text-zinc-400">Audit trail</p>
                  <p className="font-black text-white">
                    {auditTrail.data?.sessions?.length || 0} sessions
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <Landmark className="mb-2 h-4 w-4 text-amber-200" />
                  <p className="text-xs text-zinc-400">Money mode</p>
                  <p className="font-black text-white">Beta only</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <Button
                onClick={() => playAuditedRound(activeGame)}
                disabled={busy}
                className="h-14 w-full bg-amber-400 text-lg font-black text-black hover:bg-amber-300"
              >
                <RotateCcw className="mr-2 h-5 w-5" />{" "}
                {busy ? "Backend settling" : "Replay Active Game"}
              </Button>
              <div className="flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-3 text-xs text-emerald-200">
                <ShieldCheck className="h-4 w-4" /> Kill-switch posture: no
                deposits, no public real-money gambling claim, no cash-out
                promise.
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/10 p-3 text-xs text-cyan-200">
                <Coins className="h-4 w-4" /> Wins call the beta multi-coin
                reward hook and record a settlement audit.
              </div>
              {lastAudit && (
                <pre className="max-h-64 overflow-auto rounded-xl border border-white/10 bg-black/40 p-3 text-[11px] leading-5 text-zinc-300">
                  {JSON.stringify(lastAudit, null, 2)}
                </pre>
              )}
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
