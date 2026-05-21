import { useState } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  Zap,
  Shield,
  TrendingUp,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Settings,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const CARDS = [
  {
    id: 1,
    name: "ShadowCard Black",
    tier: "Black",
    number: "**** **** **** 4444",
    expiry: "12/28",
    balance: "$44,440",
    cashback: "5%",
    color1: "#1a1a2e",
    color2: "#16213e",
    textColor: "#a855f7",
    active: true,
  },
  {
    id: 2,
    name: "ShadowCard Gold",
    tier: "Gold",
    number: "**** **** **** 8888",
    expiry: "06/27",
    balance: "$8,888",
    cashback: "3%",
    color1: "#78350f",
    color2: "#451a03",
    textColor: "#fbbf24",
    active: true,
  },
  {
    id: 3,
    name: "ShadowCard Blue",
    tier: "Blue",
    number: "**** **** **** 1234",
    expiry: "03/26",
    balance: "$1,234",
    cashback: "1%",
    color1: "#1e3a5f",
    color2: "#1e3a8a",
    textColor: "#60a5fa",
    active: false,
  },
];

const TRANSACTIONS = [
  {
    id: 1,
    merchant: "Amazon",
    category: "Shopping",
    amount: "-$444.00",
    cashback: "+$22.20",
    date: "Today",
    icon: "🛒",
    type: "debit",
  },
  {
    id: 2,
    merchant: "SKY4444 Staking",
    category: "Crypto",
    amount: "+$1,444.00",
    cashback: "+$72.20",
    date: "Yesterday",
    icon: "🌌",
    type: "credit",
  },
  {
    id: 3,
    merchant: "Whole Foods",
    category: "Groceries",
    amount: "-$88.44",
    cashback: "+$4.42",
    date: "May 13",
    icon: "🛒",
    type: "debit",
  },
  {
    id: 4,
    merchant: "Netflix",
    category: "Entertainment",
    amount: "-$15.99",
    cashback: "+$0.80",
    date: "May 12",
    icon: "🎬",
    type: "debit",
  },
  {
    id: 5,
    merchant: "Skyler Blue IT",
    category: "Business",
    amount: "+$4,444.00",
    cashback: "+$222.20",
    date: "May 10",
    icon: "💼",
    type: "credit",
  },
];

const REWARDS = [
  {
    name: "SKY4444 Cashback",
    earned: "44,444 SKY",
    value: "$1,955",
    icon: "🌌",
  },
  { name: "TRUMP Rewards", earned: "444 TRUMP", value: "$19,754", icon: "🇺🇸" },
  { name: "BTC Sats", earned: "44,444 sats", value: "$39.60", icon: "₿" },
];

export default function ShadowCryptoCards() {
  const [selectedCard, setSelectedCard] = useState(0);
  const [showNumber, setShowNumber] = useState(false);
  const [tab, setTab] = useState<"cards" | "transactions" | "rewards">("cards");
  const card = CARDS[selectedCard];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <CreditCard className="h-6 w-6 text-blue-400" />
            Crypto Cards
          </h1>
          <p className="text-sm text-muted-foreground">
            Virtual and physical crypto debit cards with SKY4444 rewards
          </p>
        </div>
        <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 font-bold">
          Visa Network
        </Badge>
      </div>

      {/* Card Carousel */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {CARDS.map((c, i) => (
          <motion.div
            key={c.id}
            className={`shrink-0 w-64 h-40 rounded-2xl p-4 cursor-pointer relative overflow-hidden transition-all ${selectedCard === i ? "ring-2 ring-blue-400" : ""}`}
            style={{
              background: `linear-gradient(135deg, ${c.color1}, ${c.color2})`,
            }}
            onClick={() => setSelectedCard(i)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs font-bold" style={{ color: c.textColor }}>
                  SHADOWCHAT
                </p>
                <p className="text-xs text-white/60">{c.name}</p>
              </div>
              <Badge
                className="text-xs"
                style={{
                  backgroundColor: c.textColor + "20",
                  color: c.textColor,
                  borderColor: c.textColor + "40",
                }}
              >
                {c.tier}
              </Badge>
            </div>
            <p className="text-white font-mono text-sm mb-3">
              {showNumber && selectedCard === i
                ? "4444 8888 1234 4444"
                : c.number}
            </p>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs text-white/60">Balance</p>
                <p className="font-black text-white">{c.balance}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-white/60">Cashback</p>
                <p className="font-bold" style={{ color: c.textColor }}>
                  {c.cashback}
                </p>
              </div>
            </div>
            {!c.active && (
              <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center">
                <Badge className="bg-red-500/80 text-white border-0">
                  Frozen
                </Badge>
              </div>
            )}
          </motion.div>
        ))}
        <div
          className="shrink-0 w-64 h-40 rounded-2xl border-2 border-dashed border-border flex items-center justify-center cursor-pointer"
          onClick={() => toast.success("Opening card application...")}
        >
          <div className="text-center">
            <Plus className="h-8 w-8 text-muted-foreground mx-auto mb-1" />
            <p className="text-xs text-muted-foreground font-bold">
              Add New Card
            </p>
          </div>
        </div>
      </div>

      {/* Card Controls */}
      <div className="grid grid-cols-4 gap-2">
        {[
          {
            label: "Show",
            icon: showNumber ? EyeOff : Eye,
            action: () => setShowNumber(!showNumber),
          },
          {
            label: card.active ? "Freeze" : "Unfreeze",
            icon: card.active ? Lock : Unlock,
            action: () =>
              toast.success(`Card ${card.active ? "frozen" : "unfrozen"}!`),
          },
          {
            label: "Send",
            icon: ArrowUpRight,
            action: () => toast.success("Opening send flow..."),
          },
          {
            label: "Settings",
            icon: Settings,
            action: () => toast.success("Opening card settings..."),
          },
        ].map(btn => (
          <Button
            key={btn.label}
            variant="outline"
            className="h-14 flex-col gap-1 text-xs font-bold"
            onClick={btn.action}
          >
            <btn.icon className="h-5 w-5" />
            {btn.label}
          </Button>
        ))}
      </div>

      <div className="flex gap-2">
        {(["cards", "transactions", "rewards"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "cards" && (
        <div className="space-y-2">
          <div className="grid grid-cols-3 gap-2">
            {[
              {
                label: "Total Spent",
                value: "$12,444",
                icon: ArrowUpRight,
                color: "text-red-400",
              },
              {
                label: "Total Earned",
                value: "$5,888",
                icon: ArrowDownLeft,
                color: "text-green-400",
              },
              {
                label: "Total Cashback",
                value: "$622",
                icon: Zap,
                color: "text-yellow-400",
              },
            ].map(s => (
              <Card key={s.label} className="border-border/50 text-center">
                <CardContent className="py-2.5 px-2">
                  <s.icon className={`h-5 w-5 mx-auto mb-1 ${s.color}`} />
                  <p className={`font-black text-sm ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="border-blue-500/20 bg-blue-900/5">
            <CardContent className="py-3 px-4">
              <p className="font-bold text-sm mb-2">
                Card Benefits — {card.tier}
              </p>
              {[
                `${card.cashback} cashback on all purchases`,
                "Free ATM withdrawals worldwide",
                "No foreign transaction fees",
                "SKY4444 rewards on every swipe",
                "Instant virtual card for online use",
              ].map(b => (
                <div key={b} className="flex items-center gap-2 py-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-400 shrink-0" />
                  <p className="text-xs text-muted-foreground">{b}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "transactions" && (
        <div className="space-y-2">
          {TRANSACTIONS.map((tx, i) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card className="border-border/50">
                <CardContent className="py-2.5 px-4 flex items-center gap-3">
                  <span className="text-xl shrink-0">{tx.icon}</span>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{tx.merchant}</p>
                    <p className="text-xs text-muted-foreground">
                      {tx.category} · {tx.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-black text-sm ${tx.type === "credit" ? "text-green-400" : ""}`}
                    >
                      {tx.amount}
                    </p>
                    <p className="text-xs text-yellow-400 font-bold">
                      {tx.cashback}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "rewards" && (
        <div className="space-y-3">
          <p className="text-xs font-bold text-muted-foreground">
            TOTAL REWARDS EARNED
          </p>
          {REWARDS.map((r, i) => (
            <Card key={r.name} className="border-yellow-500/20 bg-yellow-900/5">
              <CardContent className="py-3 px-4 flex items-center gap-3">
                <span className="text-2xl">{r.icon}</span>
                <div className="flex-1">
                  <p className="font-bold text-sm">{r.name}</p>
                  <p className="text-xs text-yellow-400 font-bold">
                    {r.earned}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-black text-sm text-green-400">{r.value}</p>
                  <Button
                    size="sm"
                    className="h-6 text-xs px-2 mt-1 bg-yellow-600 text-white border-0 font-bold"
                    onClick={() => toast.success(`Redeeming ${r.name}...`)}
                  >
                    Redeem
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
