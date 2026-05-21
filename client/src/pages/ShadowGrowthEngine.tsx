/**
 * ShadowChat — Viral Growth Engine
 * Referral rewards · Leaderboard · SKY4444 earn loops · Skyler Blue
 */
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

const LEADERBOARD = [
  {
    rank: 1,
    name: "CryptoKing_44",
    referrals: 847,
    earned: 37268,
    badge: "👑",
  },
  { rank: 2, name: "SkylerBlue", referrals: 444, earned: 19536, badge: "✦" },
  { rank: 3, name: "DeFiDegen", referrals: 312, earned: 13728, badge: "🥉" },
  { rank: 4, name: "TrumpTrader", referrals: 289, earned: 12716, badge: "🏅" },
  { rank: 5, name: "MoonBoy99", referrals: 201, earned: 8844, badge: "🎖️" },
];

const MISSIONS = [
  {
    id: 1,
    title: "Mine your first SKY4444",
    reward: 44,
    done: true,
    icon: "⛏️",
  },
  { id: 2, title: "Complete your profile", reward: 10, done: true, icon: "👤" },
  {
    id: 3,
    title: "Make your first trade",
    reward: 100,
    done: false,
    icon: "📈",
  },
  { id: 4, title: "Refer a friend", reward: 44, done: false, icon: "🔗" },
  {
    id: 5,
    title: "Stake SKY4444 for 7 days",
    reward: 200,
    done: false,
    icon: "🌾",
  },
  { id: 6, title: "Buy from the shop", reward: 25, done: false, icon: "🛒" },
];

export default function ShadowGrowthEngine() {
  const [copied, setCopied] = useState(false);
  const [totalEarned, setTotalEarned] = useState(54);
  const referralCode = "SKYLER4444";
  const referralLink = `https://shadowchat.app/ref/${referralCode}`;

  const copy = () => {
    navigator.clipboard.writeText(referralLink).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4 pb-6">
      <div className="border-b border-border/40 pb-3">
        <h1 className="text-2xl font-black">🚀 Growth Engine</h1>
        <p className="text-xs text-muted-foreground">
          Earn SKY4444 by referring friends, completing missions, and climbing
          the leaderboard
        </p>
      </div>

      {/* Referral Card */}
      <Card className="border-yellow-500/40 bg-gradient-to-br from-yellow-500/10 to-orange-500/5">
        <CardContent className="py-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="font-black text-sm">Your Referral Link</p>
            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 font-black">
              44 SKY4444 / referral
            </Badge>
          </div>
          <div className="bg-background/60 rounded-lg px-3 py-2 flex items-center justify-between gap-2">
            <p className="text-xs font-mono text-yellow-400 truncate">
              {referralLink}
            </p>
            <Button
              onClick={copy}
              size="sm"
              className="shrink-0 h-7 text-xs bg-yellow-500 hover:bg-yellow-400 text-black font-black border-0"
            >
              {copied ? "✓ Copied!" : "Copy"}
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            {[
              ["0", "Referrals"],
              ["0", "Pending"],
              [`${totalEarned}`, "SKY4444 Earned"],
            ].map(([val, label], i) => (
              <div key={i} className="bg-background/40 rounded-lg py-2">
                <p className="font-black text-lg text-yellow-400">{val}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Daily Missions */}
      <Card className="border-border/40">
        <CardContent className="py-4 space-y-2">
          <div className="flex items-center justify-between mb-1">
            <p className="font-black text-sm">Daily Missions</p>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
              2/6 Done
            </Badge>
          </div>
          {MISSIONS.map(m => (
            <div
              key={m.id}
              className={`flex items-center justify-between p-2 rounded-lg ${m.done ? "bg-green-500/5 border border-green-500/20" : "bg-muted/30"}`}
            >
              <div className="flex items-center gap-2">
                <span className="text-base">{m.icon}</span>
                <p
                  className={`text-xs font-bold ${m.done ? "line-through text-muted-foreground" : ""}`}
                >
                  {m.title}
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-yellow-400 font-bold">
                  +{m.reward}
                </span>
                {m.done ? (
                  <span className="text-green-400 text-xs">✓</span>
                ) : (
                  <Link href="/dashboard/shadow/sky-coin4444-mine">
                    <Button
                      size="sm"
                      className="h-6 text-xs px-2 bg-yellow-500/15 hover:bg-yellow-500/25 text-yellow-400 border border-yellow-500/30"
                    >
                      Go
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Leaderboard */}
      <Card className="border-border/40">
        <CardContent className="py-4 space-y-2">
          <p className="font-black text-sm">🏆 Global Leaderboard</p>
          {LEADERBOARD.map(u => (
            <div
              key={u.rank}
              className={`flex items-center justify-between p-2 rounded-lg ${u.name === "SkylerBlue" ? "border border-yellow-500/30 bg-yellow-500/5" : "bg-muted/20"}`}
            >
              <div className="flex items-center gap-2">
                <span className="text-base">{u.badge}</span>
                <div>
                  <p className="font-black text-xs">{u.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {u.referrals} referrals
                  </p>
                </div>
              </div>
              <p className="font-black text-xs text-yellow-400">
                {u.earned.toLocaleString()} SKY4444
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      <p className="text-center text-xs text-muted-foreground/60">
        Skyler Blue · 479-406-7123 · skycoin444 · Growth Engine
      </p>
    </div>
  );
}
