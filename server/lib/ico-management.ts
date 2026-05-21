/**
 * ICO Management System
 * ─────────────────────────────────────────────────────────────────────────────
 * Complete ICO lifecycle management, investment tracking, and distribution
 */

import { Decimal } from "decimal.js";

export type ICOPhase = "pre_sale" | "public_sale" | "whitelist" | "community";
export type ICOStatus = "upcoming" | "active" | "ended" | "failed" | "successful";

export interface ICOCampaign {
  icoId: string;
  coinId: string;
  coinSymbol: string;
  phase: ICOPhase;
  status: ICOStatus;
  startDate: Date;
  endDate: Date;
  softCap: string;
  hardCap: string;
  totalRaised: string;
  tokensForSale: string;
  pricePerToken: string;
  acceptedPayments: string[]; // Coins accepted
  minimumInvestment: string;
  maximumInvestment: string;
  vestingSchedule: VestingInfo;
  bonusStructure: BonusInfo[];
  whitelistRequired: boolean;
  kycRequired: boolean;
  status_: "active" | "ended";
}

export interface VestingInfo {
  cliff: number; // days
  duration: number; // days
  releasePercentage: number; // % released at cliff
}

export interface BonusInfo {
  tier: string;
  investmentThreshold: string;
  bonusPercentage: number;
  description: string;
}

export interface ICOInvestment {
  investmentId: string;
  icoId: string;
  investorId: number;
  investmentAmount: string;
  paymentCoin: string;
  tokensReceived: string;
  bonusTokens: string;
  investmentDate: Date;
  status: "pending" | "confirmed" | "distributed" | "refunded";
  vestingStartDate?: Date;
  releasedTokens: string;
}

export interface ICOWhitelist {
  whitelistId: string;
  icoId: string;
  investorId: number;
  status: "pending" | "approved" | "rejected";
  maxAllocation: string;
  investedAmount: string;
  approvalDate?: Date;
}

export interface ICOMetrics {
  icoId: string;
  totalInvestors: number;
  totalInvestment: string;
  averageInvestment: string;
  largestInvestment: string;
  smallestInvestment: string;
  capFillPercentage: number;
  tokensDistributed: string;
  tokensRemaining: string;
  daysRemaining: number;
}

export interface ICOTier {
  tierId: string;
  icoId: string;
  tierName: string;
  minInvestment: string;
  maxInvestment: string;
  tokenPrice: string;
  bonusPercentage: number;
  tokensAvailable: string;
  tokensSold: string;
  investors: number;
}

export class ICOManagement {
  /**
   * Create ICO campaign
   */
  static createICOCampaign(
    coinId: string,
    coinSymbol: string,
    phase: ICOPhase,
    startDate: Date,
    endDate: Date,
    softCap: string,
    hardCap: string,
    tokensForSale: string,
    pricePerToken: string,
    acceptedPayments: string[],
  ): ICOCampaign {
    return {
      icoId: `ICO-${coinSymbol}-${Date.now()}`,
      coinId,
      coinSymbol,
      phase,
      status: "upcoming",
      startDate,
      endDate,
      softCap,
      hardCap,
      totalRaised: "0",
      tokensForSale,
      pricePerToken,
      acceptedPayments,
      minimumInvestment: "100",
      maximumInvestment: new Decimal(hardCap).times(0.1).toFixed(2),
      vestingSchedule: {
        cliff: 30,
        duration: 365,
        releasePercentage: 20,
      },
      bonusStructure: [
        {
          tier: "Early Bird",
          investmentThreshold: "1000",
          bonusPercentage: 25,
          description: "First 1000 investors",
        },
        {
          tier: "Standard",
          investmentThreshold: "500",
          bonusPercentage: 15,
          description: "Standard tier",
        },
      ],
      whitelistRequired: false,
      kycRequired: true,
      status_: "active",
    };
  }

  /**
   * Calculate tokens for investment
   */
  static calculateTokensForInvestment(
    investmentAmount: string,
    pricePerToken: string,
    bonusPercentage: number = 0,
  ): { tokens: string; bonusTokens: string; total: string } {
    const tokens = new Decimal(investmentAmount).dividedBy(pricePerToken);
    const bonusTokens = tokens.times(bonusPercentage).dividedBy(100);
    const total = tokens.plus(bonusTokens);

    return {
      tokens: tokens.toFixed(18),
      bonusTokens: bonusTokens.toFixed(18),
      total: total.toFixed(18),
    };
  }

  /**
   * Record investment
   */
  static recordInvestment(
    icoId: string,
    investorId: number,
    investmentAmount: string,
    paymentCoin: string,
    pricePerToken: string,
    bonusPercentage: number = 0,
  ): ICOInvestment {
    const { tokens, bonusTokens } = this.calculateTokensForInvestment(
      investmentAmount,
      pricePerToken,
      bonusPercentage,
    );

    return {
      investmentId: `INV-${Date.now()}`,
      icoId,
      investorId,
      investmentAmount,
      paymentCoin,
      tokensReceived: tokens,
      bonusTokens,
      investmentDate: new Date(),
      status: "pending",
      releasedTokens: "0",
    };
  }

  /**
   * Calculate vesting release
   */
  static calculateVestingRelease(
    investment: ICOInvestment,
    vestingInfo: VestingInfo,
    currentDate: Date = new Date(),
  ): string {
    if (!investment.vestingStartDate) {
      return "0";
    }

    const cliffDate = new Date(investment.vestingStartDate);
    cliffDate.setDate(cliffDate.getDate() + vestingInfo.cliff);

    if (currentDate < cliffDate) {
      return "0";
    }

    const vestingEndDate = new Date(investment.vestingStartDate);
    vestingEndDate.setDate(
      vestingEndDate.getDate() + vestingInfo.duration,
    );

    if (currentDate >= vestingEndDate) {
      const total = new Decimal(investment.tokensReceived).plus(
        investment.bonusTokens,
      );
      return total.toFixed(18);
    }

    const totalTokens = new Decimal(investment.tokensReceived).plus(
      investment.bonusTokens,
    );
    const cliffRelease = totalTokens
      .times(vestingInfo.releasePercentage)
      .dividedBy(100);

    const remainingTokens = totalTokens.minus(cliffRelease);
    const remainingDays = vestingInfo.duration - vestingInfo.cliff;
    const elapsedDays = Math.floor(
      (currentDate.getTime() - cliffDate.getTime()) / (1000 * 60 * 60 * 24),
    );

    const linearRelease = remainingTokens
      .times(elapsedDays)
      .dividedBy(remainingDays);

    return cliffRelease.plus(linearRelease).toFixed(18);
  }

  /**
   * Get ICO metrics
   */
  static getICOMetrics(
    ico: ICOCampaign,
    investments: ICOInvestment[],
  ): ICOMetrics {
    const totalInvestment = investments.reduce(
      (sum, inv) => new Decimal(sum).plus(inv.investmentAmount),
      new Decimal(0),
    );

    const investmentAmounts = investments.map((inv) =>
      new Decimal(inv.investmentAmount),
    );
    const averageInvestment =
      investments.length > 0
        ? totalInvestment.dividedBy(investments.length)
        : new Decimal(0);

    const largestInvestment =
      investments.length > 0
        ? investmentAmounts.reduce((max, amount) =>
          amount.gt(max) ? amount : max,
        )
        : new Decimal(0);

    const smallestInvestment =
      investments.length > 0
        ? investmentAmounts.reduce((min, amount) =>
          amount.lt(min) ? amount : min,
        )
        : new Decimal(0);

    const capFillPercentage = new Decimal(totalInvestment)
      .dividedBy(ico.hardCap)
      .times(100)
      .toNumber();

    const tokensDistributed = investments.reduce(
      (sum, inv) =>
        new Decimal(sum)
          .plus(inv.tokensReceived)
          .plus(inv.bonusTokens),
      new Decimal(0),
    );

    const tokensRemaining = new Decimal(ico.tokensForSale).minus(
      tokensDistributed,
    );

    const daysRemaining = Math.ceil(
      (ico.endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24),
    );

    return {
      icoId: ico.icoId,
      totalInvestors: investments.length,
      totalInvestment: totalInvestment.toFixed(2),
      averageInvestment: averageInvestment.toFixed(2),
      largestInvestment: largestInvestment.toFixed(2),
      smallestInvestment: smallestInvestment.toFixed(2),
      capFillPercentage,
      tokensDistributed: tokensDistributed.toFixed(18),
      tokensRemaining: tokensRemaining.toFixed(18),
      daysRemaining,
    };
  }

  /**
   * Check if ICO reached soft cap
   */
  static reachedSoftCap(ico: ICOCampaign): boolean {
    return new Decimal(ico.totalRaised).gte(ico.softCap);
  }

  /**
   * Check if ICO reached hard cap
   */
  static reachedHardCap(ico: ICOCampaign): boolean {
    return new Decimal(ico.totalRaised).gte(ico.hardCap);
  }

  /**
   * Get refund eligibility
   */
  static getRefundEligibility(
    ico: ICOCampaign,
    investment: ICOInvestment,
  ): {
    eligible: boolean;
    reason: string;
  } {
    if (ico.status === "successful") {
      return { eligible: false, reason: "ICO was successful" };
    }

    if (ico.status === "active") {
      return { eligible: false, reason: "ICO is still active" };
    }

    if (ico.status === "failed" && !this.reachedSoftCap(ico)) {
      return { eligible: true, reason: "Soft cap not reached" };
    }

    return { eligible: false, reason: "Not eligible for refund" };
  }

  /**
   * Create ICO tier
   */
  static createICOTier(
    icoId: string,
    tierName: string,
    minInvestment: string,
    maxInvestment: string,
    tokenPrice: string,
    bonusPercentage: number,
    tokensAvailable: string,
  ): ICOTier {
    return {
      tierId: `TIER-${Date.now()}`,
      icoId,
      tierName,
      minInvestment,
      maxInvestment,
      tokenPrice,
      bonusPercentage,
      tokensAvailable,
      tokensSold: "0",
      investors: 0,
    };
  }

  /**
   * Get ICO timeline
   */
  static getICOTimeline(ico: ICOCampaign): {
    phase: string;
    startDate: Date;
    endDate: Date;
    daysRemaining: number;
    progressPercentage: number;
  } {
    const now = Date.now();
    const start = ico.startDate.getTime();
    const end = ico.endDate.getTime();
    const total = end - start;
    const elapsed = now - start;
    const progressPercentage = Math.min(100, (elapsed / total) * 100);
    const daysRemaining = Math.max(
      0,
      Math.ceil((end - now) / (1000 * 60 * 60 * 24)),
    );

    return {
      phase: ico.phase,
      startDate: ico.startDate,
      endDate: ico.endDate,
      daysRemaining,
      progressPercentage,
    };
  }

  /**
   * Add to whitelist
   */
  static addToWhitelist(
    icoId: string,
    investorId: number,
    maxAllocation: string,
  ): ICOWhitelist {
    return {
      whitelistId: `WL-${Date.now()}`,
      icoId,
      investorId,
      status: "pending",
      maxAllocation,
      investedAmount: "0",
    };
  }

  /**
   * Approve whitelist entry
   */
  static approveWhitelist(whitelist: ICOWhitelist): ICOWhitelist {
    return {
      ...whitelist,
      status: "approved",
      approvalDate: new Date(),
    };
  }

  /**
   * Get bonus tier
   */
  static getBonusTier(
    investment: string,
    bonusStructure: BonusInfo[],
  ): BonusInfo | null {
    const investmentAmount = new Decimal(investment);

    for (const bonus of bonusStructure) {
      if (investmentAmount.gte(bonus.investmentThreshold)) {
        return bonus;
      }
    }

    return null;
  }

  /**
   * Calculate ICO success metrics
   */
  static calculateSuccessMetrics(
    ico: ICOCampaign,
    investments: ICOInvestment[],
  ): {
    successRate: number;
    softCapMet: boolean;
    hardCapMet: boolean;
    status: ICOStatus;
  } {
    const totalRaised = investments.reduce(
      (sum, inv) => new Decimal(sum).plus(inv.investmentAmount),
      new Decimal(0),
    );

    const softCapMet = totalRaised.gte(ico.softCap);
    const hardCapMet = totalRaised.gte(ico.hardCap);

    const successRate = new Decimal(totalRaised)
      .dividedBy(ico.hardCap)
      .times(100)
      .toNumber();

    let status: ICOStatus = "upcoming";
    if (new Date() > ico.endDate) {
      status = softCapMet ? "successful" : "failed";
    } else if (new Date() >= ico.startDate) {
      status = "active";
    }

    return {
      successRate: Math.min(100, successRate),
      softCapMet,
      hardCapMet,
      status,
    };
  }
}
