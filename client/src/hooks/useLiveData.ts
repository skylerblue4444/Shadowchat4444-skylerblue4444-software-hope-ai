/**
 * useLiveData Hook
 * Manages real-time data fetching, caching, and auto-refresh
 */
import { useEffect, useState, useCallback } from "react";
import { trpc } from "@/lib/trpc";

export function useLiveMarketData(symbols?: string[]) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const query = trpc.marketData.getAll.useQuery(
    { limit: 50, category: "all" },
    { staleTime: 5000, refetchInterval: 10000 }
  );

  useEffect(() => {
    if (query.data?.items) {
      const filtered = symbols
        ? query.data.items.filter((item: any) => symbols.includes(item.symbol))
        : query.data.items;
      setData(filtered);
      setLoading(false);
    }
  }, [query.data, symbols]);

  return { data, loading, error: query.error?.message || error, refetch: query.refetch };
}

export function useLiveAsset(symbol: string) {
  const query = trpc.marketData.getAsset.useQuery(
    { symbol },
    { staleTime: 5000, refetchInterval: 10000, enabled: !!symbol }
  );
  return { asset: query.data, loading: query.isLoading, error: query.error?.message };
}

export function useLiveCandles(symbol: string, interval: "1h" | "4h" | "1d" | "1w" = "1d") {
  const query = trpc.marketData.getCandles.useQuery(
    { symbol, interval, limit: 90 },
    { staleTime: 10000, refetchInterval: 30000, enabled: !!symbol }
  );
  return { candles: query.data?.candles, loading: query.isLoading, error: query.error?.message };
}

export function useLiveGlobalStats() {
  const query = trpc.marketData.getGlobalStats.useQuery(undefined, {
    staleTime: 30000,
    refetchInterval: 60000,
  });
  return { stats: query.data, loading: query.isLoading, error: query.error?.message };
}

export function useLiveTrending() {
  const query = trpc.marketData.getTrending.useQuery(undefined, {
    staleTime: 15000,
    refetchInterval: 30000,
  });
  return { trending: query.data?.trending, gainers: query.data?.gainers, losers: query.data?.losers };
}

export function useLiveWatchlist() {
  const query = trpc.marketData.getWatchlist.useQuery(undefined, {
    staleTime: 10000,
    refetchInterval: 20000,
  });
  return { watchlist: query.data?.items, loading: query.isLoading };
}
