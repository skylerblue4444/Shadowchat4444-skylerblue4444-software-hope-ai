import { useState } from "react";
import { motion } from "framer-motion";
import {
  PiggyBank,
  TrendingUp,
  Target,
  Calendar,
  Zap,
  DollarSign,
  Lock,
  Unlock,
  Plus,
  Calculator,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const ACCOUNTS = [
  {
    name: "SKY4444 Flex",
    apy: "14.5%",
    balance: "$2,840.00",
    earned: "$184.20",
    locked: false,
    term: "Flexible",
    icon: "🌤️",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    name: "BTC Vault",
    apy: "8.2%",
    balance: "$8,420.00",
    earned: "$420.80",
    locked: true,
    term: "90 days",
    icon: "₿",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
  {
    name: "USDT Stable",
    apy: "12.0%",
    balance: "$5,000.00",
    earned: "$240.00",
    locked: false,
    term: "Flexible",
    icon: "💵",
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
  {
    name: "ETH Growth",
    apy: "10.8%",
    balance: "$3,200.00",
    earned: "$172.80",
    locked: true,
    term: "180 days",
    icon: "Ξ",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
];

const GOALS = [
  {
    name: "Emergency Fund",
    target: "$10,000",
    current: "$6,840",
    pct: 68.4,
    deadline: "Dec 2026",
    icon: "🛡️",
  },
  {
    name: "New MacBook Pro",
    target: "$3,500",
    current: "$2,100",
    pct: 60.0,
    deadline: "Aug 2026",
    icon: "💻",
  },
  {
    name: "BTC 1.0",
    target: "$95,000",
    current: "$8,420",
    pct: 8.9,
    deadline: "Dec 2027",
    icon: "₿",
  },
  {
    name: "Vacation Fund",
    target: "$5,000",
    current: "$4,200",
    pct: 84.0,
    deadline: "Jun 2026",
    icon: "✈️",
  },
];

export default function ShadowSavings() {
  const [tab, setTab] = useState<
    "accounts" | "goals" | "calculator" | "history"
  >("accounts");
  const [principal, setPrincipal] = useState("10000");
  const [apy, setApy] = useState("14.5");
  const [years, setYears] = useState("3");

  const compound = () => {
    const p = parseFloat(principal) || 0;
    const r = parseFloat(apy) / 100;
    const t = parseFloat(years);
    const result = p * Math.pow(1 + r / 12, 12 * t);
    return { final: result.toFixed(2), interest: (result - p).toFixed(2) };
  };
  const calc = compound();

  const totalBalance = ACCOUNTS.reduce(
    (s, a) => s + parseFloat(a.balance.replace(/[$,]/g, "")),
    0
  );
  const totalEarned = ACCOUNTS.reduce(
    (s, a) => s + parseFloat(a.earned.replace(/[$,]/g, "")),
    0
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <PiggyBank className="h-6 w-6 text-green-400" />
            ShadowSavings
          </h1>
          <p className="text-sm text-muted-foreground">
            High-yield crypto savings — earn up to 14.5% APY with
            auto-compounding
          </p>
        </div>
        <Button
          size="sm"
          className="h-8 bg-green-600 text-white border-0 font-bold text-xs"
          onClick={() => toast.success("New savings account created!")}
        >
          <Plus className="h-3.5 w-3.5 mr-1" />
          Open Account
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        {[
          {
            label: "Total Savings",
            value: `$${totalBalance.toLocaleString()}`,
            color: "text-green-400",
          },
          {
            label: "Total Earned",
            value: `$${totalEarned.toFixed(2)}`,
            color: "text-yellow-400",
          },
          { label: "Avg APY", value: "11.4%", color: "text-cyan-400" },
          { label: "Accounts", value: "4", color: "text-blue-400" },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="py-3 px-2">
              <p className={`font-black text-lg ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {(
          [
            ["accounts", "💰 Accounts"],
            ["goals", "🎯 Goals"],
            ["calculator", "🧮 Calculator"],
            ["history", "📋 History"],
          ] as const
        ).map(([t, label]) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${tab === t ? "bg-green-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Accounts */}
      {tab === "accounts" && (
        <div className="space-y-3">
          {ACCOUNTS.map((acc, i) => (
            <motion.div
              key={acc.name}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card className="border-border/50 hover:border-green-500/20 transition-all">
                <CardContent className="py-4 px-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`h-10 w-10 rounded-xl ${acc.bg} flex items-center justify-center shrink-0 text-lg`}
                    >
                      {acc.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-black text-sm">{acc.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Badge className="text-xs bg-green-500/10 text-green-400 border-0">
                          {acc.apy} APY
                        </Badge>
                        <Badge
                          className={`text-xs border-0 ${acc.locked ? "bg-orange-500/10 text-orange-400" : "bg-muted text-muted-foreground"}`}
                        >
                          {acc.locked ? (
                            <>
                              <Lock className="h-2.5 w-2.5 inline mr-0.5" />
                              {acc.term}
                            </>
                          ) : (
                            <>
                              <Unlock className="h-2.5 w-2.5 inline mr-0.5" />
                              {acc.term}
                            </>
                          )}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-black text-sm">{acc.balance}</p>
                      <p className="text-xs text-green-400">
                        +{acc.earned} earned
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 h-8 text-xs bg-green-600 text-white border-0 font-bold"
                      onClick={() => toast.success(`Deposited to ${acc.name}`)}
                    >
                      Deposit
                    </Button>
                    {!acc.locked && (
                      <Button
                        size="sm"
                        className="flex-1 h-8 text-xs bg-muted text-muted-foreground border-0 font-bold"
                        onClick={() =>
                          toast.success(`Withdrawn from ${acc.name}`)
                        }
                      >
                        Withdraw
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Goals */}
      {tab === "goals" && (
        <div className="space-y-3">
          {GOALS.map((goal, i) => (
            <motion.div
              key={goal.name}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card className="border-border/50 hover:border-green-500/20 transition-all">
                <CardContent className="py-4 px-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{goal.icon}</span>
                    <div className="flex-1">
                      <p className="font-black text-sm">{goal.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Target: {goal.target} · Deadline: {goal.deadline}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-black text-sm text-green-400">
                        {goal.current}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {goal.pct.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-green-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${goal.pct}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                      />
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="w-full h-8 text-xs bg-green-600 text-white border-0 font-bold"
                    onClick={() => toast.success(`Added to ${goal.name}`)}
                  >
                    <Plus className="h-3.5 w-3.5 mr-1" />
                    Add Funds
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          <Button
            className="w-full h-10 bg-muted text-muted-foreground border-0 font-bold text-sm"
            onClick={() => toast.info("Create new savings goal!")}
          >
            <Target className="h-4 w-4 mr-2" />
            Create New Goal
          </Button>
        </div>
      )}

      {/* Calculator */}
      {tab === "calculator" && (
        <Card className="border-green-500/20 bg-green-900/5">
          <CardContent className="py-5 px-5 space-y-4">
            <p className="font-bold text-sm flex items-center gap-2">
              <Calculator className="h-4 w-4 text-green-400" />
              Compound Interest Calculator
            </p>
            <div className="space-y-3">
              {[
                {
                  label: "Principal ($)",
                  value: principal,
                  setter: setPrincipal,
                  placeholder: "10000",
                },
                {
                  label: "APY (%)",
                  value: apy,
                  setter: setApy,
                  placeholder: "14.5",
                },
                {
                  label: "Years",
                  value: years,
                  setter: setYears,
                  placeholder: "3",
                },
              ].map(f => (
                <div key={f.label} className="space-y-1.5">
                  <label className="text-xs text-muted-foreground">
                    {f.label}
                  </label>
                  <input
                    value={f.value}
                    onChange={e => f.setter(e.target.value)}
                    type="number"
                    placeholder={f.placeholder}
                    className="w-full h-10 px-4 rounded-xl bg-muted text-sm border border-border/50 focus:outline-none focus:border-green-500/40"
                  />
                </div>
              ))}
            </div>
            <div className="bg-muted rounded-xl p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Final Balance</span>
                <span className="font-black text-green-400">
                  ${parseFloat(calc.final).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Interest Earned</span>
                <span className="font-black text-yellow-400">
                  ${parseFloat(calc.interest).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Return</span>
                <span className="font-black text-cyan-400">
                  {(
                    (parseFloat(calc.interest) / parseFloat(principal || "1")) *
                    100
                  ).toFixed(1)}
                  %
                </span>
              </div>
            </div>
            <Button
              className="w-full h-10 bg-green-600 text-white border-0 font-bold text-sm"
              onClick={() =>
                toast.success("Opening account with these settings!")
              }
            >
              <Zap className="h-4 w-4 mr-2" />
              Open Account with These Settings
            </Button>
          </CardContent>
        </Card>
      )}

      {/* History */}
      {tab === "history" && (
        <div className="space-y-2">
          {[
            {
              type: "Deposit",
              account: "SKY4444 Flex",
              amount: "+$500.00",
              date: "Today",
              icon: "⬇️",
            },
            {
              type: "Interest",
              account: "BTC Vault",
              amount: "+$42.08",
              date: "Yesterday",
              icon: "💰",
            },
            {
              type: "Interest",
              account: "USDT Stable",
              amount: "+$24.00",
              date: "May 12",
              icon: "💰",
            },
            {
              type: "Deposit",
              account: "ETH Growth",
              amount: "+$1,000.00",
              date: "May 10",
              icon: "⬇️",
            },
            {
              type: "Withdraw",
              account: "SKY4444 Flex",
              amount: "-$200.00",
              date: "May 8",
              icon: "⬆️",
            },
          ].map((tx, i) => (
            <Card key={i} className="border-border/50">
              <CardContent className="py-3 px-4 flex items-center gap-3">
                <span className="text-lg">{tx.icon}</span>
                <div className="flex-1">
                  <p className="font-bold text-sm">{tx.type}</p>
                  <p className="text-xs text-muted-foreground">
                    {tx.account} · {tx.date}
                  </p>
                </div>
                <p
                  className={`font-black text-sm ${tx.amount.startsWith("+") ? "text-green-400" : "text-red-400"}`}
                >
                  {tx.amount}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
