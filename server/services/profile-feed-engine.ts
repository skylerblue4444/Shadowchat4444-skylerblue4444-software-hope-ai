/**
 * Profile, Feed, Seed & Live Engines - Backend Core
 * Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
 * 
 * Live always-on engines: Profile system, Social feed, Seed database,
 * Mining engine, Staking engine, Trading engine, Analytics
 */

// =============================================================================
// PROFILE ENGINE
// =============================================================================

export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  email: string;
  avatar: string;
  banner: string;
  bio: string;
  tier: 'free' | 'silver' | 'gold' | 'diamond' | 'whale';
  badges: string[];
  level: number;
  xp: number;
  reputation: number;
  isVerified: boolean;
  isCreator: boolean;
  isAdmin: boolean;
  joinDate: Date;
  lastActive: Date;
  balances: Record<string, number>;
  stats: UserStats;
  settings: UserSettings;
  social: SocialLinks;
}

export interface UserStats {
  totalTrades: number;
  winRate: number;
  pnl: number;
  totalMined: number;
  totalStaked: number;
  puzzlesSolved: number;
  casinoWinnings: number;
  tipsGiven: number;
  tipsReceived: number;
  followers: number;
  following: number;
  posts: number;
  referrals: number;
  daysActive: number;
}

export interface UserSettings {
  theme: 'dark' | 'light' | 'cyberpunk' | 'neon' | 'matrix';
  language: string;
  currency: string;
  hopeVoice: string;
  hopeOutfit: string;
  nsfwEnabled: boolean;
  notificationsEnabled: boolean;
  twoFactorEnabled: boolean;
  privacyMode: boolean;
}

export interface SocialLinks {
  reddit?: string;
  twitter?: string;
  discord?: string;
  telegram?: string;
  youtube?: string;
}

class ProfileEngine {
  private profiles: Map<string, UserProfile> = new Map();

  createProfile(userId: string, username: string, email: string, referralCode?: string): UserProfile {
    const profile: UserProfile = {
      id: userId,
      username,
      displayName: username,
      email,
      avatar: '/avatars/default.png',
      banner: '/banners/default.png',
      bio: '',
      tier: 'free',
      badges: ['early_adopter'],
      level: 1,
      xp: 0,
      reputation: 100,
      isVerified: false,
      isCreator: false,
      isAdmin: false,
      joinDate: new Date(),
      lastActive: new Date(),
      balances: { SKY4444: 10000, SHADOW: 10000, DOGE: 100, USDT: 10, BTC: 0, XMR: 0, TRUMP: 0 },
      stats: { totalTrades: 0, winRate: 0, pnl: 0, totalMined: 0, totalStaked: 0, puzzlesSolved: 0, casinoWinnings: 0, tipsGiven: 0, tipsReceived: 0, followers: 0, following: 0, posts: 0, referrals: 0, daysActive: 1 },
      settings: { theme: 'dark', language: 'en', currency: 'USD', hopeVoice: 'professional', hopeOutfit: 'professional', nsfwEnabled: false, notificationsEnabled: true, twoFactorEnabled: false, privacyMode: false },
      social: {},
    };

    if (referralCode) {
      profile.balances.SKY4444 += 5000;
      profile.balances.SHADOW += 5000;
      profile.badges.push('referred');
    }

    this.profiles.set(userId, profile);
    return profile;
  }

  getProfile(userId: string): UserProfile | null {
    return this.profiles.get(userId) || null;
  }

  updateProfile(userId: string, updates: Partial<UserProfile>): UserProfile {
    const profile = this.profiles.get(userId);
    if (!profile) throw new Error('Profile not found');
    Object.assign(profile, updates, { lastActive: new Date() });
    return profile;
  }

  updateBalance(userId: string, coin: string, amount: number): number {
    const profile = this.profiles.get(userId);
    if (!profile) throw new Error('Profile not found');
    if (!profile.balances[coin]) profile.balances[coin] = 0;
    profile.balances[coin] += amount;
    if (profile.balances[coin] < 0) throw new Error('Insufficient balance');
    return profile.balances[coin];
  }

  addXP(userId: string, amount: number): { level: number; xp: number; leveledUp: boolean } {
    const profile = this.profiles.get(userId);
    if (!profile) throw new Error('Profile not found');
    profile.xp += amount;
    const newLevel = Math.floor(profile.xp / 1000) + 1;
    const leveledUp = newLevel > profile.level;
    profile.level = newLevel;
    return { level: profile.level, xp: profile.xp, leveledUp };
  }

  follow(followerId: string, targetId: string): void {
    const follower = this.profiles.get(followerId);
    const target = this.profiles.get(targetId);
    if (follower) follower.stats.following++;
    if (target) target.stats.followers++;
  }

  getLeaderboard(sortBy: 'pnl' | 'level' | 'reputation' | 'followers' = 'level'): UserProfile[] {
    return Array.from(this.profiles.values())
      .sort((a, b) => {
        switch (sortBy) {
          case 'pnl': return b.stats.pnl - a.stats.pnl;
          case 'level': return b.level - a.level;
          case 'reputation': return b.reputation - a.reputation;
          case 'followers': return b.stats.followers - a.stats.followers;
          default: return 0;
        }
      })
      .slice(0, 100);
  }

  searchUsers(query: string): UserProfile[] {
    const lower = query.toLowerCase();
    return Array.from(this.profiles.values())
      .filter(p => p.username.toLowerCase().includes(lower) || p.displayName.toLowerCase().includes(lower))
      .slice(0, 20);
  }
}

// =============================================================================
// FEED ENGINE - Social posts, tips, activity
// =============================================================================

export interface FeedItem {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  type: 'post' | 'trade' | 'tip' | 'achievement' | 'signal' | 'mining' | 'staking' | 'casino_win' | 'puzzle_solved' | 'nft' | 'nsfw';
  content: string;
  mediaUrls: string[];
  coinMention?: string;
  isNSFW: boolean;
  isPremium: boolean;
  price: number;
  likes: number;
  comments: number;
  tips: number;
  tipTotal: number;
  shares: number;
  tags: string[];
  visibility: 'public' | 'followers' | 'premium' | 'private';
  createdAt: Date;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  username: string;
  content: string;
  likes: number;
  createdAt: Date;
}

class FeedEngine {
  private feed: FeedItem[] = [];
  private comments: Map<string, Comment[]> = new Map();

  createPost(userId: string, username: string, avatar: string, data: {
    content: string;
    type?: FeedItem['type'];
    mediaUrls?: string[];
    coinMention?: string;
    isNSFW?: boolean;
    isPremium?: boolean;
    price?: number;
    tags?: string[];
    visibility?: FeedItem['visibility'];
  }): FeedItem {
    const item: FeedItem = {
      id: `post_${Date.now()}_${Math.random().toString(36).substr(2, 8)}`,
      userId,
      username,
      avatar,
      type: data.type || 'post',
      content: data.content,
      mediaUrls: data.mediaUrls || [],
      coinMention: data.coinMention,
      isNSFW: data.isNSFW || false,
      isPremium: data.isPremium || false,
      price: data.price || 0,
      likes: 0,
      comments: 0,
      tips: 0,
      tipTotal: 0,
      shares: 0,
      tags: data.tags || [],
      visibility: data.visibility || 'public',
      createdAt: new Date(),
    };

    this.feed.unshift(item);
    if (this.feed.length > 10000) this.feed = this.feed.slice(0, 10000);
    return item;
  }

  // Auto-generate activity feed items
  logActivity(userId: string, username: string, avatar: string, type: FeedItem['type'], content: string, coinMention?: string): FeedItem {
    return this.createPost(userId, username, avatar, { content, type, coinMention, visibility: 'public' });
  }

  getFeed(options: { userId?: string; includeNSFW?: boolean; premiumOnly?: boolean; type?: string; page?: number; limit?: number }): FeedItem[] {
    let items = [...this.feed];
    if (!options.includeNSFW) items = items.filter(i => !i.isNSFW);
    if (options.premiumOnly) items = items.filter(i => i.isPremium);
    if (options.type) items = items.filter(i => i.type === options.type);
    if (options.userId) items = items.filter(i => i.userId === options.userId);

    const page = options.page || 1;
    const limit = options.limit || 25;
    return items.slice((page - 1) * limit, page * limit);
  }

  likePost(postId: string): number {
    const post = this.feed.find(p => p.id === postId);
    if (post) post.likes++;
    return post?.likes || 0;
  }

  tipPost(postId: string, amount: number, coin: string): void {
    const post = this.feed.find(p => p.id === postId);
    if (post) { post.tips++; post.tipTotal += amount; }
  }

  addComment(postId: string, userId: string, username: string, content: string): Comment {
    const comment: Comment = {
      id: `comment_${Date.now()}`,
      postId,
      userId,
      username,
      content,
      likes: 0,
      createdAt: new Date(),
    };
    if (!this.comments.has(postId)) this.comments.set(postId, []);
    this.comments.get(postId)!.push(comment);
    const post = this.feed.find(p => p.id === postId);
    if (post) post.comments++;
    return comment;
  }

  getComments(postId: string): Comment[] {
    return this.comments.get(postId) || [];
  }

  getTrending(): FeedItem[] {
    return [...this.feed]
      .sort((a, b) => (b.likes + b.tips * 5 + b.comments * 2) - (a.likes + a.tips * 5 + a.comments * 2))
      .slice(0, 20);
  }
}

// =============================================================================
// LIVE MINING ENGINE (always running)
// =============================================================================

export interface MiningSession {
  id: string;
  userId: string;
  coin: string;
  hashRate: number;
  blocksFound: number;
  totalMined: number;
  startedAt: Date;
  lastRewardAt: Date;
  isActive: boolean;
  difficulty: number;
}

class LiveMiningEngine {
  private sessions: Map<string, MiningSession> = new Map();
  private globalDifficulty: Record<string, number> = {
    SKY4444: 1000, SHADOW: 500, BTC: 1000000, DOGE: 2000, XMR: 5000,
  };
  private rewardPerBlock: Record<string, number> = {
    SKY4444: 50, SHADOW: 25, BTC: 0.000001, DOGE: 10, XMR: 0.01,
  };

  startMining(userId: string, coin: string): MiningSession {
    const sessionId = `mine_${userId}_${coin}`;
    if (this.sessions.has(sessionId)) throw new Error('Already mining this coin');

    const session: MiningSession = {
      id: sessionId,
      userId,
      coin,
      hashRate: 100 + Math.random() * 900,
      blocksFound: 0,
      totalMined: 0,
      startedAt: new Date(),
      lastRewardAt: new Date(),
      isActive: true,
      difficulty: this.globalDifficulty[coin] || 1000,
    };

    this.sessions.set(sessionId, session);
    return session;
  }

  stopMining(userId: string, coin: string): MiningSession {
    const sessionId = `mine_${userId}_${coin}`;
    const session = this.sessions.get(sessionId);
    if (!session) throw new Error('No active mining session');
    session.isActive = false;
    return session;
  }

  // Called periodically to distribute rewards
  tick(): Array<{ userId: string; coin: string; reward: number }> {
    const rewards: Array<{ userId: string; coin: string; reward: number }> = [];

    for (const session of this.sessions.values()) {
      if (!session.isActive) continue;

      // Probability of finding block based on hashRate vs difficulty
      const probability = session.hashRate / session.difficulty;
      if (Math.random() < probability * 0.01) { // ~1% chance per tick per unit
        const reward = this.rewardPerBlock[session.coin] || 1;
        session.blocksFound++;
        session.totalMined += reward;
        session.lastRewardAt = new Date();
        rewards.push({ userId: session.userId, coin: session.coin, reward });
      }
    }

    return rewards;
  }

  getUserSessions(userId: string): MiningSession[] {
    return Array.from(this.sessions.values()).filter(s => s.userId === userId);
  }

  getActiveSessions(): MiningSession[] {
    return Array.from(this.sessions.values()).filter(s => s.isActive);
  }

  getNetworkStats(): Record<string, { totalHashRate: number; activeMiners: number; difficulty: number }> {
    const stats: Record<string, { totalHashRate: number; activeMiners: number; difficulty: number }> = {};
    for (const session of this.sessions.values()) {
      if (!session.isActive) continue;
      if (!stats[session.coin]) stats[session.coin] = { totalHashRate: 0, activeMiners: 0, difficulty: this.globalDifficulty[session.coin] || 1000 };
      stats[session.coin].totalHashRate += session.hashRate;
      stats[session.coin].activeMiners++;
    }
    return stats;
  }
}

// =============================================================================
// LIVE STAKING ENGINE
// =============================================================================

export interface StakePosition {
  id: string;
  userId: string;
  coin: string;
  amount: number;
  apy: number;
  pool: string;
  startDate: Date;
  lockEndDate: Date;
  earned: number;
  autoCompound: boolean;
  isActive: boolean;
}

class LiveStakingEngine {
  private positions: Map<string, StakePosition> = new Map();
  private pools: Record<string, { apy: number; lockDays: number; minStake: number }> = {
    'sky4444-flex': { apy: 8, lockDays: 0, minStake: 100 },
    'sky4444-30d': { apy: 12.5, lockDays: 30, minStake: 500 },
    'sky4444-90d': { apy: 18, lockDays: 90, minStake: 1000 },
    'sky4444-365d': { apy: 25, lockDays: 365, minStake: 5000 },
    'shadow-flex': { apy: 10, lockDays: 0, minStake: 100 },
    'shadow-30d': { apy: 15, lockDays: 30, minStake: 500 },
    'shadow-90d': { apy: 22, lockDays: 90, minStake: 1000 },
    'trump-flex': { apy: 8.5, lockDays: 0, minStake: 50 },
    'usdt-flex': { apy: 5, lockDays: 0, minStake: 10 },
    'doge-30d': { apy: 7, lockDays: 30, minStake: 100 },
  };

  stake(userId: string, coin: string, amount: number, poolId: string, autoCompound: boolean = true): StakePosition {
    const pool = this.pools[poolId];
    if (!pool) throw new Error('Pool not found');
    if (amount < pool.minStake) throw new Error(`Minimum stake: ${pool.minStake}`);

    const position: StakePosition = {
      id: `stake_${Date.now()}_${userId}`,
      userId,
      coin,
      amount,
      apy: pool.apy,
      pool: poolId,
      startDate: new Date(),
      lockEndDate: new Date(Date.now() + pool.lockDays * 24 * 60 * 60 * 1000),
      earned: 0,
      autoCompound,
      isActive: true,
    };

    this.positions.set(position.id, position);
    return position;
  }

  unstake(positionId: string): StakePosition {
    const position = this.positions.get(positionId);
    if (!position) throw new Error('Position not found');
    if (position.lockEndDate > new Date()) {
      // Early withdrawal penalty: lose 50% of earned
      position.earned *= 0.5;
    }
    position.isActive = false;
    return position;
  }

  // Called periodically to accrue rewards
  tick(): Array<{ userId: string; coin: string; earned: number }> {
    const rewards: Array<{ userId: string; coin: string; earned: number }> = [];

    for (const position of this.positions.values()) {
      if (!position.isActive) continue;

      // Daily reward = (amount * apy) / 365 / 24 (hourly ticks)
      const hourlyReward = (position.amount * (position.apy / 100)) / 365 / 24;
      position.earned += hourlyReward;

      if (position.autoCompound) {
        position.amount += hourlyReward;
      }

      rewards.push({ userId: position.userId, coin: position.coin, earned: hourlyReward });
    }

    return rewards;
  }

  getUserPositions(userId: string): StakePosition[] {
    return Array.from(this.positions.values()).filter(p => p.userId === userId);
  }

  getPools(): Record<string, { apy: number; lockDays: number; minStake: number }> {
    return this.pools;
  }

  getTotalStaked(): Record<string, number> {
    const totals: Record<string, number> = {};
    for (const position of this.positions.values()) {
      if (!position.isActive) continue;
      if (!totals[position.coin]) totals[position.coin] = 0;
      totals[position.coin] += position.amount;
    }
    return totals;
  }
}

// =============================================================================
// LIVE TRADING ENGINE
// =============================================================================

export interface Order {
  id: string;
  userId: string;
  pair: string;
  side: 'buy' | 'sell';
  type: 'market' | 'limit' | 'stop';
  amount: number;
  price: number;
  filled: number;
  status: 'open' | 'filled' | 'partial' | 'cancelled';
  createdAt: Date;
  filledAt?: Date;
}

export interface TradeHistory {
  id: string;
  pair: string;
  side: 'buy' | 'sell';
  price: number;
  amount: number;
  total: number;
  buyerId: string;
  sellerId: string;
  timestamp: Date;
}

class LiveTradingEngine {
  private orders: Map<string, Order> = new Map();
  private history: TradeHistory[] = [];
  private prices: Record<string, number> = {
    'SKY4444/USDT': 0.01, 'SHADOW/USDT': 0.005, 'BTC/USDT': 107000,
    'DOGE/USDT': 0.35, 'TRUMP/USDT': 12.50, 'XMR/USDT': 185,
    'SKY4444/BTC': 0.0000001, 'SHADOW/BTC': 0.00000005,
    'DOGE/BTC': 0.0000033, 'SKY4444/SHADOW': 2.0,
    'TRUMP/BTC': 0.000117, 'SKY4444/DOGE': 0.0286,
  };

  placeOrder(userId: string, pair: string, side: 'buy' | 'sell', type: 'market' | 'limit' | 'stop', amount: number, price?: number): Order {
    const currentPrice = this.prices[pair] || 1;
    const orderPrice = type === 'market' ? currentPrice : (price || currentPrice);

    const order: Order = {
      id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      userId,
      pair,
      side,
      type,
      amount,
      price: orderPrice,
      filled: type === 'market' ? amount : 0,
      status: type === 'market' ? 'filled' : 'open',
      createdAt: new Date(),
      filledAt: type === 'market' ? new Date() : undefined,
    };

    // Market orders execute immediately
    if (type === 'market') {
      this.history.push({
        id: `trade_${Date.now()}`,
        pair,
        side,
        price: orderPrice,
        amount,
        total: amount * orderPrice,
        buyerId: side === 'buy' ? userId : 'market',
        sellerId: side === 'sell' ? userId : 'market',
        timestamp: new Date(),
      });

      // Update price with small slippage
      const slippage = side === 'buy' ? 1.001 : 0.999;
      this.prices[pair] = currentPrice * slippage;
    }

    this.orders.set(order.id, order);
    return order;
  }

  cancelOrder(orderId: string): Order {
    const order = this.orders.get(orderId);
    if (!order) throw new Error('Order not found');
    if (order.status === 'filled') throw new Error('Cannot cancel filled order');
    order.status = 'cancelled';
    return order;
  }

  getPrice(pair: string): number {
    return this.prices[pair] || 0;
  }

  getAllPrices(): Record<string, number> {
    return { ...this.prices };
  }

  getUserOrders(userId: string): Order[] {
    return Array.from(this.orders.values()).filter(o => o.userId === userId);
  }

  getOrderBook(pair: string): { bids: Order[]; asks: Order[] } {
    const openOrders = Array.from(this.orders.values()).filter(o => o.pair === pair && o.status === 'open');
    return {
      bids: openOrders.filter(o => o.side === 'buy').sort((a, b) => b.price - a.price),
      asks: openOrders.filter(o => o.side === 'sell').sort((a, b) => a.price - b.price),
    };
  }

  getTradeHistory(pair?: string, limit: number = 50): TradeHistory[] {
    let trades = [...this.history];
    if (pair) trades = trades.filter(t => t.pair === pair);
    return trades.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, limit);
  }

  // Simulate price movement
  tick(): void {
    for (const pair of Object.keys(this.prices)) {
      const change = (Math.random() - 0.498) * 0.005; // Slight upward bias
      this.prices[pair] *= (1 + change);
    }
  }
}

// =============================================================================
// LIVE ANALYTICS ENGINE
// =============================================================================

export interface AnalyticsSnapshot {
  timestamp: Date;
  totalUsers: number;
  activeUsers: number;
  totalTrades24h: number;
  volume24h: Record<string, number>;
  totalStaked: Record<string, number>;
  activeMiners: number;
  totalHashRate: number;
  casinoGamesPlayed: number;
  tipsVolume: number;
  newUsers24h: number;
}

class LiveAnalyticsEngine {
  private snapshots: AnalyticsSnapshot[] = [];

  captureSnapshot(data: Partial<AnalyticsSnapshot>): AnalyticsSnapshot {
    const snapshot: AnalyticsSnapshot = {
      timestamp: new Date(),
      totalUsers: data.totalUsers || 0,
      activeUsers: data.activeUsers || 0,
      totalTrades24h: data.totalTrades24h || 0,
      volume24h: data.volume24h || {},
      totalStaked: data.totalStaked || {},
      activeMiners: data.activeMiners || 0,
      totalHashRate: data.totalHashRate || 0,
      casinoGamesPlayed: data.casinoGamesPlayed || 0,
      tipsVolume: data.tipsVolume || 0,
      newUsers24h: data.newUsers24h || 0,
    };

    this.snapshots.push(snapshot);
    if (this.snapshots.length > 1000) this.snapshots = this.snapshots.slice(-1000);
    return snapshot;
  }

  getLatest(): AnalyticsSnapshot | null {
    return this.snapshots[this.snapshots.length - 1] || null;
  }

  getHistory(hours: number = 24): AnalyticsSnapshot[] {
    const cutoff = new Date(Date.now() - hours * 60 * 60 * 1000);
    return this.snapshots.filter(s => s.timestamp > cutoff);
  }
}

// =============================================================================
// SEED DATABASE ENGINE
// =============================================================================

export interface Seed {
  id: string;
  type: 'cannabis' | 'vegetable' | 'flower' | 'herb' | 'tree' | 'exotic' | 'fruit';
  strain: string;
  genetics: string;
  thcContent?: string;
  cbdContent?: string;
  floweringTime: string;
  yield: string;
  climate: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  description: string;
  growTips: string[];
  price: number;
  coinSymbol: string;
  legal: boolean;
  region: string;
  inStock: boolean;
  rating: number;
  reviews: number;
}

class SeedDatabaseEngine {
  private seeds: Seed[] = [
    { id: 'seed_001', type: 'cannabis', strain: 'Blue Dream', genetics: 'Blueberry x Haze', thcContent: '21%', cbdContent: '2%', floweringTime: '9-10 weeks', yield: '500g/m2', climate: 'Mediterranean', difficulty: 'beginner', description: 'Classic sativa-dominant hybrid. Balanced cerebral and body effects.', growTips: ['Top early for bushier growth', 'Loves CalMag supplements', 'Great for SCROG'], price: 50, coinSymbol: 'SKY4444', legal: true, region: 'Legal states', inStock: true, rating: 4.8, reviews: 234 },
    { id: 'seed_002', type: 'cannabis', strain: 'OG Kush', genetics: 'Hindu Kush x Chemdawg', thcContent: '23%', cbdContent: '1%', floweringTime: '8-9 weeks', yield: '450g/m2', climate: 'Warm/Indoor', difficulty: 'intermediate', description: 'Legendary West Coast strain. Heavy relaxation.', growTips: ['Control humidity in flower', 'Heavy feeder', 'Watch for mold'], price: 75, coinSymbol: 'SKY4444', legal: true, region: 'Legal states', inStock: true, rating: 4.9, reviews: 567 },
    { id: 'seed_003', type: 'cannabis', strain: 'Girl Scout Cookies', genetics: 'OG Kush x Durban Poison', thcContent: '25%', cbdContent: '1%', floweringTime: '9-10 weeks', yield: '350g/m2', climate: 'Indoor preferred', difficulty: 'intermediate', description: 'Potent hybrid with sweet earthy flavor.', growTips: ['Low yielder but high quality', 'Responds well to LST', 'Flush 2 weeks before harvest'], price: 80, coinSymbol: 'SKY4444', legal: true, region: 'Legal states', inStock: true, rating: 4.7, reviews: 389 },
    { id: 'seed_004', type: 'cannabis', strain: 'Gorilla Glue #4', genetics: 'Chem Sis x Sour Dubb x Chocolate Diesel', thcContent: '28%', cbdContent: '0.5%', floweringTime: '8-9 weeks', yield: '550g/m2', climate: 'Any', difficulty: 'beginner', description: 'Extremely potent. Couch-lock indica effects.', growTips: ['Very resinous - clean scissors often', 'Sturdy plant, beginner friendly', 'Heavy yielder'], price: 90, coinSymbol: 'SKY4444', legal: true, region: 'Legal states', inStock: true, rating: 4.9, reviews: 712 },
    { id: 'seed_005', type: 'cannabis', strain: 'White Widow', genetics: 'Brazilian Sativa x South Indian Indica', thcContent: '20%', cbdContent: '2%', floweringTime: '8-9 weeks', yield: '450g/m2', climate: 'Continental', difficulty: 'beginner', description: 'Amsterdam classic. Energetic, creative high.', growTips: ['Resilient to cold', 'Great for beginners', 'Crystal-covered buds'], price: 45, coinSymbol: 'SKY4444', legal: true, region: 'Legal states', inStock: true, rating: 4.6, reviews: 445 },
    { id: 'seed_006', type: 'vegetable', strain: 'Cherokee Purple Tomato', genetics: 'Heirloom', floweringTime: '80 days', yield: '10-20 lbs/plant', climate: 'Warm', difficulty: 'beginner', description: 'Deep purple heirloom tomato with rich flavor.', growTips: ['Stake early', 'Prune suckers', 'Full sun required'], price: 10, coinSymbol: 'SKY4444', legal: true, region: 'Worldwide', inStock: true, rating: 4.5, reviews: 89 },
    { id: 'seed_007', type: 'vegetable', strain: 'Ghost Pepper', genetics: 'Bhut Jolokia', floweringTime: '120-150 days', yield: '50-100 peppers/plant', climate: 'Hot', difficulty: 'intermediate', description: 'One of the hottest peppers. 1M+ Scoville.', growTips: ['Start indoors early', 'Needs heat', 'Wear gloves when harvesting'], price: 15, coinSymbol: 'SKY4444', legal: true, region: 'Worldwide', inStock: true, rating: 4.7, reviews: 156 },
    { id: 'seed_008', type: 'herb', strain: 'Thai Basil', genetics: 'Ocimum basilicum var. thyrsiflora', floweringTime: '60-90 days', yield: 'Continuous', climate: 'Tropical/Indoor', difficulty: 'beginner', description: 'Aromatic culinary herb with anise flavor.', growTips: ['Pinch flowers for more leaves', 'Loves humidity', 'Cut-and-come-again'], price: 5, coinSymbol: 'SKY4444', legal: true, region: 'Worldwide', inStock: true, rating: 4.4, reviews: 67 },
    { id: 'seed_009', type: 'exotic', strain: 'Dragon Fruit', genetics: 'Hylocereus undatus', floweringTime: '6-12 months', yield: '20-60 fruits/year', climate: 'Tropical', difficulty: 'intermediate', description: 'Exotic cactus fruit. Beautiful night-blooming flowers.', growTips: ['Needs support structure', 'Hand pollinate for fruit', 'Drought tolerant once established'], price: 25, coinSymbol: 'SKY4444', legal: true, region: 'Worldwide', inStock: true, rating: 4.6, reviews: 43 },
    { id: 'seed_010', type: 'flower', strain: 'Moonflower', genetics: 'Ipomoea alba', floweringTime: '90-120 days', yield: '20+ blooms/plant', climate: 'Warm', difficulty: 'beginner', description: 'Night-blooming white flowers. Intoxicating fragrance.', growTips: ['Nick seeds before planting', 'Provide trellis', 'Blooms open at dusk'], price: 8, coinSymbol: 'SKY4444', legal: true, region: 'Worldwide', inStock: true, rating: 4.3, reviews: 34 },
  ];

  getAll(type?: string): Seed[] {
    if (type) return this.seeds.filter(s => s.type === type);
    return this.seeds;
  }

  getById(id: string): Seed | null {
    return this.seeds.find(s => s.id === id) || null;
  }

  search(query: string): Seed[] {
    const lower = query.toLowerCase();
    return this.seeds.filter(s =>
      s.strain.toLowerCase().includes(lower) ||
      s.genetics.toLowerCase().includes(lower) ||
      s.description.toLowerCase().includes(lower) ||
      s.type.toLowerCase().includes(lower)
    );
  }

  getByDifficulty(difficulty: string): Seed[] {
    return this.seeds.filter(s => s.difficulty === difficulty);
  }

  getTopRated(limit: number = 10): Seed[] {
    return [...this.seeds].sort((a, b) => b.rating - a.rating).slice(0, limit);
  }
}

// =============================================================================
// SINGLETON INSTANCES - ALWAYS LIVE
// =============================================================================

export const profileEngine = new ProfileEngine();
export const feedEngine = new FeedEngine();
export const liveMiningEngine = new LiveMiningEngine();
export const liveStakingEngine = new LiveStakingEngine();
export const liveTradingEngine = new LiveTradingEngine();
export const liveAnalyticsEngine = new LiveAnalyticsEngine();
export const seedDatabaseEngine = new SeedDatabaseEngine();

// =============================================================================
// BACKGROUND TICKER - Runs every second to keep engines alive
// =============================================================================

let tickInterval: NodeJS.Timeout | null = null;

export function startLiveEngines(): void {
  if (tickInterval) return;

  tickInterval = setInterval(() => {
    // Mining rewards
    const miningRewards = liveMiningEngine.tick();
    for (const reward of miningRewards) {
      try {
        profileEngine.updateBalance(reward.userId, reward.coin, reward.reward);
        profileEngine.addXP(reward.userId, 5);
      } catch (e) { /* user may not exist */ }
    }

    // Staking rewards
    liveStakingEngine.tick();

    // Price movement
    liveTradingEngine.tick();

    // Analytics snapshot every 60 ticks
    if (Math.random() < 0.017) { // ~once per minute
      liveAnalyticsEngine.captureSnapshot({
        activeMiners: liveMiningEngine.getActiveSessions().length,
        totalStaked: liveStakingEngine.getTotalStaked(),
      });
    }
  }, 1000);

  console.log('[LIVE ENGINES] All engines started - mining, staking, trading, analytics running');
}

export function stopLiveEngines(): void {
  if (tickInterval) {
    clearInterval(tickInterval);
    tickInterval = null;
  }
}

export default {
  profileEngine,
  feedEngine,
  liveMiningEngine,
  liveStakingEngine,
  liveTradingEngine,
  liveAnalyticsEngine,
  seedDatabaseEngine,
  startLiveEngines,
  stopLiveEngines,
};
