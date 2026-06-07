/**
 * LiveDataCard Component
 * Reusable card for displaying live market data with animations
 */
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Star } from "lucide-react";
import { glassStyles, shadows, getChangeColor, formatPrice } from "@/lib/ui-enhancements";
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

interface LiveDataCardProps {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  change7d?: number;
  marketCap?: number;
  volume?: number;
  isFavorite?: boolean;
  onFavoriteClick?: () => void;
  onClick?: () => void;
  category?: string;
}

export function LiveDataCard({
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  symbol,
  name,
  price,
  change24h,
  change7d,
  marketCap,
  volume,
  isFavorite,
  onFavoriteClick,
  onClick,
  category,
}: LiveDataCardProps) {
  const isPositive = change24h > 0;

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`${glassStyles.card} p-5 cursor-pointer group ${shadows.md} hover:border-cyan-400/50 transition-all`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{category || "Asset"}</span>
            {isFavorite && <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />}
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-black text-white">{symbol}</span>
            <span className="text-xs text-slate-500">{name}</span>
          </div>
        </div>
        {onFavoriteClick && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFavoriteClick();
            }}
            className="text-slate-400 hover:text-amber-400 transition-colors"
          >
            <Star className={`h-5 w-5 ${isFavorite ? "fill-amber-400 text-amber-400" : ""}`} />
          </button>
        )}
      </div>

      <div className="space-y-3">
        <div>
          <div className="text-2xl font-black text-white mb-1">
            {formatPrice(price, price > 100 ? 2 : 6)}
          </div>
          <div className={`flex items-center gap-1.5 text-sm font-semibold ${getChangeColor(change24h)}`}>
            {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            {Math.abs(change24h).toFixed(2)}% (24h)
            {change7d !== undefined && (
              <span className="text-xs text-slate-500 ml-1">
                {change7d > 0 ? "+" : ""}{change7d.toFixed(2)}% (7d)
              </span>
            )}
          </div>
        </div>

        {(marketCap || volume) && (
          <div className="grid grid-cols-2 gap-2 text-xs">
            {marketCap && (
              <div className="rounded-lg bg-white/[0.04] p-2">
                <div className="text-slate-500 mb-0.5">Market Cap</div>
                <div className="font-bold text-white">{formatPrice(marketCap)}</div>
              </div>
            )}
            {volume && (
              <div className="rounded-lg bg-white/[0.04] p-2">
                <div className="text-slate-500 mb-0.5">Volume</div>
                <div className="font-bold text-white">{formatPrice(volume)}</div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="text-[10px] text-slate-500 font-mono">
          Live • Auto-updating every 10s
        </div>
      </div>
    </motion.div>
  );
}
