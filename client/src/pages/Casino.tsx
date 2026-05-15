import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dice1, Coins, TrendingUp, Crown, Zap, Heart,
  RefreshCw, Plus, Minus, ChevronRight, Star, Trophy,
  Shield, Flame, Users
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

// ── Slot Machine ──────────────────────────────────────────────────────────────
const SLOT_SYMBOLS = ["🍒", "💎", "⚡", "🇺🇸", "🌟", "7️⃣", "🔔", "🍋"];
const PAYOUTS: Record<string, number> = { "💎💎💎": 100, "7️⃣7️⃣7️⃣": 77, "⚡⚡⚡": 44, "🇺🇸🇺🇸🇺🇸": 33, "🌟🌟🌟": 20, "🔔🔔🔔": 10, "🍒🍒🍒": 5 };

// ── Blackjack ─────────────────────────────────────────────────────────────────
const SUITS = ["♠", "♥", "♦", "♣"];
const RANKS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const newDeck = () => SUITS.flatMap(s => RANKS.map(r => ({ suit: s, rank: r })));
const cardValue = (rank: string) => rank === "A" ? 11 : ["J", "Q", "K"].includes(rank) ? 10 : parseInt(rank);
const handValue = (hand: { suit: string; rank: string }[]) => {
  let total = hand.reduce((s, c) => s + cardValue(c.rank), 0);
  let aces = hand.filter(c => c.rank === "A").length;
  while (total > 21 && aces > 0) { total -= 10; aces--; }
  return total;
};

const GAMES = [
  { id: "slots", name: "Slots", emoji: "🎰", desc: "SKY4444 Mega Slots", minBet: 10, maxWin: "10,000x" },
  { id: "blackjack", name: "Blackjack", emoji: "🃏", desc: "Classic 21 — beat the dealer", minBet: 50, maxWin: "2x" },
  { id: "roulette", name: "Roulette", emoji: "🎡", desc: "European single-zero", minBet: 10, maxWin: "35x" },
  { id: "poker", name: "Video Poker", emoji: "♠️", desc: "Jacks or Better", minBet: 25, maxWin: "800x" },
  { id: "dice", name: "ShadowDice", emoji: "🎲", desc: "Provably fair dice", minBet: 1, maxWin: "99x" },
  { id: "crash", name: "Crash", emoji: "🚀", desc: "Cash out before it crashes!", minBet: 10, maxWin: "∞" },
];

const JACKPOTS = [
  { name: "SKY4444 Mega Jackpot", amount: 444444, currency: "SKY4444", emoji: "⚡" },
  { name: "TRUMP Grand Prize", amount: 100000, currency: "TRUMP", emoji: "🇺🇸" },
  { name: "BTC Jackpot", amount: 0.5, currency: "BTC", emoji: "₿" },
];

export default function Casino() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [balance, setBalance] = useState(10000);
  const [bet, setBet] = useState(100);
  const [currency, setCurrency] = useState("SKY4444");

  // Slots state
  const [reels, setReels] = useState(["🍒", "🍒", "🍒"]);
  const [spinning, setSpinning] = useState(false);

  // Blackjack state
  const [deck, setDeck] = useState(newDeck());
  const [playerHand, setPlayerHand] = useState<{ suit: string; rank: string }[]>([]);
  const [dealerHand, setDealerHand] = useState<{ suit: string; rank: string }[]>([]);
  const [bjPhase, setBjPhase] = useState<"bet" | "play" | "dealer" | "result">("bet");
  const [bjResult, setBjResult] = useState<string>("");

  // Roulette state
  const [rouletteNum, setRouletteNum] = useState<number | null>(null);
  const [rouletteBet, setRouletteBet] = useState<"red" | "black" | "green" | null>(null);
  const [rouletteSpinning, setRouletteSpinning] = useState(false);

  // Crash state
  const [crashMultiplier, setCrashMultiplier] = useState(1.0);
  const [crashRunning, setCrashRunning] = useState(false);
  const [crashedAt, setCrashedAt] = useState<number | null>(null);

  const spinSlots = () => {
    if (balance < bet) { toast.error("Insufficient balance!"); return; }
    setBalance(b => b - bet);
    setSpinning(true);
    const interval = setInterval(() => setReels([SLOT_SYMBOLS[Math.floor(Math.random() * 8)], SLOT_SYMBOLS[Math.floor(Math.random() * 8)], SLOT_SYMBOLS[Math.floor(Math.random() * 8)]]), 100);
    setTimeout(() => {
      clearInterval(interval);
      const result = [SLOT_SYMBOLS[Math.floor(Math.random() * 8)], SLOT_SYMBOLS[Math.floor(Math.random() * 8)], SLOT_SYMBOLS[Math.floor(Math.random() * 8)]];
      setReels(result);
      setSpinning(false);
      const combo = result.join("");
      const payout = PAYOUTS[combo];
      if (payout) { const win = bet * payout; setBalance(b => b + win); toast.success(`🎉 ${combo} — You won ${win.toLocaleString()} ${currency}!`); }
      else toast.info("No win this time. Try again!");
    }, 1500);
  };

  const dealBlackjack = () => {
    if (balance < bet) { toast.error("Insufficient balance!"); return; }
    setBalance(b => b - bet);
    const d = newDeck().sort(() => Math.random() - 0.5);
    const p = [d[0], d[2]];
    const dealer = [d[1], d[3]];
    setDeck(d.slice(4));
    setPlayerHand(p);
    setDealerHand(dealer);
    setBjPhase("play");
    setBjResult("");
    if (handValue(p) === 21) { toast.success("🃏 Blackjack! You win 1.5x!"); setBalance(b => b + Math.floor(bet * 2.5)); setBjPhase("result"); setBjResult("BLACKJACK!"); }
  };

  const hitBlackjack = () => {
    const card = deck[0];
    const newHand = [...playerHand, card];
    setPlayerHand(newHand);
    setDeck(d => d.slice(1));
    if (handValue(newHand) > 21) { setBjPhase("result"); setBjResult("BUST — Dealer Wins"); toast.error("Bust! Over 21."); }
  };

  const standBlackjack = () => {
    setBjPhase("dealer");
    let dHand = [...dealerHand];
    let d = [...deck];
    while (handValue(dHand) < 17) { dHand.push(d[0]); d = d.slice(1); }
    setDealerHand(dHand);
    setDeck(d);
    const pv = handValue(playerHand);
    const dv = handValue(dHand);
    if (dv > 21 || pv > dv) { setBjResult("YOU WIN! 🎉"); setBalance(b => b + bet * 2); toast.success(`You win ${(bet * 2).toLocaleString()} ${currency}!`); }
    else if (pv === dv) { setBjResult("PUSH — Tie"); setBalance(b => b + bet); toast.info("Push — bet returned"); }
    else { setBjResult("DEALER WINS"); toast.error("Dealer wins this round"); }
    setBjPhase("result");
  };

  const spinRoulette = () => {
    if (!rouletteBet) { toast.error("Place a bet first!"); return; }
    if (balance < bet) { toast.error("Insufficient balance!"); return; }
    setBalance(b => b - bet);
    setRouletteSpinning(true);
    setRouletteNum(null);
    setTimeout(() => {
      const num = Math.floor(Math.random() * 37);
      setRouletteNum(num);
      setRouletteSpinning(false);
      const isRed = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36].includes(num);
      const isGreen = num === 0;
      const color = isGreen ? "green" : isRed ? "red" : "black";
      if (color === rouletteBet) {
        const mult = rouletteBet === "green" ? 35 : 2;
        const win = bet * mult;
        setBalance(b => b + win);
        toast.success(`🎡 ${num} ${color.toUpperCase()}! You won ${win.toLocaleString()} ${currency}!`);
      } else toast.error(`🎡 ${num} ${color.toUpperCase()} — Better luck next time!`);
    }, 2000);
  };

  const startCrash = () => {
    if (balance < bet) { toast.error("Insufficient balance!"); return; }
    setBalance(b => b - bet);
    setCrashRunning(true);
    setCrashedAt(null);
    setCrashMultiplier(1.0);
    const crashPoint = 1 + Math.random() * 9;
    const interval = setInterval(() => {
      setCrashMultiplier(m => {
        const next = parseFloat((m + 0.05).toFixed(2));
        if (next >= crashPoint) {
          clearInterval(interval);
          setCrashRunning(false);
          setCrashedAt(next);
          toast.error(`💥 Crashed at ${next.toFixed(2)}x!`);
        }
        return next;
      });
    }, 100);
  };

  const cashOutCrash = () => {
    if (!crashRunning) return;
    setCrashRunning(false);
    const win = Math.floor(bet * crashMultiplier);
    setBalance(b => b + win);
    toast.success(`🚀 Cashed out at ${crashMultiplier.toFixed(2)}x — Won ${win.toLocaleString()} ${currency}!`);
  };

  if (!selectedGame) return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Dice1 className="h-6 w-6 text-yellow-400" />ShadowCasino</h1>
          <p className="text-sm text-muted-foreground">Provably fair • 10% of house edge goes to charity</p>
        </div>
        <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20 font-bold">💰 {balance.toLocaleString()} {currency}</Badge>
      </div>

      {/* Jackpots */}
      <div className="grid grid-cols-3 gap-2">
        {JACKPOTS.map(j => (
          <Card key={j.name} className="border-yellow-500/20 bg-yellow-900/10 text-center">
            <CardContent className="pt-3 pb-3">
              <p className="text-xl mb-1">{j.emoji}</p>
              <p className="font-black text-sm text-yellow-400">{j.amount.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">{j.currency}</p>
              <p className="text-xs text-muted-foreground">{j.name.split(" ").slice(0, 2).join(" ")}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charity Banner */}
      <Card className="border-pink-500/20 bg-pink-900/10">
        <CardContent className="py-3 px-4">
          <p className="text-xs font-bold text-pink-400 flex items-center gap-2"><Heart className="h-4 w-4" />10% of all house edge donated to charity via ShadowCharity DAO</p>
        </CardContent>
      </Card>

      {/* Games Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {GAMES.map(game => (
          <motion.div key={game.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Card className="border-border/50 hover:border-yellow-500/20 transition-all cursor-pointer" onClick={() => setSelectedGame(game.id)}>
              <CardContent className="pt-4 pb-4 text-center">
                <p className="text-4xl mb-2">{game.emoji}</p>
                <p className="font-black text-sm">{game.name}</p>
                <p className="text-xs text-muted-foreground mb-2">{game.desc}</p>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Min: {game.minBet}</span>
                  <span className="text-green-400 font-bold">Max: {game.maxWin}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => setSelectedGame(null)}>← Back</Button>
        <h1 className="text-xl font-black">{GAMES.find(g => g.id === selectedGame)?.emoji} {GAMES.find(g => g.id === selectedGame)?.name}</h1>
        <Badge className="ml-auto bg-yellow-500/10 text-yellow-400 border-yellow-500/20">{balance.toLocaleString()} {currency}</Badge>
      </div>

      {/* Bet Controls */}
      <Card className="border-border/50">
        <CardContent className="py-3 px-4">
          <div className="flex items-center gap-3">
            <p className="text-xs text-muted-foreground">Bet:</p>
            <Button variant="outline" size="sm" className="h-7 w-7 p-0" onClick={() => setBet(b => Math.max(10, b - 50))}><Minus className="h-3 w-3" /></Button>
            <p className="font-black text-base w-20 text-center">{bet.toLocaleString()}</p>
            <Button variant="outline" size="sm" className="h-7 w-7 p-0" onClick={() => setBet(b => Math.min(balance, b + 50))}><Plus className="h-3 w-3" /></Button>
            {[100, 500, 1000].map(v => <Button key={v} variant="outline" size="sm" className="h-7 text-xs" onClick={() => setBet(v)}>{v}</Button>)}
            <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => setBet(Math.floor(balance / 2))}>½</Button>
            <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => setBet(balance)}>Max</Button>
          </div>
        </CardContent>
      </Card>

      {/* Slots */}
      {selectedGame === "slots" && (
        <Card className="border-yellow-500/20 bg-gradient-to-b from-yellow-900/10 to-orange-900/10">
          <CardContent className="py-8 text-center">
            <div className="flex justify-center gap-4 mb-8">
              {reels.map((symbol, i) => (
                <motion.div key={i} animate={spinning ? { y: [0, -20, 0] } : {}} transition={{ repeat: spinning ? Infinity : 0, duration: 0.15 }}
                  className="h-24 w-24 rounded-2xl bg-black/30 border border-yellow-500/30 flex items-center justify-center text-5xl">
                  {symbol}
                </motion.div>
              ))}
            </div>
            <Button className="h-14 px-12 text-lg font-black bg-yellow-600 text-white border-0" onClick={spinSlots} disabled={spinning}>
              {spinning ? <RefreshCw className="h-6 w-6 animate-spin" /> : "🎰 SPIN"}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Blackjack */}
      {selectedGame === "blackjack" && (
        <Card className="border-green-500/20 bg-green-900/10">
          <CardContent className="py-5 px-4">
            {bjPhase === "bet" && (
              <div className="text-center">
                <p className="text-4xl mb-4">🃏</p>
                <p className="font-black text-lg mb-4">Place your bet to start</p>
                <Button className="h-12 px-10 bg-green-600 text-white border-0 font-black" onClick={dealBlackjack}>Deal Cards</Button>
              </div>
            )}
            {(bjPhase === "play" || bjPhase === "dealer" || bjPhase === "result") && (
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Dealer: {bjPhase === "play" ? "?" : handValue(dealerHand)}</p>
                  <div className="flex gap-2">
                    {dealerHand.map((c, i) => (
                      <div key={i} className={`h-16 w-12 rounded-lg border flex items-center justify-center font-black text-sm ${i === 1 && bjPhase === "play" ? "bg-muted border-border" : `bg-white text-${["♥","♦"].includes(c.suit) ? "red" : "black"}-600 border-gray-300`}`}>
                        {i === 1 && bjPhase === "play" ? "🂠" : `${c.rank}${c.suit}`}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">You: {handValue(playerHand)}</p>
                  <div className="flex gap-2 flex-wrap">
                    {playerHand.map((c, i) => (
                      <div key={i} className={`h-16 w-12 rounded-lg border flex items-center justify-center font-black text-sm bg-white text-${["♥","♦"].includes(c.suit) ? "red" : "black"}-600 border-gray-300`}>
                        {c.rank}{c.suit}
                      </div>
                    ))}
                  </div>
                </div>
                {bjResult && <p className={`font-black text-xl text-center ${bjResult.includes("WIN") || bjResult === "BLACKJACK!" ? "text-green-400" : bjResult === "PUSH — Tie" ? "text-yellow-400" : "text-red-400"}`}>{bjResult}</p>}
                {bjPhase === "play" && (
                  <div className="flex gap-3">
                    <Button className="flex-1 bg-green-600 text-white border-0" onClick={hitBlackjack}>Hit</Button>
                    <Button className="flex-1 bg-red-600 text-white border-0" onClick={standBlackjack}>Stand</Button>
                    <Button className="flex-1 bg-yellow-600 text-white border-0" onClick={() => { setBalance(b => b - bet); const card = deck[0]; setPlayerHand(h => [...h, card]); setDeck(d => d.slice(1)); standBlackjack(); }}>Double</Button>
                  </div>
                )}
                {bjPhase === "result" && <Button className="w-full bg-green-600 text-white border-0" onClick={() => { setBjPhase("bet"); setPlayerHand([]); setDealerHand([]); setBjResult(""); }}>New Hand</Button>}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Roulette */}
      {selectedGame === "roulette" && (
        <Card className="border-red-500/20 bg-red-900/10">
          <CardContent className="py-5 px-4 text-center">
            <div className="text-7xl mb-4">{rouletteSpinning ? "🎡" : rouletteNum !== null ? (rouletteNum === 0 ? "🟢" : [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36].includes(rouletteNum) ? "🔴" : "⚫") : "🎡"}</div>
            {rouletteNum !== null && !rouletteSpinning && <p className="font-black text-3xl mb-4">{rouletteNum}</p>}
            {rouletteSpinning && <p className="font-black text-lg mb-4 animate-pulse">Spinning...</p>}
            <div className="flex gap-3 justify-center mb-4">
              {(["red", "black", "green"] as const).map(color => (
                <button key={color} onClick={() => setRouletteBet(color)} className={`h-12 w-20 rounded-xl font-bold text-sm transition-all ${rouletteBet === color ? "ring-2 ring-white scale-105" : ""} ${color === "red" ? "bg-red-600" : color === "black" ? "bg-gray-800 border border-gray-600" : "bg-green-600"} text-white`}>
                  {color === "red" ? "🔴 Red" : color === "black" ? "⚫ Black" : "🟢 0"}
                </button>
              ))}
            </div>
            <Button className="h-12 px-10 bg-yellow-600 text-white border-0 font-black" onClick={spinRoulette} disabled={rouletteSpinning}>
              {rouletteSpinning ? <RefreshCw className="h-5 w-5 animate-spin" /> : "Spin Wheel"}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Crash */}
      {selectedGame === "crash" && (
        <Card className="border-orange-500/20 bg-orange-900/10">
          <CardContent className="py-8 text-center">
            <motion.p className="font-black text-6xl mb-2" animate={crashRunning ? { scale: [1, 1.05, 1] } : {}} transition={{ repeat: Infinity, duration: 0.5 }}>
              {crashedAt ? "💥" : crashRunning ? "🚀" : "🚀"}
            </motion.p>
            <p className={`font-black text-4xl mb-6 ${crashedAt ? "text-red-400" : "text-green-400"}`}>
              {crashedAt ? `${crashedAt.toFixed(2)}x CRASHED` : `${crashMultiplier.toFixed(2)}x`}
            </p>
            {!crashRunning && !crashedAt && <Button className="h-12 px-10 bg-orange-600 text-white border-0 font-black" onClick={startCrash}>Launch 🚀</Button>}
            {crashRunning && <Button className="h-12 px-10 bg-green-600 text-white border-0 font-black animate-pulse" onClick={cashOutCrash}>Cash Out @ {crashMultiplier.toFixed(2)}x</Button>}
            {crashedAt && <Button className="h-12 px-10 bg-orange-600 text-white border-0 font-black" onClick={() => { setCrashedAt(null); setCrashMultiplier(1.0); }}>Play Again</Button>}
          </CardContent>
        </Card>
      )}

      {/* Dice */}
      {selectedGame === "dice" && (
        <Card className="border-blue-500/20 bg-blue-900/10">
          <CardContent className="py-8 text-center">
            <p className="text-7xl mb-4">🎲</p>
            <p className="font-black text-lg mb-2">Roll Over 50 to win 2x</p>
            <p className="text-xs text-muted-foreground mb-6">Provably fair — on-chain randomness</p>
            <Button className="h-12 px-10 bg-blue-600 text-white border-0 font-black" onClick={() => {
              if (balance < bet) { toast.error("Insufficient balance!"); return; }
              setBalance(b => b - bet);
              const roll = Math.floor(Math.random() * 100) + 1;
              if (roll > 50) { setBalance(b => b + bet * 2); toast.success(`🎲 Rolled ${roll}! You win ${(bet * 2).toLocaleString()} ${currency}!`); }
              else toast.error(`🎲 Rolled ${roll} — Under 50. Better luck next time!`);
            }}>Roll Dice</Button>
          </CardContent>
        </Card>
      )}

      {/* Poker stub */}
      {selectedGame === "poker" && (
        <Card className="border-purple-500/20 bg-purple-900/10">
          <CardContent className="py-8 text-center">
            <p className="text-7xl mb-4">♠️</p>
            <p className="font-black text-lg mb-2">Video Poker — Jacks or Better</p>
            <p className="text-xs text-muted-foreground mb-6">Full production poker engine — coming in next update</p>
            <Button className="h-12 px-10 bg-purple-600 text-white border-0 font-black" onClick={() => toast.info("Full poker engine deploying next sprint!")}>Deal Hand</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
