import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  Coins,
  Globe2,
  HeartHandshake,
  Loader2,
  MessageSquareText,
  Radio,
  Rocket,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

type Market = "global" | "usa" | "china";
type Focus = "founder_story" | "marketplace" | "livestream" | "dating" | "full_platform";
type QuickAction =
  | "create_feed_post"
  | "publish_listing"
  | "start_stream"
  | "tip_creator"
  | "like_post"
  | "comment_post"
  | "share_post"
  | "dating_wave"
  | "admin_review";

const MARKET_OPTIONS: Array<{ value: Market; label: string; description: string }> = [
  { value: "global", label: "Global", description: "One platform story for social commerce, creator monetization, and Hope AI guided operations." },
  { value: "usa", label: "United States", description: "Founder-led trust, family mission, cybersecurity credibility, and creator commerce readiness." },
  { value: "china", label: "China-ready", description: "Concise bilingual product copy, mini-program style commerce, privacy, and community-first positioning." },
];

const FOCUS_OPTIONS: Array<{ value: Focus; label: string }> = [
  { value: "full_platform", label: "Full platform boost" },
  { value: "founder_story", label: "Founder story" },
  { value: "marketplace", label: "Marketplace" },
  { value: "livestream", label: "Livestream" },
  { value: "dating", label: "Dating and community" },
];

const QUICK_ACTIONS: Array<{ action: QuickAction; label: string; helper: string; icon: typeof Sparkles; className: string }> = [
  {
    action: "create_feed_post",
    label: "Post founder update",
    helper: "Publish a Hope AI profile-feed post with bilingual market context.",
    icon: MessageSquareText,
    className: "border-cyan-400/30 bg-cyan-400/10 text-cyan-100",
  },
  {
    action: "publish_listing",
    label: "List Hope service",
    helper: "Create a seller offer for full-stack, cybersecurity, and AI implementation work.",
    icon: ShoppingCart,
    className: "border-amber-400/30 bg-amber-400/10 text-amber-100",
  },
  {
    action: "start_stream",
    label: "Open build room",
    helper: "Create a livestream room for demos, community updates, and marketplace launches.",
    icon: Radio,
    className: "border-red-400/30 bg-red-400/10 text-red-100",
  },
  {
    action: "tip_creator",
    label: "Tip creator",
    helper: "Send a beta-ledger SKY4444 encouragement tip to a selected creator ID.",
    icon: Coins,
    className: "border-emerald-400/30 bg-emerald-400/10 text-emerald-100",
  },
];

function numberOrUndefined(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
}

export default function HopeAI() {
  const utils = trpc.useUtils();
  const [market, setMarket] = useState<Market>("global");
  const [focus, setFocus] = useState<Focus>("full_platform");
  const [intent, setIntent] = useState(
    "Enhance Hope AI hands-free free-will engineering for U.S. and China-ready social commerce, livestream, marketplace, dating, wallet education, admin trust controls, and founder story growth.",
  );
  const [actionText, setActionText] = useState(
    "Skyler Blue Spillers is building Hope AI to help families, creators, small businesses, and community builders move faster with ethical cybersecurity-aware full-stack software.",
  );
  const [targetUserId, setTargetUserId] = useState("1");
  const [postId, setPostId] = useState("");

  const mission = trpc.hopeAi.missionControl.useQuery({ market });
  const planSprint = trpc.hopeAi.planSprint.useMutation({
    onSuccess: async (data) => {
      toast.success(data.resultSummary);
      await utils.hopeAi.missionControl.invalidate();
    },
    onError: (error) => toast.error(error.message),
  });
  const quickAction = trpc.hopeAi.quickAction.useMutation({
    onSuccess: async (data) => {
      toast.success(data.resultSummary);
      await utils.hopeAi.missionControl.invalidate();
    },
    onError: (error) => toast.error(error.message),
  });
  const handsFreeBoost = trpc.hopeAi.runHandsFreeBoost.useMutation({
    onSuccess: async (data) => {
      toast.success(data.resultSummary);
      await utils.hopeAi.missionControl.invalidate();
    },
    onError: (error) => toast.error(error.message),
  });

  const balances = mission.data?.balances ?? [];
  const balanceTotal = useMemo(
    () =>
      balances.reduce((sum, balance) => {
        const walletBalance = balance as { availableBalance?: string | number; balance?: string | number };
        return sum + Number(walletBalance.availableBalance ?? walletBalance.balance ?? 0);
      }, 0),
    [balances],
  );
  const marketData = mission.data?.market;
  const latestRuns = mission.data?.latestRuns ?? [];
  const recommendedActions = mission.data?.recommendedActions ?? [];

  function runPlan() {
    planSprint.mutate({ intent, market, mode: "hands_free" });
  }

  function runBoost() {
    handsFreeBoost.mutate({ market, focus });
  }

  function runQuick(action: QuickAction) {
    quickAction.mutate({
      action,
      market,
      mode: "hands_free",
      title:
        action === "publish_listing"
          ? "Hope AI Full-Stack Cybersecurity Innovation Package"
          : action === "start_stream"
            ? "Hope AI Hands-Free Build Room"
            : "Hope AI Founder Update",
      content: actionText,
      coin: "SKY4444",
      amount: action === "tip_creator" ? 144 : undefined,
      targetUserId: action === "tip_creator" || action === "dating_wave" ? numberOrUndefined(targetUserId) : undefined,
      postId: ["like_post", "comment_post", "share_post"].includes(action) ? numberOrUndefined(postId) : undefined,
      category: "ai-services",
      price: "444.00",
    });
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#0f766e,#020617_35%,#09090b_70%)] p-6 text-white">
      <section className="mx-auto max-w-7xl space-y-6">
        <div className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
          <Card className="overflow-hidden border-cyan-400/20 bg-black/55 text-white shadow-2xl shadow-cyan-500/10">
            <CardContent className="space-y-6 p-7">
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="border-cyan-300/40 bg-cyan-300/10 text-cyan-100">Hope AI Hands-Free</Badge>
                <Badge className="border-amber-300/40 bg-amber-300/10 text-amber-100">Free-Will Engineering</Badge>
                <Badge className="border-emerald-300/40 bg-emerald-300/10 text-emerald-100">U.S. + China-ready</Badge>
              </div>
              <div className="space-y-4">
                <h1 className="max-w-5xl text-4xl font-black tracking-tight md:text-6xl">
                  Hope AI mission control for founder-led social commerce, creator monetization, and ethical automation.
                </h1>
                <p className="max-w-4xl text-base leading-7 text-zinc-300 md:text-lg">
                  Built for Skyler Blue Spillers and Sky Blue Innovative Information Technology Resolutions, this dashboard turns prior engineering notes into guided actions: publish posts, open livestream rooms, list marketplace services, record beta-ledger tips, and keep trust gates visible while the platform grows.
                </p>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-widest text-zinc-400">Operator</p>
                  <p className="mt-2 text-xl font-black">{mission.data?.operator.founder ?? "Skyler Blue Spillers"}</p>
                  <p className="text-xs text-cyan-200">{mission.data?.operator.role ?? "authenticated"} role</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-widest text-zinc-400">Beta wallet visibility</p>
                  <p className="mt-2 text-xl font-black text-amber-200">{balanceTotal.toLocaleString()} total units</p>
                  <p className="text-xs text-zinc-400">Across configured ledger coins</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-widest text-zinc-400">Production gates</p>
                  <p className="mt-2 text-xl font-black text-emerald-200">Securely gated</p>
                  <p className="text-xs text-zinc-400">External money movement stays provider-configured</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-400/20 bg-zinc-950/85 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Globe2 className="h-5 w-5 text-amber-300" /> Market Mode</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <select
                value={market}
                onChange={(event) => setMarket(event.target.value as Market)}
                className="h-11 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-white outline-none"
              >
                {MARKET_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
              </select>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-lg font-black">{marketData?.name ?? "Global"}</p>
                <p className="mt-2 text-sm text-zinc-300">{marketData?.positioning ?? MARKET_OPTIONS.find((option) => option.value === market)?.description}</p>
              </div>
              <div className="space-y-2">
                {(marketData?.guidance ?? []).map((item) => (
                  <div key={item} className="flex gap-2 rounded-xl bg-emerald-400/10 p-3 text-sm text-emerald-100">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> {item}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <Card className="border-cyan-400/20 bg-zinc-950/85 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Brain className="h-5 w-5 text-cyan-300" /> Guided Sprint Planner</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea value={intent} onChange={(event) => setIntent(event.target.value)} className="min-h-36 border-white/10 bg-black/40 text-white" />
              <Button disabled={planSprint.isPending} onClick={runPlan} className="h-12 w-full bg-cyan-400 font-black text-black hover:bg-cyan-300">
                {planSprint.isPending ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Sparkles className="mr-2 h-5 w-5" />} Plan hands-free sprint
              </Button>
              <div className="grid gap-3 md:grid-cols-2">
                {recommendedActions.slice(0, 4).map((action) => (
                  <div key={action.key} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="font-black text-white">{action.label}</p>
                    <p className="text-xs text-cyan-200">{action.labelZh}</p>
                    <p className="mt-2 text-sm text-zinc-400">{action.description}</p>
                    <p className="mt-3 text-xs text-emerald-200">Confidence {Math.round(action.confidence * 100)}%</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-emerald-400/20 bg-zinc-950/85 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Rocket className="h-5 w-5 text-emerald-300" /> One-Click Hands-Free Boost</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <select
                value={focus}
                onChange={(event) => setFocus(event.target.value as Focus)}
                className="h-11 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-white outline-none"
              >
                {FOCUS_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
              </select>
              <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-5">
                <p className="text-2xl font-black text-emerald-100">Feed + livestream + marketplace in one flow</p>
                <p className="mt-2 text-sm leading-6 text-emerald-50/80">
                  The boost creates a Hope AI founder post, schedules a livestream build room, and publishes a service listing using the current market positioning. Every run is saved for audit-style review.
                </p>
              </div>
              <Button disabled={handsFreeBoost.isPending} onClick={runBoost} className="h-12 w-full bg-emerald-400 font-black text-black hover:bg-emerald-300">
                {handsFreeBoost.isPending ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Zap className="mr-2 h-5 w-5" />} Run full boost
              </Button>
              <div className="flex gap-2 rounded-xl border border-amber-400/20 bg-amber-400/10 p-3 text-xs text-amber-100">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" /> Beta ledger and database actions are enabled; Stripe, bank, and on-chain movement remain controlled by provider configuration and environment secrets.
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-white/10 bg-zinc-950/85 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><HeartHandshake className="h-5 w-5 text-pink-300" /> Quick Actions: Post, Tip, Like, List, Stream</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-3 lg:grid-cols-[1fr_0.28fr_0.28fr]">
              <Textarea value={actionText} onChange={(event) => setActionText(event.target.value)} className="min-h-24 border-white/10 bg-black/40 text-white" />
              <Input value={targetUserId} onChange={(event) => setTargetUserId(event.target.value)} placeholder="Creator/user ID" className="border-white/10 bg-black/40 text-white" />
              <Input value={postId} onChange={(event) => setPostId(event.target.value)} placeholder="Post ID" className="border-white/10 bg-black/40 text-white" />
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {QUICK_ACTIONS.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.action}
                    type="button"
                    onClick={() => runQuick(item.action)}
                    disabled={quickAction.isPending}
                    className={`rounded-2xl border p-5 text-left transition hover:-translate-y-1 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60 ${item.className}`}
                  >
                    <Icon className="mb-4 h-7 w-7" />
                    <p className="text-lg font-black">{item.label}</p>
                    <p className="mt-2 text-sm opacity-80">{item.helper}</p>
                    <span className="mt-4 inline-flex items-center text-xs font-bold uppercase tracking-widest">Run action <ArrowRight className="ml-2 h-3 w-3" /></span>
                  </button>
                );
              })}
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              <Button disabled={quickAction.isPending || !postId} onClick={() => runQuick("like_post")} variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white/10">Like post</Button>
              <Button disabled={quickAction.isPending || !postId} onClick={() => runQuick("comment_post")} variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white/10">Comment post</Button>
              <Button disabled={quickAction.isPending || !postId} onClick={() => runQuick("share_post")} variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white/10">Share post</Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-white/10 bg-zinc-950/85 text-white">
            <CardHeader><CardTitle>Latest Hope AI Runs</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {mission.isLoading ? <p className="text-sm text-zinc-400">Loading run history...</p> : null}
              {!mission.isLoading && latestRuns.length === 0 ? <p className="text-sm text-zinc-400">No Hope AI action runs yet. Plan a sprint or run the hands-free boost to create the first record.</p> : null}
              {latestRuns.map((run) => (
                <div key={run.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-black">{run.intent}</p>
                    <Badge variant="outline" className="border-cyan-400/40 text-cyan-200">{run.status}</Badge>
                  </div>
                  <p className="mt-2 text-sm text-zinc-300">{run.resultSummary}</p>
                  <p className="mt-2 text-xs uppercase tracking-widest text-zinc-500">{run.market} · {run.mode}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-zinc-950/85 text-white">
            <CardHeader><CardTitle>Founder and Engineering Value</CardTitle></CardHeader>
            <CardContent className="space-y-4 text-sm leading-6 text-zinc-300">
              <p>
                Hope AI is positioned around practical resilience: cybersecurity graduate work, information technology education, software development training, ethical-hacker discipline, full-stack operations, community volunteering, family responsibility, and a desire to build a better life through useful software.
              </p>
              <p>
                The mission-control design keeps the platform ambitious without losing accountability. Every hands-free action is visible, every market recommendation is explainable, and every financial or crypto-adjacent action remains beta-ledger-safe until production providers are configured.
              </p>
              <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-cyan-100">
                Brand line: Sky Blue Innovative Information Technology Resolutions builds Hope AI software that turns hard-earned life experience into trustworthy, market-ready technology for creators, families, friends, and community businesses.
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
