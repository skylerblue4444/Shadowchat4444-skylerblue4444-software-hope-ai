/**
 * Enhanced Dashboard Component v2.0
 * Glassmorphism, smooth animations, responsive grid layout
 */
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Wallet, BarChart2, Zap, Globe } from "lucide-react";
import { glassStyles, gradients, shadows } from "@/lib/ui-enhancements";
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export function DashboardEnhanced() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const stats = [
    { label: "Portfolio Value", value: "$124,842.50", change: "+12.4%", icon: Wallet, positive: true },
    { label: "24h Change", value: "$4,284.20", change: "+3.4%", icon: TrendingUp, positive: true },
    { label: "Total Assets", value: "24", change: "+2 new", icon: BarChart2, positive: true },
    { label: "Market Cap", value: "$2.84T", change: "+8.2%", icon: Globe, positive: true },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className={`${glassStyles.card} p-6 ${shadows.md} hover:border-cyan-400/50 transition-all cursor-pointer group`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${gradients.cyan} opacity-20 group-hover:opacity-30 transition-all`}>
                  <Icon className="h-6 w-6 text-cyan-400" />
                </div>
                <span className={`text-sm font-bold ${stat.positive ? "text-emerald-400" : "text-red-400"}`}>
                  {stat.change}
                </span>
              </div>
              <div className="text-sm text-slate-400 mb-2">{stat.label}</div>
              <div className="text-3xl font-black text-white">{stat.value}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <motion.div
        variants={itemVariants}
        className={`${glassStyles.card} p-6 ${shadows.md}`}
      >
        <h3 className="text-lg font-black text-white mb-4 flex items-center gap-2">
          <Zap className="h-5 w-5 text-cyan-400" />
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {["Trade", "Send", "Receive", "Swap"].map(action => (
            <button
              key={action}
              className={`${glassStyles.button} py-3 font-semibold text-white hover:border-cyan-400/50 ${shadows.sm}`}
            >
              {action}
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
