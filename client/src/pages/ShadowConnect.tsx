import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  UserPlus,
  MessageCircle,
  Star,
  Briefcase,
  MapPin,
  Link,
  CheckCircle,
  TrendingUp,
  Award,
  Search,
  Zap,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const PROFILES = [
  {
    id: 1,
    name: "Skyler Blue Spiller",
    title: "CEO & Founder — Skyler Blue IT Resolutions",
    location: "Fort Smith, AR",
    connections: 444,
    skills: ["Managed IT", "Web3", "Leadership", "SKY4444"],
    verified: true,
    mutual: 12,
    avatar: "SB",
    gradient: "from-blue-500 to-purple-500",
  },
  {
    id: 2,
    name: "ShadowDev_01",
    title: "Lead Blockchain Engineer",
    location: "Remote",
    connections: 1200,
    skills: ["Solidity", "Rust", "DeFi", "Web3"],
    verified: true,
    mutual: 8,
    avatar: "SD",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    name: "CryptoVC_Mike",
    title: "Partner at ShadowCapital",
    location: "New York, NY",
    connections: 3400,
    skills: ["Venture Capital", "DeFi", "NFTs", "Tokenomics"],
    verified: true,
    mutual: 5,
    avatar: "CM",
    gradient: "from-green-500 to-teal-500",
  },
  {
    id: 4,
    name: "TrumpCoin_Dev",
    title: "Core Developer — TRUMP Coin",
    location: "Miami, FL",
    connections: 888,
    skills: ["Solidity", "Marketing", "Community", "TRUMP"],
    verified: false,
    mutual: 3,
    avatar: "TD",
    gradient: "from-red-500 to-orange-500",
  },
  {
    id: 5,
    name: "Web3_Sarah",
    title: "NFT Artist & Community Lead",
    location: "Austin, TX",
    connections: 2100,
    skills: ["NFT Art", "Community", "Discord", "Marketing"],
    verified: true,
    mutual: 7,
    avatar: "WS",
    gradient: "from-pink-500 to-rose-500",
  },
];

const POSTS = [
  {
    author: "Skyler Blue Spiller",
    avatar: "SB",
    gradient: "from-blue-500 to-purple-500",
    time: "2h ago",
    content:
      "🚀 Excited to announce that Skyler Blue IT Resolutions is now accepting SKY4444 for all managed IT services! Enterprise clients get 20% off when paying with SKY4444. DM me for details. #Web3 #ManagedIT #SKY4444",
    likes: 144,
    comments: 22,
    shares: 18,
  },
  {
    author: "ShadowDev_01",
    avatar: "SD",
    gradient: "from-purple-500 to-pink-500",
    time: "5h ago",
    content:
      "Just deployed the SKY4444 staking contract on mainnet. 44.4% APY for 12-month locks. The code is audited by ShadowSec. Check the GitHub repo for the full audit report. WAGMI 🔥",
    likes: 288,
    comments: 44,
    shares: 33,
  },
  {
    author: "CryptoVC_Mike",
    avatar: "CM",
    gradient: "from-green-500 to-teal-500",
    time: "1d ago",
    content:
      "Thesis: The next 10x projects will combine real-world utility (IT services, healthcare, real estate) with Web3 tokenomics. ShadowChat is doing exactly this. Watching closely. 👀",
    likes: 512,
    comments: 88,
    shares: 64,
  },
];

export default function ShadowConnect() {
  const [tab, setTab] = useState<"feed" | "people" | "network" | "messages">(
    "feed"
  );
  const [connected, setConnected] = useState<number[]>([1]);
  const [search, setSearch] = useState("");
  const [liked, setLiked] = useState<number[]>([]);

  const connect = (id: number, name: string) => {
    if (!connected.includes(id)) {
      setConnected(c => [...c, id]);
      toast.success(`✅ Connected with ${name}!`);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Users className="h-6 w-6 text-indigo-400" />
            ShadowConnect
          </h1>
          <p className="text-sm text-muted-foreground">
            Professional Web3 networking — verified on-chain identity
          </p>
        </div>
        <Badge className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 font-bold">
          🔗 Web3 LinkedIn
        </Badge>
      </div>

      <div className="flex gap-2">
        {(["feed", "people", "network", "messages"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-indigo-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "feed" && (
        <div className="space-y-3">
          {POSTS.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="border-border/50">
                <CardContent className="py-3 px-4">
                  <div className="flex items-start gap-3 mb-2">
                    <div
                      className={`h-10 w-10 rounded-full bg-gradient-to-br ${post.gradient} flex items-center justify-center text-white font-black text-sm shrink-0`}
                    >
                      {post.avatar}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{post.author}</p>
                      <p className="text-xs text-muted-foreground">
                        {post.time}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed mb-3">{post.content}</p>
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <button
                      onClick={() => {
                        setLiked(l =>
                          l.includes(i) ? l.filter(x => x !== i) : [...l, i]
                        );
                      }}
                      className={`flex items-center gap-1 ${liked.includes(i) ? "text-indigo-400" : ""}`}
                    >
                      👍 {post.likes + (liked.includes(i) ? 1 : 0)}
                    </button>
                    <button
                      className="flex items-center gap-1"
                      onClick={() => toast.info("Opening comments...")}
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      {post.comments}
                    </button>
                    <button
                      className="flex items-center gap-1"
                      onClick={() => toast.success("Post shared!")}
                    >
                      <Link className="h-3.5 w-3.5" />
                      {post.shares}
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "people" && (
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search professionals..."
              className="pl-9 h-9 text-xs"
            />
          </div>
          {PROFILES.filter(
            p =>
              search === "" ||
              p.name.toLowerCase().includes(search.toLowerCase()) ||
              p.title.toLowerCase().includes(search.toLowerCase())
          ).map((profile, i) => (
            <Card key={profile.id} className="border-border/50">
              <CardContent className="py-3 px-4">
                <div className="flex items-start gap-3">
                  <div
                    className={`h-12 w-12 rounded-full bg-gradient-to-br ${profile.gradient} flex items-center justify-center text-white font-black shrink-0`}
                  >
                    {profile.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <p className="font-bold text-sm">{profile.name}</p>
                      {profile.verified && (
                        <CheckCircle className="h-3.5 w-3.5 text-blue-400 fill-blue-400" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {profile.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3 inline mr-0.5" />
                      {profile.location} · {profile.connections} connections
                    </p>
                    {profile.mutual > 0 && (
                      <p className="text-xs text-indigo-400">
                        {profile.mutual} mutual connections
                      </p>
                    )}
                    <div className="flex gap-1 flex-wrap mt-1.5">
                      {profile.skills.slice(0, 3).map(s => (
                        <Badge
                          key={s}
                          className="text-xs bg-muted text-muted-foreground"
                        >
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="shrink-0">
                    {connected.includes(profile.id) ? (
                      <Badge className="text-xs bg-green-500/10 text-green-400 border-green-500/20">
                        ✓ Connected
                      </Badge>
                    ) : (
                      <Button
                        size="sm"
                        className="h-8 text-xs bg-indigo-600 text-white border-0"
                        onClick={() => connect(profile.id, profile.name)}
                      >
                        <UserPlus className="h-3.5 w-3.5 mr-1" />
                        Connect
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "network" && (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Connections", value: connected.length, emoji: "🔗" },
              { label: "Profile Views", value: "244", emoji: "👁️" },
              { label: "Endorsements", value: "88", emoji: "⭐" },
            ].map(s => (
              <Card key={s.label} className="border-border/50 text-center">
                <CardContent className="pt-2.5 pb-2.5">
                  <p className="text-lg">{s.emoji}</p>
                  <p className="font-black text-sm text-indigo-400">
                    {s.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-xs font-bold text-muted-foreground">
            YOUR CONNECTIONS
          </p>
          {PROFILES.filter(p => connected.includes(p.id)).map(profile => (
            <Card
              key={profile.id}
              className="border-indigo-500/20 bg-indigo-900/5"
            >
              <CardContent className="py-3 px-4 flex items-center gap-3">
                <div
                  className={`h-10 w-10 rounded-full bg-gradient-to-br ${profile.gradient} flex items-center justify-center text-white font-black shrink-0`}
                >
                  {profile.avatar}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm">{profile.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {profile.title}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 text-xs"
                  onClick={() => toast.info(`Messaging ${profile.name}...`)}
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "messages" && (
        <div className="space-y-2">
          {PROFILES.filter(p => connected.includes(p.id)).map(profile => (
            <Card
              key={profile.id}
              className="border-border/50 cursor-pointer hover:border-indigo-500/20 transition-all"
              onClick={() => toast.info(`Opening chat with ${profile.name}...`)}
            >
              <CardContent className="py-3 px-4 flex items-center gap-3">
                <div
                  className={`h-10 w-10 rounded-full bg-gradient-to-br ${profile.gradient} flex items-center justify-center text-white font-black shrink-0`}
                >
                  {profile.avatar}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm">{profile.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Tap to start a conversation...
                  </p>
                </div>
                <Zap className="h-4 w-4 text-indigo-400" />
              </CardContent>
            </Card>
          ))}
          {connected.length === 0 && (
            <Card className="border-border/50 text-center py-8">
              <p className="text-muted-foreground text-sm">
                Connect with professionals to message them
              </p>
              <Button
                size="sm"
                className="mt-2 h-8 text-xs bg-indigo-600 text-white border-0"
                onClick={() => setTab("people")}
              >
                Find People
              </Button>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
