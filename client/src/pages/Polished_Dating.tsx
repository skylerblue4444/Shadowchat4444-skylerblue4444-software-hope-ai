import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import {
  Heart,
  Loader2,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { toast } from "sonner";

const fallbackProfile = {
  id: 0,
  userId: 0,
  displayName: "SkyLux Match",
  age: 28,
  location: "Global",
  bio: "Database-backed social discovery is ready for creator matches, dating, marketplace intros, and livestream collabs.",
  interests: JSON.stringify(["SKY4444", "Shadow Coin", "Creators"]),
  seeking: "dating, creator collabs, marketplace partners",
  avatarUrl: null,
  compatibilityScore: 92,
  isVisible: 1,
};

function parseTags(value: string) {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed)
      ? parsed.slice(0, 5).map(String)
      : ["Crypto", "Creators"];
  } catch {
    return value
      .split(",")
      .map(item => item.trim())
      .filter(Boolean)
      .slice(0, 5);
  }
}

export default function PolishedDating() {
  const utils = trpc.useUtils();
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [profileForm, setProfileForm] = useState({
    displayName: "Sky Builder",
    age: 28,
    location: "Global",
    bio: "Crypto creator building social, marketplace, and livestream collaborations.",
    interests: "crypto, music, founders",
    seeking: "dating, creator collabs",
  });

  const discover = trpc.dating.discover.useQuery({ limit: 12 });
  const myProfile = trpc.dating.getMyProfile.useQuery();
  const matches = trpc.dating.getMatches.useQuery();
  const upsertProfile = trpc.dating.upsertProfile.useMutation({
    onSuccess: async () => {
      toast.success("Dating profile saved to the live beta backend.");
      await Promise.all([
        utils.dating.getMyProfile.invalidate(),
        utils.dating.discover.invalidate(),
      ]);
    },
    onError: error => toast.error(error.message),
  });
  const react = trpc.dating.react.useMutation({
    onSuccess: async result => {
      toast.success(
        result.matched
          ? "It is a match. Mutual interest unlocked."
          : "Reaction saved to the dating backend."
      );
      await Promise.all([
        utils.dating.discover.invalidate(),
        utils.dating.getMatches.invalidate(),
      ]);
    },
    onError: error => toast.error(error.message),
  });

  const profiles = discover.data?.length ? discover.data : [fallbackProfile];
  const selected =
    profiles.find(profile => profile.userId === selectedUserId) ??
    profiles[0] ??
    fallbackProfile;
  const selectedTags = parseTags(selected.interests);
  const compatibility = useMemo(
    () =>
      Math.max(
        72,
        Math.min(99, selected.compatibilityScore + (matches.data?.length ?? 0))
      ),
    [selected.compatibilityScore, matches.data?.length]
  );

  function saveProfile() {
    upsertProfile.mutate({
      displayName: profileForm.displayName,
      age: Number(profileForm.age),
      location: profileForm.location,
      bio: profileForm.bio,
      interests: profileForm.interests
        .split(",")
        .map(item => item.trim())
        .filter(Boolean),
      seeking: profileForm.seeking,
      isVisible: true,
    });
  }

  function sendReaction(action: "like" | "pass" | "superlike" | "block") {
    if (!selected.userId)
      return toast.info(
        "Select a live profile once database discovery has profiles available."
      );
    react.mutate({
      targetUserId: selected.userId,
      action,
      message:
        action === "superlike"
          ? "Premium SKY4444 superlike from the dating lounge."
          : undefined,
    });
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#37132f,#09090b_45%)] p-6 text-white">
      <section className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-3xl border border-pink-400/30 bg-black/45 p-8 shadow-2xl shadow-pink-500/10">
          <Badge className="mb-4 border-pink-400/40 bg-pink-400/10 text-pink-200">
            Database-Backed Social Beta
          </Badge>
          <h1 className="text-4xl font-black tracking-tight md:text-6xl">
            AetherLux Dating Lounge
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-zinc-300 md:text-base">
            Creator profiles, matching signals, likes, superlikes, blocks, and
            mutual matches are now wired to backend tables for the live
            SKYCOIN4444 production-beta experience.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {profiles.map(profile => (
            <Card
              key={profile.id}
              onClick={() => setSelectedUserId(profile.userId)}
              className={`cursor-pointer border-white/10 bg-zinc-950/85 text-white transition hover:border-pink-300/60 ${selected.userId === profile.userId ? "ring-2 ring-pink-400" : ""}`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-400 to-purple-500">
                    <Heart className="h-7 w-7 text-black" />
                  </div>
                  <Badge
                    variant="outline"
                    className="border-pink-400/40 text-pink-200"
                  >
                    {profile.compatibilityScore}% match
                  </Badge>
                </div>
                <CardTitle>{profile.displayName}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-zinc-300">
                <p>
                  {profile.age} · {profile.location}
                </p>
                <p className="line-clamp-2">{profile.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {parseTags(profile.interests).map(tag => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/10 px-3 py-1 text-xs text-zinc-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <Card className="border-pink-400/20 bg-zinc-950/85 text-white">
            <CardContent className="space-y-5 p-6">
              <div className="flex items-center gap-3">
                <Sparkles className="h-6 w-6 text-pink-300" />
                <h2 className="text-2xl font-black">
                  Selected Match: {selected.displayName}
                </h2>
              </div>
              <p className="text-sm text-zinc-300">{selected.bio}</p>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <Users className="mb-2 h-5 w-5 text-cyan-300" />
                  <p className="text-xs text-zinc-400">Compatibility</p>
                  <p className="text-xl font-black">{compatibility}%</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <MessageCircle className="mb-2 h-5 w-5 text-emerald-300" />
                  <p className="text-xs text-zinc-400">Matches</p>
                  <p className="text-xl font-black">
                    {matches.data?.length ?? 0}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <ShieldCheck className="mb-2 h-5 w-5 text-amber-300" />
                  <p className="text-xs text-zinc-400">Safety</p>
                  <p className="text-xl font-black">Moderated</p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <Button
                  disabled={react.isPending}
                  onClick={() => sendReaction("like")}
                  className="bg-pink-400 font-black text-black hover:bg-pink-300"
                >
                  <Heart className="mr-2 h-4 w-4" /> Like
                </Button>
                <Button
                  disabled={react.isPending}
                  onClick={() => sendReaction("superlike")}
                  className="bg-cyan-400 font-black text-black hover:bg-cyan-300"
                >
                  <Sparkles className="mr-2 h-4 w-4" /> Superlike
                </Button>
                <Button
                  disabled={react.isPending}
                  variant="outline"
                  onClick={() => sendReaction("pass")}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <X className="mr-2 h-4 w-4" /> Pass
                </Button>
              </div>
              {discover.isLoading && (
                <p className="flex items-center gap-2 text-sm text-pink-200">
                  <Loader2 className="h-4 w-4 animate-spin" /> Loading live
                  profiles...
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-zinc-950/85 text-white">
            <CardHeader>
              <CardTitle>Publish / Update My Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                value={profileForm.displayName}
                onChange={event =>
                  setProfileForm(current => ({
                    ...current,
                    displayName: event.target.value,
                  }))
                }
                className="border-white/10 bg-black/40"
                placeholder="Display name"
              />
              <div className="grid grid-cols-2 gap-3">
                <Input
                  type="number"
                  value={profileForm.age}
                  onChange={event =>
                    setProfileForm(current => ({
                      ...current,
                      age: Number(event.target.value),
                    }))
                  }
                  className="border-white/10 bg-black/40"
                />
                <Input
                  value={profileForm.location}
                  onChange={event =>
                    setProfileForm(current => ({
                      ...current,
                      location: event.target.value,
                    }))
                  }
                  className="border-white/10 bg-black/40"
                  placeholder="Location"
                />
              </div>
              <Textarea
                value={profileForm.bio}
                onChange={event =>
                  setProfileForm(current => ({
                    ...current,
                    bio: event.target.value,
                  }))
                }
                className="min-h-24 border-white/10 bg-black/40"
                placeholder="Bio"
              />
              <Input
                value={profileForm.interests}
                onChange={event =>
                  setProfileForm(current => ({
                    ...current,
                    interests: event.target.value,
                  }))
                }
                className="border-white/10 bg-black/40"
                placeholder="Interests, comma separated"
              />
              <Input
                value={profileForm.seeking}
                onChange={event =>
                  setProfileForm(current => ({
                    ...current,
                    seeking: event.target.value,
                  }))
                }
                className="border-white/10 bg-black/40"
                placeholder="Seeking"
              />
              <Button
                disabled={upsertProfile.isPending}
                onClick={saveProfile}
                className="h-12 w-full bg-pink-400 font-black text-black hover:bg-pink-300"
              >
                {upsertProfile.isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <ShieldCheck className="mr-2 h-4 w-4" />
                )}{" "}
                Save Live Profile
              </Button>
              <p className="text-xs text-zinc-400">
                Current backend profile:{" "}
                {myProfile.data?.displayName ?? "not yet published"}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
