import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  Send,
  Zap,
  Coins,
  Camera,
  Video,
  Type,
  Sticker,
  Music,
  Eye,
  Share2,
  MoreHorizontal,
  Flame,
  Star,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const STORIES = [
  {
    id: "s0",
    user: "You",
    avatar: "🧑‍💻",
    isMe: true,
    hasStory: false,
    stories: [],
  },
  {
    id: "s1",
    user: "CryptoWhale",
    avatar: "🐋",
    hasStory: true,
    stories: [
      {
        type: "image",
        bg: "from-blue-600 to-cyan-600",
        text: "BTC just hit $100K! 🚀🚀🚀",
        emoji: "₿",
        views: 2840,
        reactions: 284,
      },
      {
        type: "image",
        bg: "from-purple-600 to-pink-600",
        text: "My portfolio is up 284% this year 💎",
        emoji: "💎",
        views: 1840,
        reactions: 184,
      },
    ],
  },
  {
    id: "s2",
    user: "SkyBlue_IT",
    avatar: "⚡",
    hasStory: true,
    stories: [
      {
        type: "image",
        bg: "from-cyan-600 to-blue-600",
        text: "SKY4444 is the future of Web3! 🌐",
        emoji: "⚡",
        views: 4200,
        reactions: 420,
      },
    ],
  },
  {
    id: "s3",
    user: "TRUMP_Fan",
    avatar: "🇺🇸",
    hasStory: true,
    stories: [
      {
        type: "image",
        bg: "from-red-600 to-blue-600",
        text: "TRUMP token to the moon! 🚀",
        emoji: "🇺🇸",
        views: 8400,
        reactions: 840,
      },
      {
        type: "image",
        bg: "from-orange-600 to-red-600",
        text: "Just bought 1M TRUMP tokens! 💰",
        emoji: "💰",
        views: 5200,
        reactions: 520,
      },
    ],
  },
  {
    id: "s4",
    user: "NFT_Artist",
    avatar: "🎨",
    hasStory: true,
    stories: [
      {
        type: "image",
        bg: "from-pink-600 to-purple-600",
        text: "New NFT collection dropping tomorrow! 🎨",
        emoji: "🎨",
        views: 1240,
        reactions: 124,
      },
    ],
  },
  {
    id: "s5",
    user: "DeFi_King",
    avatar: "👑",
    hasStory: true,
    stories: [
      {
        type: "image",
        bg: "from-yellow-600 to-orange-600",
        text: "Earning 124% APY on SKY4444 staking! 💸",
        emoji: "💸",
        views: 3400,
        reactions: 340,
      },
    ],
  },
  {
    id: "s6",
    user: "CryptoMom",
    avatar: "💜",
    hasStory: true,
    stories: [
      {
        type: "image",
        bg: "from-purple-600 to-violet-600",
        text: "Teaching my kids about crypto! 📚",
        emoji: "📚",
        views: 680,
        reactions: 68,
      },
    ],
  },
  {
    id: "s7",
    user: "GameFi_Pro",
    avatar: "🎮",
    hasStory: true,
    stories: [
      {
        type: "image",
        bg: "from-green-600 to-emerald-600",
        text: "Won 50,000 SKY4444 in the tournament! 🏆",
        emoji: "🏆",
        views: 2100,
        reactions: 210,
      },
    ],
  },
];

const REACTIONS = ["❤️", "🔥", "💎", "🚀", "⚡", "💰", "🎉", "😱"];

export default function Stories() {
  const [activeStory, setActiveStory] = useState<{
    userIdx: number;
    storyIdx: number;
  } | null>(null);
  const [progress, setProgress] = useState(0);
  const [replyText, setReplyText] = useState("");
  const [showCreate, setShowCreate] = useState(false);

  const activeUser = activeStory !== null ? STORIES[activeStory.userIdx] : null;
  const activeStoryData =
    activeUser && activeStory ? activeUser.stories[activeStory.storyIdx] : null;

  useEffect(() => {
    if (!activeStory) {
      setProgress(0);
      return;
    }
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Auto-advance
          const user = STORIES[activeStory.userIdx];
          if (activeStory.storyIdx < user.stories.length - 1) {
            setActiveStory({
              ...activeStory,
              storyIdx: activeStory.storyIdx + 1,
            });
          } else {
            const nextUserIdx = STORIES.findIndex(
              (s, i) => i > activeStory.userIdx && s.hasStory
            );
            if (nextUserIdx !== -1) {
              setActiveStory({ userIdx: nextUserIdx, storyIdx: 0 });
            } else {
              setActiveStory(null);
            }
          }
          return 0;
        }
        return prev + 2;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [activeStory?.userIdx, activeStory?.storyIdx]);

  const openStory = (userIdx: number) => {
    const user = STORIES[userIdx];
    if (!user.hasStory) {
      setShowCreate(true);
      return;
    }
    setActiveStory({ userIdx, storyIdx: 0 });
  };

  const nextStory = () => {
    if (!activeStory) return;
    const user = STORIES[activeStory.userIdx];
    if (activeStory.storyIdx < user.stories.length - 1) {
      setActiveStory({ ...activeStory, storyIdx: activeStory.storyIdx + 1 });
    } else {
      const nextUserIdx = STORIES.findIndex(
        (s, i) => i > activeStory.userIdx && s.hasStory
      );
      if (nextUserIdx !== -1)
        setActiveStory({ userIdx: nextUserIdx, storyIdx: 0 });
      else setActiveStory(null);
    }
  };

  const prevStory = () => {
    if (!activeStory) return;
    if (activeStory.storyIdx > 0) {
      setActiveStory({ ...activeStory, storyIdx: activeStory.storyIdx - 1 });
    } else if (activeStory.userIdx > 0) {
      const prevUserIdx = [...STORIES]
        .slice(0, activeStory.userIdx)
        .reverse()
        .findIndex(s => s.hasStory);
      if (prevUserIdx !== -1) {
        const actualIdx = activeStory.userIdx - 1 - prevUserIdx;
        setActiveStory({
          userIdx: actualIdx,
          storyIdx: STORIES[actualIdx].stories.length - 1,
        });
      }
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2">
          <Camera className="h-6 w-6 text-pink-400" />
          Stories
        </h1>
        <p className="text-sm text-muted-foreground">
          Ephemeral crypto moments — disappear in 24 hours
        </p>
      </div>

      {/* Story Bubbles */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
        {STORIES.map((story, i) => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer"
            onClick={() => openStory(i)}
          >
            <div
              className={`relative h-16 w-16 rounded-full p-0.5 ${story.hasStory ? "bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500" : "bg-muted"}`}
            >
              <div className="h-full w-full rounded-full bg-background flex items-center justify-center text-2xl">
                {story.isMe && !story.hasStory ? (
                  <div className="relative">
                    <span>{story.avatar}</span>
                    <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-pink-500 flex items-center justify-center">
                      <Plus className="h-3 w-3 text-white" />
                    </div>
                  </div>
                ) : (
                  story.avatar
                )}
              </div>
            </div>
            <p className="text-xs font-medium text-center w-16 truncate">
              {story.isMe ? "Your Story" : story.user}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Story Viewer */}
      <AnimatePresence>
        {activeStory !== null && activeStoryData && activeUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          >
            <div className="relative w-full max-w-sm h-full max-h-screen">
              {/* Progress Bars */}
              <div className="absolute top-4 left-4 right-4 flex gap-1 z-10">
                {activeUser.stories.map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden"
                  >
                    <div
                      className="h-full bg-white rounded-full transition-all"
                      style={{
                        width:
                          i < activeStory.storyIdx
                            ? "100%"
                            : i === activeStory.storyIdx
                              ? `${progress}%`
                              : "0%",
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Story Content */}
              <div
                className={`w-full h-full bg-gradient-to-br ${activeStoryData.bg} flex flex-col items-center justify-center relative`}
              >
                <span className="text-8xl mb-6">{activeStoryData.emoji}</span>
                <p className="text-white text-2xl font-black text-center px-8">
                  {activeStoryData.text}
                </p>

                {/* Header */}
                <div className="absolute top-12 left-4 right-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center text-xl">
                    {activeUser.avatar}
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">
                      {activeUser.user}
                    </p>
                    <p className="text-white/60 text-xs">
                      <Eye className="h-3 w-3 inline mr-0.5" />
                      {activeStoryData.views.toLocaleString()} views
                    </p>
                  </div>
                  <button
                    className="ml-auto text-white"
                    onClick={() => setActiveStory(null)}
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Reactions */}
                <div className="absolute bottom-24 left-4 right-4">
                  <div className="flex gap-2 justify-center mb-3">
                    {REACTIONS.map(r => (
                      <button
                        key={r}
                        className="text-2xl hover:scale-125 transition-transform"
                        onClick={() => toast.success(`Reacted with ${r}`)}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Reply to story..."
                      value={replyText}
                      onChange={e => setReplyText(e.target.value)}
                      className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    />
                    <Button
                      className="bg-white/20 text-white border-0"
                      size="sm"
                      onClick={() => {
                        toast.success("Reply sent!");
                        setReplyText("");
                      }}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Mint as NFT */}
                <div className="absolute bottom-6 left-4 right-4 flex justify-center">
                  <Button
                    className="bg-yellow-500 text-black border-0 font-bold text-xs"
                    size="sm"
                    onClick={() => toast.success("Minting story as NFT!")}
                  >
                    <Coins className="h-3.5 w-3.5 mr-1.5" />
                    Mint as NFT
                  </Button>
                </div>
              </div>

              {/* Navigation */}
              <button
                className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center"
                onClick={prevStory}
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center"
                onClick={nextStory}
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create Story Modal */}
      <AnimatePresence>
        {showCreate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          >
            <Card className="w-full max-w-sm border-border/50">
              <CardContent className="pt-5">
                <div className="flex items-center justify-between mb-4">
                  <p className="font-black">Create Story</p>
                  <button onClick={() => setShowCreate(false)}>
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      label: "Photo/Video",
                      icon: Camera,
                      color: "from-pink-500 to-purple-500",
                    },
                    {
                      label: "Text Story",
                      icon: Type,
                      color: "from-blue-500 to-cyan-500",
                    },
                    {
                      label: "Crypto Update",
                      icon: Coins,
                      color: "from-yellow-500 to-orange-500",
                    },
                    {
                      label: "NFT Showcase",
                      icon: Star,
                      color: "from-purple-500 to-pink-500",
                    },
                  ].map(({ label, icon: Icon, color }) => (
                    <button
                      key={label}
                      className={`p-4 rounded-xl bg-gradient-to-br ${color} flex flex-col items-center gap-2 text-white`}
                      onClick={() => {
                        setShowCreate(false);
                        toast.success(`Creating ${label} story`);
                      }}
                    >
                      <Icon className="h-6 w-6" />
                      <span className="text-xs font-bold">{label}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recent Activity */}
      <div>
        <h3 className="font-bold text-sm mb-3">Story Activity</h3>
        <div className="space-y-2">
          {[
            {
              user: "CryptoWhale",
              action: "reacted 🔥 to your story",
              time: "2m ago",
            },
            {
              user: "TRUMP_Fan",
              action: "replied to your story",
              time: "15m ago",
            },
            {
              user: "NFT_Artist",
              action: "minted your story as NFT",
              time: "1h ago",
            },
          ].map((activity, i) => (
            <div key={i} className="flex items-center gap-3 text-sm">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                {activity.user[0]}
              </div>
              <div className="flex-1">
                <span className="font-medium">{activity.user}</span>
                <span className="text-muted-foreground">
                  {" "}
                  {activity.action}
                </span>
              </div>
              <span className="text-xs text-muted-foreground shrink-0">
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
