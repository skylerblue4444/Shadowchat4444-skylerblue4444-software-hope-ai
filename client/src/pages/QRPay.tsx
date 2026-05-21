import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  QrCode,
  Scan,
  Send,
  Download,
  Copy,
  CheckCircle,
  Coins,
  Zap,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  Store,
  Coffee,
  Utensils,
  ShoppingBag,
  Fuel,
  Heart,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const COINS = [
  {
    id: "sky4444",
    name: "SKY4444",
    symbol: "SKY",
    balance: 44444,
    emoji: "⚡",
    color: "text-yellow-400",
  },
  {
    id: "trump",
    name: "TRUMP",
    symbol: "TRUMP",
    balance: 10000,
    emoji: "🇺🇸",
    color: "text-red-400",
  },
  {
    id: "btc",
    name: "Bitcoin",
    symbol: "BTC",
    balance: 0.0244,
    emoji: "₿",
    color: "text-orange-400",
  },
  {
    id: "doge",
    name: "Dogecoin",
    symbol: "DOGE",
    balance: 15000,
    emoji: "🐕",
    color: "text-yellow-300",
  },
  {
    id: "usdt",
    name: "USDT",
    symbol: "USDT",
    balance: 2500,
    emoji: "💵",
    color: "text-green-400",
  },
];

const RECENT_TX = [
  {
    type: "sent",
    name: "Coffee Shop",
    amount: "44 SKY",
    time: "2 min ago",
    emoji: "☕",
    status: "confirmed",
  },
  {
    type: "received",
    name: "Freelance Payment",
    amount: "500 SKY",
    time: "1 hr ago",
    emoji: "💼",
    status: "confirmed",
  },
  {
    type: "sent",
    name: "Restaurant",
    amount: "0.001 BTC",
    time: "3 hr ago",
    emoji: "🍕",
    status: "confirmed",
  },
  {
    type: "sent",
    name: "Gas Station",
    amount: "100 DOGE",
    time: "Yesterday",
    emoji: "⛽",
    status: "confirmed",
  },
  {
    type: "received",
    name: "DAO Reward",
    amount: "444 SKY",
    time: "2 days ago",
    emoji: "🏛️",
    status: "confirmed",
  },
];

const NEARBY_MERCHANTS = [
  {
    name: "ShadowCafe",
    category: "Coffee",
    emoji: "☕",
    distance: "0.1 mi",
    accepts: ["SKY4444", "TRUMP", "BTC"],
  },
  {
    name: "CryptoEats",
    category: "Restaurant",
    emoji: "🍔",
    distance: "0.3 mi",
    accepts: ["SKY4444", "DOGE", "USDT"],
  },
  {
    name: "TechStore Pro",
    category: "Electronics",
    emoji: "💻",
    distance: "0.5 mi",
    accepts: ["BTC", "SKY4444"],
  },
  {
    name: "SkyBlue IT",
    category: "IT Services",
    emoji: "🖥️",
    distance: "1.2 mi",
    accepts: ["SKY4444", "TRUMP", "BTC", "USDT"],
  },
  {
    name: "FuelUp Station",
    category: "Gas",
    emoji: "⛽",
    distance: "0.8 mi",
    accepts: ["DOGE", "SKY4444"],
  },
];

export default function QRPay() {
  const [tab, setTab] = useState<"pay" | "receive" | "history" | "nearby">(
    "pay"
  );
  const [selectedCoin, setSelectedCoin] = useState(COINS[0]);
  const [amount, setAmount] = useState("");
  const [copied, setCopied] = useState(false);
  const [scanning, setScanning] = useState(false);

  const myAddress = "sky1...4444xQRpay";

  const copyAddress = () => {
    setCopied(true);
    toast.success("Address copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const simulateScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      toast.success("✅ QR scanned — ShadowCafe: 44 SKY4444 payment ready");
      setAmount("44");
    }, 2000);
  };

  const sendPayment = () => {
    if (!amount) {
      toast.error("Enter an amount");
      return;
    }
    toast.success(
      `✅ Sent ${amount} ${selectedCoin.symbol} — Transaction confirmed in 2s!`
    );
    setAmount("");
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <QrCode className="h-6 w-6 text-green-400" />
            ShadowPay QR
          </h1>
          <p className="text-sm text-muted-foreground">
            Pay anywhere with crypto — instant, borderless, free
          </p>
        </div>
        <Badge className="bg-green-500/10 text-green-400 border-green-500/20 font-bold">
          ⚡ Instant
        </Badge>
      </div>

      {/* Balance Strip */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {COINS.map(coin => (
          <button
            key={coin.id}
            onClick={() => setSelectedCoin(coin)}
            className={`shrink-0 px-3 py-2 rounded-xl border text-left transition-all ${selectedCoin.id === coin.id ? "border-yellow-500/50 bg-yellow-900/10" : "border-border/50 bg-muted/20"}`}
          >
            <p className="text-sm">{coin.emoji}</p>
            <p className={`font-black text-xs ${coin.color}`}>
              {typeof coin.balance === "number" && coin.balance > 100
                ? coin.balance.toLocaleString()
                : coin.balance}
            </p>
            <p className="text-xs text-muted-foreground">{coin.symbol}</p>
          </button>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["pay", "receive", "history", "nearby"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-green-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "pay" && (
        <div className="space-y-4">
          {/* Scanner */}
          <Card
            className={`border-green-500/20 bg-green-900/10 cursor-pointer ${scanning ? "animate-pulse" : ""}`}
            onClick={simulateScan}
          >
            <CardContent className="py-8 text-center">
              <AnimatePresence>
                {scanning ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-3"
                  >
                    <Scan className="h-16 w-16 text-green-400 mx-auto animate-spin" />
                    <p className="font-bold text-green-400">
                      Scanning QR Code...
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-3"
                  >
                    <QrCode className="h-16 w-16 text-green-400 mx-auto" />
                    <p className="font-bold text-sm">Tap to Scan QR Code</p>
                    <p className="text-xs text-muted-foreground">
                      Point camera at merchant QR code to pay
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>

          {/* Manual Pay */}
          <Card className="border-border/50">
            <CardContent className="py-4 px-4 space-y-3">
              <p className="font-bold text-sm">Manual Payment</p>
              <div className="flex gap-2">
                <Input
                  placeholder="Recipient address or @username"
                  className="flex-1 h-9 text-xs"
                />
              </div>
              <div className="flex gap-2">
                <Input
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  placeholder="Amount"
                  className="flex-1 h-9 text-xs"
                  type="number"
                />
                <Badge
                  className={`px-3 flex items-center gap-1 cursor-pointer ${selectedCoin.color} bg-muted border-border/50`}
                >
                  {selectedCoin.emoji} {selectedCoin.symbol}
                </Badge>
              </div>
              <div className="flex gap-2">
                {["10", "44", "100", "444", "1000"].map(v => (
                  <button
                    key={v}
                    onClick={() => setAmount(v)}
                    className="px-3 py-1 rounded-lg bg-muted text-xs font-medium hover:bg-muted/80 transition-colors"
                  >
                    {v}
                  </button>
                ))}
              </div>
              <Button
                className="w-full h-10 bg-green-600 text-white border-0 font-bold"
                onClick={sendPayment}
              >
                <Send className="h-4 w-4 mr-2" />
                Send {amount || "0"} {selectedCoin.symbol}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "receive" && (
        <div className="space-y-4">
          <Card className="border-yellow-500/20 bg-yellow-900/10">
            <CardContent className="py-6 text-center">
              {/* Simulated QR Code */}
              <div className="h-48 w-48 mx-auto rounded-2xl bg-white p-3 mb-4 flex items-center justify-center">
                <div className="grid grid-cols-7 gap-0.5 w-full h-full">
                  {Array.from({ length: 49 }).map((_, i) => (
                    <div
                      key={i}
                      className={`rounded-sm ${Math.random() > 0.5 ? "bg-black" : "bg-white"}`}
                    />
                  ))}
                </div>
              </div>
              <p className="font-black text-sm mb-1">
                {selectedCoin.emoji} Receive {selectedCoin.symbol}
              </p>
              <p className="text-xs text-muted-foreground font-mono mb-3 break-all">
                {myAddress}
              </p>
              <div className="flex gap-2 justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs gap-1.5"
                  onClick={copyAddress}
                >
                  {copied ? (
                    <CheckCircle className="h-3.5 w-3.5 text-green-400" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                  {copied ? "Copied!" : "Copy Address"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs gap-1.5"
                  onClick={() => toast.info("QR code saved to gallery!")}
                >
                  <Download className="h-3.5 w-3.5" />
                  Save QR
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="py-3 px-4">
              <p className="font-bold text-sm mb-2">Request Specific Amount</p>
              <div className="flex gap-2">
                <Input
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  placeholder="Amount to request"
                  className="flex-1 h-9 text-xs"
                  type="number"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 text-xs"
                  onClick={() =>
                    toast.info(
                      `QR updated for ${amount} ${selectedCoin.symbol}`
                    )
                  }
                >
                  Generate
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "history" && (
        <div className="space-y-2">
          <p className="text-xs font-bold text-muted-foreground">
            RECENT TRANSACTIONS
          </p>
          {RECENT_TX.map((tx, i) => (
            <Card key={i} className="border-border/50">
              <CardContent className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-9 w-9 rounded-full flex items-center justify-center text-lg ${tx.type === "sent" ? "bg-red-500/10" : "bg-green-500/10"}`}
                  >
                    {tx.emoji}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{tx.name}</p>
                    <p className="text-xs text-muted-foreground">{tx.time}</p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-black text-sm ${tx.type === "sent" ? "text-red-400" : "text-green-400"}`}
                    >
                      {tx.type === "sent" ? "-" : "+"}
                      {tx.amount}
                    </p>
                    <Badge className="text-xs bg-green-500/10 text-green-400 border-green-500/20">
                      ✓ {tx.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "nearby" && (
        <div className="space-y-3">
          <p className="text-xs font-bold text-muted-foreground">
            NEARBY MERCHANTS ACCEPTING CRYPTO
          </p>
          {NEARBY_MERCHANTS.map((merchant, i) => (
            <Card
              key={i}
              className="border-border/50 cursor-pointer hover:border-green-500/20 transition-all"
              onClick={() =>
                toast.info(
                  `Paying ${merchant.name} with ${selectedCoin.symbol}...`
                )
              }
            >
              <CardContent className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{merchant.emoji}</span>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{merchant.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {merchant.category} · {merchant.distance}
                    </p>
                    <div className="flex gap-1 mt-1">
                      {merchant.accepts.map(coin => (
                        <Badge
                          key={coin}
                          className="text-xs bg-muted text-muted-foreground"
                        >
                          {coin}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="h-8 text-xs bg-green-600 text-white border-0"
                    onClick={e => {
                      e.stopPropagation();
                      toast.success(`Opening payment to ${merchant.name}...`);
                    }}
                  >
                    Pay
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
