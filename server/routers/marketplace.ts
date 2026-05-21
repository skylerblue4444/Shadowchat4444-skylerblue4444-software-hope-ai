import { z } from "zod";
import { db } from "../db";
import { marketplaceListings, marketplaceOrders, users } from "@/drizzle/schema";
import { eq, and } from "drizzle-orm";
import { protectedProcedure, router } from "../_core/trpc";

export const marketplaceRouter = router({
  // Create listing
  createListing: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string().optional(),
        price: z.string(),
        currency: z.string().default("SKY"),
        category: z.string().optional(),
        images: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await db.insert(marketplaceListings).values({
        sellerId: ctx.user.id,
        title: input.title,
        description: input.description,
        price: input.price,
        currency: input.currency,
        category: input.category,
        images: input.images ? JSON.stringify(input.images) : null,
        status: "active",
      });
    }),

  // Get all active listings
  getListings: protectedProcedure
    .input(
      z.object({
        category: z.string().optional(),
        limit: z.number().default(20),
        offset: z.number().default(0),
      })
    )
    .query(async ({ input }) => {
      let query = db
        .select()
        .from(marketplaceListings)
        .where(eq(marketplaceListings.status, "active"));

      if (input.category) {
        query = query.where(eq(marketplaceListings.category, input.category));
      }

      const listings = await query.limit(input.limit).offset(input.offset);

      return listings.map((l) => ({
        ...l,
        images: l.images ? JSON.parse(l.images) : [],
      }));
    }),

  // Get seller's listings
  getSellerListings: protectedProcedure.query(async ({ ctx }) => {
    const listings = await db
      .select()
      .from(marketplaceListings)
      .where(eq(marketplaceListings.sellerId, ctx.user.id));

    return listings.map((l) => ({
      ...l,
      images: l.images ? JSON.parse(l.images) : [],
    }));
  }),

  // Update listing
  updateListing: protectedProcedure
    .input(
      z.object({
        listingId: z.number(),
        title: z.string().optional(),
        description: z.string().optional(),
        price: z.string().optional(),
        status: z.enum(["active", "sold", "delisted"]).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Verify ownership
      const listing = await db
        .select()
        .from(marketplaceListings)
        .where(eq(marketplaceListings.id, input.listingId))
        .limit(1);

      if (listing.length === 0 || listing[0].sellerId !== ctx.user.id) {
        return { error: "Unauthorized" };
      }

      return await db
        .update(marketplaceListings)
        .set({
          title: input.title,
          description: input.description,
          price: input.price,
          status: input.status,
          updatedAt: new Date(),
        })
        .where(eq(marketplaceListings.id, input.listingId));
    }),

  // Create order (initiate purchase with escrow)
  createOrder: protectedProcedure
    .input(
      z.object({
        listingId: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const listing = await db
        .select()
        .from(marketplaceListings)
        .where(eq(marketplaceListings.id, input.listingId))
        .limit(1);

      if (listing.length === 0) {
        return { error: "Listing not found" };
      }

      const order = await db.insert(marketplaceOrders).values({
        listingId: input.listingId,
        buyerId: ctx.user.id,
        sellerId: listing[0].sellerId,
        amount: listing[0].price,
        escrowStatus: "pending",
        status: "pending",
      });

      return order;
    }),

  // Get buyer's orders
  getBuyerOrders: protectedProcedure.query(async ({ ctx }) => {
    const orders = await db
      .select()
      .from(marketplaceOrders)
      .where(eq(marketplaceOrders.buyerId, ctx.user.id));

    return orders;
  }),

  // Get seller's orders
  getSellerOrders: protectedProcedure.query(async ({ ctx }) => {
    const orders = await db
      .select()
      .from(marketplaceOrders)
      .where(eq(marketplaceOrders.sellerId, ctx.user.id));

    return orders;
  }),

  // Release escrow (seller confirms delivery)
  releaseEscrow: protectedProcedure
    .input(z.object({ orderId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const order = await db
        .select()
        .from(marketplaceOrders)
        .where(eq(marketplaceOrders.id, input.orderId))
        .limit(1);

      if (order.length === 0 || order[0].sellerId !== ctx.user.id) {
        return { error: "Unauthorized" };
      }

      return await db
        .update(marketplaceOrders)
        .set({
          escrowStatus: "released",
          status: "completed",
          updatedAt: new Date(),
        })
        .where(eq(marketplaceOrders.id, input.orderId));
    }),

  // Refund escrow (buyer or admin)
  refundEscrow: protectedProcedure
    .input(z.object({ orderId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const order = await db
        .select()
        .from(marketplaceOrders)
        .where(eq(marketplaceOrders.id, input.orderId))
        .limit(1);

      if (order.length === 0 || order[0].buyerId !== ctx.user.id) {
        return { error: "Unauthorized" };
      }

      return await db
        .update(marketplaceOrders)
        .set({
          escrowStatus: "refunded",
          status: "cancelled",
          updatedAt: new Date(),
        })
        .where(eq(marketplaceOrders.id, input.orderId));
    }),
});
