import { useState } from "react";
import { motion } from "framer-motion";
import {
  Share2,
  Users,
  DollarSign,
  TrendingUp,
  Copy,
  Gift,
  Star,
  Trophy,
  ChevronRight,
  Zap,
  Coins,
  Link,
  QrCode,
  Twitter,
  MessageSquare,
  Mail,
  CheckCircle,
  Award,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const REFERRAL_TIERS = [
  {
    tier: "Bronze",
    min: 0,
    max: 4,
    commission: "5%",
    bonus: "100 SKY4444",
    color: "from-orange-700 to-amber-600",
    icon: "🥉",
  },
  {
    tier: "Silver",
    min: 5,
    max: 19,
    commission: "8%",
    bonus: "500 SKY4444",
    color: "from-gray-400 to-gray-300",
    icon: "🥈",
  },
  {
    tier: "Gold",
    min: 20,
    max: 49,
    commission: "12%",
    bonus: "2,000 SKY4444",
    color: "from-yellow-500 to-amber-400",
    icon: "🥇",
  },
  {
    tier: "Platinum",
    min: 50,
    max: 99,
    commission: "15%",
    bonus: "10,000 SKY4444",
    color: "from-cyan-400 to-blue-400",
    icon: "💎",
  },
  {
    tier: "Diamond",
    min: 100,
    max: Infinity,
    commission: "20%",
    bonus: "50,000 SKY4444",
    color: "from-violet-400 to-pink-400",
    icon: "💠",
  },
];

const MY_REFERRALS = [
  {
    name: "CryptoJohn_99",
    joined: "May 12",
    earned: 48.2,
    status: "active",
    tier: "Silver",
  },
  {
    name: "TechSara_Dev",
    joined: "May 10",
    earned: 124.8,
    status: "active",
    tier: "Gold",
  },
  {
    name: "DeFi_Mike",
    joined: "May 8",
    earned: 22.4,
    status: "active",
    tier: "Bronze",
  },
  {
    name: "NFT_Artist_X",
    joined: "May 5",
    earned: 0,
    status: "inactive",
    tier: "Bronze",
  },
  {
    name: "SkyTrader_88",
    joined: "Apr 28",
    earned: 284.0,
    status: "active",
    tier: "Gold",
  },
];

const LEADERBOARD = [
  {
    rank: 1,
    name: "CryptoWhale_Pro",
    referrals: 842,
    earned: 12840,
    badge: "💠",
  },
  { rank: 2, name: "ShadowKing_88", referrals: 624, earned: 9360, badge: "💠" },
  { rank: 3, name: "DeFi_Legend", referrals: 512, earned: 7680, badge: "💎" },
  {
    rank: 4,
    name: "You",
    referrals: 5,
    earned: 479.4,
    badge: "🥈",
    isMe: true,
  },
  { rank: 5, name: "TechMaster_X", referrals: 4, earned: 320.0, badge: "🥉" },
];

export default function ReferralCenter() {
  const [tab, setTab] = useState<
    "overview" | "referrals" | "leaderboard" | "tiers"
  >("overview");
  const [copied, setCopied] = useState(false);
  const referralCode = "SHADOW-SKY4444-XKCD9";
  const referralLink = `https://shadowchat.io/join?ref=${referralCode}`;
  const myReferrals = 5;
  const currentTier = REFERRAL_TIERS[1]; // Silver
  const nextTier = REFERRAL_TIERS[2]; // Gold
  const totalEarned = MY_REFERRALS.reduce((s, r) => s + r.earned, 0);

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink).catch(() => {});
    setCopied(true);
    toast.success("Referral link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2">
          <Share2 className="h-6 w-6 text-green-400" />
          Referral Center
        </h1>
        <p className="text-sm text-muted-foreground">
          Earn SKY4444 and cash by inviting friends to ShadowChat
        </p>
      </div>

      {/* Current Tier Banner */}
      <div
        className={`p-4 rounded-2xl bg-gradient-to-r ${currentTier.color} text-white`}
      >
        <div className="flex items-center gap-3">
          <span className="text-4xl">{currentTier.icon}</span>
          <div className="flex-1">
            <p className="text-sm opacity-80">Current Tier</p>
            <p className="text-2xl font-black">{currentTier.tier} Ambassador</p>
            <p className="text-sm opacity-80">
              {currentTier.commission} commission on all referral trades
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-80">Total Earned</p>
            <p className="text-2xl font-black">${totalEarned.toFixed(2)}</p>
          </div>
        </div>
        <div className="mt-3">
          <div className="flex justify-between text-xs opacity-80 mb-1">
            <span>{myReferrals} referrals</span>
            <span>
              {nextTier.min - myReferrals} more to reach {nextTier.tier}
            </span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all"
              style={{ width: `${(myReferrals / nextTier.min) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["overview", "referrals", "leaderboard", "tiers"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${tab === t ? "bg-green-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              {
                label: "Total Referrals",
                value: String(myReferrals),
                icon: Users,
                color: "text-blue-400",
              },
              {
                label: "Active Referrals",
                value: String(
                  MY_REFERRALS.filter(r => r.status === "active").length
                ),
                icon: CheckCircle,
                color: "text-green-400",
              },
              {
                label: "Total Earned",
                value: `$${totalEarned.toFixed(2)}`,
                icon: DollarSign,
                color: "text-yellow-400",
              },
              {
                label: "SKY4444 Earned",
                value: "2,840",
                icon: Coins,
                color: "text-cyan-400",
              },
            ].map(({ label, value, icon: Icon, color }) => (
              <Card key={label} className="border-border/50">
                <CardContent className="pt-4 pb-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className={`h-4 w-4 ${color}`} />
                    <span className="text-xs text-muted-foreground">
                      {label}
                    </span>
                  </div>
                  <p className="text-xl font-black">{value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Referral Link */}
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold">
                Your Referral Link
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl bg-muted/20 border border-border/30 font-mono text-sm overflow-hidden">
                  <Link className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="truncate">{referralLink}</span>
                </div>
                <Button
                  className={`shrink-0 ${copied ? "bg-green-600" : "bg-green-600"} text-white border-0`}
                  onClick={copyLink}
                >
                  {copied ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <div className="flex gap-2">
                <p className="text-xs text-muted-foreground">
                  Referral Code:{" "}
                  <span className="font-mono font-bold text-foreground">
                    {referralCode}
                  </span>
                </p>
              </div>
              {/* Share Buttons */}
              <div className="flex gap-2">
                {[
                  {
                    label: "Twitter/X",
                    icon: Twitter,
                    color: "bg-black text-white",
                  },
                  {
                    label: "Telegram",
                    icon: MessageSquare,
                    color: "bg-blue-500 text-white",
                  },
                  {
                    label: "Email",
                    icon: Mail,
                    color: "bg-muted text-foreground",
                  },
                  {
                    label: "QR Code",
                    icon: QrCode,
                    color: "bg-muted text-foreground",
                  },
                ].map(({ label, icon: Icon, color }) => (
                  <Button
                    key={label}
                    size="sm"
                    className={`h-8 text-xs flex-1 ${color} border-0`}
                    onClick={() => toast.success(`Sharing via ${label}`)}
                  >
                    <Icon className="h-3.5 w-3.5 mr-1.5" />
                    {label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* How It Works */}
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold">How It Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  {
                    step: "1",
                    title: "Share Your Link",
                    desc: "Share your unique referral link with friends",
                    icon: Share2,
                  },
                  {
                    step: "2",
                    title: "They Sign Up",
                    desc: "Friend joins ShadowChat and starts trading",
                    icon: Users,
                  },
                  {
                    step: "3",
                    title: "You Earn",
                    desc: "Get 5-20% of their trading fees forever",
                    icon: Gift,
                  },
                ].map(({ step, title, desc, icon: Icon }) => (
                  <div key={step} className="flex flex-col items-center gap-2">
                    <div className="h-12 w-12 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-green-400" />
                    </div>
                    <p className="font-bold text-sm">{title}</p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "referrals" && (
        <div className="space-y-3">
          {MY_REFERRALS.map((ref, i) => (
            <motion.div
              key={ref.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="border-border/50">
                <CardContent className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {ref.name[0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-sm">{ref.name}</p>
                        <Badge
                          className={`text-xs ${ref.status === "active" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-muted text-muted-foreground"}`}
                        >
                          {ref.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Joined {ref.joined} · {ref.tier} tier
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-green-400">
                        ${ref.earned.toFixed(2)}
                      </p>
                      <p className="text-xs text-muted-foreground">earned</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "leaderboard" && (
        <div className="space-y-3">
          <div className="p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/20 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-400" />
            <p className="text-sm">
              Top referrers earn extra SKY4444 bonuses and exclusive Diamond
              status perks!
            </p>
          </div>
          {LEADERBOARD.map((entry, i) => (
            <Card
              key={entry.rank}
              className={`border-border/50 ${entry.isMe ? "border-green-500/30 bg-green-500/3" : ""}`}
            >
              <CardContent className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center font-black text-sm shrink-0 ${entry.rank <= 3 ? "bg-yellow-500/10 text-yellow-400" : "bg-muted text-muted-foreground"}`}
                  >
                    #{entry.rank}
                  </div>
                  <span className="text-2xl">{entry.badge}</span>
                  <div className="flex-1">
                    <p
                      className={`font-bold text-sm ${entry.isMe ? "text-green-400" : ""}`}
                    >
                      {entry.name} {entry.isMe && "(You)"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {entry.referrals} referrals
                    </p>
                  </div>
                  <p className="font-black text-yellow-400">
                    ${entry.earned.toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "tiers" && (
        <div className="space-y-3">
          {REFERRAL_TIERS.map((tier, i) => (
            <Card
              key={tier.tier}
              className={`border-border/50 ${tier.tier === currentTier.tier ? "border-green-500/30" : ""}`}
            >
              <CardContent className="py-4 px-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{tier.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-black">{tier.tier}</p>
                      {tier.tier === currentTier.tier && (
                        <Badge className="text-xs bg-green-500/10 text-green-400 border-green-500/20">
                          Current
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {tier.min === 0 ? "0" : tier.min}–
                      {tier.max === Infinity ? "∞" : tier.max} referrals
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-green-400">
                      {tier.commission}
                    </p>
                    <p className="text-xs text-muted-foreground">commission</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-cyan-400">{tier.bonus}</p>
                    <p className="text-xs text-muted-foreground">join bonus</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
