import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Edit,
  Star,
  Award,
  TrendingUp,
  Shield,
  Zap,
  MessageSquare,
  Heart,
  Share2,
  Copy,
  CheckCircle,
  Twitter,
  Globe,
  Link,
  Camera,
  Settings,
  Crown,
  BarChart2,
  Coins,
  Users,
  Calendar,
  Flag,
  Lock,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

const BADGES = [
  {
    id: "b1",
    name: "Early Adopter",
    icon: "🚀",
    desc: "Joined in the first 1000 users",
    rarity: "legendary",
  },
  {
    id: "b2",
    name: "TRUMP Whale",
    icon: "🐋",
    desc: "Holds 10,000+ TRUMP tokens",
    rarity: "epic",
  },
  {
    id: "b3",
    name: "NFT Creator",
    icon: "🎨",
    desc: "Minted 10+ NFTs",
    rarity: "rare",
  },
  {
    id: "b4",
    name: "DAO Voter",
    icon: "🗳️",
    desc: "Voted on 5+ proposals",
    rarity: "uncommon",
  },
  {
    id: "b5",
    name: "Charity Champion",
    icon: "❤️",
    desc: "Donated $500+ to charity",
    rarity: "epic",
  },
  {
    id: "b6",
    name: "Referral King",
    icon: "👑",
    desc: "Referred 50+ users",
    rarity: "legendary",
  },
  {
    id: "b7",
    name: "Verified Creator",
    icon: "✅",
    desc: "Identity verified",
    rarity: "common",
  },
  {
    id: "b8",
    name: "SKY4444 ICO",
    icon: "⚡",
    desc: "ICO Pre-Sale investor",
    rarity: "rare",
  },
];

const ACTIVITY = [
  {
    type: "trade",
    desc: "Bought 500 TRUMP @ $0.0234",
    time: "2 hours ago",
    icon: "📈",
  },
  {
    type: "nft",
    desc: "Minted 'Digital Horizon #42' NFT",
    time: "5 hours ago",
    icon: "🎨",
  },
  {
    type: "stake",
    desc: "Staked 10,000 SKY4444 (90-day lock)",
    time: "1 day ago",
    icon: "⚡",
  },
  {
    type: "vote",
    desc: "Voted YES on DAO Proposal #18",
    time: "2 days ago",
    icon: "🗳️",
  },
  {
    type: "charity",
    desc: "Donated $50 to Ocean Cleanup via TRUMP",
    time: "3 days ago",
    icon: "❤️",
  },
  {
    type: "post",
    desc: "Posted in Community: 'SKY4444 to the moon!'",
    time: "4 days ago",
    icon: "💬",
  },
];

const RARITY_COLORS: Record<string, string> = {
  legendary: "border-yellow-500/40 bg-yellow-500/10 text-yellow-300",
  epic: "border-purple-500/40 bg-purple-500/10 text-purple-300",
  rare: "border-blue-500/40 bg-blue-500/10 text-blue-300",
  uncommon: "border-green-500/40 bg-green-500/10 text-green-300",
  common: "border-border/40 bg-muted/20 text-muted-foreground",
};

export default function Profile() {
  const { data: user } = trpc.auth.me.useQuery();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "activity" | "badges" | "nfts" | "stats"
  >("activity");
  const utils = trpc.useUtils();
  const { data: beginnerPlus } =
    trpc.platform.beginnerPlusBusinessMode.useQuery();
  const { data: beginnerPlusHistory, isLoading: beginnerPlusHistoryLoading } =
    trpc.platform.recentBeginnerPlusBusinessIntents.useQuery(
      { limit: 6 },
      { refetchInterval: 45000 }
    );
  const beginnerPlusIntent =
    trpc.platform.createBeginnerPlusBusinessIntent.useMutation({
      onSuccess: async result => {
        toast.success(
          `Beginner Plus queued: ${result.action.label}${result.persisted ? " and saved for review" : ""}`
        );
        await utils.platform.recentBeginnerPlusBusinessIntents.invalidate();
      },
      onError: error => toast.error(error.message),
    });

  const queueBeginnerPlusAction = (
    action:
      | "review-profile-trust"
      | "build-business-offer"
      | "queue-creator-monetization",
    note: string
  ) => {
    beginnerPlusIntent.mutate({
      action,
      acceptBusinessGuidance: true,
      note,
    });
  };

  const copyAddress = () => {
    navigator.clipboard.writeText("0xSKY4444...ABCD");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Wallet address copied!");
  };

  const username = user?.name || "SkylerBlue_Official";
  const level = 42;
  const xp = 84320;
  const xpToNext = 100000;

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-950 via-purple-950 to-cyan-950 border border-blue-500/20 p-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(139,92,246,0.15),transparent_50%)]" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Avatar */}
          <div className="relative">
            <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-3xl font-black border-2 border-cyan-400/50">
              {username[0]}
            </div>
            <button
              className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-blue-600 flex items-center justify-center border-2 border-background"
              onClick={() => toast.info("Upload avatar")}
            >
              <Camera className="h-3.5 w-3.5 text-white" />
            </button>
            <div className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-yellow-500 flex items-center justify-center border-2 border-background">
              <Crown className="h-3 w-3 text-black" />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-black text-white">{username}</h1>
              <CheckCircle className="h-5 w-5 text-blue-400" />
              <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                Level {level}
              </Badge>
            </div>
            <p className="text-blue-200 text-sm mb-3">
              Founder · SKY4444 ICO Investor · TRUMP Whale 🐋
            </p>

            {/* XP Bar */}
            <div className="mb-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-blue-300">XP: {xp.toLocaleString()}</span>
                <span className="text-blue-300/60">
                  Level {level + 1}: {xpToNext.toLocaleString()}
                </span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(xp / xpToNext) * 100}%` }}
                  transition={{ duration: 1 }}
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                />
              </div>
            </div>

            {/* Wallet */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-sm font-mono text-white/80">
                0xSKY4444...ABCD
                <button
                  onClick={copyAddress}
                  className="text-blue-300 hover:text-white transition-colors"
                >
                  {copied ? (
                    <CheckCircle className="h-3.5 w-3.5 text-green-400" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="h-8 border-white/20 text-white hover:bg-white/10"
                onClick={() => toast.info("Opening settings")}
              >
                <Settings className="h-3.5 w-3.5 mr-1.5" />
                Edit Profile
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 shrink-0">
            {[
              {
                label: "TRUMP Balance",
                value: "12,450",
                color: "text-red-300",
              },
              { label: "SKY4444", value: "85,000", color: "text-cyan-300" },
              { label: "NFTs Owned", value: "23", color: "text-purple-300" },
              { label: "Referrals", value: "142", color: "text-green-300" },
            ].map(({ label, value, color }) => (
              <div
                key={label}
                className="bg-white/5 rounded-xl p-3 border border-white/10 text-center"
              >
                <p className="text-xs text-white/50">{label}</p>
                <p className={`font-black text-lg ${color}`}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Beginner Plus Business Free-Will Profile Guidance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 border-blue-500/20 bg-gradient-to-br from-blue-950/25 to-cyan-950/10">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Shield className="h-4 w-4 text-blue-400" />
              Beginner Plus profile trust mode
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {beginnerPlus?.plainLanguagePromise ??
                "Beginner Plus helps business users strengthen profile trust, explain offers clearly, protect privacy, and keep publishing or monetization actions user-confirmed."}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {(beginnerPlus?.profileGuidance ?? []).map(
                (item: { key: string; label: string; description: string }) => (
                  <div
                    key={item.key}
                    className="rounded-xl border border-blue-500/10 bg-blue-500/5 p-3"
                  >
                    <p className="text-sm font-semibold text-blue-300">
                      {item.label}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                      {item.description}
                    </p>
                  </div>
                )
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <Button
                variant="outline"
                className="justify-start"
                disabled={beginnerPlusIntent.isPending}
                onClick={() =>
                  queueBeginnerPlusAction(
                    "review-profile-trust",
                    "Profile user requested Beginner Plus trust and privacy review."
                  )
                }
              >
                <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                Review trust
              </Button>
              <Button
                variant="outline"
                className="justify-start"
                disabled={beginnerPlusIntent.isPending}
                onClick={() =>
                  queueBeginnerPlusAction(
                    "build-business-offer",
                    "Profile user requested a clear business offer draft with provider-gated payment disclosures."
                  )
                }
              >
                <BarChart2 className="h-4 w-4 mr-2 text-cyan-400" />
                Build offer
              </Button>
              <Button
                variant="outline"
                className="justify-start"
                disabled={beginnerPlusIntent.isPending}
                onClick={() =>
                  queueBeginnerPlusAction(
                    "queue-creator-monetization",
                    "Profile user requested creator monetization review before live payment activation."
                  )
                }
              >
                <Coins className="h-4 w-4 mr-2 text-yellow-400" />
                Monetization review
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-500/20 bg-gradient-to-br from-purple-950/20 to-blue-950/10">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Globe className="h-4 w-4 text-purple-400" />
              Business thought process
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {(beginnerPlus?.businessThoughtProcess ?? [])
              .slice(0, 4)
              .map((step: { step: number; title: string; prompt: string }) => (
                <div key={step.step} className="flex gap-2">
                  <Badge
                    variant="outline"
                    className="h-6 min-w-6 justify-center text-[10px]"
                  >
                    {step.step}
                  </Badge>
                  <div>
                    <p className="text-xs font-semibold">{step.title}</p>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      {step.prompt}
                    </p>
                  </div>
                </div>
              ))}
            <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-3 text-xs text-yellow-200 leading-relaxed">
              Live-money, identity verification, and creator monetization remain
              review-first and provider-gated until production providers are
              approved.
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-emerald-500/20 bg-gradient-to-br from-emerald-950/20 to-blue-950/10">
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <CardTitle className="flex items-center gap-2 text-base">
              <Clock className="h-4 w-4 text-emerald-400" />
              Beginner Plus saved review history
            </CardTitle>
            <Badge variant="outline">
              {beginnerPlusHistory?.intents?.length ?? 0} recent intents
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {beginnerPlusHistory?.betaNotice ??
              "Saved profile, creator, offer, and monetization guidance actions appear here after they are persisted for transparent review."}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {(beginnerPlusHistory?.intents ?? [])
              .slice(0, 6)
              .map((intent: any) => (
                <div
                  key={intent.id}
                  className="rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold capitalize text-emerald-300">
                      {intent.action.replace(/-/g, " ")}
                    </p>
                    <Badge className="border-cyan-500/20 bg-cyan-500/10 text-cyan-300 text-[10px]">
                      {intent.reviewStatus}
                    </Badge>
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                    {intent.note ?? intent.status}
                  </p>
                  <p className="mt-2 text-[11px] text-muted-foreground">
                    {new Date(intent.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            {!(beginnerPlusHistory?.intents ?? []).length && (
              <div className="md:col-span-3 rounded-xl border border-border/40 p-4 text-sm text-muted-foreground">
                {beginnerPlusHistoryLoading
                  ? "Loading saved review history..."
                  : "No saved Beginner Plus profile intents yet. Use Review trust, Build offer, or Monetization review to create a durable review record."}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["activity", "badges", "nfts", "stats"] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${activeTab === tab ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "activity" && (
        <div className="space-y-2">
          {ACTIVITY.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="border-border/50">
                <CardContent className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.desc}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.time}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs capitalize">
                      {item.type}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === "badges" && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {BADGES.map((badge, i) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card
                className={`border ${RARITY_COLORS[badge.rarity]} cursor-pointer hover:scale-105 transition-transform`}
              >
                <CardContent className="pt-4 text-center">
                  <div className="text-4xl mb-2">{badge.icon}</div>
                  <p className="font-bold text-sm">{badge.name}</p>
                  <p className="text-xs opacity-70 mt-1">{badge.desc}</p>
                  <Badge
                    className={`text-xs mt-2 capitalize ${RARITY_COLORS[badge.rarity]}`}
                  >
                    {badge.rarity}
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === "nfts" && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card
              key={i}
              className="border-border/50 overflow-hidden cursor-pointer hover:border-purple-500/30 transition-colors"
            >
              <div className="aspect-square bg-gradient-to-br from-purple-900 to-blue-900 relative">
                <img
                  src={`https://images.unsplash.com/photo-${1618005182384 + i * 1000}-a83a8bd57fbe?w=200&h=200&fit=crop`}
                  alt="NFT"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute bottom-2 left-2 right-2">
                  <Badge className="text-xs bg-black/60 text-white border-0">
                    #{i + 1}
                  </Badge>
                </div>
              </div>
              <CardContent className="py-2 px-3">
                <p className="text-sm font-bold">Digital Horizon #{i + 1}</p>
                <p className="text-xs text-muted-foreground">Floor: 0.05 ETH</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "stats" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              label: "Total Trades",
              value: "1,243",
              icon: TrendingUp,
              color: "text-green-400",
            },
            {
              label: "Win Rate",
              value: "68.4%",
              icon: Award,
              color: "text-yellow-400",
            },
            {
              label: "Total Volume",
              value: "$284,920",
              icon: Coins,
              color: "text-blue-400",
            },
            {
              label: "DAO Votes Cast",
              value: "23",
              icon: Flag,
              color: "text-purple-400",
            },
            {
              label: "NFTs Minted",
              value: "31",
              icon: Star,
              color: "text-pink-400",
            },
            {
              label: "Charity Donated",
              value: "$1,240",
              icon: Heart,
              color: "text-red-400",
            },
          ].map(({ label, value, icon: Icon, color }) => (
            <Card key={label} className="border-border/50">
              <CardContent className="pt-4 pb-3">
                <div className="flex items-center gap-3">
                  <Icon className={`h-8 w-8 ${color}`} />
                  <div>
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="text-2xl font-black">{value}</p>
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
