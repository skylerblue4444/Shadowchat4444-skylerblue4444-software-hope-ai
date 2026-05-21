import { useState } from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  Zap,
  TrendingUp,
  Star,
  Clock,
  Coins,
  ChevronRight,
  Users,
  BarChart3,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const LIVE_GAMES = [
  {
    id: 1,
    sport: "🏀",
    home: "Lakers",
    away: "Warriors",
    homeScore: 88,
    awayScore: 84,
    quarter: "Q3",
    time: "4:22",
    homeOdds: "+110",
    awayOdds: "-130",
    live: true,
  },
  {
    id: 2,
    sport: "⚽",
    home: "Man City",
    away: "Real Madrid",
    homeScore: 2,
    awayScore: 1,
    quarter: "72'",
    time: "",
    homeOdds: "+200",
    awayOdds: "-180",
    live: true,
  },
  {
    id: 3,
    sport: "🏈",
    home: "Chiefs",
    away: "Eagles",
    homeScore: 21,
    awayScore: 17,
    quarter: "Q2",
    time: "8:44",
    homeOdds: "-140",
    awayOdds: "+120",
    live: true,
  },
];

const UPCOMING = [
  {
    id: 4,
    sport: "⚾",
    home: "Yankees",
    away: "Red Sox",
    time: "7:05 PM CDT",
    homeOdds: "-150",
    awayOdds: "+130",
    total: "O/U 8.5",
  },
  {
    id: 5,
    sport: "🎾",
    home: "Djokovic",
    away: "Alcaraz",
    time: "May 16, 2:00 PM",
    homeOdds: "+120",
    awayOdds: "-140",
    total: "",
  },
  {
    id: 6,
    sport: "🏒",
    home: "Oilers",
    away: "Panthers",
    time: "May 16, 8:00 PM",
    homeOdds: "+105",
    awayOdds: "-125",
    total: "O/U 6.0",
  },
];

const MY_BETS = [
  {
    game: "Lakers vs Warriors",
    pick: "Lakers -3.5",
    amount: "100 SKY4444",
    odds: "+110",
    status: "live",
    potential: "210 SKY4444",
  },
  {
    game: "Man City vs Real Madrid",
    pick: "Man City ML",
    amount: "50 USDT",
    odds: "+200",
    status: "live",
    potential: "150 USDT",
  },
  {
    game: "Chiefs vs Eagles",
    pick: "Over 44.5",
    amount: "200 SKY4444",
    odds: "-110",
    status: "won",
    potential: "381 SKY4444",
  },
];

export default function ShadowSports() {
  const [tab, setTab] = useState<"live" | "upcoming" | "mybets" | "fantasy">(
    "live"
  );
  const [betSlip, setBetSlip] = useState<
    { game: string; pick: string; odds: string }[]
  >([]);

  const addBet = (game: string, pick: string, odds: string) => {
    if (betSlip.find(b => b.game === game)) {
      toast.info("Already added to bet slip");
      return;
    }
    setBetSlip(b => [...b, { game, pick, odds }]);
    toast.success(`✅ Added to bet slip: ${pick} ${odds}`);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Trophy className="h-6 w-6 text-orange-400" />
            ShadowSports
          </h1>
          <p className="text-sm text-muted-foreground">
            Live sports betting with SKY4444, TRUMP, and crypto
          </p>
        </div>
        <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/20 font-bold">
          🔴 {LIVE_GAMES.length} Live
        </Badge>
      </div>

      {/* Bet Slip */}
      {betSlip.length > 0 && (
        <Card className="border-orange-500/20 bg-orange-900/10">
          <CardContent className="py-3 px-4">
            <div className="flex items-center justify-between mb-2">
              <p className="font-bold text-sm">Bet Slip ({betSlip.length})</p>
              <button
                onClick={() => setBetSlip([])}
                className="text-xs text-muted-foreground"
              >
                Clear
              </button>
            </div>
            {betSlip.map((bet, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-1 border-b border-border/20 last:border-0"
              >
                <p className="text-xs">{bet.pick}</p>
                <Badge className="text-xs bg-orange-500/10 text-orange-400 border-orange-500/20">
                  {bet.odds}
                </Badge>
              </div>
            ))}
            <Button
              className="w-full h-9 text-xs mt-2 bg-orange-600 text-white border-0"
              onClick={() => {
                toast.success("🎉 Bets placed with SKY4444 escrow!");
                setBetSlip([]);
              }}
            >
              Place Bets — SKY4444
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="flex gap-2">
        {(["live", "upcoming", "mybets", "fantasy"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-orange-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t === "mybets" ? "My Bets" : t}
          </button>
        ))}
      </div>

      {tab === "live" && (
        <div className="space-y-3">
          {LIVE_GAMES.map((game, i) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="border-red-500/20 bg-red-900/5">
                <CardContent className="py-3 px-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{game.sport}</span>
                      <Badge className="text-xs bg-red-500/10 text-red-400 border-red-500/20 animate-pulse">
                        🔴 LIVE
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {game.quarter} {game.time}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex-1 text-center">
                      <p className="font-black text-lg">{game.homeScore}</p>
                      <p className="font-bold text-sm">{game.home}</p>
                    </div>
                    <p className="text-muted-foreground font-bold">VS</p>
                    <div className="flex-1 text-center">
                      <p className="font-black text-lg">{game.awayScore}</p>
                      <p className="font-bold text-sm">{game.away}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 text-xs font-bold"
                      onClick={() =>
                        addBet(
                          `${game.home} vs ${game.away}`,
                          `${game.home} ML`,
                          game.homeOdds
                        )
                      }
                    >
                      {game.home} {game.homeOdds}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 text-xs font-bold"
                      onClick={() =>
                        addBet(
                          `${game.home} vs ${game.away}`,
                          `${game.away} ML`,
                          game.awayOdds
                        )
                      }
                    >
                      {game.away} {game.awayOdds}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "upcoming" && (
        <div className="space-y-3">
          {UPCOMING.map((game, i) => (
            <Card key={game.id} className="border-border/50">
              <CardContent className="py-3 px-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{game.sport}</span>
                  <p className="text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 inline mr-0.5" />
                    {game.time}
                  </p>
                  {game.total && (
                    <Badge className="text-xs bg-muted text-muted-foreground">
                      {game.total}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <p className="font-bold text-sm flex-1">{game.home}</p>
                  <p className="text-xs text-muted-foreground">vs</p>
                  <p className="font-bold text-sm flex-1 text-right">
                    {game.away}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs"
                    onClick={() =>
                      addBet(
                        `${game.home} vs ${game.away}`,
                        `${game.home} ML`,
                        game.homeOdds
                      )
                    }
                  >
                    {game.home} {game.homeOdds}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs"
                    onClick={() =>
                      addBet(
                        `${game.home} vs ${game.away}`,
                        `${game.away} ML`,
                        game.awayOdds
                      )
                    }
                  >
                    {game.away} {game.awayOdds}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "mybets" && (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Active", value: "2", emoji: "⚡" },
              { label: "Won", value: "1", emoji: "🏆" },
              { label: "Profit", value: "+181 SKY", emoji: "💰" },
            ].map(s => (
              <Card key={s.label} className="border-border/50 text-center">
                <CardContent className="pt-2.5 pb-2.5">
                  <p className="text-lg">{s.emoji}</p>
                  <p className="font-black text-xs text-orange-400">
                    {s.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          {MY_BETS.map((bet, i) => (
            <Card
              key={i}
              className={`border ${bet.status === "won" ? "border-green-500/20 bg-green-900/5" : bet.status === "live" ? "border-orange-500/20 bg-orange-900/5" : "border-border/50"}`}
            >
              <CardContent className="py-3 px-4">
                <div className="flex items-start gap-3">
                  <div
                    className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 ${bet.status === "won" ? "bg-green-500/10" : "bg-orange-500/10"}`}
                  >
                    {bet.status === "won" ? (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : (
                      <Zap className="h-5 w-5 text-orange-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{bet.game}</p>
                    <p className="text-xs text-muted-foreground">
                      {bet.pick} · {bet.odds}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Wagered: {bet.amount}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge
                      className={`text-xs ${bet.status === "won" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-orange-500/10 text-orange-400 border-orange-500/20"}`}
                    >
                      {bet.status === "won" ? "✓ Won" : "🔴 Live"}
                    </Badge>
                    <p className="text-xs text-green-400 font-bold mt-1">
                      {bet.potential}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "fantasy" && (
        <div className="space-y-3">
          <Card className="border-orange-500/20 bg-orange-900/5">
            <CardContent className="py-4 px-4 text-center">
              <p className="text-3xl mb-2">🏆</p>
              <p className="font-black text-sm">ShadowFantasy League</p>
              <p className="text-xs text-muted-foreground mb-3">
                Draft your team, compete weekly, win SKY4444 prizes
              </p>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {[
                  { label: "Prize Pool", value: "44,444 SKY4444" },
                  { label: "Teams", value: "4,444 entered" },
                  { label: "Draft", value: "May 17, 2026" },
                  { label: "Season", value: "12 weeks" },
                ].map(s => (
                  <div
                    key={s.label}
                    className="p-2 rounded-xl bg-black/20 text-center"
                  >
                    <p className="font-black text-xs text-orange-400">
                      {s.value}
                    </p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
              <Button
                className="w-full h-10 text-xs bg-orange-600 text-white border-0 font-bold"
                onClick={() =>
                  toast.success(
                    "✅ Joined ShadowFantasy League! Entry fee: 44 SKY4444"
                  )
                }
              >
                Join Fantasy League — 44 SKY4444
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
