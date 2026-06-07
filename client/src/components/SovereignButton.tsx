import React from 'react';
import { Zap } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

interface SovereignButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  loading?: boolean;
  children: React.ReactNode;
}

export const SovereignButton = React.forwardRef<
  HTMLButtonElement,
  SovereignButtonProps
>(
  (
    {
      variant = 'primary',
      size = 'md',
      icon,
      loading = false,
      children,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const variantMap = {
      primary: 'bg-amber-600 hover:bg-amber-700 text-white border border-amber-600 hover:border-amber-700',
      secondary: 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-slate-600',
      danger: 'bg-red-600 hover:bg-red-700 text-white border border-red-600 hover:border-red-700',
      success: 'bg-green-600 hover:bg-green-700 text-white border border-green-600 hover:border-green-700',
      ghost: 'bg-transparent hover:bg-slate-900 text-amber-500 border border-slate-800 hover:border-amber-500/50',
      outline: 'bg-transparent text-amber-500 border border-amber-500/50 hover:border-amber-500 hover:bg-amber-500/5',
    };

    const sizeMap = {
      sm: 'px-3 py-1.5 text-[9px] font-mono',
      md: 'px-4 py-2 text-[10px] font-mono',
      lg: 'px-6 py-3 text-sm font-mono',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`
          ${variantMap[variant]}
          ${sizeMap[size]}
          rounded-none uppercase tracking-widest font-bold
          transition-all duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
          flex items-center justify-center gap-2
          ${className}
        `}
        {...props}
      >
        {loading ? (
          <>
            <span className="animate-spin">⚡</span>
            Loading...
          </>
        ) : (
          <>
            {icon && <span>{icon}</span>}
            {children}
          </>
        )}
      </button>
    );
  }
);

SovereignButton.displayName = 'SovereignButton';

export default SovereignButton;
