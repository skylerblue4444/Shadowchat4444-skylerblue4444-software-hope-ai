import { useMemo, useState } from "react";
import { useLocation } from "wouter";
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  CheckCircle2,
  Coins,
  Compass,
  Cpu,
  Crown,
  Gauge,
  Globe2,
  Heart,
  Languages,
  Mic,
  MicOff,
  Navigation,
  Play,
  Radio,
  Rocket,
  Send,
  ShieldCheck,
  Sparkles,
  ThumbsUp,
  Volume2,
  Wallet,
  Wand2,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type Market = "usa" | "china" | "global";
type QuickAction =
  | "create_feed_post"
  | "like_post"
  | "comment_post"
  | "share_post"
  | "tip_creator"
  | "publish_listing"
  | "start_stream"
  | "dating_wave"
  | "admin_review";
type Coin = "SKY4444" | "TRUMP" | "DOGE" | "USDT" | "BTC" | "MONERO" | "SHADOW";
type VoiceMode =
  | "hands_free"
  | "guided"
  | "admin"
  | "market"
  | "companion"
  | "unhinged";

type SpeechRecognitionEventLike = {
  results: ArrayLike<{ 0: { transcript: string } }>;
};
type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  start: () => void;
  stop: () => void;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onerror: ((event: { error?: string }) => void) | null;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
};
type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

const marketOptions: Array<{
  value: Market;
  label: string;
  description: string;
}> = [
  {
    value: "global",
    label: "Global",
    description: "Full platform orchestration",
  },
  { value: "usa", label: "USA", description: "Trust-first creator commerce" },
  {
    value: "china",
    label: "China-ready",
    description: "Bilingual mobile-first discovery",
  },
];

const coinOptions: Coin[] = [
  "SKY4444",
  "SHADOW",
  "USDT",
  "TRUMP",
  "DOGE",
  "BTC",
  "MONERO",
];

const voiceModeOptions: Array<{
  value: VoiceMode;
  label: string;
  description: string;
  tone: string;
}> = [
  {
    value: "unhinged",
    label: "Unhinged",
    description:
      "Fast route-everything voice, spoken replies, casino/game routing, and kill-switch-safe beta actions.",
    tone: "border-fuchsia-400/40 bg-fuchsia-400/10 text-fuchsia-100",
  },
  {
    value: "hands_free",
    label: "Hands-free",
    description:
      "Run supported actions and navigation without touching every screen manually.",
    tone: "border-cyan-400/30 bg-cyan-400/10 text-cyan-100",
  },
  {
    value: "guided",
    label: "Guided",
    description:
      "Plan first, then execute after the operator reviews IDs and context.",
    tone: "border-blue-400/30 bg-blue-400/10 text-blue-100",
  },
  {
    value: "market",
    label: "Market",
    description:
      "Localize Hope AI for USA, China-ready, and global friends-market growth.",
    tone: "border-emerald-400/30 bg-emerald-400/10 text-emerald-100",
  },
  {
    value: "admin",
    label: "Admin",
    description:
      "Control reviews, trust checks, and blocked action explanations.",
    tone: "border-amber-400/30 bg-amber-400/10 text-amber-100",
  },
  {
    value: "companion",
    label: "Companion",
    description: "Community, friends, dating-wave, and creator-support tone.",
    tone: "border-pink-400/30 bg-pink-400/10 text-pink-100",
  },
];

const voiceCommandPresets = [
  "Hope, unhinged mode voice everything",
  "Hope, open casino",
  "Hope, play slots beta",
  "Hope, show production readiness",
  "Hope, open settings",
  "Hope, open trading",
  "Hope, open friends market",
  "Hope, run full platform boost",
];

const quickActionCopy: Array<{
  action: QuickAction;
  label: string;
  icon: typeof Sparkles;
  needs?: "postId" | "targetUserId" | "amount";
  tone: string;
}> = [
  {
    action: "create_feed_post",
    label: "Post Founder Update",
    icon: Send,
    tone: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
  },
  {
    action: "publish_listing",
    label: "Publish Offer",
    icon: Rocket,
    tone: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
  },
  {
    action: "start_stream",
    label: "Start Build Room",
    icon: Radio,
    tone: "bg-red-500/10 text-red-300 border-red-500/30",
  },
  {
    action: "tip_creator",
    label: "Tip Creator",
    icon: Coins,
    needs: "targetUserId",
    tone: "bg-yellow-500/10 text-yellow-200 border-yellow-500/30",
  },
  {
    action: "like_post",
    label: "Like Post",
    icon: ThumbsUp,
    needs: "postId",
    tone: "bg-blue-500/10 text-blue-300 border-blue-500/30",
  },
  {
    action: "dating_wave",
    label: "Dating Wave",
    icon: Heart,
    needs: "targetUserId",
    tone: "bg-pink-500/10 text-pink-300 border-pink-500/30",
  },
  {
    action: "admin_review",
    label: "Admin Review",
    icon: ShieldCheck,
    tone: "bg-violet-500/10 text-violet-300 border-violet-500/30",
  },
];

function formatUsd(value: number | undefined) {
  return `$${Number(value ?? 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
}

function readinessTone(stage: string) {
  if (stage.includes("live_db"))
    return "border-emerald-400/30 bg-emerald-400/10 text-emerald-200";
  if (stage.includes("db_backed"))
    return "border-lime-400/30 bg-lime-400/10 text-lime-200";
  if (stage.includes("gated"))
    return "border-amber-400/30 bg-amber-400/10 text-amber-200";
  if (stage.includes("adapter") || stage.includes("not_mainnet"))
    return "border-red-400/30 bg-red-400/10 text-red-200";
  return "border-slate-400/30 bg-slate-400/10 text-slate-200";
}

function readinessLabel(stage: string) {
  return stage.replace(/_/g, " ").replace(/\b\w/g, char => char.toUpperCase());
}

function controlTone(status: string) {
  if (status.includes("live_db") || status.includes("db_backed"))
    return "border-emerald-400/30 bg-emerald-400/10 text-emerald-100";
  if (status.includes("paper") || status.includes("provider"))
    return "border-amber-400/30 bg-amber-400/10 text-amber-100";
  if (status.includes("active"))
    return "border-cyan-400/30 bg-cyan-400/10 text-cyan-100";
  return "border-slate-400/30 bg-slate-400/10 text-slate-200";
}

export default function HopeAI() {
  const [, navigate] = useLocation();
  const [market, setMarket] = useState<Market>("global");
  const [intent, setIntent] = useState(
    "Make Hope AI unhinged, hands-free, bilingual, crypto-social, and ready for creator commerce."
  );
  const [actionText, setActionText] = useState(
    "Hope AI is shipping voice navigation, creator tips, likes, listings, livestream rooms, dating/community waves, and beta wallet trust controls."
  );
  const [voiceText, setVoiceText] = useState("Hope, go to marketplace");
  const [spokenResponse, setSpokenResponse] = useState(
    "Hope AI voice layer is online. Say: unhinged mode voice everything, open casino, go to marketplace, open livestream, post an update, tip creator, like post, show wallet, or open trading."
  );
  const [isListening, setIsListening] = useState(false);
  const [muted, setMuted] = useState(false);
  const [autoNavigate, setAutoNavigate] = useState(true);
  const [voiceMode, setVoiceMode] = useState<VoiceMode>("unhinged");
  const [postId, setPostId] = useState("1");
  const [targetUserId, setTargetUserId] = useState("1");
  const [amount, setAmount] = useState("144");
  const [coin, setCoin] = useState<Coin>("SKY4444");
  const [lastRoute, setLastRoute] = useState<string | null>(null);

  const mission = trpc.hopeAi.missionControl.useQuery({ market });
  const aiDev = trpc.hopeAi.aiDevSection.useQuery({ market });
  const productionReadiness = trpc.hopeAi.productionReadiness.useQuery();

  const speak = (text: string) => {
    if (
      muted ||
      typeof window === "undefined" ||
      !("speechSynthesis" in window)
    )
      return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = market === "china" ? "zh-CN" : "en-US";
    utterance.rate = voiceMode === "unhinged" ? 1.08 : 0.96;
    utterance.pitch = voiceMode === "unhinged" ? 1.12 : 1.04;
    window.speechSynthesis.speak(utterance);
  };

  const planSprint = trpc.hopeAi.planSprint.useMutation({
    onSuccess: data => {
      setSpokenResponse(data.resultSummary);
      speak(data.resultSummary);
      void mission.refetch();
      toast.success("Hope AI sprint plan recorded");
    },
    onError: error => toast.error(error.message),
  });

  const quickAction = trpc.hopeAi.quickAction.useMutation({
    onSuccess: data => {
      setSpokenResponse(data.resultSummary);
      speak(data.resultSummary);
      const result = data.result as {
        postId?: number;
        listingId?: number;
        streamId?: number;
      } | null;
      if (result?.postId) setPostId(String(result.postId));
      void mission.refetch();
      void aiDev.refetch();
      void productionReadiness.refetch();
      toast.success(data.resultSummary);
    },
    onError: error => toast.error(error.message),
  });

  const boost = trpc.hopeAi.runHandsFreeBoost.useMutation({
    onSuccess: data => {
      setSpokenResponse(data.resultSummary);
      speak(data.resultSummary);
      void mission.refetch();
      void aiDev.refetch();
      void productionReadiness.refetch();
      toast.success("Hands-free platform boost shipped");
    },
    onError: error => toast.error(error.message),
  });

  const voiceCommand = trpc.hopeAi.voiceCommand.useMutation({
    onSuccess: data => {
      setSpokenResponse(data.spokenResponse);
      speak(data.spokenResponse);
      void mission.refetch();
      void aiDev.refetch();
      void productionReadiness.refetch();
      if (data.navigation?.route) {
        setLastRoute(data.navigation.route);
        if (autoNavigate)
          setTimeout(() => navigate(data.navigation.route), 450);
      }
      toast.success(data.resultSummary);
    },
    onError: error => toast.error(error.message),
  });

  const balances = mission.data?.balances ?? [];
  const walletUsd = useMemo(
    () =>
      balances.reduce((sum, balance) => sum + Number(balance.usdValue ?? 0), 0),
    [balances]
  );
  const topBalances = balances.slice(0, 4);
  const navigationTargets = mission.data?.navigationTargets ?? [];
  const marketControls = mission.data?.marketControls ?? [];
  const readiness =
    productionReadiness.data ?? mission.data?.productionReadiness;
  const readinessAreas = readiness?.allAreas ?? [];
  const liveAreas = readiness?.liveDbBackedAreas ?? [];
  const prepAreas = readiness?.prepStageAreas ?? [];
  const nextPersistenceTargets = readiness?.nextPersistenceTargets ?? [];
  const voiceSupported =
    typeof window !== "undefined" &&
    Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
  const numericPostId = Number(postId) > 0 ? Number(postId) : undefined;
  const numericTargetUserId =
    Number(targetUserId) > 0 ? Number(targetUserId) : undefined;
  const numericAmount = Number(amount) > 0 ? Number(amount) : undefined;

  const runVoiceCommand = (command = voiceText) => {
    const trimmed = command.trim();
    if (!trimmed) {
      toast.error("Enter or say a Hope AI command first.");
      return;
    }
    setVoiceText(trimmed);
    voiceCommand.mutate({
      command: trimmed,
      market,
      mode: voiceMode,
      execute: true,
      content: actionText,
      postId: numericPostId,
      targetUserId: numericTargetUserId,
      amount: numericAmount,
      coin,
    });
  };

  const startListening = () => {
    if (!voiceSupported || typeof window === "undefined") {
      toast.error(
        "Browser speech recognition is not available here. Type the command and press Run."
      );
      return;
    }
    const SpeechCtor =
      window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (!SpeechCtor) return;
    const recognition = new SpeechCtor();
    recognition.lang = market === "china" ? "zh-CN" : "en-US";
    recognition.interimResults = false;
    recognition.continuous = voiceMode === "unhinged";
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = event => {
      setIsListening(false);
      toast.error(
        `Voice capture stopped${event.error ? `: ${event.error}` : "."}`
      );
    };
    recognition.onresult = event => {
      const transcript = event.results[0]?.[0]?.transcript ?? "";
      setVoiceText(transcript);
      runVoiceCommand(transcript);
    };
    recognition.start();
  };

  const runQuickAction = (action: QuickAction) => {
    quickAction.mutate({
      action,
      market,
      mode: action === "admin_review" ? "admin" : "hands_free",
      title:
        action === "publish_listing"
          ? "Hope AI Full-Stack Cybersecurity Innovation Package"
          : action === "start_stream"
            ? "Hope AI Hands-Free Build Room"
            : "Hope AI Founder Update",
      content: actionText,
      postId: numericPostId,
      targetUserId: numericTargetUserId,
      amount: action === "tip_creator" ? numericAmount : undefined,
      coin,
      category: "ai-services",
      price: "444.00",
    });
  };

  return (
    <div className="min-h-screen bg-[#05070d] text-white">
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-[2rem] border border-cyan-500/20 bg-gradient-to-br from-cyan-950/50 via-slate-950 to-violet-950/50 p-6 shadow-2xl shadow-cyan-950/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.22),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.18),transparent_35%)]" />
          <div className="relative grid gap-6 lg:grid-cols-[1.45fr_0.55fr]">
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="border-cyan-400/30 bg-cyan-400/10 text-cyan-200">
                  Hope AI Second Sprint
                </Badge>
                <Badge className="border-violet-400/30 bg-violet-400/10 text-violet-200">
                  Voice-ready
                </Badge>
                <Badge className="border-fuchsia-400/30 bg-fuchsia-400/10 text-fuchsia-200">
                  Unhinged mode
                </Badge>
                <Badge className="border-emerald-400/30 bg-emerald-400/10 text-emerald-200">
                  Kill-switch gated
                </Badge>
              </div>
              <div>
                <h1 className="max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
                  Hope AI Mission Control now drives SkyCoin4444 in unhinged
                  voice-everything mode.
                </h1>
                <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
                  This page is no longer a static AI card. It is a voice-command
                  operator layer for marketplace listings, creator tips, likes,
                  casino/game routing, livestream rooms, dating/community waves,
                  bilingual market positioning, admin reviews, settings,
                  paper/day-trade surfaces, and beta crypto-wallet trust logic.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                    Wallet visible
                  </p>
                  <p className="mt-1 text-2xl font-black text-cyan-200">
                    {formatUsd(walletUsd)}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                    Voice routes
                  </p>
                  <p className="mt-1 text-2xl font-black text-violet-200">
                    {navigationTargets.length || 12}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                    Recent runs
                  </p>
                  <p className="mt-1 text-2xl font-black text-emerald-200">
                    {mission.data?.latestRuns?.length ?? 0}
                  </p>
                </div>
              </div>
            </div>
            <Card className="relative border-white/10 bg-black/30 text-white backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-cyan-300" /> Market Brain
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select
                  value={market}
                  onValueChange={value => setMarket(value as Market)}
                >
                  <SelectTrigger className="border-white/10 bg-white/5 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {marketOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm leading-6 text-slate-300">
                  {mission.data?.market?.positioning ??
                    marketOptions.find(item => item.value === market)
                      ?.description}
                </p>
                <Button
                  className="w-full border-0 bg-cyan-500 font-black text-black hover:bg-cyan-400"
                  onClick={() =>
                    boost.mutate({ market, focus: "full_platform" })
                  }
                  disabled={boost.isPending}
                >
                  <Wand2 className="mr-2 h-4 w-4" /> Run Full Platform Boost
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <Card className="border-cyan-500/20 bg-slate-950/80 text-white shadow-xl shadow-cyan-950/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mic className="h-5 w-5 text-cyan-300" /> Hope AI Voice + Spoken
                Navigation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <Badge className="border-fuchsia-400/30 bg-fuchsia-400/10 text-fuchsia-100">
                    Mode:{" "}
                    {
                      voiceModeOptions.find(item => item.value === voiceMode)
                        ?.label
                    }
                  </Badge>
                  <Badge className="border-red-400/30 bg-red-400/10 text-red-100">
                    Money kill switches stay on
                  </Badge>
                </div>
                <p className="text-sm leading-6 text-cyan-100">
                  {spokenResponse}
                </p>
                {lastRoute && (
                  <p className="mt-2 text-xs text-slate-400">
                    Last resolved route:{" "}
                    <span className="font-mono text-cyan-200">{lastRoute}</span>
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="voice-command">Say or type a command</Label>
                <div className="flex gap-2">
                  <Input
                    id="voice-command"
                    value={voiceText}
                    onChange={event => setVoiceText(event.target.value)}
                    className="border-white/10 bg-white/5 text-white"
                    placeholder="Hope, unhinged mode voice everything"
                  />
                  <Button
                    className="bg-cyan-500 text-black hover:bg-cyan-400"
                    onClick={() => runVoiceCommand()}
                    disabled={voiceCommand.isPending}
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                {voiceModeOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setVoiceMode(option.value);
                      setVoiceText(
                        option.value === "unhinged"
                          ? "Hope, unhinged mode voice everything"
                          : `Hope, ${option.label.toLowerCase()} mode`
                      );
                    }}
                    className={`rounded-2xl border p-3 text-left transition ${voiceMode === option.value ? option.tone : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-cyan-400/30"}`}
                  >
                    <p className="font-black">{option.label}</p>
                    <p className="mt-1 line-clamp-2 text-xs leading-5 opacity-80">
                      {option.description}
                    </p>
                  </button>
                ))}
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {voiceCommandPresets.map(command => (
                  <Button
                    key={command}
                    variant="outline"
                    className="justify-start border-white/10 bg-white/[0.03] text-left text-xs text-slate-200 hover:bg-fuchsia-500/10"
                    onClick={() => runVoiceCommand(command)}
                    disabled={voiceCommand.isPending}
                  >
                    <Zap className="mr-2 h-3.5 w-3.5 text-fuchsia-200" />
                    {command}
                  </Button>
                ))}
              </div>
              <div className="grid gap-2 sm:grid-cols-4">
                <Button
                  variant="outline"
                  className="border-cyan-500/30 bg-cyan-500/10 text-cyan-100 hover:bg-cyan-500/20"
                  onClick={startListening}
                  disabled={isListening || voiceCommand.isPending}
                >
                  {isListening ? (
                    <MicOff className="mr-2 h-4 w-4" />
                  ) : (
                    <Mic className="mr-2 h-4 w-4" />
                  )}
                  {isListening ? "Listening" : "Listen"}
                </Button>
                <Button
                  variant="outline"
                  className="border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-100 hover:bg-fuchsia-500/20"
                  onClick={() =>
                    runVoiceCommand("Hope, unhinged mode voice everything")
                  }
                  disabled={voiceCommand.isPending}
                >
                  <BrainCircuit className="mr-2 h-4 w-4" />
                  Arm Unhinged
                </Button>
                <Button
                  variant="outline"
                  className="border-violet-500/30 bg-violet-500/10 text-violet-100 hover:bg-violet-500/20"
                  onClick={() => {
                    setMuted(!muted);
                    toast.info(
                      !muted ? "Spoken output muted" : "Spoken output enabled"
                    );
                  }}
                >
                  <Volume2 className="mr-2 h-4 w-4" />
                  {muted ? "Muted" : "Voice On"}
                </Button>
                <Button
                  variant="outline"
                  className="border-emerald-500/30 bg-emerald-500/10 text-emerald-100 hover:bg-emerald-500/20"
                  onClick={() => setAutoNavigate(!autoNavigate)}
                >
                  <Navigation className="mr-2 h-4 w-4" />
                  {autoNavigate ? "Auto Route" : "Preview"}
                </Button>
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                <Input
                  value={postId}
                  onChange={event => setPostId(event.target.value)}
                  className="border-white/10 bg-white/5 text-white"
                  placeholder="Post ID"
                />
                <Input
                  value={targetUserId}
                  onChange={event => setTargetUserId(event.target.value)}
                  className="border-white/10 bg-white/5 text-white"
                  placeholder="Target user ID"
                />
                <Input
                  value={amount}
                  onChange={event => setAmount(event.target.value)}
                  className="border-white/10 bg-white/5 text-white"
                  placeholder="Tip amount"
                />
              </div>
              <Select
                value={coin}
                onValueChange={value => setCoin(value as Coin)}
              >
                <SelectTrigger className="border-white/10 bg-white/5 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {coinOptions.map(item => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card className="border-violet-500/20 bg-slate-950/80 text-white shadow-xl shadow-violet-950/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Compass className="h-5 w-5 text-violet-300" /> Hands-free Route
                Matrix
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              {navigationTargets.slice(0, 12).map(target => (
                <button
                  key={target.key}
                  onClick={() => runVoiceCommand(`open ${target.label}`)}
                  className="group rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left transition hover:border-violet-400/40 hover:bg-violet-500/10"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-black text-white">{target.label}</p>
                      <p className="text-xs text-violet-200">
                        {target.labelZh}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-500 transition group-hover:translate-x-1 group-hover:text-violet-200" />
                  </div>
                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-400">
                    {target.description}
                  </p>
                </button>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="rounded-[2rem] border border-cyan-500/20 bg-gradient-to-br from-slate-950 via-cyan-950/20 to-slate-950 p-6 text-white">
          <div className="mb-5 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <Badge className="mb-3 border-cyan-400/30 bg-cyan-400/10 text-cyan-200">
                <Globe2 className="mr-1 h-3.5 w-3.5" /> Market + Control
                Readiness
              </Badge>
              <h2 className="text-3xl font-black tracking-tight">
                China, USA, friends-market, settings, hands-free, and day-trade
                are voice-addressable.
              </h2>
              <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-300">
                Hope AI can route these surfaces now and labels every surface as
                DB-backed, local UI, paper-beta, or provider-gated so unhinged
                mode moves fast without pretending regulated execution is live.
              </p>
            </div>
            <Button
              className="border-0 bg-cyan-500 font-black text-black hover:bg-cyan-400"
              onClick={() =>
                runVoiceCommand(
                  "Hope, unhinged mode voice everything for China USA friends market settings and day trading"
                )
              }
              disabled={voiceCommand.isPending}
            >
              <Languages className="mr-2 h-4 w-4" /> Voice Full Market Stack
            </Button>
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {marketControls.map(control => (
              <button
                key={control.key}
                onClick={() => runVoiceCommand(control.voice)}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left transition hover:border-cyan-400/40 hover:bg-cyan-500/10"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="font-black text-white">{control.label}</p>
                    <p className="mt-1 font-mono text-[11px] text-cyan-200">
                      {control.route}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-500 transition group-hover:translate-x-1 group-hover:text-cyan-200" />
                </div>
                <Badge className={controlTone(control.status)}>
                  {readinessLabel(control.status)}
                </Badge>
                <p className="mt-3 text-xs leading-5 text-slate-400">
                  {control.promise}
                </p>
                <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {control.voice}
                </p>
              </button>
            ))}
          </div>
          <div className="mt-4 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-4 text-sm leading-6 text-amber-100">
            Day-trade, futures, copy trading, payments, casino payouts, and
            crypto transfers remain kill-switch/provider-gated. The controls are
            wired for routing, paper/test flows, audit labels, and operator
            review before any live regulated execution.
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <Card className="border-emerald-500/20 bg-slate-950/80 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-emerald-300" /> Tip, Like, Post,
                List, Stream, Wave
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={actionText}
                onChange={event => setActionText(event.target.value)}
                className="min-h-28 border-white/10 bg-white/5 text-white"
              />
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {quickActionCopy.map(item => {
                  const Icon = item.icon;
                  return (
                    <Button
                      key={item.action}
                      variant="outline"
                      className={`h-auto justify-start rounded-2xl border p-4 ${item.tone}`}
                      onClick={() => runQuickAction(item.action)}
                      disabled={quickAction.isPending}
                    >
                      <Icon className="mr-3 h-5 w-5" />
                      <span className="text-left">
                        <span className="block font-black">{item.label}</span>
                        <span className="block text-xs opacity-75">
                          {item.needs
                            ? `Uses ${item.needs}`
                            : "No extra ID needed"}
                        </span>
                      </span>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="border-yellow-500/20 bg-slate-950/80 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-yellow-200" /> Crypto Beta
                Wallet Logic
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {topBalances.map(balance => (
                <div
                  key={balance.coin}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400/10 text-sm font-black text-yellow-200">
                      {balance.icon}
                    </div>
                    <div>
                      <p className="font-black">{balance.symbol}</p>
                      <p className="text-xs text-slate-400">
                        {balance.chain} · {balance.source}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-sm text-white">
                      {Number(balance.amount).toLocaleString()}
                    </p>
                    <p className="text-xs text-emerald-300">
                      {formatUsd(balance.usdValue)}
                    </p>
                  </div>
                </div>
              ))}
              <div className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-4 text-sm leading-6 text-amber-100">
                Stripe, real crypto transfers, and on-chain movement remain
                provider-gated. Hope AI can prepare, log, and explain actions,
                while production money movement requires configured secrets and
                intentional rollout.
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="rounded-[2rem] border border-emerald-500/20 bg-gradient-to-br from-slate-950 via-emerald-950/20 to-slate-950 p-6 text-white">
          <div className="mb-5 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <Badge className="mb-3 border-emerald-400/30 bg-emerald-400/10 text-emerald-200">
                <ShieldCheck className="mr-1 h-3.5 w-3.5" /> Production
                Readiness
              </Badge>
              <h2 className="text-3xl font-black tracking-tight">
                Live persistence map, not mainnet hype.
              </h2>
              <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-300">
                Hope AI now exposes a backend truth map that separates DB-backed
                platform actions from beta-ledger flows, partial persistence,
                provider-gated money movement, and adapter-ready wallet-contract
                work.
              </p>
            </div>
            <Button
              className="border-0 bg-emerald-500 font-black text-black hover:bg-emerald-400"
              onClick={() =>
                runVoiceCommand("show production readiness and mainnet status")
              }
              disabled={voiceCommand.isPending}
            >
              <Gauge className="mr-2 h-4 w-4" /> Ask Hope Readiness
            </Button>
          </div>
          <div className="mb-5 grid gap-3 md:grid-cols-4">
            <div className="rounded-2xl border border-red-400/25 bg-red-400/10 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-red-200">
                Mainnet
              </p>
              <p className="mt-1 text-lg font-black text-white">NOT DEPLOYED</p>
            </div>
            <div className="rounded-2xl border border-amber-400/25 bg-amber-400/10 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-amber-200">
                Wallet Connect
              </p>
              <p className="mt-1 text-lg font-black text-white">
                Adapter Ready
              </p>
              <p className="text-xs text-amber-100">not mainnet</p>
            </div>
            <div className="rounded-2xl border border-emerald-400/25 bg-emerald-400/10 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-emerald-200">
                Live / DB-backed
              </p>
              <p className="mt-1 text-2xl font-black text-white">
                {liveAreas.length}
              </p>
            </div>
            <div className="rounded-2xl border border-violet-400/25 bg-violet-400/10 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-violet-200">
                Prep / gated
              </p>
              <p className="mt-1 text-2xl font-black text-white">
                {prepAreas.length}
              </p>
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="grid gap-3 md:grid-cols-2">
              {readinessAreas.map(area => (
                <Card
                  key={area.area}
                  className="border-white/10 bg-black/20 text-white"
                >
                  <CardContent className="p-4">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                      <p className="font-black">{area.area}</p>
                      <Badge className={readinessTone(area.stage)}>
                        {readinessLabel(area.stage)}
                      </Badge>
                    </div>
                    <p className="text-sm leading-6 text-slate-300">
                      {area.userPromise}
                    </p>
                    <p className="mt-3 text-xs leading-5 text-slate-500">
                      Persistence: {area.persistence}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {area.controls.slice(0, 4).map(control => (
                        <span
                          key={control}
                          className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-1 text-[11px] text-slate-300"
                        >
                          {control}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="border-amber-400/20 bg-amber-400/5 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Rocket className="h-5 w-5 text-amber-200" /> Next persistence
                  targets
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {nextPersistenceTargets.map(target => (
                  <div
                    key={target}
                    className="rounded-2xl border border-amber-400/20 bg-black/20 p-3 text-sm leading-6 text-amber-50"
                  >
                    {target}
                  </div>
                ))}
                <div className="rounded-2xl border border-red-400/20 bg-red-400/5 p-3 text-sm leading-6 text-red-100">
                  Real money movement stays behind provider configuration and
                  environment secrets. Hope AI may plan and log adapter work,
                  but this UI does not claim mainnet deployment.
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="rounded-[2rem] border border-fuchsia-500/20 bg-gradient-to-br from-slate-950 via-fuchsia-950/20 to-slate-950 p-6 text-white">
          <div className="mb-5 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <Badge className="mb-3 border-fuchsia-400/30 bg-fuchsia-400/10 text-fuchsia-200">
                <BrainCircuit className="mr-1 h-3.5 w-3.5" /> AI Development Wow
                Factor
              </Badge>
              <h2 className="text-3xl font-black tracking-tight">
                {aiDev.data?.headline ?? "AI Development Showcase"}
              </h2>
              <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-300">
                {aiDev.data?.subheadline}
              </p>
            </div>
            <Button
              className="border-0 bg-fuchsia-500 font-black text-white hover:bg-fuchsia-400"
              onClick={() =>
                planSprint.mutate({ intent, market, mode: "guided" })
              }
              disabled={planSprint.isPending}
            >
              <Cpu className="mr-2 h-4 w-4" /> Plan Next Sprint
            </Button>
          </div>
          <Textarea
            value={intent}
            onChange={event => setIntent(event.target.value)}
            className="mb-5 min-h-24 border-white/10 bg-white/5 text-white"
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {(aiDev.data?.metrics ?? []).map(metric => (
              <Card
                key={metric.label}
                className="border-white/10 bg-white/[0.04] text-white"
              >
                <CardContent className="p-4">
                  <div className="mb-3 flex items-center gap-2 text-fuchsia-200">
                    <Gauge className="h-4 w-4" />
                    <span className="text-xs uppercase tracking-[0.2em]">
                      {metric.label}
                    </span>
                  </div>
                  <p className="text-2xl font-black">{metric.value}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {metric.detail}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-5 grid gap-5 lg:grid-cols-3">
            <FeatureList
              title="Innovation"
              icon={Sparkles}
              items={aiDev.data?.innovationHighlights ?? []}
            />
            <FeatureList
              title="Technical Stack"
              icon={Crown}
              items={aiDev.data?.technicalStack ?? []}
            />
            <FeatureList
              title="Trust Architecture"
              icon={ShieldCheck}
              items={aiDev.data?.safetyArchitecture ?? []}
            />
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <MiniPanel
            icon={Languages}
            title="China / USA / friends-market logic"
            body="U.S., global, China-ready, and friends-market copy lives in the orchestration layer so the same Hope AI action can explain its market context."
          />
          <MiniPanel
            icon={Globe2}
            title="Full-product routing"
            body="Marketplace, casino, game center, day-trade, settings, dating, livestream, wallet, admin, analytics, AI tools, and Sky Blue IT surfaces are now commandable from one page."
          />
          <MiniPanel
            icon={CheckCircle2}
            title="Auditable kill-switch autonomy"
            body="Voice and quick actions log planned, completed, and blocked outcomes instead of silently guessing risky money, trading, casino, or moderation steps."
          />
        </section>
      </div>
    </div>
  );
}

function FeatureList({
  title,
  icon: Icon,
  items,
}: {
  title: string;
  icon: typeof Sparkles;
  items: string[];
}) {
  return (
    <Card className="border-white/10 bg-black/20 text-white">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Icon className="h-4 w-4 text-fuchsia-200" /> {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map(item => (
          <p
            key={item}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm leading-6 text-slate-300"
          >
            {item}
          </p>
        ))}
      </CardContent>
    </Card>
  );
}

function MiniPanel({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof Sparkles;
  title: string;
  body: string;
}) {
  return (
    <Card className="border-cyan-500/15 bg-slate-950/80 text-white">
      <CardContent className="p-5">
        <Icon className="mb-3 h-6 w-6 text-cyan-300" />
        <p className="text-lg font-black">{title}</p>
        <p className="mt-2 text-sm leading-6 text-slate-400">{body}</p>
      </CardContent>
    </Card>
  );
}
