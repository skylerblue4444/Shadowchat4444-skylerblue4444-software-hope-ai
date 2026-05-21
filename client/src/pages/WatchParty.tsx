import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Users,
  Heart,
  Send,
  Plus,
  Link,
  Crown,
  Coins,
  Smile,
  Share2,
  SkipForward,
  Settings,
  Mic,
  MicOff,
  Video,
  VideoOff,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const PARTY_MEMBERS = [
  {
    id: "1",
    name: "SkyBlue_Trader",
    avatar: "⚡",
    role: "host",
    muted: false,
    cam: true,
  },
  {
    id: "2",
    name: "CryptoKing88",
    avatar: "👑",
    role: "member",
    muted: true,
    cam: false,
  },
  {
    id: "3",
    name: "MoonHodler",
    avatar: "🌕",
    role: "member",
    muted: false,
    cam: true,
  },
  {
    id: "4",
    name: "NFT_Queen",
    avatar: "💎",
    role: "member",
    muted: false,
    cam: false,
  },
  {
    id: "5",
    name: "TrumpArmy",
    avatar: "🇺🇸",
    role: "member",
    muted: true,
    cam: true,
  },
];

const MESSAGES = [
  {
    id: "1",
    user: "CryptoKing88",
    avatar: "👑",
    text: "This is so good! 🔥",
    time: "2m ago",
    tip: null,
  },
  {
    id: "2",
    user: "MoonHodler",
    avatar: "🌕",
    text: "Tipped 100 SKY4444!",
    time: "1m ago",
    tip: 100,
  },
  {
    id: "3",
    user: "NFT_Queen",
    avatar: "💎",
    text: "lmaooo that part 😂",
    time: "45s ago",
    tip: null,
  },
  {
    id: "4",
    user: "TrumpArmy",
    avatar: "🇺🇸",
    text: "WAGMI! 🚀🚀🚀",
    time: "30s ago",
    tip: null,
  },
  {
    id: "5",
    user: "SkyBlue_Trader",
    avatar: "⚡",
    text: "Skip to the next scene?",
    time: "10s ago",
    tip: null,
  },
];

const SUGGESTED = [
  {
    title: "Bitcoin: The Documentary",
    duration: "1:24:00",
    thumbnail: "₿",
    genre: "Crypto",
  },
  {
    title: "The Social Dilemma",
    duration: "1:34:00",
    thumbnail: "📱",
    genre: "Tech",
  },
  {
    title: "Doge to the Moon",
    duration: "0:48:00",
    thumbnail: "🐕",
    genre: "Meme",
  },
];

const REACTIONS = ["🔥", "😂", "❤️", "🚀", "💎", "👑", "⚡", "🌕"];

export default function WatchParty() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [myMuted, setMyMuted] = useState(false);
  const [myCam, setMyCam] = useState(true);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(MESSAGES);
  const [floatingReactions, setFloatingReactions] = useState<
    { id: number; emoji: string }[]
  >([]);
  const [tab, setTab] = useState<"chat" | "members" | "queue">("chat");
  const reactionId = useRef(0);

  const sendMessage = () => {
    if (!message.trim()) return;
    setMessages(prev => [
      ...prev,
      {
        id: String(Date.now()),
        user: "You",
        avatar: "⚡",
        text: message,
        time: "now",
        tip: null,
      },
    ]);
    setMessage("");
  };

  const sendReaction = (emoji: string) => {
    const id = reactionId.current++;
    setFloatingReactions(prev => [...prev, { id, emoji }]);
    setTimeout(
      () => setFloatingReactions(prev => prev.filter(r => r.id !== id)),
      2000
    );
  };

  const sendTip = () => {
    toast.success("Tipped 50 SKY4444 to the party! 🎉");
    setMessages(prev => [
      ...prev,
      {
        id: String(Date.now()),
        user: "You",
        avatar: "⚡",
        text: "Tipped 50 SKY4444!",
        time: "now",
        tip: 50,
      },
    ]);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            🎬 Watch Party
          </h1>
          <p className="text-sm text-muted-foreground">
            Watching:{" "}
            <span className="text-white font-bold">
              Bitcoin: The Documentary
            </span>{" "}
            · {PARTY_MEMBERS.length} watching
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs"
            onClick={() => toast.success("Invite link copied!")}
          >
            <Link className="h-3.5 w-3.5 mr-1.5" />
            Invite
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs"
            onClick={() => toast.info("Opening share menu...")}
          >
            <Share2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Video Player */}
        <div className="lg:col-span-2 space-y-3">
          {/* Player */}
          <div className="relative aspect-video bg-black rounded-2xl overflow-hidden border border-border/30">
            {/* Video placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
              <span className="text-8xl opacity-20">₿</span>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-white font-black text-xl">
                    Bitcoin: The Documentary
                  </p>
                  <p className="text-white/60 text-sm">
                    2024 · 1h 24m · Crypto
                  </p>
                  <p className="text-white/40 text-xs mt-1">
                    00:42:18 / 01:24:00
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Reactions */}
            <AnimatePresence>
              {floatingReactions.map(({ id, emoji }) => (
                <motion.div
                  key={id}
                  initial={{ opacity: 1, y: 0, x: Math.random() * 200 + 50 }}
                  animate={{ opacity: 0, y: -150 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2 }}
                  className="absolute bottom-16 text-4xl pointer-events-none"
                >
                  {emoji}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              {/* Progress Bar */}
              <div className="h-1 bg-white/20 rounded-full mb-3 cursor-pointer">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: "50.4%" }}
                />
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-white"
                >
                  {isPlaying ? (
                    <Pause className="h-6 w-6" />
                  ) : (
                    <Play className="h-6 w-6" />
                  )}
                </button>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-white"
                >
                  {isMuted ? (
                    <VolumeX className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </button>
                <span className="text-white text-xs">00:42:18 / 01:24:00</span>
                <div className="flex-1" />
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                  ● SYNCED
                </Badge>
                <button className="text-white">
                  <Maximize className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Host Badge */}
            <div className="absolute top-3 left-3">
              <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">
                <Crown className="h-3 w-3 mr-1" />
                SkyBlue_Trader is host
              </Badge>
            </div>

            {/* Live Viewers */}
            <div className="absolute top-3 right-3">
              <Badge className="bg-black/60 text-white border-white/10 text-xs">
                <Users className="h-3 w-3 mr-1" />
                {PARTY_MEMBERS.length} watching
              </Badge>
            </div>
          </div>

          {/* My Controls */}
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className={`h-8 text-xs ${myMuted ? "border-red-500/30 text-red-400" : ""}`}
              onClick={() => setMyMuted(!myMuted)}
            >
              {myMuted ? (
                <MicOff className="h-3.5 w-3.5 mr-1.5" />
              ) : (
                <Mic className="h-3.5 w-3.5 mr-1.5" />
              )}
              {myMuted ? "Unmute" : "Mute"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              className={`h-8 text-xs ${!myCam ? "border-red-500/30 text-red-400" : ""}`}
              onClick={() => setMyCam(!myCam)}
            >
              {myCam ? (
                <Video className="h-3.5 w-3.5 mr-1.5" />
              ) : (
                <VideoOff className="h-3.5 w-3.5 mr-1.5" />
              )}
              {myCam ? "Cam On" : "Cam Off"}
            </Button>
            <div className="flex gap-1 ml-2">
              {REACTIONS.map(emoji => (
                <button
                  key={emoji}
                  onClick={() => sendReaction(emoji)}
                  className="h-8 w-8 rounded-xl bg-muted hover:bg-muted/80 flex items-center justify-center text-lg transition-colors"
                >
                  {emoji}
                </button>
              ))}
            </div>
            <div className="flex-1" />
            <Button
              size="sm"
              className="h-8 text-xs bg-yellow-500 text-black border-0 font-bold"
              onClick={sendTip}
            >
              <Coins className="h-3.5 w-3.5 mr-1.5" />
              Tip 50 SKY4444
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-3">
          {/* Tabs */}
          <div className="flex gap-1">
            {(["chat", "members", "queue"] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-2 rounded-xl text-xs font-medium capitalize transition-colors ${tab === t ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground"}`}
              >
                {t}
              </button>
            ))}
          </div>

          {tab === "chat" && (
            <Card className="border-border/50">
              <CardContent className="p-3">
                <div className="space-y-2 h-64 overflow-y-auto mb-3">
                  {messages.map(msg => (
                    <div key={msg.id} className="flex gap-2">
                      <span className="text-xl shrink-0">{msg.avatar}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold">{msg.user}</span>
                          <span className="text-xs text-muted-foreground">
                            {msg.time}
                          </span>
                          {msg.tip && (
                            <Badge className="text-xs bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                              +{msg.tip} SKY4444
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {msg.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Say something..."
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && sendMessage()}
                    className="text-xs h-8"
                  />
                  <Button
                    size="sm"
                    className="h-8 w-8 p-0 bg-blue-600 text-white border-0"
                    onClick={sendMessage}
                  >
                    <Send className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {tab === "members" && (
            <Card className="border-border/50">
              <CardContent className="p-3 space-y-2">
                {PARTY_MEMBERS.map(member => (
                  <div key={member.id} className="flex items-center gap-2">
                    <span className="text-xl">{member.avatar}</span>
                    <div className="flex-1">
                      <p className="text-xs font-bold">{member.name}</p>
                      <div className="flex gap-1">
                        {member.role === "host" && (
                          <Badge className="text-xs bg-yellow-500/10 text-yellow-400 border-yellow-500/20 px-1">
                            Host
                          </Badge>
                        )}
                        {member.muted && (
                          <Badge className="text-xs bg-red-500/10 text-red-400 border-red-500/20 px-1">
                            Muted
                          </Badge>
                        )}
                        {!member.cam && (
                          <Badge className="text-xs bg-gray-500/10 text-gray-400 border-gray-500/20 px-1">
                            No Cam
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="h-2 w-2 rounded-full bg-green-400" />
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="w-full h-8 text-xs mt-2"
                  onClick={() => toast.success("Invite link copied!")}
                >
                  <Plus className="h-3.5 w-3.5 mr-1.5" />
                  Invite Friends
                </Button>
              </CardContent>
            </Card>
          )}

          {tab === "queue" && (
            <Card className="border-border/50">
              <CardContent className="p-3 space-y-2">
                <p className="text-xs text-muted-foreground font-medium">
                  Up Next
                </p>
                {SUGGESTED.map((video, i) => (
                  <div
                    key={video.title}
                    className="flex items-center gap-2 p-2 rounded-xl bg-muted/20"
                  >
                    <span className="text-2xl">{video.thumbnail}</span>
                    <div className="flex-1">
                      <p className="text-xs font-bold">{video.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {video.duration} · {video.genre}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-6 text-xs px-2"
                      onClick={() =>
                        toast.success(`Added ${video.title} to queue`)
                      }
                    >
                      +
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="w-full h-8 text-xs"
                  onClick={() => toast.info("Opening video search...")}
                >
                  <Plus className="h-3.5 w-3.5 mr-1.5" />
                  Add to Queue
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
