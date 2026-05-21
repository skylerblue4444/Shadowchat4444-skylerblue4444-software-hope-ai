import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Ticket,
  Trophy,
  Clock,
  Coins,
  Star,
  Zap,
  Heart,
  RefreshCw,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const JACKPOT = 4444444;
const TICKET_PRICE = 44; // SKY4444

const RECENT_WINNERS = [
  {
    name: "SkylerBlue.eth",
    prize: "444,444 SKY4444",
    date: "May 14",
    ticket: "#4444",
  },
  {
    name: "CryptoKing.eth",
    prize: "88,888 SKY4444",
    date: "May 13",
    ticket: "#8888",
  },
  {
    name: "MoonHodler.eth",
    prize: "44,444 SKY4444",
    date: "May 12",
    ticket: "#2222",
  },
  {
    name: "DiamondHands.eth",
    prize: "22,222 SKY4444",
    date: "May 11",
    ticket: "#1111",
  },
];

const DRAW_NUMBERS = [4, 14, 22, 33, 44, "🌌"];

export default function ShadowLottery() {
  const [tickets, setTickets] = useState(1);
  const [tab, setTab] = useState<"jackpot" | "instant" | "history" | "charity">(
    "jackpot"
  );
  const [countdown, setCountdown] = useState({ h: 23, m: 44, s: 44 });
  const [spinning, setSpinning] = useState(false);
  const [instantResult, setInstantResult] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { ...prev, h: prev.h - 1, m: 59, s: 59 };
        return { h: 23, m: 59, s: 59 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const buyTickets = () => {
    toast.success(
      `🎫 ${tickets} ticket${tickets > 1 ? "s" : ""} purchased! Cost: ${tickets * TICKET_PRICE} SKY4444. Good luck!`
    );
  };

  const spinInstant = async () => {
    setSpinning(true);
    setInstantResult(null);
    await new Promise(r => setTimeout(r, 1500));
    const outcomes = [
      "🎉 You won 444 SKY4444!",
      "😔 Better luck next time!",
      "🎊 You won 4,444 SKY4444!",
      "💎 JACKPOT! You won 44,444 SKY4444!",
      "😔 No win this time.",
    ];
    const result = outcomes[Math.floor(Math.random() * outcomes.length)];
    setInstantResult(result);
    setSpinning(false);
    if (result.includes("won")) toast.success(result);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Ticket className="h-6 w-6 text-yellow-400" />
            ShadowLottery
          </h1>
          <p className="text-sm text-muted-foreground">
            Decentralized lottery — 10% of all proceeds go to charity
          </p>
        </div>
        <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20 text-xs">
          🔴 Live Draw
        </Badge>
      </div>

      {/* Jackpot Display */}
      <Card className="border-yellow-500/20 bg-gradient-to-br from-yellow-900/20 to-orange-900/10 overflow-hidden">
        <CardContent className="py-6 px-4 text-center">
          <p className="text-xs font-bold text-yellow-400 uppercase tracking-widest">
            Current Jackpot
          </p>
          <motion.p
            className="font-black text-4xl text-yellow-400 mt-1"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {JACKPOT.toLocaleString()} SKY4444
          </motion.p>
          <p className="text-sm text-muted-foreground mt-1">≈ $197,333 USD</p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <Clock className="h-4 w-4 text-orange-400" />
            <p className="font-black text-lg text-orange-400">
              {String(countdown.h).padStart(2, "0")}:
              {String(countdown.m).padStart(2, "0")}:
              {String(countdown.s).padStart(2, "0")}
            </p>
            <p className="text-xs text-muted-foreground">until next draw</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        {(["jackpot", "instant", "history", "charity"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-yellow-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "jackpot" && (
        <div className="space-y-3">
          {/* Last Draw Numbers */}
          <Card className="border-border/50">
            <CardContent className="py-3 px-4">
              <p className="text-xs font-bold text-muted-foreground mb-2">
                LAST DRAW NUMBERS
              </p>
              <div className="flex gap-2 justify-center">
                {DRAW_NUMBERS.map((n, i) => (
                  <motion.div
                    key={i}
                    className="h-10 w-10 rounded-full bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center font-black text-sm text-yellow-400"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1, type: "spring" }}
                  >
                    {n}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Buy Tickets */}
          <Card className="border-yellow-500/20">
            <CardContent className="py-4 px-4 space-y-3">
              <p className="font-bold text-sm">Buy Tickets</p>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  className="h-9 w-9 p-0 font-black text-lg"
                  onClick={() => setTickets(t => Math.max(1, t - 1))}
                >
                  −
                </Button>
                <p className="font-black text-2xl flex-1 text-center">
                  {tickets}
                </p>
                <Button
                  variant="outline"
                  className="h-9 w-9 p-0 font-black text-lg"
                  onClick={() => setTickets(t => t + 1)}
                >
                  +
                </Button>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Price per ticket: {TICKET_PRICE} SKY4444</span>
                <span className="font-bold text-yellow-400">
                  Total: {tickets * TICKET_PRICE} SKY4444
                </span>
              </div>
              <Button
                className="w-full h-10 text-sm bg-yellow-600 text-white border-0 font-bold"
                onClick={buyTickets}
              >
                <Ticket className="h-4 w-4 mr-2" />
                Buy {tickets} Ticket{tickets > 1 ? "s" : ""}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "instant" && (
        <div className="space-y-3">
          <Card className="border-border/50 text-center">
            <CardContent className="py-6 px-4 space-y-4">
              <p className="font-bold text-sm">Instant Win Scratch Card</p>
              <p className="text-xs text-muted-foreground">
                Cost: 10 SKY4444 per scratch. Win up to 44,444 SKY4444
                instantly!
              </p>
              <div className="h-32 bg-gradient-to-br from-yellow-900/30 to-orange-900/20 rounded-2xl border border-yellow-500/20 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {spinning ? (
                    <motion.div
                      key="spinning"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <RefreshCw className="h-12 w-12 text-yellow-400 animate-spin" />
                    </motion.div>
                  ) : instantResult ? (
                    <motion.p
                      key="result"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="font-black text-base text-yellow-400 px-4"
                    >
                      {instantResult}
                    </motion.p>
                  ) : (
                    <motion.p
                      key="idle"
                      className="text-muted-foreground text-sm"
                    >
                      Click to scratch!
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              <Button
                className="w-full h-10 text-sm bg-yellow-600 text-white border-0 font-bold"
                onClick={spinInstant}
                disabled={spinning}
              >
                <Zap className="h-4 w-4 mr-2" />
                {spinning ? "Scratching..." : "Scratch Card (10 SKY4444)"}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "history" && (
        <div className="space-y-2">
          {RECENT_WINNERS.map((w, i) => (
            <Card key={w.ticket} className="border-border/50">
              <CardContent className="py-2.5 px-4 flex items-center gap-3">
                <Trophy className="h-5 w-5 text-yellow-400 shrink-0" />
                <div className="flex-1">
                  <p className="font-bold text-sm">{w.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Ticket {w.ticket} · {w.date}
                  </p>
                </div>
                <p className="font-black text-sm text-yellow-400">{w.prize}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "charity" && (
        <div className="space-y-2">
          <Card className="border-pink-500/20 bg-pink-900/5">
            <CardContent className="py-4 px-4 text-center">
              <Heart className="h-8 w-8 text-pink-400 mx-auto mb-2" />
              <p className="font-black text-base">10% Goes to Charity</p>
              <p className="text-xs text-muted-foreground mt-1">
                Every ticket purchase automatically donates 10% to verified
                charities chosen by the DAO community.
              </p>
              <p className="font-black text-2xl text-pink-400 mt-3">
                444,444 SKY4444
              </p>
              <p className="text-xs text-muted-foreground">
                donated this month
              </p>
            </CardContent>
          </Card>
          {[
            {
              name: "Children's Education Fund",
              amount: "177,778 SKY4444",
              pct: 40,
            },
            {
              name: "Crypto for Clean Water",
              amount: "133,333 SKY4444",
              pct: 30,
            },
            {
              name: "Tech Skills for Veterans",
              amount: "88,889 SKY4444",
              pct: 20,
            },
            { name: "Animal Rescue DAO", amount: "44,444 SKY4444", pct: 10 },
          ].map(c => (
            <Card key={c.name} className="border-border/50">
              <CardContent className="py-2.5 px-4">
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium">{c.name}</span>
                  <span className="text-pink-400 font-bold">{c.pct}%</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-pink-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${c.pct}%` }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {c.amount}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
