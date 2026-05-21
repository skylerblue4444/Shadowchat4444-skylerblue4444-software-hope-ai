import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins, Radio, ShieldCheck, Sparkles, Users, Video } from "lucide-react";

const channels = [
  { title: "SKY4444 Market Room", host: "Skyler Blue", viewers: 444, topic: "Token utility, mining, and founder updates" },
  { title: "AetherLux Builder Stream", host: "Aether Swarm", viewers: 277, topic: "Product drops, UI showcases, and launch checklist" },
  { title: "ShadowChat Social Stage", host: "Community", viewers: 188, topic: "Creators, tips, and member interviews" },
];

export default function PolishedLiveStream() {
  const [activeChannel, setActiveChannel] = useState(channels[0]);
  const [tipPool, setTipPool] = useState(4444);

  const platformFee = useMemo(() => Math.round(tipPool * 0.15), [tipPool]);
  const creatorShare = tipPool - platformFee;
  const charityBurnSplit = Math.round(platformFee * 0.5);

  function sendDemoTip() {
    setTipPool((current) => current + 144);
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#23124d,#09090b_45%)] p-6 text-white">
      <section className="mx-auto max-w-6xl space-y-6">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="rounded-3xl border border-cyan-400/30 bg-black/50 p-6 shadow-2xl shadow-cyan-500/10">
            <div className="mb-4 flex items-center justify-between">
              <Badge className="border-red-400/40 bg-red-400/10 text-red-200">Live Beta</Badge>
              <div className="flex items-center gap-2 text-sm text-red-200"><Radio className="h-4 w-4" /> Broadcasting Preview</div>
            </div>
            <div className="flex aspect-video items-center justify-center rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 via-indigo-950 to-black">
              <div className="text-center">
                <Video className="mx-auto mb-4 h-16 w-16 text-cyan-300" />
                <h1 className="text-3xl font-black md:text-5xl">{activeChannel.title}</h1>
                <p className="mt-3 text-zinc-300">Hosted by {activeChannel.host}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-zinc-300">{activeChannel.topic}</p>
          </div>

          <Card className="border-amber-400/20 bg-zinc-950/85 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Coins className="h-5 w-5 text-amber-300" /> Demo Tip Economy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-2xl bg-amber-400/10 p-5 text-center">
                <p className="text-xs uppercase tracking-widest text-amber-200">Current Tip Pool</p>
                <p className="text-4xl font-black text-amber-300">{tipPool.toLocaleString()} SKY</p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-white/5 p-3">
                  <p className="text-zinc-400">Creator share</p>
                  <p className="font-black text-emerald-300">{creatorShare.toLocaleString()} SKY</p>
                </div>
                <div className="rounded-xl bg-white/5 p-3">
                  <p className="text-zinc-400">15% fee</p>
                  <p className="font-black text-pink-300">{platformFee.toLocaleString()} SKY</p>
                </div>
                <div className="rounded-xl bg-white/5 p-3">
                  <p className="text-zinc-400">Charity split</p>
                  <p className="font-black text-cyan-300">{charityBurnSplit.toLocaleString()} SKY</p>
                </div>
                <div className="rounded-xl bg-white/5 p-3">
                  <p className="text-zinc-400">Burn reserve</p>
                  <p className="font-black text-orange-300">{(platformFee - charityBurnSplit).toLocaleString()} SKY</p>
                </div>
              </div>
              <Button onClick={sendDemoTip} className="h-12 w-full bg-cyan-400 font-black text-black hover:bg-cyan-300">
                <Sparkles className="mr-2 h-5 w-5" /> Send Demo Tip
              </Button>
              <div className="flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-3 text-xs text-emerald-200">
                <ShieldCheck className="h-4 w-4" /> Beta accounting preview only; real payments require explicit production setup.
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {channels.map((channel) => (
            <Card
              key={channel.title}
              onClick={() => setActiveChannel(channel)}
              className={`cursor-pointer border-white/10 bg-zinc-950/85 text-white transition hover:border-cyan-300/60 ${activeChannel.title === channel.title ? "ring-2 ring-cyan-400" : ""}`}
            >
              <CardContent className="space-y-3 p-5">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="border-cyan-400/40 text-cyan-200">Channel</Badge>
                  <span className="flex items-center gap-1 text-xs text-zinc-300"><Users className="h-4 w-4" /> {channel.viewers}</span>
                </div>
                <h2 className="text-lg font-black">{channel.title}</h2>
                <p className="text-sm text-zinc-400">{channel.topic}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
