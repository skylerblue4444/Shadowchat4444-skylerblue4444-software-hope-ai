/**
 * Live ICO & Shop Router
 * ─────────────────────────────────────────────────────────────────────────────
 * Real-time ICO funding and shop operations
 */

import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { ICOFunding, ICOCoin } from "../lib/ico-funding.ts";
import { CryptoShop } from "../lib/crypto-shop.ts";

export const liveIcoShopRouter = router({
  // ─── ICO: Get Active ICOs ─────────────────────────────────────────────────
  getActiveICOs: publicProcedure.query(async () => {
    return {
      icos: [
        {
          coin: "SKYCOIN4444",
          active: true,
          pricePerToken: "0.001",
          hardCap: "$50M",
          softCap: "$5M",
          raised: "$25M",
          investors: 12500,
          progress: 50,
          daysRemaining: 245,
        },
        {
          coin: "SHADOW",
          active: true,
          pricePerToken: "0.0015",
          hardCap: "$30M",
          softCap: "$3M",
          raised: "$18M",
          investors: 8900,
          progress: 60,
          daysRemaining: 214,
        },
      ],
    };
  }),

  // ─── ICO: Get ICO Details ─────────────────────────────────────────────────
  getICODetails: publicProcedure
    .input(z.object({ coin: z.string() }))
    .query(async ({ input }) => {
      const metrics = ICOFunding.calculateMetrics(
        input.coin as ICOCoin,
        "25000000",
        12500,
        "25000000000",
      );

      return {
        ...metrics,
        tiers: [
          {
            name: "Early Bird",
            minInvestment: "$100",
            maxInvestment: "$10,000",
            bonus: "25%",
            description: "First 1000 participants",
          },
          {
            name: "Standard",
            minInvestment: "$10,000",
            maxInvestment: "$100,000",
            bonus: "10%",
            description: "Standard tier",
          },
          {
            name: "Whale",
            minInvestment: "$100,000",
            maxInvestment: "$1,000,000",
            bonus: "20%",
            description: "Large investors",
          },
        ],
      };
    }),

  // ─── ICO: Invest in ICO ────────────────────────────────────────────────────
  investInICO: protectedProcedure
    .input(
      z.object({
        coin: z.string(),
        amountUsd: z.string(),
        paymentMethod: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const validation = ICOFunding.validateInvestment(
        input.coin as ICOCoin,
        input.amountUsd,
      );

      if (!validation.valid) {
        throw new Error(validation.error);
      }

      const tier = ICOFunding.getTierForInvestment(
        input.coin as ICOCoin,
        input.amountUsd,
      );

      const tokensReceived = ICOFunding.calculateTokensReceived(
        input.coin as ICOCoin,
        input.amountUsd,
        tier?.tokenBonus || 0,
      );

      return {
        success: true,
        investmentId: `ICO-${Date.now()}`,
        coin: input.coin,
        amountUsd: input.amountUsd,
        tokensReceived,
        tier: tier?.name,
        status: "pending",
        timestamp: new Date(),
      };
    }),

  // ─── ICO: Get User Investments ────────────────────────────────────────────
  getUserInvestments: protectedProcedure.query(async ({ ctx }) => {
    return {
      investments: [
        {
          investmentId: "ICO-001",
          coin: "SKYCOIN4444",
          amountUsd: "50000",
          tokensReceived: "62500000",
          tier: "Whale",
          status: "confirmed",
          timestamp: new Date(Date.now() - 86400000 * 30),
        },
        {
          investmentId: "ICO-002",
          coin: "SHADOW",
          amountUsd: "10000",
          tokensReceived: "9333333",
          tier: "Standard",
          status: "confirmed",
          timestamp: new Date(Date.now() - 86400000 * 60),
        },
      ],
    };
  }),

  // ─── ICO: Get Vesting Schedule ────────────────────────────────────────────
  getVestingSchedule: protectedProcedure
    .input(z.object({ investmentId: z.string() }))
    .query(async ({ input }) => {
      const schedule = ICOFunding.calculateVestingSchedule("62500000", 12);

      return {
        investmentId: input.investmentId,
        schedule: schedule.slice(0, 5), // Show first 5 months
      };
    }),

  // ─── SHOP: Get Shop Items ─────────────────────────────────────────────────
  getShopItems: publicProcedure
    .input(
      z.object({
        category: z.string().optional(),
        coin: z.string().optional(),
        search: z.string().optional(),
      }),
    )
    .query(async ({ input }) => {
      let items = CryptoShop.SHOP_ITEMS;

      if (input.category) {
        items = CryptoShop.getItemsByCategory(input.category);
      } else if (input.coin) {
        items = CryptoShop.getItemsByCoin(input.coin);
      } else if (input.search) {
        items = CryptoShop.searchItems(input.search);
      }

      return { items };
    }),

  // ─── SHOP: Get Item Details ───────────────────────────────────────────────
  getItemDetails: publicProcedure
    .input(z.object({ itemId: z.string() }))
    .query(async ({ input }) => {
      const item = CryptoShop.SHOP_ITEMS.find((i) => i.itemId === input.itemId);
      return item || { error: "Item not found" };
    }),

  // ─── SHOP: Create Order ───────────────────────────────────────────────────
  createOrder: protectedProcedure
    .input(
      z.object({
        items: z.array(
          z.object({
            itemId: z.string(),
            quantity: z.number(),
          }),
        ),
        paymentCoin: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const totalUsd = CryptoShop.calculateOrderTotal(input.items);

      return {
        success: true,
        orderId: `ORDER-${Date.now()}`,
        totalUsd,
        paymentCoin: input.paymentCoin,
        status: "pending",
        timestamp: new Date(),
      };
    }),

  // ─── SHOP: Get User Orders ────────────────────────────────────────────────
  getUserOrders: protectedProcedure.query(async ({ ctx }) => {
    return {
      orders: [
        {
          orderId: "ORDER-001",
          items: [
            { name: "SKYCOIN4444 T-Shirt", quantity: 2, price: "$25" },
          ],
          totalUsd: "$50",
          status: "shipped",
          timestamp: new Date(Date.now() - 86400000 * 7),
        },
        {
          orderId: "ORDER-002",
          items: [
            { name: "SHADOW Hoodie", quantity: 1, price: "$65" },
          ],
          totalUsd: "$65",
          status: "delivered",
          timestamp: new Date(Date.now() - 86400000 * 14),
        },
      ],
    };
  }),

  // ─── SHOP: Get Whitepapers ────────────────────────────────────────────────
  getWhitepapers: publicProcedure.query(async () => {
    return {
      whitepapers: CryptoShop.WHITEPAPERS.map((wp) => ({
        coin: wp.coin,
        title: wp.title,
        version: wp.version,
        publishDate: wp.publishDate,
        downloadCount: wp.downloadCount,
        language: wp.language,
      })),
    };
  }),

  // ─── SHOP: Download Whitepaper ────────────────────────────────────────────
  downloadWhitepaper: protectedProcedure
    .input(z.object({ coin: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const whitepaper = CryptoShop.getWhitepaperByCoin(input.coin);

      if (!whitepaper) {
        throw new Error("Whitepaper not found");
      }

      return {
        success: true,
        downloadUrl: whitepaper.whitepaperUrl,
        coin: input.coin,
        timestamp: new Date(),
      };
    }),

  // ─── SHOP: Get Shop Statistics ────────────────────────────────────────────
  getShopStats: publicProcedure.query(async () => {
    const stats = CryptoShop.getShopStats();
    return stats;
  }),

  // ─── SHOP: Get Top Rated Items ────────────────────────────────────────────
  getTopRatedItems: publicProcedure.query(async () => {
    return {
      items: CryptoShop.getTopRatedItems(10),
    };
  }),

  // ─── SHOP: Get Trending Items ─────────────────────────────────────────────
  getTrendingItems: publicProcedure.query(async () => {
    return {
      items: CryptoShop.getTrendingItems(10),
    };
  }),

  // ─── SHOP: Calculate Loyalty Points ────────────────────────────────────────
  calculateLoyaltyPoints: publicProcedure
    .input(z.object({ orderTotal: z.string() }))
    .query(async ({ input }) => {
      const points = CryptoShop.calculateLoyaltyPoints(input.orderTotal);
      return { points };
    }),

  // ─── SHOP: Apply Discount Code ────────────────────────────────────────────
  applyDiscount: publicProcedure
    .input(
      z.object({
        orderTotal: z.string(),
        discountCode: z.string(),
      }),
    )
    .query(async ({ input }) => {
      // Mock discount logic
      const discountPercentage = input.discountCode === "EARLY20" ? 20 : 0;

      if (discountPercentage === 0) {
        return { error: "Invalid discount code" };
      }

      const result = CryptoShop.applyDiscount(
        input.orderTotal,
        discountPercentage,
      );

      return {
        discountCode: input.discountCode,
        discountPercentage,
        ...result,
      };
    }),
});
