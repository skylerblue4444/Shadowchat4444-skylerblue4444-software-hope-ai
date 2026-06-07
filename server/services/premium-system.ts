/**
 * Premium System - Monetization, Starting Balances, Mini Apps, YouTube, Algorithms
 * Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
 * 
 * Features: Premium tiers, 10K starting balances, mini app framework,
 * YouTube integration, algorithm engines, profile system
 */

export interface PremiumTier {
  id: string;
  name: string;
  price: number;
  priceCoin: string;
  features: string[];
  limits: TierLimits;
  badge: string;
  color: string;
}

export interface TierLimits {
  dailyTrades: number;
  maxStakeAmount: number;
  miningSlots: number;
  storageGB: number;
  apiCallsPerDay: number;
  withdrawalLimit: number;
  casinoBetMax: number;
  nsfwAccess: boolean;
  tradeRoomAccess: boolean;
  voiceCallMinutes: number;
  customAvatar: boolean;
  prioritySupport: boolean;
}

export interface UserOnboarding {
  userId: string;
  startingBalances: Record<string, number>;
  tier: string;
  referralCode?: string;
  referredBy?: string;
  bonusApplied: boolean;
  completedSteps: string[];
  createdAt: Date;
}

export interface MiniApp {
  id: string;
  name: string;
  description: string;
  category: 'trading' | 'social' | 'gaming' | 'utility' | 'education' | 'entertainment';
  icon: string;
  route: string;
  isPremium: boolean;
  isActive: boolean;
  usageCount: number;
  rating: number;
  developer: string;
}

export interface YouTubeIntegration {
  channelId: string;
  channelName: string;
  subscribers: number;
  videos: YouTubeVideo[];
  puzzleVideos: YouTubeVideo[];
  liveStreams: YouTubeVideo[];
  monetization: YouTubeMonetization;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  duration: number;
  views: number;
  likes: number;
  type: 'tutorial' | 'puzzle' | 'live' | 'review' | 'news' | 'entertainment';
  cryptoReward?: number;
  cryptoCoin?: string;
  puzzleAnswer?: string;
  publishedAt: Date;
}

export interface YouTubeMonetization {
  adRevenue: number;
  cryptoTips: number;
  sponsorships: number;
  puzzleRewards: number;
  totalEarned: number;
}

export interface AlgorithmEngine {
  id: string;
  name: string;
  type: 'trading' | 'mining' | 'prediction' | 'social' | 'content' | 'matching';
  description: string;
  accuracy: number;
  isActive: boolean;
  parameters: Record<string, any>;
  lastRun: Date;
  results: any[];
}

export interface UserProfileFull {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  banner: string;
  bio: string;
  tier: string;
  badges: string[];
  level: number;
  xp: number;
  reputation: number;
  joinDate: Date;
  lastActive: Date;
  stats: ProfileStats;
  social: SocialLinks;
  preferences: UserPreferences;
}

export interface ProfileStats {
  totalTrades: number;
  winRate: number;
  totalEarned: number;
  totalMined: number;
  totalStaked: number;
  puzzlesSolved: number;
  casinoWinnings: number;
  tipsGiven: number;
  tipsReceived: number;
  followersCount: number;
  followingCount: number;
  postsCount: number;
}

export interface SocialLinks {
  reddit?: string;
  twitter?: string;
  discord?: string;
  telegram?: string;
  youtube?: string;
  website?: string;
}

export interface UserPreferences {
  theme: 'dark' | 'light' | 'auto' | 'cyberpunk' | 'neon';
  language: string;
  currency: string;
  notifications: NotificationPrefs;
  privacy: PrivacyPrefs;
}

export interface NotificationPrefs {
  priceAlerts: boolean;
  tradeExecuted: boolean;
  tipReceived: boolean;
  messageReceived: boolean;
  miningReward: boolean;
  stakingReward: boolean;
  newFollower: boolean;
  casinoWin: boolean;
}

export interface PrivacyPrefs {
  showBalance: boolean;
  showTrades: boolean;
  showOnline: boolean;
  allowDMs: boolean;
  allowCalls: boolean;
  showInSearch: boolean;
}

// =============================================================================
// PREMIUM TIERS
// =============================================================================

export const PREMIUM_TIERS: PremiumTier[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    priceCoin: 'SKY4444',
    features: ['Basic trading', '1 mining slot', 'Community access', '10K starting balance'],
    limits: { dailyTrades: 10, maxStakeAmount: 10000, miningSlots: 1, storageGB: 1, apiCallsPerDay: 100, withdrawalLimit: 1000, casinoBetMax: 100, nsfwAccess: false, tradeRoomAccess: false, voiceCallMinutes: 10, customAvatar: false, prioritySupport: false },
    badge: '🆓',
    color: '#6b7280',
  },
  {
    id: 'silver',
    name: 'Silver',
    price: 1000,
    priceCoin: 'SKY4444',
    features: ['50 daily trades', '3 mining slots', 'Trade room access', 'Custom avatar', '25K bonus balance'],
    limits: { dailyTrades: 50, maxStakeAmount: 100000, miningSlots: 3, storageGB: 5, apiCallsPerDay: 1000, withdrawalLimit: 10000, casinoBetMax: 1000, nsfwAccess: false, tradeRoomAccess: true, voiceCallMinutes: 60, customAvatar: true, prioritySupport: false },
    badge: '🥈',
    color: '#9ca3af',
  },
  {
    id: 'gold',
    name: 'Gold',
    price: 5000,
    priceCoin: 'SKY4444',
    features: ['Unlimited trades', '5 mining slots', 'NSFW access', 'Priority support', '50K bonus balance'],
    limits: { dailyTrades: -1, maxStakeAmount: 1000000, miningSlots: 5, storageGB: 25, apiCallsPerDay: 10000, withdrawalLimit: 100000, casinoBetMax: 10000, nsfwAccess: true, tradeRoomAccess: true, voiceCallMinutes: 300, customAvatar: true, prioritySupport: true },
    badge: '🥇',
    color: '#f59e0b',
  },
  {
    id: 'diamond',
    name: 'Diamond',
    price: 25000,
    priceCoin: 'SKY4444',
    features: ['Everything unlimited', '10 mining slots', 'VIP trade room', 'Direct admin access', '100K bonus balance'],
    limits: { dailyTrades: -1, maxStakeAmount: -1, miningSlots: 10, storageGB: 100, apiCallsPerDay: -1, withdrawalLimit: -1, casinoBetMax: 100000, nsfwAccess: true, tradeRoomAccess: true, voiceCallMinutes: -1, customAvatar: true, prioritySupport: true },
    badge: '💎',
    color: '#3b82f6',
  },
  {
    id: 'whale',
    name: 'Whale',
    price: 100000,
    priceCoin: 'SKY4444',
    features: ['God mode', 'Unlimited everything', 'Revenue sharing', 'Governance voting', '500K bonus balance'],
    limits: { dailyTrades: -1, maxStakeAmount: -1, miningSlots: -1, storageGB: -1, apiCallsPerDay: -1, withdrawalLimit: -1, casinoBetMax: -1, nsfwAccess: true, tradeRoomAccess: true, voiceCallMinutes: -1, customAvatar: true, prioritySupport: true },
    badge: '🐋',
    color: '#8b5cf6',
  },
];

// =============================================================================
// STARTING BALANCES (Everyone gets 10K Shadow + 10K SKY4444)
// =============================================================================

export const STARTING_BALANCES: Record<string, number> = {
  SKY4444: 10000,
  SHADOW: 10000,
  DOGE: 100,
  USDT: 10,
};

// =============================================================================
// MINI APPS
// =============================================================================

export const MINI_APPS: MiniApp[] = [
  { id: 'price_tracker', name: 'Price Tracker', description: 'Real-time price alerts and charts', category: 'trading', icon: '📈', route: '/apps/price-tracker', isPremium: false, isActive: true, usageCount: 0, rating: 4.8, developer: 'SKY4444 Team' },
  { id: 'portfolio_analyzer', name: 'Portfolio Analyzer', description: 'AI-powered portfolio analysis', category: 'trading', icon: '🧠', route: '/apps/portfolio-analyzer', isPremium: true, isActive: true, usageCount: 0, rating: 4.9, developer: 'SKY4444 Team' },
  { id: 'whale_watcher', name: 'Whale Watcher', description: 'Track large wallet movements', category: 'trading', icon: '🐋', route: '/apps/whale-watcher', isPremium: true, isActive: true, usageCount: 0, rating: 4.7, developer: 'SKY4444 Team' },
  { id: 'social_feed', name: 'Social Feed', description: 'Crypto social media aggregator', category: 'social', icon: '📱', route: '/apps/social-feed', isPremium: false, isActive: true, usageCount: 0, rating: 4.5, developer: 'SKY4444 Team' },
  { id: 'nft_gallery', name: 'NFT Gallery', description: 'Browse and trade NFTs', category: 'entertainment', icon: '🎨', route: '/apps/nft-gallery', isPremium: false, isActive: true, usageCount: 0, rating: 4.3, developer: 'SKY4444 Team' },
  { id: 'defi_dashboard', name: 'DeFi Dashboard', description: 'Track DeFi positions across chains', category: 'trading', icon: '🏦', route: '/apps/defi-dashboard', isPremium: true, isActive: true, usageCount: 0, rating: 4.6, developer: 'SKY4444 Team' },
  { id: 'crypto_news', name: 'Crypto News', description: 'Aggregated crypto news feed', category: 'utility', icon: '📰', route: '/apps/crypto-news', isPremium: false, isActive: true, usageCount: 0, rating: 4.4, developer: 'SKY4444 Team' },
  { id: 'trading_bot', name: 'Trading Bot', description: 'Automated trading strategies', category: 'trading', icon: '🤖', route: '/apps/trading-bot', isPremium: true, isActive: true, usageCount: 0, rating: 4.8, developer: 'SKY4444 Team' },
  { id: 'learn_crypto', name: 'Learn Crypto', description: 'Interactive crypto education', category: 'education', icon: '📚', route: '/apps/learn-crypto', isPremium: false, isActive: true, usageCount: 0, rating: 4.9, developer: 'SKY4444 Team' },
  { id: 'puzzle_arcade', name: 'Puzzle Arcade', description: 'Earn crypto by solving puzzles', category: 'gaming', icon: '🧩', route: '/apps/puzzle-arcade', isPremium: false, isActive: true, usageCount: 0, rating: 4.7, developer: 'SKY4444 Team' },
  { id: 'tip_jar', name: 'Tip Jar', description: 'Create shareable tip links', category: 'social', icon: '🫙', route: '/apps/tip-jar', isPremium: false, isActive: true, usageCount: 0, rating: 4.5, developer: 'SKY4444 Team' },
  { id: 'yield_farm', name: 'Yield Farm', description: 'Liquidity provision and farming', category: 'trading', icon: '🌾', route: '/apps/yield-farm', isPremium: true, isActive: true, usageCount: 0, rating: 4.6, developer: 'SKY4444 Team' },
  { id: 'charity_tracker', name: 'Charity Tracker', description: 'Track charitable donations impact', category: 'utility', icon: '❤️', route: '/apps/charity-tracker', isPremium: false, isActive: true, usageCount: 0, rating: 4.8, developer: 'SKY4444 Team' },
  { id: 'voice_assistant', name: 'Voice Assistant', description: 'Hope AI hands-free mode', category: 'utility', icon: '🎙️', route: '/apps/voice-assistant', isPremium: false, isActive: true, usageCount: 0, rating: 4.9, developer: 'SKY4444 Team' },
  { id: 'dark_market', name: 'Shadow Market', description: 'Anonymous P2P marketplace', category: 'trading', icon: '🌑', route: '/apps/dark-market', isPremium: true, isActive: true, usageCount: 0, rating: 4.4, developer: 'SKY4444 Team' },
];

// =============================================================================
// YOUTUBE PUZZLE INTEGRATION
// =============================================================================

export const YOUTUBE_CONFIG: YouTubeIntegration = {
  channelId: 'SKY4444_Official',
  channelName: 'SKY4444 Crypto',
  subscribers: 0,
  videos: [],
  puzzleVideos: [],
  liveStreams: [],
  monetization: { adRevenue: 0, cryptoTips: 0, sponsorships: 0, puzzleRewards: 0, totalEarned: 0 },
};

// =============================================================================
// ALGORITHM ENGINES
// =============================================================================

export const ALGORITHM_ENGINES: AlgorithmEngine[] = [
  { id: 'trend_detector', name: 'Trend Detector', type: 'trading', description: 'Identifies market trends using MA crossovers and momentum', accuracy: 0.72, isActive: true, parameters: { shortMA: 9, longMA: 21, rsiPeriod: 14 }, lastRun: new Date(), results: [] },
  { id: 'whale_tracker', name: 'Whale Tracker', type: 'prediction', description: 'Monitors large wallet movements and predicts impact', accuracy: 0.68, isActive: true, parameters: { minAmount: 100000, lookbackHours: 24 }, lastRun: new Date(), results: [] },
  { id: 'sentiment_analyzer', name: 'Sentiment Analyzer', type: 'social', description: 'Analyzes social media sentiment for trading signals', accuracy: 0.65, isActive: true, parameters: { sources: ['reddit', 'twitter', 'discord'], weight: 0.3 }, lastRun: new Date(), results: [] },
  { id: 'mining_optimizer', name: 'Mining Optimizer', type: 'mining', description: 'Optimizes mining difficulty and resource allocation', accuracy: 0.85, isActive: true, parameters: { targetBlockTime: 60, adjustmentInterval: 100 }, lastRun: new Date(), results: [] },
  { id: 'content_recommender', name: 'Content Recommender', type: 'content', description: 'Recommends posts, videos, and puzzles based on user behavior', accuracy: 0.78, isActive: true, parameters: { collaborative: true, contentBased: true }, lastRun: new Date(), results: [] },
  { id: 'risk_assessor', name: 'Risk Assessor', type: 'prediction', description: 'Assesses portfolio risk and suggests rebalancing', accuracy: 0.74, isActive: true, parameters: { maxDrawdown: 0.2, sharpeTarget: 1.5 }, lastRun: new Date(), results: [] },
  { id: 'price_predictor', name: 'Price Predictor', type: 'prediction', description: 'ML-based price prediction using historical data', accuracy: 0.61, isActive: true, parameters: { model: 'lstm', lookback: 30, features: ['price', 'volume', 'sentiment'] }, lastRun: new Date(), results: [] },
  { id: 'match_maker', name: 'Trade Match Maker', type: 'matching', description: 'Matches buy/sell orders for P2P trading', accuracy: 0.92, isActive: true, parameters: { maxSpread: 0.02, priorityWeight: 0.5 }, lastRun: new Date(), results: [] },
];

// =============================================================================
// PREMIUM ENGINE
// =============================================================================

class PremiumEngine {
  private userTiers: Map<string, string> = new Map();
  private onboardings: Map<string, UserOnboarding> = new Map();

  // Onboard new user with starting balances
  onboardUser(userId: string, referralCode?: string): UserOnboarding {
    const onboarding: UserOnboarding = {
      userId,
      startingBalances: { ...STARTING_BALANCES },
      tier: 'free',
      referralCode: this.generateReferralCode(userId),
      referredBy: referralCode,
      bonusApplied: true,
      completedSteps: [],
      createdAt: new Date(),
    };

    // Apply referral bonus
    if (referralCode) {
      onboarding.startingBalances.SKY4444 += 5000; // 5K bonus for referral
      onboarding.startingBalances.SHADOW += 5000;
    }

    this.onboardings.set(userId, onboarding);
    this.userTiers.set(userId, 'free');
    return onboarding;
  }

  // Upgrade user tier
  upgradeTier(userId: string, tierId: string): { success: boolean; tier: PremiumTier; bonusBalance: Record<string, number> } {
    const tier = PREMIUM_TIERS.find(t => t.id === tierId);
    if (!tier) throw new Error('Invalid tier');

    this.userTiers.set(userId, tierId);

    // Bonus balances per tier
    const bonuses: Record<string, Record<string, number>> = {
      silver: { SKY4444: 25000, SHADOW: 25000 },
      gold: { SKY4444: 50000, SHADOW: 50000, DOGE: 1000 },
      diamond: { SKY4444: 100000, SHADOW: 100000, DOGE: 5000, USDT: 100 },
      whale: { SKY4444: 500000, SHADOW: 500000, DOGE: 25000, USDT: 1000 },
    };

    return {
      success: true,
      tier,
      bonusBalance: bonuses[tierId] || {},
    };
  }

  getUserTier(userId: string): PremiumTier {
    const tierId = this.userTiers.get(userId) || 'free';
    return PREMIUM_TIERS.find(t => t.id === tierId) || PREMIUM_TIERS[0];
  }

  checkLimit(userId: string, limitType: keyof TierLimits): { allowed: boolean; limit: number; current?: number } {
    const tier = this.getUserTier(userId);
    const limit = tier.limits[limitType];
    if (typeof limit === 'boolean') return { allowed: limit as boolean, limit: limit ? 1 : 0 };
    if (limit === -1) return { allowed: true, limit: -1 }; // Unlimited
    return { allowed: true, limit: limit as number };
  }

  private generateReferralCode(userId: string): string {
    return `SKY4444_${userId.slice(0, 6).toUpperCase()}_${Date.now().toString(36).toUpperCase()}`;
  }

  // Get mini apps available for user's tier
  getAvailableApps(userId: string): MiniApp[] {
    const tier = this.getUserTier(userId);
    const isPremium = tier.id !== 'free';
    return MINI_APPS.filter(app => app.isActive && (!app.isPremium || isPremium));
  }

  getAllTiers(): PremiumTier[] {
    return PREMIUM_TIERS;
  }
}

// Singleton instance
export const premiumEngine = new PremiumEngine();

export default {
  premiumEngine,
  PREMIUM_TIERS,
  STARTING_BALANCES,
  MINI_APPS,
  YOUTUBE_CONFIG,
  ALGORITHM_ENGINES,
};
