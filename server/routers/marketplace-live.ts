import { and, desc, eq, like, or, sql } from "drizzle-orm";
import { z } from "zod";
import { marketplaceListings, marketplaceOrders } from "../../drizzle/schema";
import { adminProcedure, protectedProcedure, publicProcedure, router, TRPCError } from "../_core/trpc";
import { getDb } from "../db";
import { multiCoinService, supportedCoins, type Coin } from "../lib/multi-coin";

const coinSchema = z.enum(supportedCoins);

const demoListings = [
  {
    id: 444,
    sellerId: 1,
    title: "SkyLux VIP Creator Pass",
    description: "Unlocks beta livestream rooms, priority dating marketplace placement, and premium creator drops.",
    category: "digital",
    price: "444",
    token: "SKY4444",
    inventory: 44,
    status: "live",
    imageUrl: null,
    escrowRequired: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 777,
    sellerId: 1,
    title: "Shadow Coin Privacy Bundle",
    description: "Beta education bundle for privacy-first wallet hygiene, social marketplace listings, and creator safety.",
    category: "crypto-education",
    price: "77",
    token: "SHADOW",
    inventory: 21,
    status: "live",
    imageUrl: null,
    escrowRequired: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
] as const;

export const marketplaceLiveRouter = router({
  listListings: publicProcedure
    .input(
      z
        .object({
          search: z.string().max(120).optional(),
          category: z.string().max(80).optional(),
          limit: z.number().int().min(1).max(100).default(24),
        })
        .optional(),
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return demoListings.slice(0, input?.limit ?? 24);

      const filters = [eq(marketplaceListings.status, "live")];
      if (input?.category && input.category !== "all") filters.push(eq(marketplaceListings.category, input.category));
      if (input?.search) {
        const pattern = `%${input.search}%`;
        filters.push(or(like(marketplaceListings.title, pattern), like(marketplaceListings.description, pattern))!);
      }

      return db
        .select()
        .from(marketplaceListings)
        .where(and(...filters))
        .orderBy(desc(marketplaceListings.updatedAt))
        .limit(input?.limit ?? 24);
    }),

  createListing: protectedProcedure
    .input(
      z.object({
        title: z.string().min(3).max(180),
        description: z.string().min(10).max(4000),
        category: z.string().min(2).max(80).default("digital"),
        price: z.number().positive(),
        token: coinSchema.default("SKY4444"),
        inventory: z.number().int().min(1).max(100000).default(1),
        imageUrl: z.string().url().optional().or(z.literal("")),
        escrowRequired: z.boolean().default(true),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Database is required for marketplace listings." });

      const [created] = await db.insert(marketplaceListings).values({
        sellerId: ctx.user.id,
        title: input.title,
        description: input.description,
        category: input.category,
        price: input.price.toFixed(8),
        token: input.token,
        inventory: input.inventory,
        imageUrl: input.imageUrl || null,
        escrowRequired: input.escrowRequired ? 1 : 0,
        status: "live",
      }).$returningId();

      return { success: true, id: created.id };
    }),

  purchaseListing: protectedProcedure
    .input(
      z.object({
        listingId: z.number().int().positive(),
        quantity: z.number().int().min(1).max(100).default(1),
        shippingName: z.string().max(180).optional(),
        shippingAddress: z.string().max(2000).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Database is required for marketplace checkout." });

      const [listing] = await db.select().from(marketplaceListings).where(eq(marketplaceListings.id, input.listingId)).limit(1);
      if (!listing || listing.status !== "live") throw new TRPCError({ code: "NOT_FOUND", message: "Marketplace listing is not available." });
      if (listing.sellerId === ctx.user.id) throw new TRPCError({ code: "BAD_REQUEST", message: "You cannot buy your own listing." });
      if (listing.inventory < input.quantity) throw new TRPCError({ code: "BAD_REQUEST", message: "Insufficient listing inventory." });

      const amount = Number(listing.price) * input.quantity;
      const escrow = await multiCoinService.createEscrow(ctx, listing.sellerId, listing.token as Coin, amount, `Marketplace escrow for ${listing.title}`);
      const escrowId = typeof escrow.escrow?.id === "number" ? escrow.escrow.id : undefined;

      const [order] = await db.transaction(async (tx) => {
        await tx
          .update(marketplaceListings)
          .set({ inventory: sql`${marketplaceListings.inventory} - ${input.quantity}`, status: listing.inventory === input.quantity ? "sold" : "live" })
          .where(eq(marketplaceListings.id, listing.id));

        await tx.insert(marketplaceOrders).values({
          listingId: listing.id,
          buyerId: ctx.user.id,
          sellerId: listing.sellerId,
          escrowId,
          token: listing.token,
          amount: amount.toFixed(8),
          quantity: input.quantity,
          status: "held",
          shippingName: input.shippingName,
          shippingAddress: input.shippingAddress,
        });

        return tx.select().from(marketplaceOrders).where(eq(marketplaceOrders.buyerId, ctx.user.id)).orderBy(desc(marketplaceOrders.createdAt)).limit(1);
      });

      return { success: true, order, escrow: escrow.escrow, betaNotice: "Funds are held in the database-backed beta escrow ledger until admin or seller workflow release." };
    }),

  myOrders: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];
    return db
      .select()
      .from(marketplaceOrders)
      .where(or(eq(marketplaceOrders.buyerId, ctx.user.id), eq(marketplaceOrders.sellerId, ctx.user.id)))
      .orderBy(desc(marketplaceOrders.createdAt))
      .limit(50);
  }),

  adminUpdateOrderStatus: adminProcedure
    .input(
      z.object({
        orderId: z.number().int().positive(),
        status: z.enum(["created", "held", "released", "refunded", "disputed", "cancelled"]),
      }),
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Database is required for marketplace admin controls." });
      await db.update(marketplaceOrders).set({ status: input.status }).where(eq(marketplaceOrders.id, input.orderId));
      return { success: true };
    }),
});
