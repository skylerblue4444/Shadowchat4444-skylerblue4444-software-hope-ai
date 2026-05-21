import { useState } from "react";
import { motion } from "framer-motion";
import {
  Video,
  Upload,
  BarChart2,
  DollarSign,
  Users,
  Eye,
  Heart,
  TrendingUp,
  Calendar,
  Clock,
  Edit,
  Trash2,
  Play,
  Plus,
  Star,
  Zap,
  Award,
  MessageSquare,
  Share2,
  Settings,
  CheckCircle,
  AlertCircle,
  Image,
  Music,
  FileText,
  Coins,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const ANALYTICS_DATA = [
  { date: "May 8", views: 12400, earnings: 84, followers: 120 },
  { date: "May 9", views: 18200, earnings: 124, followers: 210 },
  { date: "May 10", views: 14800, earnings: 98, followers: 180 },
  { date: "May 11", views: 22400, earnings: 152, followers: 340 },
  { date: "May 12", views: 28900, earnings: 198, followers: 420 },
  { date: "May 13", views: 31200, earnings: 214, followers: 510 },
  { date: "May 14", views: 38400, earnings: 262, followers: 680 },
];

const MY_CONTENT = [
  {
    id: "c1",
    title: "SKY4444 ICO Deep Dive — Full Analysis",
    type: "video",
    status: "published",
    views: "284K",
    likes: 18400,
    earnings: 842,
    duration: "12:34",
    thumb:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=120&h=80&fit=crop",
    date: "May 12",
  },
  {
    id: "c2",
    title: "How I Built a $10K/mo IT Business",
    type: "video",
    status: "published",
    views: "142K",
    likes: 9200,
    earnings: 421,
    duration: "8:22",
    thumb:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=120&h=80&fit=crop",
    date: "May 10",
  },
  {
    id: "c3",
    title: "TRUMP Token Technical Analysis",
    type: "video",
    status: "scheduled",
    views: "—",
    likes: 0,
    earnings: 0,
    duration: "6:18",
    thumb:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=120&h=80&fit=crop",
    date: "May 16",
  },
  {
    id: "c4",
    title: "Crypto Security Best Practices",
    type: "video",
    status: "draft",
    views: "—",
    likes: 0,
    earnings: 0,
    duration: "4:45",
    thumb:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=120&h=80&fit=crop",
    date: "—",
  },
];

const STATUS_COLORS: Record<string, string> = {
  published: "bg-green-500/10 text-green-400 border-green-500/20",
  scheduled: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  draft: "bg-muted text-muted-foreground border-border/30",
};

const MONETIZATION = [
  {
    source: "Ad Revenue",
    amount: 1842,
    icon: DollarSign,
    color: "text-green-400",
  },
  { source: "SKY4444 Tips", amount: 2840, icon: Coins, color: "text-cyan-400" },
  {
    source: "Subscriptions",
    amount: 980,
    icon: Star,
    color: "text-yellow-400",
  },
  {
    source: "Sponsored Posts",
    amount: 5000,
    icon: Award,
    color: "text-purple-400",
  },
];

export default function CreatorStudio() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "content" | "monetize" | "upload"
  >("overview");
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadDesc, setUploadDesc] = useState("");

  const totalEarnings = MONETIZATION.reduce((s, m) => s + m.amount, 0);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Video className="h-6 w-6 text-red-400" />
            Creator Studio
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage content, track analytics, and monetize your audience
          </p>
        </div>
        <Button
          className="bg-red-600 text-white border-0"
          onClick={() => setActiveTab("upload")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Upload Content
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["overview", "content", "monetize", "upload"] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${activeTab === tab ? "bg-red-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="space-y-4">
          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              {
                label: "Total Views",
                value: "2.84M",
                change: "+18.4%",
                icon: Eye,
                color: "text-blue-400",
              },
              {
                label: "Subscribers",
                value: "48,200",
                change: "+12.1%",
                icon: Users,
                color: "text-green-400",
              },
              {
                label: "Total Earnings",
                value: `$${totalEarnings.toLocaleString()}`,
                change: "+24.8%",
                icon: DollarSign,
                color: "text-yellow-400",
              },
              {
                label: "Engagement Rate",
                value: "8.4%",
                change: "+2.1%",
                icon: Heart,
                color: "text-red-400",
              },
            ].map(({ label, value, change, icon: Icon, color }) => (
              <Card key={label} className="border-border/50">
                <CardContent className="pt-4 pb-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className={`h-4 w-4 ${color}`} />
                    <span className="text-xs text-muted-foreground">
                      {label}
                    </span>
                  </div>
                  <p className="text-xl font-black">{value}</p>
                  <p className="text-xs text-green-400">{change} this week</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Views Chart */}
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold">
                Views & Earnings (Last 7 Days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={ANALYTICS_DATA}>
                  <defs>
                    <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 10, fill: "#6b7280" }}
                  />
                  <YAxis tick={{ fontSize: 10, fill: "#6b7280" }} />
                  <Tooltip
                    contentStyle={{
                      background: "#1a1a2e",
                      border: "1px solid #333",
                      borderRadius: 8,
                      fontSize: 11,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="views"
                    stroke="#ef4444"
                    fill="url(#viewsGrad)"
                    strokeWidth={2}
                    name="Views"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Monetization Breakdown */}
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold">
                Revenue Sources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {MONETIZATION.map(({ source, amount, icon: Icon, color }) => (
                  <div
                    key={source}
                    className="p-3 rounded-xl bg-muted/20 border border-border/30"
                  >
                    <Icon className={`h-5 w-5 ${color} mb-2`} />
                    <p className="text-xs text-muted-foreground">{source}</p>
                    <p className="text-lg font-black">
                      ${amount.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "content" && (
        <div className="space-y-3">
          {MY_CONTENT.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="border-border/50">
                <CardContent className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="h-16 w-24 rounded-lg overflow-hidden shrink-0 relative bg-muted">
                      <img
                        src={item.thumb}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-1 right-1 text-xs text-white bg-black/70 px-1 rounded">
                        {item.duration}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-bold text-sm line-clamp-1">
                          {item.title}
                        </p>
                        <Badge
                          className={`text-xs capitalize shrink-0 ${STATUS_COLORS[item.status]}`}
                        >
                          {item.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {item.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          {item.likes.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3 text-green-400" />$
                          {item.earnings}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {item.date}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <button
                        className="h-8 w-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center hover:bg-blue-500/20 transition-colors"
                        onClick={() => toast.info("Opening editor")}
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </button>
                      <button
                        className="h-8 w-8 rounded-lg bg-green-500/10 text-green-400 flex items-center justify-center hover:bg-green-500/20 transition-colors"
                        onClick={() => toast.success("Shared!")}
                      >
                        <Share2 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        className="h-8 w-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center hover:bg-red-500/20 transition-colors"
                        onClick={() => toast.success("Deleted")}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === "monetize" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: "Creator Fund",
                desc: "Earn SKY4444 tokens based on views and engagement. Currently paying 0.001 SKY4444 per view.",
                status: "active",
                action: "Enrolled",
                icon: Coins,
              },
              {
                title: "Subscriptions",
                desc: "Offer exclusive content to paying subscribers. Set your own monthly price.",
                status: "active",
                action: "Manage Tiers",
                icon: Star,
              },
              {
                title: "Sponsored Content",
                desc: "Connect with brands for paid partnerships. Average deal: $500–$5,000.",
                status: "available",
                action: "Apply Now",
                icon: Award,
              },
              {
                title: "NFT Drops",
                desc: "Mint exclusive content as NFTs and sell directly to your audience.",
                status: "available",
                action: "Create Drop",
                icon: Image,
              },
              {
                title: "Live Gifts",
                desc: "Receive SKY4444 and TRUMP token gifts during live streams.",
                status: "active",
                action: "View Gifts",
                icon: Zap,
              },
              {
                title: "Affiliate Program",
                desc: "Earn 10% commission on every user you refer to ShadowChat.",
                status: "active",
                action: "Get Link",
                icon: Share2,
              },
            ].map(({ title, desc, status, action, icon: Icon }) => (
              <Card key={title} className="border-border/50">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="h-5 w-5 text-yellow-400" />
                    <h3 className="font-bold text-sm">{title}</h3>
                    <Badge
                      className={`text-xs ml-auto ${status === "active" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-blue-500/10 text-blue-400 border-blue-500/20"}`}
                    >
                      {status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{desc}</p>
                  <Button
                    size="sm"
                    className="w-full h-8 text-xs bg-yellow-500 text-black border-0 font-bold"
                    onClick={() => toast.success(`${action} activated!`)}
                  >
                    {action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === "upload" && (
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold">
              Upload New Content
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Upload Zone */}
            <div
              className="border-2 border-dashed border-border/50 rounded-2xl p-12 text-center hover:border-red-500/40 transition-colors cursor-pointer"
              onClick={() => toast.info("File picker opened")}
            >
              <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="font-bold">Drag & drop your video here</p>
              <p className="text-sm text-muted-foreground mt-1">
                MP4, MOV, AVI up to 10GB · Max 4K resolution
              </p>
              <Button className="mt-4 bg-red-600 text-white border-0" size="sm">
                Browse Files
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">
                  Title
                </label>
                <Input
                  placeholder="Enter video title..."
                  value={uploadTitle}
                  onChange={e => setUploadTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">
                  Category
                </label>
                <select className="w-full h-9 rounded-md border border-border bg-background px-3 text-sm">
                  {[
                    "Crypto",
                    "Tech",
                    "IT Services",
                    "NFT",
                    "Gaming",
                    "Education",
                    "Entertainment",
                  ].map(c => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                Description
              </label>
              <textarea
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm h-24 resize-none"
                placeholder="Describe your video..."
                value={uploadDesc}
                onChange={e => setUploadDesc(e.target.value)}
              />
            </div>

            <div className="flex gap-3">
              <Button
                className="bg-red-600 text-white border-0"
                onClick={() => toast.success("Video uploaded and processing!")}
              >
                <Upload className="h-4 w-4 mr-2" />
                Publish Now
              </Button>
              <Button
                variant="outline"
                onClick={() => toast.success("Saved as draft")}
              >
                Save Draft
              </Button>
              <Button
                variant="outline"
                onClick={() => toast.info("Schedule picker opened")}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Schedule
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
