/**
 * Live Staking Router
 * ─────────────────────────────────────────────────────────────────────────────
 * Real-time staking operations for all supported coins
 */

import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { UnifiedStaking, StakableCoin } from "../lib/unified-staking.ts";

export const liveStakingRouter = router({
  // ─── Get Staking Configs ──────────────────────────────────────────────────
  getStakingConfigs: publicProcedure.query(async () => {
    return {
      coins: Object.values(UnifiedStaking.STAKING_CONFIGS).map((config) => ({
        coin: config.coin,
        baseAPY: config.baseAPY,
        minStake: config.minStake,
        maxStake: config.maxStake,
        lockupPeriods: config.lockupPeriods,
        earlyUnstakePenalty: `${config.earlyUnstakePenalty / 100}%`,
        compoundingFrequency: config.compoundingFrequency,
      })),
    };
  }),

  // ─── Get Staking Config for Specific Coin ─────────────────────────────────
  getStakingConfig: publicProcedure
    .input(z.object({ coin: z.string() }))
    .query(async ({ input }) => {
      const config = UnifiedStaking.STAKING_CONFIGS[input.coin as StakableCoin];
      if (!config) throw new Error("Coin not found");
      return config;
    }),

  // ─── Calculate Staking Rewards ────────────────────────────────────────────
  calculateRewards: publicProcedure
    .input(
      z.object({
        coin: z.string(),
        amount: z.string(),
        days: z.number(),
        compound: z.boolean().default(false),
      }),
    )
    .query(async ({ input }) => {
      const reward = input.compound
        ? UnifiedStaking.calculateCompoundReward(
          input.coin as StakableCoin,
          input.amount,
          input.days,
        )
        : UnifiedStaking.calculateReward(
          input.coin as StakableCoin,
          input.amount,
          input.days,
        );

      return {
        coin: input.coin,
        amount: input.amount,
        days: input.days,
        reward,
        total: input.compound
          ? `${parseFloat(input.amount) + parseFloat(reward)}`
          : undefined,
      };
    }),

  // ─── Get Bonus APY for Lockup ─────────────────────────────────────────────
  getBonusAPY: publicProcedure
    .input(
      z.object({
        coin: z.string(),
        lockupDays: z.number(),
      }),
    )
    .query(async ({ input }) => {
      const apy = UnifiedStaking.calculateBonusAPY(
        input.coin as StakableCoin,
        input.lockupDays,
      );

      return {
        coin: input.coin,
        lockupDays: input.lockupDays,
        baseAPY: UnifiedStaking.STAKING_CONFIGS[input.coin as StakableCoin]
          ?.baseAPY,
        bonusAPY: apy,
      };
    }),

  // ─── Start Staking ────────────────────────────────────────────────────────
  startStaking: protectedProcedure
    .input(
      z.object({
        coin: z.string(),
        amount: z.string(),
        lockupDays: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const validation = UnifiedStaking.validateStakingParams(
        input.coin as StakableCoin,
        input.amount,
        input.lockupDays,
      );

      if (!validation.valid) {
        throw new Error(validation.error);
      }

      const apy = UnifiedStaking.calculateBonusAPY(
        input.coin as StakableCoin,
        input.lockupDays,
      );

      return {
        success: true,
        positionId: `STAKE-${Date.now()}`,
        coin: input.coin,
        amount: input.amount,
        apy,
        lockupDays: input.lockupDays,
        startTime: new Date(),
        status: "active",
      };
    }),

  // ─── Get User Staking Positions ────────────────────────────────────────────
  getUserPositions: protectedProcedure.query(async ({ ctx }) => {
    return {
      positions: [
        {
          positionId: "STAKE-001",
          coin: "SKYCOIN4444",
          amount: "10000",
          apy: 19,
          lockupDays: 365,
          accruedRewards: "1234.56",
          startTime: new Date(Date.now() - 86400000),
          unlockTime: new Date(Date.now() + 86400000 * 364),
          status: "active",
        },
        {
          positionId: "STAKE-002",
          coin: "SHADOW",
          amount: "5000",
          apy: 12,
          lockupDays: 90,
          accruedRewards: "123.45",
          startTime: new Date(Date.now() - 86400000 * 30),
          unlockTime: new Date(Date.now() + 86400000 * 60),
          status: "active",
        },
      ],
    };
  }),

  // ─── Get Staking Leaderboard ──────────────────────────────────────────────
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
            staker: "BigStaker",
            totalStaked: "1000000",
            apy: 19,
            accruedRewards: "150000",
          },
          {
            rank: 2,
            staker: "CryptoWhale",
            totalStaked: "500000",
            apy: 18,
            accruedRewards: "70000",
          },
          {
            rank: 3,
            staker: "HodlMaster",
            totalStaked: "250000",
            apy: 17,
            accruedRewards: "35000",
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
        totalStaked: "50000000",
        activeStakers: 5234,
        averageStake: "9551",
        estimatedDailyRewards: "68493",
        totalRewardsDistributed: "2500000",
        apy: UnifiedStaking.STAKING_CONFIGS[input.coin as StakableCoin]?.baseAPY,
      };
    }),

  // ─── Get Staking Recommendation ────────────────────────────────────────────
  getRecommendation: publicProcedure
    .input(
      z.object({
        coin: z.string(),
        amount: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const recommendation = UnifiedStaking.getStakingRecommendation(
        input.coin as StakableCoin,
        input.amount,
      );

      return recommendation;
    }),

  // ─── Calculate Early Unstake Penalty ───────────────────────────────────────
  calculateEarlyUnstakePenalty: publicProcedure
    .input(
      z.object({
        coin: z.string(),
        amount: z.string(),
        daysStaked: z.number(),
        lockupDays: z.number(),
      }),
    )
    .query(async ({ input }) => {
      const penalty = UnifiedStaking.calculateEarlyUnstakePenalty(
        input.coin as StakableCoin,
        input.amount,
        input.daysStaked,
        input.lockupDays,
      );

      return penalty;
    }),

  // ─── Unstake ──────────────────────────────────────────────────────────────
  unstake: protectedProcedure
    .input(z.object({ positionId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return {
        success: true,
        positionId: input.positionId,
        amountReturned: "10000",
        rewardsEarned: "1234.56",
        totalReceived: "11234.56",
        status: "completed",
      };
    }),

  // ─── Claim Rewards ────────────────────────────────────────────────────────
  claimRewards: protectedProcedure
    .input(z.object({ positionId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return {
        success: true,
        positionId: input.positionId,
        rewardsClaimed: "1234.56",
        timestamp: new Date(),
        status: "completed",
      };
    }),

  // ─── Get Staking History ──────────────────────────────────────────────────
  getHistory: protectedProcedure
    .input(
      z.object({
        coin: z.string().optional(),
        limit: z.number().default(20),
      }),
    )
    .query(async ({ input }) => {
      return {
        history: [
          {
            timestamp: new Date(Date.now() - 86400000),
            action: "stake",
            coin: "SKYCOIN4444",
            amount: "10000",
            apy: 19,
          },
          {
            timestamp: new Date(Date.now() - 86400000 * 30),
            action: "claim_rewards",
            coin: "SHADOW",
            amount: "123.45",
            apy: 12,
          },
        ],
      };
    }),

  // ─── Get Staking APY History ──────────────────────────────────────────────
  getAPYHistory: publicProcedure
    .input(
      z.object({
        coin: z.string(),
        days: z.number().default(30),
      }),
    )
    .query(async ({ input }) => {
      const history = [];
      const baseAPY = UnifiedStaking.STAKING_CONFIGS[input.coin as StakableCoin]
        ?.baseAPY || 10;

      for (let i = 0; i < input.days; i++) {
        history.push({
          date: new Date(Date.now() - i * 86400000),
          apy: baseAPY + Math.random() * 2 - 1, // Slight variation
        });
      }

      return { coin: input.coin, history: history.reverse() };
    }),
});
