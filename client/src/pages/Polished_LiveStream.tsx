import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import {
  Coins,
  Loader2,
  Radio,
  ShieldCheck,
  Sparkles,
  Users,
  Video,
} from "lucide-react";
import { toast } from "sonner";

const fallbackStream = {
  id: 0,
  hostId: 0,
  title: "SKY4444 Market Room",
  topic:
    "Token utility, mining, dating marketplace drops, and founder updates.",
  channelType: "livestream",
  streamUrl: null,
  thumbnailUrl: null,
  viewerCount: 444,
  tipPool: "4444",
  status: "live",
};

export default function PolishedLiveStream() {
  const utils = trpc.useUtils();
  const [activeStreamId, setActiveStreamId] = useState<number | null>(null);
  const [streamForm, setStreamForm] = useState({
    title: "SKYCOIN4444 Live Drop",
    topic:
      "Creator marketplace launch room with dating, feed, rewards, and Shadow Coin updates.",
    streamUrl: "",
    thumbnailUrl: "",
  });
  const [feedForm, setFeedForm] = useState({
    title: "Live launch update",
    content:
      "New livestream is open for marketplace drops, creator tips, and beta wallet rewards.",
    mediaUrl: "",
  });

  const streamsQuery = trpc.liveSocial.listStreams.useQuery({
    status: "all",
    limit: 24,
  });
  const streams = streamsQuery.data?.length
    ? streamsQuery.data
    : [fallbackStream];
  const activeStream =
    streams.find(stream => stream.id === activeStreamId) ??
    streams[0] ??
    fallbackStream;
  const tipPool = Number(activeStream.tipPool || 0);
  const platformFee = useMemo(() => Math.round(tipPool * 0.15), [tipPool]);
  const creatorShare = Math.max(0, tipPool - platformFee);
  const charityBurnSplit = Math.round(platformFee * 0.5);

  const startStream = trpc.liveSocial.startStream.useMutation({
    onSuccess: async () => {
      toast.success("Livestream created in the live backend.");
      await utils.liveSocial.listStreams.invalidate();
    },
    onError: error => toast.error(error.message),
  });
  const tipStream = trpc.liveSocial.tipStream.useMutation({
    onSuccess: async () => {
      toast.success("Creator tip posted to the beta ledger.");
      await utils.liveSocial.listStreams.invalidate();
    },
    onError: error => toast.error(error.message),
  });
  const createFeedPost = trpc.liveSocial.createFeedPost.useMutation({
    onSuccess: async () => {
      toast.success("YouTube-style feed post published.");
      await utils.liveSocial.listFeed.invalidate();
    },
    onError: error => toast.error(error.message),
  });

  function publishStream() {
    startStream.mutate({
      ...streamForm,
      channelType: "livestream",
      goLiveNow: true,
    });
  }

  function sendTip() {
    if (!activeStream.id)
      return toast.info("Select a live backend stream before sending a tip.");
    tipStream.mutate({
      streamId: activeStream.id,
      coin: "SKY4444",
      amount: 144,
      memo: "Polished livestream creator support",
    });
  }

  function publishFeedPost() {
    createFeedPost.mutate({ kind: "youtube", ...feedForm });
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#23124d,#09090b_45%)] p-6 text-white">
      <section className="mx-auto max-w-6xl space-y-6">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="rounded-3xl border border-cyan-400/30 bg-black/50 p-6 shadow-2xl shadow-cyan-500/10">
            <div className="mb-4 flex items-center justify-between">
              <Badge className="border-red-400/40 bg-red-400/10 text-red-200">
                Live Backend Beta
              </Badge>
              <div className="flex items-center gap-2 text-sm text-red-200">
                <Radio className="h-4 w-4" /> {activeStream.status}
              </div>
            </div>
            <div className="flex aspect-video items-center justify-center rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 via-indigo-950 to-black">
              <div className="text-center">
                <Video className="mx-auto mb-4 h-16 w-16 text-cyan-300" />
                <h1 className="text-3xl font-black md:text-5xl">
                  {activeStream.title}
                </h1>
                <p className="mt-3 text-zinc-300">
                  Host #{activeStream.hostId} · {activeStream.channelType}
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-zinc-300">{activeStream.topic}</p>
          </div>

          <Card className="border-amber-400/20 bg-zinc-950/85 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coins className="h-5 w-5 text-amber-300" /> Beta Tip Economy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-2xl bg-amber-400/10 p-5 text-center">
                <p className="text-xs uppercase tracking-widest text-amber-200">
                  Current Tip Pool
                </p>
                <p className="text-4xl font-black text-amber-300">
                  {tipPool.toLocaleString()} SKY
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-white/5 p-3">
                  <p className="text-zinc-400">Creator share</p>
                  <p className="font-black text-emerald-300">
                    {creatorShare.toLocaleString()} SKY
                  </p>
                </div>
                <div className="rounded-xl bg-white/5 p-3">
                  <p className="text-zinc-400">15% fee</p>
                  <p className="font-black text-pink-300">
                    {platformFee.toLocaleString()} SKY
                  </p>
                </div>
                <div className="rounded-xl bg-white/5 p-3">
                  <p className="text-zinc-400">Charity split</p>
                  <p className="font-black text-cyan-300">
                    {charityBurnSplit.toLocaleString()} SKY
                  </p>
                </div>
                <div className="rounded-xl bg-white/5 p-3">
                  <p className="text-zinc-400">Burn reserve</p>
                  <p className="font-black text-orange-300">
                    {(platformFee - charityBurnSplit).toLocaleString()} SKY
                  </p>
                </div>
              </div>
              <Button
                disabled={tipStream.isPending}
                onClick={sendTip}
                className="h-12 w-full bg-cyan-400 font-black text-black hover:bg-cyan-300"
              >
                {tipStream.isPending ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-5 w-5" />
                )}{" "}
                Tip 144 SKY4444
              </Button>
              <div className="flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-3 text-xs text-emerald-200">
                <ShieldCheck className="h-4 w-4" /> Database beta accounting is
                live; external money movement remains securely gated.
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {streams.map(stream => (
            <Card
              key={stream.id}
              onClick={() => setActiveStreamId(stream.id)}
              className={`cursor-pointer border-white/10 bg-zinc-950/85 text-white transition hover:border-cyan-300/60 ${activeStream.id === stream.id ? "ring-2 ring-cyan-400" : ""}`}
            >
              <CardContent className="space-y-3 p-5">
                <div className="flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className="border-cyan-400/40 text-cyan-200"
                  >
                    {stream.status}
                  </Badge>
                  <span className="flex items-center gap-1 text-xs text-zinc-300">
                    <Users className="h-4 w-4" /> {stream.viewerCount}
                  </span>
                </div>
                <h2 className="text-lg font-black">{stream.title}</h2>
                <p className="text-sm text-zinc-400 line-clamp-2">
                  {stream.topic}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-white/10 bg-zinc-950/85 text-white">
            <CardHeader>
              <CardTitle>Go Live Now</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                value={streamForm.title}
                onChange={event =>
                  setStreamForm(current => ({
                    ...current,
                    title: event.target.value,
                  }))
                }
                className="border-white/10 bg-black/40"
              />
              <Textarea
                value={streamForm.topic}
                onChange={event =>
                  setStreamForm(current => ({
                    ...current,
                    topic: event.target.value,
                  }))
                }
                className="min-h-24 border-white/10 bg-black/40"
              />
              <Input
                value={streamForm.streamUrl}
                onChange={event =>
                  setStreamForm(current => ({
                    ...current,
                    streamUrl: event.target.value,
                  }))
                }
                placeholder="Optional YouTube / stream URL"
                className="border-white/10 bg-black/40"
              />
              <Button
                disabled={startStream.isPending}
                onClick={publishStream}
                className="w-full bg-cyan-400 font-black text-black hover:bg-cyan-300"
              >
                Publish Livestream
              </Button>
            </CardContent>
          </Card>
          <Card className="border-white/10 bg-zinc-950/85 text-white">
            <CardHeader>
              <CardTitle>YouTube-Style Profile Feed</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                value={feedForm.title}
                onChange={event =>
                  setFeedForm(current => ({
                    ...current,
                    title: event.target.value,
                  }))
                }
                className="border-white/10 bg-black/40"
              />
              <Textarea
                value={feedForm.content}
                onChange={event =>
                  setFeedForm(current => ({
                    ...current,
                    content: event.target.value,
                  }))
                }
                className="min-h-24 border-white/10 bg-black/40"
              />
              <Input
                value={feedForm.mediaUrl}
                onChange={event =>
                  setFeedForm(current => ({
                    ...current,
                    mediaUrl: event.target.value,
                  }))
                }
                placeholder="Optional media URL"
                className="border-white/10 bg-black/40"
              />
              <Button
                disabled={createFeedPost.isPending}
                onClick={publishFeedPost}
                className="w-full bg-pink-400 font-black text-black hover:bg-pink-300"
              >
                Publish Feed Post
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
