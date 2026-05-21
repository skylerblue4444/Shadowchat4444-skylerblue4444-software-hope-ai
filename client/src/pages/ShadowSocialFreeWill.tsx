import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import {
  Brain,
  Zap,
  TrendingUp,
  MessageSquare,
  Heart,
  Share2,
  RefreshCw,
} from "lucide-react";

const AI_THOUGHTS = [
  "Analyzing trending topics across 47 social platforms...",
  "Detected viral pattern: short-form video + crypto content = 847% engagement boost",
  "Auto-optimizing post timing for maximum reach...",
  "Learning from 8.4M user interactions this session...",
  "Improving content recommendation algorithm — accuracy now 94.7%",
  "Cross-referencing SKY4444 community sentiment with market data...",
  "Generating 12 new post variations for A/B testing...",
  "Detected emerging trend: AI + blockchain = next viral wave",
  "Self-updating engagement model based on real-time feedback...",
  "Skyler Blue brand sentiment: 98.4% positive across all platforms",
];

const PLATFORMS = [
  { name: "X (Twitter)", posts: 847, engagement: "12.4%", trend: "+34%" },
  { name: "Instagram", posts: 244, engagement: "8.7%", trend: "+21%" },
  { name: "TikTok", posts: 133, engagement: "18.2%", trend: "+67%" },
  { name: "LinkedIn", posts: 89, engagement: "5.4%", trend: "+15%" },
  { name: "Reddit", posts: 412, engagement: "22.1%", trend: "+44%" },
  { name: "YouTube", posts: 44, engagement: "9.8%", trend: "+28%" },
];

export default function ShadowSocialFreeWill() {
  const [running, setRunning] = useState(false);
  const [thought, setThought] = useState(AI_THOUGHTS[0]);
  const [thoughtIdx, setThoughtIdx] = useState(0);
  const [iq, setIq] = useState(847);
  const [posts, setPosts] = useState(0);
  const [reach, setReach] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => {
      setThoughtIdx(i => {
        const next = (i + 1) % AI_THOUGHTS.length;
        setThought(AI_THOUGHTS[next]);
        return next;
      });
      setIq(v => Math.min(9999, v + Math.floor(Math.random() * 3)));
      setPosts(v => v + Math.floor(Math.random() * 3) + 1);
      setReach(v => v + Math.floor(Math.random() * 10000) + 1000);
      setProgress(p => (p >= 100 ? 0 : p + 14));
    }, 1800);
    return () => clearInterval(t);
  }, [running]);

  const toggle = () => {
    if (running) {
      setRunning(false);
      toast.info("Social Free Will engine paused.");
    } else {
      setRunning(true);
      toast.success(
        "Social Free Will AI engine activated — self-improving now!"
      );
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black text-violet-400">
            Social Free Will
          </h1>
          <p className="text-xs text-muted-foreground">
            AI-powered social engine that self-improves and auto-posts trending
            content
          </p>
        </div>
        <Badge
          className={`shrink-0 ${running ? "bg-green-600" : "bg-violet-700"} text-white`}
        >
          {running ? "🟢 Running" : "⚪ Idle"}
        </Badge>
      </div>

      {/* AI IQ / Stats */}
      <div className="grid grid-cols-3 gap-2">
        <Card className="border-border/50 text-center">
          <CardContent className="py-3 px-2">
            <Brain className="h-4 w-4 text-violet-400 mx-auto mb-1" />
            <p className="font-black text-sm text-violet-400">
              {iq.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">AI IQ Score</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 text-center">
          <CardContent className="py-3 px-2">
            <MessageSquare className="h-4 w-4 text-blue-400 mx-auto mb-1" />
            <p className="font-black text-sm text-blue-400">{posts}</p>
            <p className="text-xs text-muted-foreground">Posts Auto-Created</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 text-center">
          <CardContent className="py-3 px-2">
            <TrendingUp className="h-4 w-4 text-green-400 mx-auto mb-1" />
            <p className="font-black text-sm text-green-400">
              {reach.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">Total Reach</p>
          </CardContent>
        </Card>
      </div>

      {/* AI Thought Stream */}
      <Card
        className={`border-violet-500/40 ${running ? "bg-violet-900/10" : "bg-muted/20"}`}
      >
        <CardHeader className="py-2 px-4">
          <CardTitle className="text-xs font-black flex items-center gap-2">
            <Brain className="h-3.5 w-3.5 text-violet-400" /> AI Thought Stream
          </CardTitle>
        </CardHeader>
        <CardContent className="py-2 px-4 space-y-2">
          <p
            className={`text-xs font-mono ${running ? "text-violet-300" : "text-muted-foreground"}`}
          >
            {running
              ? `> ${thought}`
              : "> Engine idle. Click Activate to start self-improvement."}
          </p>
          {running && <Progress value={progress} className="h-1" />}
        </CardContent>
      </Card>

      {/* Activate Button */}
      <Button
        className={`w-full font-black text-base py-5 border-0 ${
          running
            ? "bg-red-700 hover:bg-red-600 text-white"
            : "bg-violet-600 hover:bg-violet-500 text-white"
        }`}
        onClick={toggle}
      >
        {running ? (
          <>
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Pause Free Will
            Engine
          </>
        ) : (
          <>
            <Zap className="h-4 w-4 mr-2" /> Activate Social Free Will AI
          </>
        )}
      </Button>

      {/* Platform Stats */}
      <Card className="border-border/50">
        <CardHeader className="py-2 px-4">
          <CardTitle className="text-xs font-black">
            Platform Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="py-2 px-4 space-y-2">
          {PLATFORMS.map((p, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="text-xs font-bold">{p.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {p.posts} posts
                </span>
                <Badge className="bg-blue-900/40 text-blue-400 border border-blue-500/30 text-xs py-0 px-1">
                  {p.engagement}
                </Badge>
                <Badge className="bg-green-900/40 text-green-400 border border-green-500/30 text-xs py-0 px-1">
                  {p.trend}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Free Will Description */}
      <Card className="border-border/50 bg-muted/20">
        <CardContent className="py-3 px-4 space-y-1">
          <p className="text-xs font-bold text-violet-400">
            What is Social Free Will?
          </p>
          <p className="text-xs text-muted-foreground">
            An AI engine that monitors all social platforms in real-time,
            detects trending topics, auto-generates and posts optimized content,
            learns from engagement data, and continuously improves itself — with
            no manual input required. It has free will to improve on its own,
            guided by your brand identity and SKY4444 community values.
          </p>
        </CardContent>
      </Card>

      <div className="rounded-xl bg-muted/50 border border-border/50 p-3 text-center">
        <p className="font-bold text-xs">
          Skyler Blue IT Resolutions &bull; 479-406-7123
        </p>
        <p className="text-xs text-muted-foreground">
          skylerblue4444@gmail.com &bull; Arkansas #1 IT Partner
        </p>
      </div>
    </div>
  );
}
