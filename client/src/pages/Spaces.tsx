import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mic,
  MicOff,
  Headphones,
  Users,
  Heart,
  Share2,
  Plus,
  Crown,
  Hand,
  Coins,
  Radio,
  Volume2,
  VolumeX,
  Star,
  Clock,
  Globe,
  Lock,
  ChevronRight,
  Bell,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const LIVE_SPACES = [
  {
    id: "s1",
    title:
      "Space Quest Command: supplier drops, creator rooms, and $44 cart reviews",
    host: "Skyler Blue",
    hostEmoji: "⚡",
    speakers: 5,
    listeners: 444,
    topic: "Crypto",
    live: true,
    pinned: true,
    duration: "2:44:08",
    source: "Seeded command room",
  },
  {
    id: "s2",
    title:
      "Economic Powerhouse Room: 11 profit streams and supplier-import playbook",
    host: "CommerceOps",
    hostEmoji: "👑",
    speakers: 4,
    listeners: 880,
    topic: "Commerce",
    live: true,
    pinned: false,
    duration: "0:44:22",
    source: "Admin playbook",
  },
  {
    id: "s3",
    title:
      "Creator Video Shopping Lab: reviews, pictures, and admin-approved orders",
    host: "ShopScout",
    hostEmoji: "💎",
    speakers: 4,
    listeners: 721,
    topic: "Commerce",
    live: true,
    pinned: false,
    duration: "0:32:14",
    source: "Supplier API/import",
  },
  {
    id: "s4",
    title:
      "DeFi Beginner Plus Safety Desk: wallets, reviews, and gated settlement",
    host: "YieldFarmer99",
    hostEmoji: "🌾",
    speakers: 2,
    listeners: 428,
    topic: "DeFi",
    live: true,
    pinned: false,
    duration: "0:12:44",
    source: "Review-first finance",
  },
];

const UPCOMING_SPACES = [
  {
    id: "u1",
    title: "Real Supplier API Setup Clinic",
    host: "Skyler Blue",
    hostEmoji: "⚡",
    scheduled: "Tomorrow 3PM CDT",
    reminded: true,
  },
  {
    id: "u2",
    title: "Admin Catalog Import Sprint",
    host: "CommerceOps",
    hostEmoji: "🇺🇸",
    scheduled: "Friday 7PM CDT",
    reminded: false,
  },
  {
    id: "u3",
    title: "Space Quest Season One Launch",
    host: "MetaKing",
    hostEmoji: "🌐",
    scheduled: "Saturday 2PM CDT",
    reminded: false,
  },
];

const SPEAKERS = [
  {
    name: "Skyler Blue",
    emoji: "⚡",
    role: "host",
    speaking: true,
    muted: false,
  },
  {
    name: "CryptoKing88",
    emoji: "👑",
    role: "speaker",
    speaking: false,
    muted: false,
  },
  {
    name: "NFT_Queen",
    emoji: "💎",
    role: "speaker",
    speaking: true,
    muted: false,
  },
  {
    name: "MoonHodler",
    emoji: "🌕",
    role: "listener",
    speaking: false,
    muted: true,
  },
  {
    name: "TrumpArmy",
    emoji: "🇺🇸",
    role: "listener",
    speaking: false,
    muted: true,
  },
  {
    name: "DeFi_Wizard",
    emoji: "🧙",
    role: "listener",
    speaking: false,
    muted: true,
  },
];

const TOPIC_COLORS: Record<string, string> = {
  Crypto: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Bitcoin: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  NFT: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  DeFi: "bg-green-500/10 text-green-400 border-green-500/20",
  Commerce: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
};

const SPACE_QUEST_DECK = [
  {
    title: "Orbit Room",
    metric: "24/7",
    detail:
      "Seeded audio rooms keep the app feeling active while real backend rooms are added.",
  },
  {
    title: "Supplier Scout",
    metric: "$44",
    detail:
      "Cart-service review fee path aligns video shopping, admin import, and quote approval.",
  },
  {
    title: "Creator Commerce",
    metric: "11x",
    detail:
      "Memberships, tips, fees, ads, boosts, data, drops, bundles, referrals, services, and enterprise tools.",
  },
];

export default function Spaces() {
  const [tab, setTab] = useState<"discover" | "live" | "upcoming" | "create">(
    "discover"
  );
  const [inSpace, setInSpace] = useState<string | null>(null);
  const [myMuted, setMyMuted] = useState(true);
  const [handRaised, setHandRaised] = useState(false);
  const [newSpaceTitle, setNewSpaceTitle] = useState("");
  const [newSpaceTopic, setNewSpaceTopic] = useState("Crypto");

  const currentSpace = LIVE_SPACES.find(s => s.id === inSpace);

  const joinSpace = (id: string) => {
    setInSpace(id);
    setTab("live");
    toast.success("Joined space! 🎙️");
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Radio className="h-6 w-6 text-blue-400" />
            Spaces
          </h1>
          <p className="text-sm text-muted-foreground">
            Always-live audio rooms for Space Quest, supplier shopping, creator
            commerce, and review-first crypto guidance
          </p>
        </div>
        <Button
          className="bg-blue-600 text-white border-0"
          size="sm"
          onClick={() => setTab("create")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Start Space
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {SPACE_QUEST_DECK.map(item => (
          <Card
            key={item.title}
            className="border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-purple-500/5"
          >
            <CardContent className="pt-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-black">{item.title}</p>
                <Badge className="bg-blue-500/10 text-blue-300 border-blue-500/20">
                  {item.metric}
                </Badge>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {item.detail}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* In Space Banner */}
      {inSpace && currentSpace && (
        <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-900/40 to-purple-900/40 border border-blue-500/20">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="h-2 w-2 rounded-full bg-red-400 animate-pulse" />
                <span className="text-xs text-red-400 font-bold">LIVE</span>
                <span className="text-xs text-muted-foreground">
                  {currentSpace.duration}
                </span>
              </div>
              <p className="font-black text-sm">{currentSpace.title}</p>
              <p className="text-xs text-muted-foreground">
                {currentSpace.listeners} listening
              </p>
            </div>
            <Button
              size="sm"
              className="h-7 text-xs bg-red-600 text-white border-0"
              onClick={() => {
                setInSpace(null);
                toast.info("Left space");
              }}
            >
              Leave
            </Button>
          </div>

          {/* Speakers */}
          <div className="flex gap-3 mb-3 overflow-x-auto pb-1">
            {SPEAKERS.filter(s => s.role !== "listener").map(speaker => (
              <div
                key={speaker.name}
                className="flex flex-col items-center gap-1 shrink-0"
              >
                <div
                  className={`relative h-12 w-12 rounded-full flex items-center justify-center text-2xl border-2 ${speaker.speaking ? "border-green-400 shadow-lg shadow-green-400/20" : "border-border/30"}`}
                >
                  {speaker.emoji}
                  {speaker.speaking && (
                    <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-400 flex items-center justify-center">
                      <Volume2 className="h-2.5 w-2.5 text-black" />
                    </div>
                  )}
                </div>
                <p className="text-xs font-medium truncate w-14 text-center">
                  {speaker.name.split("_")[0]}
                </p>
                {speaker.role === "host" && (
                  <Crown className="h-3 w-3 text-yellow-400" />
                )}
              </div>
            ))}
          </div>

          {/* Listeners */}
          <div className="flex gap-2 mb-3">
            {SPEAKERS.filter(s => s.role === "listener").map(listener => (
              <div
                key={listener.name}
                className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-lg"
              >
                {listener.emoji}
              </div>
            ))}
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs text-muted-foreground">
              +{currentSpace.listeners - 6}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className={`h-8 text-xs ${myMuted ? "" : "border-green-500/30 text-green-400"}`}
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
              className={`h-8 text-xs ${handRaised ? "border-yellow-500/30 text-yellow-400" : ""}`}
              onClick={() => {
                setHandRaised(!handRaised);
                toast.info(
                  handRaised
                    ? "Hand lowered"
                    : "Hand raised — host will invite you to speak"
                );
              }}
            >
              <Hand className="h-3.5 w-3.5 mr-1.5" />
              {handRaised ? "Lower Hand" : "Raise Hand"}
            </Button>
            <div className="flex-1" />
            <Button
              size="sm"
              className="h-8 text-xs bg-yellow-500 text-black border-0 font-bold"
              onClick={() => toast.success("Tipped 25 SKY4444 to the host!")}
            >
              <Coins className="h-3.5 w-3.5 mr-1.5" />
              Tip 25 SKY
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-8 text-xs"
              onClick={() => toast.success("Link copied!")}
            >
              <Share2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2">
        {(["discover", "live", "upcoming", "create"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${tab === t ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {(tab === "discover" || tab === "live") && (
        <div className="space-y-3">
          {LIVE_SPACES.map((space, i) => (
            <motion.div
              key={space.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card
                className={`border-border/50 ${space.pinned ? "border-blue-500/20" : ""}`}
              >
                <CardContent className="py-4 px-4">
                  <div className="flex items-start gap-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-800 to-purple-800 flex items-center justify-center text-2xl shrink-0">
                      {space.hostEmoji}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <div className="flex items-center gap-1">
                          <div className="h-2 w-2 rounded-full bg-red-400 animate-pulse" />
                          <span className="text-xs text-red-400 font-bold">
                            LIVE
                          </span>
                        </div>
                        <Badge
                          className={`text-xs ${TOPIC_COLORS[space.topic]}`}
                        >
                          {space.topic}
                        </Badge>
                        {space.pinned && (
                          <Badge className="text-xs bg-blue-500/10 text-blue-400 border-blue-500/20">
                            Pinned
                          </Badge>
                        )}
                        {space.source && (
                          <Badge className="text-xs bg-cyan-500/10 text-cyan-300 border-cyan-500/20">
                            {space.source}
                          </Badge>
                        )}
                      </div>
                      <p className="font-black text-sm leading-tight">
                        {space.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        by {space.host}
                      </p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Mic className="h-3 w-3" />
                          {space.speakers} speakers
                        </span>
                        <span className="flex items-center gap-1">
                          <Headphones className="h-3 w-3" />
                          {space.listeners.toLocaleString()} listening
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {space.duration}
                        </span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className={`h-8 text-xs shrink-0 ${inSpace === space.id ? "bg-red-600 text-white" : "bg-blue-600 text-white"} border-0`}
                      onClick={() =>
                        inSpace === space.id
                          ? setInSpace(null)
                          : joinSpace(space.id)
                      }
                    >
                      {inSpace === space.id ? "Leave" : "Join"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "upcoming" && (
        <div className="space-y-3">
          {UPCOMING_SPACES.map((space, i) => (
            <Card key={space.id} className="border-border/50">
              <CardContent className="py-4 px-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{space.hostEmoji}</span>
                  <div className="flex-1">
                    <p className="font-black text-sm">{space.title}</p>
                    <p className="text-xs text-muted-foreground">
                      by {space.host}
                    </p>
                    <p className="text-xs text-blue-400 mt-0.5">
                      {space.scheduled}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant={space.reminded ? "outline" : "default"}
                    className={`h-7 text-xs shrink-0 ${!space.reminded ? "bg-blue-600 text-white border-0" : ""}`}
                    onClick={() =>
                      toast.success(
                        space.reminded ? "Reminder removed" : "Reminder set!"
                      )
                    }
                  >
                    <Bell className="h-3.5 w-3.5 mr-1" />
                    {space.reminded ? "Reminded" : "Remind Me"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "create" && (
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold">Start a Space</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <label className="text-xs text-muted-foreground">
                Space Title
              </label>
              <Input
                placeholder="What do you want to talk about?"
                value={newSpaceTitle}
                onChange={e => setNewSpaceTitle(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Topic</label>
              <div className="flex gap-2 mt-1 flex-wrap">
                {Object.keys(TOPIC_COLORS).map(topic => (
                  <button
                    key={topic}
                    onClick={() => setNewSpaceTopic(topic)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${newSpaceTopic === topic ? "border-blue-500 bg-blue-500/10 text-blue-400" : "border-border/30 text-muted-foreground"}`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Audience</label>
              <div className="flex gap-2 mt-1">
                {[
                  { icon: Globe, label: "Public" },
                  { icon: Users, label: "Followers" },
                  { icon: Lock, label: "Private" },
                ].map(({ icon: Icon, label }) => (
                  <button
                    key={label}
                    className="flex-1 py-2 rounded-xl text-xs font-medium border border-border/30 text-muted-foreground hover:border-blue-500 hover:text-blue-400 transition-all flex items-center justify-center gap-1"
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <Button
              className="w-full bg-blue-600 text-white border-0 font-bold h-11"
              onClick={() => {
                if (!newSpaceTitle) {
                  toast.error("Enter a title");
                  return;
                }
                toast.success("Space started! Going live...");
                setTab("live");
              }}
            >
              <Radio className="h-4 w-4 mr-2" />
              Start Space Now
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
