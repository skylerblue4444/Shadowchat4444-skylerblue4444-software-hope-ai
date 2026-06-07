/**
 * ICO & Whitepaper Infrastructure - Shadow Token + SKYCoin4444
 * Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
 * 
 * Complete ICO infrastructure for selling both tokens with whitepaper,
 * tokenomics, vesting schedules, and investor portal
 */

export interface Tokenomics {
  symbol: string;
  name: string;
  totalSupply: number;
  circulatingSupply: number;
  burnedSupply: number;
  lockedSupply: number;
  distribution: TokenDistribution;
  vestingSchedule: VestingSchedule[];
  priceHistory: PricePoint[];
}

export interface TokenDistribution {
  publicSale: number;
  privateSale: number;
  team: number;
  advisors: number;
  ecosystem: number;
  marketing: number;
  charity: number;
  reserve: number;
  mining: number;
  staking: number;
}

export interface VestingSchedule {
  category: string;
  totalTokens: number;
  cliffMonths: number;
  vestingMonths: number;
  tgeUnlock: number; // % unlocked at Token Generation Event
  monthlyUnlock: number;
}

export interface PricePoint {
  date: Date;
  price: number;
  volume: number;
  marketCap: number;
}

export interface WhitepaperSection {
  id: string;
  title: string;
  content: string;
  order: number;
}

export interface ICOPhase {
  id: string;
  name: string;
  tokenSymbol: string;
  startDate: Date;
  endDate: Date;
  tokenPrice: number;
  allocation: number;
  sold: number;
  minPurchase: number;
  maxPurchase: number;
  bonus: number;
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
  acceptedPayments: string[];
  kycRequired: boolean;
}

export interface InvestorPortal {
  userId: string;
  investments: InvestorInvestment[];
  totalInvested: number;
  totalTokens: number;
  vestedTokens: number;
  claimedTokens: number;
  unlockedTokens: number;
  nextUnlockDate: Date;
  nextUnlockAmount: number;
  kycStatus: 'not_started' | 'pending' | 'approved' | 'rejected';
  accreditedInvestor: boolean;
}

export interface InvestorInvestment {
  id: string;
  phase: string;
  tokenSymbol: string;
  amountUSD: number;
  tokenAmount: number;
  bonusTokens: number;
  purchaseDate: Date;
  vestingStart: Date;
  vestingEnd: Date;
  claimed: number;
}

// =============================================================================
// SKY4444 TOKENOMICS
// =============================================================================

export const SKY4444_TOKENOMICS: Tokenomics = {
  symbol: 'SKY4444',
  name: 'SkyCoin 4444',
  totalSupply: 444_000_000,
  circulatingSupply: 0,
  burnedSupply: 0,
  lockedSupply: 444_000_000,
  distribution: {
    publicSale: 0.30,    // 30% - 133,200,000 tokens
    privateSale: 0.10,   // 10% - 44,400,000 tokens
    team: 0.15,          // 15% - 66,600,000 tokens
    advisors: 0.05,      // 5% - 22,200,000 tokens
    ecosystem: 0.15,     // 15% - 66,600,000 tokens
    marketing: 0.05,     // 5% - 22,200,000 tokens
    charity: 0.05,       // 5% - 22,200,000 tokens
    reserve: 0.05,       // 5% - 22,200,000 tokens
    mining: 0.05,        // 5% - 22,200,000 tokens
    staking: 0.05,       // 5% - 22,200,000 tokens
  },
  vestingSchedule: [
    { category: 'Public Sale', totalTokens: 133200000, cliffMonths: 0, vestingMonths: 6, tgeUnlock: 25, monthlyUnlock: 12.5 },
    { category: 'Private Sale', totalTokens: 44400000, cliffMonths: 3, vestingMonths: 12, tgeUnlock: 10, monthlyUnlock: 7.5 },
    { category: 'Team', totalTokens: 66600000, cliffMonths: 12, vestingMonths: 36, tgeUnlock: 0, monthlyUnlock: 2.78 },
    { category: 'Advisors', totalTokens: 22200000, cliffMonths: 6, vestingMonths: 24, tgeUnlock: 0, monthlyUnlock: 4.17 },
    { category: 'Ecosystem', totalTokens: 66600000, cliffMonths: 0, vestingMonths: 48, tgeUnlock: 5, monthlyUnlock: 1.98 },
    { category: 'Marketing', totalTokens: 22200000, cliffMonths: 0, vestingMonths: 24, tgeUnlock: 10, monthlyUnlock: 3.75 },
    { category: 'Charity', totalTokens: 22200000, cliffMonths: 0, vestingMonths: 12, tgeUnlock: 20, monthlyUnlock: 6.67 },
    { category: 'Mining Rewards', totalTokens: 22200000, cliffMonths: 0, vestingMonths: 60, tgeUnlock: 0, monthlyUnlock: 1.67 },
    { category: 'Staking Rewards', totalTokens: 22200000, cliffMonths: 0, vestingMonths: 48, tgeUnlock: 0, monthlyUnlock: 2.08 },
  ],
  priceHistory: [],
};

// =============================================================================
// SHADOW TOKEN TOKENOMICS
// =============================================================================

export const SHADOW_TOKENOMICS: Tokenomics = {
  symbol: 'SHADOW',
  name: 'Shadow Token',
  totalSupply: 100_000_000,
  circulatingSupply: 0,
  burnedSupply: 0,
  lockedSupply: 100_000_000,
  distribution: {
    publicSale: 0.35,    // 35% - 35,000,000 tokens
    privateSale: 0.10,   // 10% - 10,000,000 tokens
    team: 0.10,          // 10% - 10,000,000 tokens
    advisors: 0.05,      // 5% - 5,000,000 tokens
    ecosystem: 0.15,     // 15% - 15,000,000 tokens
    marketing: 0.05,     // 5% - 5,000,000 tokens
    charity: 0.05,       // 5% - 5,000,000 tokens
    reserve: 0.05,       // 5% - 5,000,000 tokens
    mining: 0.05,        // 5% - 5,000,000 tokens
    staking: 0.05,       // 5% - 5,000,000 tokens
  },
  vestingSchedule: [
    { category: 'Public Sale', totalTokens: 35000000, cliffMonths: 0, vestingMonths: 3, tgeUnlock: 40, monthlyUnlock: 20 },
    { category: 'Private Sale', totalTokens: 10000000, cliffMonths: 1, vestingMonths: 9, tgeUnlock: 15, monthlyUnlock: 9.44 },
    { category: 'Team', totalTokens: 10000000, cliffMonths: 6, vestingMonths: 24, tgeUnlock: 0, monthlyUnlock: 4.17 },
    { category: 'Ecosystem', totalTokens: 15000000, cliffMonths: 0, vestingMonths: 36, tgeUnlock: 10, monthlyUnlock: 2.5 },
    { category: 'Mining Rewards', totalTokens: 5000000, cliffMonths: 0, vestingMonths: 48, tgeUnlock: 0, monthlyUnlock: 2.08 },
  ],
  priceHistory: [],
};

// =============================================================================
// ICO PHASES
// =============================================================================

export const ICO_PHASES: ICOPhase[] = [
  // SKY4444 Phases
  {
    id: 'sky4444_seed',
    name: 'SKY4444 Seed Round',
    tokenSymbol: 'SKY4444',
    startDate: new Date('2026-05-01'),
    endDate: new Date('2026-06-30'),
    tokenPrice: 0.005,
    allocation: 22_200_000,
    sold: 0,
    minPurchase: 500,
    maxPurchase: 50000,
    bonus: 30,
    status: 'active',
    acceptedPayments: ['USDT', 'BTC', 'ETH', 'stripe'],
    kycRequired: true,
  },
  {
    id: 'sky4444_private',
    name: 'SKY4444 Private Sale',
    tokenSymbol: 'SKY4444',
    startDate: new Date('2026-07-01'),
    endDate: new Date('2026-08-31'),
    tokenPrice: 0.008,
    allocation: 44_400_000,
    sold: 0,
    minPurchase: 100,
    maxPurchase: 250000,
    bonus: 15,
    status: 'upcoming',
    acceptedPayments: ['USDT', 'BTC', 'ETH', 'stripe'],
    kycRequired: true,
  },
  {
    id: 'sky4444_public',
    name: 'SKY4444 Public Sale',
    tokenSymbol: 'SKY4444',
    startDate: new Date('2026-09-01'),
    endDate: new Date('2026-12-31'),
    tokenPrice: 0.01,
    allocation: 133_200_000,
    sold: 0,
    minPurchase: 10,
    maxPurchase: 1000000,
    bonus: 5,
    status: 'upcoming',
    acceptedPayments: ['USDT', 'BTC', 'ETH', 'DOGE', 'stripe', 'wire'],
    kycRequired: false,
  },
  // SHADOW Phases
  {
    id: 'shadow_seed',
    name: 'Shadow Seed Round',
    tokenSymbol: 'SHADOW',
    startDate: new Date('2026-05-15'),
    endDate: new Date('2026-07-15'),
    tokenPrice: 0.002,
    allocation: 5_000_000,
    sold: 0,
    minPurchase: 250,
    maxPurchase: 25000,
    bonus: 40,
    status: 'active',
    acceptedPayments: ['USDT', 'BTC', 'SKY4444', 'stripe'],
    kycRequired: true,
  },
  {
    id: 'shadow_private',
    name: 'Shadow Private Sale',
    tokenSymbol: 'SHADOW',
    startDate: new Date('2026-08-01'),
    endDate: new Date('2026-09-30'),
    tokenPrice: 0.004,
    allocation: 10_000_000,
    sold: 0,
    minPurchase: 50,
    maxPurchase: 100000,
    bonus: 20,
    status: 'upcoming',
    acceptedPayments: ['USDT', 'BTC', 'SKY4444', 'stripe'],
    kycRequired: true,
  },
  {
    id: 'shadow_public',
    name: 'Shadow Public Sale',
    tokenSymbol: 'SHADOW',
    startDate: new Date('2026-10-01'),
    endDate: new Date('2027-01-31'),
    tokenPrice: 0.005,
    allocation: 35_000_000,
    sold: 0,
    minPurchase: 10,
    maxPurchase: 500000,
    bonus: 5,
    status: 'upcoming',
    acceptedPayments: ['USDT', 'BTC', 'ETH', 'DOGE', 'SKY4444', 'stripe', 'wire'],
    kycRequired: false,
  },
];

// =============================================================================
// WHITEPAPER CONTENT
// =============================================================================

export const SKY4444_WHITEPAPER: WhitepaperSection[] = [
  { id: 'abstract', title: 'Abstract', order: 1, content: 'SKY4444 is a next-generation cryptocurrency ecosystem combining DeFi, social trading, AI-powered analytics, charity integration, and gamification into a single unified platform. With a total supply of 444 million tokens, SKY4444 powers an entire economy of trading, staking, mining, marketplace transactions, and community governance.' },
  { id: 'problem', title: 'Problem Statement', order: 2, content: 'Current crypto platforms are fragmented, requiring users to navigate multiple apps for trading, social interaction, gaming, and DeFi. Security concerns, high fees, and lack of community features prevent mainstream adoption. SKY4444 solves this by creating an all-in-one super-app.' },
  { id: 'solution', title: 'Solution', order: 3, content: 'The SKY4444 platform integrates: (1) Multi-coin trading with 12+ pairs, (2) AI-powered Hope assistant with voice commands, (3) Mining and staking with competitive APY, (4) Charity-integrated casino gaming, (5) Social features with crypto tipping, (6) Anonymous marketplace with escrow, (7) Hacker puzzle challenges with crypto rewards, (8) Premium content monetization.' },
  { id: 'tokenomics', title: 'Tokenomics', order: 4, content: 'Total Supply: 444,000,000 SKY4444. Distribution: 30% Public Sale, 10% Private Sale, 15% Team (36-month vest), 5% Advisors, 15% Ecosystem Development, 5% Marketing, 5% Charity, 5% Reserve, 5% Mining Rewards, 5% Staking Rewards. Deflationary mechanism: 0.5% of all transaction fees are burned.' },
  { id: 'technology', title: 'Technology', order: 5, content: 'Built on Ethereum with Layer 2 scaling. Smart contracts audited by leading security firms. AI engine powered by advanced machine learning for trading signals, sentiment analysis, and risk assessment. End-to-end encryption for all communications. Provably fair gaming algorithms.' },
  { id: 'roadmap', title: 'Roadmap', order: 6, content: 'Q2 2026: Platform launch, ICO seed round, mining activation. Q3 2026: Private sale, social features, casino launch. Q4 2026: Public sale, exchange listings, mobile app. Q1 2027: Governance DAO, cross-chain bridges, institutional features. Q2 2027: Global expansion, fiat on-ramps, regulatory compliance.' },
  { id: 'team', title: 'Team', order: 7, content: 'Founded by Skyler Blue Spillers through Innovative Information Technology Resolutions LLC. The team combines expertise in blockchain development, AI/ML engineering, financial systems, cybersecurity, and community building.' },
  { id: 'legal', title: 'Legal & Compliance', order: 8, content: 'SKY4444 operates in compliance with applicable regulations. KYC/AML procedures for investments above $10,000. The platform implements kill switches and safety controls for responsible operation. Not available in restricted jurisdictions.' },
];

export const SHADOW_WHITEPAPER: WhitepaperSection[] = [
  { id: 'abstract', title: 'Abstract', order: 1, content: 'Shadow Token is a privacy-focused cryptocurrency designed for anonymous transactions, secure communications, and dark marketplace operations. With a supply of 100 million tokens, Shadow enables untraceable payments, encrypted messaging, and anonymous content creation.' },
  { id: 'privacy', title: 'Privacy Architecture', order: 2, content: 'Shadow implements zero-knowledge proofs for transaction privacy, ring signatures for sender anonymity, and stealth addresses for receiver privacy. All communications are end-to-end encrypted with forward secrecy.' },
  { id: 'use_cases', title: 'Use Cases', order: 3, content: 'Anonymous marketplace transactions, private tipping, encrypted communications, premium content access, privacy-preserving DeFi, secure voting, and whistleblower protection.' },
  { id: 'tokenomics', title: 'Tokenomics', order: 4, content: 'Total Supply: 100,000,000 SHADOW. Distribution: 35% Public Sale, 10% Private Sale, 10% Team, 5% Advisors, 15% Ecosystem, 5% Marketing, 5% Charity, 5% Reserve, 5% Mining, 5% Staking. Burn mechanism: 1% of marketplace fees burned.' },
  { id: 'mining', title: 'Mining', order: 5, content: 'Shadow uses a modified SHA-256 algorithm with privacy enhancements. Block time: 30 seconds. Initial reward: 25 SHADOW per block. Halving every 100,000 blocks. Maximum supply reached through mining: 5,000,000 tokens.' },
  { id: 'roadmap', title: 'Roadmap', order: 6, content: 'Q2 2026: Token launch, seed round. Q3 2026: Private sale, privacy features. Q4 2026: Public sale, marketplace integration. Q1 2027: Cross-chain privacy bridges. Q2 2027: Institutional privacy solutions.' },
];

// =============================================================================
// ICO WHITEPAPER ENGINE
// =============================================================================

class WhitepaperEngine {
  getWhitepaper(tokenSymbol: string): WhitepaperSection[] {
    switch (tokenSymbol) {
      case 'SKY4444': return SKY4444_WHITEPAPER;
      case 'SHADOW': return SHADOW_WHITEPAPER;
      default: return [];
    }
  }

  getTokenomics(tokenSymbol: string): Tokenomics | null {
    switch (tokenSymbol) {
      case 'SKY4444': return SKY4444_TOKENOMICS;
      case 'SHADOW': return SHADOW_TOKENOMICS;
      default: return null;
    }
  }

  getICOPhases(tokenSymbol?: string): ICOPhase[] {
    if (tokenSymbol) return ICO_PHASES.filter(p => p.tokenSymbol === tokenSymbol);
    return ICO_PHASES;
  }

  getActivePhases(): ICOPhase[] {
    return ICO_PHASES.filter(p => p.status === 'active');
  }

  calculateTokenAmount(phaseId: string, investmentUSD: number): { tokens: number; bonus: number; total: number } {
    const phase = ICO_PHASES.find(p => p.id === phaseId);
    if (!phase) throw new Error('Phase not found');
    if (investmentUSD < phase.minPurchase) throw new Error(`Minimum purchase: $${phase.minPurchase}`);
    if (investmentUSD > phase.maxPurchase) throw new Error(`Maximum purchase: $${phase.maxPurchase}`);

    const tokens = investmentUSD / phase.tokenPrice;
    const bonus = tokens * (phase.bonus / 100);
    return { tokens, bonus, total: tokens + bonus };
  }

  getRemainingAllocation(phaseId: string): number {
    const phase = ICO_PHASES.find(p => p.id === phaseId);
    if (!phase) return 0;
    return phase.allocation - phase.sold;
  }

  getTotalRaised(): { sky4444: number; shadow: number; total: number } {
    let sky4444 = 0;
    let shadow = 0;
    for (const phase of ICO_PHASES) {
      const raised = phase.sold * phase.tokenPrice;
      if (phase.tokenSymbol === 'SKY4444') sky4444 += raised;
      else shadow += raised;
    }
    return { sky4444, shadow, total: sky4444 + shadow };
  }
}

// Singleton instance
export const whitepaperEngine = new WhitepaperEngine();

export default {
  whitepaperEngine,
  SKY4444_TOKENOMICS,
  SHADOW_TOKENOMICS,
  ICO_PHASES,
  SKY4444_WHITEPAPER,
  SHADOW_WHITEPAPER,
};
