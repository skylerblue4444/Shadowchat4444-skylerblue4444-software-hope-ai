import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mic,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  Heart,
  Share2,
  Download,
  Plus,
  Search,
  Clock,
  TrendingUp,
  Star,
  Users,
  Headphones,
  Radio,
  Rss,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const PODCASTS = [
  {
    id: "p1",
    title: "ShadowChat Weekly",
    host: "Skyler Blue",
    emoji: "⚡",
    category: "Crypto",
    subscribers: 48400,
    episodes: 84,
    rating: 4.9,
    latest: "Episode 84: SKY4444 ICO Launch",
  },
  {
    id: "p2",
    title: "Bitcoin Maximalist",
    host: "SatoshiGhost",
    emoji: "₿",
    category: "Bitcoin",
    subscribers: 284000,
    episodes: 312,
    rating: 4.8,
    latest: "BTC to $200K? The Bull Case",
  },
  {
    id: "p3",
    title: "DeFi Deep Dive",
    host: "YieldFarmer99",
    emoji: "🌾",
    category: "DeFi",
    subscribers: 92000,
    episodes: 148,
    rating: 4.7,
    latest: "Liquidity Mining Strategies 2025",
  },
  {
    id: "p4",
    title: "NFT Insider",
    host: "NFT_Queen",
    emoji: "🎨",
    category: "NFT",
    subscribers: 64000,
    episodes: 96,
    rating: 4.6,
    latest: "Genesis Pass: Why It Matters",
  },
  {
    id: "p5",
    title: "Meme Coin Report",
    host: "DOGE_Lord",
    emoji: "🐕",
    category: "Meme",
    subscribers: 128000,
    episodes: 204,
    rating: 4.5,
    latest: "TRUMP Coin: Hype or Reality?",
  },
];

const EPISODES = [
  {
    id: "e1",
    podcast: "ShadowChat Weekly",
    title: "Episode 84: SKY4444 ICO Launch — Everything You Need to Know",
    duration: "1:12:44",
    date: "May 14, 2025",
    plays: 12400,
    liked: true,
  },
  {
    id: "e2",
    podcast: "ShadowChat Weekly",
    title: "Episode 83: Building a Web3 Super-App from Scratch",
    duration: "0:58:22",
    date: "May 7, 2025",
    plays: 9800,
    liked: false,
  },
  {
    id: "e3",
    podcast: "Bitcoin Maximalist",
    title: "BTC to $200K? The Bull Case for 2025",
    duration: "1:24:08",
    date: "May 13, 2025",
    plays: 84000,
    liked: true,
  },
  {
    id: "e4",
    podcast: "DeFi Deep Dive",
    title: "Liquidity Mining Strategies That Actually Work in 2025",
    duration: "0:48:32",
    date: "May 12, 2025",
    plays: 28400,
    liked: false,
  },
  {
    id: "e5",
    podcast: "NFT Insider",
    title: "Genesis Pass: Why ShadowChat's NFT Changes Everything",
    duration: "0:38:14",
    date: "May 11, 2025",
    plays: 18200,
    liked: false,
  },
];

export default function Podcast() {
  const [tab, setTab] = useState<
    "discover" | "episodes" | "subscribed" | "create"
  >("discover");
  const [search, setSearch] = useState("");
  const [playing, setPlaying] = useState<string | null>("e1");
  const [progress, setProgress] = useState(34);
  const [liked, setLiked] = useState<Record<string, boolean>>({
    e1: true,
    e3: true,
  });

  const currentEpisode = EPISODES.find(e => e.id === playing);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2">
          <Mic className="h-6 w-6 text-red-400" />
          Podcasts
        </h1>
        <p className="text-sm text-muted-foreground">
          Crypto, tech, and Web3 podcasts — listen, subscribe, create
        </p>
      </div>

      {/* Now Playing */}
      {currentEpisode && (
        <div className="p-4 rounded-2xl bg-gradient-to-br from-red-900/30 to-purple-900/30 border border-red-500/20">
          <p className="text-xs text-muted-foreground mb-1">Now Playing</p>
          <p className="font-black text-sm leading-tight mb-1">
            {currentEpisode.title}
          </p>
          <p className="text-xs text-muted-foreground mb-3">
            {currentEpisode.podcast}
          </p>
          <Progress value={progress} className="h-1.5 mb-2" />
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
            <span>
              00:
              {Math.floor((progress * 72) / 100)
                .toString()
                .padStart(2, "0")}
              :00
            </span>
            <span>{currentEpisode.duration}</span>
          </div>
          <div className="flex items-center justify-center gap-4">
            <button className="text-muted-foreground hover:text-white transition-colors">
              <SkipBack className="h-5 w-5" />
            </button>
            <button
              onClick={() => setPlaying(playing ? null : "e1")}
              className="h-12 w-12 rounded-full bg-red-600 flex items-center justify-center"
            >
              {playing ? (
                <Pause className="h-6 w-6 text-white" />
              ) : (
                <Play className="h-6 w-6 text-white" />
              )}
            </button>
            <button className="text-muted-foreground hover:text-white transition-colors">
              <SkipForward className="h-5 w-5" />
            </button>
            <button className="text-muted-foreground hover:text-white transition-colors ml-4">
              <Volume2 className="h-5 w-5" />
            </button>
            <button
              className="text-muted-foreground hover:text-white transition-colors"
              onClick={() => toast.success("Episode downloaded!")}
            >
              <Download className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2">
        {(["discover", "episodes", "subscribed", "create"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${tab === t ? "bg-red-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "discover" && (
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search podcasts..."
              className="pl-9"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          {PODCASTS.filter(p =>
            p.title.toLowerCase().includes(search.toLowerCase())
          ).map((podcast, i) => (
            <motion.div
              key={podcast.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="border-border/50">
                <CardContent className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-red-900 to-purple-900 flex items-center justify-center text-3xl shrink-0">
                      {podcast.emoji}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="font-black text-sm">{podcast.title}</p>
                        <Badge variant="outline" className="text-xs">
                          {podcast.category}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        by {podcast.host}
                      </p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {(podcast.subscribers / 1000).toFixed(0)}K
                        </span>
                        <span className="flex items-center gap-1">
                          <Headphones className="h-3 w-3" />
                          {podcast.episodes} eps
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-400" />
                          {podcast.rating}
                        </span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="h-8 text-xs bg-red-600 text-white border-0 shrink-0"
                      onClick={() =>
                        toast.success(`Subscribed to ${podcast.title}!`)
                      }
                    >
                      <Plus className="h-3.5 w-3.5 mr-1" />
                      Subscribe
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 ml-17">
                    Latest: {podcast.latest}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "episodes" && (
        <div className="space-y-3">
          {EPISODES.map((episode, i) => (
            <Card
              key={episode.id}
              className={`border-border/50 ${playing === episode.id ? "border-red-500/20 bg-red-500/3" : ""}`}
            >
              <CardContent className="py-3 px-4">
                <div className="flex items-start gap-3">
                  <button
                    onClick={() =>
                      setPlaying(playing === episode.id ? null : episode.id)
                    }
                    className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${playing === episode.id ? "bg-red-600" : "bg-muted"}`}
                  >
                    {playing === episode.id ? (
                      <Pause className="h-4 w-4 text-white" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </button>
                  <div className="flex-1">
                    <p className="font-bold text-sm leading-tight">
                      {episode.title}
                    </p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span>{episode.podcast}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {episode.duration}
                      </span>
                      <span>{episode.date}</span>
                    </div>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button
                      onClick={() =>
                        setLiked(p => ({ ...p, [episode.id]: !p[episode.id] }))
                      }
                      className={
                        liked[episode.id]
                          ? "text-red-400"
                          : "text-muted-foreground"
                      }
                    >
                      <Heart className="h-4 w-4" />
                    </button>
                    <button
                      className="text-muted-foreground"
                      onClick={() => toast.success("Episode downloaded!")}
                    >
                      <Download className="h-4 w-4" />
                    </button>
                    <button
                      className="text-muted-foreground"
                      onClick={() => toast.success("Link copied!")}
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "subscribed" && (
        <div className="space-y-3">
          {PODCASTS.slice(0, 3).map((podcast, i) => (
            <Card
              key={podcast.id}
              className="border-border/50 border-green-500/10"
            >
              <CardContent className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{podcast.emoji}</span>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{podcast.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {podcast.episodes} episodes · {podcast.rating}★
                    </p>
                  </div>
                  <Badge className="bg-green-500/10 text-green-400 border-green-500/20 text-xs">
                    Subscribed
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "create" && (
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold">
              Start Your Podcast
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 text-center">
              <Mic className="h-10 w-10 text-red-400 mx-auto mb-2" />
              <p className="font-black">Launch Your Crypto Podcast</p>
              <p className="text-xs text-muted-foreground mt-1">
                Record, publish, and monetize with SKY4444 tips
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  icon: Mic,
                  label: "Record Episode",
                  desc: "Browser-based recording",
                },
                {
                  icon: Rss,
                  label: "RSS Import",
                  desc: "Import existing podcast",
                },
                {
                  icon: Radio,
                  label: "Live Show",
                  desc: "Broadcast live to listeners",
                },
                {
                  icon: TrendingUp,
                  label: "Analytics",
                  desc: "Track your growth",
                },
              ].map(({ icon: Icon, label, desc }) => (
                <button
                  key={label}
                  onClick={() => toast.info(`Opening ${label}...`)}
                  className="p-3 rounded-xl bg-muted/20 border border-border/30 text-left hover:bg-muted/40 transition-colors"
                >
                  <Icon className="h-5 w-5 text-red-400 mb-1" />
                  <p className="text-xs font-bold">{label}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </button>
              ))}
            </div>
            <Button
              className="w-full bg-red-600 text-white border-0 font-bold"
              onClick={() => toast.success("Creating your podcast channel!")}
            >
              <Mic className="h-4 w-4 mr-2" />
              Create Podcast Channel
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
