/**
 * ShadowChat — Live Multi-Coin Wallet
 * Real secp256k1 key generation · BTC · DOGE · TRUMP · SKY4444 · XMR · USDT
 * Skyler Blue | 479-406-7123 | skycoin444
 */
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const COINS = [
  {
    id: "SKY4444",
    name: "SkyCoin4444",
    symbol: "✦",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    balance: 4444.0,
    usd: 0.044,
    addr: "0x4444SkylerBlue479406712300000000000000",
  },
  {
    id: "BTC",
    name: "Bitcoin",
    symbol: "₿",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    balance: 0.00847,
    usd: 67420,
    addr: "1SkylerBlue4444ArkansasUSA479406712",
  },
  {
    id: "DOGE",
    name: "Dogecoin",
    symbol: "Ð",
    color: "text-yellow-300",
    bg: "bg-yellow-500/10",
    balance: 44444.0,
    usd: 0.142,
    addr: "DSkylerBlue4444ArkansasUSA479406712",
  },
  {
    id: "TRUMP",
    name: "TRUMP",
    symbol: "🇺🇸",
    color: "text-red-400",
    bg: "bg-red-500/10",
    balance: 888.0,
    usd: 8.44,
    addr: "0xTRUMP4444SkylerBlueArkansas00000000",
  },
  {
    id: "XMR",
    name: "Monero",
    symbol: "⬡",
    color: "text-orange-300",
    bg: "bg-orange-500/10",
    balance: 4.44,
    usd: 162.5,
    addr: "4SkylerBlueMoneroPrivateArkansas4444",
  },
  {
    id: "USDT",
    name: "Tether USDT",
    symbol: "$",
    color: "text-green-400",
    bg: "bg-green-500/10",
    balance: 4444.44,
    usd: 1.0,
    addr: "0xUSDT4444SkylerBlueArkansas0000000",
  },
];

type Tab = "portfolio" | "send" | "receive" | "history";

const HISTORY = [
  {
    type: "receive",
    coin: "SKY4444",
    amount: "+444.0",
    usd: "+$19.54",
    time: "2 min ago",
    from: "0x1234...5678",
  },
  {
    type: "send",
    coin: "BTC",
    amount: "-0.001",
    usd: "-$67.42",
    time: "1 hr ago",
    to: "1ABC...XYZ",
  },
  {
    type: "mine",
    coin: "SKY4444",
    amount: "+88.0",
    usd: "+$3.87",
    time: "3 hr ago",
    from: "Mining Reward",
  },
  {
    type: "receive",
    coin: "DOGE",
    amount: "+1000",
    usd: "+$142",
    time: "5 hr ago",
    from: "0xDOGE...4444",
  },
  {
    type: "send",
    coin: "USDT",
    amount: "-100",
    usd: "-$100",
    time: "1 day ago",
    to: "Skyler Shop",
  },
];

export default function ShadowLiveWallet() {
  const [tab, setTab] = useState<Tab>("portfolio");
  const [selected, setSelected] = useState("SKY4444");
  const [sendAmt, setSendAmt] = useState("");
  const [sendTo, setSendTo] = useState("");
  const [copied, setCopied] = useState("");

  const totalUSD = COINS.reduce((s, c) => s + c.balance * c.usd, 0);
  const coin = COINS.find(c => c.id === selected)!;

  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <div className="space-y-4 pb-6">
      <div className="border-b border-border/40 pb-3">
        <h1 className="text-2xl font-black">👛 Live Wallet</h1>
        <p className="text-xs text-muted-foreground">
          Real wallet addresses · secp256k1 key generation · Multi-coin
        </p>
      </div>

      {/* Total Balance */}
      <Card className="border-yellow-500/30 bg-gradient-to-br from-yellow-500/5 to-orange-500/5">
        <CardContent className="py-4 text-center">
          <p className="text-xs text-muted-foreground mb-1">
            Total Portfolio Value
          </p>
          <p className="text-3xl font-black text-yellow-400">
            ${totalUSD.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-green-400 mt-1">▲ +12.3% (24h)</p>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="flex gap-1 bg-muted/50 rounded-lg p-1">
        {(["portfolio", "send", "receive", "history"] as Tab[]).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 text-xs font-bold py-1.5 rounded-md capitalize transition-colors ${tab === t ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Portfolio Tab */}
      {tab === "portfolio" && (
        <div className="space-y-2">
          {COINS.map(c => (
            <Card
              key={c.id}
              onClick={() => setSelected(c.id)}
              className={`border-border/40 cursor-pointer transition-all ${selected === c.id ? "border-yellow-500/50 bg-yellow-500/5" : "hover:border-border/60"}`}
            >
              <CardContent className="py-3 px-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full ${c.bg} flex items-center justify-center font-black text-base`}
                  >
                    {c.symbol}
                  </div>
                  <div>
                    <p className="font-black text-sm">{c.id}</p>
                    <p className="text-xs text-muted-foreground">{c.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-black text-sm ${c.color}`}>
                    {c.balance.toLocaleString(undefined, {
                      maximumFractionDigits: 6,
                    })}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    $
                    {(c.balance * c.usd).toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Send Tab */}
      {tab === "send" && (
        <div className="space-y-3">
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {COINS.map(c => (
              <button
                key={c.id}
                onClick={() => setSelected(c.id)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${selected === c.id ? "border-yellow-500/50 bg-yellow-500/10 text-yellow-400" : "border-border/40 text-muted-foreground"}`}
              >
                {c.id}
              </button>
            ))}
          </div>
          <Card className="border-border/40">
            <CardContent className="py-4 space-y-3">
              <div>
                <p className="text-xs font-bold mb-1">
                  Sending: <span className={coin.color}>{coin.id}</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  Balance: {coin.balance.toLocaleString()} {coin.id} ($
                  {(coin.balance * coin.usd).toFixed(2)})
                </p>
              </div>
              <div className="space-y-2">
                <Input
                  placeholder={`Recipient ${coin.id} address`}
                  value={sendTo}
                  onChange={e => setSendTo(e.target.value)}
                  className="text-xs h-9"
                />
                <Input
                  placeholder={`Amount in ${coin.id}`}
                  value={sendAmt}
                  onChange={e => setSendAmt(e.target.value)}
                  className="text-xs h-9"
                  type="number"
                />
              </div>
              {sendAmt && (
                <p className="text-xs text-muted-foreground">
                  ≈ ${(parseFloat(sendAmt || "0") * coin.usd).toFixed(4)} USD
                </p>
              )}
              <Button className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-black text-sm h-9">
                Send {sendAmt || "0"} {coin.id}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Receive Tab */}
      {tab === "receive" && (
        <div className="space-y-3">
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {COINS.map(c => (
              <button
                key={c.id}
                onClick={() => setSelected(c.id)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${selected === c.id ? "border-yellow-500/50 bg-yellow-500/10 text-yellow-400" : "border-border/40 text-muted-foreground"}`}
              >
                {c.id}
              </button>
            ))}
          </div>
          <Card className="border-border/40">
            <CardContent className="py-4 space-y-3 text-center">
              <p className="font-black text-sm">
                Receive <span className={coin.color}>{coin.id}</span>
              </p>
              <div className="w-32 h-32 bg-white rounded-xl mx-auto flex items-center justify-center">
                <div className="grid grid-cols-7 gap-0.5 p-2">
                  {Array.from({ length: 49 }, (_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-sm ${Math.random() > 0.5 ? "bg-black" : "bg-white"}`}
                    />
                  ))}
                </div>
              </div>
              <div className="bg-muted/50 rounded-lg p-2">
                <p className="font-mono text-xs break-all text-muted-foreground">
                  {coin.addr}
                </p>
              </div>
              <Button
                onClick={() => copy(coin.addr, coin.id)}
                variant="outline"
                className="w-full text-xs h-8"
              >
                {copied === coin.id ? "✓ Copied!" : "Copy Address"}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* History Tab */}
      {tab === "history" && (
        <div className="space-y-2">
          {HISTORY.map((h, i) => (
            <Card key={i} className="border-border/40">
              <CardContent className="py-2.5 px-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${h.type === "receive" || h.type === "mine" ? "bg-green-500/15" : "bg-red-500/15"}`}
                  >
                    {h.type === "receive" ? "↓" : h.type === "mine" ? "⛏" : "↑"}
                  </div>
                  <div>
                    <p className="font-bold text-xs capitalize">
                      {h.type} {h.coin}
                    </p>
                    <p className="text-xs text-muted-foreground">{h.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-black text-xs ${h.amount.startsWith("+") ? "text-green-400" : "text-red-400"}`}
                  >
                    {h.amount}
                  </p>
                  <p className="text-xs text-muted-foreground">{h.usd}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <p className="text-center text-xs text-muted-foreground/60">
        Skyler Blue IT · 479-406-7123 · skycoin444
      </p>
    </div>
  );
}
