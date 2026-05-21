import { z } from "zod";
import { desc, eq, and } from "drizzle-orm";
<<<<<<< HEAD
import { router, publicProcedure, protectedProcedure, TRPCError } from "../_core/trpc";
=======
import {
  router,
  publicProcedure,
  protectedProcedure,
  TRPCError,
} from "../_core/trpc";
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
import { getDb } from "../db";
import { marketplaceListings, marketplaceOrders } from "../../drizzle/schema";

const demoListings = [
  {
    id: 0,
    sellerId: 0,
    title: "SkyCoin444 AI Signal Pack",
<<<<<<< HEAD
    description: "Demo digital listing for premium Hope AI watchlists and signal templates.",
=======
    description:
      "Demo digital listing for premium Hope AI watchlists and signal templates.",
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
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
<<<<<<< HEAD
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
=======
    .input(
      z.object({
        title: z.string().min(3).max(255),
        description: z.string().min(1).max(4000),
        category: z.string().max(80).default("digital"),
        price: z.string().min(1).max(50),
        currency: z.string().max(12).default("USD"),
        inventory: z.number().int().min(0).default(1),
        imageUrl: z.string().url().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return { success: false, reason: "Database is not configured." };
      await db
        .insert(marketplaceListings)
        .values({ sellerId: ctx.user.id, ...input, status: "active" });
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
      return { success: true };
    }),

  listListings: publicProcedure
<<<<<<< HEAD
    .input(z.object({ category: z.string().max(80).optional(), limit: z.number().min(1).max(100).default(50) }))
=======
    .input(
      z.object({
        category: z.string().max(80).optional(),
        limit: z.number().min(1).max(100).default(50),
      })
    )
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return demoListings;

      if (input.category) {
        return db
          .select()
          .from(marketplaceListings)
<<<<<<< HEAD
          .where(and(eq(marketplaceListings.status, "active"), eq(marketplaceListings.category, input.category)))
=======
          .where(
            and(
              eq(marketplaceListings.status, "active"),
              eq(marketplaceListings.category, input.category)
            )
          )
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
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
<<<<<<< HEAD
    .input(z.object({
      listingId: z.number().int().positive().optional(),
      quantity: z.number().int().min(1).default(1),
      total: z.string().min(1).max(50),
      currency: z.string().max(12).default("USD"),
      paymentMethod: z.string().max(64).default("stripe"),
      metadata: z.record(z.string(), z.unknown()).optional(),
    }))
=======
    .input(
      z.object({
        listingId: z.number().int().positive().optional(),
        quantity: z.number().int().min(1).default(1),
        total: z.string().min(1).max(50),
        currency: z.string().max(12).default("USD"),
        paymentMethod: z.string().max(64).default("stripe"),
        metadata: z.record(z.string(), z.unknown()).optional(),
      })
    )
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return { success: false, reason: "Database is not configured." };

      let sellerId: number | null = null;
      if (input.listingId) {
<<<<<<< HEAD
        const listing = await db.select().from(marketplaceListings).where(eq(marketplaceListings.id, input.listingId)).limit(1);
        if (!listing[0]) throw new TRPCError({ code: "NOT_FOUND", message: "Listing not found." });
=======
        const listing = await db
          .select()
          .from(marketplaceListings)
          .where(eq(marketplaceListings.id, input.listingId))
          .limit(1);
        if (!listing[0])
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Listing not found.",
          });
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
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
