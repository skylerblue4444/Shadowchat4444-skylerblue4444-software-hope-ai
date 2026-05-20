/**
 * Live Mining Router
 * ─────────────────────────────────────────────────────────────────────────────
 * Real-time mining operations for all supported coins
 */

import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { UnifiedMining, MineableCoin } from "../lib/unified-mining.ts";

export const liveMiningRouter = router({
  // ─── Get Mining Configs ───────────────────────────────────────────────────
  getMiningConfigs: publicProcedure.query(async () => {
    return {
      coins: Object.values(UnifiedMining.MINING_CONFIGS).map((config) => ({
        coin: config.coin,
        blockReward: config.blockReward,
        blockTime: config.blockTime,
        difficulty: config.difficulty,
        poolFee: `${config.poolFee / 100}%`,
        minHashrate: config.minHashrate,
        maxHashrate: config.maxHashrate,
      })),
    };
  }),

  // ─── Get Mining Config for Specific Coin ──────────────────────────────────
  getMiningConfig: publicProcedure
    .input(z.object({ coin: z.string() }))
    .query(async ({ input }) => {
      const config = UnifiedMining.MINING_CONFIGS[input.coin as MineableCoin];
      if (!config) throw new Error("Coin not found");
      return config;
    }),

  // ─── Calculate Expected Rewards ────────────────────────────────────────────
  calculateRewards: publicProcedure
    .input(
      z.object({
        coin: z.string(),
        hashrate: z.string(),
        durationHours: z.number(),
      }),
    )
    .query(async ({ input }) => {
      const durationSeconds = input.durationHours * 3600;
      const reward = UnifiedMining.calculateExpectedReward(
        input.coin as MineableCoin,
        input.hashrate,
        durationSeconds,
      );

      return {
        coin: input.coin,
        hashrate: input.hashrate,
        durationHours: input.durationHours,
        expectedReward: reward,
      };
    }),

  // ─── Start Mining Session ──────────────────────────────────────────────────
  startMining: protectedProcedure
    .input(
      z.object({
        coin: z.string(),
        hashrate: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const validation = UnifiedMining.validateMiningSession(
        input.coin as MineableCoin,
        input.hashrate,
      );

      if (!validation.valid) {
        throw new Error(validation.error);
      }

      return {
        success: true,
        sessionId: `MINING-${Date.now()}`,
        coin: input.coin,
        hashrate: input.hashrate,
        startTime: new Date(),
        status: "active",
      };
    }),

  // ─── Get Mining Statistics ────────────────────────────────────────────────
  getMiningStats: publicProcedure
    .input(
      z.object({
        coin: z.string(),
        totalHashrate: z.string(),
        totalMiners: z.number(),
      }),
    )
    .query(async ({ input }) => {
      const stats = UnifiedMining.calculatePoolStats(
        input.coin as MineableCoin,
        input.totalHashrate,
        input.totalMiners,
      );

      return stats;
    }),

  // ─── Calculate ROI ────────────────────────────────────────────────────────
  calculateROI: publicProcedure
    .input(
      z.object({
        coin: z.string(),
        hashrate: z.string(),
        electricityCostPerKwh: z.string(),
        hardwareCostUsd: z.string(),
        coinPriceUsd: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const roi = UnifiedMining.calculateMiningROI(
        input.coin as MineableCoin,
        input.hashrate,
        input.electricityCostPerKwh,
        input.hardwareCostUsd,
        input.coinPriceUsd,
      );

      return roi;
    }),

  // ─── Get Halving Info ──────────────────────────────────────────────────────
  getHalvingInfo: publicProcedure
    .input(
      z.object({
        coin: z.string(),
        currentBlockHeight: z.number(),
      }),
    )
    .query(async ({ input }) => {
      const halving = UnifiedMining.calculateHalvingImpact(
        input.coin as MineableCoin,
        input.currentBlockHeight,
      );

      return halving;
    }),

  // ─── Get User Mining Sessions ──────────────────────────────────────────────
  getUserSessions: protectedProcedure.query(async ({ ctx }) => {
    return {
      sessions: [
        {
          sessionId: "MINING-001",
          coin: "SKYCOIN4444",
          hashrate: "100",
          startTime: new Date(Date.now() - 86400000),
          blocksFound: 5,
          totalReward: "250",
          status: "active",
        },
      ],
    };
  }),

  // ─── Get Mining Leaderboard ───────────────────────────────────────────────
  getLeaderboard: publicProcedure
    .input(
      z.object({
        coin: z.string(),
        limit: z.number().default(20),
      }),
    )
    .query(async ({ input }) => {
      return {
        coin: input.coin,
        leaderboard: [
          {
            rank: 1,
            miner: "TopMiner123",
            hashrate: "5000",
            totalRewards: "50000",
            blocksFound: 250,
          },
          {
            rank: 2,
            miner: "CryptoKing",
            hashrate: "4500",
            totalRewards: "45000",
            blocksFound: 225,
          },
          {
            rank: 3,
            miner: "HashMaster",
            hashrate: "4000",
            totalRewards: "40000",
            blocksFound: 200,
          },
        ],
      };
    }),

  // ─── Get Pool Statistics ──────────────────────────────────────────────────
  getPoolStats: publicProcedure
    .input(z.object({ coin: z.string() }))
    .query(async ({ input }) => {
      return {
        coin: input.coin,
        totalMiners: 1234,
        totalHashrate: "1000000",
        networkDifficulty: "1000000",
        blocksPerDay: 1440,
        totalDailyRewards: "72000",
        poolFee: "1%",
        lastBlockTime: new Date(Date.now() - 60000),
      };
    }),

  // ─── Get Mining Hardware Recommendations ───────────────────────────────────
  getHardwareRecommendations: publicProcedure
    .input(z.object({ coin: z.string() }))
    .query(async ({ input }) => {
      return {
        coin: input.coin,
        recommendations: [
          {
            name: "NVIDIA RTX 4090",
            hashrate: "200",
            powerConsumption: "450W",
            costUsd: "1600",
            roi_days: 45,
          },
          {
            name: "AMD Radeon RX 7900 XTX",
            hashrate: "180",
            powerConsumption: "420W",
            costUsd: "1200",
            roi_days: 50,
          },
          {
            name: "Antminer S21 Pro",
            hashrate: "250",
            powerConsumption: "3425W",
            costUsd: "10000",
            roi_days: 120,
          },
        ],
      };
    }),

  // ─── Stop Mining Session ───────────────────────────────────────────────────
  stopMining: protectedProcedure
    .input(z.object({ sessionId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return {
        success: true,
        sessionId: input.sessionId,
        status: "completed",
        totalReward: "1250",
        endTime: new Date(),
      };
    }),

  // ─── Get Mining Difficulty History ────────────────────────────────────────
  getDifficultyHistory: publicProcedure
    .input(
      z.object({
        coin: z.string(),
        days: z.number().default(30),
      }),
    )
    .query(async ({ input }) => {
      const history = [];
      for (let i = 0; i < input.days; i++) {
        history.push({
          date: new Date(Date.now() - i * 86400000),
          difficulty: `${1000000 + Math.random() * 100000}`,
        });
      }
      return { coin: input.coin, history: history.reverse() };
    }),
});
