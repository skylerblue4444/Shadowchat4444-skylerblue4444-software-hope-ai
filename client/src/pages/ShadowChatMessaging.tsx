import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Send,
  Phone,
  Video,
  MoreVertical,
  Smile,
  Paperclip,
  Mic,
  Image,
  Coins,
  Star,
  Shield,
  Check,
  CheckCheck,
  Users,
  Plus,
  Bell,
  BellOff,
  Trash2,
  Pin,
  Archive,
  Zap,
  Gift,
  Hash,
  Globe,
  Lock,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface Message {
  id: string;
  sender: string;
  content: string;
  time: string;
  read: boolean;
  type: "text" | "crypto" | "image" | "system";
  amount?: number;
  coin?: string;
  mine?: boolean;
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  pinned?: boolean;
  type: "dm" | "group" | "channel";
  verified?: boolean;
}

const CONVERSATIONS: Conversation[] = [
  {
    id: "c1",
    name: "Skyler Blue",
    avatar: "⚡",
    lastMessage: "Just sent you 444 SKY4444!",
    time: "2m",
    unread: 3,
    online: true,
    pinned: true,
    type: "dm",
    verified: true,
  },
  {
    id: "c2",
    name: "SKY4444 Community",
    avatar: "🚀",
    lastMessage: "Token listing confirmed for Q3!",
    time: "5m",
    unread: 28,
    online: true,
    type: "channel",
  },
  {
    id: "c3",
    name: "TRUMP Traders",
    avatar: "🇺🇸",
    lastMessage: "Up 284% this week!",
    time: "12m",
    unread: 7,
    online: true,
    type: "group",
  },
  {
    id: "c4",
    name: "ShadowChat Dev Team",
    avatar: "💻",
    lastMessage: "New feature deployed",
    time: "1h",
    unread: 0,
    online: false,
    type: "group",
  },
  {
    id: "c5",
    name: "Crypto Whales 🐋",
    avatar: "🐋",
    lastMessage: "BTC $100K confirmed",
    time: "2h",
    unread: 0,
    online: true,
    type: "group",
  },
  {
    id: "c6",
    name: "IT Support Bot",
    avatar: "🤖",
    lastMessage: "Your ticket TKT-001 is resolved",
    time: "3h",
    unread: 1,
    online: true,
    type: "dm",
  },
  {
    id: "c7",
    name: "NFT Alpha Group",
    avatar: "🎨",
    lastMessage: "New drop in 2 hours!",
    time: "4h",
    unread: 0,
    online: false,
    type: "group",
  },
  {
    id: "c8",
    name: "DeFi Farmers",
    avatar: "🌾",
    lastMessage: "New 124% APY pool live",
    time: "5h",
    unread: 0,
    online: false,
    type: "group",
  },
];

const MESSAGES: Record<string, Message[]> = {
  c1: [
    {
      id: "m1",
      sender: "Skyler Blue",
      content: "Hey! Welcome to ShadowChat 🚀",
      time: "10:00 AM",
      read: true,
      type: "text",
    },
    {
      id: "m2",
      sender: "me",
      content: "Thanks! This platform is incredible",
      time: "10:01 AM",
      read: true,
      type: "text",
      mine: true,
    },
    {
      id: "m3",
      sender: "Skyler Blue",
      content: "I'm sending you some SKY4444 to get started!",
      time: "10:02 AM",
      read: true,
      type: "text",
    },
    {
      id: "m4",
      sender: "Skyler Blue",
      content: "Sent 444 SKY4444",
      time: "10:02 AM",
      read: true,
      type: "crypto",
      amount: 444,
      coin: "SKY4444",
    },
    {
      id: "m5",
      sender: "me",
      content: "Wow thank you! 🙏",
      time: "10:03 AM",
      read: true,
      type: "text",
      mine: true,
    },
    {
      id: "m6",
      sender: "Skyler Blue",
      content: "Just sent you 444 SKY4444!",
      time: "10:05 AM",
      read: false,
      type: "text",
    },
  ],
  c2: [
    {
      id: "m1",
      sender: "System",
      content: "Welcome to SKY4444 Community Channel",
      time: "9:00 AM",
      read: true,
      type: "system",
    },
    {
      id: "m2",
      sender: "Admin",
      content: "Token listing confirmed for Q3! 🎉",
      time: "9:30 AM",
      read: true,
      type: "text",
    },
    {
      id: "m3",
      sender: "CryptoKing",
      content: "WAGMI! 🚀🚀🚀",
      time: "9:31 AM",
      read: true,
      type: "text",
    },
    {
      id: "m4",
      sender: "MoonMission",
      content: "When Binance? 👀",
      time: "9:32 AM",
      read: false,
      type: "text",
    },
  ],
};

const EMOJI_REACTIONS = ["❤️", "🔥", "🚀", "💎", "⚡", "🎉", "😂", "👍"];

export default function ShadowChatMessaging() {
  const [activeConv, setActiveConv] = useState<string>("c1");
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showTipModal, setShowTipModal] = useState(false);
  const [tipAmount, setTipAmount] = useState("10");
  const [messages, setMessages] = useState(MESSAGES);
  const [conversations, setConversations] = useState(CONVERSATIONS);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConv, messages]);

  const activeConvData = conversations.find(c => c.id === activeConv)!;
  const currentMessages = messages[activeConv] || [];

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg: Message = {
      id: Date.now().toString(),
      sender: "me",
      content: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      read: false,
      type: "text",
      mine: true,
    };
    setMessages(prev => ({
      ...prev,
      [activeConv]: [...(prev[activeConv] || []), newMsg],
    }));
    setConversations(prev =>
      prev.map(c =>
        c.id === activeConv
          ? { ...c, lastMessage: input, time: "now", unread: 0 }
          : c
      )
    );
    setInput("");
  };

  const sendTip = () => {
    const tipMsg: Message = {
      id: Date.now().toString(),
      sender: "me",
      content: `Sent ${tipAmount} SKY4444`,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      read: false,
      type: "crypto",
      amount: parseFloat(tipAmount),
      coin: "SKY4444",
      mine: true,
    };
    setMessages(prev => ({
      ...prev,
      [activeConv]: [...(prev[activeConv] || []), tipMsg],
    }));
    setShowTipModal(false);
    toast.success(`Sent ${tipAmount} SKY4444 to ${activeConvData.name}! ⚡`);
  };

  const filteredConvs = conversations.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-0 rounded-2xl overflow-hidden border border-border/50">
      {/* Sidebar */}
      <div className="w-72 shrink-0 flex flex-col bg-card border-r border-border/50">
        {/* Search */}
        <div className="p-3 border-b border-border/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              className="pl-8 h-8 text-xs bg-muted border-0"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto">
          {/* Pinned */}
          {filteredConvs.filter(c => c.pinned).length > 0 && (
            <div>
              <p className="text-xs text-muted-foreground px-3 py-2 font-bold">
                📌 PINNED
              </p>
              {filteredConvs
                .filter(c => c.pinned)
                .map(conv => (
                  <ConvItem
                    key={conv.id}
                    conv={conv}
                    active={activeConv === conv.id}
                    onClick={() => {
                      setActiveConv(conv.id);
                      setConversations(prev =>
                        prev.map(c =>
                          c.id === conv.id ? { ...c, unread: 0 } : c
                        )
                      );
                    }}
                  />
                ))}
            </div>
          )}
          <p className="text-xs text-muted-foreground px-3 py-2 font-bold">
            ALL MESSAGES
          </p>
          {filteredConvs
            .filter(c => !c.pinned)
            .map(conv => (
              <ConvItem
                key={conv.id}
                conv={conv}
                active={activeConv === conv.id}
                onClick={() => {
                  setActiveConv(conv.id);
                  setConversations(prev =>
                    prev.map(c => (c.id === conv.id ? { ...c, unread: 0 } : c))
                  );
                }}
              />
            ))}
        </div>

        {/* New Chat Button */}
        <div className="p-3 border-t border-border/50">
          <Button
            className="w-full h-8 text-xs bg-blue-600 text-white border-0"
            onClick={() => toast.info("New conversation coming soon!")}
          >
            <Plus className="h-3.5 w-3.5 mr-1.5" />
            New Message
          </Button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border/50 bg-card">
          <div className="relative">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-lg">
              {activeConvData?.avatar}
            </div>
            {activeConvData?.online && (
              <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-400 border-2 border-card" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <p className="font-black text-sm">{activeConvData?.name}</p>
              {activeConvData?.verified && (
                <Shield className="h-3.5 w-3.5 text-blue-400" />
              )}
              {activeConvData?.type === "channel" && (
                <Badge className="text-xs bg-purple-500/10 text-purple-400 border-purple-500/20 h-4">
                  Channel
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {activeConvData?.online ? "Online" : "Offline"}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              className="h-8 w-8 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-white transition-colors"
              onClick={() => toast.info("Voice call starting...")}
            >
              <Phone className="h-4 w-4" />
            </button>
            <button
              className="h-8 w-8 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-white transition-colors"
              onClick={() => toast.info("Video call starting...")}
            >
              <Video className="h-4 w-4" />
            </button>
            <button
              className="h-8 w-8 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-white transition-colors"
              onClick={() => toast.info("More options...")}
            >
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {currentMessages.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-2 ${msg.mine ? "flex-row-reverse" : ""}`}
            >
              {!msg.mine && (
                <div className="h-7 w-7 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-sm shrink-0">
                  {activeConvData?.avatar}
                </div>
              )}
              <div
                className={`max-w-[70%] ${msg.mine ? "items-end" : "items-start"} flex flex-col gap-0.5`}
              >
                {msg.type === "system" ? (
                  <div className="px-3 py-1.5 rounded-full bg-muted/30 text-xs text-muted-foreground text-center">
                    {msg.content}
                  </div>
                ) : msg.type === "crypto" ? (
                  <div
                    className={`px-4 py-3 rounded-2xl ${msg.mine ? "bg-yellow-600/20 border border-yellow-500/30 rounded-tr-sm" : "bg-yellow-500/10 border border-yellow-500/20 rounded-tl-sm"}`}
                  >
                    <div className="flex items-center gap-2">
                      <Coins className="h-5 w-5 text-yellow-400" />
                      <div>
                        <p className="font-black text-sm text-yellow-400">
                          {msg.amount} {msg.coin}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Crypto tip sent
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`px-3 py-2 rounded-2xl text-sm ${msg.mine ? "bg-blue-600 text-white rounded-tr-sm" : "bg-muted/40 border border-border/30 rounded-tl-sm"}`}
                  >
                    {msg.content}
                  </div>
                )}
                <div
                  className={`flex items-center gap-1 text-xs text-muted-foreground ${msg.mine ? "flex-row-reverse" : ""}`}
                >
                  <span>{msg.time}</span>
                  {msg.mine &&
                    (msg.read ? (
                      <CheckCheck className="h-3 w-3 text-blue-400" />
                    ) : (
                      <Check className="h-3 w-3" />
                    ))}
                </div>
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 border-t border-border/50 bg-card">
          {showTipModal && (
            <div className="mb-3 p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
              <p className="text-xs font-bold text-yellow-400 mb-2">
                Send Crypto Tip
              </p>
              <div className="flex gap-2">
                <Input
                  value={tipAmount}
                  onChange={e => setTipAmount(e.target.value)}
                  className="h-8 text-xs"
                  placeholder="Amount"
                />
                <select className="px-2 rounded-lg bg-muted border border-border/50 text-xs">
                  <option>SKY4444</option>
                  <option>BTC</option>
                  <option>ETH</option>
                  <option>DOGE</option>
                </select>
                <Button
                  size="sm"
                  className="h-8 text-xs bg-yellow-600 text-white border-0"
                  onClick={sendTip}
                >
                  Send
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 text-xs"
                  onClick={() => setShowTipModal(false)}
                >
                  ✕
                </Button>
              </div>
            </div>
          )}
          <div className="flex items-center gap-2">
            <button
              className="text-muted-foreground hover:text-white transition-colors"
              onClick={() => toast.info("Attach file...")}
            >
              <Paperclip className="h-5 w-5" />
            </button>
            <button
              className="text-muted-foreground hover:text-white transition-colors"
              onClick={() => toast.info("Send image...")}
            >
              <Image className="h-5 w-5" />
            </button>
            <button
              className={`transition-colors ${showTipModal ? "text-yellow-400" : "text-muted-foreground hover:text-yellow-400"}`}
              onClick={() => setShowTipModal(!showTipModal)}
            >
              <Coins className="h-5 w-5" />
            </button>
            <Input
              className="flex-1 h-9 text-sm bg-muted border-0"
              placeholder="Type a message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />
            <button
              className="text-muted-foreground hover:text-white transition-colors"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <Smile className="h-5 w-5" />
            </button>
            <button
              className="text-muted-foreground hover:text-white transition-colors"
              onClick={() => toast.info("Voice message...")}
            >
              <Mic className="h-5 w-5" />
            </button>
            <button
              onClick={sendMessage}
              disabled={!input.trim()}
              className={`h-9 w-9 rounded-xl flex items-center justify-center transition-colors ${input.trim() ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground"}`}
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          {showEmojiPicker && (
            <div className="mt-2 flex gap-2 flex-wrap">
              {EMOJI_REACTIONS.map(emoji => (
                <button
                  key={emoji}
                  className="text-xl hover:scale-125 transition-transform"
                  onClick={() => {
                    setInput(prev => prev + emoji);
                    setShowEmojiPicker(false);
                  }}
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ConvItem({
  conv,
  active,
  onClick,
}: {
  conv: Conversation;
  active: boolean;
  onClick: () => void;
}) {
  const typeIcon =
    conv.type === "channel" ? (
      <Hash className="h-3 w-3" />
    ) : conv.type === "group" ? (
      <Users className="h-3 w-3" />
    ) : null;
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 transition-colors text-left ${active ? "bg-blue-500/10 border-r-2 border-blue-500" : "hover:bg-muted/30"}`}
    >
      <div className="relative shrink-0">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600/30 to-purple-600/30 flex items-center justify-center text-xl">
          {conv.avatar}
        </div>
        {conv.online && (
          <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-400 border-2 border-card" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <p className="font-bold text-sm truncate">{conv.name}</p>
            {typeIcon && (
              <span className="text-muted-foreground">{typeIcon}</span>
            )}
          </div>
          <span className="text-xs text-muted-foreground shrink-0">
            {conv.time}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground truncate">
            {conv.lastMessage}
          </p>
          {conv.unread > 0 && (
            <Badge className="h-4 min-w-4 text-xs bg-blue-600 text-white border-0 rounded-full px-1 shrink-0">
              {conv.unread > 99 ? "99+" : conv.unread}
            </Badge>
          )}
        </div>
      </div>
    </button>
  );
}
