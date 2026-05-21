import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, MessageCircle, ShieldCheck, Sparkles, Users } from "lucide-react";

const featuredProfiles = [
  { name: "Astra", vibe: "Cosmic builder", match: 94, tags: ["Web3", "Music", "Travel"] },
  { name: "Nova", vibe: "Creative investor", match: 88, tags: ["Crypto", "Art", "Startups"] },
  { name: "Lux", vibe: "Founder energy", match: 91, tags: ["Fitness", "AI", "Finance"] },
];

export default function PolishedDating() {
  const [selected, setSelected] = useState(featuredProfiles[0]);
  const [likes, setLikes] = useState(444);

  const compatibility = useMemo(() => {
    return Math.max(72, Math.min(99, selected.match + Math.floor(likes % 6)));
  }, [likes, selected.match]);

  function sendDemoLike() {
    setLikes((current) => current + 1);
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#37132f,#09090b_45%)] p-6 text-white">
      <section className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-3xl border border-pink-400/30 bg-black/45 p-8 shadow-2xl shadow-pink-500/10">
          <Badge className="mb-4 border-pink-400/40 bg-pink-400/10 text-pink-200">Social Beta</Badge>
          <h1 className="text-4xl font-black tracking-tight md:text-6xl">AetherLux Dating Lounge</h1>
          <p className="mt-3 max-w-3xl text-sm text-zinc-300 md:text-base">
            A polished social discovery route for the crypto playground: creator profiles, interest matching, safe messaging, and future token-powered premium interactions. This beta is interface-ready and designed for database-backed social profiles.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {featuredProfiles.map((profile) => (
            <Card
              key={profile.name}
              onClick={() => setSelected(profile)}
              className={`cursor-pointer border-white/10 bg-zinc-950/85 text-white transition hover:border-pink-300/60 ${selected.name === profile.name ? "ring-2 ring-pink-400" : ""}`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-400 to-purple-500">
                    <Heart className="h-7 w-7 text-black" />
                  </div>
                  <Badge variant="outline" className="border-pink-400/40 text-pink-200">{profile.match}% match</Badge>
                </div>
                <CardTitle>{profile.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-zinc-300">
                <p>{profile.vibe}</p>
                <div className="flex flex-wrap gap-2">
                  {profile.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-xs text-zinc-200">{tag}</span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-pink-400/20 bg-zinc-950/85 text-white">
          <CardContent className="grid gap-6 p-6 md:grid-cols-[1fr_0.9fr] md:items-center">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Sparkles className="h-6 w-6 text-pink-300" />
                <h2 className="text-2xl font-black">Selected Match: {selected.name}</h2>
              </div>
              <p className="text-sm text-zinc-300">
                Compatibility engine preview: {compatibility}% alignment based on profile interests, social signals, and beta engagement scoring.
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <Users className="mb-2 h-5 w-5 text-cyan-300" />
                  <p className="text-xs text-zinc-400">Community</p>
                  <p className="text-xl font-black">{likes.toLocaleString()}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <MessageCircle className="mb-2 h-5 w-5 text-emerald-300" />
                  <p className="text-xs text-zinc-400">Messages</p>
                  <p className="text-xl font-black">Ready</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <ShieldCheck className="mb-2 h-5 w-5 text-amber-300" />
                  <p className="text-xs text-zinc-400">Safety</p>
                  <p className="text-xl font-black">Moderated</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <Button onClick={sendDemoLike} className="h-14 w-full bg-pink-400 text-lg font-black text-black hover:bg-pink-300">
                <Heart className="mr-2 h-5 w-5" /> Send Demo Like
              </Button>
              <div className="rounded-xl border border-pink-400/20 bg-pink-400/10 p-4 text-sm text-pink-100">
                Future utility path: premium boosts, creator tipping, safe escrow introductions, and SKY4444 reward loops can connect through the persistent wallet and tipping routers.
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
