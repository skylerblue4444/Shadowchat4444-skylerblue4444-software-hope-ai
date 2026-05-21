import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gamepad2,
  Trophy,
  Star,
  Zap,
  Coins,
  Users,
  Clock,
  Play,
  Lock,
  ChevronRight,
  TrendingUp,
  Gift,
  Crown,
  Target,
  Sword,
  Shield,
  Dice1,
  BarChart2,
  Award,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const GAMES = [
  {
    id: "g1",
    name: "Crypto Crash",
    desc: "Bet SKY4444 and cash out before the rocket crashes!",
    category: "Luck",
    players: 1842,
    reward: "Up to 100x",
    icon: "🚀",
    color: "from-red-500 to-orange-500",
    locked: false,
    hot: true,
  },
  {
    id: "g2",
    name: "TRUMP Trivia",
    desc: "Answer crypto & politics questions to earn TRUMP tokens",
    category: "Knowledge",
    players: 924,
    reward: "500 TRUMP/win",
    icon: "🇺🇸",
    color: "from-blue-500 to-red-500",
    locked: false,
    hot: true,
  },
  {
    id: "g3",
    name: "NFT Battle Arena",
    desc: "Use your NFTs to battle other players for prizes",
    category: "Strategy",
    players: 512,
    reward: "Rare NFTs",
    icon: "⚔️",
    color: "from-purple-500 to-pink-500",
    locked: false,
    hot: false,
  },
  {
    id: "g4",
    name: "Crypto Dice",
    desc: "Classic dice game with provably fair blockchain randomness",
    category: "Luck",
    players: 2840,
    reward: "2x payout",
    icon: "🎲",
    color: "from-green-500 to-emerald-500",
    locked: false,
    hot: false,
  },
  {
    id: "g5",
    name: "DeFi Tycoon",
    desc: "Build your DeFi empire and compete for the richest portfolio",
    category: "Strategy",
    players: 284,
    reward: "10,000 SKY4444",
    icon: "🏦",
    color: "from-yellow-500 to-amber-500",
    locked: false,
    hot: false,
  },
  {
    id: "g6",
    name: "Metaverse Racing",
    desc: "Race your NFT car in the ShadowChat metaverse",
    category: "Action",
    players: 180,
    reward: "Land NFTs",
    icon: "🏎️",
    color: "from-cyan-500 to-blue-500",
    locked: true,
    hot: false,
  },
  {
    id: "g7",
    name: "Sky4444 Slots",
    desc: "Spin the blockchain-verified slot machine for jackpots",
    category: "Luck",
    players: 4200,
    reward: "Jackpot: 1M SKY4444",
    icon: "🎰",
    color: "from-pink-500 to-rose-500",
    locked: false,
    hot: true,
  },
  {
    id: "g8",
    name: "Prediction Market",
    desc: "Predict crypto prices and earn from correct forecasts",
    category: "Knowledge",
    players: 1240,
    reward: "Variable",
    icon: "📊",
    color: "from-indigo-500 to-violet-500",
    locked: false,
    hot: false,
  },
];

const TOURNAMENTS = [
  {
    id: "t1",
    name: "SKY4444 Grand Prix",
    game: "Metaverse Racing",
    prize: "100,000 SKY4444",
    players: "128/256",
    ends: "2 days",
    entry: "500 SKY4444",
    status: "open",
  },
  {
    id: "t2",
    name: "Crypto Trivia World Cup",
    game: "TRUMP Trivia",
    prize: "50,000 TRUMP",
    players: "64/64",
    ends: "Live Now!",
    entry: "FREE",
    status: "live",
  },
  {
    id: "t3",
    name: "NFT Battle Championship",
    game: "NFT Battle Arena",
    prize: "Legendary NFT",
    players: "32/32",
    ends: "Ended",
    entry: "1 NFT",
    status: "ended",
  },
];

const LEADERBOARD = [
  {
    rank: 1,
    name: "CryptoGod_88",
    score: 284200,
    earnings: 12840,
    badge: "👑",
  },
  { rank: 2, name: "SkyKing_Pro", score: 241800, earnings: 9200, badge: "🥇" },
  { rank: 3, name: "DeFi_Legend", score: 198400, earnings: 7600, badge: "🥈" },
  {
    rank: 4,
    name: "You",
    score: 42800,
    earnings: 1840,
    badge: "🎮",
    isMe: true,
  },
];

const CATEGORIES = ["All", "Luck", "Strategy", "Knowledge", "Action"];

export default function GameCenter() {
  const [tab, setTab] = useState<"games" | "tournaments" | "leaderboard">(
    "games"
  );
  const [category, setCategory] = useState("All");
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [crashMultiplier, setCrashMultiplier] = useState(1.0);
  const [crashRunning, setCrashRunning] = useState(false);

  const filtered = GAMES.filter(
    g => category === "All" || g.category === category
  );

  const startCrash = () => {
    setCrashRunning(true);
    setCrashMultiplier(1.0);
    const interval = setInterval(() => {
      setCrashMultiplier(prev => {
        const next = prev + Math.random() * 0.1;
        if (Math.random() < 0.02 || next > 10) {
          clearInterval(interval);
          setCrashRunning(false);
          toast.error(`💥 Crashed at ${next.toFixed(2)}x!`);
          return 1.0;
        }
        return next;
      });
    }, 100);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Gamepad2 className="h-6 w-6 text-green-400" />
            Game Center
          </h1>
          <p className="text-sm text-muted-foreground">
            Play crypto games, win SKY4444 tokens, and compete in tournaments
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
            <Coins className="h-3 w-3 mr-1" />
            42,800 SKY4444
          </Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          {
            label: "Games Played",
            value: "284",
            icon: Gamepad2,
            color: "text-blue-400",
          },
          {
            label: "Tournaments Won",
            value: "12",
            icon: Trophy,
            color: "text-yellow-400",
          },
          {
            label: "Total Winnings",
            value: "$1,840",
            icon: Coins,
            color: "text-green-400",
          },
          {
            label: "Win Rate",
            value: "64%",
            icon: Target,
            color: "text-purple-400",
          },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="border-border/50">
            <CardContent className="pt-3 pb-2 text-center">
              <Icon className={`h-4 w-4 ${color} mx-auto mb-1`} />
              <p className="text-lg font-black">{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["games", "tournaments", "leaderboard"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${tab === t ? "bg-green-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "games" && (
        <div className="space-y-4">
          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${category === cat ? "bg-green-600 text-white" : "bg-muted text-muted-foreground"}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured: Crypto Crash Live Demo */}
          {(category === "All" || category === "Luck") && (
            <Card className="border-red-500/20 bg-gradient-to-br from-red-950/20 to-orange-950/20">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">🚀</span>
                  <div>
                    <p className="font-black">Crypto Crash — Live Demo</p>
                    <p className="text-xs text-muted-foreground">
                      Provably fair · 1,842 players online
                    </p>
                  </div>
                  <Badge className="ml-auto bg-red-500/10 text-red-400 border-red-500/20">
                    🔥 Hot
                  </Badge>
                </div>
                <div className="flex items-center justify-center py-8 bg-black/30 rounded-xl mb-3">
                  <motion.div
                    animate={{ scale: crashRunning ? [1, 1.05, 1] : 1 }}
                    transition={{ repeat: Infinity, duration: 0.5 }}
                    className={`text-6xl font-black ${crashMultiplier > 5 ? "text-green-400" : crashMultiplier > 2 ? "text-yellow-400" : "text-white"}`}
                  >
                    {crashMultiplier.toFixed(2)}x
                  </motion.div>
                </div>
                <div className="flex gap-2">
                  <Button
                    className="flex-1 bg-green-600 text-white border-0 font-black"
                    onClick={startCrash}
                    disabled={crashRunning}
                  >
                    {crashRunning ? "🚀 Flying..." : "🚀 Launch Rocket"}
                  </Button>
                  {crashRunning && (
                    <Button
                      className="flex-1 bg-red-600 text-white border-0 font-black"
                      onClick={() => {
                        setCrashRunning(false);
                        toast.success(
                          `💰 Cashed out at ${crashMultiplier.toFixed(2)}x!`
                        );
                      }}
                    >
                      💰 Cash Out {crashMultiplier.toFixed(2)}x
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Games Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filtered.map((game, i) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04 }}
              >
                <Card
                  className={`border-border/50 hover:border-green-500/20 transition-all cursor-pointer ${game.locked ? "opacity-60" : ""}`}
                  onClick={() =>
                    !game.locked && toast.info(`Launching ${game.name}`)
                  }
                >
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={`h-12 w-12 rounded-xl bg-gradient-to-br ${game.color} flex items-center justify-center text-2xl shrink-0`}
                      >
                        {game.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="font-black text-sm">{game.name}</p>
                          {game.hot && (
                            <Badge className="text-xs bg-red-500/10 text-red-400 border-red-500/20">
                              🔥 Hot
                            </Badge>
                          )}
                          {game.locked && (
                            <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {game.desc}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-xs">
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Users className="h-3 w-3" />
                            {game.players.toLocaleString()}
                          </span>
                          <span className="text-green-400 font-medium">
                            {game.reward}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button
                      className={`w-full mt-3 h-8 text-xs bg-gradient-to-r ${game.color} text-white border-0 font-bold`}
                      disabled={game.locked}
                    >
                      {game.locked ? (
                        "🔒 Coming Soon"
                      ) : (
                        <>
                          <Play className="h-3.5 w-3.5 mr-1.5" />
                          Play Now
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {tab === "tournaments" && (
        <div className="space-y-3">
          {TOURNAMENTS.map((t, i) => (
            <Card
              key={t.id}
              className={`border-border/50 ${t.status === "live" ? "border-green-500/30 bg-green-500/3" : ""}`}
            >
              <CardContent className="py-4 px-4">
                <div className="flex items-start gap-3">
                  <div
                    className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${t.status === "live" ? "bg-green-500/10" : t.status === "open" ? "bg-blue-500/10" : "bg-muted/30"}`}
                  >
                    <Trophy
                      className={`h-5 w-5 ${t.status === "live" ? "text-green-400" : t.status === "open" ? "text-blue-400" : "text-muted-foreground"}`}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="font-black text-sm">{t.name}</p>
                      <Badge
                        className={`text-xs capitalize ${t.status === "live" ? "bg-green-500/10 text-green-400 border-green-500/20" : t.status === "open" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" : "bg-muted text-muted-foreground"}`}
                      >
                        {t.status === "live" ? "🔴 Live" : t.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{t.game}</p>
                    <div className="flex gap-4 mt-1 text-xs">
                      <span className="text-yellow-400 font-bold">
                        🏆 {t.prize}
                      </span>
                      <span className="text-muted-foreground">
                        <Users className="h-3 w-3 inline mr-0.5" />
                        {t.players}
                      </span>
                      <span className="text-muted-foreground">
                        <Clock className="h-3 w-3 inline mr-0.5" />
                        {t.ends}
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-muted-foreground">Entry</p>
                    <p className="text-sm font-bold text-green-400">
                      {t.entry}
                    </p>
                    {t.status !== "ended" && (
                      <Button
                        size="sm"
                        className="mt-1 h-7 text-xs bg-green-600 text-white border-0"
                        onClick={() => toast.success(`Joined ${t.name}!`)}
                      >
                        Join
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "leaderboard" && (
        <div className="space-y-3">
          {LEADERBOARD.map((entry, i) => (
            <Card
              key={entry.rank}
              className={`border-border/50 ${entry.isMe ? "border-green-500/30 bg-green-500/3" : ""}`}
            >
              <CardContent className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center font-black text-sm shrink-0 ${entry.rank <= 3 ? "bg-yellow-500/10 text-yellow-400" : "bg-muted text-muted-foreground"}`}
                  >
                    #{entry.rank}
                  </div>
                  <span className="text-2xl">{entry.badge}</span>
                  <div className="flex-1">
                    <p
                      className={`font-bold text-sm ${entry.isMe ? "text-green-400" : ""}`}
                    >
                      {entry.name}
                      {entry.isMe && " (You)"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {entry.score.toLocaleString()} points
                    </p>
                  </div>
                  <p className="font-black text-yellow-400">
                    ${entry.earnings.toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
