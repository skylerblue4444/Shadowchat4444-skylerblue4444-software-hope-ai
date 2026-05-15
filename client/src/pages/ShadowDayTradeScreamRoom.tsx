import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, TrendingUp, TrendingDown, Zap, Volume2, Bot } from "lucide-react";
import { toast } from "sonner";

const liveTraders = [
  { name: "SkylerB", status: "🟢 LIVE", action: "BUY BTC", pnl: "+$847", mic: true },
  { name: "CryptoKid10", status: "🟢 LIVE", action: "SELL ETH", pnl: "-$42", mic: true },
  { name: "DeFiDegen", status: "🟢 LIVE", action: "LONG SKY4444", pnl: "+$4,444", mic: false },
  { name: "MoonMayor", status: "🟡 AFK", action: "HOLD BTC", pnl: "+$12K", mic: false },
  { name: "ScalpKing", status: "🟢 LIVE", action: "SHORT DOGE", pnl: "+$280", mic: true },
  { name: "WenLambo", status: "🟢 LIVE", action: "BUY SOL", pnl: "+$1,200", mic: true },
];

const screams = [
  { user: "SkylerB", msg: "SKY4444 IS PUMPING — BUY NOW OR CRY LATER 🚀", time: "2s ago", color: "text-yellow-400" },
  { user: "CryptoKid10", msg: "ETH just dumped 3% — ROBOT SELL EVERYTHING", time: "8s ago", color: "text-red-400" },
  { user: "DeFiDegen", msg: "I TOLD THE BOT TO BUY THE DIP AND IT ACTUALLY DID IT", time: "15s ago", color: "text-green-400" },
  { user: "ScalpKing", msg: "DOGE SHORT PRINTING — HANDS FREE BABY", time: "22s ago", color: "text-blue-400" },
  { user: "WenLambo", msg: "SOL BREAKING ATH — ROBOT GO BRR 🤖", time: "31s ago", color: "text-violet-400" },
  { user: "MoonMayor", msg: "BTC 100K INCOMING — HOLD THE LINE SOLDIERS", time: "44s ago", color: "text-orange-400" },
];

const voiceCommands = [
  { cmd: "Buy [COIN]", example: "Buy SKY4444", action: "Market buy at current price" },
  { cmd: "Sell [COIN]", example: "Sell ETH", action: "Market sell entire position" },
  { cmd: "Long [COIN] [SIZE]", example: "Long BTC 10x", action: "Open leveraged long" },
  { cmd: "Short [COIN] [SIZE]", example: "Short DOGE 5x", action: "Open leveraged short" },
  { cmd: "Stop loss [%]", example: "Stop loss 5%", action: "Set stop loss on open position" },
  { cmd: "Take profit [%]", example: "Take profit 20%", action: "Set take profit target" },
  { cmd: "Close all", example: "Close all", action: "Close all open positions" },
  { cmd: "Portfolio", example: "Portfolio", action: "Read out current P&L" },
];

const liveStats = [
  { label: "Traders Online", value: "847", color: "text-green-400" },
  { label: "Room Volume", value: "$4.4M", color: "text-yellow-400" },
  { label: "Bot Trades Today", value: "8,247", color: "text-blue-400" },
  { label: "Top P&L Today", value: "+$44K", color: "text-violet-400" },
];

export default function ShadowDayTradeScreamRoom() {
  const [micOn, setMicOn] = useState(false);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [botResponse, setBotResponse] = useState("");
  const [feed, setFeed] = useState(screams);
  const feedRef = useRef<HTMLDivElement>(null);

  // Simulate live feed updates
  useEffect(() => {
    const msgs = [
      { user: "RoboTrader", msg: "AUTO-EXECUTED: BUY 0.5 BTC at $67,420 — voice command received", color: "text-green-400" },
      { user: "ScalpKing", msg: "ANOTHER WIN — robot scalped DOGE for +$180 in 4 minutes", color: "text-blue-400" },
      { user: "CryptoKid10", msg: "HANDS FREE IS THE ONLY WAY TO TRADE — let the bot cook", color: "text-yellow-400" },
    ];
    const t = setInterval(() => {
      const msg = msgs[Math.floor(Math.random() * msgs.length)];
      setFeed(f => [{ ...msg, time: "just now" }, ...f.slice(0, 9)]);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const toggleMic = () => {
    if (!micOn) {
      setMicOn(true);
      setListening(true);
      toast.success("🎤 Mic ON — speak your trade command. Robot is listening.");
      // Simulate voice recognition
      setTimeout(() => {
        setTranscript("Buy SKY4444");
        setListening(false);
        setTimeout(() => {
          setBotResponse("✅ EXECUTED: Market buy SKY4444 — 1,000 tokens at $0.047. Cost: $47.00. Wallet updated.");
          toast.success("🤖 Robot executed your trade — BUY SKY4444 complete!");
        }, 1500);
      }, 3000);
    } else {
      setMicOn(false);
      setListening(false);
      setTranscript("");
      setBotResponse("");
      toast.info("Mic OFF");
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black">Day Trade Scream Room</h1>
          <p className="text-xs text-muted-foreground">Yell at charts. Let the robot trade for you. Hands-free crypto trading with voice commands.</p>
        </div>
        <Badge className="bg-red-600 text-white shrink-0 animate-pulse">🔴 LIVE</Badge>
      </div>

      {/* Live Stats */}
      <div className="grid grid-cols-4 gap-2">
        {liveStats.map((s, i) => (
          <Card key={i} className="border-border/50 text-center">
            <CardContent className="py-3 px-1">
              <p className={`font-black text-sm ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground leading-tight">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Voice Trade Widget */}
      <Card className={`border-2 transition-all ${micOn ? "border-red-500/70 bg-red-900/20" : "border-border/50"}`}>
        <CardContent className="py-4 px-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="font-black text-sm">🎤 Voice-to-Trade Robot</p>
            <Badge className={`${micOn ? "bg-red-600 animate-pulse" : "bg-gray-700"} text-white`}>
              {micOn ? (listening ? "Listening..." : "Processing") : "Standby"}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            Speak your trade command — the AI robot executes it instantly. No keyboard. No clicks. Just talk.
          </p>
          {transcript && (
            <div className="rounded-lg bg-black/40 p-2 font-mono text-xs">
              <p className="text-blue-400">&gt; You said: <span className="text-white font-bold">"{transcript}"</span></p>
            </div>
          )}
          {botResponse && (
            <div className="rounded-lg bg-green-900/30 border border-green-500/30 p-2 font-mono text-xs">
              <p className="text-green-400"><Bot className="h-3 w-3 inline mr-1" />{botResponse}</p>
            </div>
          )}
          <Button
            className={`w-full font-black border-0 ${micOn ? "bg-red-600 hover:bg-red-500" : "bg-indigo-600 hover:bg-indigo-500"} text-white`}
            onClick={toggleMic}
          >
            {micOn ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
            {micOn ? "Stop Listening" : "Start Voice Trading"}
          </Button>
        </CardContent>
      </Card>

      {/* Voice Commands Reference */}
      <Card className="border-border/50">
        <CardContent className="py-3 px-4 space-y-2">
          <p className="font-black text-xs text-muted-foreground uppercase tracking-wider">Voice Commands</p>
          <div className="space-y-1.5">
            {voiceCommands.map((v, i) => (
              <div key={i} className="flex items-start gap-2">
                <Zap className="h-3 w-3 text-yellow-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-yellow-400">"{v.example}"</span>
                  <span className="text-xs text-muted-foreground ml-2">→ {v.action}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Live Traders */}
      <div>
        <p className="font-black text-xs text-muted-foreground uppercase tracking-wider mb-2">Live Traders in Room</p>
        <div className="grid grid-cols-2 gap-2">
          {liveTraders.map((t, i) => (
            <Card key={i} className="border-border/50">
              <CardContent className="py-2 px-3">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-black text-xs">{t.name}</p>
                  <span className="text-xs">{t.status}</span>
                </div>
                <p className="text-xs text-blue-400">{t.action}</p>
                <div className="flex items-center justify-between mt-1">
                  <p className={`text-xs font-bold ${t.pnl.startsWith("+") ? "text-green-400" : "text-red-400"}`}>{t.pnl}</p>
                  {t.mic && <Volume2 className="h-3 w-3 text-red-400" />}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Live Scream Feed */}
      <div>
        <p className="font-black text-xs text-muted-foreground uppercase tracking-wider mb-2">Live Scream Feed</p>
        <Card className="border-border/50">
          <CardContent className="py-2 px-3 space-y-2 max-h-64 overflow-y-auto" ref={feedRef}>
            {feed.map((s, i) => (
              <div key={i} className="flex items-start gap-2 border-b border-border/30 pb-1.5 last:border-0">
                <div className="h-5 w-5 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-xs font-black text-white shrink-0">
                  {s.user[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-bold text-indigo-400">{s.user}: </span>
                  <span className={`text-xs ${s.color} font-bold`}>{s.msg}</span>
                </div>
                <span className="text-xs text-muted-foreground shrink-0">{s.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Trade Buttons */}
      <Card className="border-yellow-500/30 bg-gradient-to-br from-yellow-900/20 to-orange-900/20">
        <CardContent className="py-3 px-4 space-y-2">
          <p className="font-black text-sm text-yellow-400">⚡ Quick Robot Trades</p>
          <p className="text-xs text-muted-foreground">Tap to execute instantly — no voice needed. Robot handles it.</p>
          <div className="grid grid-cols-2 gap-2">
            <Button className="font-black bg-green-600 hover:bg-green-500 text-white border-0 text-xs"
              onClick={() => toast.success("🤖 Robot: BUY SKY4444 executed!")}>
              <TrendingUp className="h-3 w-3 mr-1" /> BUY SKY4444
            </Button>
            <Button className="font-black bg-red-600 hover:bg-red-500 text-white border-0 text-xs"
              onClick={() => toast.success("🤖 Robot: SELL SKY4444 executed!")}>
              <TrendingDown className="h-3 w-3 mr-1" /> SELL SKY4444
            </Button>
            <Button className="font-black bg-orange-600 hover:bg-orange-500 text-white border-0 text-xs"
              onClick={() => toast.success("🤖 Robot: BUY BTC executed!")}>
              <TrendingUp className="h-3 w-3 mr-1" /> BUY BTC
            </Button>
            <Button className="font-black bg-blue-600 hover:bg-blue-500 text-white border-0 text-xs"
              onClick={() => toast.success("🤖 Robot: LONG ETH 5x executed!")}>
              <Zap className="h-3 w-3 mr-1" /> LONG ETH 5x
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-xl bg-muted/50 border border-border/50 p-3 text-center">
        <p className="font-black text-xs">Day Trade Scream Room — ShadowChat</p>
        <p className="text-xs text-muted-foreground">Voice trading · Robot execution · SKY4444 rewards · Skyler Blue 479-406-7123</p>
      </div>
    </div>
  );
}
