import { motion } from "framer-motion";
import { Flag, Users, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Nations() {
  const nations = [
    { name: "Bitcoin Nation", members: "45.2K", growth: "+12.5%", color: "text-orange-500" },
    { name: "Doge Nation", members: "38.9K", growth: "+18.3%", color: "text-yellow-500" },
    { name: "Sky Nation", members: "52.1K", growth: "+8.7%", color: "gold-text" },
    { name: "Creator Nation", members: "31.4K", growth: "+22.1%", color: "text-pink-500" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#0a0a0a] p-8"
    >
      <h1 className="text-4xl font-bold gold-text mb-8">Nations</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {nations.map((nation, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="luxury-card"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <Flag className={`w-8 h-8 ${nation.color}`} />
                <h3 className="font-bold text-lg">{nation.name}</h3>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Members</span>
                <span className="font-semibold">{nation.members}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Growth</span>
                <span className="gold-text flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" /> {nation.growth}
                </span>
              </div>
            </div>
            <Button className="luxury-button w-full">Join Nation</Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
