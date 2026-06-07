/**
 * Advanced Coin Infrastructure & Tokenomics
 * ─────────────────────────────────────────────────────────────────────────────
 * Complete coin management, supply control, emission schedules, and economics
 */

import { Decimal } from "decimal.js";

export interface Coin {
  coinId: string;
  symbol: string;
  name: string;
  decimals: number;
  totalSupply: string;
  circulatingSupply: string;
  maxSupply: string;
  currentPrice: string;
  marketCap: string;
  volume24h: string;
  contractAddress: string;
  blockchain: string;
  launchDate: Date;
  website: string;
  whitepaper: string;
  verified: boolean;
}

export interface TokenomicsSchedule {
  scheduleId: string;
  coinId: string;
  type: "emission" | "vesting" | "unlock" | "burn";
  amount: string;
  releaseDate: Date;
  description: string;
  status: "pending" | "active" | "completed";
}

export interface EmissionSchedule {
  year: number;
  quarterlyEmission: string;
  halvingEvent?: boolean;
  burnAmount?: string;
  totalEmitted: string;
}

export interface VestingSchedule {
  vestingId: string;
  beneficiary: string;
  coinId: string;
  totalAmount: string;
  releasedAmount: string;
  startDate: Date;
  endDate: Date;
  cliffDate?: Date;
  vestingPeriod: number; // months
  releaseFrequency: "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
  status: "pending" | "active" | "completed";
}

export interface CoinMetrics {
  coinId: string;
  price: string;
  marketCap: string;
  fullyDilutedValuation: string;
  volume24h: string;
  priceChange24h: string;
  priceChange7d: string;
  priceChange30d: string;
  holders: number;
  transactions24h: number;
  burnedSupply: string;
  stakedSupply: string;
  liquidityPools: number;
}

export interface CoinAllocation {
  category: string;
  percentage: number;
  amount: string;
  description: string;
  vestingSchedule?: VestingSchedule;
}

export class CoinInfrastructure {
  // Supported coins
  static readonly SUPPORTED_COINS = {
    SKYCOIN4444: {
      symbol: "SKY4444",
      name: "SkyCore Coin",
      decimals: 18,
      maxSupply: "1000000000", // 1 billion
      blockchain: "Ethereum",
    },
    SHADOW: {
      symbol: "SHADOW",
      name: "Shadow Protocol",
      decimals: 18,
      maxSupply: "500000000", // 500 million
      blockchain: "Ethereum",
    },
    TRUMP: {
      symbol: "TRUMP",
      name: "Trump Coin",
      decimals: 8,
      maxSupply: "100000000", // 100 million
      blockchain: "Bitcoin",
    },
    DOGE: {
      symbol: "DOGE",
      name: "Dogecoin",
      decimals: 8,
      maxSupply: "unlimited",
      blockchain: "Dogecoin",
    },
    BTC: {
      symbol: "BTC",
      name: "Bitcoin",
      decimals: 8,
      maxSupply: "21000000", // 21 million
      blockchain: "Bitcoin",
    },
    MONERO: {
      symbol: "XMR",
      name: "Monero",
      decimals: 12,
      maxSupply: "unlimited",
      blockchain: "Monero",
    },
    USDT: {
      symbol: "USDT",
      name: "Tether",
      decimals: 6,
      maxSupply: "unlimited",
      blockchain: "Multi-chain",
    },
  };

  /**
   * Create coin
   */
  static createCoin(
    symbol: string,
    name: string,
    decimals: number,
    totalSupply: string,
    maxSupply: string,
    contractAddress: string,
    blockchain: string,
  ): Coin {
    return {
      coinId: `COIN-${symbol}-${Date.now()}`,
      symbol,
      name,
      decimals,
      totalSupply,
      circulatingSupply: totalSupply,
      maxSupply,
      currentPrice: "0",
      marketCap: "0",
      volume24h: "0",
      contractAddress,
      blockchain,
      launchDate: new Date(),
      website: `https://${symbol.toLowerCase()}.com`,
      whitepaper: `https://${symbol.toLowerCase()}.com/whitepaper`,
      verified: false,
    };
  }

  /**
   * Calculate market cap
   */
  static calculateMarketCap(
    circulatingSupply: string,
    price: string,
  ): string {
    return new Decimal(circulatingSupply)
      .times(price)
      .toFixed(2);
  }

  /**
   * Calculate fully diluted valuation
   */
  static calculateFDV(
    maxSupply: string,
    price: string,
  ): string {
    return new Decimal(maxSupply)
      .times(price)
      .toFixed(2);
  }

  /**
   * Generate emission schedule (halving every 4 years)
   */
  static generateEmissionSchedule(
    maxSupply: string,
    startYear: number = 2024,
  ): EmissionSchedule[] {
    const schedules: EmissionSchedule[] = [];
    let remaining = new Decimal(maxSupply);
    let yearlyEmission = remaining.dividedBy(4); // Emit 1/4 per year initially

    for (let year = 0; year < 20; year++) {
      const currentYear = startYear + year;
      const quarterlyEmission = yearlyEmission.dividedBy(4);
      const totalEmitted = new Decimal(maxSupply).minus(remaining);

      schedules.push({
        year: currentYear,
        quarterlyEmission: quarterlyEmission.toFixed(18),
        halvingEvent: year > 0 && year % 4 === 0,
        burnAmount: year % 2 === 0 ? quarterlyEmission.times(0.01).toFixed(18) : undefined,
        totalEmitted: totalEmitted.toFixed(18),
      });

      remaining = remaining.minus(yearlyEmission);

      // Halving every 4 years
      if ((year + 1) % 4 === 0) {
        yearlyEmission = yearlyEmission.dividedBy(2);
      }
    }

    return schedules;
  }

  /**
   * Create vesting schedule
   */
  static createVestingSchedule(
    beneficiary: string,
    coinId: string,
    totalAmount: string,
    startDate: Date,
    vestingPeriodMonths: number,
    releaseFrequency: "daily" | "weekly" | "monthly" | "quarterly" | "yearly",
  ): VestingSchedule {
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + vestingPeriodMonths);

    return {
      vestingId: `VEST-${Date.now()}`,
      beneficiary,
      coinId,
      totalAmount,
      releasedAmount: "0",
      startDate,
      endDate,
      vestingPeriod: vestingPeriodMonths,
      releaseFrequency,
      status: "pending",
    };
  }

  /**
   * Calculate vesting release amount
   */
  static calculateVestingRelease(
    vesting: VestingSchedule,
    currentDate: Date = new Date(),
  ): string {
    if (currentDate < vesting.startDate) {
      return "0";
    }

    if (currentDate >= vesting.endDate) {
      return vesting.totalAmount;
    }

    const totalDays = Math.floor(
      (vesting.endDate.getTime() - vesting.startDate.getTime()) / (1000 * 60 * 60 * 24),
    );
    const elapsedDays = Math.floor(
      (currentDate.getTime() - vesting.startDate.getTime()) / (1000 * 60 * 60 * 24),
    );

    const percentage = new Decimal(elapsedDays).dividedBy(totalDays);
    return new Decimal(vesting.totalAmount)
      .times(percentage)
      .toFixed(18);
  }

  /**
   * Get token allocation breakdown
   */
  static getTokenAllocation(totalSupply: string): CoinAllocation[] {
    const total = new Decimal(totalSupply);

    return [
      {
        category: "Community & Rewards",
        percentage: 40,
        amount: total.times(0.4).toFixed(18),
        description: "Mining, staking, and community rewards",
      },
      {
        category: "Team & Advisors",
        percentage: 15,
        amount: total.times(0.15).toFixed(18),
        description: "Team members with 2-year vesting",
      },
      {
        category: "Investors",
        percentage: 20,
        amount: total.times(0.2).toFixed(18),
        description: "Early investors with 1-year vesting",
      },
      {
        category: "Liquidity & Trading",
        percentage: 15,
        amount: total.times(0.15).toFixed(18),
        description: "DEX liquidity pools and market making",
      },
      {
        category: "Development Fund",
        percentage: 10,
        amount: total.times(0.1).toFixed(18),
        description: "Future development and partnerships",
      },
    ];
  }

  /**
   * Calculate burn impact
   */
  static calculateBurnImpact(
    circulatingSupply: string,
    burnAmount: string,
    currentPrice: string,
  ): {
    newCirculatingSupply: string;
    deflationaryEffect: string;
    marketCapImpact: string;
  } {
    const newSupply = new Decimal(circulatingSupply).minus(burnAmount);
    const supplyReduction = new Decimal(burnAmount)
      .dividedBy(circulatingSupply)
      .times(100);

    const oldMarketCap = new Decimal(circulatingSupply).times(currentPrice);
    const newMarketCap = newSupply.times(currentPrice);
    const marketCapChange = newMarketCap.minus(oldMarketCap);

    return {
      newCirculatingSupply: newSupply.toFixed(18),
      deflationaryEffect: supplyReduction.toFixed(2),
      marketCapImpact: marketCapChange.toFixed(2),
    };
  }

  /**
   * Get coin metrics
   */
  static getCoinMetrics(
    coin: Coin,
    holders: number,
    transactions24h: number,
    burnedSupply: string,
    stakedSupply: string,
  ): CoinMetrics {
    const marketCap = this.calculateMarketCap(
      coin.circulatingSupply,
      coin.currentPrice,
    );
    const fdv = this.calculateFDV(coin.maxSupply, coin.currentPrice);

    return {
      coinId: coin.coinId,
      price: coin.currentPrice,
      marketCap,
      fullyDilutedValuation: fdv,
      volume24h: coin.volume24h,
      priceChange24h: "0",
      priceChange7d: "0",
      priceChange30d: "0",
      holders,
      transactions24h,
      burnedSupply,
      stakedSupply,
      liquidityPools: 5,
    };
  }

  /**
   * Calculate inflation rate
   */
  static calculateInflationRate(
    emissionSchedule: EmissionSchedule[],
    circulatingSupply: string,
  ): string {
    const yearlyEmission = new Decimal(
      emissionSchedule[0]?.quarterlyEmission || "0",
    ).times(4);
    const inflationRate = yearlyEmission
      .dividedBy(circulatingSupply)
      .times(100);

    return inflationRate.toFixed(2);
  }

  /**
   * Get supply breakdown
   */
  static getSupplyBreakdown(
    totalSupply: string,
    circulatingSupply: string,
    burnedSupply: string,
    stakedSupply: string,
  ): {
    total: string;
    circulating: string;
    burned: string;
    staked: string;
    locked: string;
  } {
    const total = new Decimal(totalSupply);
    const locked = total
      .minus(circulatingSupply)
      .minus(burnedSupply);

    return {
      total: totalSupply,
      circulating: circulatingSupply,
      burned: burnedSupply,
      staked: stakedSupply,
      locked: locked.toFixed(18),
    };
  }

  /**
   * Verify coin authenticity
   */
  static verifyCoin(coin: Coin): {
    isVerified: boolean;
    score: number;
    issues: string[];
  } {
    const issues: string[] = [];
    let score = 100;

    if (!coin.contractAddress) {
      issues.push("No contract address");
      score -= 20;
    }

    if (!coin.whitepaper) {
      issues.push("No whitepaper");
      score -= 15;
    }

    if (!coin.website) {
      issues.push("No website");
      score -= 10;
    }

    if (new Decimal(coin.maxSupply).isZero()) {
      issues.push("Unlimited supply");
      score -= 5;
    }

    return {
      isVerified: score >= 80,
      score,
      issues,
    };
  }

  /**
   * Get coin price history
   */
  static generatePriceHistory(
    startPrice: string,
    days: number = 30,
  ): { date: Date; price: string }[] {
    const history = [];
    let currentPrice = new Decimal(startPrice);

    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (days - i));

      // Random walk
      const change = new Decimal(Math.random() - 0.5).times(0.1);
      currentPrice = currentPrice.times(new Decimal(1).plus(change));

      history.push({
        date,
        price: currentPrice.toFixed(18),
      });
    }

    return history;
  }
}
