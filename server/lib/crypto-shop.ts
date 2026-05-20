/**
 * Crypto Shop & Marketplace System
 * ─────────────────────────────────────────────────────────────────────────────
 * Complete shop infrastructure for SKYCOIN4444 and SHADOW merchandise, digital goods
 */

import { Decimal } from "decimal.js";

export type ShopItemType = "merchandise" | "digital" | "service" | "whitepaper" | "nft";

export interface ShopItem {
  itemId: string;
  name: string;
  description: string;
  type: ShopItemType;
  priceUsd: string;
  acceptedCoins: string[];
  inventory: number;
  imageUrl: string;
  category: string;
  rating: number;
  reviews: number;
}

export interface ShopOrder {
  orderId: string;
  userId: number;
  items: {
    itemId: string;
    quantity: number;
    pricePerUnit: string;
  }[];
  totalUsd: string;
  paymentCoin: string;
  paymentAmount: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "completed";
  timestamp: Date;
  shippingAddress?: string;
}

export interface Whitepaper {
  whitepaperUrl: string;
  coin: string;
  title: string;
  version: string;
  publishDate: Date;
  downloadCount: number;
  language: string;
}

export const SHOP_ITEMS: ShopItem[] = [
  // SKYCOIN4444 Merchandise
  {
    itemId: "SKY-TSHIRT-001",
    name: "SKYCOIN4444 T-Shirt",
    description: "Premium cotton t-shirt with SKYCOIN4444 logo",
    type: "merchandise",
    priceUsd: "25",
    acceptedCoins: ["SKYCOIN4444", "SHADOW", "USDT", "BTC"],
    inventory: 500,
    imageUrl: "/images/sky-tshirt.png",
    category: "apparel",
    rating: 4.8,
    reviews: 234,
  },
  {
    itemId: "SKY-HOODIE-001",
    name: "SKYCOIN4444 Hoodie",
    description: "Comfortable hoodie with embroidered SKYCOIN4444 logo",
    type: "merchandise",
    priceUsd: "60",
    acceptedCoins: ["SKYCOIN4444", "SHADOW", "USDT"],
    inventory: 200,
    imageUrl: "/images/sky-hoodie.png",
    category: "apparel",
    rating: 4.9,
    reviews: 156,
  },
  {
    itemId: "SKY-CAP-001",
    name: "SKYCOIN4444 Cap",
    description: "Adjustable baseball cap with SKYCOIN4444 branding",
    type: "merchandise",
    priceUsd: "20",
    acceptedCoins: ["SKYCOIN4444", "USDT", "DOGE"],
    inventory: 1000,
    imageUrl: "/images/sky-cap.png",
    category: "apparel",
    rating: 4.7,
    reviews: 89,
  },
  // SHADOW Merchandise
  {
    itemId: "SHADOW-TSHIRT-001",
    name: "SHADOW T-Shirt",
    description: "Dark mode t-shirt with SHADOW logo",
    type: "merchandise",
    priceUsd: "25",
    acceptedCoins: ["SHADOW", "SKYCOIN4444", "USDT"],
    inventory: 400,
    imageUrl: "/images/shadow-tshirt.png",
    category: "apparel",
    rating: 4.6,
    reviews: 178,
  },
  {
    itemId: "SHADOW-HOODIE-001",
    name: "SHADOW Hoodie",
    description: "Premium hoodie with SHADOW branding",
    type: "merchandise",
    priceUsd: "65",
    acceptedCoins: ["SHADOW", "USDT", "BTC"],
    inventory: 150,
    imageUrl: "/images/shadow-hoodie.png",
    category: "apparel",
    rating: 4.8,
    reviews: 124,
  },
  // Digital Goods
  {
    itemId: "WHITEPAPER-SKY",
    name: "SKYCOIN4444 Whitepaper",
    description: "Complete technical whitepaper for SKYCOIN4444",
    type: "digital",
    priceUsd: "0",
    acceptedCoins: ["SKYCOIN4444", "SHADOW", "USDT"],
    inventory: 999999,
    imageUrl: "/images/whitepaper-sky.png",
    category: "digital",
    rating: 4.9,
    reviews: 567,
  },
  {
    itemId: "WHITEPAPER-SHADOW",
    name: "SHADOW Whitepaper",
    description: "Complete technical whitepaper for SHADOW",
    type: "digital",
    priceUsd: "0",
    acceptedCoins: ["SHADOW", "USDT"],
    inventory: 999999,
    imageUrl: "/images/whitepaper-shadow.png",
    category: "digital",
    rating: 4.8,
    reviews: 423,
  },
  // NFTs
  {
    itemId: "NFT-FOUNDER-001",
    name: "Founder's NFT - SKYCOIN4444",
    description: "Limited edition founder's NFT with governance rights",
    type: "nft",
    priceUsd: "1000",
    acceptedCoins: ["SKYCOIN4444", "USDT", "BTC"],
    inventory: 100,
    imageUrl: "/images/nft-founder-sky.png",
    category: "nft",
    rating: 5.0,
    reviews: 45,
  },
  {
    itemId: "NFT-EARLY-001",
    name: "Early Supporter NFT - SHADOW",
    description: "NFT for early SHADOW supporters with special perks",
    type: "nft",
    priceUsd: "500",
    acceptedCoins: ["SHADOW", "USDT"],
    inventory: 250,
    imageUrl: "/images/nft-early-shadow.png",
    category: "nft",
    rating: 4.9,
    reviews: 78,
  },
];

export const WHITEPAPERS: Whitepaper[] = [
  {
    whitepaperUrl: "/whitepapers/skycoin4444-v1.0.pdf",
    coin: "SKYCOIN4444",
    title: "SKYCOIN4444: The Future of Decentralized Finance",
    version: "1.0",
    publishDate: new Date("2026-01-15"),
    downloadCount: 15234,
    language: "English",
  },
  {
    whitepaperUrl: "/whitepapers/shadow-v1.0.pdf",
    coin: "SHADOW",
    title: "SHADOW: Privacy-First Cryptocurrency Infrastructure",
    version: "1.0",
    publishDate: new Date("2026-02-01"),
    downloadCount: 8756,
    language: "English",
  },
];

export class CryptoShop {
  /**
   * Calculate order total
   */
  static calculateOrderTotal(
    items: { itemId: string; quantity: number }[],
  ): string {
    let total = new Decimal(0);

    for (const item of items) {
      const shopItem = SHOP_ITEMS.find((i) => i.itemId === item.itemId);
      if (shopItem) {
        total = total.plus(
          new Decimal(shopItem.priceUsd).times(item.quantity),
        );
      }
    }

    return total.toFixed(2);
  }

  /**
   * Convert USD to crypto amount
   */
  static convertUsdToCrypto(
    usdAmount: string,
    coin: string,
    coinPrice: string,
  ): string {
    const cryptoAmount = new Decimal(usdAmount).dividedBy(coinPrice);
    return cryptoAmount.toFixed(18);
  }

  /**
   * Get items by category
   */
  static getItemsByCategory(category: string): ShopItem[] {
    return SHOP_ITEMS.filter((item) => item.category === category);
  }

  /**
   * Get items by coin accepted
   */
  static getItemsByCoin(coin: string): ShopItem[] {
    return SHOP_ITEMS.filter((item) => item.acceptedCoins.includes(coin));
  }

  /**
   * Search items
   */
  static searchItems(query: string): ShopItem[] {
    const lowerQuery = query.toLowerCase();
    return SHOP_ITEMS.filter(
      (item) =>
        item.name.toLowerCase().includes(lowerQuery) ||
        item.description.toLowerCase().includes(lowerQuery) ||
        item.category.toLowerCase().includes(lowerQuery),
    );
  }

  /**
   * Calculate discount for bulk purchase
   */
  static calculateBulkDiscount(quantity: number): number {
    if (quantity >= 100) return 20; // 20% off
    if (quantity >= 50) return 15; // 15% off
    if (quantity >= 20) return 10; // 10% off
    if (quantity >= 10) return 5; // 5% off
    return 0;
  }

  /**
   * Apply discount to order
   */
  static applyDiscount(
    orderTotal: string,
    discountPercentage: number,
  ): { discountAmount: string; finalTotal: string } {
    const discount = new Decimal(orderTotal)
      .times(discountPercentage)
      .dividedBy(100);
    const finalTotal = new Decimal(orderTotal).minus(discount);

    return {
      discountAmount: discount.toFixed(2),
      finalTotal: finalTotal.toFixed(2),
    };
  }

  /**
   * Get whitepaper by coin
   */
  static getWhitepaperByCoin(coin: string): Whitepaper | undefined {
    return WHITEPAPERS.find((wp) => wp.coin === coin);
  }

  /**
   * Calculate shipping cost
   */
  static calculateShippingCost(
    country: string,
    weight: number, // kg
  ): string {
    // Base shipping cost
    let baseCost = new Decimal(10);

    // Country multiplier
    const countryMultiplier = country === "US" ? 1 : country === "EU" ? 1.5 : 2;
    baseCost = baseCost.times(countryMultiplier);

    // Weight surcharge
    const weightSurcharge = new Decimal(weight).times(2).times(countryMultiplier);

    const totalShipping = baseCost.plus(weightSurcharge);
    return totalShipping.toFixed(2);
  }

  /**
   * Calculate tax
   */
  static calculateTax(
    orderTotal: string,
    country: string,
    state?: string,
  ): string {
    let taxRate = new Decimal(0);

    if (country === "US") {
      // US state tax rates (simplified)
      taxRate = state === "CA" ? new Decimal(0.0725) : new Decimal(0.06);
    } else if (country === "EU") {
      // EU VAT (simplified)
      taxRate = new Decimal(0.19);
    } else {
      // Default tax rate
      taxRate = new Decimal(0.1);
    }

    const tax = new Decimal(orderTotal).times(taxRate);
    return tax.toFixed(2);
  }

  /**
   * Generate order summary
   */
  static generateOrderSummary(
    order: ShopOrder,
    shippingCost: string,
    tax: string,
  ): {
    subtotal: string;
    shipping: string;
    tax: string;
    total: string;
  } {
    const subtotal = order.totalUsd;
    const total = new Decimal(subtotal)
      .plus(shippingCost)
      .plus(tax);

    return {
      subtotal,
      shipping: shippingCost,
      tax,
      total: total.toFixed(2),
    };
  }

  /**
   * Get top-rated items
   */
  static getTopRatedItems(limit: number = 10): ShopItem[] {
    return SHOP_ITEMS.sort((a, b) => b.rating - a.rating).slice(0, limit);
  }

  /**
   * Get trending items
   */
  static getTrendingItems(limit: number = 10): ShopItem[] {
    return SHOP_ITEMS.sort((a, b) => b.reviews - a.reviews).slice(0, limit);
  }

  /**
   * Check inventory
   */
  static checkInventory(itemId: string, quantity: number): boolean {
    const item = SHOP_ITEMS.find((i) => i.itemId === itemId);
    return item ? item.inventory >= quantity : false;
  }

  /**
   * Calculate loyalty points
   */
  static calculateLoyaltyPoints(orderTotal: string): number {
    // 1 point per $1 spent
    const points = Math.floor(parseFloat(orderTotal));
    return points;
  }

  /**
   * Get shop statistics
   */
  static getShopStats(): {
    totalItems: number;
    totalCategories: number;
    totalInventory: number;
    averageRating: number;
    totalReviews: number;
  } {
    const totalItems = SHOP_ITEMS.length;
    const categories = new Set(SHOP_ITEMS.map((i) => i.category));
    const totalInventory = SHOP_ITEMS.reduce((sum, i) => sum + i.inventory, 0);
    const averageRating =
      SHOP_ITEMS.reduce((sum, i) => sum + i.rating, 0) / SHOP_ITEMS.length;
    const totalReviews = SHOP_ITEMS.reduce((sum, i) => sum + i.reviews, 0);

    return {
      totalItems,
      totalCategories: categories.size,
      totalInventory,
      averageRating: parseFloat(averageRating.toFixed(2)),
      totalReviews,
    };
  }
}
