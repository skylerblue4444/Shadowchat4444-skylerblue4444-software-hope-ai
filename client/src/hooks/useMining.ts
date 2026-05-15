/**
 * ShadowChat useMining Hook
 * Manages real mining Web Workers for all supported coins.
 * Each coin gets its own dedicated Web Worker thread.
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import type { MineResult } from '../workers/miningWorker';

export interface MiningState {
  coin: string;
  isRunning: boolean;
  hashRate: number;
  totalHashes: number;
  walletBalance: number;
  lastHash: string;
  lastNonce: number;
  blocksFound: number;
  lastBlockTime: number | null;
  difficulty: number;
}

export interface MultiMiningState {
  [coin: string]: MiningState;
}

const DEFAULT_STATE = (coin: string, difficulty: number): MiningState => ({
  coin,
  isRunning: false,
  hashRate: 0,
  totalHashes: 0,
  walletBalance: 0,
  lastHash: '',
  lastNonce: 0,
  blocksFound: 0,
  lastBlockTime: null,
  difficulty,
});

const COIN_DIFFICULTIES: Record<string, number> = {
  BTC:     4,
  DOGE:    3,
  TRUMP:   3,
  SKY4444: 2,
  USDT:    3,
  XMR:     2,
};

export function useMining(coins: string[] = ['SKY4444', 'BTC', 'DOGE', 'TRUMP', 'USDT', 'XMR']) {
  const workersRef = useRef<Record<string, Worker>>({});
  const [miningState, setMiningState] = useState<MultiMiningState>(() =>
    Object.fromEntries(coins.map(c => [c, DEFAULT_STATE(c, COIN_DIFFICULTIES[c] ?? 2)]))
  );

  // Initialize workers
  useEffect(() => {
    return () => {
      // Cleanup all workers on unmount
      Object.values(workersRef.current).forEach(w => w.terminate());
      workersRef.current = {};
    };
  }, []);

  const getOrCreateWorker = useCallback((coin: string): Worker => {
    if (!workersRef.current[coin]) {
      // Create worker from the mining worker module
      const worker = new Worker(
        new URL('../workers/miningWorker.ts', import.meta.url),
        { type: 'module' }
      );

      worker.onmessage = (e: MessageEvent<MineResult>) => {
        const result = e.data;
        setMiningState(prev => {
          const current = prev[coin] || DEFAULT_STATE(coin, COIN_DIFFICULTIES[coin] ?? 2);
          return {
            ...prev,
            [coin]: {
              ...current,
              hashRate: result.hashRate,
              totalHashes: result.totalHashes,
              walletBalance: result.walletBalance,
              lastHash: result.hash,
              lastNonce: result.nonce,
              blocksFound: result.found ? current.blocksFound + 1 : current.blocksFound,
              lastBlockTime: result.found ? result.timestamp : current.lastBlockTime,
            },
          };
        });
      };

      worker.onerror = (err) => {
        console.error(`[Mining Worker ${coin}] Error:`, err);
      };

      workersRef.current[coin] = worker;
    }
    return workersRef.current[coin];
  }, []);

  const startMining = useCallback((coin: string) => {
    const worker = getOrCreateWorker(coin);
    worker.postMessage({
      type: 'start',
      coin,
      difficulty: COIN_DIFFICULTIES[coin] ?? 2,
    });
    setMiningState(prev => ({
      ...prev,
      [coin]: { ...(prev[coin] || DEFAULT_STATE(coin, COIN_DIFFICULTIES[coin] ?? 2)), isRunning: true },
    }));
  }, [getOrCreateWorker]);

  const stopMining = useCallback((coin: string) => {
    const worker = workersRef.current[coin];
    if (worker) {
      worker.postMessage({ type: 'stop' });
    }
    setMiningState(prev => ({
      ...prev,
      [coin]: { ...(prev[coin] || DEFAULT_STATE(coin, COIN_DIFFICULTIES[coin] ?? 2)), isRunning: false, hashRate: 0 },
    }));
  }, []);

  const startAll = useCallback(() => {
    coins.forEach(startMining);
  }, [coins, startMining]);

  const stopAll = useCallback(() => {
    coins.forEach(stopMining);
  }, [coins, stopMining]);

  const totalHashRate = Object.values(miningState).reduce((sum, s) => sum + s.hashRate, 0);
  const totalBalance = Object.values(miningState).reduce((sum, s) => sum + s.walletBalance, 0);
  const anyRunning = Object.values(miningState).some(s => s.isRunning);

  return {
    miningState,
    startMining,
    stopMining,
    startAll,
    stopAll,
    totalHashRate,
    totalBalance,
    anyRunning,
  };
}
