import { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  Image,
  Video,
  Smile,
  Send,
  TrendingUp,
  Search,
  Bell,
  Users,
  Zap,
  Star,
  Hash,
  Globe,
  Lock,
  Coins,
  Gift,
  Camera,
  Plus,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const STORIES = [
  {
    name: "Your Story",
    emoji: "➕",
    bg: "from-blue-600/30 to-purple-600/30",
    isAdd: true,
  },
  {
    name: "Skyler",
    emoji: "⚡",
    bg: "from-yellow-600/30 to-orange-600/30",
    isAdd: false,
  },
  {
    name: "CryptoK",
    emoji: "👑",
    bg: "from-purple-600/30 to-pink-600/30",
    isAdd: false,
  },
  {
    name: "NFTArt",
    emoji: "🎨",
    bg: "from-pink-600/30 to-red-600/30",
    isAdd: false,
  },
  {
    name: "MoonM",
    emoji: "🌙",
    bg: "from-blue-600/30 to-cyan-600/30",
    isAdd: false,
  },
  {
    name: "DeFiK",
    emoji: "🌾",
    bg: "from-green-600/30 to-teal-600/30",
    isAdd: false,
  },
];

interface Post {
  id: string;
  author: string;
  authorEmoji: string;
  verified: boolean;
  time: string;
  content: string;
  tags: string[];
  likes: number;
  comments: number;
  shares: number;
  reward: string | null;
  liked: boolean;
  saved: boolean;
  type: "text" | "image" | "poll";
  pollOptions?: { text: string; votes: number }[];
}

const INITIAL_POSTS: Post[] = [
  {
    id: "p1",
    author: "Skyler Blue",
    authorEmoji: "⚡",
    verified: true,
    time: "2 min ago",
    content:
      "🚀 SKY4444 ICO is live! We're building the future of decentralized social media. Join us and earn rewards for every post, like, and share. This is just the beginning! #SKY4444 #Web3 #ShadowChat",
    tags: ["SKY4444", "Web3", "ShadowChat"],
    likes: 4284,
    comments: 284,
    shares: 128,
    reward: "44 SKY4444",
    liked: false,
    saved: false,
    type: "text",
  },
  {
    id: "p2",
    author: "CryptoKing",
    authorEmoji: "👑",
    verified: true,
    time: "15 min ago",
    content:
      "Bitcoin just broke $100K! 🎉 The bull run is officially here. My portfolio is up 284% this month. Who else is printing? Drop your gains below 👇 #Bitcoin #BullRun #Crypto",
    tags: ["Bitcoin", "BullRun", "Crypto"],
    likes: 12840,
    comments: 1284,
    shares: 844,
    reward: null,
    liked: true,
    saved: false,
    type: "text",
  },
  {
    id: "p3",
    author: "NFTArtist",
    authorEmoji: "🎨",
    verified: false,
    time: "1 hour ago",
    content:
      "Just minted my new collection on ShadowChain! 🎨 Each piece is 1-of-1 and comes with exclusive holder benefits. First 44 mints get 444 SKY4444 airdrop! #NFT #ShadowChain #CryptoArt",
    tags: ["NFT", "ShadowChain", "CryptoArt"],
    likes: 844,
    comments: 128,
    shares: 44,
    reward: "NFT Drop",
    liked: false,
    saved: true,
    type: "image",
  },
  {
    id: "p4",
    author: "ShadowDAO",
    authorEmoji: "🏛️",
    verified: true,
    time: "3 hours ago",
    content: "📊 Community Poll: What should we build next on ShadowChat?",
    tags: ["DAO", "Community", "Vote"],
    likes: 2840,
    comments: 284,
    shares: 128,
    reward: "10 SKY4444",
    liked: false,
    saved: false,
    type: "poll",
    pollOptions: [
      { text: "🎮 Play-to-Earn Games", votes: 4284 },
      { text: "🌐 Metaverse Integration", votes: 2840 },
      { text: "🤖 AI Trading Bot", votes: 1284 },
      { text: "📱 Mobile App", votes: 844 },
    ],
  },
];

const TRENDING_TAGS = [
  "#SKY4444",
  "#Bitcoin",
  "#ShadowChat",
  "#NFTDrop",
  "#DeFi",
  "#Web3",
  "#TRUMP",
  "#Metaverse",
];

export default function ShadowSocial() {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [newPost, setNewPost] = useState("");
  const [tab, setTab] = useState<"feed" | "trending" | "following">("feed");
  const [votedPolls, setVotedPolls] = useState<Record<string, number>>({});

  const toggleLike = (id: string) => {
    setPosts(prev =>
      prev.map(p =>
        p.id === id
          ? {
              ...p,
              liked: !p.liked,
              likes: p.liked ? p.likes - 1 : p.likes + 1,
            }
          : p
      )
    );
  };

  const toggleSave = (id: string) => {
    setPosts(prev =>
      prev.map(p => (p.id === id ? { ...p, saved: !p.saved } : p))
    );
    const post = posts.find(p => p.id === id);
    toast.success(post?.saved ? "Removed from saved" : "Saved!");
  };

  const submitPost = () => {
    if (!newPost.trim()) return;
    const post: Post = {
      id: Date.now().toString(),
      author: "You",
      authorEmoji: "👤",
      verified: false,
      time: "Just now",
      content: newPost,
      tags: [],
      likes: 0,
      comments: 0,
      shares: 0,
      reward: "5 SKY4444",
      liked: false,
      saved: false,
      type: "text",
    };
    setPosts(prev => [post, ...prev]);
    setNewPost("");
    toast.success("Post published! You earned 5 SKY4444 ⚡");
  };

  const votePoll = (postId: string, optionIdx: number) => {
    if (votedPolls[postId] !== undefined) {
      toast.error("Already voted!");
      return;
    }
    setVotedPolls(prev => ({ ...prev, [postId]: optionIdx }));
    setPosts(prev =>
      prev.map(p => {
        if (p.id !== postId || !p.pollOptions) return p;
        const newOptions = p.pollOptions.map((o, i) =>
          i === optionIdx ? { ...o, votes: o.votes + 1 } : o
        );
        return { ...p, pollOptions: newOptions };
      })
    );
    toast.success("Vote recorded! Earned 10 SKY4444 ⚡");
  };

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black flex items-center gap-2">
          <Globe className="h-6 w-6 text-purple-400" />
          ShadowSocial
        </h1>
        <div className="flex gap-2">
          <button
            className="h-9 w-9 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-white"
            onClick={() => toast.info("Search...")}
          >
            <Search className="h-4 w-4" />
          </button>
          <button
            className="h-9 w-9 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-white relative"
            onClick={() => toast.info("Notifications...")}
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
          </button>
        </div>
      </div>

      {/* Stories */}
      <div className="flex gap-3 overflow-x-auto pb-1">
        {STORIES.map(story => (
          <button
            key={story.name}
            className="flex flex-col items-center gap-1.5 shrink-0"
            onClick={() =>
              toast.info(
                story.isAdd
                  ? "Add story..."
                  : `Viewing ${story.name}'s story...`
              )
            }
          >
            <div
              className={`h-14 w-14 rounded-full bg-gradient-to-br ${story.bg} flex items-center justify-center text-2xl border-2 ${story.isAdd ? "border-dashed border-border/50" : "border-purple-500"}`}
            >
              {story.emoji}
            </div>
            <p className="text-xs text-muted-foreground">{story.name}</p>
          </button>
        ))}
      </div>

      {/* Compose */}
      <Card className="border-border/50">
        <CardContent className="pt-3 pb-3">
          <div className="flex gap-3">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-purple-600/30 to-blue-600/30 flex items-center justify-center text-xl shrink-0">
              👤
            </div>
            <div className="flex-1">
              <Input
                placeholder="What's happening in Web3? Earn SKY4444 for posting!"
                className="border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground focus-visible:ring-0"
                value={newPost}
                onChange={e => setNewPost(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter" && e.ctrlKey) submitPost();
                }}
              />
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/30">
                <div className="flex gap-2">
                  {[Image, Video, Smile, Hash].map((Icon, i) => (
                    <button
                      key={i}
                      className="text-muted-foreground hover:text-purple-400 transition-colors"
                      onClick={() => toast.info("Attach media...")}
                    >
                      <Icon className="h-4 w-4" />
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-green-400 font-bold">
                    +5 SKY4444
                  </span>
                  <Button
                    size="sm"
                    className="h-7 text-xs bg-purple-600 text-white border-0"
                    onClick={submitPost}
                    disabled={!newPost.trim()}
                  >
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["feed", "trending", "following"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-purple-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Trending Tags */}
      {tab === "trending" && (
        <div>
          <p className="text-xs font-bold text-muted-foreground mb-2">
            TRENDING HASHTAGS
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {TRENDING_TAGS.map(tag => (
              <Badge
                key={tag}
                variant="outline"
                className="cursor-pointer hover:bg-purple-500/10 hover:text-purple-400 transition-colors"
                onClick={() => toast.info(`Searching ${tag}...`)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Posts */}
      <div className="space-y-4">
        {posts.map((post, i) => {
          const totalPollVotes =
            post.pollOptions?.reduce((s, o) => s + o.votes, 0) || 0;
          return (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card className="border-border/50">
                <CardContent className="pt-4 pb-3">
                  {/* Author */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-600/30 to-blue-600/30 flex items-center justify-center text-2xl shrink-0">
                      {post.authorEmoji}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5">
                        <p className="font-black text-sm">{post.author}</p>
                        {post.verified && (
                          <span className="text-blue-400 text-xs">✓</span>
                        )}
                        {post.reward && (
                          <Badge className="text-xs bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                            🎁 {post.reward}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {post.time}
                      </p>
                    </div>
                    <button
                      className="text-muted-foreground hover:text-white"
                      onClick={() => toast.info("More options...")}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Content */}
                  <p className="text-sm leading-relaxed mb-3">{post.content}</p>

                  {/* Image placeholder */}
                  {post.type === "image" && (
                    <div className="aspect-video rounded-xl bg-gradient-to-br from-pink-900/30 to-purple-900/30 flex items-center justify-center mb-3">
                      <span className="text-6xl">🎨</span>
                    </div>
                  )}

                  {/* Poll */}
                  {post.type === "poll" && post.pollOptions && (
                    <div className="space-y-2 mb-3">
                      {post.pollOptions.map((option, idx) => {
                        const pct =
                          totalPollVotes > 0
                            ? Math.round((option.votes / totalPollVotes) * 100)
                            : 0;
                        const voted = votedPolls[post.id] === idx;
                        return (
                          <button
                            key={option.text}
                            className={`w-full p-2.5 rounded-xl border text-left transition-all relative overflow-hidden ${voted ? "border-purple-500/50 bg-purple-500/10" : "border-border/50 hover:border-border/80"}`}
                            onClick={() => votePoll(post.id, idx)}
                          >
                            <div
                              className="absolute inset-0 bg-purple-500/10 transition-all"
                              style={{
                                width:
                                  votedPolls[post.id] !== undefined
                                    ? `${pct}%`
                                    : "0%",
                              }}
                            />
                            <div className="relative flex items-center justify-between">
                              <span className="text-sm font-medium">
                                {option.text}
                              </span>
                              {votedPolls[post.id] !== undefined && (
                                <span className="text-xs font-bold text-purple-400">
                                  {pct}%
                                </span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                      <p className="text-xs text-muted-foreground">
                        {totalPollVotes.toLocaleString()} votes
                      </p>
                    </div>
                  )}

                  {/* Tags */}
                  {post.tags.length > 0 && (
                    <div className="flex gap-1 flex-wrap mb-3">
                      {post.tags.map(tag => (
                        <span
                          key={tag}
                          className="text-xs text-purple-400 cursor-pointer hover:underline"
                          onClick={() => toast.info(`Searching #${tag}...`)}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-1 pt-2 border-t border-border/30">
                    <button
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs transition-colors ${post.liked ? "text-red-400 bg-red-500/10" : "text-muted-foreground hover:text-red-400"}`}
                      onClick={() => toggleLike(post.id)}
                    >
                      <Heart
                        className={`h-4 w-4 ${post.liked ? "fill-red-400" : ""}`}
                      />
                      {post.likes.toLocaleString()}
                    </button>
                    <button
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs text-muted-foreground hover:text-blue-400 transition-colors"
                      onClick={() => toast.info("Opening comments...")}
                    >
                      <MessageCircle className="h-4 w-4" />
                      {post.comments.toLocaleString()}
                    </button>
                    <button
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs text-muted-foreground hover:text-green-400 transition-colors"
                      onClick={() => toast.success("Shared! +2 SKY4444 ⚡")}
                    >
                      <Share2 className="h-4 w-4" />
                      {post.shares.toLocaleString()}
                    </button>
                    <button
                      className={`ml-auto px-3 py-1.5 rounded-xl text-xs transition-colors ${post.saved ? "text-yellow-400 bg-yellow-500/10" : "text-muted-foreground hover:text-yellow-400"}`}
                      onClick={() => toggleSave(post.id)}
                    >
                      <Bookmark
                        className={`h-4 w-4 ${post.saved ? "fill-yellow-400" : ""}`}
                      />
                    </button>
                    <button
                      className="px-3 py-1.5 rounded-xl text-xs text-muted-foreground hover:text-yellow-400 transition-colors"
                      onClick={() => toast.success("Tipped 5 SKY4444! ⚡")}
                    >
                      <Coins className="h-4 w-4" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
