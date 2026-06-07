import { z } from 'zod';

/**
 * Marketplace Engine: Creator Marketplace, Listings, Orders, Escrow, Reviews
 */

export type ListingStatus = 'draft' | 'live' | 'sold' | 'delisted';
export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled' | 'disputed';
export type EscrowStatus = 'held' | 'released' | 'refunded';

export interface Listing {
  id: string;
  sellerId: number;
  sellerName: string;
  title: string;
  description: string;
  category: string;
  price: string;
  currency: string;
  images: string[];
  inventory: number;
  status: ListingStatus;
  rating: number;
  reviews: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  listingId: string;
  buyerId: number;
  sellerId: number;
  quantity: number;
  totalPrice: string;
  status: OrderStatus;
  escrowId?: string;
  shippingAddress?: string;
  trackingNumber?: string;
  createdAt: Date;
  completedAt?: Date;
}

export interface Escrow {
  id: string;
  orderId: string;
  amount: string;
  coin: string;
  status: EscrowStatus;
  releasedAt?: Date;
  refundedAt?: Date;
}

export interface Review {
  id: string;
  listingId: string;
  orderId: string;
  buyerId: number;
  buyerName: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  images?: string[];
  helpful: number;
  createdAt: Date;
}

export interface SellerStats {
  sellerId: number;
  totalSales: number;
  totalRevenue: string;
  averageRating: number;
  totalReviews: number;
  responseTime: number;
  shippingSpeed: number;
  returnRate: number;
}

// ==================== MARKETPLACE ENGINE CLASS ====================

export class MarketplaceEngine {
  private listings: Map<string, Listing> = new Map();
  private orders: Map<string, Order> = new Map();
  private escrows: Map<string, Escrow> = new Map();
  private reviews: Map<string, Review[]> = new Map();
  private sellerStats: Map<number, SellerStats> = new Map();
  private userListings: Map<number, string[]> = new Map();

  /**
   * Create a listing
   */
  createListing(
    sellerId: number,
    sellerName: string,
    title: string,
    description: string,
    category: string,
    price: string,
    currency: string,
    images: string[] = [],
    inventory: number = 1
  ): Listing {
    const listing: Listing = {
      id: `listing-${Date.now()}-${Math.random()}`,
      sellerId,
      sellerName,
      title,
      description,
      category,
      price,
      currency,
      images,
      inventory,
      status: 'draft',
      rating: 0,
      reviews: 0,
      views: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.listings.set(listing.id, listing);

    const userListings = this.userListings.get(sellerId) || [];
    userListings.push(listing.id);
    this.userListings.set(sellerId, userListings);

    return listing;
  }

  /**
   * Publish a listing
   */
  publishListing(listingId: string, sellerId: number): Listing | null {
    const listing = this.listings.get(listingId);
    if (!listing || listing.sellerId !== sellerId) return null;

    listing.status = 'live';
    listing.updatedAt = new Date();
    return listing;
  }

  /**
   * Get listing
   */
  getListing(listingId: string): Listing | null {
    const listing = this.listings.get(listingId);
    if (listing) {
      listing.views += 1;
    }
    return listing || null;
  }

  /**
   * Search listings
   */
  searchListings(query: string, category?: string, limit: number = 50): Listing[] {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.listings.values())
      .filter(
        listing =>
          listing.status === 'live' &&
          (listing.title.toLowerCase().includes(lowerQuery) ||
            listing.description.toLowerCase().includes(lowerQuery)) &&
          (!category || listing.category === category)
      )
      .sort((a, b) => b.views - a.views)
      .slice(0, limit);
  }

  /**
   * Get listings by category
   */
  getListingsByCategory(category: string, limit: number = 50): Listing[] {
    return Array.from(this.listings.values())
      .filter(listing => listing.status === 'live' && listing.category === category)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  /**
   * Get seller's listings
   */
  getSellerListings(sellerId: number): Listing[] {
    const listingIds = this.userListings.get(sellerId) || [];
    return listingIds.map(id => this.listings.get(id)).filter(Boolean) as Listing[];
  }

  /**
   * Create an order
   */
  createOrder(
    listingId: string,
    buyerId: number,
    quantity: number,
    coin: string = 'SKY4444'
  ): { order: Order; escrow: Escrow } | null {
    const listing = this.listings.get(listingId);
    if (!listing || listing.status !== 'live' || listing.inventory < quantity) return null;

    const totalPrice = (parseFloat(listing.price) * quantity).toString();

    const order: Order = {
      id: `order-${Date.now()}-${Math.random()}`,
      listingId,
      buyerId,
      sellerId: listing.sellerId,
      quantity,
      totalPrice,
      status: 'pending',
      createdAt: new Date(),
    };

    const escrow: Escrow = {
      id: `escrow-${Date.now()}-${Math.random()}`,
      orderId: order.id,
      amount: totalPrice,
      coin,
      status: 'held',
    };

    this.orders.set(order.id, order);
    this.escrows.set(escrow.id, escrow);
    order.escrowId = escrow.id;

    listing.inventory -= quantity;
    if (listing.inventory === 0) {
      listing.status = 'sold';
    }

    return { order, escrow };
  }

  /**
   * Complete an order (release escrow)
   */
  completeOrder(orderId: string): boolean {
    const order = this.orders.get(orderId);
    if (!order) return false;

    order.status = 'delivered';
    order.completedAt = new Date();

    if (order.escrowId) {
      const escrow = this.escrows.get(order.escrowId);
      if (escrow) {
        escrow.status = 'released';
        escrow.releasedAt = new Date();
      }
    }

    this.updateSellerStats(order.sellerId, order.totalPrice);
    return true;
  }

  /**
   * Refund an order
   */
  refundOrder(orderId: string): boolean {
    const order = this.orders.get(orderId);
    if (!order) return false;

    order.status = 'cancelled';

    if (order.escrowId) {
      const escrow = this.escrows.get(order.escrowId);
      if (escrow) {
        escrow.status = 'refunded';
        escrow.refundedAt = new Date();
      }
    }

    const listing = this.listings.get(order.listingId);
    if (listing) {
      listing.inventory += order.quantity;
      if (listing.status === 'sold') {
        listing.status = 'live';
      }
    }

    return true;
  }

  /**
   * Leave a review
   */
  leaveReview(
    listingId: string,
    orderId: string,
    buyerId: number,
    buyerName: string,
    rating: 1 | 2 | 3 | 4 | 5,
    comment: string,
    images?: string[]
  ): Review {
    const review: Review = {
      id: `review-${Date.now()}-${Math.random()}`,
      listingId,
      orderId,
      buyerId,
      buyerName,
      rating,
      comment,
      images,
      helpful: 0,
      createdAt: new Date(),
    };

    const listingReviews = this.reviews.get(listingId) || [];
    listingReviews.push(review);
    this.reviews.set(listingId, listingReviews);

    // Update listing rating
    const listing = this.listings.get(listingId);
    if (listing) {
      const allReviews = this.reviews.get(listingId) || [];
      const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
      listing.rating = Math.round(avgRating * 10) / 10;
      listing.reviews = allReviews.length;
    }

    return review;
  }

  /**
   * Get reviews for a listing
   */
  getReviews(listingId: string, limit: number = 50): Review[] {
    return (this.reviews.get(listingId) || [])
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  /**
   * Update seller stats
   */
  private updateSellerStats(sellerId: number, saleAmount: string): void {
    let stats = this.sellerStats.get(sellerId);
    if (!stats) {
      stats = {
        sellerId,
        totalSales: 0,
        totalRevenue: '0',
        averageRating: 0,
        totalReviews: 0,
        responseTime: 0,
        shippingSpeed: 0,
        returnRate: 0,
      };
    }

    stats.totalSales += 1;
    stats.totalRevenue = (parseFloat(stats.totalRevenue) + parseFloat(saleAmount)).toString();

    this.sellerStats.set(sellerId, stats);
  }

  /**
   * Get seller stats
   */
  getSellerStats(sellerId: number): SellerStats | null {
    return this.sellerStats.get(sellerId) || null;
  }

  /**
   * Get trending listings
   */
  getTrendingListings(limit: number = 20): Listing[] {
    return Array.from(this.listings.values())
      .filter(listing => listing.status === 'live')
      .sort((a, b) => b.views - a.views)
      .slice(0, limit);
  }

  /**
   * Get featured listings
   */
  getFeaturedListings(limit: number = 10): Listing[] {
    return Array.from(this.listings.values())
      .filter(listing => listing.status === 'live' && listing.rating >= 4.5)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  }
}

// ==================== SINGLETON INSTANCE ====================

let marketplaceInstance: MarketplaceEngine | null = null;

export function getMarketplaceEngine(): MarketplaceEngine {
  if (!marketplaceInstance) {
    marketplaceInstance = new MarketplaceEngine();
  }
  return marketplaceInstance;
}

export function resetMarketplaceEngine(): void {
  marketplaceInstance = null;
}
