import { useState } from "react";
import { motion } from "framer-motion";
import {
  Music,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  Heart,
  Share2,
  Plus,
  Search,
  Shuffle,
  Repeat,
  Coins,
  Star,
  TrendingUp,
  Headphones,
  Disc,
  Radio,
  ChevronUp,
  ChevronDown,
  List,
  Grid,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const TRACKS = [
  {
    id: "t1",
    title: "Moon Mission",
    artist: "SkyBlue & The Hodlers",
    album: "WAGMI Vol. 1",
    duration: "3:24",
    emoji: "🌕",
    genre: "Crypto Pop",
    plays: 284000,
    nft: true,
    price: 50,
  },
  {
    id: "t2",
    title: "Diamond Hands",
    artist: "TRUMP_Beats",
    album: "To The Moon",
    duration: "4:12",
    emoji: "💎",
    genre: "Hip-Hop",
    plays: 1240000,
    nft: false,
    price: 0,
  },
  {
    id: "t3",
    title: "ShadowChain Anthem",
    artist: "SkyBlue Studios",
    album: "Genesis",
    duration: "2:58",
    emoji: "⚡",
    genre: "Electronic",
    plays: 84000,
    nft: true,
    price: 100,
  },
  {
    id: "t4",
    title: "DOGE to the Moon",
    artist: "Meme_Lord",
    album: "Meme Season",
    duration: "3:44",
    emoji: "🐕",
    genre: "Meme Music",
    plays: 4840000,
    nft: false,
    price: 0,
  },
  {
    id: "t5",
    title: "Satoshi's Dream",
    artist: "CryptoClassics",
    album: "Bitcoin Origins",
    duration: "5:18",
    emoji: "₿",
    genre: "Ambient",
    plays: 428000,
    nft: true,
    price: 200,
  },
  {
    id: "t6",
    title: "SKY4444 Anthem",
    artist: "Skyler Blue",
    album: "ICO Season",
    duration: "3:02",
    emoji: "🚀",
    genre: "Hype",
    plays: 48400,
    nft: true,
    price: 4444,
  },
];

const PLAYLISTS = [
  { name: "Crypto Vibes", tracks: 24, emoji: "🎵", plays: 8400 },
  { name: "WAGMI Workout", tracks: 18, emoji: "💪", plays: 4200 },
  { name: "Chill Hodl", tracks: 32, emoji: "😌", plays: 12800 },
  { name: "Moon Mission Mix", tracks: 12, emoji: "🌕", plays: 6400 },
];

const ARTISTS = [
  {
    name: "Skyler Blue",
    emoji: "⚡",
    followers: 48400,
    genre: "Multi-Genre",
    verified: true,
  },
  {
    name: "TRUMP_Beats",
    emoji: "🇺🇸",
    followers: 284000,
    genre: "Hip-Hop",
    verified: true,
  },
  {
    name: "CryptoClassics",
    emoji: "₿",
    followers: 92000,
    genre: "Ambient",
    verified: false,
  },
  {
    name: "Meme_Lord",
    emoji: "🐕",
    followers: 1240000,
    genre: "Meme Music",
    verified: true,
  },
];

export default function MusicPlayer() {
  const [tab, setTab] = useState<"discover" | "library" | "artists" | "nft">(
    "discover"
  );
  const [playing, setPlaying] = useState<string | null>("t1");
  const [progress, setProgress] = useState(42);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [liked, setLiked] = useState<Record<string, boolean>>({
    t1: true,
    t3: true,
  });
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"list" | "grid">("list");

  const currentTrack = TRACKS.find(t => t.id === playing);

  const filteredTracks = TRACKS.filter(
    t =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.artist.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2">
          <Music className="h-6 w-6 text-pink-400" />
          Music
        </h1>
        <p className="text-sm text-muted-foreground">
          Web3 music streaming — tip artists with SKY4444, own tracks as NFTs
        </p>
      </div>

      {/* Now Playing Bar */}
      {currentTrack && (
        <div className="p-4 rounded-2xl bg-gradient-to-br from-pink-900/30 to-purple-900/30 border border-pink-500/20">
          <div className="flex items-center gap-4 mb-3">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-pink-800 to-purple-800 flex items-center justify-center text-4xl shrink-0">
              {currentTrack.emoji}
            </div>
            <div className="flex-1">
              <p className="font-black">{currentTrack.title}</p>
              <p className="text-sm text-muted-foreground">
                {currentTrack.artist}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {currentTrack.genre}
                </Badge>
                {currentTrack.nft && (
                  <Badge className="text-xs bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                    NFT Track
                  </Badge>
                )}
              </div>
            </div>
            <button
              onClick={() =>
                setLiked(p => ({
                  ...p,
                  [currentTrack.id]: !p[currentTrack.id],
                }))
              }
              className={
                liked[currentTrack.id]
                  ? "text-pink-400"
                  : "text-muted-foreground"
              }
            >
              <Heart className="h-5 w-5" />
            </button>
          </div>
          <Progress value={progress} className="h-1.5 mb-2" />
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
            <span>
              1:
              {Math.floor((progress * 2) / 100)
                .toString()
                .padStart(2, "0")}
            </span>
            <span>{currentTrack.duration}</span>
          </div>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setShuffle(!shuffle)}
              className={shuffle ? "text-pink-400" : "text-muted-foreground"}
            >
              <Shuffle className="h-4 w-4" />
            </button>
            <button className="text-muted-foreground">
              <SkipBack className="h-5 w-5" />
            </button>
            <button
              onClick={() => setPlaying(playing ? null : "t1")}
              className="h-12 w-12 rounded-full bg-pink-600 flex items-center justify-center"
            >
              {playing ? (
                <Pause className="h-6 w-6 text-white" />
              ) : (
                <Play className="h-6 w-6 text-white" />
              )}
            </button>
            <button className="text-muted-foreground">
              <SkipForward className="h-5 w-5" />
            </button>
            <button
              onClick={() => setRepeat(!repeat)}
              className={repeat ? "text-pink-400" : "text-muted-foreground"}
            >
              <Repeat className="h-4 w-4" />
            </button>
          </div>
          <div className="flex gap-2 mt-3">
            <Button
              size="sm"
              className="flex-1 h-7 text-xs bg-yellow-500 text-black border-0 font-bold"
              onClick={() =>
                toast.success(`Tipped 10 SKY4444 to ${currentTrack.artist}!`)
              }
            >
              <Coins className="h-3.5 w-3.5 mr-1.5" />
              Tip Artist
            </Button>
            {currentTrack.nft && (
              <Button
                size="sm"
                className="flex-1 h-7 text-xs bg-purple-600 text-white border-0 font-bold"
                onClick={() =>
                  toast.success(
                    `Purchasing NFT for ${currentTrack.price} SKY4444!`
                  )
                }
              >
                Buy NFT — {currentTrack.price} SKY4444
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2">
        {(["discover", "library", "artists", "nft"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${tab === t ? "bg-pink-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "discover" && (
        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tracks, artists..."
                className="pl-9"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <button
              onClick={() => setView(v => (v === "list" ? "grid" : "list"))}
              className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center"
            >
              {view === "list" ? (
                <Grid className="h-4 w-4" />
              ) : (
                <List className="h-4 w-4" />
              )}
            </button>
          </div>
          {view === "list" ? (
            <div className="space-y-2">
              {filteredTracks.map((track, i) => (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Card
                    className={`border-border/50 ${playing === track.id ? "border-pink-500/20 bg-pink-500/3" : ""}`}
                  >
                    <CardContent className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            setPlaying(playing === track.id ? null : track.id)
                          }
                          className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${playing === track.id ? "bg-pink-600" : "bg-muted"}`}
                        >
                          {playing === track.id ? (
                            <Pause className="h-4 w-4 text-white" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                        </button>
                        <span className="text-2xl">{track.emoji}</span>
                        <div className="flex-1">
                          <p className="font-bold text-sm">{track.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {track.artist} · {track.album}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-xs text-muted-foreground">
                            {track.duration}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {(track.plays / 1000).toFixed(0)}K plays
                          </p>
                        </div>
                        <div className="flex gap-1 shrink-0">
                          <button
                            onClick={() =>
                              setLiked(p => ({
                                ...p,
                                [track.id]: !p[track.id],
                              }))
                            }
                            className={
                              liked[track.id]
                                ? "text-pink-400"
                                : "text-muted-foreground"
                            }
                          >
                            <Heart className="h-4 w-4" />
                          </button>
                          {track.nft && (
                            <Badge className="text-xs bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                              NFT
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {filteredTracks.map((track, i) => (
                <Card
                  key={track.id}
                  className={`border-border/50 cursor-pointer ${playing === track.id ? "border-pink-500/20" : ""}`}
                  onClick={() =>
                    setPlaying(playing === track.id ? null : track.id)
                  }
                >
                  <CardContent className="py-4 text-center">
                    <span className="text-5xl">{track.emoji}</span>
                    <p className="font-bold text-sm mt-2 truncate">
                      {track.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {track.artist}
                    </p>
                    {track.nft && (
                      <Badge className="mt-1 text-xs bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                        NFT
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === "library" && (
        <div className="space-y-3">
          <p className="text-sm font-bold">Your Playlists</p>
          {PLAYLISTS.map((pl, i) => (
            <Card key={pl.name} className="border-border/50">
              <CardContent className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-pink-800 to-purple-800 flex items-center justify-center text-2xl">
                    {pl.emoji}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{pl.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {pl.tracks} tracks · {(pl.plays / 1000).toFixed(1)}K plays
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs"
                    onClick={() => toast.info(`Opening ${pl.name}`)}
                  >
                    Play
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          <Button
            variant="outline"
            className="w-full"
            onClick={() => toast.info("Creating new playlist...")}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Playlist
          </Button>
        </div>
      )}

      {tab === "artists" && (
        <div className="space-y-3">
          {ARTISTS.map((artist, i) => (
            <Card key={artist.name} className="border-border/50">
              <CardContent className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-pink-800 to-purple-800 flex items-center justify-center text-2xl">
                    {artist.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="font-bold text-sm">{artist.name}</p>
                      {artist.verified && (
                        <span className="text-blue-400 text-xs">✓</span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {artist.genre} · {(artist.followers / 1000).toFixed(0)}K
                      followers
                    </p>
                  </div>
                  <Button
                    size="sm"
                    className="h-7 text-xs bg-pink-600 text-white border-0"
                    onClick={() => toast.success(`Following ${artist.name}!`)}
                  >
                    Follow
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "nft" && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Own music as NFTs — earn royalties when others stream your tracks
          </p>
          {TRACKS.filter(t => t.nft).map((track, i) => (
            <Card
              key={track.id}
              className="border-border/50 border-yellow-500/10"
            >
              <CardContent className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{track.emoji}</span>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{track.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {track.artist}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-yellow-400">
                      {track.price.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">SKY4444</p>
                  </div>
                  <Button
                    size="sm"
                    className="h-7 text-xs bg-yellow-500 text-black border-0 font-bold"
                    onClick={() =>
                      toast.success(`Purchasing NFT track: ${track.title}!`)
                    }
                  >
                    Buy
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
