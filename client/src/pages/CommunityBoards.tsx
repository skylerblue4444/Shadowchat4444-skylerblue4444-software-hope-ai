import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  ArrowUp,
  ArrowDown,
  Share2,
  Bookmark,
  TrendingUp,
  Flame,
  Clock,
  Plus,
  Search,
  Filter,
  Eye,
  Award,
  Shield,
  Zap,
  Hash,
  ChevronRight,
  Image,
  Link,
  AlignLeft,
  Send,
  X,
  MoreHorizontal,
  Pin,
  Flag,
  Reply,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const BOARDS = [
  {
    id: "crypto",
    name: "/crypto/",
    desc: "All things crypto — prices, news, analysis",
    icon: "₿",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    posts: 48291,
    online: 3421,
  },
  {
    id: "trump",
    name: "/trump/",
    desc: "TRUMP coin community — holders & traders",
    icon: "🇺🇸",
    color: "text-red-400",
    bg: "bg-red-500/10",
    posts: 21043,
    online: 1892,
  },
  {
    id: "sky4444",
    name: "/sky4444/",
    desc: "SKY4444 ICO — early investors & updates",
    icon: "🌌",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    posts: 8932,
    online: 743,
  },
  {
    id: "tech",
    name: "/tech/",
    desc: "Technology, IT, programming, and gadgets",
    icon: "💻",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    posts: 34821,
    online: 2103,
  },
  {
    id: "nft",
    name: "/nft/",
    desc: "NFT art, drops, and marketplace discussion",
    icon: "🎨",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    posts: 15432,
    online: 1204,
  },
  {
    id: "defi",
    name: "/defi/",
    desc: "DeFi protocols, yield farming, and liquidity",
    icon: "🏦",
    color: "text-green-400",
    bg: "bg-green-500/10",
    posts: 12043,
    online: 987,
  },
  {
    id: "memes",
    name: "/memes/",
    desc: "Crypto memes, shitposting, and fun",
    icon: "😂",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    posts: 89432,
    online: 5821,
  },
  {
    id: "marketplace",
    name: "/market/",
    desc: "Buy, sell, and trade crypto & NFTs P2P",
    icon: "🛒",
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    posts: 6821,
    online: 432,
  },
];

const THREADS = [
  {
    id: 1,
    board: "/crypto/",
    title: "TRUMP coin just broke $0.50 resistance — next target $1.00?",
    body: "The chart is looking absolutely insane right now. We just broke through the $0.50 resistance level that's been holding us back for weeks. Volume is up 340% in the last 24 hours. Technical analysis shows a clear path to $1.00 if we can hold above $0.48. What are your price targets?",
    author: "CryptoWhale_88",
    authorBadge: "🐋",
    upvotes: 2847,
    downvotes: 143,
    comments: 342,
    views: 18432,
    time: "2 hours ago",
    pinned: true,
    flair: "Analysis",
    flairColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    replies: [
      {
        user: "BullRunner",
        text: "My target is $2 by end of year. The fundamentals are strong.",
        upvotes: 421,
        time: "1h ago",
      },
      {
        user: "SkepticalSam",
        text: "Be careful, this could be a bull trap. Always DYOR.",
        upvotes: 287,
        time: "1h ago",
      },
      {
        user: "DiamondHands",
        text: "Not selling until $5. Been holding since $0.05 💎🙌",
        upvotes: 892,
        time: "45m ago",
      },
    ],
  },
  {
    id: 2,
    board: "/sky4444/",
    title: "SKY4444 ICO Phase 2 is LIVE — 15% bonus for early investors",
    body: "Phase 2 of the SKY4444 ICO just launched! Early investors get a 15% token bonus. The platform is already live with trading, social features, IT services, and a marketplace. This is not financial advice but the utility here is real. Team has been building non-stop.",
    author: "SkylerBlue_Official",
    authorBadge: "⭐",
    upvotes: 1432,
    downvotes: 89,
    comments: 187,
    views: 9821,
    time: "4 hours ago",
    pinned: false,
    flair: "Official",
    flairColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    replies: [
      {
        user: "EarlyInvestor",
        text: "Already bought in Phase 1. The team delivers!",
        upvotes: 234,
        time: "3h ago",
      },
      {
        user: "NewToSky",
        text: "How do I participate? Any guide?",
        upvotes: 45,
        time: "2h ago",
      },
    ],
  },
  {
    id: 3,
    board: "/memes/",
    title: "When you bought TRUMP at $0.05 and it's now $0.50 [OC]",
    body: "Me watching my portfolio 10x while my friends told me to buy index funds 😂 The meme was real all along. WAGMI frens.",
    author: "MemeKing2024",
    authorBadge: null,
    upvotes: 8932,
    downvotes: 234,
    comments: 891,
    views: 42031,
    time: "6 hours ago",
    pinned: false,
    flair: "Meme",
    flairColor: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    replies: [
      {
        user: "GigaBrain",
        text: "This is literally me 😭💎",
        upvotes: 1204,
        time: "5h ago",
      },
      {
        user: "LateToParty",
        text: "I bought at $0.45... am I gonna make it?",
        upvotes: 432,
        time: "4h ago",
      },
    ],
  },
  {
    id: 4,
    board: "/tech/",
    title: "Skyler Blue IT Resolutions — honest review after 6 months",
    body: "Been using their managed IT services for 6 months now. Here's my honest review: Response times are excellent (under 30 min every time), their cybersecurity team caught a phishing attempt we would have missed, and the pricing is very competitive vs big MSPs. Only complaint is the onboarding took 2 weeks instead of the promised 1. Overall 9/10, would recommend to any small business.",
    author: "BusinessOwner_AR",
    authorBadge: null,
    upvotes: 743,
    downvotes: 21,
    comments: 89,
    views: 4821,
    time: "1 day ago",
    pinned: false,
    flair: "Review",
    flairColor: "bg-green-500/10 text-green-400 border-green-500/20",
    replies: [
      {
        user: "ITManager",
        text: "Thanks for the honest review! We're working on faster onboarding.",
        upvotes: 234,
        time: "20h ago",
      },
    ],
  },
  {
    id: 5,
    board: "/defi/",
    title:
      "I turned $1,000 into $47,000 using DeFi yield strategies — full breakdown",
    body: "Not financial advice but here's exactly what I did over 8 months. Started with $1k, used a combination of liquidity provision, yield farming, and strategic token swaps. The key was compound interest and picking protocols with real utility. Full breakdown in comments.",
    author: "DeFiWizard",
    authorBadge: "💰",
    upvotes: 12043,
    downvotes: 892,
    comments: 1243,
    views: 89432,
    time: "2 days ago",
    pinned: false,
    flair: "Strategy",
    flairColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    replies: [
      {
        user: "YieldFarmer",
        text: "This is incredible. What was your biggest protocol?",
        upvotes: 892,
        time: "1d ago",
      },
      {
        user: "RiskManager",
        text: "Remember: past performance ≠ future results. Be careful.",
        upvotes: 543,
        time: "1d ago",
      },
    ],
  },
];

function ThreadCard({
  thread,
  onOpen,
}: {
  thread: (typeof THREADS)[0];
  onOpen: (t: (typeof THREADS)[0]) => void;
}) {
  const [votes, setVotes] = useState(thread.upvotes - thread.downvotes);
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null);
  const [saved, setSaved] = useState(false);

  const vote = (dir: "up" | "down") => {
    if (userVote === dir) {
      setUserVote(null);
      setVotes(thread.upvotes - thread.downvotes);
    } else {
      setUserVote(dir);
      setVotes(thread.upvotes - thread.downvotes + (dir === "up" ? 1 : -1));
    }
  };

  return (
    <Card className="border-border/50 hover:border-blue-500/20 transition-all">
      <CardContent className="pt-4 pb-4">
        <div className="flex gap-3">
          {/* Vote column */}
          <div className="flex flex-col items-center gap-1 shrink-0">
            <button
              onClick={() => vote("up")}
              className={`h-7 w-7 flex items-center justify-center rounded hover:bg-orange-500/10 transition-colors ${userVote === "up" ? "text-orange-400" : "text-muted-foreground"}`}
            >
              <ArrowUp className="h-4 w-4" />
            </button>
            <span
              className={`text-xs font-bold ${userVote === "up" ? "text-orange-400" : userVote === "down" ? "text-blue-400" : "text-muted-foreground"}`}
            >
              {votes > 999 ? `${(votes / 1000).toFixed(1)}k` : votes}
            </span>
            <button
              onClick={() => vote("down")}
              className={`h-7 w-7 flex items-center justify-center rounded hover:bg-blue-500/10 transition-colors ${userVote === "down" ? "text-blue-400" : "text-muted-foreground"}`}
            >
              <ArrowDown className="h-4 w-4" />
            </button>
          </div>
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <button className="text-xs text-muted-foreground hover:text-blue-400 transition-colors font-medium">
                {thread.board}
              </button>
              <span className="text-muted-foreground text-xs">·</span>
              <span className="text-xs text-muted-foreground">
                Posted by <span className="font-medium">{thread.author}</span>{" "}
                {thread.authorBadge}
              </span>
              <span className="text-xs text-muted-foreground">
                {thread.time}
              </span>
              {thread.pinned && (
                <Badge className="bg-green-500/10 text-green-400 border-green-500/20 text-xs">
                  <Pin className="h-2.5 w-2.5 mr-1" />
                  Pinned
                </Badge>
              )}
              <Badge className={`text-xs ${thread.flairColor}`}>
                {thread.flair}
              </Badge>
            </div>
            <h3
              className="font-bold text-sm mb-2 cursor-pointer hover:text-blue-400 transition-colors"
              onClick={() => onOpen(thread)}
            >
              {thread.title}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
              {thread.body}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onOpen(thread)}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <MessageSquare className="h-3.5 w-3.5" />{" "}
                {thread.comments.toLocaleString()} comments
              </button>
              <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                <Eye className="h-3.5 w-3.5" /> {thread.views.toLocaleString()}
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast.success("Link copied!");
                }}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <Share2 className="h-3.5 w-3.5" /> Share
              </button>
              <button
                onClick={() => {
                  setSaved(s => !s);
                  toast.success(saved ? "Removed from saved" : "Saved!");
                }}
                className={`flex items-center gap-1.5 text-xs transition-colors ${saved ? "text-yellow-400" : "text-muted-foreground hover:text-foreground"}`}
              >
                <Bookmark
                  className={`h-3.5 w-3.5 ${saved ? "fill-yellow-400" : ""}`}
                />{" "}
                {saved ? "Saved" : "Save"}
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ThreadModal({
  thread,
  onClose,
}: {
  thread: (typeof THREADS)[0];
  onClose: () => void;
}) {
  const [replyText, setReplyText] = useState("");
  const [replies, setReplies] = useState(thread.replies);

  const submitReply = () => {
    if (!replyText.trim()) return;
    setReplies(prev => [
      ...prev,
      { user: "You", text: replyText, upvotes: 0, time: "just now" },
    ]);
    setReplyText("");
    toast.success("Reply posted!");
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-start justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-background border border-border rounded-2xl max-w-2xl w-full shadow-2xl my-8"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Badge className={`text-xs ${thread.flairColor}`}>
              {thread.flair}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {thread.board}
            </span>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-5">
          <h2 className="font-bold text-lg mb-2">{thread.title}</h2>
          <p className="text-xs text-muted-foreground mb-4">
            Posted by <span className="font-medium">{thread.author}</span>{" "}
            {thread.authorBadge} · {thread.time}
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            {thread.body}
          </p>
          <div className="border-t border-border pt-4 mb-4">
            <h3 className="font-semibold text-sm mb-3">
              {replies.length} Comments
            </h3>
            <div className="space-y-3">
              {replies.map((r, i) => (
                <div key={i} className="flex gap-3">
                  <div className="h-7 w-7 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {r.user[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold">{r.user}</span>
                      <span className="text-xs text-muted-foreground">
                        {r.time}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {r.text}
                    </p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-orange-400 transition-colors">
                        <ArrowUp className="h-3 w-3" />
                        {r.upvotes}
                      </button>
                      <button className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                        <Reply className="h-3 w-3" />
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Textarea
              placeholder="Write a comment..."
              rows={3}
              value={replyText}
              onChange={e => setReplyText(e.target.value)}
              className="text-sm"
            />
            <Button
              size="sm"
              onClick={submitReply}
              disabled={!replyText.trim()}
            >
              <Send className="h-3.5 w-3.5 mr-1.5" /> Post Comment
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function CommunityBoards() {
  const [activeBoard, setActiveBoard] = useState("all");
  const [sortBy, setSortBy] = useState("hot");
  const [search, setSearch] = useState("");
  const [openThread, setOpenThread] = useState<(typeof THREADS)[0] | null>(
    null
  );
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    body: "",
    board: "/crypto/",
  });

  const filteredThreads = THREADS.filter(t => {
    const matchBoard = activeBoard === "all" || t.board === `/${activeBoard}/`;
    const matchSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.body.toLowerCase().includes(search.toLowerCase());
    return matchBoard && matchSearch;
  });

  const submitPost = () => {
    if (!newPost.title.trim()) {
      toast.error("Title required");
      return;
    }
    toast.success("Post submitted! Under review.");
    setShowNewPost(false);
    setNewPost({ title: "", body: "", board: "/crypto/" });
  };

  return (
    <div className="space-y-4">
      {openThread && (
        <ThreadModal thread={openThread} onClose={() => setOpenThread(null)} />
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Hash className="h-6 w-6 text-orange-400" /> Community Boards
          </h1>
          <p className="text-sm text-muted-foreground">
            Discuss, share, and connect with the community
          </p>
        </div>
        <Button
          onClick={() => setShowNewPost(true)}
          className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0"
        >
          <Plus className="h-4 w-4 mr-1.5" /> New Post
        </Button>
      </div>

      {/* New Post Form */}
      <AnimatePresence>
        {showNewPost && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Card className="border-orange-500/30 bg-orange-500/5">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold">Create Post</h3>
                  <button onClick={() => setShowNewPost(false)}>
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
                <div className="space-y-3">
                  <select
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                    value={newPost.board}
                    onChange={e =>
                      setNewPost({ ...newPost, board: e.target.value })
                    }
                  >
                    {BOARDS.map(b => (
                      <option key={b.id} value={`/${b.id}/`}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                  <Input
                    placeholder="Post title..."
                    value={newPost.title}
                    onChange={e =>
                      setNewPost({ ...newPost, title: e.target.value })
                    }
                  />
                  <Textarea
                    placeholder="What's on your mind? (optional)"
                    rows={4}
                    value={newPost.body}
                    onChange={e =>
                      setNewPost({ ...newPost, body: e.target.value })
                    }
                  />
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Image className="h-3.5 w-3.5 mr-1.5" />
                      Image
                    </Button>
                    <Button size="sm" variant="outline">
                      <Link className="h-3.5 w-3.5 mr-1.5" />
                      Link
                    </Button>
                    <Button
                      size="sm"
                      className="ml-auto bg-gradient-to-r from-orange-500 to-red-500 text-white border-0"
                      onClick={submitPost}
                    >
                      <Send className="h-3.5 w-3.5 mr-1.5" /> Post
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
        {/* Boards Sidebar */}
        <div className="xl:col-span-1">
          <Card className="border-border/50">
            <CardContent className="pt-4">
              <h3 className="font-semibold text-sm mb-3">Boards</h3>
              <div className="space-y-1">
                <button
                  onClick={() => setActiveBoard("all")}
                  className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg text-sm transition-colors ${activeBoard === "all" ? "bg-orange-500/10 text-orange-400" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
                >
                  <Flame className="h-4 w-4" /> All Boards
                </button>
                {BOARDS.map(board => (
                  <button
                    key={board.id}
                    onClick={() => setActiveBoard(board.id)}
                    className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg text-sm transition-colors ${activeBoard === board.id ? `${board.bg} ${board.color}` : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
                  >
                    <span>{board.icon}</span>
                    <span className="font-medium">{board.name}</span>
                    <span className="ml-auto text-xs opacity-60">
                      {(board.online / 1000).toFixed(1)}k
                    </span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Thread List */}
        <div className="xl:col-span-3 space-y-3">
          {/* Controls */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search posts..."
                className="pl-9 h-9"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-1">
              {[
                { id: "hot", icon: Flame, label: "Hot" },
                { id: "new", icon: Clock, label: "New" },
                { id: "top", icon: TrendingUp, label: "Top" },
              ].map(s => (
                <button
                  key={s.id}
                  onClick={() => setSortBy(s.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${sortBy === s.id ? "bg-orange-500/10 text-orange-400" : "text-muted-foreground hover:bg-muted"}`}
                >
                  <s.icon className="h-3.5 w-3.5" />
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {filteredThreads.map((thread, i) => (
            <motion.div
              key={thread.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <ThreadCard thread={thread} onOpen={setOpenThread} />
            </motion.div>
          ))}

          {filteredThreads.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p>No posts found. Be the first to post!</p>
              <Button variant="link" onClick={() => setShowNewPost(true)}>
                Create a post
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
