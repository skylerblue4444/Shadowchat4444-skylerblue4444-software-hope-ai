import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { ShadowIntelligenceEngine } from '../shadowIntelligence/ShadowIntelligenceEngine';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

export interface CryptoAsset {
  symbol: string;
  balance: number;
  usdValue: number;
  change24h: number;
  price: number;
  icon?: string;
}

export interface CryptoWiringContextType {
  // Portfolio data
  totalPortfolioUSD: number;
  assets: CryptoAsset[];
  hopeFundTotal: number;
  
  // Real-time updates
  isLoading: boolean;
  lastUpdated: number;
  
  // Methods
  getAssetBySymbol: (symbol: string) => CryptoAsset | undefined;
  getTotalChange24h: () => number;
  refreshData: () => Promise<void>;
}

const CryptoWiringContext = createContext<CryptoWiringContextType | undefined>(undefined);

// Default mock data
const DEFAULT_ASSETS: CryptoAsset[] = [
  { symbol: 'SKY4444', balance: 1000, usdValue: 44000, change24h: 2.5, price: 44, icon: '🚀' },
  { symbol: 'SHADOW', balance: 5000, usdValue: 22500, change24h: -1.2, price: 4.5, icon: '👻' },
  { symbol: 'USDT', balance: 10000, usdValue: 10000, change24h: 0, price: 1, icon: '💵' },
  { symbol: 'BTC', balance: 0.5, usdValue: 22500, change24h: 1.8, price: 45000, icon: '₿' },
  { symbol: 'ETH', balance: 5, usdValue: 18750, change24h: 0.5, price: 3750, icon: '⟠' },
  { symbol: 'SOL', balance: 100, usdValue: 7500, change24h: 3.2, price: 75, icon: '◎' },
];

export const CryptoWiringProvider: React.FC<{
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();
 children: React.ReactNode }> = ({ children }) => {
  const [assets, setAssets] = useState<CryptoAsset[]>(DEFAULT_ASSETS);
  const [hopeFundTotal, setHopeFundTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(Date.now());

  // Refresh crypto data
  const refreshData = useCallback(async () => {
    setIsLoading(true);
    try {
      // Simulate price updates with small random changes
      const updatedAssets = assets.map(asset => ({
        ...asset,
        change24h: asset.change24h + (Math.random() - 0.5) * 0.5,
        price: asset.price * (1 + (Math.random() - 0.5) * 0.02),
        usdValue: asset.balance * (asset.price * (1 + (Math.random() - 0.5) * 0.02)),
      }));
      setAssets(updatedAssets);
      setHopeFundTotal(ShadowIntelligenceEngine.hopeFundRouter.getTotal());
      setLastUpdated(Date.now());
    } finally {
      setIsLoading(false);
    }
  }, [assets]);

  // Auto-refresh every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refreshData();
    }, 5000);
    return () => clearInterval(interval);
  }, [refreshData]);

  // Initial load
  useEffect(() => {
    setHopeFundTotal(ShadowIntelligenceEngine.hopeFundRouter.getTotal());
  }, []);

  const totalPortfolioUSD = assets.reduce((sum, asset) => sum + asset.usdValue, 0) + hopeFundTotal;

  const getAssetBySymbol = useCallback((symbol: string) => {
    return assets.find(a => a.symbol === symbol);
  }, [assets]);

  const getTotalChange24h = useCallback(() => {
    if (totalPortfolioUSD === 0) return 0;
    const totalChange = assets.reduce((sum, asset) => sum + (asset.usdValue * asset.change24h / 100), 0);
    return (totalChange / totalPortfolioUSD) * 100;
  }, [assets, totalPortfolioUSD]);

  const value: CryptoWiringContextType = {
    totalPortfolioUSD,
    assets,
    hopeFundTotal,
    isLoading,
    lastUpdated,
    getAssetBySymbol,
    getTotalChange24h,
    refreshData,
  };

  return (
    <CryptoWiringContext.Provider value={value}>
      {children}
    </CryptoWiringContext.Provider>
  );
};

export const useCryptoWiring = (): CryptoWiringContextType => {
  const context = useContext(CryptoWiringContext);
  if (!context) {
    throw new Error('useCryptoWiring must be used within CryptoWiringProvider');
  }
  return context;
};

// Convenience hooks
export const usePortfolioTotal = () => {
  const { totalPortfolioUSD } = useCryptoWiring();
  return totalPortfolioUSD;
};

export const useAssets = () => {
  const { assets } = useCryptoWiring();
  return assets;
};

export const useHopeFund = () => {
  const { hopeFundTotal } = useCryptoWiring();
  return hopeFundTotal;
};

export const useAssetPrice = (symbol: string) => {
  const { getAssetBySymbol } = useCryptoWiring();
  return getAssetBySymbol(symbol)?.price ?? 0;
};
