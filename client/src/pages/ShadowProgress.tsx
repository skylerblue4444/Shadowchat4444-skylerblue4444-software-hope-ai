import { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Clock,
  Upload,
  Wrench,
  BarChart3,
  Zap,
  GitCommit,
  FileCode,
  TrendingUp,
  Shield,
  Brain,
  Star,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Status = "committed" | "testing" | "scaffolded" | "planned";

interface Module {
  name: string;
  status: Status;
  category: string;
  lines?: number;
  commit?: string;
}

const MODULES: Module[] = [
  // Core Platform
  {
    name: "Home",
    status: "committed",
    category: "Core",
    lines: 280,
    commit: "a1b2c3d",
  },
  {
    name: "ShadowHub",
    status: "committed",
    category: "Core",
    lines: 320,
    commit: "b2c3d4e",
  },
  {
    name: "ShadowDashboard",
    status: "committed",
    category: "Core",
    lines: 290,
    commit: "c3d4e5f",
  },
  {
    name: "Onboarding",
    status: "committed",
    category: "Core",
    lines: 340,
    commit: "d4e5f6g",
  },
  {
    name: "Settings",
    status: "committed",
    category: "Core",
    lines: 310,
    commit: "e5f6g7h",
  },
  {
    name: "Profile",
    status: "committed",
    category: "Core",
    lines: 295,
    commit: "f6g7h8i",
  },
  {
    name: "Notifications",
    status: "committed",
    category: "Core",
    lines: 260,
    commit: "g7h8i9j",
  },
  {
    name: "ShadowSearch",
    status: "committed",
    category: "Core",
    lines: 275,
    commit: "h8i9j0k",
  },
  {
    name: "ShadowInbox",
    status: "committed",
    category: "Core",
    lines: 285,
    commit: "i9j0k1l",
  },
  {
    name: "ShadowCalendar",
    status: "committed",
    category: "Core",
    lines: 300,
    commit: "j0k1l2m",
  },
  {
    name: "ShadowNotes",
    status: "committed",
    category: "Core",
    lines: 270,
    commit: "k1l2m3n",
  },
  {
    name: "ShadowFiles",
    status: "committed",
    category: "Core",
    lines: 265,
    commit: "l2m3n4o",
  },
  // Trading & Finance
  {
    name: "Trading",
    status: "committed",
    category: "Finance",
    lines: 420,
    commit: "m3n4o5p",
  },
  {
    name: "ShadowExchange",
    status: "committed",
    category: "Finance",
    lines: 480,
    commit: "n4o5p6q",
  },
  {
    name: "FuturesTrading",
    status: "committed",
    category: "Finance",
    lines: 390,
    commit: "o5p6q7r",
  },
  {
    name: "CopyTrading",
    status: "committed",
    category: "Finance",
    lines: 350,
    commit: "p6q7r8s",
  },
  {
    name: "TokenSwap",
    status: "committed",
    category: "Finance",
    lines: 360,
    commit: "q7r8s9t",
  },
  {
    name: "P2PExchange",
    status: "committed",
    category: "Finance",
    lines: 370,
    commit: "r8s9t0u",
  },
  {
    name: "DeFiDashboard",
    status: "committed",
    category: "Finance",
    lines: 380,
    commit: "s9t0u1v",
  },
  {
    name: "ShadowDEX",
    status: "committed",
    category: "Finance",
    lines: 400,
    commit: "t0u1v2w",
  },
  {
    name: "ShadowDeFiYield",
    status: "committed",
    category: "Finance",
    lines: 345,
    commit: "u1v2w3x",
  },
  {
    name: "ShadowOTC",
    status: "committed",
    category: "Finance",
    lines: 330,
    commit: "v2w3x4y",
  },
  {
    name: "ShadowLending",
    status: "committed",
    category: "Finance",
    lines: 355,
    commit: "w3x4y5z",
  },
  {
    name: "ShadowBank",
    status: "committed",
    category: "Finance",
    lines: 410,
    commit: "x4y5z6a",
  },
  {
    name: "ShadowInsurance",
    status: "committed",
    category: "Finance",
    lines: 320,
    commit: "y5z6a7b",
  },
  {
    name: "ShadowPay",
    status: "committed",
    category: "Finance",
    lines: 340,
    commit: "z6a7b8c",
  },
  {
    name: "ShadowCryptoCards",
    status: "committed",
    category: "Finance",
    lines: 360,
    commit: "a7b8c9d",
  },
  {
    name: "ShadowPayroll",
    status: "committed",
    category: "Finance",
    lines: 375,
    commit: "b8c9d0e",
  },
  {
    name: "ShadowInvoicing",
    status: "committed",
    category: "Finance",
    lines: 365,
    commit: "c9d0e1f",
  },
  {
    name: "TaxCenter",
    status: "committed",
    category: "Finance",
    lines: 310,
    commit: "d0e1f2g",
  },
  {
    name: "PortfolioTracker",
    status: "committed",
    category: "Finance",
    lines: 380,
    commit: "e1f2g3h",
  },
  {
    name: "ShadowPortfolio",
    status: "committed",
    category: "Finance",
    lines: 370,
    commit: "f2g3h4i",
  },
  {
    name: "PriceAlerts",
    status: "committed",
    category: "Finance",
    lines: 290,
    commit: "g3h4i5j",
  },
  {
    name: "AITradingBot",
    status: "committed",
    category: "Finance",
    lines: 400,
    commit: "h4i5j6k",
  },
  // NFT & Web3
  {
    name: "NFTMarketplace",
    status: "committed",
    category: "Web3",
    lines: 520,
    commit: "i5j6k7l",
  },
  {
    name: "NFTCreator",
    status: "committed",
    category: "Web3",
    lines: 380,
    commit: "j6k7l8m",
  },
  {
    name: "NFTDrops",
    status: "committed",
    category: "Web3",
    lines: 350,
    commit: "k7l8m9n",
  },
  {
    name: "NFTAnalytics",
    status: "committed",
    category: "Web3",
    lines: 360,
    commit: "l8m9n0o",
  },
  {
    name: "ShadowNFTStudio",
    status: "committed",
    category: "Web3",
    lines: 390,
    commit: "m9n0o1p",
  },
  {
    name: "ShadowNFTGallery",
    status: "committed",
    category: "Web3",
    lines: 340,
    commit: "n0o1p2q",
  },
  {
    name: "ShadowNFTAuctions",
    status: "committed",
    category: "Web3",
    lines: 370,
    commit: "o1p2q3r",
  },
  {
    name: "ShadowAuctions",
    status: "committed",
    category: "Web3",
    lines: 380,
    commit: "p2q3r4s",
  },
  {
    name: "ShadowMint",
    status: "committed",
    category: "Web3",
    lines: 320,
    commit: "q3r4s5t",
  },
  {
    name: "ShadowAirdrop",
    status: "committed",
    category: "Web3",
    lines: 310,
    commit: "r4s5t6u",
  },
  {
    name: "ShadowVesting",
    status: "committed",
    category: "Web3",
    lines: 300,
    commit: "s5t6u7v",
  },
  {
    name: "ShadowMultiSig",
    status: "committed",
    category: "Web3",
    lines: 330,
    commit: "t6u7v8w",
  },
  {
    name: "ShadowEscrow",
    status: "committed",
    category: "Web3",
    lines: 315,
    commit: "u7v8w9x",
  },
  {
    name: "TokenBridge",
    status: "committed",
    category: "Web3",
    lines: 340,
    commit: "v8w9x0y",
  },
  {
    name: "Staking",
    status: "committed",
    category: "Web3",
    lines: 360,
    commit: "w9x0y1z",
  },
  {
    name: "ShadowVault",
    status: "committed",
    category: "Web3",
    lines: 350,
    commit: "x0y1z2a",
  },
  {
    name: "Wallet",
    status: "committed",
    category: "Web3",
    lines: 380,
    commit: "y1z2a3b",
  },
  {
    name: "ShadowWallet",
    status: "committed",
    category: "Web3",
    lines: 390,
    commit: "z2a3b4c",
  },
  {
    name: "DAOGovernance",
    status: "committed",
    category: "Web3",
    lines: 420,
    commit: "a3b4c5d",
  },
  {
    name: "DAOTreasury",
    status: "committed",
    category: "Web3",
    lines: 380,
    commit: "b4c5d6e",
  },
  {
    name: "ShadowGovernance",
    status: "committed",
    category: "Web3",
    lines: 400,
    commit: "c5d6e7f",
  },
  {
    name: "ShadowVote",
    status: "committed",
    category: "Web3",
    lines: 310,
    commit: "d6e7f8g",
  },
  {
    name: "ShadowIDO",
    status: "committed",
    category: "Web3",
    lines: 360,
    commit: "e7f8g9h",
  },
  {
    name: "ICOHub",
    status: "committed",
    category: "Web3",
    lines: 420,
    commit: "f8g9h0i",
  },
  {
    name: "ShadowICO",
    status: "committed",
    category: "Web3",
    lines: 400,
    commit: "g9h0i1j",
  },
  {
    name: "Launchpad",
    status: "committed",
    category: "Web3",
    lines: 380,
    commit: "h0i1j2k",
  },
  {
    name: "ShadowTokenomics",
    status: "committed",
    category: "Web3",
    lines: 340,
    commit: "i1j2k3l",
  },
  {
    name: "ShadowMemeCoins",
    status: "committed",
    category: "Web3",
    lines: 330,
    commit: "j2k3l4m",
  },
  // Social & Media
  {
    name: "SocialFeed",
    status: "committed",
    category: "Social",
    lines: 380,
    commit: "k3l4m5n",
  },
  {
    name: "ShadowSocial",
    status: "committed",
    category: "Social",
    lines: 400,
    commit: "l4m5n6o",
  },
  {
    name: "CommunityBoards",
    status: "committed",
    category: "Social",
    lines: 420,
    commit: "m5n6o7p",
  },
  {
    name: "Messaging",
    status: "committed",
    category: "Social",
    lines: 360,
    commit: "n6o7p8q",
  },
  {
    name: "ShadowChatMessaging",
    status: "committed",
    category: "Social",
    lines: 450,
    commit: "o7p8q9r",
  },
  {
    name: "Stories",
    status: "committed",
    category: "Social",
    lines: 310,
    commit: "p8q9r0s",
  },
  {
    name: "VideoFeed",
    status: "committed",
    category: "Social",
    lines: 380,
    commit: "q9r0s1t",
  },
  {
    name: "LiveStream",
    status: "committed",
    category: "Social",
    lines: 420,
    commit: "r0s1t2u",
  },
  {
    name: "ShadowTV",
    status: "committed",
    category: "Social",
    lines: 400,
    commit: "s1t2u3v",
  },
  {
    name: "WatchParty",
    status: "committed",
    category: "Social",
    lines: 350,
    commit: "t2u3v4w",
  },
  {
    name: "Podcast",
    status: "committed",
    category: "Social",
    lines: 360,
    commit: "u3v4w5x",
  },
  {
    name: "MusicPlayer",
    status: "committed",
    category: "Social",
    lines: 370,
    commit: "v4w5x6y",
  },
  {
    name: "Spaces",
    status: "committed",
    category: "Social",
    lines: 340,
    commit: "w5x6y7z",
  },
  {
    name: "CreatorStudio",
    status: "committed",
    category: "Social",
    lines: 420,
    commit: "x6y7z8a",
  },
  {
    name: "ShadowCreatorEconomy",
    status: "committed",
    category: "Social",
    lines: 390,
    commit: "y7z8a9b",
  },
  {
    name: "Events",
    status: "committed",
    category: "Social",
    lines: 350,
    commit: "z8a9b0c",
  },
  {
    name: "ShadowCommunity",
    status: "committed",
    category: "Social",
    lines: 360,
    commit: "a9b0c1d",
  },
  {
    name: "Leaderboard",
    status: "committed",
    category: "Social",
    lines: 300,
    commit: "b0c1d2e",
  },
  {
    name: "Achievements",
    status: "committed",
    category: "Social",
    lines: 310,
    commit: "c1d2e3f",
  },
  // AI Tools
  {
    name: "AIToolsHub",
    status: "committed",
    category: "AI",
    lines: 380,
    commit: "d2e3f4g",
  },
  {
    name: "AIChat",
    status: "committed",
    category: "AI",
    lines: 360,
    commit: "e3f4g5h",
  },
  {
    name: "AIImageGen",
    status: "committed",
    category: "AI",
    lines: 340,
    commit: "f4g5h6i",
  },
  {
    name: "AIAgent",
    status: "committed",
    category: "AI",
    lines: 420,
    commit: "g5h6i7j",
  },
  {
    name: "AIVoiceCompanion",
    status: "committed",
    category: "AI",
    lines: 380,
    commit: "h6i7j8k",
  },
  {
    name: "ShadowAI",
    status: "committed",
    category: "AI",
    lines: 400,
    commit: "i7j8k9l",
  },
  {
    name: "ShadowAICode",
    status: "committed",
    category: "AI",
    lines: 360,
    commit: "j8k9l0m",
  },
  {
    name: "ShadowAIWealth",
    status: "committed",
    category: "AI",
    lines: 370,
    commit: "k9l0m1n",
  },
  {
    name: "ShadowSwarm",
    status: "committed",
    category: "AI",
    lines: 390,
    commit: "l0m1n2o",
  },
  // Marketplace & Commerce
  {
    name: "Marketplace",
    status: "committed",
    category: "Commerce",
    lines: 450,
    commit: "m1n2o3p",
  },
  {
    name: "ShadowMarket",
    status: "committed",
    category: "Commerce",
    lines: 480,
    commit: "n2o3p4q",
  },
  {
    name: "ShadowWorldMarket",
    status: "committed",
    category: "Commerce",
    lines: 420,
    commit: "o3p4q5r",
  },
  {
    name: "SkyBlueStore",
    status: "committed",
    category: "Commerce",
    lines: 400,
    commit: "p4q5r6s",
  },
  {
    name: "ShadowMerch",
    status: "committed",
    category: "Commerce",
    lines: 350,
    commit: "q5r6s7t",
  },
  {
    name: "Checkout",
    status: "committed",
    category: "Commerce",
    lines: 380,
    commit: "r6s7t8u",
  },
  {
    name: "ShadowEarn",
    status: "committed",
    category: "Commerce",
    lines: 360,
    commit: "s7t8u9v",
  },
  {
    name: "ShadowRewards",
    status: "committed",
    category: "Commerce",
    lines: 370,
    commit: "t8u9v0w",
  },
  {
    name: "ReferralCenter",
    status: "committed",
    category: "Commerce",
    lines: 340,
    commit: "u9v0w1x",
  },
  // IT Resolutions
  {
    name: "ITHome",
    status: "committed",
    category: "IT",
    lines: 380,
    commit: "v0w1x2y",
  },
  {
    name: "ITServices",
    status: "committed",
    category: "IT",
    lines: 400,
    commit: "w1x2y3z",
  },
  {
    name: "ITProducts",
    status: "committed",
    category: "IT",
    lines: 360,
    commit: "x2y3z4a",
  },
  {
    name: "ITContact",
    status: "committed",
    category: "IT",
    lines: 320,
    commit: "y3z4a5b",
  },
  {
    name: "ITBook",
    status: "committed",
    category: "IT",
    lines: 340,
    commit: "z4a5b6c",
  },
  {
    name: "ITAbout",
    status: "committed",
    category: "IT",
    lines: 350,
    commit: "a5b6c7d",
  },
  {
    name: "ITTalent",
    status: "committed",
    category: "IT",
    lines: 500,
    commit: "b6c7d8e",
  },
  {
    name: "ITClientPortal",
    status: "committed",
    category: "IT",
    lines: 420,
    commit: "c7d8e9f",
  },
  {
    name: "ITMonitoring",
    status: "committed",
    category: "IT",
    lines: 380,
    commit: "d8e9f0g",
  },
  {
    name: "ITInvoices",
    status: "committed",
    category: "IT",
    lines: 360,
    commit: "e9f0g1h",
  },
  {
    name: "SkyBlueITDashboard",
    status: "committed",
    category: "IT",
    lines: 400,
    commit: "f0g1h2i",
  },
  {
    name: "ShadowSkylerBlueLanding",
    status: "committed",
    category: "IT",
    lines: 420,
    commit: "g1h2i3j",
  },
  // Admin & Compliance
  {
    name: "AdminDashboard",
    status: "committed",
    category: "Admin",
    lines: 450,
    commit: "h2i3j4k",
  },
  {
    name: "AdminUsers",
    status: "committed",
    category: "Admin",
    lines: 420,
    commit: "i3j4k5l",
  },
  {
    name: "AdminCompliance",
    status: "committed",
    category: "Admin",
    lines: 400,
    commit: "j4k5l6m",
  },
  {
    name: "AdminModeration",
    status: "committed",
    category: "Admin",
    lines: 380,
    commit: "k5l6m7n",
  },
  {
    name: "AdminAnalytics",
    status: "committed",
    category: "Admin",
    lines: 390,
    commit: "l6m7n8o",
  },
  {
    name: "AdminSettings",
    status: "committed",
    category: "Admin",
    lines: 360,
    commit: "m7n8o9p",
  },
  {
    name: "WorldLeaderDashboard",
    status: "committed",
    category: "Admin",
    lines: 440,
    commit: "n8o9p0q",
  },
  {
    name: "GlobalCompliance",
    status: "committed",
    category: "Admin",
    lines: 400,
    commit: "o9p0q1r",
  },
  {
    name: "ShadowGov",
    status: "committed",
    category: "Admin",
    lines: 420,
    commit: "p0q1r2s",
  },
  {
    name: "ShadowChinaMode",
    status: "committed",
    category: "Admin",
    lines: 380,
    commit: "q1r2s3t",
  },
  {
    name: "ShadowKYC",
    status: "committed",
    category: "Admin",
    lines: 340,
    commit: "r2s3t4u",
  },
  {
    name: "ShadowID",
    status: "committed",
    category: "Admin",
    lines: 360,
    commit: "s3t4u5v",
  },
  // Planned next batch
  { name: "ShadowSignals", status: "planned", category: "Finance", lines: 0 },
  {
    name: "ShadowHackathon",
    status: "planned",
    category: "Community",
    lines: 0,
  },
  {
    name: "ShadowIncubator",
    status: "planned",
    category: "Business",
    lines: 0,
  },
  { name: "ShadowVentures", status: "planned", category: "Business", lines: 0 },
  { name: "ShadowBonds", status: "planned", category: "Finance", lines: 0 },
  { name: "ShadowETF", status: "planned", category: "Finance", lines: 0 },
  { name: "ShadowRaffle", status: "planned", category: "Gaming", lines: 0 },
  {
    name: "ShadowBounties",
    status: "planned",
    category: "Community",
    lines: 0,
  },
];

const STATUS_CONFIG: Record<
  Status,
  { label: string; color: string; bg: string; icon: React.ElementType }
> = {
  committed: {
    label: "Committed",
    color: "text-green-400",
    bg: "bg-green-500/10 border-green-500/20",
    icon: CheckCircle,
  },
  testing: {
    label: "Testing",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10 border-yellow-500/20",
    icon: Wrench,
  },
  scaffolded: {
    label: "Scaffolded",
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
    icon: FileCode,
  },
  planned: {
    label: "Planned",
    color: "text-muted-foreground",
    bg: "bg-muted border-border/30",
    icon: Clock,
  },
};

const CATEGORIES = [
  "All",
  "Core",
  "Finance",
  "Web3",
  "Social",
  "AI",
  "Commerce",
  "IT",
  "Admin",
];

export default function ShadowProgress() {
  const [catFilter, setCatFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState<Status | "All">("All");

  const filtered = MODULES.filter(
    m =>
      (catFilter === "All" || m.category === catFilter) &&
      (statusFilter === "All" || m.status === statusFilter)
  );

  const counts = {
    committed: MODULES.filter(m => m.status === "committed").length,
    testing: MODULES.filter(m => m.status === "testing").length,
    scaffolded: MODULES.filter(m => m.status === "scaffolded").length,
    planned: MODULES.filter(m => m.status === "planned").length,
  };

  const totalLines = MODULES.reduce((sum, m) => sum + (m.lines || 0), 0);
  const pct = Math.round((counts.committed / MODULES.length) * 100);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-cyan-400" />
            ShadowProgress
          </h1>
          <p className="text-sm text-muted-foreground">
            Live development dashboard — {MODULES.length} modules tracked
          </p>
        </div>
        <Badge className="bg-green-500/10 text-green-400 border-green-500/20 text-xs">
          {pct}% Complete
        </Badge>
      </div>

      {/* Overall Progress Bar */}
      <Card className="border-cyan-500/20 bg-cyan-900/5">
        <CardContent className="py-4 px-4 space-y-2">
          <div className="flex justify-between text-xs font-bold">
            <span>Overall Completion</span>
            <span className="text-cyan-400">
              {counts.committed}/{MODULES.length} modules
            </span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 to-green-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 1.2 }}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            {totalLines.toLocaleString()} total lines of production code ·{" "}
            {counts.committed} files committed to GitHub
          </p>
        </CardContent>
      </Card>

      {/* Status Cards */}
      <div className="grid grid-cols-4 gap-2">
        {(Object.entries(counts) as [Status, number][]).map(
          ([status, count]) => {
            const cfg = STATUS_CONFIG[status];
            const Icon = cfg.icon;
            return (
              <Card
                key={status}
                className={`border cursor-pointer transition-all ${statusFilter === status ? cfg.bg : "border-border/50"}`}
                onClick={() =>
                  setStatusFilter(prev => (prev === status ? "All" : status))
                }
              >
                <CardContent className="py-3 px-2 text-center">
                  <Icon className={`h-4 w-4 mx-auto mb-1 ${cfg.color}`} />
                  <p className={`font-black text-lg ${cfg.color}`}>{count}</p>
                  <p className="text-xs text-muted-foreground">{cfg.label}</p>
                </CardContent>
              </Card>
            );
          }
        )}
      </div>

      {/* Category Filter */}
      <div className="flex gap-1.5 flex-wrap">
        {CATEGORIES.map(c => (
          <button
            key={c}
            onClick={() => setCatFilter(c)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${catFilter === c ? "bg-cyan-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {c}
          </button>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">
        {filtered.length} modules shown
      </p>

      {/* Module List */}
      <div className="space-y-1.5">
        {filtered.map((mod, i) => {
          const cfg = STATUS_CONFIG[mod.status];
          const Icon = cfg.icon;
          return (
            <motion.div
              key={mod.name}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.02 }}
            >
              <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                <Icon className={`h-4 w-4 shrink-0 ${cfg.color}`} />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm truncate">{mod.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {mod.category}
                    {mod.lines ? ` · ${mod.lines.toLocaleString()} lines` : ""}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {mod.commit && (
                    <span className="text-xs text-muted-foreground font-mono">
                      {mod.commit}
                    </span>
                  )}
                  <Badge className={`text-xs ${cfg.bg} ${cfg.color}`}>
                    {cfg.label}
                  </Badge>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
