/**
 * Unified Multi-Coin Mining Engine
 * ─────────────────────────────────────────────────────────────────────────────
 * Live mining support for TRUMP, DOGE, BTC, SHADOW, SKYCOIN4444, MONERO, USDT
 */

import { Decimal } from "decimal.js";

<<<<<<< HEAD
export type MineableCoin = "TRUMP" | "DOGE" | "BTC" | "SHADOW" | "SKYCOIN4444" | "MONERO" | "USDT";
=======
export type MineableCoin =
  | "TRUMP"
  | "DOGE"
  | "BTC"
  | "SHADOW"
  | "SKYCOIN4444"
  | "MONERO"
  | "USDT";
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498

export interface MiningConfig {
  coin: MineableCoin;
  blockReward: string;
  difficulty: string;
  blockTime: number; // seconds
  halvingInterval: number;
  minHashrate: string;
  maxHashrate: string;
  poolFee: number; // basis points
}

export interface MiningSession {
  sessionId: string;
  userId: number;
  coin: MineableCoin;
  hashrate: string;
  startTime: Date;
  endTime?: Date;
  blocksFound: number;
  totalReward: string;
  status: "active" | "paused" | "completed";
}

export interface MiningReward {
  coin: MineableCoin;
  blockHeight: number;
  reward: string;
  timestamp: Date;
  difficulty: string;
}

export const MINING_CONFIGS: Record<MineableCoin, MiningConfig> = {
  SKYCOIN4444: {
    coin: "SKYCOIN4444",
    blockReward: "50",
    difficulty: "1000000",
    blockTime: 60,
    halvingInterval: 210000,
    minHashrate: "1",
    maxHashrate: "10000",
    poolFee: 100, // 1%
  },
  SHADOW: {
    coin: "SHADOW",
    blockReward: "40",
    difficulty: "800000",
    blockTime: 120,
    halvingInterval: 210000,
    minHashrate: "1",
    maxHashrate: "8000",
    poolFee: 100,
  },
  TRUMP: {
    coin: "TRUMP",
    blockReward: "100",
    difficulty: "500000",
    blockTime: 60,
    halvingInterval: 210000,
    minHashrate: "1",
    maxHashrate: "5000",
    poolFee: 150, // 1.5%
  },
  DOGE: {
    coin: "DOGE",
    blockReward: "10000",
    difficulty: "100000",
    blockTime: 60,
    halvingInterval: 210000,
    minHashrate: "1",
    maxHashrate: "3000",
    poolFee: 100,
  },
  BTC: {
    coin: "BTC",
    blockReward: "6.25",
    difficulty: "50000000000",
    blockTime: 600,
    halvingInterval: 210000,
    minHashrate: "0.1",
    maxHashrate: "1000",
    poolFee: 200, // 2%
  },
  MONERO: {
    coin: "MONERO",
    blockReward: "0.6",
    difficulty: "300000000",
    blockTime: 120,
    halvingInterval: 210000,
    minHashrate: "1",
    maxHashrate: "5000",
    poolFee: 100,
  },
  USDT: {
    coin: "USDT",
    blockReward: "1000",
    difficulty: "100000",
    blockTime: 30,
    halvingInterval: 210000,
    minHashrate: "1",
    maxHashrate: "2000",
    poolFee: 150,
  },
};

export class UnifiedMining {
  /**
   * Calculate expected rewards based on hashrate
   */
  static calculateExpectedReward(
    coin: MineableCoin,
    hashrate: string,
<<<<<<< HEAD
    durationSeconds: number,
=======
    durationSeconds: number
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
  ): string {
    const config = MINING_CONFIGS[coin];
    const hashrateDecimal = new Decimal(hashrate);
    const networkHashrate = new Decimal(config.difficulty).times(1000); // Estimate

    // Probability of finding block = hashrate / networkHashrate
    const blockProbability = hashrateDecimal.dividedBy(networkHashrate);

    // Expected blocks = probability * (duration / blockTime)
<<<<<<< HEAD
    const expectedBlocks = blockProbability.times(durationSeconds).dividedBy(config.blockTime);
=======
    const expectedBlocks = blockProbability
      .times(durationSeconds)
      .dividedBy(config.blockTime);
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498

    // Expected reward = expectedBlocks * blockReward
    const expectedReward = expectedBlocks.times(config.blockReward);

    // Apply pool fee
<<<<<<< HEAD
    const poolFeeMultiplier = new Decimal(10000 - config.poolFee).dividedBy(10000);
=======
    const poolFeeMultiplier = new Decimal(10000 - config.poolFee).dividedBy(
      10000
    );
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
    const netReward = expectedReward.times(poolFeeMultiplier);

    return netReward.toFixed(18);
  }

  /**
   * Calculate mining difficulty
   */
  static calculateDifficulty(
    coin: MineableCoin,
<<<<<<< HEAD
    networkHashrate: string,
  ): string {
    const config = MINING_CONFIGS[coin];
    const targetBlockTime = config.blockTime;
    const targetBlocksPerDay = (86400 / targetBlockTime);
=======
    networkHashrate: string
  ): string {
    const config = MINING_CONFIGS[coin];
    const targetBlockTime = config.blockTime;
    const targetBlocksPerDay = 86400 / targetBlockTime;
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498

    // Difficulty = networkHashrate / targetBlocksPerDay
    const difficulty = new Decimal(networkHashrate)
      .dividedBy(targetBlocksPerDay)
      .times(1000000);

    return difficulty.toFixed(0);
  }

  /**
   * Calculate time to find block
   */
<<<<<<< HEAD
  static calculateTimeToBlock(
    coin: MineableCoin,
    hashrate: string,
  ): number {
=======
  static calculateTimeToBlock(coin: MineableCoin, hashrate: string): number {
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
    const config = MINING_CONFIGS[coin];
    const hashrateDecimal = new Decimal(hashrate);
    const networkHashrate = new Decimal(config.difficulty).times(1000);

    // Probability per block attempt
    const probability = hashrateDecimal.dividedBy(networkHashrate);

    // Expected attempts = 1 / probability
    const expectedAttempts = new Decimal(1).dividedBy(probability);

    // Time = expectedAttempts * blockTime
    const timeSeconds = expectedAttempts.times(config.blockTime).toNumber();

    return Math.round(timeSeconds);
  }

  /**
   * Calculate ROI for mining
   */
  static calculateMiningROI(
    coin: MineableCoin,
    hashrate: string,
    electricityCostPerKwh: string,
    hardwareCostUsd: string,
<<<<<<< HEAD
    coinPriceUsd: string,
=======
    coinPriceUsd: string
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
  ): {
    dailyReward: string;
    dailyCost: string;
    dailyProfit: string;
    roi: number;
    breakEvenDays: number;
  } {
<<<<<<< HEAD
    const dailyRewardCoins = this.calculateExpectedReward(coin, hashrate, 86400);
    const dailyRewardUsd = new Decimal(dailyRewardCoins).times(coinPriceUsd);

    // Estimate power consumption: ~0.5W per MH/s (varies by hardware)
    const powerConsumption = new Decimal(hashrate).times(0.0005).dividedBy(1000); // kW
=======
    const dailyRewardCoins = this.calculateExpectedReward(
      coin,
      hashrate,
      86400
    );
    const dailyRewardUsd = new Decimal(dailyRewardCoins).times(coinPriceUsd);

    // Estimate power consumption: ~0.5W per MH/s (varies by hardware)
    const powerConsumption = new Decimal(hashrate)
      .times(0.0005)
      .dividedBy(1000); // kW
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
    const dailyCost = powerConsumption.times(24).times(electricityCostPerKwh);

    const dailyProfit = dailyRewardUsd.minus(dailyCost);
    const roi = dailyProfit.dividedBy(new Decimal(hardwareCostUsd)).times(100);

    const breakEvenDays = new Decimal(hardwareCostUsd)
      .dividedBy(dailyProfit.gt(0) ? dailyProfit : new Decimal(0.01))
      .toNumber();

    return {
      dailyReward: dailyRewardUsd.toFixed(2),
      dailyCost: dailyCost.toFixed(2),
      dailyProfit: dailyProfit.toFixed(2),
      roi: parseFloat(roi.toFixed(2)),
      breakEvenDays: Math.round(breakEvenDays),
    };
  }

  /**
   * Calculate pool statistics
   */
  static calculatePoolStats(
    coin: MineableCoin,
    totalHashrate: string,
<<<<<<< HEAD
    totalMiners: number,
=======
    totalMiners: number
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
  ): {
    networkHashrate: string;
    difficulty: string;
    avgBlockTime: number;
    blocksPerDay: number;
    totalDailyRewards: string;
  } {
    const config = MINING_CONFIGS[coin];
    const difficulty = this.calculateDifficulty(coin, totalHashrate);
    const avgBlockTime = config.blockTime;
    const blocksPerDay = 86400 / avgBlockTime;
    const totalDailyRewards = new Decimal(config.blockReward)
      .times(blocksPerDay)
      .toFixed(18);

    return {
      networkHashrate: totalHashrate,
      difficulty,
      avgBlockTime,
      blocksPerDay: Math.round(blocksPerDay),
      totalDailyRewards,
    };
  }

  /**
   * Validate mining session
   */
  static validateMiningSession(
    coin: MineableCoin,
<<<<<<< HEAD
    hashrate: string,
=======
    hashrate: string
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
  ): { valid: boolean; error?: string } {
    const config = MINING_CONFIGS[coin];
    const hashrateDecimal = new Decimal(hashrate);

    if (hashrateDecimal.lt(config.minHashrate)) {
      return { valid: false, error: `Minimum hashrate: ${config.minHashrate}` };
    }

    if (hashrateDecimal.gt(config.maxHashrate)) {
      return { valid: false, error: `Maximum hashrate: ${config.maxHashrate}` };
    }

    return { valid: true };
  }

  /**
   * Calculate halving impact
   */
  static calculateHalvingImpact(
    coin: MineableCoin,
<<<<<<< HEAD
    currentBlockHeight: number,
=======
    currentBlockHeight: number
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
  ): {
    blocksUntilHalving: number;
    currentReward: string;
    nextReward: string;
    rewardReduction: number;
  } {
    const config = MINING_CONFIGS[coin];
<<<<<<< HEAD
    const blocksUntilHalving = config.halvingInterval - (currentBlockHeight % config.halvingInterval);
    const halvingCount = Math.floor(currentBlockHeight / config.halvingInterval);

    const currentReward = new Decimal(config.blockReward).dividedBy(
      new Decimal(2).pow(halvingCount),
    );
    const nextReward = new Decimal(config.blockReward).dividedBy(
      new Decimal(2).pow(halvingCount + 1),
=======
    const blocksUntilHalving =
      config.halvingInterval - (currentBlockHeight % config.halvingInterval);
    const halvingCount = Math.floor(
      currentBlockHeight / config.halvingInterval
    );

    const currentReward = new Decimal(config.blockReward).dividedBy(
      new Decimal(2).pow(halvingCount)
    );
    const nextReward = new Decimal(config.blockReward).dividedBy(
      new Decimal(2).pow(halvingCount + 1)
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
    );

    const rewardReduction = new Decimal(currentReward)
      .minus(nextReward)
      .dividedBy(currentReward)
      .times(100)
      .toNumber();

    return {
      blocksUntilHalving,
      currentReward: currentReward.toFixed(18),
      nextReward: nextReward.toFixed(18),
      rewardReduction: parseFloat(rewardReduction.toFixed(2)),
    };
  }
}
