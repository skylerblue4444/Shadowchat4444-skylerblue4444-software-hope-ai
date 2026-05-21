import { useState } from "react";
import { motion } from "framer-motion";
import {
  Inbox,
  Mail,
  Bell,
  MessageSquare,
  Coins,
  Star,
  Trash2,
  Archive,
  Reply,
  MoreHorizontal,
  Search,
  Filter,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const MESSAGES = [
  {
    id: 1,
    type: "message",
    from: "SkylerBlue.eth",
    avatar: "SB",
    subject: "New IT contract proposal",
    preview: "Hey, I wanted to discuss the managed IT contract for Q3...",
    time: "2m ago",
    read: false,
    starred: true,
    category: "messages",
  },
  {
    id: 2,
    type: "crypto",
    from: "ShadowPay",
    avatar: "💸",
    subject: "You received 4,444 SKY4444",
    preview: "CryptoDevDAO.eth sent you 4,444 SKY4444 ($195.54) via ShadowPay",
    time: "15m ago",
    read: false,
    starred: false,
    category: "crypto",
  },
  {
    id: 3,
    type: "notification",
    from: "ShadowDEX",
    avatar: "📈",
    subject: "Your limit order was filled",
    preview: "BUY 1,000 SKY4444 at $0.044 — Order #4444 executed successfully",
    time: "1h ago",
    read: true,
    starred: false,
    category: "notifications",
  },
  {
    id: 4,
    type: "email",
    from: "skylerblue4444@gmail.com",
    avatar: "📧",
    subject: "New IT client inquiry",
    preview:
      "Hello, I found your website and I'm interested in managed IT services for my business...",
    time: "2h ago",
    read: false,
    starred: true,
    category: "emails",
  },
  {
    id: 5,
    type: "crypto",
    from: "ShadowStaking",
    avatar: "🔒",
    subject: "Staking rewards distributed",
    preview:
      "You earned 444 SKY4444 in staking rewards. Total staked: 44,444 SKY4444",
    time: "3h ago",
    read: true,
    starred: false,
    category: "crypto",
  },
  {
    id: 6,
    type: "message",
    from: "CryptoDevDAO.eth",
    avatar: "CD",
    subject: "DAO proposal vote needed",
    preview:
      "New governance proposal #44 needs your vote. Voting ends in 48 hours...",
    time: "5h ago",
    read: true,
    starred: false,
    category: "messages",
  },
  {
    id: 7,
    type: "notification",
    from: "ShadowNFT",
    avatar: "🎨",
    subject: "Your NFT sold!",
    preview:
      "ShadowPunk #4444 sold for 44.4 ETH ($177,600). Funds deposited to your wallet.",
    time: "1d ago",
    read: true,
    starred: true,
    category: "notifications",
  },
  {
    id: 8,
    type: "email",
    from: "support@shadowchat.io",
    avatar: "💬",
    subject: "Welcome to ShadowChat Premium",
    preview:
      "Thank you for upgrading to ShadowChat Premium. Here's what's included...",
    time: "2d ago",
    read: true,
    starred: false,
    category: "emails",
  },
];

const CATEGORY_CONFIG: Record<string, { color: string; icon: typeof Mail }> = {
  messages: { color: "text-blue-400", icon: MessageSquare },
  crypto: { color: "text-yellow-400", icon: Coins },
  notifications: { color: "text-purple-400", icon: Bell },
  emails: { color: "text-green-400", icon: Mail },
};

export default function ShadowInbox() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number | null>(null);
  const [starred, setStarred] = useState<Set<number>>(
    new Set(MESSAGES.filter(m => m.starred).map(m => m.id))
  );
  const [deleted, setDeleted] = useState<Set<number>>(new Set());

  const unread = MESSAGES.filter(m => !m.read && !deleted.has(m.id)).length;

  const filtered = MESSAGES.filter(m => {
    if (deleted.has(m.id)) return false;
    if (filter === "starred") return starred.has(m.id);
    if (filter !== "all") return m.category === filter;
    if (search)
      return (
        m.subject.toLowerCase().includes(search.toLowerCase()) ||
        m.from.toLowerCase().includes(search.toLowerCase())
      );
    return true;
  });

  const selectedMsg = MESSAGES.find(m => m.id === selected);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Inbox className="h-6 w-6 text-blue-400" />
            Inbox
          </h1>
          <p className="text-sm text-muted-foreground">
            Unified messages, emails, crypto alerts, and notifications
          </p>
        </div>
        {unread > 0 && (
          <Badge className="bg-red-500/10 text-red-400 border-red-500/20 font-bold">
            {unread} unread
          </Badge>
        )}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search messages..."
          className="pl-9 h-9 text-xs"
        />
      </div>

      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {[
          "all",
          "messages",
          "crypto",
          "notifications",
          "emails",
          "starred",
        ].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium capitalize transition-colors ${filter === f ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {f}
          </button>
        ))}
      </div>

      {selectedMsg ? (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-blue-500/20 bg-blue-900/5">
            <CardContent className="py-4 px-4 space-y-3">
              <div className="flex items-center justify-between">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs"
                  onClick={() => setSelected(null)}
                >
                  ← Back
                </Button>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 w-7 p-0"
                    onClick={() => {
                      setStarred(prev => {
                        const n = new Set(prev);
                        n.has(selectedMsg.id)
                          ? n.delete(selectedMsg.id)
                          : n.add(selectedMsg.id);
                        return n;
                      });
                    }}
                  >
                    <Star
                      className={`h-3.5 w-3.5 ${starred.has(selectedMsg.id) ? "fill-yellow-400 text-yellow-400" : ""}`}
                    />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 w-7 p-0"
                    onClick={() => {
                      setDeleted(
                        prev =>
                          new Set(Array.from(prev).concat([selectedMsg.id]))
                      );
                      setSelected(null);
                      toast.success("Message deleted");
                    }}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
              <div>
                <p className="font-black text-base">{selectedMsg.subject}</p>
                <p className="text-xs text-muted-foreground">
                  From: {selectedMsg.from} · {selectedMsg.time}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-muted/50">
                <p className="text-sm text-muted-foreground">
                  {selectedMsg.preview}
                </p>
                {selectedMsg.type === "crypto" && (
                  <div className="mt-2 p-2 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                    <p className="text-xs text-yellow-400 font-bold">
                      Crypto Transaction — View on blockchain explorer
                    </p>
                  </div>
                )}
              </div>
              <Button
                className="w-full h-9 text-xs bg-blue-600 text-white border-0 font-bold"
                onClick={() => toast.success("Opening reply composer...")}
              >
                <Reply className="h-4 w-4 mr-2" />
                Reply
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <div className="space-y-1.5">
          {filtered.length === 0 && (
            <Card className="border-border/50">
              <CardContent className="py-8 text-center">
                <Inbox className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  No messages found
                </p>
              </CardContent>
            </Card>
          )}
          {filtered.map((msg, i) => {
            const CatIcon = CATEGORY_CONFIG[msg.category]?.icon || Mail;
            const catColor =
              CATEGORY_CONFIG[msg.category]?.color || "text-muted-foreground";
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <Card
                  className={`border cursor-pointer transition-all hover:border-blue-500/20 ${!msg.read ? "border-blue-500/20 bg-blue-900/5" : "border-border/50"}`}
                  onClick={() => setSelected(msg.id)}
                >
                  <CardContent className="py-2.5 px-4 flex items-center gap-3">
                    <div
                      className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 font-bold text-xs bg-muted`}
                    >
                      {typeof msg.avatar === "string" &&
                      msg.avatar.length <= 2 ? (
                        msg.avatar
                      ) : (
                        <CatIcon className={`h-4 w-4 ${catColor}`} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p
                          className={`text-sm truncate ${!msg.read ? "font-black" : "font-bold"}`}
                        >
                          {msg.subject}
                        </p>
                        {!msg.read && (
                          <div className="h-2 w-2 rounded-full bg-blue-400 shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {msg.from} · {msg.preview.slice(0, 50)}...
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-muted-foreground">
                        {msg.time}
                      </p>
                      {starred.has(msg.id) && (
                        <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400 ml-auto mt-0.5" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
