import { z } from "zod";
import { desc, eq, and } from "drizzle-orm";
import { router, publicProcedure, protectedProcedure, TRPCError } from "../_core/trpc";
import { getDb } from "../db";
import { marketplaceListings, marketplaceOrders } from "../../drizzle/schema";

const demoListings = [
  {
    id: 0,
    sellerId: 0,
    title: "SkyCoin444 AI Signal Pack",
    description: "Demo digital listing for premium Hope AI watchlists and signal templates.",
    category: "digital",
    price: "44.44",
    currency: "USD",
    inventory: 444,
    status: "active",
    imageUrl: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const commerceMarketplaceRouter = router({
  createListing: protectedProcedure
    .input(z.object({
      title: z.string().min(3).max(255),
      description: z.string().min(1).max(4000),
      category: z.string().max(80).default("digital"),
      price: z.string().min(1).max(50),
      currency: z.string().max(12).default("USD"),
      inventory: z.number().int().min(0).default(1),
      imageUrl: z.string().url().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return { success: false, reason: "Database is not configured." };
      await db.insert(marketplaceListings).values({ sellerId: ctx.user.id, ...input, status: "active" });
      return { success: true };
    }),

  listListings: publicProcedure
    .input(z.object({ category: z.string().max(80).optional(), limit: z.number().min(1).max(100).default(50) }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return demoListings;

      if (input.category) {
        return db
          .select()
          .from(marketplaceListings)
          .where(and(eq(marketplaceListings.status, "active"), eq(marketplaceListings.category, input.category)))
          .orderBy(desc(marketplaceListings.createdAt))
          .limit(input.limit);
      }

      return db
        .select()
        .from(marketplaceListings)
        .where(eq(marketplaceListings.status, "active"))
        .orderBy(desc(marketplaceListings.createdAt))
        .limit(input.limit);
    }),

  createOrder: protectedProcedure
    .input(z.object({
      listingId: z.number().int().positive().optional(),
      quantity: z.number().int().min(1).default(1),
      total: z.string().min(1).max(50),
      currency: z.string().max(12).default("USD"),
      paymentMethod: z.string().max(64).default("stripe"),
      metadata: z.record(z.string(), z.unknown()).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return { success: false, reason: "Database is not configured." };

      let sellerId: number | null = null;
      if (input.listingId) {
        const listing = await db.select().from(marketplaceListings).where(eq(marketplaceListings.id, input.listingId)).limit(1);
        if (!listing[0]) throw new TRPCError({ code: "NOT_FOUND", message: "Listing not found." });
        sellerId = listing[0].sellerId;
      }

      await db.insert(marketplaceOrders).values({
        buyerId: ctx.user.id,
        sellerId: sellerId ?? undefined,
        listingId: input.listingId,
        quantity: input.quantity,
        total: input.total,
        currency: input.currency,
        paymentMethod: input.paymentMethod,
        status: "pending",
        metadata: input.metadata ? JSON.stringify(input.metadata) : undefined,
      });

      return { success: true, status: "pending_payment" as const };
    }),

  myOrders: protectedProcedure
    .input(z.object({ limit: z.number().min(1).max(100).default(25) }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return [];
      return db
        .select()
        .from(marketplaceOrders)
        .where(eq(marketplaceOrders.buyerId, ctx.user.id))
        .orderBy(desc(marketplaceOrders.createdAt))
        .limit(input.limit);
    }),
});
