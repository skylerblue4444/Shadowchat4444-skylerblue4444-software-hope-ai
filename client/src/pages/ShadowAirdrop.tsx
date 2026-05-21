import { useState } from "react";
import { motion } from "framer-motion";
import {
  Gift,
  Users,
  CheckCircle,
  Clock,
  Zap,
  Star,
  Twitter,
  MessageCircle,
  Wallet,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const ACTIVE_AIRDROPS = [
  {
    id: 1,
    name: "SKY4444 Genesis Drop",
    token: "SKY4444",
    amount: "4,444",
    usd: "$195",
    deadline: "May 31, 2026",
    claimed: 8888,
    total: 44444,
    requirements: [
      "Hold 100+ SKY4444",
      "Follow @ShadowChat",
      "Retweet launch post",
    ],
    status: "eligible",
  },
  {
    id: 2,
    name: "TRUMP Holder Bonus",
    token: "TRUMP",
    amount: "888",
    usd: "$88.80",
    deadline: "Jun 15, 2026",
    claimed: 44444,
    total: 88888,
    requirements: ["Hold 1,000+ TRUMP", "Join Telegram", "Complete KYC"],
    status: "pending",
  },
  {
    id: 3,
    name: "ShadowChat Beta Reward",
    token: "SKY4444",
    amount: "1,000",
    usd: "$44",
    deadline: "Jun 30, 2026",
    claimed: 1244,
    total: 10000,
    requirements: [
      "Beta user before May 2026",
      "Complete 5 trades",
      "Refer 1 friend",
    ],
    status: "claimed",
  },
];

const TASK_CHECKS = [
  { label: "Hold 100+ SKY4444", done: true, icon: Wallet },
  { label: "Follow @ShadowChat on X", done: true, icon: Twitter },
  { label: "Retweet launch post", done: false, icon: MessageCircle },
  { label: "Join Discord server", done: false, icon: Users },
];

export default function ShadowAirdrop() {
  const [tab, setTab] = useState<"available" | "claim" | "history" | "create">(
    "available"
  );
  const [claiming, setClaiming] = useState<number | null>(null);
  const [walletAddr, setWalletAddr] = useState("");

  const claim = async (id: number, name: string) => {
    setClaiming(id);
    await new Promise(r => setTimeout(r, 2000));
    setClaiming(null);
    toast.success(
      `🎁 Claimed ${ACTIVE_AIRDROPS.find(a => a.id === id)?.amount} ${ACTIVE_AIRDROPS.find(a => a.id === id)?.token}!`
    );
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Gift className="h-6 w-6 text-rose-400" />
            ShadowAirdrop
          </h1>
          <p className="text-sm text-muted-foreground">
            Claim free tokens and run airdrop campaigns
          </p>
        </div>
        <Badge className="bg-rose-500/10 text-rose-400 border-rose-500/20 font-bold">
          🎁 3 Active
        </Badge>
      </div>

      {/* My Airdrop Stats */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Total Claimed", value: "5,444 SKY", emoji: "🎁" },
          { label: "USD Value", value: "$239.54", emoji: "💰" },
          { label: "Campaigns", value: "3 joined", emoji: "📋" },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="pt-2 pb-2">
              <p className="text-base">{s.emoji}</p>
              <p className="font-black text-xs text-rose-400">{s.value}</p>
              <p className="text-xs text-muted-foreground leading-tight">
                {s.label}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-2">
        {(["available", "claim", "history", "create"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-rose-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "available" && (
        <div className="space-y-3">
          {ACTIVE_AIRDROPS.map((drop, i) => (
            <motion.div
              key={drop.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card
                className={`border ${drop.status === "eligible" ? "border-rose-500/30 bg-rose-900/5" : drop.status === "claimed" ? "border-green-500/20 opacity-70" : "border-border/50"}`}
              >
                <CardContent className="py-3 px-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-black text-sm">{drop.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Deadline: {drop.deadline}
                      </p>
                    </div>
                    <Badge
                      className={`text-xs ${drop.status === "eligible" ? "bg-rose-500/10 text-rose-400 border-rose-500/20" : drop.status === "claimed" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"}`}
                    >
                      {drop.status === "eligible"
                        ? "✓ Eligible"
                        : drop.status === "claimed"
                          ? "✓ Claimed"
                          : "⏳ Pending"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-full bg-rose-500/10 flex items-center justify-center font-black text-sm text-rose-400 shrink-0">
                      🎁
                    </div>
                    <div>
                      <p className="font-black text-lg text-rose-400">
                        {drop.amount} {drop.token}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ≈ {drop.usd}
                      </p>
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="flex justify-between text-xs mb-0.5">
                      <span className="text-muted-foreground">Claimed</span>
                      <span className="font-bold">
                        {drop.claimed.toLocaleString()} /{" "}
                        {drop.total.toLocaleString()}
                      </span>
                    </div>
                    <Progress
                      value={(drop.claimed / drop.total) * 100}
                      className="h-1.5"
                    />
                  </div>
                  <div className="space-y-0.5 mb-2">
                    {drop.requirements.map(req => (
                      <p
                        key={req}
                        className="text-xs text-muted-foreground flex items-center gap-1"
                      >
                        <CheckCircle className="h-3 w-3 text-rose-400 shrink-0" />
                        {req}
                      </p>
                    ))}
                  </div>
                  {drop.status === "eligible" && (
                    <Button
                      className="w-full h-9 text-xs bg-rose-600 text-white border-0 font-bold"
                      onClick={() => claim(drop.id, drop.name)}
                      disabled={claiming === drop.id}
                    >
                      {claiming === drop.id ? (
                        "Claiming..."
                      ) : (
                        <>
                          <Gift className="h-4 w-4 mr-2" />
                          Claim {drop.amount} {drop.token}
                        </>
                      )}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "claim" && (
        <div className="space-y-3">
          <Card className="border-rose-500/20 bg-rose-900/5">
            <CardContent className="py-4 px-4 space-y-3">
              <p className="font-bold text-sm">
                SKY4444 Genesis Drop — Task Checklist
              </p>
              <p className="text-xs text-muted-foreground">
                Complete all tasks to claim your 4,444 SKY4444 tokens.
              </p>
              {TASK_CHECKS.map((task, i) => (
                <div
                  key={task.label}
                  className={`flex items-center gap-3 p-3 rounded-xl border ${task.done ? "border-green-500/20 bg-green-900/5" : "border-border/50"}`}
                >
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${task.done ? "bg-green-500/10" : "bg-muted"}`}
                  >
                    <task.icon
                      className={`h-4 w-4 ${task.done ? "text-green-400" : "text-muted-foreground"}`}
                    />
                  </div>
                  <p
                    className={`flex-1 text-xs font-medium ${task.done ? "line-through text-muted-foreground" : ""}`}
                  >
                    {task.label}
                  </p>
                  {task.done ? (
                    <CheckCircle className="h-5 w-5 text-green-400 shrink-0" />
                  ) : (
                    <Button
                      size="sm"
                      className="h-7 text-xs bg-rose-600 text-white border-0 shrink-0"
                      onClick={() => toast.success(`✅ Task verified!`)}
                    >
                      Verify
                    </Button>
                  )}
                </div>
              ))}
              <Button
                className="w-full h-10 text-xs bg-rose-600 text-white border-0 font-bold"
                onClick={() => toast.info("Complete all tasks first!")}
              >
                <Zap className="h-4 w-4 mr-2" />
                Claim 4,444 SKY4444 (2/4 tasks done)
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "history" && (
        <div className="space-y-2">
          {[
            {
              name: "ShadowChat Beta Reward",
              amount: "1,000 SKY4444",
              usd: "$44.00",
              date: "May 1, 2026",
              status: "claimed",
            },
            {
              name: "Early Adopter Bonus",
              amount: "4,444 SKY4444",
              usd: "$195.54",
              date: "Apr 15, 2026",
              status: "claimed",
            },
          ].map((h, i) => (
            <Card key={h.name} className="border-border/50">
              <CardContent className="py-3 px-4 flex items-center gap-3">
                <Gift className="h-8 w-8 text-rose-400 shrink-0" />
                <div className="flex-1">
                  <p className="font-bold text-sm">{h.name}</p>
                  <p className="text-xs text-muted-foreground">{h.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-black text-sm text-rose-400">{h.amount}</p>
                  <p className="text-xs text-muted-foreground">{h.usd}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "create" && (
        <Card className="border-rose-500/20 bg-rose-900/5">
          <CardContent className="py-4 px-4 space-y-3">
            <p className="font-bold text-sm">Create Airdrop Campaign</p>
            <p className="text-xs text-muted-foreground">
              Launch your own token airdrop to grow your community. Requires
              1,000 SKY4444 platform fee.
            </p>
            {[
              { label: "Campaign Name", placeholder: "My Token Airdrop" },
              { label: "Token Address", placeholder: "0x..." },
              { label: "Total Tokens to Distribute", placeholder: "100,000" },
              { label: "Max Recipients", placeholder: "10,000" },
            ].map(f => (
              <div key={f.label}>
                <p className="text-xs text-muted-foreground mb-1">{f.label}</p>
                <Input placeholder={f.placeholder} className="h-9 text-xs" />
              </div>
            ))}
            <Button
              className="w-full h-10 text-xs bg-rose-600 text-white border-0 font-bold"
              onClick={() =>
                toast.success("✅ Airdrop campaign created! Pending review.")
              }
            >
              <Gift className="h-4 w-4 mr-2" />
              Launch Campaign — 1,000 SKY4444
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
