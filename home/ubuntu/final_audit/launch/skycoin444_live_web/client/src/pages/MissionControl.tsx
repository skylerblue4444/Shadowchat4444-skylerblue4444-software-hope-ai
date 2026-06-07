import { motion } from "framer-motion";
import { Activity, Target, Users, Zap, TrendingUp, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function MissionControl() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const widgets = [
    { icon: Activity, label: "AI Status", value: "Operational", color: "text-green-500" },
    { icon: Zap, label: "XP Earned", value: "2,450", color: "gold-text" },
    { icon: Users, label: "Communities", value: "12", color: "text-blue-500" },
    { icon: TrendingUp, label: "Portfolio", value: "$45,230", color: "gold-text" },
    { icon: Award, label: "Impact Score", value: "8,750", color: "text-purple-500" },
    { icon: Target, label: "Active Missions", value: "5", color: "text-orange-500" }
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#0a0a0a] p-8"
    >
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-4xl font-bold gold-text mb-2">Mission Control</h1>
        <p className="text-muted-foreground">Planetary Command Center - Your AI-Powered Dashboard</p>
      </motion.div>

      {/* Widget Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {widgets.map((widget, i) => {
          const Icon = widget.icon;
          return (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="luxury-card cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">{widget.label}</p>
                  <p className={`text-2xl font-bold mt-2 ${widget.color}`}>{widget.value}</p>
                </div>
                <Icon className={`w-6 h-6 ${widget.color}`} />
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Recent Activity */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="luxury-card">
            <h2 className="text-xl font-bold gold-text mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {[
                { action: "Completed Mission", detail: "Learn AI Basics", time: "2h ago" },
                { action: "Earned Reward", detail: "500 XP + $50 SKY", time: "4h ago" },
                { action: "Joined Community", detail: "Creator Network", time: "1d ago" },
                { action: "Portfolio Update", detail: "+$2,450 (5.4%)", time: "1d ago" }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center p-3 hover:bg-[#FFD700]/5 rounded">
                  <div>
                    <p className="font-semibold">{item.action}</p>
                    <p className="text-sm text-muted-foreground">{item.detail}</p>
                  </div>
                  <span className="text-xs gold-text">{item.time}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Right Column - Quick Actions */}
        <motion.div variants={itemVariants}>
          <Card className="luxury-card">
            <h2 className="text-xl font-bold gold-text mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <Button className="luxury-button w-full">Start Mission</Button>
              <Button variant="outline" className="gold-border w-full">View Leaderboard</Button>
              <Button variant="outline" className="gold-border w-full">Browse Marketplace</Button>
              <Button variant="outline" className="gold-border w-full">Join Community</Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
