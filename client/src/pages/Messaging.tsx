import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send, Search, Plus } from "lucide-react";

export default function Messaging() {
  const [messages, setMessages] = useState<any[]>([
    { id: 1, user: "Alice", message: "Great analysis on BTC!", timestamp: new Date(Date.now() - 3600000) },
    { id: 2, user: "Bob", message: "Anyone trading ETH today?", timestamp: new Date(Date.now() - 7200000) },
  ]);
  const [input, setInput] = useState("");
  const [selectedChat, setSelectedChat] = useState(1);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { id: messages.length + 1, user: "You", message: input, timestamp: new Date() }]);
      setInput("");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-screen">
      <Card className="bg-gray-900 border-gray-800 md:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Chats
            <Button size="sm" variant="ghost"><Plus className="w-4 h-4" /></Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="relative mb-4">
            <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-500" />
            <Input placeholder="Search..." className="pl-8 bg-gray-800 border-gray-700" />
          </div>
          {[{ id: 1, name: "Alice", status: "online" }, { id: 2, name: "Bob", status: "offline" }].map((chat) => (
            <div key={chat.id} onClick={() => setSelectedChat(chat.id)} className={`p-3 rounded cursor-pointer ${selectedChat === chat.id ? "bg-purple-600" : "bg-gray-800 hover:bg-gray-700"}`}>
              <p className="font-medium text-white">{chat.name}</p>
              <p className="text-xs text-gray-400">{chat.status}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-gray-900 border-gray-800 md:col-span-2 flex flex-col">
        <CardHeader>
          <CardTitle>Chat with Alice</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.user === "You" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-xs px-4 py-2 rounded-lg ${msg.user === "You" ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-100"}`}>
                <p className="text-sm">{msg.message}</p>
              </div>
            </div>
          ))}
        </CardContent>
        <div className="flex gap-2">
          <Input placeholder="Type a message..." value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleSend()} className="bg-gray-800 border-gray-700 text-white" />
          <Button onClick={handleSend} className="bg-purple-600 hover:bg-purple-700"><Send className="w-4 h-4" /></Button>
        </div>
      </Card>
    </div>
  );
}
