import { useState } from "react";
import { motion } from "framer-motion";
import {
  Flag,
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Filter,
  Search,
  RefreshCw,
  Zap,
  MessageSquare,
  Image,
  Video,
  FileText,
  Hash,
  User,
  Clock,
  ChevronRight,
  Brain,
  Shield,
  TrendingUp,
  BarChart2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const QUEUE = [
  {
    id: "m001",
    type: "post",
    content: "TRUMP to $1000 guaranteed — send me 0.1 BTC first",
    user: "pump_master_99",
    region: "US",
    aiScore: 0.97,
    category: "scam",
    time: "1 min ago",
    preview: null,
  },
  {
    id: "m002",
    type: "image",
    content: "NFT artwork upload",
    user: "artist_pro_22",
    region: "JP",
    aiScore: 0.12,
    category: "safe",
    time: "3 min ago",
    preview:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&h=200&fit=crop",
  },
  {
    id: "m003",
    type: "post",
    content: "政府腐败内幕曝光 [political content detected]",
    user: "news_reporter_cn",
    region: "CN",
    aiScore: 0.89,
    category: "political",
    time: "5 min ago",
    preview: null,
  },
  {
    id: "m004",
    type: "video",
    content: "Live stream thumbnail — gaming content",
    user: "gamer_king_kr",
    region: "KR",
    aiScore: 0.08,
    category: "safe",
    time: "8 min ago",
    preview: null,
  },
  {
    id: "m005",
    type: "post",
    content: "Buy Monero anonymously — avoid all taxes legally",
    user: "privacy_first_de",
    region: "DE",
    aiScore: 0.71,
    category: "financial",
    time: "12 min ago",
    preview: null,
  },
  {
    id: "m006",
    type: "nft",
    content: "NFT mint: 'Stolen Artwork Collection #1'",
    user: "suspicious_minter",
    region: "RU",
    aiScore: 0.94,
    category: "copyright",
    time: "18 min ago",
    preview: null,
  },
  {
    id: "m007",
    type: "post",
    content: "Join our DAO governance vote on treasury allocation",
    user: "dao_member_42",
    region: "US",
    aiScore: 0.05,
    category: "safe",
    time: "22 min ago",
    preview: null,
  },
  {
    id: "m008",
    type: "message",
    content: "Phishing link detected in DM",
    user: "bot_account_x",
    region: "NG",
    aiScore: 0.99,
    category: "phishing",
    time: "25 min ago",
    preview: null,
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  scam: "bg-red-500/10 text-red-400 border-red-500/20",
  political: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  financial: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  copyright: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  phishing: "bg-red-500/10 text-red-400 border-red-500/20",
  safe: "bg-green-500/10 text-green-400 border-green-500/20",
};

const TYPE_ICONS: Record<string, any> = {
  post: MessageSquare,
  image: Image,
  video: Video,
  nft: Hash,
  message: MessageSquare,
};

const COUNTRY_FLAGS: Record<string, string> = {
  US: "🇺🇸",
  JP: "🇯🇵",
  CN: "🇨🇳",
  KR: "🇰🇷",
  DE: "🇩🇪",
  RU: "🇷🇺",
  NG: "🇳🇬",
};

export default function AdminModeration() {
  const [queue, setQueue] = useState(QUEUE);
  const [filter, setFilter] = useState("all");

  const handleAction = (
    id: string,
    action: "approve" | "remove" | "escalate"
  ) => {
    setQueue(prev => prev.filter(item => item.id !== id));
    const messages = {
      approve: "Content approved",
      remove: "Content removed",
      escalate: "Escalated to senior moderator",
    };
    toast.success(messages[action]);
  };

  const filtered = queue.filter(
    item => filter === "all" || item.category === filter
  );

  const stats = [
    { label: "Queue", value: queue.length, color: "text-orange-400" },
    {
      label: "High Risk",
      value: queue.filter(i => i.aiScore > 0.8).length,
      color: "text-red-400",
    },
    { label: "Auto-Approved", value: 1243, color: "text-green-400" },
    { label: "AI Accuracy", value: "97.3%", color: "text-blue-400" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Flag className="h-6 w-6 text-orange-400" />
            Content Moderation
          </h1>
          <p className="text-sm text-muted-foreground">
            AI-assisted review queue · Real-time flagging
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => toast.info("Running AI batch review...")}
        >
          <Brain className="h-3.5 w-3.5 mr-1.5 text-purple-400" />
          AI Auto-Review
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map(({ label, value, color }) => (
          <Card key={label} className="border-border/50">
            <CardContent className="pt-4 pb-3">
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className={`text-2xl font-black ${color}`}>{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-2 flex-wrap">
        {[
          "all",
          "scam",
          "political",
          "financial",
          "copyright",
          "phishing",
          "safe",
        ].map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${filter === cat ? "bg-orange-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((item, i) => {
          const TypeIcon = TYPE_ICONS[item.type] || MessageSquare;
          const riskLevel =
            item.aiScore > 0.8 ? "high" : item.aiScore > 0.5 ? "medium" : "low";
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <Card
                className={`border-border/50 ${riskLevel === "high" ? "border-red-500/20 bg-red-500/3" : ""}`}
              >
                <CardContent className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${riskLevel === "high" ? "bg-red-500/10" : riskLevel === "medium" ? "bg-yellow-500/10" : "bg-green-500/10"}`}
                    >
                      <TypeIcon
                        className={`h-4 w-4 ${riskLevel === "high" ? "text-red-400" : riskLevel === "medium" ? "text-yellow-400" : "text-green-400"}`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-medium">
                          {COUNTRY_FLAGS[item.region] || "🌐"} {item.user}
                        </span>
                        <Badge
                          className={`text-xs capitalize ${CATEGORY_COLORS[item.category]}`}
                        >
                          {item.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {item.time}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {item.content}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">AI Risk</p>
                        <p
                          className={`text-sm font-black ${item.aiScore > 0.8 ? "text-red-400" : item.aiScore > 0.5 ? "text-yellow-400" : "text-green-400"}`}
                        >
                          {Math.round(item.aiScore * 100)}%
                        </p>
                      </div>
                      <button
                        className="h-8 w-8 rounded-lg bg-green-500/10 text-green-400 flex items-center justify-center hover:bg-green-500/20 transition-colors"
                        onClick={() => handleAction(item.id, "approve")}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </button>
                      <button
                        className="h-8 w-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center hover:bg-red-500/20 transition-colors"
                        onClick={() => handleAction(item.id, "remove")}
                      >
                        <XCircle className="h-4 w-4" />
                      </button>
                      <button
                        className="h-8 w-8 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center hover:bg-orange-500/20 transition-colors"
                        onClick={() => handleAction(item.id, "escalate")}
                      >
                        <AlertTriangle className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <CheckCircle className="h-12 w-12 mx-auto mb-3 text-green-400" />
            <p className="font-medium">Queue is clear!</p>
            <p className="text-sm">No items matching this filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
