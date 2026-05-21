/**
 * Advanced Tokenomics System
 * ─────────────────────────────────────────────────────────────────────────────
 * Manages token supply, emissions, burns, vesting, and economic models.
 */

import { Decimal } from "decimal.js";

export interface TokenomicsConfig {
  coin: string;
  maxSupply: string;
  currentSupply: string;
  circulatingSupply: string;
  burnRate: number; // basis points
  emissionRate: number; // tokens per block
  halvingInterval: number; // blocks between halvings
  nextHalvingBlock: number;
}

export interface VestingSchedule {
  beneficiary: number; // userId
  token: string;
  amount: string;
  startBlock: number;
  endBlock: number;
  claimed: string;
  revocable: boolean;
}

export interface EmissionSchedule {
  block: number;
  emissionRate: string;
  halvingFactor: number;
  description: string;
}

export class Tokenomics {
  /**
   * Calculate circulating supply after burns
   */
  static getCirculatingSupply(
    totalSupply: string,
    burnedSupply: string,
    lockedSupply: string,
  ): string {
    const circulating = new Decimal(totalSupply)
      .minus(burnedSupply)
      .minus(lockedSupply);
    return circulating.toFixed(18);
  }

  /**
   * Calculate token inflation rate
   */
  static getInflationRate(
    currentSupply: string,
    maxSupply: string,
  ): number {
    const inflationRate = new Decimal(currentSupply)
      .dividedBy(maxSupply)
      .times(100);
    return parseFloat(inflationRate.toFixed(4));
  }

  /**
   * Calculate emission schedule with halving
   */
  static getEmissionAtBlock(
    currentBlock: number,
    startEmission: string,
    halvingInterval: number,
    currentBlock_: number,
  ): string {
    const halvings = Math.floor((currentBlock_ - currentBlock) / halvingInterval);
    const emission = new Decimal(startEmission).dividedBy(
      new Decimal(2).pow(halvings),
    );
    return emission.toFixed(18);
  }

  /**
   * Calculate total supply after emissions
   */
  static getProjectedSupply(
    currentSupply: string,
    emissionRate: string,
    blocksToProject: number,
  ): string {
    const newTokens = new Decimal(emissionRate).times(blocksToProject);
    const projectedSupply = new Decimal(currentSupply).plus(newTokens);
    return projectedSupply.toFixed(18);
  }

  /**
   * Calculate vesting amount claimable
   */
  static getVestingClaimable(
    schedule: VestingSchedule,
    currentBlock: number,
  ): string {
    if (currentBlock < schedule.startBlock) {
      return "0";
    }

    if (currentBlock >= schedule.endBlock) {
      return new Decimal(schedule.amount).minus(schedule.claimed).toFixed(18);
    }

    const vestingDuration = schedule.endBlock - schedule.startBlock;
    const elapsedBlocks = currentBlock - schedule.startBlock;
    const vestedAmount = new Decimal(schedule.amount)
      .times(elapsedBlocks)
      .dividedBy(vestingDuration);

    const claimable = vestedAmount.minus(schedule.claimed);
    return claimable.toFixed(18);
  }

  /**
   * Calculate vesting progress percentage
   */
  static getVestingProgress(
    schedule: VestingSchedule,
    currentBlock: number,
  ): number {
    if (currentBlock < schedule.startBlock) return 0;
    if (currentBlock >= schedule.endBlock) return 100;

    const vestingDuration = schedule.endBlock - schedule.startBlock;
    const elapsedBlocks = currentBlock - schedule.startBlock;
    const progress = (elapsedBlocks / vestingDuration) * 100;

    return parseFloat(progress.toFixed(2));
  }

  /**
   * Calculate market cap
   */
  static getMarketCap(circulatingSupply: string, priceUsd: string): string {
    const marketCap = new Decimal(circulatingSupply).times(priceUsd);
    return marketCap.toFixed(2);
  }

  /**
   * Calculate fully diluted valuation
   */
  static getFullyDilutedValuation(maxSupply: string, priceUsd: string): string {
    const fdv = new Decimal(maxSupply).times(priceUsd);
    return fdv.toFixed(2);
  }

  /**
   * Calculate token distribution percentage
   */
  static getDistributionPercentage(
    allocation: string,
    totalSupply: string,
  ): number {
    const percentage = new Decimal(allocation)
      .dividedBy(totalSupply)
      .times(100);
    return parseFloat(percentage.toFixed(2));
  }

  /**
   * Generate emission schedule
   */
  static generateEmissionSchedule(
    startEmission: string,
    halvingInterval: number,
    halvings: number,
  ): EmissionSchedule[] {
    const schedule: EmissionSchedule[] = [];
    let currentEmission = new Decimal(startEmission);

    for (let i = 0; i < halvings; i++) {
      schedule.push({
        block: i * halvingInterval,
        emissionRate: currentEmission.toFixed(18),
        halvingFactor: 0.5,
        description: `Halving ${i + 1}`,
      });
      currentEmission = currentEmission.times(0.5);
    }

    return schedule;
  }

  /**
   * Calculate burn impact on token value
   * Fewer tokens = higher scarcity = potential price increase
   */
  static calculateBurnImpact(
    burnAmount: string,
    circulatingSupply: string,
    currentPrice: string,
  ): {
    supplyReduction: number;
    potentialPriceImpact: number;
  } {
    const supplyReduction = new Decimal(burnAmount)
      .dividedBy(circulatingSupply)
      .times(100);

    // Rough estimate: 1% supply reduction ≈ 0.5% potential price increase
    const potentialPriceImpact = supplyReduction.times(0.5);

    return {
      supplyReduction: parseFloat(supplyReduction.toFixed(4)),
      potentialPriceImpact: parseFloat(potentialPriceImpact.toFixed(4)),
    };
  }
}
