import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Trophy,
  Flame,
  Star,
  Plus,
  MessageSquare,
  Heart,
  Share2,
  TrendingUp,
  Zap,
  Crown,
  Globe,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const GROUPS = [
  {
    id: 1,
    name: "SKY4444 Holders",
    members: 44444,
    posts: 888,
    icon: "🌌",
    color: "#6366f1",
    joined: true,
    desc: "Official SKY4444 token community — trading signals, news, and governance",
  },
  {
    id: 2,
    name: "ShadowChat Builders",
    members: 8888,
    posts: 444,
    icon: "🔨",
    color: "#22c55e",
    joined: true,
    desc: "Developers, designers, and entrepreneurs building on ShadowChat",
  },
  {
    id: 3,
    name: "TRUMP Coin Army",
    members: 22222,
    posts: 1444,
    icon: "🇺🇸",
    color: "#ef4444",
    joined: false,
    desc: "TRUMP token community — memes, trading, and political discourse",
  },
  {
    id: 4,
    name: "Skyler Blue IT Network",
    members: 444,
    posts: 88,
    icon: "💻",
    color: "#06b6d4",
    joined: true,
    desc: "IT professionals, managed services, and tech solutions community",
  },
  {
    id: 5,
    name: "NFT Collectors Club",
    members: 12444,
    posts: 666,
    icon: "🎨",
    color: "#ec4899",
    joined: false,
    desc: "Curated NFT art, drops, and collector community",
  },
  {
    id: 6,
    name: "DeFi Yield Hunters",
    members: 6666,
    posts: 333,
    icon: "🌾",
    color: "#f59e0b",
    joined: false,
    desc: "Best yield farming strategies, liquidity pools, and DeFi alpha",
  },
];

const CHALLENGES = [
  {
    title: "Trade 10x in a Week",
    reward: "10,000 SKY4444",
    participants: 4444,
    ends: "3 days",
    icon: "📈",
    completed: false,
  },
  {
    title: "Refer 5 Friends",
    reward: "5,000 SKY4444",
    participants: 8888,
    ends: "7 days",
    icon: "👥",
    completed: true,
  },
  {
    title: "Post 7 Days Straight",
    reward: "7,777 SKY4444",
    participants: 2222,
    ends: "4 days",
    icon: "🔥",
    completed: false,
  },
  {
    title: "Stake 1,000 SKY4444",
    reward: "1,000 SKY4444",
    participants: 6666,
    ends: "Ongoing",
    icon: "🔒",
    completed: true,
  },
];

const TOP_MEMBERS = [
  { rank: 1, name: "SkylerBlue.eth", score: 444444, badge: "👑", avatar: "SB" },
  {
    rank: 2,
    name: "CryptoDevDAO.eth",
    score: 222222,
    badge: "🥈",
    avatar: "CD",
  },
  { rank: 3, name: "TrumpMaxi.eth", score: 188888, badge: "🥉", avatar: "TM" },
  {
    rank: 4,
    name: "ShadowBuilder.eth",
    score: 88888,
    badge: "⭐",
    avatar: "SB",
  },
  {
    rank: 5,
    name: "NFTCollector.eth",
    score: 44444,
    badge: "⭐",
    avatar: "NC",
  },
];

export default function ShadowCommunity() {
  const [tab, setTab] = useState<
    "groups" | "challenges" | "leaderboard" | "trending"
  >("groups");
  const [joined, setJoined] = useState<Set<number>>(
    new Set(GROUPS.filter(g => g.joined).map(g => g.id))
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Users className="h-6 w-6 text-purple-400" />
            Community
          </h1>
          <p className="text-sm text-muted-foreground">
            Groups, challenges, leaderboards, and social connections
          </p>
        </div>
        <Button
          size="sm"
          className="h-8 text-xs bg-purple-600 text-white border-0 font-bold"
          onClick={() => toast.success("Creating new group...")}
        >
          <Plus className="h-3.5 w-3.5 mr-1" />
          Create Group
        </Button>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-3 gap-2">
        {[
          {
            label: "Total Members",
            value: "1.1M+",
            icon: Globe,
            color: "text-blue-400",
          },
          {
            label: "Active Groups",
            value: "444",
            icon: Users,
            color: "text-purple-400",
          },
          {
            label: "Challenges",
            value: "44",
            icon: Trophy,
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

      <div className="flex gap-2">
        {(["groups", "challenges", "leaderboard", "trending"] as const).map(
          t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-purple-600 text-white" : "bg-muted text-muted-foreground"}`}
            >
              {t}
            </button>
          )
        )}
      </div>

      {tab === "groups" && (
        <div className="space-y-2">
          {GROUPS.map((group, i) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Card className="border-border/50 hover:border-purple-500/20 transition-all">
                <CardContent className="py-3 px-4 flex items-start gap-3">
                  <div
                    className="h-10 w-10 rounded-xl flex items-center justify-center text-2xl shrink-0"
                    style={{ backgroundColor: group.color + "20" }}
                  >
                    {group.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-sm">{group.name}</p>
                      {joined.has(group.id) && (
                        <Badge className="text-xs bg-purple-500/10 text-purple-400 border-purple-500/20">
                          Joined
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {group.desc}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {group.members.toLocaleString()} members · {group.posts}{" "}
                      posts/day
                    </p>
                  </div>
                  <Button
                    size="sm"
                    className={`h-8 text-xs font-bold shrink-0 ${joined.has(group.id) ? "" : "bg-purple-600 text-white border-0"}`}
                    variant={joined.has(group.id) ? "outline" : "default"}
                    onClick={() => {
                      setJoined(prev => {
                        const n = new Set(prev);
                        n.has(group.id) ? n.delete(group.id) : n.add(group.id);
                        return n;
                      });
                      toast.success(
                        joined.has(group.id)
                          ? `Left ${group.name}`
                          : `Joined ${group.name}!`
                      );
                    }}
                  >
                    {joined.has(group.id) ? "Leave" : "Join"}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "challenges" && (
        <div className="space-y-2">
          {CHALLENGES.map((challenge, i) => (
            <motion.div
              key={challenge.title}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Card
                className={`border ${challenge.completed ? "border-green-500/20 bg-green-900/5" : "border-border/50"}`}
              >
                <CardContent className="py-3 px-4 flex items-start gap-3">
                  <span className="text-2xl shrink-0">{challenge.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-sm">{challenge.title}</p>
                      {challenge.completed && (
                        <Badge className="text-xs bg-green-500/10 text-green-400 border-green-500/20">
                          ✓ Done
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-yellow-400 font-bold">
                      Reward: {challenge.reward}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {challenge.participants.toLocaleString()} participants ·
                      Ends: {challenge.ends}
                    </p>
                  </div>
                  {!challenge.completed && (
                    <Button
                      size="sm"
                      className="h-8 text-xs bg-yellow-600 text-white border-0 font-bold shrink-0"
                      onClick={() =>
                        toast.success(`Joined challenge: ${challenge.title}!`)
                      }
                    >
                      <Zap className="h-3.5 w-3.5 mr-1" />
                      Join
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "leaderboard" && (
        <div className="space-y-2">
          {TOP_MEMBERS.map((member, i) => (
            <motion.div
              key={member.rank}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Card
                className={`border ${member.rank === 1 ? "border-yellow-500/20 bg-yellow-900/5" : "border-border/50"}`}
              >
                <CardContent className="py-2.5 px-4 flex items-center gap-3">
                  <p className="font-black text-lg w-6 text-center">
                    {member.badge}
                  </p>
                  <div className="h-9 w-9 rounded-full bg-purple-500/20 flex items-center justify-center font-bold text-xs text-purple-400 shrink-0">
                    {member.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{member.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Rank #{member.rank}
                    </p>
                  </div>
                  <p className="font-black text-sm text-yellow-400">
                    {member.score.toLocaleString()} pts
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "trending" && (
        <div className="space-y-2">
          {[
            {
              topic: "#SKY4444ToTheMoon",
              posts: 44444,
              trend: "+444%",
              hot: true,
            },
            {
              topic: "#ShadowChatLaunch",
              posts: 22222,
              trend: "+222%",
              hot: true,
            },
            { topic: "#TRUMPcoin", posts: 18888, trend: "+88%", hot: false },
            {
              topic: "#CryptoWinter2026",
              posts: 8888,
              trend: "-44%",
              hot: false,
            },
            { topic: "#SkylerBlueIT", posts: 4444, trend: "+44%", hot: false },
          ].map((topic, i) => (
            <Card
              key={topic.topic}
              className="border-border/50 cursor-pointer hover:border-purple-500/20 transition-all"
              onClick={() => toast.success(`Opening ${topic.topic} feed...`)}
            >
              <CardContent className="py-2.5 px-4 flex items-center gap-3">
                {topic.hot && (
                  <Flame className="h-4 w-4 text-orange-400 shrink-0" />
                )}
                <div className="flex-1">
                  <p className="font-bold text-sm text-blue-400">
                    {topic.topic}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {topic.posts.toLocaleString()} posts
                  </p>
                </div>
                <p
                  className={`font-bold text-sm ${topic.trend.startsWith("+") ? "text-green-400" : "text-red-400"}`}
                >
                  {topic.trend}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
