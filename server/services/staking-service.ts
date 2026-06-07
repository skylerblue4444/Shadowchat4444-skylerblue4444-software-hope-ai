/**
 * Staking Service - SKY4444 Multi-Pool Staking Infrastructure
 * Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
 * 
 * Supports: SKY4444, Shadow, TRUMP, USDT staking pools with variable APY
 */

import { STAKING_POOLS, type StakingPool } from '../lib/crypto-infrastructure';

export interface StakingPosition {
  id: string;
  userId: string;
  poolId: string;
  coinSymbol: string;
  amount: number;
  startDate: Date;
  endDate: Date;
  apy: number;
  accruedRewards: number;
  status: 'active' | 'completed' | 'withdrawn' | 'locked';
  autoCompound: boolean;
}

export interface StakingReward {
  positionId: string;
  amount: number;
  timestamp: Date;
  type: 'daily' | 'compound' | 'bonus';
}

// =============================================================================
// STAKING ENGINE
// =============================================================================

class StakingEngine {
  private positions: Map<string, StakingPosition> = new Map();
  private rewards: StakingReward[] = [];

  // Create a new staking position
  stake(
    userId: string,
    poolId: string,
    amount: number,
    autoCompound: boolean = false
  ): StakingPosition {
    const pool = STAKING_POOLS.find(p => p.id === poolId);
    if (!pool) throw new Error(`Staking pool ${poolId} not found`);
    if (!pool.active) throw new Error(`Staking pool ${poolId} is not active`);
    if (amount < pool.minStake) throw new Error(`Minimum stake is ${pool.minStake} ${pool.coinSymbol}`);
    if (amount > pool.maxStake) throw new Error(`Maximum stake is ${pool.maxStake} ${pool.coinSymbol}`);

    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + pool.lockPeriodDays * 24 * 60 * 60 * 1000);

    const position: StakingPosition = {
      id: `stake_${Date.now()}_${userId}`,
      userId,
      poolId,
      coinSymbol: pool.coinSymbol,
      amount,
      startDate,
      endDate,
      apy: pool.apy,
      accruedRewards: 0,
      status: 'active',
      autoCompound,
    };

    this.positions.set(position.id, position);
    pool.totalStaked += amount;

    return position;
  }

  // Unstake (withdraw) a position
  unstake(positionId: string, userId: string): StakingPosition {
    const position = this.positions.get(positionId);
    if (!position) throw new Error('Staking position not found');
    if (position.userId !== userId) throw new Error('Unauthorized');

    const now = new Date();
    if (now < position.endDate && position.status === 'active') {
      // Early withdrawal penalty: lose 50% of accrued rewards
      position.accruedRewards = position.accruedRewards * 0.5;
      position.status = 'withdrawn';
    } else {
      position.status = 'completed';
    }

    // Update pool total
    const pool = STAKING_POOLS.find(p => p.id === position.poolId);
    if (pool) {
      pool.totalStaked -= position.amount;
    }

    return position;
  }

  // Calculate and accrue daily rewards
  accrueRewards(): StakingReward[] {
    const newRewards: StakingReward[] = [];

    for (const [, position] of this.positions) {
      if (position.status !== 'active') continue;

      const dailyRate = position.apy / 365 / 100;
      const baseAmount = position.autoCompound
        ? position.amount + position.accruedRewards
        : position.amount;
      const dailyReward = baseAmount * dailyRate;

      position.accruedRewards += dailyReward;

      const reward: StakingReward = {
        positionId: position.id,
        amount: dailyReward,
        timestamp: new Date(),
        type: position.autoCompound ? 'compound' : 'daily',
      };

      newRewards.push(reward);
      this.rewards.push(reward);
    }

    return newRewards;
  }

  // Claim rewards without unstaking
  claimRewards(positionId: string, userId: string): number {
    const position = this.positions.get(positionId);
    if (!position) throw new Error('Position not found');
    if (position.userId !== userId) throw new Error('Unauthorized');
    if (position.autoCompound) throw new Error('Cannot claim from auto-compound position');

    const claimed = position.accruedRewards;
    position.accruedRewards = 0;
    return claimed;
  }

  // Get user positions
  getUserPositions(userId: string): StakingPosition[] {
    return Array.from(this.positions.values())
      .filter(p => p.userId === userId);
  }

  // Get pool info with live data
  getPoolInfo(poolId: string): StakingPool | undefined {
    return STAKING_POOLS.find(p => p.id === poolId);
  }

  // Get all active pools
  getActivePools(): StakingPool[] {
    return STAKING_POOLS.filter(p => p.active);
  }

  // Get total value locked across all pools
  getTotalValueLocked(): Record<string, number> {
    const tvl: Record<string, number> = {};
    for (const pool of STAKING_POOLS) {
      tvl[pool.coinSymbol] = (tvl[pool.coinSymbol] || 0) + pool.totalStaked;
    }
    return tvl;
  }

  // Get reward history for a position
  getRewardHistory(positionId: string): StakingReward[] {
    return this.rewards.filter(r => r.positionId === positionId);
  }
}

// Singleton instance
export const stakingEngine = new StakingEngine();

export default stakingEngine;
