/**
 * ICO & Shop Router
 * ─────────────────────────────────────────────────────────────────────────────
 * Handles token sale (ICO), merchandise shop, and digital goods marketplace.
 * Integrates with all supported crypto payment methods.
 */

import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { ENV } from "../_core/env";

export const icoShopRouter = router({
  // ─── ICO Tiers ───────────────────────────────────────────────────────────
  getTiers: publicProcedure.query(() => {
    return {
      tiers: [
        {
          id: "early_bird",
          name: "Early Bird",
          minUsd: 100,
          maxUsd: 1000,
          bonus: 0.25, // 25% bonus
          description: "First 1000 participants get 25% bonus tokens",
        },
        {
          id: "standard",
          name: "Standard",
          minUsd: 1000,
          maxUsd: 10000,
          bonus: 0.1, // 10% bonus
          description: "Standard tier with 10% bonus",
        },
        {
          id: "whale",
          name: "Whale",
          minUsd: 10000,
          maxUsd: null,
          bonus: 0.2, // 20% bonus
          description: "Large investors get 20% bonus + VIP perks",
        },
      ],
    };
  }),

  // ─── ICO Purchase ────────────────────────────────────────────────────────
  purchaseTokens: protectedProcedure
    .input(
      z.object({
        usdAmount: z.number().positive(),
        paymentMethod: z.enum(["stripe", "btc", "doge", "xmr", "usdt", "trump", "sky4444", "shadow"]),
        tier: z.enum(["early_bird", "standard", "whale"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ENV.icoActive) {
        throw new Error("ICO is not currently active");
      }

      const baseTokens = input.usdAmount / ENV.icoPriceUsd;
      const tierBonuses: Record<string, number> = {
        early_bird: 0.25,
        standard: 0.1,
        whale: 0.2,
      };
      const bonus = tierBonuses[input.tier] || 0;
      const totalTokens = baseTokens * (1 + bonus);

      return {
        success: true,
        purchaseId: `ICO-${Date.now()}`,
        usdAmount: input.usdAmount,
        baseTokens,
        bonus,
        totalTokens,
        paymentMethod: input.paymentMethod,
        tier: input.tier,
        status: "pending_confirmation",
      };
    }),

  // ─── Shop Inventory ──────────────────────────────────────────────────────
  getShopItems: publicProcedure.query(() => {
    return {
      items: [
        {
          id: "merch_tshirt",
          name: "SKY4444 T-Shirt",
          price: 29.99,
          currency: "USD",
          acceptedCoins: ["stripe", "usdt", "sky4444"],
          image: "/shop/tshirt.png",
          inventory: 500,
        },
        {
          id: "merch_hoodie",
          name: "SKY4444 Hoodie",
          price: 59.99,
          currency: "USD",
          acceptedCoins: ["stripe", "usdt", "sky4444"],
          image: "/shop/hoodie.png",
          inventory: 300,
        },
        {
          id: "digital_whitepaper",
          name: "Full Whitepaper + Research",
          price: 9.99,
          currency: "USD",
          acceptedCoins: ["stripe", "btc", "usdt", "sky4444"],
          image: "/shop/whitepaper.png",
          inventory: 999999,
        },
        {
          id: "digital_roadmap",
          name: "Exclusive Roadmap 2026-2028",
          price: 4.99,
          currency: "USD",
          acceptedCoins: ["stripe", "usdt", "sky4444"],
          image: "/shop/roadmap.png",
          inventory: 999999,
        },
        {
          id: "nft_genesis",
          name: "Genesis NFT Collection",
          price: 99.99,
          currency: "USD",
          acceptedCoins: ["stripe", "usdt", "sky4444", "trump"],
          image: "/shop/nft-genesis.png",
          inventory: 100,
        },
      ],
    };
  }),

  // ─── Purchase Shop Item ──────────────────────────────────────────────────
  purchaseShopItem: protectedProcedure
    .input(
      z.object({
        itemId: z.string(),
        quantity: z.number().int().positive(),
        paymentMethod: z.enum(["stripe", "btc", "doge", "xmr", "usdt", "trump", "sky4444", "shadow"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Simplified: in production, check inventory, process payment, etc.
      return {
        success: true,
        orderId: `ORDER-${Date.now()}`,
        itemId: input.itemId,
        quantity: input.quantity,
        paymentMethod: input.paymentMethod,
        status: "pending_payment",
      };
    }),

  // ─── Whitepaper & Docs ───────────────────────────────────────────────────
  getWhitepaper: publicProcedure.query(() => {
    return {
      title: "SKY4444 & SHADOW Whitepaper",
      version: "2.0",
      publishedDate: "2026-01-15",
      chapters: [
        { title: "Executive Summary", pages: "1-5" },
        { title: "Problem & Vision", pages: "6-12" },
        { title: "Technical Architecture", pages: "13-35" },
        { title: "Tokenomics & Economics", pages: "36-50" },
        { title: "Governance & DAO", pages: "51-60" },
        { title: "Roadmap 2026-2028", pages: "61-70" },
      ],
      downloadUrl: "/docs/whitepaper-v2.pdf",
    };
  }),

  // ─── Funding Info ────────────────────────────────────────────────────────
  getFundingInfo: publicProcedure.query(() => {
    return {
      icoHardCap: ENV.icoHardCap,
      icoSoftCap: ENV.icoSoftCap,
      currentRaised: 2500000, // Mock value
      percentageRaised: (2500000 / ENV.icoHardCap) * 100,
      startDate: ENV.icoStartDate,
      endDate: ENV.icoEndDate,
      investorCount: 1234,
      averageInvestment: 2500000 / 1234,
      supportedCurrencies: ["USD", "EUR", "GBP"],
      supportedCoins: ["BTC", "DOGE", "XMR", "USDT", "TRUMP", "SKY4444", "SHADOW"],
    };
  }),

  // ─── Investment Tiers ────────────────────────────────────────────────────
  getInvestmentTiers: publicProcedure.query(() => {
    return {
      tiers: [
        {
          name: "Supporter",
          minInvestment: 100,
          maxInvestment: 1000,
          perks: ["Early access to features", "Community badge"],
        },
        {
          name: "Contributor",
          minInvestment: 1000,
          maxInvestment: 10000,
          perks: ["Early access", "Community badge", "Monthly newsletter", "Governance vote"],
        },
        {
          name: "Founder",
          minInvestment: 10000,
          maxInvestment: null,
          perks: ["All above", "VIP support", "Quarterly calls", "Equity-like governance"],
        },
      ],
    };
  }),

  // ─── Spot Trading Pairs ──────────────────────────────────────────────────
  getSpotPairs: publicProcedure.query(() => {
    return {
      pairs: [
        { pair: "SKY4444/USD", bid: 0.0085, ask: 0.009, volume24h: 5000000 },
        { pair: "SKY4444/BTC", bid: 0.00000015, ask: 0.00000016, volume24h: 50 },
        { pair: "SHADOW/USD", bid: 0.012, ask: 0.0125, volume24h: 2000000 },
        { pair: "TRUMP/USD", bid: 0.05, ask: 0.055, volume24h: 10000000 },
        { pair: "DOGE/USD", bid: 0.08, ask: 0.085, volume24h: 50000000 },
      ],
    };
  }),
});
