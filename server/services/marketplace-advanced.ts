/**
 * Advanced Marketplace - Dark Web Style Shop, Supplier Integration, Hacker Puzzles
 * Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
 * 
 * Features: Anonymous shop, DHGate/Alibaba supplier feed, hacker puzzle challenges,
 * seed phrase info, admin order management, $44 fee structure, order feed
 */

export interface ShopListing {
  id: string;
  sellerId: string;
  title: string;
  description: string;
  category: ShopCategory;
  price: number;
  coinSymbol: string;
  images: string[];
  isAnonymous: boolean;
  escrowRequired: boolean;
  shippingType: 'digital' | 'physical' | 'service';
  supplierSource?: 'dhgate' | 'alibaba' | 'direct' | 'custom';
  supplierUrl?: string;
  stock: number;
  sold: number;
  rating: number;
  reviews: number;
  tags: string[];
  status: 'active' | 'pending_review' | 'sold_out' | 'removed';
  platformFee: number;
  createdAt: Date;
}

export type ShopCategory =
  | 'digital_goods'
  | 'physical_goods'
  | 'services'
  | 'crypto_tools'
  | 'security_tools'
  | 'education'
  | 'art_nft'
  | 'gaming'
  | 'electronics'
  | 'fashion'
  | 'seeds_agriculture'
  | 'software'
  | 'consulting';

export interface ShopOrder {
  id: string;
  buyerId: string;
  sellerId: string;
  listingId: string;
  quantity: number;
  totalPrice: number;
  platformFee: number; // $44 fee
  coinSymbol: string;
  status: OrderStatus;
  escrowId?: string;
  shippingAddress?: string;
  trackingNumber?: string;
  adminNotes: string[];
  disputeReason?: string;
  createdAt: Date;
  completedAt?: Date;
}

export type OrderStatus =
  | 'pending_payment'
  | 'paid'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'completed'
  | 'disputed'
  | 'refunded'
  | 'cancelled'
  | 'admin_review';

export interface SupplierProduct {
  id: string;
  source: 'dhgate' | 'alibaba';
  title: string;
  description: string;
  price: number;
  currency: string;
  minOrder: number;
  supplierName: string;
  supplierRating: number;
  imageUrl: string;
  productUrl: string;
  category: string;
  shippingTime: string;
  importedAt: Date;
}

export interface HackerPuzzle {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme' | 'legendary';
  category: 'cryptography' | 'steganography' | 'reverse_engineering' | 'web_exploit' | 'blockchain' | 'social_engineering';
  reward: number;
  rewardCoin: string;
  hint: string;
  solution: string; // Hashed
  solvedBy: string[];
  maxSolvers: number;
  timeLimit?: number; // seconds
  status: 'active' | 'solved' | 'expired';
  createdAt: Date;
  expiresAt?: Date;
}

export interface SeedInfo {
  id: string;
  type: 'cannabis' | 'vegetable' | 'flower' | 'herb' | 'tree' | 'exotic';
  strain: string;
  genetics: string;
  thcContent?: string;
  cbdContent?: string;
  floweringTime: string;
  yield: string;
  climate: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  price: number;
  coinSymbol: string;
  legal: boolean;
  region: string;
}

export interface AdminOrderFeed {
  orders: ShopOrder[];
  pendingReview: number;
  totalRevenue: number;
  totalFees: number;
  disputeCount: number;
}

// =============================================================================
// PLATFORM FEE STRUCTURE
// =============================================================================

export const PLATFORM_FEES = {
  standardFee: 44, // $44 flat fee per order
  percentageFee: 0.025, // 2.5% additional
  escrowFee: 0.01, // 1% escrow service fee
  disputeFee: 25, // $25 dispute resolution fee
  premiumSellerDiscount: 0.5, // 50% fee discount for premium sellers
  charityContribution: 0.01, // 1% of all fees go to charity
};

// =============================================================================
// SHOP ENGINE
// =============================================================================

class ShopEngine {
  private listings: Map<string, ShopListing> = new Map();
  private orders: Map<string, ShopOrder> = new Map();
  private supplierProducts: SupplierProduct[] = [];

  createListing(
    sellerId: string,
    data: Omit<ShopListing, 'id' | 'sold' | 'rating' | 'reviews' | 'status' | 'platformFee' | 'createdAt'>
  ): ShopListing {
    const listing: ShopListing = {
      ...data,
      id: `listing_${Date.now()}_${sellerId}`,
      sold: 0,
      rating: 0,
      reviews: 0,
      status: 'active',
      platformFee: PLATFORM_FEES.standardFee,
      createdAt: new Date(),
    };

    this.listings.set(listing.id, listing);
    return listing;
  }

  purchaseItem(buyerId: string, listingId: string, quantity: number): ShopOrder {
    const listing = this.listings.get(listingId);
    if (!listing) throw new Error('Listing not found');
    if (listing.stock < quantity) throw new Error('Insufficient stock');

    const totalPrice = listing.price * quantity;
    const platformFee = PLATFORM_FEES.standardFee + (totalPrice * PLATFORM_FEES.percentageFee);

    const order: ShopOrder = {
      id: `order_${Date.now()}_${buyerId}`,
      buyerId,
      sellerId: listing.sellerId,
      listingId,
      quantity,
      totalPrice,
      platformFee,
      coinSymbol: listing.coinSymbol,
      status: 'pending_payment',
      adminNotes: [],
      createdAt: new Date(),
    };

    listing.stock -= quantity;
    listing.sold += quantity;
    if (listing.stock === 0) listing.status = 'sold_out';

    this.orders.set(order.id, order);
    return order;
  }

  updateOrderStatus(orderId: string, status: OrderStatus, adminNote?: string): ShopOrder {
    const order = this.orders.get(orderId);
    if (!order) throw new Error('Order not found');
    order.status = status;
    if (adminNote) order.adminNotes.push(`[${new Date().toISOString()}] ${adminNote}`);
    if (status === 'completed') order.completedAt = new Date();
    return order;
  }

  getAdminOrderFeed(): AdminOrderFeed {
    const allOrders = Array.from(this.orders.values());
    return {
      orders: allOrders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()),
      pendingReview: allOrders.filter(o => o.status === 'admin_review').length,
      totalRevenue: allOrders.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.totalPrice, 0),
      totalFees: allOrders.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.platformFee, 0),
      disputeCount: allOrders.filter(o => o.status === 'disputed').length,
    };
  }

  getListings(category?: ShopCategory, page: number = 1, limit: number = 20): ShopListing[] {
    let results = Array.from(this.listings.values()).filter(l => l.status === 'active');
    if (category) results = results.filter(l => l.category === category);
    return results.slice((page - 1) * limit, page * limit);
  }

  getUserOrders(userId: string): ShopOrder[] {
    return Array.from(this.orders.values()).filter(o => o.buyerId === userId || o.sellerId === userId);
  }

  // Import supplier products from DHGate/Alibaba
  importSupplierProduct(product: Omit<SupplierProduct, 'id' | 'importedAt'>): SupplierProduct {
    const imported: SupplierProduct = {
      ...product,
      id: `supplier_${Date.now()}_${product.source}`,
      importedAt: new Date(),
    };
    this.supplierProducts.push(imported);
    return imported;
  }

  getSupplierProducts(source?: 'dhgate' | 'alibaba'): SupplierProduct[] {
    if (source) return this.supplierProducts.filter(p => p.source === source);
    return this.supplierProducts;
  }

  searchListings(query: string): ShopListing[] {
    const lower = query.toLowerCase();
    return Array.from(this.listings.values())
      .filter(l => l.status === 'active' && (
        l.title.toLowerCase().includes(lower) ||
        l.description.toLowerCase().includes(lower) ||
        l.tags.some(t => t.toLowerCase().includes(lower))
      ));
  }
}

// =============================================================================
// HACKER PUZZLE ENGINE
// =============================================================================

class HackerPuzzleEngine {
  private puzzles: Map<string, HackerPuzzle> = new Map();

  constructor() {
    // Initialize with default puzzles
    this.createDefaultPuzzles();
  }

  private createDefaultPuzzles(): void {
    const defaults: Omit<HackerPuzzle, 'id' | 'solvedBy' | 'status' | 'createdAt'>[] = [
      { title: 'The Genesis Block', description: 'Decode the hidden message in the first SKY4444 block hash', difficulty: 'easy', category: 'cryptography', reward: 100, rewardCoin: 'SKY4444', hint: 'Look at the hex values as ASCII', solution: 'hashed_solution_1', maxSolvers: 100 },
      { title: 'Shadow Protocol', description: 'Find the vulnerability in the Shadow token contract', difficulty: 'medium', category: 'blockchain', reward: 500, rewardCoin: 'SHADOW', hint: 'Check the approve function', solution: 'hashed_solution_2', maxSolvers: 50 },
      { title: 'Dark Net Cipher', description: 'Decrypt the message using the onion routing key', difficulty: 'hard', category: 'cryptography', reward: 1000, rewardCoin: 'SKY4444', hint: 'AES-256 with a twist', solution: 'hashed_solution_3', maxSolvers: 25 },
      { title: 'The Whale Tracker', description: 'Identify the whale wallet from transaction patterns', difficulty: 'medium', category: 'blockchain', reward: 750, rewardCoin: 'SKY4444', hint: 'Follow the money through 3 hops', solution: 'hashed_solution_4', maxSolvers: 30 },
      { title: 'Steganography Challenge', description: 'Find the hidden wallet seed in the image', difficulty: 'hard', category: 'steganography', reward: 2000, rewardCoin: 'SHADOW', hint: 'LSB encoding in the blue channel', solution: 'hashed_solution_5', maxSolvers: 10 },
      { title: 'Smart Contract Exploit', description: 'Find and exploit the reentrancy bug', difficulty: 'extreme', category: 'web_exploit', reward: 5000, rewardCoin: 'SKY4444', hint: 'The withdraw function has a flaw', solution: 'hashed_solution_6', maxSolvers: 5 },
      { title: 'Quantum Key Exchange', description: 'Break the quantum-resistant encryption', difficulty: 'legendary', category: 'cryptography', reward: 10000, rewardCoin: 'SKY4444', hint: 'Lattice-based, but the parameters are weak', solution: 'hashed_solution_7', maxSolvers: 1 },
      { title: 'Social Engineering CTF', description: 'Gather the 5 pieces of the admin password from public sources', difficulty: 'medium', category: 'social_engineering', reward: 300, rewardCoin: 'SHADOW', hint: 'Check the GitHub commits, Twitter, and Discord', solution: 'hashed_solution_8', maxSolvers: 50 },
      { title: 'Reverse the Binary', description: 'Decompile the mining algorithm and find the backdoor', difficulty: 'extreme', category: 'reverse_engineering', reward: 7500, rewardCoin: 'SKY4444', hint: 'x86_64, stripped, look at offset 0x4A3F', solution: 'hashed_solution_9', maxSolvers: 3 },
      { title: 'The Hidden Marketplace', description: 'Find the secret .onion address hidden in the blockchain', difficulty: 'hard', category: 'steganography', reward: 1500, rewardCoin: 'SHADOW', hint: 'Transaction amounts encode the URL', solution: 'hashed_solution_10', maxSolvers: 15 },
    ];

    for (const puzzle of defaults) {
      const p: HackerPuzzle = {
        ...puzzle,
        id: `puzzle_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
        solvedBy: [],
        status: 'active',
        createdAt: new Date(),
      };
      this.puzzles.set(p.id, p);
    }
  }

  submitSolution(puzzleId: string, userId: string, solution: string): { correct: boolean; reward: number } {
    const puzzle = this.puzzles.get(puzzleId);
    if (!puzzle) throw new Error('Puzzle not found');
    if (puzzle.status !== 'active') throw new Error('Puzzle no longer active');
    if (puzzle.solvedBy.includes(userId)) throw new Error('Already solved');

    // In production, hash and compare
    const correct = solution.length > 0; // Simplified check
    if (correct) {
      puzzle.solvedBy.push(userId);
      if (puzzle.solvedBy.length >= puzzle.maxSolvers) {
        puzzle.status = 'solved';
      }
      return { correct: true, reward: puzzle.reward };
    }

    return { correct: false, reward: 0 };
  }

  getActivePuzzles(): HackerPuzzle[] {
    return Array.from(this.puzzles.values()).filter(p => p.status === 'active');
  }

  getPuzzlesByDifficulty(difficulty: string): HackerPuzzle[] {
    return Array.from(this.puzzles.values()).filter(p => p.difficulty === difficulty && p.status === 'active');
  }

  getLeaderboard(): Array<{ userId: string; solved: number; totalRewards: number }> {
    const solvers: Map<string, { solved: number; totalRewards: number }> = new Map();
    for (const puzzle of this.puzzles.values()) {
      for (const solver of puzzle.solvedBy) {
        const current = solvers.get(solver) || { solved: 0, totalRewards: 0 };
        current.solved++;
        current.totalRewards += puzzle.reward;
        solvers.set(solver, current);
      }
    }
    return Array.from(solvers.entries())
      .map(([userId, stats]) => ({ userId, ...stats }))
      .sort((a, b) => b.totalRewards - a.totalRewards);
  }
}

// =============================================================================
// SEED INFO DATABASE
// =============================================================================

class SeedInfoEngine {
  private seeds: SeedInfo[] = [
    { id: 'seed_1', type: 'cannabis', strain: 'Blue Dream', genetics: 'Blueberry x Haze', thcContent: '21%', cbdContent: '2%', floweringTime: '9-10 weeks', yield: '500g/m2', climate: 'Mediterranean', difficulty: 'beginner', description: 'Classic hybrid with balanced effects', price: 50, coinSymbol: 'SKY4444', legal: true, region: 'Legal states only' },
    { id: 'seed_2', type: 'cannabis', strain: 'OG Kush', genetics: 'Hindu Kush x Chemdawg', thcContent: '23%', cbdContent: '1%', floweringTime: '8-9 weeks', yield: '450g/m2', climate: 'Warm', difficulty: 'intermediate', description: 'Legendary West Coast strain', price: 75, coinSymbol: 'SKY4444', legal: true, region: 'Legal states only' },
    { id: 'seed_3', type: 'vegetable', strain: 'Cherokee Purple Tomato', genetics: 'Heirloom', floweringTime: '80 days', yield: '10-20 lbs/plant', climate: 'Warm', difficulty: 'beginner', description: 'Dark purple heirloom tomato', price: 10, coinSymbol: 'SKY4444', legal: true, region: 'Worldwide' },
    { id: 'seed_4', type: 'herb', strain: 'Thai Basil', genetics: 'Ocimum basilicum var. thyrsiflora', floweringTime: '60-90 days', yield: 'Continuous harvest', climate: 'Tropical', difficulty: 'beginner', description: 'Aromatic culinary herb', price: 5, coinSymbol: 'SKY4444', legal: true, region: 'Worldwide' },
    { id: 'seed_5', type: 'exotic', strain: 'Dragon Fruit', genetics: 'Hylocereus undatus', floweringTime: '6-12 months', yield: '20-60 fruits/year', climate: 'Tropical', difficulty: 'intermediate', description: 'Exotic cactus fruit', price: 25, coinSymbol: 'SKY4444', legal: true, region: 'Worldwide' },
  ];

  getSeeds(type?: string): SeedInfo[] {
    if (type) return this.seeds.filter(s => s.type === type);
    return this.seeds;
  }

  searchSeeds(query: string): SeedInfo[] {
    const lower = query.toLowerCase();
    return this.seeds.filter(s =>
      s.strain.toLowerCase().includes(lower) ||
      s.description.toLowerCase().includes(lower) ||
      s.genetics.toLowerCase().includes(lower)
    );
  }

  addSeed(seed: Omit<SeedInfo, 'id'>): SeedInfo {
    const newSeed: SeedInfo = { ...seed, id: `seed_${Date.now()}` };
    this.seeds.push(newSeed);
    return newSeed;
  }
}

// Singleton instances
export const shopEngine = new ShopEngine();
export const hackerPuzzleEngine = new HackerPuzzleEngine();
export const seedInfoEngine = new SeedInfoEngine();

export default { shopEngine, hackerPuzzleEngine, seedInfoEngine, PLATFORM_FEES };
