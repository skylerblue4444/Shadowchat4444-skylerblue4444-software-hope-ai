import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Send, Zap, Search, Plus } from "lucide-react";

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  tip?: number;
  read: boolean;
}

interface Conversation {
  id: string;
  user: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
}

export default function Messaging() {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      user: "TradeMaster",
      avatar: "TM",
      lastMessage: "Just executed a 5x long on SKY 🚀",
      timestamp: "2m ago",
      unread: 3,
      online: true,
    },
    {
      id: "2",
      user: "CryptoAnalyst",
      avatar: "CA",
      lastMessage: "Check out my latest analysis on the chart",
      timestamp: "15m ago",
      unread: 0,
      online: true,
    },
    {
      id: "3",
      user: "RiskManager",
      avatar: "RM",
      lastMessage: "Taking profits at resistance level",
      timestamp: "1h ago",
      unread: 0,
      online: false,
    },
  ]);

  const [selectedConv, setSelectedConv] = useState(conversations[0]);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "TradeMaster",
      content: "Hey! Just saw your post about the breakout",
      timestamp: "10:30 AM",
      read: true,
    },
    {
      id: "2",
      sender: "You",
      content: "Yeah, the volume is insane right now",
      timestamp: "10:32 AM",
      read: true,
    },
    {
      id: "3",
      sender: "TradeMaster",
      content: "Just executed a 5x long on SKY 🚀",
      timestamp: "10:35 AM",
      tip: 5,
      read: false,
    },
  ]);

  const [messageInput, setMessageInput] = useState("");
  const [tipAmount, setTipAmount] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "You",
      content: messageInput,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      tip: tipAmount > 0 ? tipAmount : undefined,
      read: true,
    };

    setMessages([...messages, newMessage]);
    setMessageInput("");
    setTipAmount(0);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
      <Card className="lg:col-span-1 overflow-hidden flex flex-col">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Messages</CardTitle>
            <Button size="sm" variant="outline" className="h-8 w-8 p-0">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="relative mt-2">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Search..." className="pl-8 bg-gray-900 border-gray-700 h-8" />
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden p-0">
          <ScrollArea className="h-full">
            <div className="space-y-1 p-3">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConv(conv)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedConv.id === conv.id
                      ? "bg-purple-600/20 border border-purple-500"
                      : "hover:bg-gray-800"
                  }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-xs font-semibold">
                        {conv.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{conv.user}</p>
                        {conv.online && (
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-400 rounded-full" />
                            <span className="text-xs text-green-400">Online</span>
                          </div>
                        )}
                      </div>
                    </div>
                    {conv.unread > 0 && (
                      <Badge className="bg-purple-600 text-white">{conv.unread}</Badge>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 truncate">{conv.lastMessage}</p>
                  <p className="text-xs text-gray-600 mt-1">{conv.timestamp}</p>
                </button>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2 overflow-hidden flex flex-col">
        <CardHeader className="pb-3 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center font-semibold">
                {selectedConv.avatar}
              </div>
              <div>
                <CardTitle className="text-base">{selectedConv.user}</CardTitle>
                <p className="text-xs text-gray-500">
                  {selectedConv.online ? "Online now" : "Offline"}
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              View Profile
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-hidden p-4 flex flex-col">
          <ScrollArea className="flex-1 mb-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.sender === "You"
                        ? "bg-purple-600 text-white rounded-br-none"
                        : "bg-gray-800 text-gray-200 rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    {msg.tip && (
                      <div className="flex items-center gap-1 mt-2 text-xs text-yellow-300">
                        <Zap className="w-3 h-3" />
                        Tipped {msg.tip} SKY
                      </div>
                    )}
                    <p className="text-xs mt-1 opacity-70">{msg.timestamp}</p>
                  </div>
                </div>
              ))}
              <div ref={scrollRef} />
            </div>
          </ScrollArea>

          <div className="space-y-2 border-t border-gray-700 pt-4">
            {tipAmount > 0 && (
              <div className="flex items-center justify-between bg-yellow-900/20 border border-yellow-500/30 rounded p-2">
                <span className="text-xs text-yellow-300">Tip: {tipAmount} SKY</span>
                <button
                  onClick={() => setTipAmount(0)}
                  className="text-xs text-yellow-300 hover:text-yellow-200"
                >
                  Clear
                </button>
              </div>
            )}
            <div className="flex gap-2">
              <Input
                placeholder="Type a message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="bg-gray-900 border-gray-700"
              />
              <Button
                onClick={() => setTipAmount(tipAmount > 0 ? 0 : 5)}
                variant="outline"
                size="sm"
                className="px-3"
              >
                <Zap className="w-4 h-4" />
              </Button>
              <Button
                onClick={handleSendMessage}
                disabled={!messageInput.trim()}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
