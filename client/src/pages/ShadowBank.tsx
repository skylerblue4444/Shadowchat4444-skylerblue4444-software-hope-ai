import { useState } from "react";
import { motion } from "framer-motion";
import {
  Landmark,
  CreditCard,
  TrendingUp,
  ArrowUpRight,
  ArrowDownLeft,
  Coins,
  Shield,
  Zap,
  Lock,
  PiggyBank,
  DollarSign,
  BarChart3,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const ACCOUNTS = [
  {
    name: "ShadowChecking",
    balance: "4,444.00",
    currency: "USDT",
    apy: "2.5%",
    type: "checking",
    emoji: "💳",
  },
  {
    name: "SKY4444 Savings",
    balance: "12,888.00",
    currency: "SKY4444",
    apy: "8.4%",
    type: "savings",
    emoji: "🏦",
  },
  {
    name: "TRUMP Vault",
    balance: "44,000.00",
    currency: "TRUMP",
    apy: "12.0%",
    type: "vault",
    emoji: "🔐",
  },
];

const TRANSACTIONS = [
  {
    desc: "CryptoBurger Co.",
    amount: "-12 SKY4444",
    type: "debit",
    date: "Today, 1:22 PM",
    emoji: "🍔",
  },
  {
    desc: "Staking Reward",
    amount: "+44 SKY4444",
    type: "credit",
    date: "Today, 12:00 PM",
    emoji: "⚡",
  },
  {
    desc: "ShadowRide",
    amount: "-8 SKY4444",
    type: "debit",
    date: "Yesterday",
    emoji: "🚗",
  },
  {
    desc: "Referral Bonus",
    amount: "+100 SKY4444",
    type: "credit",
    date: "May 13, 2026",
    emoji: "🎁",
  },
  {
    desc: "NFT Purchase",
    amount: "-250 SKY4444",
    type: "debit",
    date: "May 12, 2026",
    emoji: "🖼️",
  },
];

export default function ShadowBank() {
  const [tab, setTab] = useState<"accounts" | "transfer" | "cards" | "loans">(
    "accounts"
  );
  const [sendAmount, setSendAmount] = useState("");
  const [sendTo, setSendTo] = useState("");

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Landmark className="h-6 w-6 text-violet-400" />
            ShadowBank
          </h1>
          <p className="text-sm text-muted-foreground">
            Decentralized banking — earn, save, borrow, and spend
          </p>
        </div>
        <Badge className="bg-violet-500/10 text-violet-400 border-violet-500/20 font-bold">
          <Shield className="h-3 w-3 mr-1" />
          FDIC-Style
        </Badge>
      </div>

      {/* Total Balance */}
      <Card className="border-violet-500/20 bg-gradient-to-br from-violet-900/20 to-purple-900/10">
        <CardContent className="py-4 px-4">
          <p className="text-xs text-muted-foreground mb-1">
            Total Portfolio Value
          </p>
          <p className="text-3xl font-black text-violet-400">$88,244.00</p>
          <p className="text-xs text-green-400 font-bold mt-0.5">
            +$1,244.00 (1.4%) this month
          </p>
          <div className="flex gap-3 mt-3">
            <Button
              size="sm"
              className="flex-1 h-9 text-xs bg-violet-600 text-white border-0"
              onClick={() => setTab("transfer")}
            >
              <ArrowUpRight className="h-3.5 w-3.5 mr-1.5" />
              Send
            </Button>
            <Button
              size="sm"
              className="flex-1 h-9 text-xs bg-violet-600/20 text-violet-400 border-violet-500/20"
              onClick={() => toast.info("Opening receive QR code...")}
            >
              <ArrowDownLeft className="h-3.5 w-3.5 mr-1.5" />
              Receive
            </Button>
            <Button
              size="sm"
              className="flex-1 h-9 text-xs bg-violet-600/20 text-violet-400 border-violet-500/20"
              onClick={() => toast.info("Opening buy flow...")}
            >
              <DollarSign className="h-3.5 w-3.5 mr-1.5" />
              Buy
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        {(["accounts", "transfer", "cards", "loans"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-violet-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "accounts" && (
        <div className="space-y-3">
          {ACCOUNTS.map((acc, i) => (
            <motion.div
              key={acc.name}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card
                className="border-border/50 hover:border-violet-500/20 transition-all cursor-pointer"
                onClick={() => toast.info(`Opening ${acc.name}...`)}
              >
                <CardContent className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{acc.emoji}</span>
                    <div className="flex-1">
                      <p className="font-bold text-sm">{acc.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {acc.type} · {acc.apy} APY
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-sm text-violet-400">
                        {acc.balance}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {acc.currency}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          <p className="text-xs font-bold text-muted-foreground mt-2">
            RECENT TRANSACTIONS
          </p>
          {TRANSACTIONS.map((tx, i) => (
            <Card key={i} className="border-border/50">
              <CardContent className="py-2.5 px-4">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{tx.emoji}</span>
                  <div className="flex-1">
                    <p className="font-bold text-xs">{tx.desc}</p>
                    <p className="text-xs text-muted-foreground">{tx.date}</p>
                  </div>
                  <p
                    className={`font-black text-sm ${tx.type === "credit" ? "text-green-400" : "text-red-400"}`}
                  >
                    {tx.amount}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "transfer" && (
        <Card className="border-violet-500/20 bg-violet-900/5">
          <CardContent className="py-4 px-4 space-y-3">
            <p className="font-bold text-sm">Send Crypto</p>
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                Recipient (address or @username)
              </p>
              <Input
                value={sendTo}
                onChange={e => setSendTo(e.target.value)}
                placeholder="@shadowuser or 0x..."
                className="h-9 text-xs"
              />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                Amount (SKY4444)
              </p>
              <Input
                value={sendAmount}
                onChange={e => setSendAmount(e.target.value)}
                type="number"
                placeholder="0.00"
                className="h-9 text-xs"
              />
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {["10", "50", "100", "500"].map(amt => (
                <button
                  key={amt}
                  className="py-2 rounded-xl bg-muted text-xs font-bold hover:bg-muted/80 transition-colors"
                  onClick={() => setSendAmount(amt)}
                >
                  {amt}
                </button>
              ))}
            </div>
            <Button
              className="w-full h-10 text-xs bg-violet-600 text-white border-0 font-bold"
              onClick={() => {
                if (!sendTo || !sendAmount) {
                  toast.error("Please fill in all fields");
                  return;
                }
                toast.success(`✅ Sent ${sendAmount} SKY4444 to ${sendTo}!`);
                setSendTo("");
                setSendAmount("");
              }}
            >
              <Zap className="h-4 w-4 mr-2" />
              Send Instantly — 0 Fees
            </Button>
          </CardContent>
        </Card>
      )}

      {tab === "cards" && (
        <div className="space-y-3">
          <Card className="border-violet-500/20 bg-gradient-to-br from-violet-900/30 to-purple-900/20 overflow-hidden">
            <CardContent className="py-5 px-5">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-xs text-muted-foreground">ShadowCard</p>
                  <p className="font-black text-sm">Skyler Blue Spiller</p>
                </div>
                <p className="font-black text-violet-400">SHADOW</p>
              </div>
              <p className="font-mono text-sm tracking-widest mb-4">
                4444 •••• •••• 4444
              </p>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Exp: 05/30</span>
                <span>CVV: •••</span>
                <span>SKY4444 Rewards</span>
              </div>
            </CardContent>
          </Card>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Cashback Rate", value: "4.4%", emoji: "💰" },
              { label: "Monthly Limit", value: "44,444 SKY", emoji: "📊" },
              { label: "Rewards Earned", value: "1,244 SKY", emoji: "⭐" },
              { label: "Status", value: "Active", emoji: "✅" },
            ].map(s => (
              <Card key={s.label} className="border-border/50 text-center">
                <CardContent className="pt-2.5 pb-2.5">
                  <p className="text-lg">{s.emoji}</p>
                  <p className="font-black text-xs text-violet-400">
                    {s.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button
            className="w-full h-10 text-xs bg-violet-600 text-white border-0"
            onClick={() => toast.info("Opening virtual card details...")}
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Manage Card
          </Button>
        </div>
      )}

      {tab === "loans" && (
        <div className="space-y-3">
          <Card className="border-violet-500/20 bg-violet-900/5">
            <CardContent className="py-4 px-4">
              <p className="font-bold text-sm mb-3">Crypto-Backed Loans</p>
              <p className="text-xs text-muted-foreground mb-3">
                Use your SKY4444, BTC, or ETH as collateral. Get USDT instantly.
              </p>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {[
                  { label: "Interest Rate", value: "4.4% APR" },
                  { label: "Max LTV", value: "75%" },
                  { label: "Min Loan", value: "$100 USDT" },
                  { label: "Term", value: "1-36 months" },
                ].map(s => (
                  <div
                    key={s.label}
                    className="p-2 rounded-xl bg-black/20 text-center"
                  >
                    <p className="font-black text-xs text-violet-400">
                      {s.value}
                    </p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
              <Button
                className="w-full h-10 text-xs bg-violet-600 text-white border-0 font-bold"
                onClick={() =>
                  toast.success(
                    "✅ Loan application submitted! Funds in 2 minutes."
                  )
                }
              >
                Apply for Loan
              </Button>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="py-3 px-4">
              <div className="flex items-center gap-3">
                <PiggyBank className="h-8 w-8 text-violet-400" />
                <div className="flex-1">
                  <p className="font-bold text-sm">Active Loan</p>
                  <p className="text-xs text-muted-foreground">
                    $500 USDT · 4.4% APR · 12 months
                  </p>
                  <Progress value={33} className="h-1.5 mt-1" />
                  <p className="text-xs text-muted-foreground mt-0.5">
                    4 of 12 payments made
                  </p>
                </div>
                <Button
                  size="sm"
                  className="h-8 text-xs bg-violet-600 text-white border-0"
                  onClick={() => toast.success("Payment made!")}
                >
                  Pay
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
