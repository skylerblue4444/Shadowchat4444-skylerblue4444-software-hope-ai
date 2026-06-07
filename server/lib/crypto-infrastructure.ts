/**
 * SKY4444 Crypto Infrastructure - Live Multi-Coin Integration
 * Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
 * 
 * Supports: TRUMP, DOGE, BTC, Shadow, SKYCoin4444, Monero, USDT
 * Features: Mine, Stake, Swap, Trade, Sell, ICO, Shop, Whitepaper, Funding, Invest, Spot
 */

export interface CoinConfig {
  symbol: string;
  name: string;
  network: string;
  contractAddress?: string;
  decimals: number;
  enabled: boolean;
  features: CoinFeatures;
  pricing: PricingConfig;
}

export interface CoinFeatures {
  mining: boolean;
  staking: boolean;
  swap: boolean;
  trade: boolean;
  sell: boolean;
  buy: boolean;
  transfer: boolean;
  ico: boolean;
  spot: boolean;
}

export interface PricingConfig {
  basePrice: number;
  currency: string;
  priceSource: 'coingecko' | 'binance' | 'internal' | 'chainlink';
}

export interface MiningConfig {
  difficulty: number;
  reward: number;
  halvingInterval: number;
  maxSupply: number;
  blockTime: number; // seconds
  algorithm: string;
}

export interface StakingPool {
  id: string;
  coinSymbol: string;
  apy: number;
  minStake: number;
  maxStake: number;
  lockPeriodDays: number;
  totalStaked: number;
  rewardToken: string;
  active: boolean;
}

export interface ICOConfig {
  tokenSymbol: string;
  tokenPrice: number;
  hardCap: number;
  softCap: number;
  totalRaised: number;
  startDate: Date;
  endDate: Date;
  vestingPeriodDays: number;
  bonusTiers: BonusTier[];
  whitepaperUrl: string;
}

export interface BonusTier {
  minInvestment: number;
  bonusPercent: number;
  label: string;
}

export interface TradeOrder {
  id: string;
  userId: string;
  pair: string;
  side: 'buy' | 'sell';
  type: 'market' | 'limit' | 'stop';
  amount: number;
  price: number;
  status: 'pending' | 'filled' | 'cancelled' | 'partial';
  createdAt: Date;
  filledAt?: Date;
}

// =============================================================================
// SUPPORTED COINS REGISTRY
// =============================================================================

export const SUPPORTED_COINS: Record<string, CoinConfig> = {
  SKY4444: {
    symbol: 'SKY4444',
    name: 'SkyCoin4444',
    network: 'ethereum',
    contractAddress: process.env.SKYCOIN4444_CONTRACT_ADDRESS,
    decimals: 18,
    enabled: true,
    features: {
      mining: true,
      staking: true,
      swap: true,
      trade: true,
      sell: true,
      buy: true,
      transfer: true,
      ico: true,
      spot: true,
    },
    pricing: {
      basePrice: 0.01,
      currency: 'USD',
      priceSource: 'internal',
    },
  },
  TRUMP: {
    symbol: 'TRUMP',
    name: 'TRUMP Token',
    network: 'ethereum',
    contractAddress: process.env.TRUMP_CONTRACT_ADDRESS,
    decimals: 18,
    enabled: true,
    features: {
      mining: false,
      staking: true,
      swap: true,
      trade: true,
      sell: true,
      buy: true,
      transfer: true,
      ico: false,
      spot: true,
    },
    pricing: {
      basePrice: 0,
      currency: 'USD',
      priceSource: 'coingecko',
    },
  },
  DOGE: {
    symbol: 'DOGE',
    name: 'Dogecoin',
    network: 'dogecoin',
    decimals: 8,
    enabled: true,
    features: {
      mining: true,
      staking: false,
      swap: true,
      trade: true,
      sell: true,
      buy: true,
      transfer: true,
      ico: false,
      spot: true,
    },
    pricing: {
      basePrice: 0,
      currency: 'USD',
      priceSource: 'coingecko',
    },
  },
  BTC: {
    symbol: 'BTC',
    name: 'Bitcoin',
    network: 'bitcoin',
    decimals: 8,
    enabled: true,
    features: {
      mining: true,
      staking: false,
      swap: true,
      trade: true,
      sell: true,
      buy: true,
      transfer: true,
      ico: false,
      spot: true,
    },
    pricing: {
      basePrice: 0,
      currency: 'USD',
      priceSource: 'coingecko',
    },
  },
  SHADOW: {
    symbol: 'SHADOW',
    name: 'Shadow Token',
    network: 'ethereum',
    contractAddress: process.env.SHADOW_CONTRACT_ADDRESS,
    decimals: 18,
    enabled: true,
    features: {
      mining: true,
      staking: true,
      swap: true,
      trade: true,
      sell: true,
      buy: true,
      transfer: true,
      ico: true,
      spot: true,
    },
    pricing: {
      basePrice: 0.005,
      currency: 'USD',
      priceSource: 'internal',
    },
  },
  XMR: {
    symbol: 'XMR',
    name: 'Monero',
    network: 'monero',
    decimals: 12,
    enabled: true,
    features: {
      mining: true,
      staking: false,
      swap: true,
      trade: true,
      sell: true,
      buy: true,
      transfer: true,
      ico: false,
      spot: true,
    },
    pricing: {
      basePrice: 0,
      currency: 'USD',
      priceSource: 'coingecko',
    },
  },
  USDT: {
    symbol: 'USDT',
    name: 'Tether',
    network: 'ethereum',
    contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    decimals: 6,
    enabled: true,
    features: {
      mining: false,
      staking: true,
      swap: true,
      trade: true,
      sell: true,
      buy: true,
      transfer: true,
      ico: false,
      spot: true,
    },
    pricing: {
      basePrice: 1.0,
      currency: 'USD',
      priceSource: 'chainlink',
    },
  },
};

// =============================================================================
// MINING CONFIGURATIONS
// =============================================================================

export const MINING_CONFIGS: Record<string, MiningConfig> = {
  SKY4444: {
    difficulty: 4,
    reward: 10.0,
    halvingInterval: 210000,
    maxSupply: 444_000_000,
    blockTime: 60,
    algorithm: 'SHA-256',
  },
  SHADOW: {
    difficulty: 3,
    reward: 25.0,
    halvingInterval: 100000,
    maxSupply: 100_000_000,
    blockTime: 30,
    algorithm: 'SHA-256',
  },
  BTC: {
    difficulty: 20,
    reward: 3.125,
    halvingInterval: 210000,
    maxSupply: 21_000_000,
    blockTime: 600,
    algorithm: 'SHA-256',
  },
  DOGE: {
    difficulty: 6,
    reward: 10000,
    halvingInterval: 0, // No halving
    maxSupply: Infinity,
    blockTime: 60,
    algorithm: 'Scrypt',
  },
  XMR: {
    difficulty: 8,
    reward: 0.6,
    halvingInterval: 0, // Tail emission
    maxSupply: Infinity,
    blockTime: 120,
    algorithm: 'RandomX',
  },
};

// =============================================================================
// STAKING POOLS
// =============================================================================

export const STAKING_POOLS: StakingPool[] = [
  {
    id: 'sky4444-30d',
    coinSymbol: 'SKY4444',
    apy: 12.5,
    minStake: 100,
    maxStake: 10_000_000,
    lockPeriodDays: 30,
    totalStaked: 0,
    rewardToken: 'SKY4444',
    active: true,
  },
  {
    id: 'sky4444-90d',
    coinSymbol: 'SKY4444',
    apy: 18.0,
    minStake: 500,
    maxStake: 10_000_000,
    lockPeriodDays: 90,
    totalStaked: 0,
    rewardToken: 'SKY4444',
    active: true,
  },
  {
    id: 'sky4444-365d',
    coinSymbol: 'SKY4444',
    apy: 25.0,
    minStake: 1000,
    maxStake: 10_000_000,
    lockPeriodDays: 365,
    totalStaked: 0,
    rewardToken: 'SKY4444',
    active: true,
  },
  {
    id: 'shadow-30d',
    coinSymbol: 'SHADOW',
    apy: 15.0,
    minStake: 50,
    maxStake: 5_000_000,
    lockPeriodDays: 30,
    totalStaked: 0,
    rewardToken: 'SHADOW',
    active: true,
  },
  {
    id: 'trump-90d',
    coinSymbol: 'TRUMP',
    apy: 8.5,
    minStake: 100,
    maxStake: 1_000_000,
    lockPeriodDays: 90,
    totalStaked: 0,
    rewardToken: 'TRUMP',
    active: true,
  },
  {
    id: 'usdt-30d',
    coinSymbol: 'USDT',
    apy: 5.0,
    minStake: 10,
    maxStake: 1_000_000,
    lockPeriodDays: 30,
    totalStaked: 0,
    rewardToken: 'USDT',
    active: true,
  },
];

// =============================================================================
// ICO CONFIGURATION
// =============================================================================

export const ICO_CONFIG: ICOConfig = {
  tokenSymbol: 'SKY4444',
  tokenPrice: 0.01,
  hardCap: 10_000_000,
  softCap: 1_000_000,
  totalRaised: 0,
  startDate: new Date('2026-06-01'),
  endDate: new Date('2026-12-31'),
  vestingPeriodDays: 90,
  bonusTiers: [
    { minInvestment: 100, bonusPercent: 5, label: 'Early Bird' },
    { minInvestment: 1000, bonusPercent: 10, label: 'Silver Investor' },
    { minInvestment: 5000, bonusPercent: 15, label: 'Gold Investor' },
    { minInvestment: 25000, bonusPercent: 20, label: 'Platinum Investor' },
    { minInvestment: 100000, bonusPercent: 30, label: 'Diamond Whale' },
  ],
  whitepaperUrl: '/docs/whitepaper',
};

// =============================================================================
// TRADING PAIRS
// =============================================================================

export const TRADING_PAIRS = [
  'SKY4444/USDT',
  'SKY4444/BTC',
  'SKY4444/ETH',
  'SHADOW/USDT',
  'SHADOW/BTC',
  'TRUMP/USDT',
  'TRUMP/BTC',
  'DOGE/USDT',
  'DOGE/BTC',
  'BTC/USDT',
  'XMR/USDT',
  'XMR/BTC',
];

export const TRADING_FEES = {
  maker: 0.001, // 0.1%
  taker: 0.0025, // 0.25%
  withdrawal: {
    SKY4444: 1.0,
    SHADOW: 2.0,
    TRUMP: 5.0,
    DOGE: 5.0,
    BTC: 0.0001,
    XMR: 0.0001,
    USDT: 1.0,
  },
};

// =============================================================================
// SWAP CONFIGURATION
// =============================================================================

export const SWAP_CONFIG = {
  enabled: true,
  slippageTolerance: 0.005, // 0.5%
  maxSlippage: 0.05, // 5%
  feePercent: 0.003, // 0.3%
  supportedPairs: TRADING_PAIRS,
  liquidityPools: [
    { pair: 'SKY4444/USDT', liquidity: 1_000_000 },
    { pair: 'SHADOW/USDT', liquidity: 500_000 },
    { pair: 'TRUMP/USDT', liquidity: 2_000_000 },
    { pair: 'DOGE/USDT', liquidity: 5_000_000 },
    { pair: 'BTC/USDT', liquidity: 50_000_000 },
    { pair: 'XMR/USDT', liquidity: 3_000_000 },
  ],
};

// =============================================================================
// SHOP / MARKETPLACE CONFIGURATION
// =============================================================================

export const SHOP_CONFIG = {
  enabled: true,
  acceptedCoins: ['SKY4444', 'SHADOW', 'TRUMP', 'DOGE', 'BTC', 'XMR', 'USDT'],
  platformFeePercent: 2.5,
  charityFeePercent: 1.0,
  burnFeePercent: 0.5,
  escrowEnabled: true,
  disputeResolutionDays: 7,
};

// =============================================================================
// FUNDING / INVEST CONFIGURATION
// =============================================================================

export const FUNDING_CONFIG = {
  enabled: true,
  minInvestment: 10, // USD
  maxInvestment: 1_000_000, // USD
  acceptedPayments: ['stripe', 'crypto', 'wire'],
  kycRequired: true,
  kycThreshold: 10000, // USD - KYC required above this
  accreditedInvestorThreshold: 100000,
};

export default {
  SUPPORTED_COINS,
  MINING_CONFIGS,
  STAKING_POOLS,
  ICO_CONFIG,
  TRADING_PAIRS,
  TRADING_FEES,
  SWAP_CONFIG,
  SHOP_CONFIG,
  FUNDING_CONFIG,
};
