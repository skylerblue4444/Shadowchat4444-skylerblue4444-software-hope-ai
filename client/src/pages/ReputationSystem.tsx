import { useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  Shield,
  Heart,
  TrendingUp,
  Award,
  Users,
  CheckCircle,
  Lock,
  Globe,
  Zap,
  ChevronRight,
  Crown,
  BarChart3,
  Eye,
  EyeOff,
  Coins,
  MessageCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const REPUTATION_CATEGORIES = [
  {
    id: "trading",
    name: "Trading",
    score: 847,
    max: 1000,
    emoji: "📈",
    desc: "Based on trade history, win rate, and community feedback",
    level: "Expert",
  },
  {
    id: "content",
    name: "Creator",
    score: 723,
    max: 1000,
    emoji: "🎨",
    desc: "Based on content quality, engagement, and originality",
    level: "Pro",
  },
  {
    id: "community",
    name: "Community",
    score: 912,
    max: 1000,
    emoji: "🏘️",
    desc: "Based on DAO votes, forum contributions, and helpfulness",
    level: "Legend",
  },
  {
    id: "freelance",
    name: "Freelancer",
    score: 654,
    max: 1000,
    emoji: "💼",
    desc: "Based on completed gigs, client reviews, and on-time delivery",
    level: "Skilled",
  },
  {
    id: "charity",
    name: "Charity",
    score: 988,
    max: 1000,
    emoji: "❤️",
    desc: "Based on donations, charity gaming, and volunteer work",
    level: "Champion",
  },
  {
    id: "dating",
    name: "Dating",
    score: 445,
    max: 1000,
    emoji: "💘",
    desc: "Based on match quality, conversation ratings, and respect score",
    level: "Rising",
  },
];

const BADGES = [
  {
    name: "Diamond Trader",
    emoji: "💎",
    earned: true,
    desc: "Top 1% trader on ShadowExchange",
  },
  {
    name: "SKY4444 OG",
    emoji: "⚡",
    earned: true,
    desc: "Early adopter — held SKY4444 since genesis",
  },
  {
    name: "Charity Champion",
    emoji: "❤️",
    earned: true,
    desc: "Donated 10,000+ SKY4444 to charity",
  },
  {
    name: "DAO Legend",
    emoji: "🏛️",
    earned: true,
    desc: "Voted on 100+ DAO proposals",
  },
  {
    name: "Content Creator",
    emoji: "🎨",
    earned: true,
    desc: "1,000+ followers on ShadowSocial",
  },
  {
    name: "TRUMP Holder",
    emoji: "🇺🇸",
    earned: true,
    desc: "Verified TRUMP token holder",
  },
  {
    name: "NFT Collector",
    emoji: "🖼️",
    earned: false,
    desc: "Own 10+ NFTs — 7/10 collected",
  },
  {
    name: "Metaverse Pioneer",
    emoji: "🌐",
    earned: false,
    desc: "Own virtual land in ShadowVerse",
  },
  {
    name: "Referral King",
    emoji: "👑",
    earned: false,
    desc: "Refer 100 users — 67/100 referred",
  },
];

const LEADERBOARD = [
  {
    rank: 1,
    name: "CryptoKing_44",
    score: 9847,
    emoji: "👑",
    badge: "Diamond",
  },
  {
    rank: 2,
    name: "SkyMaximalist",
    score: 9234,
    emoji: "⚡",
    badge: "Platinum",
  },
  { rank: 3, name: "TrumpTrader", score: 8901, emoji: "🇺🇸", badge: "Gold" },
  { rank: 4, name: "ShadowBuilder", score: 8456, emoji: "🏗️", badge: "Gold" },
  {
    rank: 5,
    name: "You",
    score: 7823,
    emoji: "🌟",
    badge: "Silver",
    isUser: true,
  },
];

export default function ReputationSystem() {
  const [tab, setTab] = useState<
    "score" | "badges" | "leaderboard" | "privacy"
  >("score");
  const [publicProfile, setPublicProfile] = useState(true);
  const [showImpact, setShowImpact] = useState(true);

  const overallScore = Math.round(
    REPUTATION_CATEGORIES.reduce((s, c) => s + c.score, 0) /
      REPUTATION_CATEGORIES.length
  );
  const impactScore = 88;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Star className="h-6 w-6 text-yellow-400" />
            Reputation & Impact
          </h1>
          <p className="text-sm text-muted-foreground">
            Your on-chain decentralized reputation score
          </p>
        </div>
        <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20 font-black text-base px-3">
          {overallScore}
        </Badge>
      </div>

      {/* Overall Score Card */}
      <Card className="border-yellow-500/20 bg-gradient-to-br from-yellow-900/10 to-orange-900/10">
        <CardContent className="pt-5 pb-5">
          <div className="flex items-center gap-5">
            <div className="relative">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="h-20 w-20 rounded-full border-4 border-yellow-500/30 flex items-center justify-center"
              >
                <Star className="h-10 w-10 text-yellow-400" />
              </motion.div>
              <div className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-green-600 flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <p className="font-black text-3xl text-yellow-400">
                {overallScore}
                <span className="text-base text-muted-foreground">/1000</span>
              </p>
              <p className="font-bold text-sm">Silver Reputation · Top 15%</p>
              <Progress value={overallScore / 10} className="h-2 mt-2" />
              <p className="text-xs text-muted-foreground mt-1">
                177 points to Gold tier
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Impact Score</p>
              <p className="font-black text-2xl text-pink-400">{impactScore}</p>
              <Heart className="h-5 w-5 text-pink-400 mx-auto mt-1" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["score", "badges", "leaderboard", "privacy"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-yellow-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "score" && (
        <div className="space-y-3">
          {REPUTATION_CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Card className="border-border/50">
                <CardContent className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xl shrink-0">{cat.emoji}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-bold text-sm">{cat.name}</p>
                        <div className="flex items-center gap-2">
                          <Badge className="text-xs bg-muted text-muted-foreground">
                            {cat.level}
                          </Badge>
                          <p className="font-black text-sm text-yellow-400">
                            {cat.score}
                          </p>
                        </div>
                      </div>
                      <Progress
                        value={(cat.score / cat.max) * 100}
                        className="h-1.5 mb-1"
                      />
                      <p className="text-xs text-muted-foreground">
                        {cat.desc}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          <Card className="border-pink-500/20 bg-pink-900/10">
            <CardContent className="py-3 px-4">
              <p className="font-black text-sm mb-2 flex items-center gap-2">
                <Heart className="h-4 w-4 text-pink-400" />
                Impact Score: {impactScore}/100
              </p>
              <Progress value={impactScore} className="h-2 mb-2" />
              <p className="text-xs text-muted-foreground">
                Your real-world positive impact through charity donations,
                community building, and content creation. Displayed publicly to
                show your contribution to the world.
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "badges" && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {BADGES.map((badge, i) => (
            <motion.div
              key={badge.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card
                className={`border text-center cursor-pointer hover:scale-105 transition-transform ${badge.earned ? "border-yellow-500/30 bg-yellow-900/10" : "border-border/30 opacity-50"}`}
                onClick={() =>
                  toast.info(
                    badge.earned
                      ? `✅ ${badge.name}: ${badge.desc}`
                      : `🔒 ${badge.desc}`
                  )
                }
              >
                <CardContent className="pt-4 pb-4">
                  <p className="text-3xl mb-2">{badge.emoji}</p>
                  <p className="font-bold text-xs">{badge.name}</p>
                  {!badge.earned && (
                    <Lock className="h-3 w-3 text-muted-foreground mx-auto mt-1" />
                  )}
                  {badge.earned && (
                    <CheckCircle className="h-3 w-3 text-green-400 mx-auto mt-1" />
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "leaderboard" && (
        <div className="space-y-2">
          <p className="text-xs font-bold text-muted-foreground">
            GLOBAL REPUTATION LEADERBOARD
          </p>
          {LEADERBOARD.map((entry, i) => (
            <Card
              key={entry.rank}
              className={`border ${entry.isUser ? "border-yellow-500/30 bg-yellow-900/10" : "border-border/50"}`}
            >
              <CardContent className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <p
                    className={`font-black text-lg w-8 text-center ${entry.rank === 1 ? "text-yellow-400" : entry.rank === 2 ? "text-gray-300" : entry.rank === 3 ? "text-orange-400" : "text-muted-foreground"}`}
                  >
                    {entry.rank === 1
                      ? "🥇"
                      : entry.rank === 2
                        ? "🥈"
                        : entry.rank === 3
                          ? "🥉"
                          : `#${entry.rank}`}
                  </p>
                  <span className="text-xl">{entry.emoji}</span>
                  <div className="flex-1">
                    <p className="font-bold text-sm">
                      {entry.name}
                      {entry.isUser && " (You)"}
                    </p>
                    <Badge className="text-xs bg-muted text-muted-foreground">
                      {entry.badge}
                    </Badge>
                  </div>
                  <p className="font-black text-sm text-yellow-400">
                    {entry.score.toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "privacy" && (
        <div className="space-y-3">
          <Card className="border-border/50">
            <CardContent className="py-4 px-4 space-y-4">
              {[
                {
                  label: "Public Reputation Profile",
                  desc: "Allow others to see your reputation scores",
                  state: publicProfile,
                  setState: setPublicProfile,
                },
                {
                  label: "Show Impact Score",
                  desc: "Display your Impact Score on your profile",
                  state: showImpact,
                  setState: setShowImpact,
                },
              ].map(item => (
                <div
                  key={item.label}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="font-bold text-sm">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch
                    checked={item.state}
                    onCheckedChange={v => {
                      item.setState(v);
                      toast.info(`${item.label} ${v ? "enabled" : "disabled"}`);
                    }}
                  />
                </div>
              ))}
              <div className="border-t border-border/30 pt-4">
                <p className="font-bold text-sm mb-2">On-Chain Verification</p>
                <p className="text-xs text-muted-foreground mb-3">
                  Your reputation is stored on-chain and follows you across all
                  Web3 platforms that integrate the ShadowReputation protocol.
                </p>
                <Button
                  className="w-full h-9 text-xs bg-purple-600 text-white border-0"
                  onClick={() =>
                    toast.success("Reputation exported to on-chain DID!")
                  }
                >
                  <Shield className="h-3.5 w-3.5 mr-1.5" />
                  Export to On-Chain DID
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
