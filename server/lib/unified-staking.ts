/**
 * Unified Multi-Coin Staking Protocol
 * ─────────────────────────────────────────────────────────────────────────────
 * Live staking support for TRUMP, DOGE, BTC, SHADOW, SKYCOIN4444, MONERO, USDT
 */

import { Decimal } from "decimal.js";

export type StakableCoin = "TRUMP" | "DOGE" | "BTC" | "SHADOW" | "SKYCOIN4444" | "MONERO" | "USDT";

export interface StakingConfig {
  coin: StakableCoin;
  baseAPY: number;
  minStake: string;
  maxStake: string;
  lockupPeriods: number[]; // days
  earlyUnstakePenalty: number; // basis points
  compoundingFrequency: "daily" | "weekly" | "monthly";
}

export interface StakingPosition {
  positionId: string;
  userId: number;
  coin: StakableCoin;
  amount: string;
  apy: number;
  startBlock: number;
  lockupDays: number;
  unlockBlock: number;
  accruedRewards: string;
  status: "active" | "unlocking" | "completed";
}

export interface RewardSchedule {
  coin: StakableCoin;
  frequency: "daily" | "weekly" | "monthly";
  nextRewardTime: Date;
  estimatedReward: string;
}

export const STAKING_CONFIGS: Record<StakableCoin, StakingConfig> = {
  SKYCOIN4444: {
    coin: "SKYCOIN4444",
    baseAPY: 18,
    minStake: "100",
    maxStake: "10000000",
    lockupPeriods: [7, 30, 90, 180, 365],
    earlyUnstakePenalty: 500, // 5%
    compoundingFrequency: "daily",
  },
  SHADOW: {
    coin: "SHADOW",
    baseAPY: 12,
    minStake: "100",
    maxStake: "5000000",
    lockupPeriods: [7, 30, 90, 180, 365],
    earlyUnstakePenalty: 500,
    compoundingFrequency: "daily",
  },
  TRUMP: {
    coin: "TRUMP",
    baseAPY: 8,
    minStake: "50",
    maxStake: "2000000",
    lockupPeriods: [7, 30, 90, 180, 365],
    earlyUnstakePenalty: 500,
    compoundingFrequency: "daily",
  },
  DOGE: {
    coin: "DOGE",
    baseAPY: 5,
    minStake: "1000",
    maxStake: "100000000",
    lockupPeriods: [7, 30, 90, 180],
    earlyUnstakePenalty: 1000, // 10%
    compoundingFrequency: "weekly",
  },
  BTC: {
    coin: "BTC",
    baseAPY: 3,
    minStake: "0.01",
    maxStake: "1000",
    lockupPeriods: [30, 90, 180, 365],
    earlyUnstakePenalty: 1000,
    compoundingFrequency: "monthly",
  },
  MONERO: {
    coin: "MONERO",
    baseAPY: 7,
    minStake: "10",
    maxStake: "1000000",
    lockupPeriods: [7, 30, 90, 180, 365],
    earlyUnstakePenalty: 500,
    compoundingFrequency: "daily",
  },
  USDT: {
    coin: "USDT",
    baseAPY: 4,
    minStake: "100",
    maxStake: "50000000",
    lockupPeriods: [7, 30, 90, 180],
    earlyUnstakePenalty: 500,
    compoundingFrequency: "daily",
  },
};

export class UnifiedStaking {
  /**
   * Calculate staking reward
   */
  static calculateReward(
    coin: StakableCoin,
    amount: string,
    daysStaked: number,
    apy?: number,
  ): string {
    const config = STAKING_CONFIGS[coin];
    const effectiveAPY = apy || config.baseAPY;

    const reward = new Decimal(amount)
      .times(effectiveAPY)
      .dividedBy(100)
      .times(daysStaked)
      .dividedBy(365);

    return reward.toFixed(18);
  }

  /**
   * Calculate compound rewards
   */
  static calculateCompoundReward(
    coin: StakableCoin,
    amount: string,
    daysStaked: number,
    apy?: number,
  ): string {
    const config = STAKING_CONFIGS[coin];
    const effectiveAPY = apy || config.baseAPY;

    // Determine compounding periods
    const compoundingPeriodsPerYear = config.compoundingFrequency === "daily"
      ? 365
      : config.compoundingFrequency === "weekly"
        ? 52
        : 12;

    const rate = new Decimal(effectiveAPY).dividedBy(100).dividedBy(compoundingPeriodsPerYear);
    const periods = Math.round((daysStaked / 365) * compoundingPeriodsPerYear);

    // A = P(1 + r)^n
    const compoundedAmount = new Decimal(amount).times(
      rate.plus(1).pow(periods),
    );

    const reward = compoundedAmount.minus(amount);

    return reward.toFixed(18);
  }

  /**
   * Calculate APY with lockup bonus
   */
  static calculateBonusAPY(
    coin: StakableCoin,
    lockupDays: number,
  ): number {
    const config = STAKING_CONFIGS[coin];
    const baseAPY = config.baseAPY;

    // Bonus: +1% APY per 30 days locked
    const lockupBonus = Math.floor(lockupDays / 30) * 1;

    return baseAPY + lockupBonus;
  }

  /**
   * Calculate early unstake penalty
   */
  static calculateEarlyUnstakePenalty(
    coin: StakableCoin,
    amount: string,
    daysStaked: number,
    lockupDays: number,
  ): {
    penalty: string;
    netAmount: string;
    penaltyPercentage: number;
  } {
    const config = STAKING_CONFIGS[coin];

    if (daysStaked >= lockupDays) {
      return {
        penalty: "0",
        netAmount: amount,
        penaltyPercentage: 0,
      };
    }

    const penaltyBps = config.earlyUnstakePenalty;
    const penalty = new Decimal(amount).times(penaltyBps).dividedBy(10000);
    const netAmount = new Decimal(amount).minus(penalty);

    return {
      penalty: penalty.toFixed(18),
      netAmount: netAmount.toFixed(18),
      penaltyPercentage: (penaltyBps / 100),
    };
  }

  /**
   * Calculate total staking rewards for user
   */
  static calculateTotalRewards(
    positions: StakingPosition[],
    currentBlockHeight: number,
  ): string {
    const blockTime = 12; // seconds per block (Ethereum standard)
    const secondsPerDay = 86400;
    const blocksPerDay = secondsPerDay / blockTime;

    const totalRewards = positions.reduce((sum, position) => {
      const daysStaked = (currentBlockHeight - position.startBlock) / blocksPerDay;
      const config = STAKING_CONFIGS[position.coin];
      const reward = this.calculateCompoundReward(
        position.coin,
        position.amount,
        daysStaked,
        position.apy,
      );
      return sum.plus(reward);
    }, new Decimal(0));

    return totalRewards.toFixed(18);
  }

  /**
   * Validate staking parameters
   */
  static validateStakingParams(
    coin: StakableCoin,
    amount: string,
    lockupDays: number,
  ): { valid: boolean; error?: string } {
    const config = STAKING_CONFIGS[coin];

    if (new Decimal(amount).lt(config.minStake)) {
      return { valid: false, error: `Minimum stake: ${config.minStake}` };
    }

    if (new Decimal(amount).gt(config.maxStake)) {
      return { valid: false, error: `Maximum stake: ${config.maxStake}` };
    }

    if (!config.lockupPeriods.includes(lockupDays)) {
      return {
        valid: false,
        error: `Valid lockup periods: ${config.lockupPeriods.join(", ")} days`,
      };
    }

    return { valid: true };
  }

  /**
   * Calculate staking pool statistics
   */
  static calculatePoolStats(
    coin: StakableCoin,
    totalStaked: string,
    activeStakers: number,
  ): {
    totalStaked: string;
    activeStakers: number;
    averageStake: string;
    estimatedDailyRewards: string;
  } {
    const config = STAKING_CONFIGS[coin];
    const averageStake = new Decimal(totalStaked).dividedBy(activeStakers);

    const dailyRewards = new Decimal(totalStaked)
      .times(config.baseAPY)
      .dividedBy(100)
      .dividedBy(365);

    return {
      totalStaked,
      activeStakers,
      averageStake: averageStake.toFixed(18),
      estimatedDailyRewards: dailyRewards.toFixed(18),
    };
  }

  /**
   * Generate staking recommendation
   */
  static getStakingRecommendation(
    coin: StakableCoin,
    amount: string,
  ): {
    recommendedLockup: number;
    estimatedAPY: number;
    estimatedMonthlyReward: string;
    estimatedYearlyReward: string;
  } {
    const config = STAKING_CONFIGS[coin];

    // Recommend longest lockup for best APY
    const recommendedLockup = config.lockupPeriods[config.lockupPeriods.length - 1];
    const estimatedAPY = this.calculateBonusAPY(coin, recommendedLockup);

    const monthlyReward = this.calculateReward(coin, amount, 30, estimatedAPY);
    const yearlyReward = this.calculateReward(coin, amount, 365, estimatedAPY);

    return {
      recommendedLockup,
      estimatedAPY,
      estimatedMonthlyReward: monthlyReward,
      estimatedYearlyReward: yearlyReward,
    };
  }
}
