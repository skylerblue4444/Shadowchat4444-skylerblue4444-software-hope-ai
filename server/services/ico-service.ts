/**
 * ICO Service - SKY4444 Initial Coin Offering & Funding Infrastructure
 * Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
 * 
 * Features: Token Sale, Vesting, Bonus Tiers, Whitepaper, Funding Rounds, Investor Portal
 */

import { ICO_CONFIG, FUNDING_CONFIG } from '../lib/crypto-infrastructure';

export interface ICOInvestment {
  id: string;
  userId: string;
  amountUSD: number;
  tokensAllocated: number;
  bonusTokens: number;
  totalTokens: number;
  bonusTier: string;
  vestingEndDate: Date;
  vestedTokens: number;
  claimedTokens: number;
  status: 'pending' | 'confirmed' | 'vesting' | 'fully_vested' | 'cancelled';
  paymentMethod: 'stripe' | 'crypto' | 'wire';
  paymentId: string;
  createdAt: Date;
}

export interface FundingRound {
  id: string;
  name: string;
  tokenPrice: number;
  allocation: number;
  sold: number;
  remaining: number;
  startDate: Date;
  endDate: Date;
  minInvestment: number;
  maxInvestment: number;
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
}

export interface InvestorStats {
  totalInvestors: number;
  totalRaised: number;
  totalTokensSold: number;
  averageInvestment: number;
  topTier: string;
}

// =============================================================================
// ICO ENGINE
// =============================================================================

class ICOEngine {
  private investments: Map<string, ICOInvestment> = new Map();
  private totalRaised: number = 0;
  private totalTokensSold: number = 0;

  private fundingRounds: FundingRound[] = [
    {
      id: 'seed',
      name: 'Seed Round',
      tokenPrice: 0.005,
      allocation: 50_000_000,
      sold: 0,
      remaining: 50_000_000,
      startDate: new Date('2026-05-01'),
      endDate: new Date('2026-06-30'),
      minInvestment: 1000,
      maxInvestment: 100000,
      status: 'active',
    },
    {
      id: 'private',
      name: 'Private Sale',
      tokenPrice: 0.008,
      allocation: 100_000_000,
      sold: 0,
      remaining: 100_000_000,
      startDate: new Date('2026-07-01'),
      endDate: new Date('2026-08-31'),
      minInvestment: 500,
      maxInvestment: 500000,
      status: 'upcoming',
    },
    {
      id: 'public',
      name: 'Public Sale (ICO)',
      tokenPrice: 0.01,
      allocation: 200_000_000,
      sold: 0,
      remaining: 200_000_000,
      startDate: new Date('2026-09-01'),
      endDate: new Date('2026-12-31'),
      minInvestment: 10,
      maxInvestment: 1000000,
      status: 'upcoming',
    },
  ];

  // Invest in ICO
  invest(
    userId: string,
    amountUSD: number,
    paymentMethod: 'stripe' | 'crypto' | 'wire',
    paymentId: string
  ): ICOInvestment {
    // Validate
    if (amountUSD < FUNDING_CONFIG.minInvestment) {
      throw new Error(`Minimum investment is $${FUNDING_CONFIG.minInvestment}`);
    }
    if (amountUSD > FUNDING_CONFIG.maxInvestment) {
      throw new Error(`Maximum investment is $${FUNDING_CONFIG.maxInvestment}`);
    }
    if (this.totalRaised >= ICO_CONFIG.hardCap) {
      throw new Error('ICO hard cap reached');
    }

    // Calculate tokens and bonus
    const tokensAllocated = amountUSD / ICO_CONFIG.tokenPrice;
    const bonusTier = this.getBonusTier(amountUSD);
    const bonusTokens = tokensAllocated * (bonusTier.bonusPercent / 100);
    const totalTokens = tokensAllocated + bonusTokens;

    const vestingEndDate = new Date(
      Date.now() + ICO_CONFIG.vestingPeriodDays * 24 * 60 * 60 * 1000
    );

    const investment: ICOInvestment = {
      id: `ico_${Date.now()}_${userId}`,
      userId,
      amountUSD,
      tokensAllocated,
      bonusTokens,
      totalTokens,
      bonusTier: bonusTier.label,
      vestingEndDate,
      vestedTokens: 0,
      claimedTokens: 0,
      status: 'confirmed',
      paymentMethod,
      paymentId,
      createdAt: new Date(),
    };

    this.investments.set(investment.id, investment);
    this.totalRaised += amountUSD;
    this.totalTokensSold += totalTokens;

    return investment;
  }

  // Get bonus tier for investment amount
  private getBonusTier(amountUSD: number): { bonusPercent: number; label: string } {
    const tiers = [...ICO_CONFIG.bonusTiers].sort((a, b) => b.minInvestment - a.minInvestment);
    for (const tier of tiers) {
      if (amountUSD >= tier.minInvestment) {
        return tier;
      }
    }
    return { bonusPercent: 0, label: 'Standard' };
  }

  // Calculate vested tokens
  calculateVestedTokens(investmentId: string): number {
    const investment = this.investments.get(investmentId);
    if (!investment) return 0;

    const now = new Date();
    const totalVestingMs = investment.vestingEndDate.getTime() - investment.createdAt.getTime();
    const elapsedMs = now.getTime() - investment.createdAt.getTime();
    const vestingProgress = Math.min(elapsedMs / totalVestingMs, 1);

    return investment.totalTokens * vestingProgress;
  }

  // Claim vested tokens
  claimTokens(investmentId: string, userId: string): number {
    const investment = this.investments.get(investmentId);
    if (!investment) throw new Error('Investment not found');
    if (investment.userId !== userId) throw new Error('Unauthorized');

    const vestedTokens = this.calculateVestedTokens(investmentId);
    const claimable = vestedTokens - investment.claimedTokens;

    if (claimable <= 0) throw new Error('No tokens available to claim');

    investment.claimedTokens += claimable;
    investment.vestedTokens = vestedTokens;

    if (investment.claimedTokens >= investment.totalTokens) {
      investment.status = 'fully_vested';
    } else {
      investment.status = 'vesting';
    }

    return claimable;
  }

  // Get user investments
  getUserInvestments(userId: string): ICOInvestment[] {
    return Array.from(this.investments.values())
      .filter(i => i.userId === userId);
  }

  // Get ICO status
  getICOStatus(): {
    totalRaised: number;
    hardCap: number;
    softCap: number;
    progress: number;
    tokensSold: number;
    investorCount: number;
    isActive: boolean;
  } {
    const now = new Date();
    const isActive = now >= ICO_CONFIG.startDate && now <= ICO_CONFIG.endDate;

    return {
      totalRaised: this.totalRaised,
      hardCap: ICO_CONFIG.hardCap,
      softCap: ICO_CONFIG.softCap,
      progress: (this.totalRaised / ICO_CONFIG.hardCap) * 100,
      tokensSold: this.totalTokensSold,
      investorCount: new Set(Array.from(this.investments.values()).map(i => i.userId)).size,
      isActive,
    };
  }

  // Get funding rounds
  getFundingRounds(): FundingRound[] {
    return this.fundingRounds;
  }

  // Get active funding round
  getActiveRound(): FundingRound | null {
    return this.fundingRounds.find(r => r.status === 'active') || null;
  }

  // Get investor statistics
  getInvestorStats(): InvestorStats {
    const investments = Array.from(this.investments.values());
    const uniqueInvestors = new Set(investments.map(i => i.userId));

    return {
      totalInvestors: uniqueInvestors.size,
      totalRaised: this.totalRaised,
      totalTokensSold: this.totalTokensSold,
      averageInvestment: investments.length > 0
        ? this.totalRaised / investments.length
        : 0,
      topTier: 'Diamond Whale',
    };
  }
}

// Singleton instance
export const icoEngine = new ICOEngine();

export default icoEngine;
