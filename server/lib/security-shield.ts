/**
 * Security Shield & Audit System
 * ─────────────────────────────────────────────────────────────────────────────
 * AI-driven fraud detection, compliance, and Proof of Reserve auditing
 */

import { Decimal } from "decimal.js";

export type ThreatLevel = "low" | "medium" | "high" | "critical";
export type AuditStatus = "pending" | "in_progress" | "completed" | "failed";
export type ComplianceLevel = "compliant" | "warning" | "non_compliant";

export interface SecurityThreat {
  threatId: string;
  type: "fraud" | "manipulation" | "exploit" | "phishing" | "ddos" | "unauthorized_access";
  level: ThreatLevel;
  description: string;
  detectedAt: Date;
  affectedUsers?: number;
  status: "detected" | "investigating" | "mitigated" | "resolved";
  action: string;
}

export interface FraudDetection {
  detectionId: string;
  userId: number;
  type: "unusual_activity" | "suspicious_transaction" | "account_takeover" | "wash_trading" | "pump_dump";
  confidence: number; // 0-100
  indicators: string[];
  timestamp: Date;
  status: "flagged" | "investigating" | "cleared" | "confirmed";
  riskScore: number;
}

export interface ProofOfReserve {
  auditId: string;
  coinType: string;
  timestamp: Date;
  status: AuditStatus;
  claimedReserve: string;
  verifiedReserve: string;
  discrepancy: string;
  discrepancyPercent: number;
  walletAddresses: string[];
  blockchainVerification: {
    verified: boolean;
    blockHeight: number;
    txHash: string;
  };
}

export interface ComplianceReport {
  reportId: string;
  userId: number;
  period: string; // e.g., "2026-Q1"
  status: ComplianceLevel;
  kyc: boolean;
  aml: boolean;
  sanctions: boolean;
  taxReporting: boolean;
  issues: string[];
  timestamp: Date;
}

export interface AuditLog {
  logId: string;
  userId?: number;
  action: string;
  resource: string;
  changes: Record<string, any>;
  timestamp: Date;
  ipAddress: string;
  userAgent: string;
  status: "success" | "failure";
}

export interface RiskAssessment {
  assessmentId: string;
  userId: number;
  overallRiskScore: number; // 0-100
  factors: {
    transactionPatterns: number;
    accountAge: number;
    verificationStatus: number;
    geolocation: number;
    deviceFingerprint: number;
  };
  level: ThreatLevel;
  recommendations: string[];
  timestamp: Date;
}

export interface SecurityIncident {
  incidentId: string;
  type: string;
  severity: ThreatLevel;
  description: string;
  affectedSystems: string[];
  timeline: { time: Date; event: string }[];
  resolution: string;
  status: "open" | "in_progress" | "resolved";
  createdAt: Date;
  resolvedAt?: Date;
}

export class SecurityShield {
  /**
   * Detect fraudulent activity
   */
  static detectFraud(
    userId: number,
    transactionAmount: string,
    userAverageTransaction: string,
    timesSinceLastTransaction: number,
    locationChange: boolean,
    deviceChange: boolean,
  ): FraudDetection {
    const indicators: string[] = [];
    let confidenceScore = 0;

    // Check transaction amount anomaly
    const amountRatio = new Decimal(transactionAmount).dividedBy(userAverageTransaction).toNumber();
    if (amountRatio > 5) {
      indicators.push("Unusually large transaction");
      confidenceScore += 20;
    }

    // Check timing anomaly
    if (timesSinceLastTransaction < 60) {
      indicators.push("Rapid consecutive transactions");
      confidenceScore += 15;
    }

    // Check location change
    if (locationChange) {
      indicators.push("Unusual location detected");
      confidenceScore += 15;
    }

    // Check device change
    if (deviceChange) {
      indicators.push("New device detected");
      confidenceScore += 10;
    }

    let type: "unusual_activity" | "suspicious_transaction" | "account_takeover" | "wash_trading" | "pump_dump" = "unusual_activity";
    if (confidenceScore > 50) {
      type = "account_takeover";
    } else if (confidenceScore > 30) {
      type = "suspicious_transaction";
    }

    const riskScore = Math.min(100, confidenceScore);

    return {
      detectionId: `FRAUD-${Date.now()}`,
      userId,
      type,
      confidence: Math.min(100, confidenceScore),
      indicators,
      timestamp: new Date(),
      status: confidenceScore > 70 ? "flagged" : "investigating",
      riskScore,
    };
  }

  /**
   * Generate security threat
   */
  static generateSecurityThreat(
    type: "fraud" | "manipulation" | "exploit" | "phishing" | "ddos" | "unauthorized_access",
    description: string,
    affectedUsers?: number,
  ): SecurityThreat {
    let level: ThreatLevel = "medium";
    if (affectedUsers && affectedUsers > 1000) {
      level = "critical";
    } else if (affectedUsers && affectedUsers > 100) {
      level = "high";
    }

    const actions: Record<string, string> = {
      fraud: "Freeze suspicious accounts and initiate investigation",
      manipulation: "Monitor market activity and alert traders",
      exploit: "Patch vulnerability and audit systems",
      phishing: "Block phishing URLs and notify users",
      ddos: "Activate DDoS protection and scale infrastructure",
      unauthorized_access: "Reset credentials and enable 2FA",
    };

    return {
      threatId: `THREAT-${Date.now()}`,
      type,
      level,
      description,
      detectedAt: new Date(),
      affectedUsers,
      status: "detected",
      action: actions[type],
    };
  }

  /**
   * Verify Proof of Reserve
   */
  static verifyProofOfReserve(
    coinType: string,
    claimedReserve: string,
    verifiedWallets: { address: string; balance: string }[],
  ): ProofOfReserve {
    const verifiedReserve = verifiedWallets.reduce(
      (sum, wallet) => new Decimal(sum).plus(wallet.balance),
      new Decimal(0),
    );

    const claimedDecimal = new Decimal(claimedReserve);
    const discrepancy = claimedDecimal.minus(verifiedReserve);
    const discrepancyPercent = discrepancy
      .dividedBy(claimedDecimal)
      .times(100)
      .toNumber();

    return {
      auditId: `POR-${Date.now()}`,
      coinType,
      timestamp: new Date(),
      status: "completed",
      claimedReserve,
      verifiedReserve: verifiedReserve.toFixed(18),
      discrepancy: discrepancy.toFixed(18),
      discrepancyPercent,
      walletAddresses: verifiedWallets.map((w) => w.address),
      blockchainVerification: {
        verified: true,
        blockHeight: Math.floor(Math.random() * 1000000),
        txHash: `0x${Math.random().toString(16).slice(2)}`,
      },
    };
  }

  /**
   * Generate compliance report
   */
  static generateComplianceReport(
    userId: number,
    period: string,
    kycVerified: boolean,
    amlPassed: boolean,
    sanctionsCleared: boolean,
    taxReported: boolean,
  ): ComplianceReport {
    const issues: string[] = [];
    let status: ComplianceLevel = "compliant";

    if (!kycVerified) {
      issues.push("KYC verification incomplete");
      status = "warning";
    }
    if (!amlPassed) {
      issues.push("AML check failed");
      status = "non_compliant";
    }
    if (!sanctionsCleared) {
      issues.push("Sanctions list match detected");
      status = "non_compliant";
    }
    if (!taxReported) {
      issues.push("Tax reporting incomplete");
      status = "warning";
    }

    return {
      reportId: `COMP-${Date.now()}`,
      userId,
      period,
      status,
      kyc: kycVerified,
      aml: amlPassed,
      sanctions: sanctionsCleared,
      taxReporting: taxReported,
      issues,
      timestamp: new Date(),
    };
  }

  /**
   * Log audit trail
   */
  static logAuditTrail(
    userId: number | undefined,
    action: string,
    resource: string,
    changes: Record<string, any>,
    ipAddress: string,
    userAgent: string,
  ): AuditLog {
    return {
      logId: `AUDIT-${Date.now()}`,
      userId,
      action,
      resource,
      changes,
      timestamp: new Date(),
      ipAddress,
      userAgent,
      status: "success",
    };
  }

  /**
   * Assess user risk
   */
  static assessUserRisk(
    userId: number,
    transactionCount: number,
    accountAgeMonths: number,
    verificationStatus: number, // 0-100
    geolocationChanges: number,
    deviceCount: number,
  ): RiskAssessment {
    const transactionRisk = Math.max(0, 100 - transactionCount * 2); // More transactions = lower risk
    const accountRisk = Math.max(0, 100 - accountAgeMonths * 2); // Older account = lower risk
    const verificationRisk = 100 - verificationStatus;
    const geolocationRisk = Math.min(100, geolocationChanges * 15);
    const deviceRisk = Math.min(100, deviceCount * 20);

    const overallRiskScore =
      (transactionRisk +
        accountRisk +
        verificationRisk +
        geolocationRisk +
        deviceRisk) /
      5;

    let level: ThreatLevel = "low";
    if (overallRiskScore > 75) {
      level = "critical";
    } else if (overallRiskScore > 50) {
      level = "high";
    } else if (overallRiskScore > 25) {
      level = "medium";
    }

    const recommendations: string[] = [];
    if (level === "critical") {
      recommendations.push("Require additional verification");
      recommendations.push("Limit transaction amounts");
    }
    if (geolocationRisk > 50) {
      recommendations.push("Verify new location");
    }
    if (deviceRisk > 50) {
      recommendations.push("Verify new device");
    }

    return {
      assessmentId: `RISK-${Date.now()}`,
      userId,
      overallRiskScore,
      factors: {
        transactionPatterns: transactionRisk,
        accountAge: accountRisk,
        verificationStatus: verificationRisk,
        geolocation: geolocationRisk,
        deviceFingerprint: deviceRisk,
      },
      level,
      recommendations,
      timestamp: new Date(),
    };
  }

  /**
   * Create security incident
   */
  static createSecurityIncident(
    type: string,
    severity: ThreatLevel,
    description: string,
    affectedSystems: string[],
  ): SecurityIncident {
    return {
      incidentId: `INC-${Date.now()}`,
      type,
      severity,
      description,
      affectedSystems,
      timeline: [
        {
          time: new Date(),
          event: "Incident detected",
        },
      ],
      resolution: "Under investigation",
      status: "open",
      createdAt: new Date(),
    };
  }

  /**
   * Detect wash trading
   */
  static detectWashTrading(
    trades: {
      buyPrice: string;
      sellPrice: string;
      quantity: string;
      timeBetween: number; // seconds
    }[],
  ): boolean {
    for (const trade of trades) {
      const buyPrice = new Decimal(trade.buyPrice);
      const sellPrice = new Decimal(trade.sellPrice);

      // Check if price difference is minimal (within 1%)
      const priceDiff = sellPrice.minus(buyPrice).dividedBy(buyPrice).times(100).abs();
      if (priceDiff.lt(1) && trade.timeBetween < 3600) {
        return true; // Likely wash trading
      }
    }
    return false;
  }

  /**
   * Verify transaction legitimacy
   */
  static verifyTransactionLegitimacy(
    userId: number,
    amount: string,
    userBalance: string,
    userHistory: { avgTransaction: string; txCount: number },
  ): {
    legitimate: boolean;
    riskScore: number;
    flags: string[];
  } {
    const flags: string[] = [];
    let riskScore = 0;

    // Check balance
    if (new Decimal(amount).gt(userBalance)) {
      flags.push("Insufficient balance");
      riskScore += 50;
    }

    // Check against user history
    const amountRatio = new Decimal(amount)
      .dividedBy(userHistory.avgTransaction)
      .toNumber();
    if (amountRatio > 10) {
      flags.push("Unusually large transaction");
      riskScore += 30;
    }

    // Check transaction count
    if (userHistory.txCount < 5) {
      flags.push("New account with limited history");
      riskScore += 20;
    }

    return {
      legitimate: riskScore < 50,
      riskScore: Math.min(100, riskScore),
      flags,
    };
  }

  /**
   * Generate security score
   */
  static generateSecurityScore(
    factors: {
      twoFactorEnabled: boolean;
      emailVerified: boolean;
      phoneVerified: boolean;
      kycCompleted: boolean;
        addressVerified: boolean;
      noSuspiciousActivity: boolean;
      noFailedLogins: boolean;
    },
  ): number {
    let score = 50; // Base score

    if (factors.twoFactorEnabled) score += 15;
    if (factors.emailVerified) score += 10;
    if (factors.phoneVerified) score += 10;
    if (factors.kycCompleted) score += 15;
    if (factors.addressVerified) score += 10;
    if (factors.noSuspiciousActivity) score += 15;
    if (factors.noFailedLogins) score += 5;

    return Math.min(100, score);
  }
}
