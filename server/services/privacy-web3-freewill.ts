/**
 * Privacy Monetization Web3 + Free Will Enhancement Mode
 * Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
 * 
 * Privacy Monetization: Users own their data, sell it on their terms, Web3 data vaults
 * Free Will Mode: Beginner enhancement, auto-upgrade, AI-guided learning, unhinged creativity
 */

// =============================================================================
// PRIVACY MONETIZATION - WEB3 DATA OWNERSHIP
// =============================================================================

export interface DataVault {
  id: string;
  userId: string;
  encryptionKey: string;
  storageUsed: number;
  maxStorage: number;
  dataCategories: DataCategory[];
  monetizationEnabled: boolean;
  totalEarned: number;
  earnedCoin: string;
  accessLog: DataAccessLog[];
  createdAt: Date;
}

export interface DataCategory {
  id: string;
  name: string;
  type: 'browsing' | 'trading' | 'social' | 'location' | 'preferences' | 'health' | 'financial' | 'content' | 'behavioral';
  dataPoints: number;
  isShared: boolean;
  sharePrice: number;
  coinSymbol: string;
  buyers: number;
  description: string;
}

export interface DataAccessLog {
  id: string;
  requesterId: string;
  requesterName: string;
  categoryId: string;
  approved: boolean;
  pricePaid: number;
  coinSymbol: string;
  timestamp: Date;
}

export interface DataMarketListing {
  id: string;
  sellerId: string;
  categoryType: string;
  dataPoints: number;
  price: number;
  coinSymbol: string;
  anonymized: boolean;
  description: string;
  buyers: number;
  rating: number;
  createdAt: Date;
}

export interface Web3Identity {
  userId: string;
  did: string; // Decentralized Identifier
  verifiableCredentials: VerifiableCredential[];
  dataVaultAddress: string;
  reputationScore: number;
  attestations: Attestation[];
  recoveryContacts: string[];
  socialRecoveryEnabled: boolean;
}

export interface VerifiableCredential {
  id: string;
  type: string;
  issuer: string;
  issuanceDate: Date;
  expirationDate?: Date;
  claims: Record<string, any>;
  proof: string;
}

export interface Attestation {
  id: string;
  type: 'identity' | 'skill' | 'reputation' | 'membership' | 'achievement';
  issuer: string;
  claim: string;
  verified: boolean;
  timestamp: Date;
}

// =============================================================================
// FREE WILL ENHANCEMENT MODE
// =============================================================================

export interface FreeWillProfile {
  userId: string;
  mode: 'beginner' | 'intermediate' | 'advanced' | 'expert' | 'unhinged' | 'creative' | 'zen';
  autoUpgrade: boolean;
  currentLevel: number;
  xpToNextLevel: number;
  totalXP: number;
  skills: SkillTree;
  achievements: Achievement[];
  dailyChallenges: DailyChallenge[];
  learningPath: LearningModule[];
  creativityScore: number;
  autonomyLevel: number;
  enhancementsActive: Enhancement[];
}

export interface SkillTree {
  trading: { level: number; xp: number; unlocked: string[] };
  mining: { level: number; xp: number; unlocked: string[] };
  security: { level: number; xp: number; unlocked: string[] };
  social: { level: number; xp: number; unlocked: string[] };
  development: { level: number; xp: number; unlocked: string[] };
  creativity: { level: number; xp: number; unlocked: string[] };
  privacy: { level: number; xp: number; unlocked: string[] };
  charity: { level: number; xp: number; unlocked: string[] };
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  xpReward: number;
  tokenReward: number;
  coinSymbol: string;
  unlockedAt: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
}

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  type: 'trading' | 'social' | 'mining' | 'learning' | 'creative' | 'charity';
  difficulty: 'easy' | 'medium' | 'hard';
  xpReward: number;
  tokenReward: number;
  coinSymbol: string;
  progress: number;
  target: number;
  completed: boolean;
  expiresAt: Date;
}

export interface LearningModule {
  id: string;
  title: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  lessons: Lesson[];
  completedLessons: number;
  totalLessons: number;
  xpReward: number;
  certificateNFT?: string;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'video' | 'interactive' | 'quiz' | 'practice';
  duration: number;
  completed: boolean;
}

export interface Enhancement {
  id: string;
  name: string;
  type: 'ai_assist' | 'auto_trade' | 'smart_alerts' | 'pattern_recognition' | 'risk_management' | 'social_boost' | 'mining_optimizer' | 'privacy_shield';
  isActive: boolean;
  level: number;
  description: string;
  requirements: { skill: string; level: number }[];
}

// =============================================================================
// PRIVACY MONETIZATION ENGINE
// =============================================================================

class PrivacyMonetizationEngine {
  private vaults: Map<string, DataVault> = new Map();
  private listings: DataMarketListing[] = [];
  private identities: Map<string, Web3Identity> = new Map();

  createVault(userId: string): DataVault {
    const vault: DataVault = {
      id: `vault_${userId}`,
      userId,
      encryptionKey: `aes256_${Math.random().toString(36).substr(2, 32)}`,
      storageUsed: 0,
      maxStorage: 10737418240, // 10GB
      dataCategories: this.getDefaultCategories(),
      monetizationEnabled: false,
      totalEarned: 0,
      earnedCoin: 'SKY4444',
      accessLog: [],
      createdAt: new Date(),
    };

    this.vaults.set(userId, vault);
    return vault;
  }

  private getDefaultCategories(): DataCategory[] {
    return [
      { id: 'cat_browsing', name: 'Browsing History', type: 'browsing', dataPoints: 0, isShared: false, sharePrice: 50, coinSymbol: 'SKY4444', buyers: 0, description: 'Your anonymized browsing patterns and interests' },
      { id: 'cat_trading', name: 'Trading Patterns', type: 'trading', dataPoints: 0, isShared: false, sharePrice: 200, coinSymbol: 'SKY4444', buyers: 0, description: 'Anonymized trading behavior and strategy patterns' },
      { id: 'cat_social', name: 'Social Graph', type: 'social', dataPoints: 0, isShared: false, sharePrice: 100, coinSymbol: 'SKY4444', buyers: 0, description: 'Anonymized social connections and interaction patterns' },
      { id: 'cat_preferences', name: 'Preferences', type: 'preferences', dataPoints: 0, isShared: false, sharePrice: 75, coinSymbol: 'SKY4444', buyers: 0, description: 'Content preferences, interests, and behavioral signals' },
      { id: 'cat_behavioral', name: 'Behavioral Data', type: 'behavioral', dataPoints: 0, isShared: false, sharePrice: 150, coinSymbol: 'SKY4444', buyers: 0, description: 'App usage patterns, session data, engagement metrics' },
    ];
  }

  getVault(userId: string): DataVault | null {
    return this.vaults.get(userId) || null;
  }

  enableMonetization(userId: string, categories: string[]): DataVault {
    const vault = this.vaults.get(userId);
    if (!vault) throw new Error('Vault not found');
    vault.monetizationEnabled = true;
    for (const cat of vault.dataCategories) {
      if (categories.includes(cat.id)) cat.isShared = true;
    }
    return vault;
  }

  disableMonetization(userId: string): DataVault {
    const vault = this.vaults.get(userId);
    if (!vault) throw new Error('Vault not found');
    vault.monetizationEnabled = false;
    for (const cat of vault.dataCategories) cat.isShared = false;
    return vault;
  }

  setCategoryPrice(userId: string, categoryId: string, price: number): void {
    const vault = this.vaults.get(userId);
    if (!vault) throw new Error('Vault not found');
    const cat = vault.dataCategories.find(c => c.id === categoryId);
    if (cat) cat.sharePrice = price;
  }

  // Request to buy someone's data
  requestDataAccess(buyerId: string, sellerId: string, categoryId: string): DataAccessLog {
    const vault = this.vaults.get(sellerId);
    if (!vault) throw new Error('Vault not found');
    if (!vault.monetizationEnabled) throw new Error('Monetization not enabled');

    const category = vault.dataCategories.find(c => c.id === categoryId);
    if (!category || !category.isShared) throw new Error('Category not available');

    const log: DataAccessLog = {
      id: `access_${Date.now()}`,
      requesterId: buyerId,
      requesterName: buyerId,
      categoryId,
      approved: true, // Auto-approve if shared
      pricePaid: category.sharePrice,
      coinSymbol: category.coinSymbol,
      timestamp: new Date(),
    };

    vault.accessLog.push(log);
    vault.totalEarned += category.sharePrice;
    category.buyers++;

    return log;
  }

  // List data on marketplace
  listOnMarketplace(userId: string, categoryType: string, price: number, description: string): DataMarketListing {
    const listing: DataMarketListing = {
      id: `listing_${Date.now()}_${userId}`,
      sellerId: userId,
      categoryType,
      dataPoints: Math.floor(Math.random() * 10000) + 100,
      price,
      coinSymbol: 'SKY4444',
      anonymized: true,
      description,
      buyers: 0,
      rating: 0,
      createdAt: new Date(),
    };

    this.listings.push(listing);
    return listing;
  }

  getMarketplace(category?: string): DataMarketListing[] {
    let items = [...this.listings];
    if (category) items = items.filter(l => l.categoryType === category);
    return items.sort((a, b) => b.buyers - a.buyers);
  }

  // Web3 Identity
  createIdentity(userId: string): Web3Identity {
    const identity: Web3Identity = {
      userId,
      did: `did:sky4444:${Math.random().toString(36).substr(2, 32)}`,
      verifiableCredentials: [],
      dataVaultAddress: `0x${Math.random().toString(16).substr(2, 40)}`,
      reputationScore: 100,
      attestations: [],
      recoveryContacts: [],
      socialRecoveryEnabled: false,
    };

    this.identities.set(userId, identity);
    return identity;
  }

  getIdentity(userId: string): Web3Identity | null {
    return this.identities.get(userId) || null;
  }

  addCredential(userId: string, type: string, issuer: string, claims: Record<string, any>): VerifiableCredential {
    const identity = this.identities.get(userId);
    if (!identity) throw new Error('Identity not found');

    const credential: VerifiableCredential = {
      id: `vc_${Date.now()}`,
      type,
      issuer,
      issuanceDate: new Date(),
      claims,
      proof: `ed25519_${Math.random().toString(36).substr(2, 64)}`,
    };

    identity.verifiableCredentials.push(credential);
    return credential;
  }

  addAttestation(userId: string, type: Attestation['type'], issuer: string, claim: string): Attestation {
    const identity = this.identities.get(userId);
    if (!identity) throw new Error('Identity not found');

    const attestation: Attestation = {
      id: `att_${Date.now()}`,
      type,
      issuer,
      claim,
      verified: true,
      timestamp: new Date(),
    };

    identity.attestations.push(attestation);
    identity.reputationScore += 5;
    return attestation;
  }

  getEarningsReport(userId: string): { totalEarned: number; byCategory: Record<string, number>; accessCount: number } {
    const vault = this.vaults.get(userId);
    if (!vault) return { totalEarned: 0, byCategory: {}, accessCount: 0 };

    const byCategory: Record<string, number> = {};
    for (const log of vault.accessLog) {
      if (!byCategory[log.categoryId]) byCategory[log.categoryId] = 0;
      byCategory[log.categoryId] += log.pricePaid;
    }

    return { totalEarned: vault.totalEarned, byCategory, accessCount: vault.accessLog.length };
  }
}

// =============================================================================
// FREE WILL ENHANCEMENT ENGINE
// =============================================================================

class FreeWillEngine {
  private profiles: Map<string, FreeWillProfile> = new Map();
  private allAchievements: Achievement[] = [];
  private allEnhancements: Enhancement[] = [];

  constructor() {
    this.initializeAchievements();
    this.initializeEnhancements();
  }

  private initializeAchievements(): void {
    this.allAchievements = [
      { id: 'ach_first_trade', name: 'First Trade', description: 'Complete your first trade', category: 'trading', icon: '📈', xpReward: 100, tokenReward: 50, coinSymbol: 'SKY4444', unlockedAt: new Date(), rarity: 'common' },
      { id: 'ach_10_trades', name: 'Active Trader', description: 'Complete 10 trades', category: 'trading', icon: '💹', xpReward: 500, tokenReward: 200, coinSymbol: 'SKY4444', unlockedAt: new Date(), rarity: 'rare' },
      { id: 'ach_first_mine', name: 'Miner Born', description: 'Mine your first block', category: 'mining', icon: '⛏️', xpReward: 150, tokenReward: 100, coinSymbol: 'SKY4444', unlockedAt: new Date(), rarity: 'common' },
      { id: 'ach_privacy_max', name: 'Ghost Protocol', description: 'Reach 100% privacy score', category: 'security', icon: '👻', xpReward: 1000, tokenReward: 500, coinSymbol: 'SHADOW', unlockedAt: new Date(), rarity: 'legendary' },
      { id: 'ach_charity_hero', name: 'Charity Hero', description: 'Donate to 5 different charities', category: 'charity', icon: '❤️', xpReward: 750, tokenReward: 300, coinSymbol: 'SKY4444', unlockedAt: new Date(), rarity: 'epic' },
      { id: 'ach_social_butterfly', name: 'Social Butterfly', description: 'Get 100 followers', category: 'social', icon: '🦋', xpReward: 500, tokenReward: 250, coinSymbol: 'SKY4444', unlockedAt: new Date(), rarity: 'rare' },
      { id: 'ach_puzzle_master', name: 'Puzzle Master', description: 'Solve 10 hacker puzzles', category: 'development', icon: '🧩', xpReward: 2000, tokenReward: 1000, coinSymbol: 'SKY4444', unlockedAt: new Date(), rarity: 'mythic' },
      { id: 'ach_unhinged', name: 'Unhinged Unlocked', description: 'Activate unhinged mode for the first time', category: 'creativity', icon: '🔥', xpReward: 200, tokenReward: 100, coinSymbol: 'SKY4444', unlockedAt: new Date(), rarity: 'rare' },
      { id: 'ach_data_mogul', name: 'Data Mogul', description: 'Earn 10,000 tokens from data monetization', category: 'privacy', icon: '💎', xpReward: 3000, tokenReward: 2000, coinSymbol: 'SKY4444', unlockedAt: new Date(), rarity: 'mythic' },
      { id: 'ach_zen_master', name: 'Zen Master', description: 'Complete all learning modules', category: 'development', icon: '🧘', xpReward: 5000, tokenReward: 3000, coinSymbol: 'SKY4444', unlockedAt: new Date(), rarity: 'mythic' },
    ];
  }

  private initializeEnhancements(): void {
    this.allEnhancements = [
      { id: 'enh_ai_assist', name: 'AI Trading Assistant', type: 'ai_assist', isActive: false, level: 1, description: 'Hope AI provides real-time trading suggestions', requirements: [{ skill: 'trading', level: 3 }] },
      { id: 'enh_auto_trade', name: 'Auto-Trade Bot', type: 'auto_trade', isActive: false, level: 1, description: 'Automated trading based on your strategies', requirements: [{ skill: 'trading', level: 5 }] },
      { id: 'enh_smart_alerts', name: 'Smart Alerts', type: 'smart_alerts', isActive: false, level: 1, description: 'AI-powered price and event alerts', requirements: [{ skill: 'trading', level: 2 }] },
      { id: 'enh_pattern', name: 'Pattern Recognition', type: 'pattern_recognition', isActive: false, level: 1, description: 'AI detects chart patterns and trends', requirements: [{ skill: 'trading', level: 4 }] },
      { id: 'enh_risk', name: 'Risk Manager', type: 'risk_management', isActive: false, level: 1, description: 'Automatic position sizing and stop-losses', requirements: [{ skill: 'trading', level: 3 }] },
      { id: 'enh_social', name: 'Social Boost', type: 'social_boost', isActive: false, level: 1, description: 'AI helps grow your following and engagement', requirements: [{ skill: 'social', level: 3 }] },
      { id: 'enh_mining', name: 'Mining Optimizer', type: 'mining_optimizer', isActive: false, level: 1, description: 'AI optimizes mining allocation across coins', requirements: [{ skill: 'mining', level: 3 }] },
      { id: 'enh_privacy', name: 'Privacy Shield', type: 'privacy_shield', isActive: false, level: 1, description: 'AI manages your privacy settings automatically', requirements: [{ skill: 'privacy', level: 2 }] },
    ];
  }

  createProfile(userId: string, mode: FreeWillProfile['mode'] = 'beginner'): FreeWillProfile {
    const profile: FreeWillProfile = {
      userId,
      mode,
      autoUpgrade: true,
      currentLevel: 1,
      xpToNextLevel: 1000,
      totalXP: 0,
      skills: {
        trading: { level: 1, xp: 0, unlocked: [] },
        mining: { level: 1, xp: 0, unlocked: [] },
        security: { level: 1, xp: 0, unlocked: [] },
        social: { level: 1, xp: 0, unlocked: [] },
        development: { level: 1, xp: 0, unlocked: [] },
        creativity: { level: 1, xp: 0, unlocked: [] },
        privacy: { level: 1, xp: 0, unlocked: [] },
        charity: { level: 1, xp: 0, unlocked: [] },
      },
      achievements: [],
      dailyChallenges: this.generateDailyChallenges(),
      learningPath: this.generateLearningPath(mode),
      creativityScore: 50,
      autonomyLevel: mode === 'unhinged' ? 100 : mode === 'expert' ? 80 : mode === 'advanced' ? 60 : mode === 'intermediate' ? 40 : 20,
      enhancementsActive: [],
    };

    this.profiles.set(userId, profile);
    return profile;
  }

  getProfile(userId: string): FreeWillProfile | null {
    return this.profiles.get(userId) || null;
  }

  // Add XP and check for level ups
  addXP(userId: string, skill: keyof SkillTree, amount: number): { leveledUp: boolean; newLevel: number; achievementsUnlocked: Achievement[] } {
    const profile = this.profiles.get(userId);
    if (!profile) throw new Error('Profile not found');

    profile.totalXP += amount;
    profile.skills[skill].xp += amount;

    // Check skill level up
    const skillXPPerLevel = 500;
    const newSkillLevel = Math.floor(profile.skills[skill].xp / skillXPPerLevel) + 1;
    const skillLeveledUp = newSkillLevel > profile.skills[skill].level;
    profile.skills[skill].level = newSkillLevel;

    // Check overall level up
    const newLevel = Math.floor(profile.totalXP / profile.xpToNextLevel) + 1;
    const leveledUp = newLevel > profile.currentLevel;
    profile.currentLevel = newLevel;
    profile.xpToNextLevel = newLevel * 1000;

    // Auto-upgrade mode
    if (profile.autoUpgrade) {
      if (profile.currentLevel >= 20 && profile.mode === 'beginner') profile.mode = 'intermediate';
      if (profile.currentLevel >= 40 && profile.mode === 'intermediate') profile.mode = 'advanced';
      if (profile.currentLevel >= 60 && profile.mode === 'advanced') profile.mode = 'expert';
    }

    // Check achievements
    const achievementsUnlocked: Achievement[] = [];
    // (simplified - in production would check specific conditions)

    return { leveledUp: leveledUp || skillLeveledUp, newLevel: profile.currentLevel, achievementsUnlocked };
  }

  // Set mode
  setMode(userId: string, mode: FreeWillProfile['mode']): FreeWillProfile {
    const profile = this.profiles.get(userId);
    if (!profile) throw new Error('Profile not found');
    profile.mode = mode;
    profile.autonomyLevel = mode === 'unhinged' ? 100 : mode === 'creative' ? 90 : mode === 'expert' ? 80 : mode === 'zen' ? 70 : mode === 'advanced' ? 60 : mode === 'intermediate' ? 40 : 20;
    return profile;
  }

  // Activate enhancement
  activateEnhancement(userId: string, enhancementId: string): Enhancement {
    const profile = this.profiles.get(userId);
    if (!profile) throw new Error('Profile not found');

    const enhancement = this.allEnhancements.find(e => e.id === enhancementId);
    if (!enhancement) throw new Error('Enhancement not found');

    // Check requirements
    for (const req of enhancement.requirements) {
      const skill = profile.skills[req.skill as keyof SkillTree];
      if (!skill || skill.level < req.level) {
        throw new Error(`Requires ${req.skill} level ${req.level}`);
      }
    }

    const active = { ...enhancement, isActive: true };
    profile.enhancementsActive.push(active);
    return active;
  }

  // Complete daily challenge
  completeChallenge(userId: string, challengeId: string): { xpEarned: number; tokensEarned: number } {
    const profile = this.profiles.get(userId);
    if (!profile) throw new Error('Profile not found');

    const challenge = profile.dailyChallenges.find(c => c.id === challengeId);
    if (!challenge) throw new Error('Challenge not found');
    if (challenge.completed) throw new Error('Already completed');

    challenge.completed = true;
    challenge.progress = challenge.target;

    this.addXP(userId, challenge.type as keyof SkillTree, challenge.xpReward);

    return { xpEarned: challenge.xpReward, tokensEarned: challenge.tokenReward };
  }

  private generateDailyChallenges(): DailyChallenge[] {
    return [
      { id: `dc_${Date.now()}_1`, title: 'Make 3 Trades', description: 'Execute 3 trades on any pair', type: 'trading', difficulty: 'easy', xpReward: 100, tokenReward: 25, coinSymbol: 'SKY4444', progress: 0, target: 3, completed: false, expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) },
      { id: `dc_${Date.now()}_2`, title: 'Mine for 1 Hour', description: 'Keep mining active for 1 hour', type: 'mining', difficulty: 'easy', xpReward: 75, tokenReward: 20, coinSymbol: 'SKY4444', progress: 0, target: 60, completed: false, expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) },
      { id: `dc_${Date.now()}_3`, title: 'Tip 3 Users', description: 'Send tips to 3 different users', type: 'social', difficulty: 'easy', xpReward: 50, tokenReward: 15, coinSymbol: 'SKY4444', progress: 0, target: 3, completed: false, expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) },
      { id: `dc_${Date.now()}_4`, title: 'Complete a Lesson', description: 'Finish any learning module lesson', type: 'learning', difficulty: 'easy', xpReward: 150, tokenReward: 50, coinSymbol: 'SKY4444', progress: 0, target: 1, completed: false, expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) },
      { id: `dc_${Date.now()}_5`, title: 'Donate to Charity', description: 'Make any donation to a verified charity', type: 'charity', difficulty: 'medium', xpReward: 200, tokenReward: 100, coinSymbol: 'SKY4444', progress: 0, target: 1, completed: false, expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) },
    ];
  }

  private generateLearningPath(mode: string): LearningModule[] {
    return [
      { id: 'learn_crypto_101', title: 'Crypto 101', category: 'trading', difficulty: 'beginner', lessons: [
        { id: 'l1', title: 'What is Cryptocurrency?', content: 'Introduction to digital currencies...', type: 'text', duration: 10, completed: false },
        { id: 'l2', title: 'How Blockchain Works', content: 'Distributed ledger technology...', type: 'video', duration: 15, completed: false },
        { id: 'l3', title: 'Your First Trade', content: 'Step by step guide...', type: 'interactive', duration: 20, completed: false },
        { id: 'l4', title: 'Quiz: Crypto Basics', content: '', type: 'quiz', duration: 5, completed: false },
      ], completedLessons: 0, totalLessons: 4, xpReward: 500 },
      { id: 'learn_security_101', title: 'Security Fundamentals', category: 'security', difficulty: 'beginner', lessons: [
        { id: 'l5', title: 'Protecting Your Wallet', content: 'Security best practices...', type: 'text', duration: 10, completed: false },
        { id: 'l6', title: 'Understanding Encryption', content: 'How encryption protects you...', type: 'video', duration: 12, completed: false },
        { id: 'l7', title: 'Setting Up 2FA', content: 'Two-factor authentication...', type: 'interactive', duration: 8, completed: false },
      ], completedLessons: 0, totalLessons: 3, xpReward: 400 },
      { id: 'learn_trading_201', title: 'Advanced Trading', category: 'trading', difficulty: 'intermediate', lessons: [
        { id: 'l8', title: 'Technical Analysis', content: 'Chart patterns and indicators...', type: 'text', duration: 20, completed: false },
        { id: 'l9', title: 'Risk Management', content: 'Position sizing and stop losses...', type: 'video', duration: 15, completed: false },
        { id: 'l10', title: 'Practice Trading', content: 'Paper trading simulation...', type: 'practice', duration: 30, completed: false },
      ], completedLessons: 0, totalLessons: 3, xpReward: 750 },
      { id: 'learn_privacy_201', title: 'Privacy Mastery', category: 'privacy', difficulty: 'intermediate', lessons: [
        { id: 'l11', title: 'Tor and I2P', content: 'Anonymous routing networks...', type: 'text', duration: 15, completed: false },
        { id: 'l12', title: 'Data Ownership', content: 'Web3 identity and data vaults...', type: 'video', duration: 12, completed: false },
        { id: 'l13', title: 'Anti-Surveillance', content: 'Protecting against tracking...', type: 'interactive', duration: 20, completed: false },
      ], completedLessons: 0, totalLessons: 3, xpReward: 600 },
      { id: 'learn_mining_101', title: 'Mining Academy', category: 'mining', difficulty: 'beginner', lessons: [
        { id: 'l14', title: 'How Mining Works', content: 'Proof of work explained...', type: 'text', duration: 10, completed: false },
        { id: 'l15', title: 'Choosing What to Mine', content: 'Profitability analysis...', type: 'video', duration: 12, completed: false },
        { id: 'l16', title: 'Start Mining', content: 'Hands-on mining setup...', type: 'practice', duration: 15, completed: false },
      ], completedLessons: 0, totalLessons: 3, xpReward: 450 },
    ];
  }

  getAvailableEnhancements(userId: string): Enhancement[] {
    const profile = this.profiles.get(userId);
    if (!profile) return [];
    return this.allEnhancements.filter(e => {
      return e.requirements.every(req => {
        const skill = profile.skills[req.skill as keyof SkillTree];
        return skill && skill.level >= req.level;
      });
    });
  }

  getAllAchievements(): Achievement[] {
    return this.allAchievements;
  }

  getLeaderboard(): Array<{ userId: string; level: number; totalXP: number; mode: string }> {
    return Array.from(this.profiles.values())
      .map(p => ({ userId: p.userId, level: p.currentLevel, totalXP: p.totalXP, mode: p.mode }))
      .sort((a, b) => b.totalXP - a.totalXP)
      .slice(0, 50);
  }
}

// =============================================================================
// SINGLETON INSTANCES
// =============================================================================

export const privacyMonetization = new PrivacyMonetizationEngine();
export const freeWillEngine = new FreeWillEngine();

export default {
  privacyMonetization,
  freeWillEngine,
};
