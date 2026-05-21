import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  X,
  Star,
  Zap,
  MessageCircle,
  Settings,
  ChevronRight,
  Shield,
  Lock,
  Flame,
  MapPin,
  Coins,
  Eye,
  EyeOff,
  Crown,
  Gift,
  Camera,
  Filter,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

const PROFILES = [
  {
    id: 1,
    name: "Alex K.",
    age: 28,
    location: "Miami, FL",
    bio: "Crypto trader by day, beach lover by night. TRUMP holder 🇺🇸 Looking for someone who understands the blockchain life.",
    tags: ["Crypto", "Travel", "Fitness"],
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    verified: true,
    premium: true,
    skyBalance: 4444,
    match: 94,
  },
  {
    id: 2,
    name: "Jordan M.",
    age: 26,
    location: "Austin, TX",
    bio: "NFT artist and DeFi enthusiast. SKY4444 maximalist ⚡ Let's build something beautiful together.",
    tags: ["Art", "DeFi", "Music"],
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop",
    verified: true,
    premium: false,
    skyBalance: 12000,
    match: 88,
  },
  {
    id: 3,
    name: "Sam R.",
    age: 31,
    location: "New York, NY",
    bio: "Tech entrepreneur, DAO voter, and coffee addict. Building the future one block at a time.",
    tags: ["Tech", "DAO", "Coffee"],
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop",
    verified: false,
    premium: true,
    skyBalance: 88888,
    match: 79,
  },
];

const MATCHES = [
  {
    name: "Alex K.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
    new: true,
    lastMsg: "Hey! Love your NFT collection 🎨",
  },
  {
    name: "Jordan M.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop",
    new: false,
    lastMsg: "Want to grab coffee and talk DeFi?",
  },
  {
    name: "Sam R.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop",
    new: true,
    lastMsg: "I voted YES on the latest DAO proposal 🏛️",
  },
];

const AI_SUGGESTIONS = [
  "Alex shares your interest in crypto trading — 94% compatibility based on your portfolio style",
  "Jordan's NFT art style matches your collection preferences — send a SuperLike!",
  "Sam is a DAO voter like you — great conversation starter about governance",
];

export default function Dating() {
  const [tab, setTab] = useState<"discover" | "matches" | "ai" | "settings">(
    "discover"
  );
  const [currentProfile, setCurrentProfile] = useState(0);
  const [nsfwEnabled, setNsfwEnabled] = useState(false);
  const [ageRange, setAgeRange] = useState([21, 45]);
  const [distance, setDistance] = useState([50]);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [superliked, setSuperliked] = useState(false);

  const profile = PROFILES[currentProfile % PROFILES.length];

  const swipe = (dir: "left" | "right") => {
    setDirection(dir);
    if (dir === "right") toast.success(`💚 You liked ${profile.name}!`);
    else toast.info(`👋 Passed on ${profile.name}`);
    setTimeout(() => {
      setDirection(null);
      setCurrentProfile(p => p + 1);
      setSuperliked(false);
    }, 400);
  };

  const superLike = () => {
    setSuperliked(true);
    toast.success(
      `⭐ Super Liked ${profile.name}! They'll definitely see this.`
    );
    setTimeout(() => {
      setDirection("right");
      setTimeout(() => {
        setDirection(null);
        setCurrentProfile(p => p + 1);
        setSuperliked(false);
      }, 400);
    }, 600);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Heart className="h-6 w-6 text-pink-400" />
            ShadowDate
          </h1>
          <p className="text-sm text-muted-foreground">
            AI-powered Web3 dating — earn SKY4444 for matches
          </p>
        </div>
        <Badge className="bg-pink-500/10 text-pink-400 border-pink-500/20 font-bold">
          💘 3 New Matches
        </Badge>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["discover", "matches", "ai", "settings"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-pink-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "discover" && (
        <div className="space-y-4">
          {/* Swipe Card */}
          <div className="relative flex justify-center">
            <AnimatePresence>
              <motion.div
                key={profile.id}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  rotate:
                    direction === "left" ? -8 : direction === "right" ? 8 : 0,
                  x:
                    direction === "left"
                      ? -200
                      : direction === "right"
                        ? 200
                        : 0,
                }}
                transition={{ duration: 0.3 }}
                className="relative w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl"
                style={{ aspectRatio: "3/4" }}
              >
                <img
                  src={profile.img}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                {/* Match % badge */}
                <div className="absolute top-4 right-4">
                  <Badge className="bg-green-600/90 text-white border-0 font-black text-sm">
                    ⚡ {profile.match}% Match
                  </Badge>
                </div>
                {profile.verified && (
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-blue-600/90 text-white border-0">
                      ✓ Verified
                    </Badge>
                  </div>
                )}
                {superliked && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Star className="h-24 w-24 text-yellow-400 drop-shadow-2xl" />
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-end justify-between mb-2">
                    <div>
                      <p className="font-black text-2xl text-white">
                        {profile.name}, {profile.age}
                      </p>
                      <p className="text-sm text-white/70 flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {profile.location}
                      </p>
                    </div>
                    {profile.premium && (
                      <Crown className="h-6 w-6 text-yellow-400" />
                    )}
                  </div>
                  <p className="text-sm text-white/80 mb-3 line-clamp-2">
                    {profile.bio}
                  </p>
                  <div className="flex gap-1.5 flex-wrap mb-3">
                    {profile.tags.map(tag => (
                      <Badge
                        key={tag}
                        className="text-xs bg-white/10 text-white border-white/20"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <Coins className="h-4 w-4 text-yellow-400" />
                    <p className="text-xs text-white/70">
                      Holds {profile.skyBalance.toLocaleString()} SKY4444
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center items-center gap-5">
            <button
              onClick={() => swipe("left")}
              className="h-14 w-14 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center hover:bg-red-500/20 transition-colors"
            >
              <X className="h-7 w-7 text-red-400" />
            </button>
            <button
              onClick={superLike}
              className="h-12 w-12 rounded-full bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center hover:bg-yellow-500/20 transition-colors"
            >
              <Star className="h-6 w-6 text-yellow-400" />
            </button>
            <button
              onClick={() => swipe("right")}
              className="h-14 w-14 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center hover:bg-green-500/20 transition-colors"
            >
              <Heart className="h-7 w-7 text-green-400" />
            </button>
            <button
              onClick={() =>
                toast.info("Boost active — you're top of the stack for 30 min!")
              }
              className="h-12 w-12 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center hover:bg-purple-500/20 transition-colors"
            >
              <Zap className="h-6 w-6 text-purple-400" />
            </button>
          </div>

          {/* TRUMP/SKY Discount Banner */}
          <Card className="border-yellow-500/20 bg-yellow-900/10">
            <CardContent className="py-3 px-4">
              <p className="text-xs font-bold text-yellow-400 flex items-center gap-2">
                <Crown className="h-4 w-4" />
                TRUMP & SKY4444 Holders Get Premium Dating FREE
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Hold 1,000+ SKY4444 or any TRUMP to unlock unlimited likes,
                boosts, and SuperLikes
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "matches" && (
        <div className="space-y-3">
          <p className="text-xs font-bold text-muted-foreground">
            YOUR MATCHES ({MATCHES.length})
          </p>
          {MATCHES.map(match => (
            <Card
              key={match.name}
              className="border-border/50 cursor-pointer hover:border-pink-500/20 transition-all"
              onClick={() => toast.info(`Opening chat with ${match.name}...`)}
            >
              <CardContent className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={match.img}
                      alt={match.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    {match.new && (
                      <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-pink-500 border-2 border-background" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{match.name}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {match.lastMsg}
                    </p>
                  </div>
                  {match.new && (
                    <Badge className="text-xs bg-pink-500/10 text-pink-400 border-pink-500/20">
                      New
                    </Badge>
                  )}
                  <MessageCircle className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
          <Button
            className="w-full h-9 text-xs bg-pink-600 text-white border-0"
            onClick={() => toast.info("Sending SKY4444 tip to all matches...")}
          >
            <Gift className="h-3.5 w-3.5 mr-1.5" />
            Send SKY4444 to All Matches
          </Button>
        </div>
      )}

      {tab === "ai" && (
        <div className="space-y-3">
          <Card className="border-purple-500/20 bg-purple-900/10">
            <CardContent className="py-4 px-4">
              <p className="font-black text-sm mb-1 flex items-center gap-2">
                <Zap className="h-4 w-4 text-purple-400" />
                AI Dating Assistant
              </p>
              <p className="text-xs text-muted-foreground mb-3">
                Your personal AI matchmaker — analyzes compatibility, suggests
                openers, and optimizes your profile.
              </p>
              <div className="space-y-2">
                {AI_SUGGESTIONS.map((s, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl bg-muted/20 flex items-start gap-2"
                  >
                    <Star className="h-4 w-4 text-yellow-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground">{s}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          {[
            {
              label: "Optimize My Profile",
              desc: "AI rewrites your bio for 3x more matches",
              icon: "✍️",
            },
            {
              label: "Generate Ice Breakers",
              desc: "AI crafts personalized opening messages",
              icon: "💬",
            },
            {
              label: "Compatibility Analysis",
              desc: "Deep AI analysis of your match queue",
              icon: "🔬",
            },
            {
              label: "Auto-Post to Dating Apps",
              desc: "AI posts your profile to Tinder, Bumble, Hinge",
              icon: "📱",
            },
          ].map(action => (
            <Card
              key={action.label}
              className="border-border/50 cursor-pointer hover:border-purple-500/20 transition-all"
              onClick={() => toast.info(`${action.label}...`)}
            >
              <CardContent className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{action.icon}</span>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{action.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {action.desc}
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "settings" && (
        <div className="space-y-3">
          <Card className="border-border/50">
            <CardContent className="py-4 px-4 space-y-4">
              <div>
                <p className="font-bold text-sm mb-3">Discovery Preferences</p>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <p className="text-xs text-muted-foreground">Age Range</p>
                      <p className="text-xs font-bold">
                        {ageRange[0]}–{ageRange[1]}
                      </p>
                    </div>
                    <Slider
                      value={ageRange}
                      onValueChange={setAgeRange}
                      min={18}
                      max={80}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <p className="text-xs text-muted-foreground">Distance</p>
                      <p className="text-xs font-bold">{distance[0]} miles</p>
                    </div>
                    <Slider
                      value={distance}
                      onValueChange={setDistance}
                      min={1}
                      max={500}
                      step={5}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
              <div className="border-t border-border/30 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-sm flex items-center gap-2">
                      {nsfwEnabled ? (
                        <Eye className="h-4 w-4 text-red-400" />
                      ) : (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      )}
                      NSFW Content
                    </p>
                    <p className="text-xs text-muted-foreground">
                      18+ adult content toggle — age verified users only
                    </p>
                  </div>
                  <Switch
                    checked={nsfwEnabled}
                    onCheckedChange={v => {
                      setNsfwEnabled(v);
                      toast.info(
                        v
                          ? "🔞 NSFW mode enabled — 18+ verified"
                          : "NSFW mode disabled"
                      );
                    }}
                  />
                </div>
              </div>
              <div className="border-t border-border/30 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-sm">SKY4444 Holders Only</p>
                    <p className="text-xs text-muted-foreground">
                      Only show profiles that hold SKY4444
                    </p>
                  </div>
                  <Switch
                    defaultChecked
                    onCheckedChange={v =>
                      toast.info(
                        v
                          ? "Filtering to SKY4444 holders"
                          : "Showing all profiles"
                      )
                    }
                  />
                </div>
              </div>
              <div className="border-t border-border/30 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-sm">Privacy Mode</p>
                    <p className="text-xs text-muted-foreground">
                      Hide your profile from non-matches
                    </p>
                  </div>
                  <Switch
                    onCheckedChange={v =>
                      toast.info(v ? "Privacy mode ON" : "Privacy mode OFF")
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          <Button
            className="w-full h-9 text-xs bg-pink-600 text-white border-0"
            onClick={() => toast.success("Dating preferences saved!")}
          >
            Save Preferences
          </Button>
        </div>
      )}
    </div>
  );
}
