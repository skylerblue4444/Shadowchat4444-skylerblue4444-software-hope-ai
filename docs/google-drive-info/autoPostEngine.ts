/**
 * ShadowChat Auto-Post Engine
 * Automatically posts trending shop items, crypto signals, and deals
 * to the social feed, trending board, and notification system.
 *
 * Business Logic:
 * - Every new shop item → auto-post to social feed with buy link
 * - Hot deals (>20% off) → auto-post to trending board
 * - Price drops on watched coins → auto-post crypto alert
 * - New SKY4444 block found → auto-post celebration to feed
 * - Referral milestones → auto-post achievement
 */

export interface AutoPost {
  id: string;
  type: 'shop_item' | 'deal' | 'crypto_signal' | 'block_found' | 'referral' | 'trending' | 'news';
  title: string;
  body: string;
  imageUrl?: string;
  price?: number;
  currency?: string;
  discount?: number;
  coin?: string;
  priceChange?: number;
  shopUrl?: string;
  timestamp: number;
  likes: number;
  shares: number;
  comments: number;
  author: string;
  authorAvatar: string;
  tags: string[];
  region: 'USA' | 'China' | 'EU' | 'Global';
  verified: boolean;
}

// ─── Trending shop items (auto-synced from DHgate/Alibaba) ───────────────────
export const TRENDING_SHOP_ITEMS = [
  {
    id: 'shop_001',
    name: 'RGB Gaming Keyboard Mechanical',
    price: 34.99,
    originalPrice: 89.99,
    discount: 61,
    source: 'DHgate',
    category: 'Gaming',
    region: 'China' as const,
    imageEmoji: '⌨️',
    rating: 4.8,
    sold: 12847,
    tags: ['gaming', 'keyboard', 'RGB', 'mechanical'],
  },
  {
    id: 'shop_002',
    name: 'Ledger-Style Hardware Wallet Case',
    price: 12.99,
    originalPrice: 29.99,
    discount: 57,
    source: 'Alibaba',
    category: 'Crypto',
    region: 'China' as const,
    imageEmoji: '🔐',
    rating: 4.9,
    sold: 8472,
    tags: ['crypto', 'hardware wallet', 'security', 'bitcoin'],
  },
  {
    id: 'shop_003',
    name: 'LED Smart Strip Lights 10M',
    price: 18.99,
    originalPrice: 45.00,
    discount: 58,
    source: 'DHgate',
    category: 'Home',
    region: 'China' as const,
    imageEmoji: '💡',
    rating: 4.7,
    sold: 44721,
    tags: ['LED', 'smart home', 'lights', 'RGB'],
  },
  {
    id: 'shop_004',
    name: 'TRUMP 2024 Collector Coin Set',
    price: 24.99,
    originalPrice: 49.99,
    discount: 50,
    source: 'USA Mint Partner',
    category: 'Collectibles',
    region: 'USA' as const,
    imageEmoji: '🇺🇸',
    rating: 4.9,
    sold: 18472,
    tags: ['TRUMP', 'collectible', 'coin', 'USA'],
  },
  {
    id: 'shop_005',
    name: 'Crypto Streetwear Hoodie — SKY4444',
    price: 44.44,
    originalPrice: 89.99,
    discount: 51,
    source: 'ShadowChat Shop',
    category: 'Fashion',
    region: 'USA' as const,
    imageEmoji: '👕',
    rating: 5.0,
    sold: 4444,
    tags: ['SKY4444', 'streetwear', 'crypto', 'hoodie'],
  },
  {
    id: 'shop_006',
    name: 'Smart Watch Pro — Health Monitor',
    price: 29.99,
    originalPrice: 79.99,
    discount: 63,
    source: 'Alibaba',
    category: 'Wearables',
    region: 'China' as const,
    imageEmoji: '⌚',
    rating: 4.6,
    sold: 28471,
    tags: ['smartwatch', 'health', 'fitness', 'wearable'],
  },
  {
    id: 'shop_007',
    name: 'Portable Crypto Mining Rig Frame',
    price: 89.99,
    originalPrice: 199.99,
    discount: 55,
    source: 'DHgate',
    category: 'Mining',
    region: 'China' as const,
    imageEmoji: '⛏️',
    rating: 4.8,
    sold: 2847,
    tags: ['mining', 'rig', 'crypto', 'hardware'],
  },
  {
    id: 'shop_008',
    name: 'Wireless Earbuds Pro — 48hr Battery',
    price: 22.99,
    originalPrice: 59.99,
    discount: 62,
    source: 'DHgate',
    category: 'Audio',
    region: 'China' as const,
    imageEmoji: '🎧',
    rating: 4.7,
    sold: 67841,
    tags: ['earbuds', 'wireless', 'audio', 'bluetooth'],
  },
];

// ─── Auto-generate social posts from shop items ───────────────────────────────
export function generateShopPost(item: typeof TRENDING_SHOP_ITEMS[0]): AutoPost {
  const templates = [
    `🔥 HOT DEAL: ${item.name} — ${item.discount}% OFF! Only $${item.price} (was $${item.originalPrice}). Pay with SKY4444 for extra 5% off! 🛒`,
    `💰 TRENDING: ${item.name} is flying off the shelves! ${item.sold.toLocaleString()} sold. Grab yours for $${item.price} — pay crypto, save more! ✦`,
    `⚡ FLASH DEAL: ${item.name} just dropped to $${item.price}! That's ${item.discount}% off. SKY4444 payments accepted. Limited stock! 🚀`,
    `🌟 ${item.rating}⭐ RATED: ${item.name} — ${item.sold.toLocaleString()} happy customers. $${item.price} with crypto payment. Source: ${item.source}`,
  ];

  return {
    id: `autopost_${item.id}_${Date.now()}`,
    type: 'shop_item',
    title: `🛒 ${item.name}`,
    body: templates[Math.floor(Math.random() * templates.length)],
    price: item.price,
    currency: 'USD',
    discount: item.discount,
    shopUrl: `/dashboard/shadow/skyler-shop`,
    timestamp: Date.now() - Math.floor(Math.random() * 3600000),
    likes: Math.floor(Math.random() * 847) + 44,
    shares: Math.floor(Math.random() * 200) + 10,
    comments: Math.floor(Math.random() * 100) + 5,
    author: 'SkylerBlue_Shop',
    authorAvatar: '🛒',
    tags: item.tags,
    region: item.region,
    verified: true,
  };
}

// ─── Auto-generate crypto signal posts ───────────────────────────────────────
export function generateCryptoSignalPost(coin: string, price: number, change: number): AutoPost {
  const isUp = change >= 0;
  const templates = isUp ? [
    `📈 ${coin} is PUMPING! +${change.toFixed(2)}% in 24h. Current price: $${price.toFixed(4)}. SKY4444 ecosystem benefiting! 🚀`,
    `🟢 BULLISH SIGNAL: ${coin} breaking out! Price: $${price.toFixed(4)} (+${change.toFixed(2)}%). Buy on ShadowChat — 0 maker fees! ✦`,
    `⚡ ${coin} MOMENTUM: +${change.toFixed(2)}% today. Trade ${coin} on ShadowChat with SKY4444 rewards on every trade! 💰`,
  ] : [
    `📉 ${coin} DIP ALERT: ${change.toFixed(2)}% — BUY THE DIP! Price: $${price.toFixed(4)}. Use the Day Trade Scream Room! 🎯`,
    `🔴 ${coin} correction: ${change.toFixed(2)}%. DCA opportunity! Set up your DCA bot on ShadowChat now. 🤖`,
    `💎 DIAMOND HANDS: ${coin} at $${price.toFixed(4)} (${change.toFixed(2)}%). Long-term holders are accumulating. SKY4444 staking at 44.4% APY! ✦`,
  ];

  return {
    id: `signal_${coin}_${Date.now()}`,
    type: 'crypto_signal',
    title: `${isUp ? '📈' : '📉'} ${coin} Signal`,
    body: templates[Math.floor(Math.random() * templates.length)],
    coin,
    priceChange: change,
    timestamp: Date.now() - Math.floor(Math.random() * 1800000),
    likes: Math.floor(Math.random() * 1200) + 100,
    shares: Math.floor(Math.random() * 400) + 50,
    comments: Math.floor(Math.random() * 200) + 20,
    author: 'ShadowChat_Signals',
    authorAvatar: '📊',
    tags: [coin.toLowerCase(), 'crypto', 'signal', 'trading'],
    region: 'Global',
    verified: true,
  };
}

// ─── Auto-generate block found posts ─────────────────────────────────────────
export function generateBlockFoundPost(coin: string, reward: number, hash: string): AutoPost {
  return {
    id: `block_${coin}_${Date.now()}`,
    type: 'block_found',
    title: `⛏️ Block Found — ${coin}!`,
    body: `🎉 BLOCK MINED! ${coin} block found by ShadowChat Miner Pro! Reward: ${reward} ${coin}. Hash: ${hash.slice(0, 16)}... Mine yours at /dashboard/shadow/crypto-miner-pro ⛏️ SKY4444 rewards on every block! ✦`,
    coin,
    timestamp: Date.now(),
    likes: Math.floor(Math.random() * 500) + 200,
    shares: Math.floor(Math.random() * 150) + 50,
    comments: Math.floor(Math.random() * 80) + 20,
    author: 'ShadowChat_Miner',
    authorAvatar: '⛏️',
    tags: [coin.toLowerCase(), 'mining', 'block', 'reward'],
    region: 'Global',
    verified: true,
  };
}

// ─── Auto-post scheduler ──────────────────────────────────────────────────────
export class AutoPostScheduler {
  private posts: AutoPost[] = [];
  private listeners: Set<(posts: AutoPost[]) => void> = new Set();
  private intervalId: ReturnType<typeof setInterval> | null = null;

  constructor() {
    // Pre-populate with shop posts
    this.posts = TRENDING_SHOP_ITEMS.map(item => generateShopPost(item));
    // Add some crypto signals
    const signals = [
      { coin: 'SKY4444', price: 0.047, change: 12.3 },
      { coin: 'BTC', price: 67420, change: 3.2 },
      { coin: 'TRUMP', price: 14.20, change: 8.7 },
      { coin: 'DOGE', price: 0.1847, change: -1.2 },
      { coin: 'XMR', price: 178.40, change: 2.4 },
    ];
    signals.forEach(s => this.posts.unshift(generateCryptoSignalPost(s.coin, s.price, s.change)));
    // Sort by timestamp
    this.posts.sort((a, b) => b.timestamp - a.timestamp);
  }

  start(): void {
    if (this.intervalId) return;
    // Auto-post a new item every 45 seconds
    this.intervalId = setInterval(() => {
      const randomItem = TRENDING_SHOP_ITEMS[Math.floor(Math.random() * TRENDING_SHOP_ITEMS.length)];
      const newPost = generateShopPost(randomItem);
      this.posts = [newPost, ...this.posts.slice(0, 49)];
      this.notify();
    }, 45000);
  }

  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  addBlockFoundPost(coin: string, reward: number, hash: string): void {
    const post = generateBlockFoundPost(coin, reward, hash);
    this.posts = [post, ...this.posts.slice(0, 49)];
    this.notify();
  }

  subscribe(listener: (posts: AutoPost[]) => void): () => void {
    this.listeners.add(listener);
    listener([...this.posts]);
    return () => this.listeners.delete(listener);
  }

  getPosts(): AutoPost[] {
    return [...this.posts];
  }

  likePost(id: string): void {
    this.posts = this.posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p);
    this.notify();
  }

  sharePost(id: string): void {
    this.posts = this.posts.map(p => p.id === id ? { ...p, shares: p.shares + 1 } : p);
    this.notify();
  }

  private notify(): void {
    for (const listener of this.listeners) {
      listener([...this.posts]);
    }
  }
}

export const autoPostScheduler = new AutoPostScheduler();
