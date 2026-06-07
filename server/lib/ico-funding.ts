/**
 * ICO Funding Infrastructure
 * ─────────────────────────────────────────────────────────────────────────────
 * Complete ICO system for SKYCOIN4444 and SHADOW with funding tracking
 */

import { Decimal } from "decimal.js";

export type ICOCoin = "SKYCOIN4444" | "SHADOW";

export interface ICOConfig {
  coin: ICOCoin;
  active: boolean;
  pricePerToken: string;
  hardCapUsd: string;
  softCapUsd: string;
  startDate: Date;
  endDate: Date;
  minInvestment: string;
  maxInvestment: string;
  acceptedPayments: string[];
}

export interface ICOTier {
  tierId: string;
  name: string;
  minInvestment: string;
  maxInvestment: string;
  tokenBonus: number; // percentage
  description: string;
  perks: string[];
}

export interface ICOInvestment {
  investmentId: string;
  userId: number;
  coin: ICOCoin;
  amountUsd: string;
  tokensReceived: string;
  paymentMethod: string;
  tier: string;
  status: "pending" | "confirmed" | "completed" | "refunded";
  timestamp: Date;
}

export interface ICOMetrics {
  coin: ICOCoin;
  totalRaised: string;
  totalInvestors: number;
  averageInvestment: string;
  percentageOfHardCap: number;
  percentageOfSoftCap: number;
  daysRemaining: number;
  tokensDistributed: string;
}

export const ICO_CONFIGS: Record<ICOCoin, ICOConfig> = {
  SKYCOIN4444: {
    coin: "SKYCOIN4444",
    active: true,
    pricePerToken: "0.001",
    hardCapUsd: "50000000",
    softCapUsd: "5000000",
    startDate: new Date("2026-01-01"),
    endDate: new Date("2026-12-31"),
    minInvestment: "100",
    maxInvestment: "1000000",
    acceptedPayments: ["stripe", "btc", "doge", "xmr", "usdt", "trump", "shadow"],
  },
  SHADOW: {
    coin: "SHADOW",
    active: true,
    pricePerToken: "0.0015",
    hardCapUsd: "30000000",
    softCapUsd: "3000000",
    startDate: new Date("2026-02-01"),
    endDate: new Date("2026-11-30"),
    minInvestment: "100",
    maxInvestment: "500000",
    acceptedPayments: ["stripe", "btc", "usdt", "skycoin4444"],
  },
};

export const ICO_TIERS: Record<ICOCoin, ICOTier[]> = {
  SKYCOIN4444: [
    {
      tierId: "EARLY_BIRD",
      name: "Early Bird",
      minInvestment: "100",
      maxInvestment: "10000",
      tokenBonus: 25,
      description: "First 1000 participants get 25% bonus tokens",
      perks: ["25% bonus tokens", "Early access to features", "Community badge"],
    },
    {
      tierId: "STANDARD",
      name: "Standard",
      minInvestment: "10000",
      maxInvestment: "100000",
      tokenBonus: 10,
      description: "Standard tier with 10% bonus",
      perks: ["10% bonus tokens", "Standard access", "Community badge"],
    },
    {
      tierId: "WHALE",
      name: "Whale",
      minInvestment: "100000",
      maxInvestment: "1000000",
      tokenBonus: 20,
      description: "Large investors get 20% bonus + VIP perks",
      perks: ["20% bonus tokens", "VIP support", "Quarterly calls", "Governance vote"],
    },
  ],
  SHADOW: [
    {
      tierId: "SUPPORTER",
      name: "Supporter",
      minInvestment: "100",
      maxInvestment: "5000",
      tokenBonus: 15,
      description: "Support SHADOW development",
      perks: ["15% bonus tokens", "Early access", "Community badge"],
    },
    {
      tierId: "CONTRIBUTOR",
      name: "Contributor",
      minInvestment: "5000",
      maxInvestment: "50000",
      tokenBonus: 12,
      description: "Contribute to SHADOW ecosystem",
      perks: ["12% bonus tokens", "Governance vote", "Monthly newsletter"],
    },
    {
      tierId: "FOUNDER",
      name: "Founder",
      minInvestment: "50000",
      maxInvestment: "500000",
      tokenBonus: 18,
      description: "Founding member with equity-like governance",
      perks: ["18% bonus tokens", "Equity-like governance", "VIP support", "Board seat"],
    },
  ],
};

export class ICOFunding {
  /**
   * Calculate tokens for investment
   */
  static calculateTokensReceived(
    coin: ICOCoin,
    investmentUsd: string,
    tierBonus: number,
  ): string {
    const config = ICO_CONFIGS[coin];
    const baseTokens = new Decimal(investmentUsd).dividedBy(config.pricePerToken);
    const bonusTokens = baseTokens.times(tierBonus).dividedBy(100);
    const totalTokens = baseTokens.plus(bonusTokens);

    return totalTokens.toFixed(18);
  }

  /**
   * Get appropriate tier for investment amount
   */
  static getTierForInvestment(
    coin: ICOCoin,
    investmentUsd: string,
  ): ICOTier | null {
    const tiers = ICO_TIERS[coin];
    const amount = new Decimal(investmentUsd);

    for (const tier of tiers) {
      if (amount.gte(tier.minInvestment) && amount.lte(tier.maxInvestment)) {
        return tier;
      }
    }

    return null;
  }

  /**
   * Validate investment
   */
  static validateInvestment(
    coin: ICOCoin,
    investmentUsd: string,
  ): { valid: boolean; error?: string } {
    const config = ICO_CONFIGS[coin];

    if (!config.active) {
      return { valid: false, error: "ICO is not currently active" };
    }

    const amount = new Decimal(investmentUsd);

    if (amount.lt(config.minInvestment)) {
      return { valid: false, error: `Minimum investment: $${config.minInvestment}` };
    }

    if (amount.gt(config.maxInvestment)) {
      return { valid: false, error: `Maximum investment: $${config.maxInvestment}` };
    }

    return { valid: true };
  }

  /**
   * Calculate ICO metrics
   */
  static calculateMetrics(
    coin: ICOCoin,
    totalRaisedUsd: string,
    totalInvestors: number,
    tokensDistributed: string,
  ): ICOMetrics {
    const config = ICO_CONFIGS[coin];
    const raised = new Decimal(totalRaisedUsd);
    const hardCap = new Decimal(config.hardCapUsd);
    const softCap = new Decimal(config.softCapUsd);

    const percentageOfHardCap = raised.dividedBy(hardCap).times(100).toNumber();
    const percentageOfSoftCap = raised.dividedBy(softCap).times(100).toNumber();

    const now = new Date();
    const daysRemaining = Math.max(
      0,
      Math.ceil((config.endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)),
    );

    const averageInvestment = totalInvestors > 0
      ? raised.dividedBy(totalInvestors).toFixed(2)
      : "0";

    return {
      coin,
      totalRaised: totalRaisedUsd,
      totalInvestors,
      averageInvestment,
      percentageOfHardCap: parseFloat(percentageOfHardCap.toFixed(2)),
      percentageOfSoftCap: parseFloat(percentageOfSoftCap.toFixed(2)),
      daysRemaining,
      tokensDistributed,
    };
  }

  /**
   * Calculate refund amount if soft cap not reached
   */
  static calculateRefund(
    coin: ICOCoin,
    investmentUsd: string,
    totalRaisedUsd: string,
  ): string {
    const config = ICO_CONFIGS[coin];
    const softCap = new Decimal(config.softCapUsd);
    const totalRaised = new Decimal(totalRaisedUsd);

    // If soft cap not reached, full refund
    if (totalRaised.lt(softCap)) {
      return investmentUsd;
    }

    return "0";
  }

  /**
   * Calculate vesting schedule for tokens
   */
  static calculateVestingSchedule(
    tokensReceived: string,
    vestingMonths: number = 12,
  ): {
    month: number;
    tokensUnlocked: string;
    cumulativeTokens: string;
  }[] {
    const schedule = [];
    const monthlyAllocation = new Decimal(tokensReceived).dividedBy(vestingMonths);

    for (let i = 1; i <= vestingMonths; i++) {
      const tokensUnlocked = monthlyAllocation.toFixed(18);
      const cumulativeTokens = monthlyAllocation.times(i).toFixed(18);

      schedule.push({
        month: i,
        tokensUnlocked,
        cumulativeTokens,
      });
    }

    return schedule;
  }

  /**
   * Get ICO status
   */
  static getICOStatus(coin: ICOCoin): "upcoming" | "active" | "ended" {
    const config = ICO_CONFIGS[coin];
    const now = new Date();

    if (now < config.startDate) return "upcoming";
    if (now > config.endDate) return "ended";
    return "active";
  }

  /**
   * Calculate bonus tokens for referral
   */
  static calculateReferralBonus(
    coin: ICOCoin,
    referredInvestmentUsd: string,
    referralBonusPercentage: number = 5,
  ): string {
    const config = ICO_CONFIGS[coin];
    const referredTokens = new Decimal(referredInvestmentUsd).dividedBy(
      config.pricePerToken,
    );
    const bonus = referredTokens.times(referralBonusPercentage).dividedBy(100);

    return bonus.toFixed(18);
  }

  /**
   * Generate investment summary
   */
  static generateInvestmentSummary(
    investment: ICOInvestment,
    currentTokenPrice: string,
  ): {
    investmentUsd: string;
    tokensReceived: string;
    currentValue: string;
    gain: string;
    gainPercentage: number;
  } {
    const currentValue = new Decimal(investment.tokensReceived).times(currentTokenPrice);
    const gain = currentValue.minus(investment.amountUsd);
    const gainPercentage = gain.dividedBy(investment.amountUsd).times(100).toNumber();

    return {
      investmentUsd: investment.amountUsd,
      tokensReceived: investment.tokensReceived,
      currentValue: currentValue.toFixed(2),
      gain: gain.toFixed(2),
      gainPercentage: parseFloat(gainPercentage.toFixed(2)),
    };
  }
}
