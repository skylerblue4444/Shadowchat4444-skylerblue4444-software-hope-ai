/**
 * ShadowChat — Day Trade Scream Room
 * Voice-to-trade · AI robot execution · Live trader feed · SKY4444
 * Skyler Blue | 479-406-7123 | skycoin444
 */
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const TRADERS = [
  {
    name: "SkylerBlue",
    msg: "SKY4444 breaking out! 🚀",
    pnl: "+$4,444",
    color: "text-yellow-400",
  },
  {
    name: "CryptoKing99",
    msg: "BTC to 100K this week!",
    pnl: "+$1,200",
    color: "text-green-400",
  },
  {
    name: "TrumpTrader",
    msg: "TRUMP coin pumping hard!",
    pnl: "+$888",
    color: "text-red-400",
  },
  {
    name: "DogeArmy",
    msg: "DOGE to the moon again 🌕",
    pnl: "+$444",
    color: "text-yellow-300",
  },
  {
    name: "MoneroMax",
    msg: "XMR privacy is the future",
    pnl: "+$222",
    color: "text-orange-400",
  },
  {
    name: "ArkansasCrypto",
    msg: "Skyler Blue built this 🏆",
    pnl: "+$777",
    color: "text-blue-400",
  },
];

const COMMANDS = [
  {
    label: "🎤 Buy SKY4444",
    action: "BUY SKY4444",
    color: "bg-green-600 hover:bg-green-500",
  },
  {
    label: "🎤 Sell SKY4444",
    action: "SELL SKY4444",
    color: "bg-red-600 hover:bg-red-500",
  },
  {
    label: "🎤 Buy TRUMP",
    action: "BUY TRUMP",
    color: "bg-blue-600 hover:bg-blue-500",
  },
  {
    label: "🎤 Buy BTC",
    action: "BUY BTC",
    color: "bg-orange-600 hover:bg-orange-500",
  },
  {
    label: "🎤 Buy DOGE",
    action: "BUY DOGE",
    color: "bg-yellow-600 hover:bg-yellow-500",
  },
  {
    label: "🎤 Sell All",
    action: "SELL ALL",
    color: "bg-gray-700 hover:bg-gray-600",
  },
];

const PRICES: Record<string, number> = {
  SKY4444: 0.044,
  BTC: 67420,
  DOGE: 0.142,
  TRUMP: 8.44,
  XMR: 162.5,
};

export default function ShadowDayTradeScreamRoom() {
  const [feed, setFeed] = useState(
    TRADERS.map(t => ({ ...t, time: "just now" }))
  );
  const [executed, setExecuted] = useState<
    { action: string; price: string; time: string }[]
  >([]);
  const [online, setOnline] = useState(847);
  const [pnl, setPnl] = useState(0);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    const iv = setInterval(() => {
      const t = TRADERS[Math.floor(Math.random() * TRADERS.length)];
      const msgs = [
        "BUYING THE DIP!",
        "MOON SOON 🌕",
        "AI robot just executed!",
        "SKY4444 to $1!",
        "HODL HODL HODL",
        "Screaming at charts rn 📊",
      ];
      setFeed(f => [
        {
          ...t,
          msg: msgs[Math.floor(Math.random() * msgs.length)],
          time: "just now",
        },
        ...f.slice(0, 7),
      ]);
      setOnline(o => o + Math.floor(Math.random() * 3 - 1));
    }, 2500);
    return () => clearInterval(iv);
  }, []);

  const execute = (action: string) => {
    const coin = action.split(" ")[1] || "SKY4444";
    const price = PRICES[coin] || 0.044;
    const amount = (Math.random() * 100 + 10).toFixed(2);
    const gain = (Math.random() - 0.3) * 50;
    setPnl(p => p + gain);
    setExecuted(e => [
      {
        action,
        price: `$${price.toLocaleString()} · ${amount} ${coin}`,
        time: new Date().toLocaleTimeString(),
      },
      ...e.slice(0, 4),
    ]);
    setFeed(f => [
      {
        name: "🤖 RobotTrader",
        msg: `${action} executed at $${price.toLocaleString()}!`,
        pnl: `${gain >= 0 ? "+" : ""}$${gain.toFixed(2)}`,
        color: "text-purple-400",
        time: "just now",
      },
      ...f.slice(0, 7),
    ]);
  };

  return (
    <div className="space-y-4 pb-6">
      <div className="border-b border-border/40 pb-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black">📈 Scream Room</h1>
            <p className="text-xs text-muted-foreground">
              Yell at charts · AI robot executes · SKY4444 trading
            </p>
          </div>
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
            ● {online.toLocaleString()} online
          </Badge>
        </div>
      </div>

      {/* P&L Banner */}
      <Card
        className={`border-2 ${pnl >= 0 ? "border-green-500/40 bg-green-500/5" : "border-red-500/40 bg-red-500/5"}`}
      >
        <CardContent className="py-3 flex items-center justify-between px-4">
          <div>
            <p className="text-xs text-muted-foreground">Session P&L</p>
            <p
              className={`text-2xl font-black ${pnl >= 0 ? "text-green-400" : "text-red-400"}`}
            >
              {pnl >= 0 ? "+" : ""}${pnl.toFixed(2)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Robot Trades</p>
            <p className="text-xl font-black text-purple-400">
              {executed.length}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Voice Commands */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="font-black text-sm">
            🎤 Voice Commands → Robot Executes
          </p>
          <Button
            size="sm"
            onClick={() => setListening(!listening)}
            className={`h-7 text-xs font-bold ${listening ? "bg-red-600 hover:bg-red-500 text-white" : "bg-purple-600 hover:bg-purple-500 text-white"}`}
          >
            {listening ? "● Listening..." : "Start Voice"}
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {COMMANDS.map((c, i) => (
            <Button
              key={i}
              onClick={() => execute(c.action)}
              className={`h-10 font-bold text-xs text-white border-0 ${c.color}`}
            >
              {c.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Executed Trades */}
      {executed.length > 0 && (
        <div>
          <p className="font-black text-xs text-muted-foreground mb-1.5">
            🤖 Robot Execution Log
          </p>
          <div className="space-y-1.5">
            {executed.map((e, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-muted/30 rounded-lg px-3 py-2"
              >
                <div>
                  <p className="font-bold text-xs text-purple-400">
                    {e.action}
                  </p>
                  <p className="text-xs text-muted-foreground">{e.price}</p>
                </div>
                <p className="text-xs text-muted-foreground">{e.time}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Live Feed */}
      <div>
        <p className="font-black text-sm mb-2">💬 Live Trader Feed</p>
        <div className="space-y-2">
          {feed.slice(0, 6).map((t, i) => (
            <Card key={i} className="border-border/40">
              <CardContent className="py-2 px-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-black">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className={`font-black text-xs ${t.color}`}>{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.msg}</p>
                  </div>
                </div>
                <Badge className="bg-green-500/15 text-green-400 border-green-500/25 text-xs">
                  {t.pnl}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card className="border-yellow-500/30 bg-yellow-500/5">
        <CardContent className="py-3 text-center">
          <p className="font-black text-xs text-yellow-400">
            ✦ Skyler Blue · 479-406-7123 · Day Trade Scream Room
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Crypto kids with $10 and a dream — this is your room 🚀
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
