import { useState } from "react";
import { motion } from "framer-motion";
import {
  Grid,
  Star,
  Download,
  Code,
  Coins,
  TrendingUp,
  Shield,
  ChevronRight,
  Search,
  Filter,
  Plus,
  Zap,
  Heart,
  Users,
  Crown,
  CheckCircle,
  Globe,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const CATEGORIES = [
  "All",
  "Finance",
  "Social",
  "Gaming",
  "Productivity",
  "Health",
  "Travel",
  "Shopping",
  "AI",
  "Entertainment",
];

const MINI_PROGRAMS = [
  {
    id: 1,
    name: "SkyTrade Lite",
    category: "Finance",
    emoji: "📈",
    desc: "Quick crypto trading widget with real-time prices and one-tap orders",
    installs: 44444,
    rating: 4.9,
    price: "Free",
    dev: "ShadowLabs",
    verified: true,
    featured: true,
    tags: ["Trading", "SKY4444"],
  },
  {
    id: 2,
    name: "TrumpPump",
    category: "Finance",
    emoji: "🇺🇸",
    desc: "TRUMP coin tracker with news, price alerts, and community sentiment",
    installs: 33000,
    rating: 4.8,
    price: "Free",
    dev: "TrumpTech",
    verified: true,
    featured: true,
    tags: ["TRUMP", "Alerts"],
  },
  {
    id: 3,
    name: "CharityDice",
    category: "Gaming",
    emoji: "🎲",
    desc: "Roll dice and donate winnings to charity — fun and impactful",
    installs: 28000,
    rating: 4.7,
    price: "Free",
    dev: "GoodGames",
    verified: true,
    featured: false,
    tags: ["Charity", "Gaming"],
  },
  {
    id: 4,
    name: "ShadowFit",
    category: "Health",
    emoji: "💪",
    desc: "Fitness tracker that rewards you with SKY4444 for hitting goals",
    installs: 19000,
    rating: 4.6,
    price: "Free",
    dev: "FitDAO",
    verified: false,
    featured: false,
    tags: ["Health", "Rewards"],
  },
  {
    id: 5,
    name: "CryptoWeather",
    category: "Productivity",
    emoji: "🌤️",
    desc: "Weather app that shows crypto prices alongside local weather",
    installs: 15000,
    rating: 4.5,
    price: "Free",
    dev: "WeatherDev",
    verified: false,
    featured: false,
    tags: ["Weather", "Prices"],
  },
  {
    id: 6,
    name: "NFT Gallery",
    category: "Social",
    emoji: "🖼️",
    desc: "Showcase your NFT collection with AR viewing and social sharing",
    installs: 22000,
    rating: 4.7,
    price: "Free",
    dev: "ArtDAO",
    verified: true,
    featured: false,
    tags: ["NFT", "AR"],
  },
  {
    id: 7,
    name: "SkyDating Quick",
    category: "Social",
    emoji: "💘",
    desc: "Quick swipe dating widget powered by AI matching",
    installs: 31000,
    rating: 4.4,
    price: "Free (Premium 444 SKY)",
    dev: "LoveDAO",
    verified: false,
    featured: false,
    tags: ["Dating", "AI"],
  },
  {
    id: 8,
    name: "DAO Voter",
    category: "Finance",
    emoji: "🏛️",
    desc: "Quick DAO voting widget — vote on proposals without leaving your feed",
    installs: 12000,
    rating: 4.8,
    price: "Free",
    dev: "GovLabs",
    verified: true,
    featured: false,
    tags: ["DAO", "Governance"],
  },
  {
    id: 9,
    name: "CryptoTaxi",
    category: "Travel",
    emoji: "🚕",
    desc: "Book rides and pay with SKY4444, TRUMP, or BTC",
    installs: 8900,
    rating: 4.3,
    price: "Free",
    dev: "RideDAO",
    verified: false,
    featured: false,
    tags: ["Travel", "Payments"],
  },
  {
    id: 10,
    name: "SkyShop",
    category: "Shopping",
    emoji: "🛍️",
    desc: "Quick shopping widget for the ShadowMarket",
    installs: 17000,
    rating: 4.6,
    price: "Free",
    dev: "ShopDAO",
    verified: true,
    featured: false,
    tags: ["Shopping", "Marketplace"],
  },
  {
    id: 11,
    name: "AI Summarizer",
    category: "AI",
    emoji: "🤖",
    desc: "Summarize any content with one tap using GPT-4",
    installs: 25000,
    rating: 4.9,
    price: "Free (100 SKY/mo premium)",
    dev: "AILabs",
    verified: true,
    featured: true,
    tags: ["AI", "Productivity"],
  },
  {
    id: 12,
    name: "CryptoNews Flash",
    category: "Finance",
    emoji: "📰",
    desc: "Real-time crypto news with AI sentiment scoring",
    installs: 38000,
    rating: 4.7,
    price: "Free",
    dev: "NewsDAO",
    verified: true,
    featured: false,
    tags: ["News", "AI"],
  },
  {
    id: 13,
    name: "ShadowPoll",
    category: "Social",
    emoji: "📊",
    desc: "Create and vote on polls with crypto incentives",
    installs: 9500,
    rating: 4.4,
    price: "Free",
    dev: "PollDAO",
    verified: false,
    featured: false,
    tags: ["Social", "Polls"],
  },
  {
    id: 14,
    name: "MicroJobs",
    category: "Productivity",
    emoji: "💼",
    desc: "Find and complete micro-tasks for instant SKY4444 rewards",
    installs: 14000,
    rating: 4.5,
    price: "Free",
    dev: "WorkDAO",
    verified: false,
    featured: false,
    tags: ["Work", "Earn"],
  },
  {
    id: 15,
    name: "SkyMusic Radio",
    category: "Entertainment",
    emoji: "🎵",
    desc: "Web3 music radio with artist tipping and NFT track drops",
    installs: 21000,
    rating: 4.6,
    price: "Free",
    dev: "MusicDAO",
    verified: true,
    featured: false,
    tags: ["Music", "NFT"],
  },
  {
    id: 16,
    name: "CryptoCalc Pro",
    category: "Finance",
    emoji: "🧮",
    desc: "Advanced crypto calculator with tax estimation and DCA planner",
    installs: 11000,
    rating: 4.8,
    price: "Free",
    dev: "CalcLabs",
    verified: false,
    featured: false,
    tags: ["Calculator", "Tax"],
  },
  {
    id: 17,
    name: "ShadowTranslate",
    category: "Productivity",
    emoji: "🌐",
    desc: "AI translation for 100+ languages with crypto-specific glossary",
    installs: 7800,
    rating: 4.5,
    price: "Free",
    dev: "LinguaDAO",
    verified: false,
    featured: false,
    tags: ["Translation", "AI"],
  },
  {
    id: 18,
    name: "CryptoRecipes",
    category: "Health",
    emoji: "🍳",
    desc: "Healthy recipes with nutrition tracking — earn SKY4444 for cooking",
    installs: 5600,
    rating: 4.2,
    price: "Free",
    dev: "FoodDAO",
    verified: false,
    featured: false,
    tags: ["Food", "Health"],
  },
  {
    id: 19,
    name: "SkyEvents",
    category: "Entertainment",
    emoji: "🎪",
    desc: "Discover and book crypto events, conferences, and meetups",
    installs: 13000,
    rating: 4.6,
    price: "Free",
    dev: "EventDAO",
    verified: true,
    featured: false,
    tags: ["Events", "Community"],
  },
  {
    id: 20,
    name: "ImpactTracker",
    category: "Social",
    emoji: "❤️",
    desc: "Track your charity donations and real-world impact score",
    installs: 6700,
    rating: 4.7,
    price: "Free",
    dev: "ImpactDAO",
    verified: true,
    featured: false,
    tags: ["Charity", "Impact"],
  },
];

const INSTALLED = [1, 2, 11, 12];

export default function MiniProgramsStore() {
  const [tab, setTab] = useState<
    "store" | "installed" | "developer" | "featured"
  >("featured");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [installed, setInstalled] = useState<number[]>(INSTALLED);

  const filtered = MINI_PROGRAMS.filter(
    p =>
      (category === "All" || p.category === category) &&
      (search === "" ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.desc.toLowerCase().includes(search.toLowerCase()))
  );

  const featured = MINI_PROGRAMS.filter(p => p.featured);

  const toggleInstall = (id: number) => {
    const prog = MINI_PROGRAMS.find(p => p.id === id)!;
    if (installed.includes(id)) {
      setInstalled(i => i.filter(x => x !== id));
      toast.info(`${prog.name} removed`);
    } else {
      setInstalled(i => [...i, id]);
      toast.success(`✅ ${prog.name} installed!`);
    }
  };

  const ProgramCard = ({ prog }: { prog: (typeof MINI_PROGRAMS)[0] }) => (
    <Card className="border-border/50 hover:border-yellow-500/20 transition-all">
      <CardContent className="py-3 px-4">
        <div className="flex items-start gap-3">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-yellow-900/20 to-purple-900/20 border border-border/50 flex items-center justify-center text-2xl shrink-0">
            {prog.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <p className="font-bold text-sm truncate">{prog.name}</p>
              {prog.verified && (
                <CheckCircle className="h-3.5 w-3.5 text-blue-400 shrink-0" />
              )}
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2 mb-1.5">
              {prog.desc}
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-0.5">
                <Star className="h-3 w-3 text-yellow-400" />
                {prog.rating}
              </span>
              <span>·</span>
              <span>{(prog.installs / 1000).toFixed(0)}k installs</span>
              <span>·</span>
              <span className="text-green-400">{prog.price}</span>
            </div>
          </div>
          <Button
            size="sm"
            className={`h-8 text-xs shrink-0 ${installed.includes(prog.id) ? "bg-muted text-muted-foreground" : "bg-yellow-600 text-white border-0"}`}
            onClick={() => toggleInstall(prog.id)}
          >
            {installed.includes(prog.id) ? "Installed" : "Install"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Grid className="h-6 w-6 text-purple-400" />
            Mini-Program Store
          </h1>
          <p className="text-sm text-muted-foreground">
            20+ apps inside ShadowChat — Web3 App Store
          </p>
        </div>
        <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 font-bold">
          {installed.length} Installed
        </Badge>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["featured", "store", "installed", "developer"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-purple-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "featured" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            {featured.map((prog, i) => (
              <motion.div
                key={prog.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="border-yellow-500/20 bg-gradient-to-r from-yellow-900/10 to-purple-900/10">
                  <CardContent className="py-4 px-4">
                    <div className="flex items-start gap-3">
                      <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-purple-500/20 border border-yellow-500/30 flex items-center justify-center text-3xl shrink-0">
                        {prog.emoji}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-black text-base">{prog.name}</p>
                          <Badge className="text-xs bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                            ⭐ Featured
                          </Badge>
                          {prog.verified && (
                            <CheckCircle className="h-4 w-4 text-blue-400" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                          {prog.desc}
                        </p>
                        <div className="flex items-center gap-3">
                          <span className="text-xs flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-400" />
                            {prog.rating}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {prog.installs.toLocaleString()} installs
                          </span>
                          <span className="text-xs text-green-400">
                            {prog.price}
                          </span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className={`h-9 text-xs shrink-0 ${installed.includes(prog.id) ? "bg-muted text-muted-foreground" : "bg-yellow-600 text-white border-0"}`}
                        onClick={() => toggleInstall(prog.id)}
                      >
                        {installed.includes(prog.id)
                          ? "✓ Installed"
                          : "Install"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <p className="text-xs font-bold text-muted-foreground">
            ALL PROGRAMS ({MINI_PROGRAMS.length})
          </p>
          <div className="space-y-2">
            {MINI_PROGRAMS.filter(p => !p.featured)
              .slice(0, 6)
              .map(prog => (
                <ProgramCard key={prog.id} prog={prog} />
              ))}
          </div>
        </div>
      )}

      {tab === "store" && (
        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search mini-programs..."
                className="pl-9 h-9 text-xs"
              />
            </div>
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-colors ${category === cat ? "bg-purple-600 text-white" : "bg-muted text-muted-foreground"}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            {filtered.length} programs found
          </p>
          <div className="space-y-2">
            {filtered.map(prog => (
              <ProgramCard key={prog.id} prog={prog} />
            ))}
          </div>
        </div>
      )}

      {tab === "installed" && (
        <div className="space-y-2">
          <p className="text-xs font-bold text-muted-foreground">
            {installed.length} INSTALLED PROGRAMS
          </p>
          {MINI_PROGRAMS.filter(p => installed.includes(p.id)).map(prog => (
            <ProgramCard key={prog.id} prog={prog} />
          ))}
          {installed.length === 0 && (
            <p className="text-center text-muted-foreground text-sm py-8">
              No programs installed yet
            </p>
          )}
        </div>
      )}

      {tab === "developer" && (
        <div className="space-y-3">
          <Card className="border-purple-500/20 bg-purple-900/10">
            <CardContent className="py-4 px-4">
              <p className="font-black text-sm mb-2 flex items-center gap-2">
                <Code className="h-4 w-4 text-purple-400" />
                Developer Portal
              </p>
              <p className="text-xs text-muted-foreground mb-3">
                Build and publish your own mini-programs inside ShadowChat. Earn
                SKY4444 from every install and in-app purchase.
              </p>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {[
                  { label: "Revenue Share", value: "70%", emoji: "💰" },
                  { label: "Active Devs", value: "1,247", emoji: "👨‍💻" },
                  { label: "Total Programs", value: "20+", emoji: "📱" },
                  {
                    label: "Avg Monthly Earn",
                    value: "4,444 SKY",
                    emoji: "⚡",
                  },
                ].map(stat => (
                  <div
                    key={stat.label}
                    className="p-2.5 rounded-xl bg-black/20 text-center"
                  >
                    <p className="text-lg">{stat.emoji}</p>
                    <p className="font-black text-sm text-purple-400">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          {[
            {
              title: "SDK Documentation",
              desc: "Full API reference and component library",
              emoji: "📚",
            },
            {
              title: "Submit New Program",
              desc: "Upload your mini-program for review",
              emoji: "📤",
            },
            {
              title: "My Programs",
              desc: "Manage your published programs",
              emoji: "📱",
            },
            {
              title: "Earnings Dashboard",
              desc: "Track installs, revenue, and payouts",
              emoji: "💰",
            },
            {
              title: "Developer Community",
              desc: "Forums, Discord, and hackathons",
              emoji: "👥",
            },
          ].map(item => (
            <Card
              key={item.title}
              className="border-border/50 cursor-pointer hover:border-purple-500/20 transition-all"
              onClick={() => toast.info(`Opening ${item.title}...`)}
            >
              <CardContent className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{item.emoji}</span>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
