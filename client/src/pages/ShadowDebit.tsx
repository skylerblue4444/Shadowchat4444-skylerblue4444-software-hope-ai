import { useState } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  DollarSign,
  ShoppingBag,
  Zap,
  Lock,
  TrendingUp,
  Gift,
  Shield,
  Eye,
  EyeOff,
  Plus,
  RefreshCw,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const CARDS = [
  {
    id: 1,
    name: "ShadowBlack",
    tier: "Black",
    balance: "$4,280.00",
    number: "**** **** **** 4242",
    expiry: "12/28",
    cvv: "***",
    color: "from-gray-900 to-gray-700",
    cashback: "3%",
    limit: "$50,000",
    status: "active",
  },
  {
    id: 2,
    name: "ShadowGold",
    tier: "Gold",
    balance: "$1,840.50",
    number: "**** **** **** 8888",
    expiry: "08/27",
    cvv: "***",
    color: "from-yellow-700 to-yellow-500",
    cashback: "2%",
    limit: "$25,000",
    status: "active",
  },
  {
    id: 3,
    name: "ShadowVirtual",
    tier: "Virtual",
    balance: "$420.00",
    number: "**** **** **** 1337",
    expiry: "03/26",
    cvv: "***",
    color: "from-cyan-700 to-blue-600",
    cashback: "1%",
    limit: "$5,000",
    status: "active",
  },
];

const TRANSACTIONS = [
  {
    merchant: "Amazon",
    amount: "-$84.99",
    date: "Today 14:22",
    category: "Shopping",
    cashback: "+$2.55",
  },
  {
    merchant: "Starbucks",
    amount: "-$6.40",
    date: "Today 09:15",
    category: "Food",
    cashback: "+$0.19",
  },
  {
    merchant: "SKY4444 Stake",
    amount: "+$42.00",
    date: "Yesterday",
    category: "Crypto",
    cashback: "—",
  },
  {
    merchant: "Netflix",
    amount: "-$15.99",
    date: "May 12",
    category: "Streaming",
    cashback: "+$0.48",
  },
  {
    merchant: "Uber",
    amount: "-$12.50",
    date: "May 11",
    category: "Transport",
    cashback: "+$0.38",
  },
  {
    merchant: "Coinbase",
    amount: "+$500.00",
    date: "May 10",
    category: "Crypto",
    cashback: "—",
  },
];

const REWARDS = [
  {
    name: "5% Back on Crypto",
    earned: "842 pts",
    value: "$8.42",
    icon: TrendingUp,
    color: "text-yellow-400",
  },
  {
    name: "2% Back on Shopping",
    earned: "420 pts",
    value: "$4.20",
    icon: ShoppingBag,
    color: "text-blue-400",
  },
  {
    name: "Travel Miles",
    earned: "1,240 mi",
    value: "$12.40",
    icon: Zap,
    color: "text-green-400",
  },
  {
    name: "Referral Bonus",
    earned: "500 pts",
    value: "$5.00",
    icon: Gift,
    color: "text-pink-400",
  },
];

export default function ShadowDebit() {
  const [selectedCard, setSelectedCard] = useState(0);
  const [showCVV, setShowCVV] = useState(false);
  const [tab, setTab] = useState<
    "cards" | "transactions" | "rewards" | "controls"
  >("cards");
  const card = CARDS[selectedCard];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <CreditCard className="h-6 w-6 text-blue-400" />
            ShadowDebit
          </h1>
          <p className="text-sm text-muted-foreground">
            Crypto-powered debit cards — spend SKY4444 and earn rewards
            everywhere
          </p>
        </div>
        <Button
          size="sm"
          className="h-8 bg-blue-600 text-white border-0 font-bold text-xs"
          onClick={() => toast.success("New card application started!")}
        >
          <Plus className="h-3.5 w-3.5 mr-1" />
          Apply for Card
        </Button>
      </div>

      {/* Card Selector */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {CARDS.map((c, i) => (
          <motion.button
            key={c.id}
            onClick={() => setSelectedCard(i)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`shrink-0 w-64 h-36 rounded-2xl bg-gradient-to-br ${c.color} p-4 text-white relative overflow-hidden transition-all ${selectedCard === i ? "ring-2 ring-white/40" : "opacity-70"}`}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-8 translate-x-8" />
            <div className="flex justify-between items-start">
              <p className="font-black text-sm">{c.name}</p>
              <Badge className="bg-white/20 text-white border-0 text-xs">
                {c.tier}
              </Badge>
            </div>
            <p className="font-black text-xl mt-4">{c.balance}</p>
            <p className="text-xs text-white/70 mt-1">{c.number}</p>
          </motion.button>
        ))}
      </div>

      {/* Card Details */}
      <Card className="border-blue-500/20 bg-blue-900/5">
        <CardContent className="py-4 px-4">
          <div className="grid grid-cols-4 gap-3 text-center">
            <div>
              <p className="text-xs text-muted-foreground">Balance</p>
              <p className="font-black text-sm text-blue-400">{card.balance}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Expiry</p>
              <p className="font-black text-sm">{card.expiry}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">CVV</p>
              <div className="flex items-center justify-center gap-1">
                <p className="font-black text-sm">{showCVV ? "847" : "***"}</p>
                <button onClick={() => setShowCVV(!showCVV)}>
                  {showCVV ? (
                    <EyeOff className="h-3.5 w-3.5 text-muted-foreground" />
                  ) : (
                    <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Cashback</p>
              <p className="font-black text-sm text-green-400">
                {card.cashback}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {(
          [
            ["cards", "💳 Overview"],
            ["transactions", "📋 Transactions"],
            ["rewards", "🎁 Rewards"],
            ["controls", "🔒 Controls"],
          ] as const
        ).map(([t, label]) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${tab === t ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Overview */}
      {tab === "cards" && (
        <div className="grid grid-cols-2 gap-3">
          {[
            {
              label: "Total Spent (MTD)",
              value: "$1,284.50",
              color: "text-red-400",
            },
            {
              label: "Total Earned (MTD)",
              value: "$542.00",
              color: "text-green-400",
            },
            {
              label: "Cashback Earned",
              value: "$38.52",
              color: "text-yellow-400",
            },
            {
              label: "Credit Limit",
              value: card.limit,
              color: "text-blue-400",
            },
          ].map(s => (
            <Card key={s.label} className="border-border/50">
              <CardContent className="py-4 px-4 text-center">
                <p className={`font-black text-xl ${s.color}`}>{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Transactions */}
      {tab === "transactions" && (
        <div className="space-y-2">
          {TRANSACTIONS.map((tx, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Card className="border-border/50 hover:border-blue-500/20 transition-all">
                <CardContent className="py-3 px-4 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-muted flex items-center justify-center shrink-0">
                    <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{tx.merchant}</p>
                    <p className="text-xs text-muted-foreground">
                      {tx.date} · {tx.category}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p
                      className={`font-black text-sm ${tx.amount.startsWith("+") ? "text-green-400" : "text-foreground"}`}
                    >
                      {tx.amount}
                    </p>
                    {tx.cashback !== "—" && (
                      <p className="text-xs text-yellow-400">{tx.cashback}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Rewards */}
      {tab === "rewards" && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {REWARDS.map((r, i) => {
              const Icon = r.icon;
              return (
                <Card key={r.name} className="border-border/50">
                  <CardContent className="py-4 px-4">
                    <Icon className={`h-5 w-5 ${r.color} mb-2`} />
                    <p className="font-bold text-sm">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.earned}</p>
                    <p className={`font-black text-sm ${r.color} mt-1`}>
                      {r.value}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <Button
            className="w-full h-10 bg-yellow-600 text-white border-0 font-bold text-sm"
            onClick={() => toast.success("Rewards redeemed as SKY4444!")}
          >
            <Gift className="h-4 w-4 mr-2" />
            Redeem All Rewards
          </Button>
        </div>
      )}

      {/* Controls */}
      {tab === "controls" && (
        <div className="space-y-3">
          {[
            {
              label: "Online Purchases",
              desc: "Allow card for online transactions",
              enabled: true,
            },
            {
              label: "International Use",
              desc: "Allow transactions outside US",
              enabled: false,
            },
            {
              label: "Contactless Pay",
              desc: "NFC tap-to-pay enabled",
              enabled: true,
            },
            {
              label: "ATM Withdrawals",
              desc: "Allow cash withdrawals",
              enabled: true,
            },
            {
              label: "Crypto Auto-Convert",
              desc: "Auto-convert SKY4444 to USD on spend",
              enabled: true,
            },
            {
              label: "Spending Alerts",
              desc: "Push notification on every charge",
              enabled: true,
            },
          ].map((ctrl, i) => {
            const [on, setOn] = useState(ctrl.enabled);
            return (
              <Card key={ctrl.label} className="border-border/50">
                <CardContent className="py-3 px-4 flex items-center gap-3">
                  <Lock className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div className="flex-1">
                    <p className="font-bold text-sm">{ctrl.label}</p>
                    <p className="text-xs text-muted-foreground">{ctrl.desc}</p>
                  </div>
                  <button
                    onClick={() => {
                      setOn(!on);
                      toast.success(
                        `${ctrl.label} ${!on ? "enabled" : "disabled"}`
                      );
                    }}
                    className={`w-11 h-6 rounded-full transition-colors relative ${on ? "bg-blue-600" : "bg-muted"}`}
                  >
                    <div
                      className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${on ? "left-5.5" : "left-0.5"}`}
                      style={{ left: on ? "calc(100% - 22px)" : "2px" }}
                    />
                  </button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
