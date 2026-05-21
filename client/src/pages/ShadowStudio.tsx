import { useState } from "react";
import { motion } from "framer-motion";
import {
  Video,
  Mic,
  Image,
  FileText,
  Upload,
  Play,
  Pause,
  Settings,
  Zap,
  DollarSign,
  Star,
  Users,
  TrendingUp,
  Music,
  Camera,
  Edit3,
  Share2,
  Award,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const CONTENT_TYPES = [
  {
    id: "video",
    icon: Video,
    label: "Video",
    desc: "Upload or record video content",
    color: "text-red-400",
    bg: "bg-red-500/10",
  },
  {
    id: "audio",
    icon: Mic,
    label: "Podcast",
    desc: "Record or upload audio episodes",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    id: "image",
    icon: Image,
    label: "Image",
    desc: "Photos, art, and visual content",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    id: "nft",
    icon: Award,
    label: "NFT",
    desc: "Mint your content as an NFT",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
  },
  {
    id: "article",
    icon: FileText,
    label: "Article",
    desc: "Write long-form articles and posts",
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
  {
    id: "music",
    icon: Music,
    label: "Music",
    desc: "Upload tracks and albums",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
];

const MY_CONTENT = [
  {
    id: 1,
    title: "SKY4444 Token Deep Dive",
    type: "video",
    views: "12.4K",
    earnings: "$84.20",
    status: "published",
    date: "2 days ago",
  },
  {
    id: 2,
    title: "IT Security Podcast Ep.12",
    type: "audio",
    views: "3.2K",
    earnings: "$22.80",
    status: "published",
    date: "5 days ago",
  },
  {
    id: 3,
    title: "ShadowChat NFT Collection",
    type: "nft",
    views: "890",
    earnings: "$420.00",
    status: "published",
    date: "1 week ago",
  },
  {
    id: 4,
    title: "Crypto Trading Guide 2026",
    type: "article",
    views: "8.1K",
    earnings: "$41.60",
    status: "published",
    date: "2 weeks ago",
  },
  {
    id: 5,
    title: "Upcoming Vlog Episode",
    type: "video",
    views: "0",
    earnings: "$0.00",
    status: "draft",
    date: "Today",
  },
];

const TYPE_ICONS: Record<string, any> = {
  video: Video,
  audio: Mic,
  nft: Award,
  article: FileText,
  music: Music,
  image: Image,
};
const TYPE_COLORS: Record<string, string> = {
  video: "text-red-400",
  audio: "text-purple-400",
  nft: "text-yellow-400",
  article: "text-green-400",
  music: "text-cyan-400",
  image: "text-blue-400",
};

export default function ShadowStudio() {
  const [tab, setTab] = useState<
    "create" | "content" | "analytics" | "monetize"
  >("create");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mintAsNFT, setMintAsNFT] = useState(false);

  const totalEarnings = MY_CONTENT.reduce(
    (s, c) => s + parseFloat(c.earnings.replace("$", "")),
    0
  );
  const totalViews = MY_CONTENT.reduce(
    (s, c) => s + (parseInt(c.views.replace("K", "000").replace(".", "")) || 0),
    0
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Camera className="h-6 w-6 text-pink-400" />
            ShadowStudio
          </h1>
          <p className="text-sm text-muted-foreground">
            Create, publish, and monetize your content — earn SKY4444 for every
            view
          </p>
        </div>
        <Button
          className="bg-pink-600 text-white border-0 font-bold h-9 text-sm"
          onClick={() => setTab("create")}
        >
          <Upload className="h-4 w-4 mr-2" />
          Create Content
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        {[
          {
            label: "Total Earnings",
            value: `$${totalEarnings.toFixed(2)}`,
            color: "text-green-400",
          },
          { label: "Total Views", value: "24.6K", color: "text-blue-400" },
          { label: "Published", value: "4", color: "text-cyan-400" },
          { label: "Followers", value: "1,284", color: "text-pink-400" },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="py-3 px-2">
              <p className={`font-black text-lg ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {(
          [
            ["create", "✏️ Create"],
            ["content", "📁 My Content"],
            ["analytics", "📊 Analytics"],
            ["monetize", "💰 Monetize"],
          ] as const
        ).map(([t, label]) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${tab === t ? "bg-pink-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Create Tab */}
      {tab === "create" && (
        <div className="space-y-4">
          <p className="text-sm font-bold">Choose Content Type</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {CONTENT_TYPES.map(ct => {
              const Icon = ct.icon;
              return (
                <motion.div
                  key={ct.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    className={`border-border/50 cursor-pointer transition-all ${selectedType === ct.id ? "border-pink-500/40 bg-pink-900/5" : "hover:border-pink-500/20"}`}
                    onClick={() => setSelectedType(ct.id)}
                  >
                    <CardContent className="py-4 px-4 text-center space-y-2">
                      <div
                        className={`h-10 w-10 rounded-xl ${ct.bg} flex items-center justify-center mx-auto`}
                      >
                        <Icon className={`h-5 w-5 ${ct.color}`} />
                      </div>
                      <p className="font-bold text-sm">{ct.label}</p>
                      <p className="text-xs text-muted-foreground">{ct.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {selectedType && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="border-pink-500/20 bg-pink-900/5">
                <CardContent className="py-5 px-5 space-y-4">
                  <p className="font-bold text-sm">
                    Upload{" "}
                    {CONTENT_TYPES.find(c => c.id === selectedType)?.label}
                  </p>
                  <div
                    className="border-2 border-dashed border-border/50 rounded-xl p-8 text-center hover:border-pink-500/30 transition-colors cursor-pointer"
                    onClick={() => toast.info("File picker would open here")}
                  >
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground opacity-50" />
                    <p className="text-sm text-muted-foreground">
                      Drop file here or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      MP4, MP3, JPG, PNG, PDF up to 2GB
                    </p>
                  </div>
                  <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Title"
                    className="w-full h-10 px-4 rounded-xl bg-muted text-sm border border-border/50 focus:outline-none focus:border-pink-500/40"
                  />
                  <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Description..."
                    className="w-full h-20 px-4 py-3 rounded-xl bg-muted text-sm border border-border/50 focus:outline-none focus:border-pink-500/40 resize-none"
                  />
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setMintAsNFT(!mintAsNFT)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${mintAsNFT ? "bg-yellow-500/20 text-yellow-400" : "bg-muted text-muted-foreground"}`}
                    >
                      <Award className="h-3.5 w-3.5" />
                      Mint as NFT
                    </button>
                  </div>
                  <Button
                    className="w-full h-10 bg-pink-600 text-white border-0 font-bold text-sm"
                    onClick={() => {
                      toast.success(
                        `${title || "Content"} published successfully!`
                      );
                      setTitle("");
                      setDescription("");
                      setSelectedType(null);
                    }}
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Publish Content
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      )}

      {/* My Content Tab */}
      {tab === "content" && (
        <div className="space-y-3">
          {MY_CONTENT.map((item, i) => {
            const Icon = TYPE_ICONS[item.type] || FileText;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Card className="border-border/50 hover:border-pink-500/20 transition-all">
                  <CardContent className="py-3 px-4 flex items-center gap-3">
                    <div
                      className={`h-10 w-10 rounded-xl bg-muted flex items-center justify-center shrink-0`}
                    >
                      <Icon className={`h-5 w-5 ${TYPE_COLORS[item.type]}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm truncate">{item.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.date} · {item.views} views
                      </p>
                    </div>
                    <div className="text-right shrink-0 space-y-1">
                      <p className="font-black text-sm text-green-400">
                        {item.earnings}
                      </p>
                      <Badge
                        className={`text-xs border-0 ${item.status === "published" ? "bg-green-500/10 text-green-400" : "bg-muted text-muted-foreground"}`}
                      >
                        {item.status}
                      </Badge>
                    </div>
                    <div className="flex gap-1.5 shrink-0">
                      <Button
                        size="sm"
                        className="h-7 px-2 text-xs bg-muted text-muted-foreground border-0"
                        onClick={() => toast.info("Edit mode")}
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        size="sm"
                        className="h-7 px-2 text-xs bg-muted text-muted-foreground border-0"
                        onClick={() => toast.success("Link copied!")}
                      >
                        <Share2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Analytics Tab */}
      {tab === "analytics" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              label: "Views This Week",
              value: "8,420",
              change: "+24%",
              color: "text-blue-400",
            },
            {
              label: "Earnings This Week",
              value: "$42.80",
              change: "+18%",
              color: "text-green-400",
            },
            {
              label: "New Followers",
              value: "142",
              change: "+31%",
              color: "text-pink-400",
            },
            {
              label: "NFT Sales",
              value: "3",
              change: "+50%",
              color: "text-yellow-400",
            },
            {
              label: "Watch Time",
              value: "1,240h",
              change: "+12%",
              color: "text-cyan-400",
            },
            {
              label: "Engagement Rate",
              value: "8.4%",
              change: "+2%",
              color: "text-purple-400",
            },
          ].map(s => (
            <Card key={s.label} className="border-border/50">
              <CardContent className="py-4 px-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className={`font-black text-xl ${s.color}`}>{s.value}</p>
                </div>
                <Badge className="text-xs bg-green-500/10 text-green-400 border-0">
                  {s.change}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Monetize Tab */}
      {tab === "monetize" && (
        <div className="space-y-4">
          {[
            {
              title: "SKY4444 View Rewards",
              desc: "Earn 0.001 SKY4444 per view on all content",
              enabled: true,
              earnings: "$84.20/mo",
            },
            {
              title: "Fan Subscriptions",
              desc: "Charge fans $4.99/mo for exclusive content",
              enabled: false,
              earnings: "$0.00/mo",
            },
            {
              title: "NFT Content Minting",
              desc: "Mint your best content as NFTs and sell on ShadowNFT",
              enabled: true,
              earnings: "$420.00/mo",
            },
            {
              title: "Live Stream Tips",
              desc: "Accept SKY4444 and TRUMP tips during live streams",
              enabled: false,
              earnings: "$0.00/mo",
            },
            {
              title: "Brand Partnerships",
              desc: "Connect with brands for sponsored content deals",
              enabled: false,
              earnings: "$0.00/mo",
            },
          ].map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card className="border-border/50">
                <CardContent className="py-4 px-4 flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-sm">{m.title}</p>
                      {m.enabled && (
                        <CheckCircle className="h-3.5 w-3.5 text-green-400" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{m.desc}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-black text-sm text-green-400">
                      {m.earnings}
                    </p>
                    <Button
                      size="sm"
                      className={`h-7 px-3 text-xs border-0 font-bold mt-1 ${m.enabled ? "bg-muted text-muted-foreground" : "bg-pink-600 text-white"}`}
                      onClick={() =>
                        toast.success(
                          `${m.enabled ? "Disabled" : "Enabled"} ${m.title}!`
                        )
                      }
                    >
                      {m.enabled ? "Disable" : "Enable"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
