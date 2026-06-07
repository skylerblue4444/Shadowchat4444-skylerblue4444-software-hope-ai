/**
 * UI/UX Enhancement Utilities
 * Glassmorphism, animations, responsive utilities
 */

export const glassStyles = {
  card: "rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl",
  button: "rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur transition-all",
  input: "rounded-xl border border-white/10 bg-slate-900/50 backdrop-blur text-white placeholder:text-slate-500 focus:border-cyan-400/60",
  badge: "rounded-full bg-gradient-to-r from-cyan-400/20 to-fuchsia-500/20 text-cyan-300 border border-cyan-400/30",
};

export const animationClasses = {
  fadeIn: "animate-in fade-in duration-300",
  slideUp: "animate-in slide-in-from-bottom-4 duration-300",
  scaleIn: "animate-in zoom-in-95 duration-300",
  pulse: "animate-pulse",
  spin: "animate-spin",
};

export const gradients = {
  cyan: "from-cyan-400 to-fuchsia-500",
  blue: "from-blue-400 to-cyan-500",
  purple: "from-purple-400 to-pink-500",
  green: "from-emerald-400 to-teal-500",
  orange: "from-orange-400 to-red-500",
};

export const shadows = {
  sm: "shadow-lg shadow-slate-950/20",
  md: "shadow-xl shadow-slate-950/30",
  lg: "shadow-2xl shadow-slate-950/40",
  glow: "shadow-2xl shadow-cyan-500/20",
};

export const transitions = {
  fast: "transition-all duration-150",
  normal: "transition-all duration-300",
  slow: "transition-all duration-500",
};

export const responsive = {
  container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  grid2: "grid grid-cols-1 md:grid-cols-2 gap-4",
  grid3: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
  grid4: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
};

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatPrice(price: number, decimals = 2): string {
  if (price > 1000000) return `$${(price / 1000000).toFixed(1)}M`;
  if (price > 1000) return `$${(price / 1000).toFixed(1)}K`;
  return `$${price.toFixed(decimals)}`;
}

export function formatPercent(value: number, decimals = 2): string {
  return `${value > 0 ? "+" : ""}${value.toFixed(decimals)}%`;
}

export function getChangeColor(value: number): string {
  if (value > 0) return "text-emerald-400";
  if (value < 0) return "text-red-400";
  return "text-slate-400";
}

export function getChangeBgColor(value: number): string {
  if (value > 0) return "bg-emerald-400/10 border-emerald-400/30";
  if (value < 0) return "bg-red-400/10 border-red-400/30";
  return "bg-slate-400/10 border-slate-400/30";
}
