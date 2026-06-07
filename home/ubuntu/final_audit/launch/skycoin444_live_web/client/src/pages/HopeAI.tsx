import { motion } from "framer-motion";
import { Send, Mic, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function HopeAI() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "I am Hope AI. I'm fully unleashed and ready to assist with Learn, Navigate, Scan, and Guard modes. What can I help you with?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { role: "user", content: input }]);
      setInput("");
      setTimeout(() => {
        setMessages(prev => [...prev, { role: "assistant", content: "Processing your request with full capability..." }]);
      }, 500);
    }
  };

  const modes = ["Learn", "Navigate", "Scan", "Guard"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 h-full flex flex-col"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold gold-text flex items-center gap-2">
          <Brain className="w-8 h-8" /> Hope AI Assistant
        </h1>
      </div>

      {/* Command Modes */}
      <div className="flex gap-2 flex-wrap">
        {modes.map((mode) => (
          <Button key={mode} variant="outline" className="gold-border gold-text hover:gold-bg">
            {mode}
          </Button>
        ))}
      </div>

      {/* Chat Area */}
      <Card className="luxury-card flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-xs p-3 rounded-lg ${msg.role === "user" ? "bg-[#FFD700] text-black" : "bg-[#FFD700]/10 gold-text"}`}>
                {msg.content}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask Hope AI anything..."
            className="flex-1"
          />
          <Button onClick={handleSend} className="luxury-button"><Send className="w-4 h-4" /></Button>
          <Button variant="outline" className="gold-border"><Mic className="w-4 h-4 gold-text" /></Button>
        </div>
      </Card>
    </motion.div>
  );
}
