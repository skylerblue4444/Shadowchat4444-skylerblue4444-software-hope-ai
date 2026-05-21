import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  MoreHorizontal,
  Image,
  Smile,
  Send,
  TrendingUp,
  Flame,
  Star,
  Zap,
  Users,
  Globe,
  Lock,
  ChevronDown,
  Play,
  Award,
  ArrowUp,
  Repeat2,
  AtSign,
  Hash,
  Plus,
  X,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const MOCK_POSTS = [
  {
    id: 1,
    author: "CryptoWhale_88",
    authorBadge: "🐋",
    avatar: "C",
    gradient: "from-orange-500 to-red-500",
    time: "2 min ago",
    content:
      "TRUMP coin just broke $0.50 resistance! Volume is insane right now. This is the breakout we've been waiting for. 🚀🚀🚀 #TRUMP #Crypto #ToTheMoon",
    likes: 2847,
    comments: 342,
    reposts: 891,
    views: 18432,
    liked: false,
    bookmarked: false,
    tags: ["TRUMP", "Crypto"],
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=300&fit=crop",
  },
  {
    id: 2,
    author: "SkylerBlue_Official",
    authorBadge: "⭐",
    avatar: "S",
    gradient: "from-blue-500 to-cyan-500",
    time: "15 min ago",
    content:
      "SKY4444 ICO Phase 2 is LIVE! 🌌 Early investors get 15% bonus tokens. The platform now has trading, social, IT services, marketplace, and live streaming. This is not financial advice but the utility is REAL. Link in bio. #SKY4444 #ICO",
    likes: 1432,
    comments: 187,
    reposts: 432,
    views: 9821,
    liked: false,
    bookmarked: false,
    tags: ["SKY4444", "ICO"],
    image: null,
  },
  {
    id: 3,
    author: "NFT_Artist_Pro",
    authorBadge: "🎨",
    avatar: "N",
    gradient: "from-purple-500 to-pink-500",
    time: "1 hour ago",
    content:
      "Just dropped my new NFT collection on SkyPlatform! 50 unique pieces, each one a 1/1. Minting live now. First 10 buyers get a special airdrop 🎁 #NFT #Art #Web3",
    likes: 892,
    comments: 124,
    reposts: 287,
    views: 5432,
    liked: false,
    bookmarked: false,
    tags: ["NFT", "Art"],
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=300&fit=crop",
  },
  {
    id: 4,
    author: "DeFi_Wizard",
    authorBadge: "🏦",
    avatar: "D",
    gradient: "from-green-500 to-teal-500",
    time: "3 hours ago",
    content:
      "My DeFi strategy this week: 40% TRUMP staking (12% APY), 30% USDC yield farming (8% APY), 20% SKY4444 ICO, 10% BTC cold storage. Total portfolio up 23% this month. Not financial advice. Always DYOR. #DeFi #Crypto",
    likes: 3241,
    comments: 521,
    reposts: 1204,
    views: 24031,
    liked: false,
    bookmarked: false,
    tags: ["DeFi", "Portfolio"],
    image: null,
  },
  {
    id: 5,
    author: "IT_Pro_Arkansas",
    authorBadge: "💻",
    avatar: "I",
    gradient: "from-indigo-500 to-blue-500",
    time: "5 hours ago",
    content:
      "Just booked a free IT consultation with Skyler Blue IT Resolutions. They found 3 critical vulnerabilities in our network in the first 30 minutes. If you're in NW Arkansas and need managed IT, these guys are legit. 479-406-7123 #IT #Cybersecurity #Arkansas",
    likes: 421,
    comments: 67,
    reposts: 143,
    views: 3821,
    liked: false,
    bookmarked: false,
    tags: ["IT", "Arkansas"],
    image: null,
  },
];

const TRENDING = [
  { tag: "#TRUMP", posts: "48.2K" },
  { tag: "#SKY4444", posts: "12.1K" },
  { tag: "#NFT", posts: "89.4K" },
  { tag: "#DeFi", posts: "34.7K" },
  { tag: "#ITServices", posts: "5.2K" },
];

function PostCard({ post: initialPost }: { post: (typeof MOCK_POSTS)[0] }) {
  const [post, setPost] = useState(initialPost);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");

  const toggleLike = () => {
    setPost(p => ({
      ...p,
      liked: !p.liked,
      likes: p.liked ? p.likes - 1 : p.likes + 1,
    }));
  };

  const toggleBookmark = () => {
    setPost(p => ({ ...p, bookmarked: !p.bookmarked }));
    toast.success(post.bookmarked ? "Removed from saved" : "Post saved!");
  };

  return (
    <Card className="border-border/50 hover:border-blue-500/20 transition-colors">
      <CardContent className="pt-4">
        {/* Author */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div
              className={`h-10 w-10 rounded-full bg-gradient-to-br ${post.gradient} flex items-center justify-center text-white font-bold text-sm shrink-0`}
            >
              {post.avatar}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm">{post.author}</span>
                <span>{post.authorBadge}</span>
              </div>
              <p className="text-xs text-muted-foreground">{post.time}</p>
            </div>
          </div>
          <button className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors text-muted-foreground">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <p className="text-sm leading-relaxed mb-3">{post.content}</p>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {post.tags.map(tag => (
              <Badge
                key={tag}
                className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-xs cursor-pointer hover:bg-blue-500/20 transition-colors"
              >
                #{tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Image */}
        {post.image && (
          <div className="rounded-xl overflow-hidden mb-3">
            <img src={post.image} alt="" className="w-full h-48 object-cover" />
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
          <span>{post.views.toLocaleString()} views</span>
          <span>{post.reposts.toLocaleString()} reposts</span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-border/40">
          <div className="flex items-center gap-1">
            <button
              onClick={toggleLike}
              className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs transition-colors ${post.liked ? "text-red-400 bg-red-500/10" : "text-muted-foreground hover:bg-muted hover:text-red-400"}`}
            >
              <Heart
                className={`h-4 w-4 ${post.liked ? "fill-red-400" : ""}`}
              />
              {post.likes.toLocaleString()}
            </button>
            <button
              onClick={() => setShowComments(s => !s)}
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs text-muted-foreground hover:bg-muted hover:text-blue-400 transition-colors"
            >
              <MessageSquare className="h-4 w-4" />
              {post.comments.toLocaleString()}
            </button>
            <button
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs text-muted-foreground hover:bg-muted hover:text-green-400 transition-colors"
              onClick={() => toast.success("Reposted!")}
            >
              <Repeat2 className="h-4 w-4" />
              {post.reposts.toLocaleString()}
            </button>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={toggleBookmark}
              className={`h-8 w-8 flex items-center justify-center rounded-lg transition-colors ${post.bookmarked ? "text-yellow-400 bg-yellow-500/10" : "text-muted-foreground hover:bg-muted"}`}
            >
              <Bookmark
                className={`h-4 w-4 ${post.bookmarked ? "fill-yellow-400" : ""}`}
              />
            </button>
            <button
              className="h-8 w-8 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-muted transition-colors"
              onClick={() => toast.success("Link copied!")}
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Comments */}
        <AnimatePresence>
          {showComments && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 pt-3 border-t border-border/40"
            >
              <div className="flex gap-2">
                <div className="h-7 w-7 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  Y
                </div>
                <div className="flex-1 flex gap-2">
                  <input
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="flex-1 h-8 rounded-lg border border-input bg-background px-3 text-xs focus:outline-none focus:ring-1 focus:ring-ring"
                    onKeyDown={e => {
                      if (e.key === "Enter" && comment.trim()) {
                        toast.success("Comment posted!");
                        setComment("");
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      if (comment.trim()) {
                        toast.success("Comment posted!");
                        setComment("");
                      }
                    }}
                    className="h-8 w-8 flex items-center justify-center rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}

export default function SocialFeed() {
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [activeTab, setActiveTab] = useState<
    "for-you" | "following" | "trending"
  >("for-you");
  const [postVisibility, setPostVisibility] = useState<"public" | "followers">(
    "public"
  );
  const utils = trpc.useUtils();
  const { data: beginnerPlus } =
    trpc.platform.beginnerPlusBusinessMode.useQuery();
  const { data: beginnerPlusHistory, isLoading: beginnerPlusHistoryLoading } =
    trpc.platform.recentBeginnerPlusBusinessIntents.useQuery(
      { limit: 5 },
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

  const handleBeginnerPlusReview = () => {
    if (!content.trim()) {
      toast.error("Write a draft before opening Beginner Plus review.");
      return;
    }
    beginnerPlusIntent.mutate({
      action: "publish-guided-post",
      acceptBusinessGuidance: true,
      note: content.slice(0, 500),
    });
  };

  const handlePost = () => {
    if (!content.trim()) {
      toast.error("Write something first!");
      return;
    }
    const newPost = {
      id: Date.now(),
      author: "You",
      authorBadge: "✨",
      avatar: "Y",
      gradient: "from-blue-500 to-cyan-500",
      time: "Just now",
      content,
      likes: 0,
      comments: 0,
      reposts: 0,
      views: 1,
      liked: false,
      bookmarked: false,
      tags: [],
      image: null,
    };
    setPosts(prev => [newPost, ...prev]);
    setContent("");
    toast.success("Post published!");
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* Main Feed */}
      <div className="xl:col-span-2 space-y-4">
        {/* Compose */}
        <Card className="border-border/50">
          <CardContent className="pt-4">
            <div className="flex gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                Y
              </div>
              <div className="flex-1">
                <Textarea
                  placeholder="What's happening in Web3 today?"
                  className="resize-none border-0 bg-transparent p-0 text-sm focus-visible:ring-0 min-h-[80px]"
                  value={content}
                  onChange={e => setContent(e.target.value)}
                />
                <div className="flex items-center justify-between pt-3 border-t border-border/40 mt-2">
                  <div className="flex items-center gap-1">
                    <button className="h-8 w-8 flex items-center justify-center rounded-lg text-blue-400 hover:bg-blue-500/10 transition-colors">
                      <Image className="h-4 w-4" />
                    </button>
                    <button className="h-8 w-8 flex items-center justify-center rounded-lg text-blue-400 hover:bg-blue-500/10 transition-colors">
                      <Hash className="h-4 w-4" />
                    </button>
                    <button className="h-8 w-8 flex items-center justify-center rounded-lg text-blue-400 hover:bg-blue-500/10 transition-colors">
                      <Smile className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() =>
                        setPostVisibility(v =>
                          v === "public" ? "followers" : "public"
                        )
                      }
                      className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs text-blue-400 hover:bg-blue-500/10 transition-colors"
                    >
                      {postVisibility === "public" ? (
                        <Globe className="h-3.5 w-3.5" />
                      ) : (
                        <Lock className="h-3.5 w-3.5" />
                      )}
                      {postVisibility === "public" ? "Public" : "Followers"}
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 text-xs"
                      onClick={handleBeginnerPlusReview}
                      disabled={!content.trim() || beginnerPlusIntent.isPending}
                    >
                      <Star className="h-3.5 w-3.5 mr-1.5" />
                      Beginner Plus
                    </Button>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0 h-8"
                      onClick={handlePost}
                      disabled={!content.trim()}
                    >
                      <Send className="h-3.5 w-3.5 mr-1.5" />
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feed Tabs */}
        <div className="flex gap-1 border-b border-border/40">
          {(["for-you", "following", "trending"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium capitalize transition-colors ${activeTab === tab ? "border-b-2 border-blue-500 text-blue-400" : "text-muted-foreground hover:text-foreground"}`}
            >
              {tab.replace("-", " ")}
            </button>
          ))}
        </div>

        {/* Posts */}
        <div className="space-y-4">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <PostCard post={post} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-4">
        {/* Trending */}
        <Card className="border-border/50">
          <CardContent className="pt-4">
            <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-orange-400" />
              Trending
            </h3>
            <div className="space-y-3">
              {TRENDING.map((t, i) => (
                <div
                  key={t.tag}
                  className="flex items-center justify-between cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors"
                >
                  <div>
                    <p className="text-xs text-muted-foreground">
                      #{i + 1} Trending
                    </p>
                    <p className="font-semibold text-sm text-blue-400">
                      {t.tag}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {t.posts} posts
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Beginner Plus Business Guidance */}
        <Card className="border-blue-500/20 bg-gradient-to-br from-blue-950/30 to-cyan-950/10">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 mb-2">
              <Award className="h-4 w-4 text-blue-400" />
              <span className="font-bold text-sm">
                Beginner Plus business mode
              </span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              {beginnerPlus?.plainLanguagePromise ??
                "Guided business posting, creator proof, privacy reminders, and user-confirmed publishing are loading."}
            </p>
            <div className="space-y-2 mb-3">
              {(beginnerPlus?.feedGuidance ?? [])
                .slice(0, 3)
                .map(
                  (item: {
                    key: string;
                    label: string;
                    description: string;
                  }) => (
                    <div
                      key={item.key}
                      className="rounded-lg border border-blue-500/10 bg-blue-500/5 p-2"
                    >
                      <p className="text-xs font-semibold text-blue-300">
                        {item.label}
                      </p>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  )
                )}
            </div>
            <Button
              size="sm"
              variant="outline"
              className="w-full h-8 text-xs"
              onClick={handleBeginnerPlusReview}
              disabled={!content.trim() || beginnerPlusIntent.isPending}
            >
              <Star className="h-3.5 w-3.5 mr-1.5" />
              Queue guided post review
            </Button>
          </CardContent>
        </Card>

        {/* Beginner Plus Durable History */}
        <Card className="border-emerald-500/20 bg-gradient-to-br from-emerald-950/20 to-blue-950/10">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between gap-2 mb-2">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <Clock className="h-4 w-4 text-emerald-400" />
                Saved review history
              </h3>
              <Badge variant="outline">
                {beginnerPlusHistory?.intents?.length ?? 0} recent
              </Badge>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed mb-3">
              {beginnerPlusHistory?.betaNotice ??
                "Beginner Plus review history loads signed-in saved actions for transparency before any provider-gated publishing, monetization, or partner activation."}
            </p>
            <div className="space-y-2">
              {(beginnerPlusHistory?.intents ?? [])
                .slice(0, 4)
                .map((intent: any) => (
                  <div
                    key={intent.id}
                    className="rounded-lg border border-emerald-500/10 bg-emerald-500/5 p-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-semibold capitalize text-emerald-300">
                        {intent.action.replace(/-/g, " ")}
                      </p>
                      <Badge className="border-cyan-500/20 bg-cyan-500/10 text-cyan-300 text-[10px]">
                        {intent.reviewStatus}
                      </Badge>
                    </div>
                    <p className="text-[11px] text-muted-foreground line-clamp-2">
                      {intent.note ?? intent.status}
                    </p>
                    <p className="mt-1 text-[10px] text-muted-foreground">
                      {new Date(intent.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              {!(beginnerPlusHistory?.intents ?? []).length && (
                <div className="rounded-lg border border-border/40 p-3 text-[11px] text-muted-foreground">
                  {beginnerPlusHistoryLoading
                    ? "Loading saved review history..."
                    : "No saved Beginner Plus business intents yet. Draft a post and queue guided review to create the first durable entry."}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Who to Follow */}
        <Card className="border-border/50">
          <CardContent className="pt-4">
            <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
              <Users className="h-4 w-4 text-cyan-400" />
              Who to Follow
            </h3>
            <div className="space-y-3">
              {[
                {
                  name: "SkylerBlue_Official",
                  badge: "⭐",
                  desc: "IT Resolutions & Web3",
                  gradient: "from-blue-500 to-cyan-500",
                  avatar: "S",
                },
                {
                  name: "CryptoWhale_88",
                  badge: "🐋",
                  desc: "Crypto trader & analyst",
                  gradient: "from-orange-500 to-red-500",
                  avatar: "C",
                },
                {
                  name: "NFT_Artist_Pro",
                  badge: "🎨",
                  desc: "Digital artist & NFT creator",
                  gradient: "from-purple-500 to-pink-500",
                  avatar: "N",
                },
              ].map(user => (
                <div
                  key={user.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-8 w-8 rounded-full bg-gradient-to-br ${user.gradient} flex items-center justify-center text-white text-xs font-bold`}
                    >
                      {user.avatar}
                    </div>
                    <div>
                      <p className="text-xs font-semibold">
                        {user.name} {user.badge}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {user.desc}
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs"
                    onClick={() => toast.success(`Following ${user.name}!`)}
                  >
                    Follow
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Beginner Plus Thought Process */}
        <Card className="border-purple-500/20 bg-gradient-to-br from-purple-950/20 to-blue-950/10">
          <CardContent className="pt-4">
            <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
              <Globe className="h-4 w-4 text-purple-400" />
              Business thought process
            </h3>
            <div className="space-y-2">
              {(beginnerPlus?.businessThoughtProcess ?? [])
                .slice(0, 5)
                .map(
                  (step: { step: number; title: string; prompt: string }) => (
                    <div key={step.step} className="flex gap-2">
                      <Badge
                        variant="outline"
                        className="h-5 min-w-5 justify-center text-[10px]"
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
                  )
                )}
            </div>
          </CardContent>
        </Card>

        {/* SKY4444 ICO Banner */}
        <Card className="border-cyan-500/20 bg-gradient-to-br from-cyan-950/30 to-blue-950/20">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-cyan-400" />
              <span className="font-bold text-sm">SKY4444 ICO Phase 2</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Early investors get 15% bonus tokens. Limited allocation
              remaining.
            </p>
            <div className="w-full bg-muted rounded-full h-2 mb-2">
              <div
                className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full"
                style={{ width: "67%" }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mb-3">
              <span>67% filled</span>
              <span>$2.1M / $3.2M</span>
            </div>
            <Button
              size="sm"
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white border-0 h-8 text-xs"
            >
              Buy SKY4444 — 15% Bonus
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
