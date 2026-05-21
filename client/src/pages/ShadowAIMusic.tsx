import { useState } from "react";
import {
  Music,
  Play,
  Pause,
  SkipForward,
  Heart,
  Zap,
  RefreshCw,
  Star,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const TRACKS = [
  {
    title: "Crypto Moon",
    artist: "ShadowBeats",
    genre: "Electronic",
    duration: "3:42",
    nft: true,
    streams: "124K",
    earnings: "0.42 SKY",
  },
  {
    title: "SKY4444 Anthem",
    artist: "SkylerBlue",
    genre: "Hip-Hop",
    duration: "4:15",
    nft: true,
    streams: "89K",
    earnings: "0.31 SKY",
  },
  {
    title: "DeFi Dreams",
    artist: "Web3Vibes",
    genre: "Lo-Fi",
    duration: "2:58",
    nft: false,
    streams: "67K",
    earnings: "0.22 SKY",
  },
  {
    title: "TRUMP Rally",
    artist: "MAGABeats",
    genre: "Pop",
    duration: "3:21",
    nft: true,
    streams: "204K",
    earnings: "0.71 SKY",
  },
  {
    title: "Shadow Protocol",
    artist: "CipherSound",
    genre: "Ambient",
    duration: "5:12",
    nft: false,
    streams: "45K",
    earnings: "0.15 SKY",
  },
];

export default function ShadowAIMusic() {
  const [playing, setPlaying] = useState<number | null>(0);
  const [generating, setGenerating] = useState(false);
  const generate = async () => {
    setGenerating(true);
    await new Promise(r => setTimeout(r, 2500));
    setGenerating(false);
    toast.success(
      "AI generated 'Blockchain Sunrise' — minting as NFT track..."
    );
  };
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2">
          <Music className="h-6 w-6 text-pink-400" />
          AI Music Studio
        </h1>
        <p className="text-sm text-muted-foreground">
          Create, stream, and monetize music as NFTs — earn SKY4444 for every
          play
        </p>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Tracks", value: "5", color: "text-pink-400" },
          { label: "Total Streams", value: "529K", color: "text-green-400" },
          { label: "SKY Earned", value: "1.81", color: "text-blue-400" },
          { label: "NFT Tracks", value: "3", color: "text-purple-400" },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="py-3 px-2">
              <p className={"font-black text-lg " + s.color}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="border-border/50 bg-gradient-to-br from-pink-900/20 to-purple-900/20">
        <CardContent className="py-4 px-4">
          <p className="font-bold text-sm mb-2">AI Music Generator</p>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <select className="h-9 px-3 rounded-xl bg-muted text-xs border border-border/50 focus:outline-none">
              {[
                "Electronic",
                "Hip-Hop",
                "Lo-Fi",
                "Ambient",
                "Pop",
                "Jazz",
                "Rock",
              ].map(g => (
                <option key={g}>{g}</option>
              ))}
            </select>
            <select className="h-9 px-3 rounded-xl bg-muted text-xs border border-border/50 focus:outline-none">
              {["Upbeat", "Chill", "Epic", "Dark", "Romantic", "Energetic"].map(
                m => (
                  <option key={m}>{m}</option>
                )
              )}
            </select>
          </div>
          <input
            placeholder="Describe your track... (e.g. 'crypto moon vibes with 808s')"
            className="w-full h-9 px-3 rounded-xl bg-muted text-xs border border-border/50 focus:outline-none mb-2"
          />
          <Button
            className="w-full h-9 bg-pink-600 text-white border-0 font-bold text-sm"
            onClick={generate}
            disabled={generating}
          >
            {generating ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 mr-2" />
                Generate with AI
              </>
            )}
          </Button>
        </CardContent>
      </Card>
      <div className="space-y-2">
        <p className="text-sm font-bold">Your Tracks</p>
        {TRACKS.map((track, i) => (
          <Card
            key={i}
            className={
              "border-border/50 " + (playing === i ? "border-pink-500/30" : "")
            }
          >
            <CardContent className="py-3 px-4 flex items-center gap-3">
              <button
                onClick={() => setPlaying(playing === i ? null : i)}
                className="h-9 w-9 rounded-xl bg-pink-500/10 flex items-center justify-center shrink-0 hover:bg-pink-500/20 transition-colors"
              >
                {playing === i ? (
                  <Pause className="h-4 w-4 text-pink-400" />
                ) : (
                  <Play className="h-4 w-4 text-pink-400" />
                )}
              </button>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-sm">{track.title}</p>
                  {track.nft && (
                    <Badge className="bg-purple-500/10 text-purple-400 border-0 text-xs">
                      NFT
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {track.artist} · {track.genre} · {track.duration}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs font-bold text-green-400">
                  {track.earnings}
                </p>
                <p className="text-xs text-muted-foreground">{track.streams}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
