import { motion } from "framer-motion";
import { Play, Users, Zap, Video } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Streamverse() {
  const streams = [
    { title: "AI Trading Live", host: "Hope AI", viewers: "1.2K", category: "Finance" },
    { title: "Creator Masterclass", host: "Atlas", viewers: "856", category: "Learning" },
    { title: "Gaming Tournament", host: "Nova", viewers: "2.4K", category: "Gaming" },
    { title: "Charity Drive", host: "Titan", viewers: "543", category: "Charity" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#0a0a0a] p-8"
    >
      <h1 className="text-4xl font-bold gold-text mb-8">Streamverse</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {streams.map((stream, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02 }}
            className="luxury-card cursor-pointer group"
          >
            <div className="relative mb-4 bg-[#FFD700]/10 rounded-lg h-40 flex items-center justify-center">
              <Play className="w-12 h-12 gold-text group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="font-bold text-lg mb-2">{stream.title}</h3>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">{stream.host}</span>
              <span className="gold-text flex items-center gap-1">
                <Users className="w-4 h-4" /> {stream.viewers}
              </span>
            </div>
            <Button className="luxury-button w-full mt-4">Watch Now</Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
