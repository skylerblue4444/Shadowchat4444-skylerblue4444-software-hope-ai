/**
 * Whale Tracker & Market Analytics
 * ─────────────────────────────────────────────────────────────────────────────
 * Real-time monitoring of large transactions and market movements
 */

import { Decimal } from "decimal.js";

export interface WhaleTransaction {
  txId: string;
  coinType: string;
  fromAddress: string;
  toAddress: string;
  amount: string;
  usdValue: string;
  timestamp: Date;
  status: "pending" | "confirmed" | "large_movement";
  riskLevel: "low" | "medium" | "high" | "critical";
}

export interface WhaleWallet {
  walletId: string;
  coinType: string;
  address: string;
  balance: string;
  usdValue: string;
  transactionCount: number;
  lastActivity: Date;
  riskScore: number; // 0-100
  category: "accumulator" | "distributor" | "trader" | "holder";
}

export interface MarketSentiment {
  coinType: string;
  sentiment: "very_bullish" | "bullish" | "neutral" | "bearish" | "very_bearish";
  score: number; // -100 to 100
  sources: {
    social: number;
    news: number;
    onChain: number;
    technicalAnalysis: number;
  };
  timestamp: Date;
}

export interface LargeMovement {
  movementId: string;
  coinType: string;
  type: "accumulation" | "distribution" | "liquidation" | "unusual_activity";
  amount: string;
  percentage: number; // % of circulating supply
  impact: "low" | "medium" | "high" | "critical";
  detectedAt: Date;
  predictedImpact: string;
}

export interface OnChainMetrics {
  coinType: string;
  activeAddresses: number;
  transactionVolume: string;
  averageTransactionSize: string;
  largeTransactions: number;
  networkHealth: number; // 0-100
  burnRate: string;
  mintRate: string;
}

export interface AnomalyAlert {
  alertId: string;
  coinType: string;
  type: "unusual_volume" | "whale_movement" | "price_divergence" | "liquidity_crisis" | "exchange_outflow";
  severity: "low" | "medium" | "high" | "critical";
  message: string;
  timestamp: Date;
  actionRequired: boolean;
}

export class WhaleTracker {
  // Whale thresholds (in USD)
  static readonly WHALE_THRESHOLDS = {
    SKYCOIN4444: 100000,
    SHADOW: 150000,
    TRUMP: 500000,
    DOGE: 1000000,
    BTC: 5000000,
    MONERO: 500000,
    USDT: 1000000,
  };

  /**
   * Detect whale transaction
   */
  static detectWhaleTransaction(
    coinType: string,
    amount: string,
    price: string,
  ): WhaleTransaction | null {
    const usdValue = new Decimal(amount).times(price);
    const threshold = new Decimal(
      this.WHALE_THRESHOLDS[coinType as keyof typeof this.WHALE_THRESHOLDS] || 1000000,
    );

    if (usdValue.lt(threshold)) {
      return null;
    }

    let riskLevel: "low" | "medium" | "high" | "critical" = "medium";
    if (usdValue.gt(threshold.times(5))) {
      riskLevel = "critical";
    } else if (usdValue.gt(threshold.times(3))) {
      riskLevel = "high";
    }

    return {
      txId: `WHALE-${Date.now()}`,
      coinType,
      fromAddress: `0x${Math.random().toString(16).slice(2)}`,
      toAddress: `0x${Math.random().toString(16).slice(2)}`,
      amount,
      usdValue: usdValue.toFixed(2),
      timestamp: new Date(),
      status: "pending",
      riskLevel,
    };
  }

  /**
   * Track whale wallet
   */
  static trackWhaleWallet(
    coinType: string,
    address: string,
    balance: string,
    price: string,
  ): WhaleWallet {
    const usdValue = new Decimal(balance).times(price);
    const threshold = new Decimal(
      this.WHALE_THRESHOLDS[coinType as keyof typeof this.WHALE_THRESHOLDS] || 1000000,
    );

    let category: "accumulator" | "distributor" | "trader" | "holder" = "holder";
    if (usdValue.gt(threshold.times(10))) {
      category = "accumulator";
    }

    const riskScore = Math.min(
      100,
      usdValue.dividedBy(threshold).times(50).toNumber(),
    );

    return {
      walletId: `WHALE-${Date.now()}`,
      coinType,
      address,
      balance,
      usdValue: usdValue.toFixed(2),
      transactionCount: Math.floor(Math.random() * 1000),
      lastActivity: new Date(),
      riskScore,
      category,
    };
  }

  /**
   * Analyze market sentiment
   */
  static analyzeMarketSentiment(
    coinType: string,
    socialScore: number,
    newsScore: number,
    onChainScore: number,
    technicalScore: number,
  ): MarketSentiment {
    const avgScore = (socialScore + newsScore + onChainScore + technicalScore) / 4;

    let sentiment: "very_bullish" | "bullish" | "neutral" | "bearish" | "very_bearish" = "neutral";
    if (avgScore > 75) {
      sentiment = "very_bullish";
    } else if (avgScore > 50) {
      sentiment = "bullish";
    } else if (avgScore < -75) {
      sentiment = "very_bearish";
    } else if (avgScore < -50) {
      sentiment = "bearish";
    }

    return {
      coinType,
      sentiment,
      score: Math.round(avgScore),
      sources: {
        social: socialScore,
        news: newsScore,
        onChain: onChainScore,
        technicalAnalysis: technicalScore,
      },
      timestamp: new Date(),
    };
  }

  /**
   * Detect large movements
   */
  static detectLargeMovement(
    coinType: string,
    amount: string,
    circulatingSupply: string,
    type: "accumulation" | "distribution" | "liquidation" | "unusual_activity",
  ): LargeMovement {
    const percentage = new Decimal(amount)
      .dividedBy(circulatingSupply)
      .times(100)
      .toNumber();

    let impact: "low" | "medium" | "high" | "critical" = "low";
    if (percentage > 5) {
      impact = "critical";
    } else if (percentage > 2) {
      impact = "high";
    } else if (percentage > 0.5) {
      impact = "medium";
    }

    const predictedImpact = `${percentage.toFixed(2)}% of supply moved - ${impact} impact`;

    return {
      movementId: `MOVE-${Date.now()}`,
      coinType,
      type,
      amount,
      percentage,
      impact,
      detectedAt: new Date(),
      predictedImpact,
    };
  }

  /**
   * Get on-chain metrics
   */
  static getOnChainMetrics(
    coinType: string,
    activeAddresses: number,
    transactionVolume: string,
    largeTransactions: number,
    burnRate: string,
    mintRate: string,
  ): OnChainMetrics {
    const networkHealth = Math.min(
      100,
      Math.max(0, 50 + activeAddresses / 100 - largeTransactions / 10),
    );

    const avgTransactionSize = new Decimal(transactionVolume)
      .dividedBy(Math.max(1, largeTransactions))
      .toFixed(18);

    return {
      coinType,
      activeAddresses,
      transactionVolume,
      averageTransactionSize: avgTransactionSize,
      largeTransactions,
      networkHealth,
      burnRate,
      mintRate,
    };
  }

  /**
   * Generate anomaly alerts
   */
  static generateAnomalyAlert(
    coinType: string,
    type: "unusual_volume" | "whale_movement" | "price_divergence" | "liquidity_crisis" | "exchange_outflow",
    currentValue: string,
    normalValue: string,
  ): AnomalyAlert {
    const deviation = new Decimal(currentValue)
      .minus(normalValue)
      .dividedBy(normalValue)
      .times(100)
      .toNumber();

    let severity: "low" | "medium" | "high" | "critical" = "low";
    if (Math.abs(deviation) > 50) {
      severity = "critical";
    } else if (Math.abs(deviation) > 30) {
      severity = "high";
    } else if (Math.abs(deviation) > 15) {
      severity = "medium";
    }

    const message = `${type}: ${Math.abs(deviation).toFixed(1)}% deviation detected on ${coinType}`;

    return {
      alertId: `ALERT-${Date.now()}`,
      coinType,
      type,
      severity,
      message,
      timestamp: new Date(),
      actionRequired: severity === "critical" || severity === "high",
    };
  }

  /**
   * Predict price impact
   */
  static predictPriceImpact(
    currentPrice: string,
    movementAmount: string,
    circulatingSupply: string,
    elasticity: number = 0.5, // Price elasticity
  ): {
    predictedPrice: string;
    priceChange: string;
    priceChangePercent: number;
  } {
    const percentageChange = new Decimal(movementAmount)
      .dividedBy(circulatingSupply)
      .times(100)
      .toNumber();

    const priceImpact = percentageChange * elasticity;
    const predictedPrice = new Decimal(currentPrice)
      .times(1 + priceImpact / 100)
      .toFixed(18);

    const priceChange = new Decimal(predictedPrice)
      .minus(currentPrice)
      .toFixed(18);

    return {
      predictedPrice,
      priceChange,
      priceChangePercent: priceImpact,
    };
  }

  /**
   * Get whale concentration
   */
  static getWhaleConcentration(
    whales: WhaleWallet[],
    totalMarketCap: string,
  ): {
    topWhalesPercentage: number;
    concentrationRisk: "low" | "medium" | "high" | "critical";
    topWhales: WhaleWallet[];
  } {
    const sorted = whales.sort(
      (a, b) =>
        new Decimal(b.usdValue).toNumber() - new Decimal(a.usdValue).toNumber(),
    );

    const topWhales = sorted.slice(0, 10);
    const topWhalesValue = topWhales.reduce(
      (sum, w) => new Decimal(sum).plus(w.usdValue),
      new Decimal(0),
    );

    const topWhalesPercentage = new Decimal(topWhalesValue)
      .dividedBy(totalMarketCap)
      .times(100)
      .toNumber();

    let concentrationRisk: "low" | "medium" | "high" | "critical" = "low";
    if (topWhalesPercentage > 50) {
      concentrationRisk = "critical";
    } else if (topWhalesPercentage > 30) {
      concentrationRisk = "high";
    } else if (topWhalesPercentage > 15) {
      concentrationRisk = "medium";
    }

    return {
      topWhalesPercentage,
      concentrationRisk,
      topWhales,
    };
  }

  /**
   * Monitor exchange flows
   */
  static monitorExchangeFlows(
    inflow: string,
    outflow: string,
  ): {
    netFlow: string;
    flowDirection: "inflow" | "outflow" | "neutral";
    pressure: "buying" | "selling" | "balanced";
  } {
    const netFlow = new Decimal(inflow).minus(outflow);
    const flowDirection = netFlow.gt(0) ? "inflow" : netFlow.lt(0) ? "outflow" : "neutral";

    const pressure =
      netFlow.gt(0) ? "buying" : netFlow.lt(0) ? "selling" : "balanced";

    return {
      netFlow: netFlow.toFixed(18),
      flowDirection,
      pressure,
    };
  }

  /**
   * Get whale activity score
   */
  static getWhaleActivityScore(
    transactions: WhaleTransaction[],
    timeWindowHours: number = 24,
  ): number {
    const now = Date.now();
    const windowMs = timeWindowHours * 60 * 60 * 1000;

    const recentTransactions = transactions.filter(
      (tx) => now - tx.timestamp.getTime() < windowMs,
    );

    const criticalCount = recentTransactions.filter(
      (tx) => tx.riskLevel === "critical",
    ).length;
    const highCount = recentTransactions.filter(
      (tx) => tx.riskLevel === "high",
    ).length;

    return Math.min(100, criticalCount * 20 + highCount * 10);
  }
}
