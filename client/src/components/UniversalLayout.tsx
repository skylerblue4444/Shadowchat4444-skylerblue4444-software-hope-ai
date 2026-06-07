import React from 'react';
import { UniversalHeader } from '@/components/UniversalHeader';
import { QuickAccessBar } from '@/components/QuickAccessBar';
import { FloatingActionMenu } from '@/components/FloatingActionMenu';
import { GlobalCommandPalette } from '@/components/GlobalCommandPalette';
import { CryptoWiringProvider } from '@/lib/crypto/CryptoWiringProvider';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

interface UniversalLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showQuickAccess?: boolean;
  showFAB?: boolean;
  showCommandPalette?: boolean;
}

export const UniversalLayout: React.FC<UniversalLayoutProps> = ({
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  children,
  showHeader = true,
  showQuickAccess = true,
  showFAB = true,
  showCommandPalette = true,
}) => {
  return (
    <CryptoWiringProvider>
      <div className="min-h-screen bg-black text-white">
        {/* Universal Header */}
        {showHeader && <UniversalHeader />}

        {/* Quick Access Bar */}
        {showQuickAccess && <QuickAccessBar />}

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Floating Action Menu */}
        {showFAB && <FloatingActionMenu />}

        {/* Global Command Palette */}
        {showCommandPalette && <GlobalCommandPalette />}
      </div>
    </CryptoWiringProvider>
  );
};

export default UniversalLayout;
