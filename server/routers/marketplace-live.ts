import { and, desc, eq, like, or, sql } from "drizzle-orm";
import { z } from "zod";
import { marketplaceListings, marketplaceOrders } from "../../drizzle/schema";
import { adminProcedure, protectedProcedure, publicProcedure, router, TRPCError } from "../_core/trpc";
import { getDb } from "../db";
import { multiCoinService, supportedCoins, type Coin } from "../lib/multi-coin";
import {
  createSupplierOrderRequest,
  getSupplierProviderStatus,
  importSupplierCatalogRows,
  listSupplierCatalog,
  listSupplierOrderRequests,
  supplierProviders,
  syncSupplierProviderCatalog,
  updateSupplierOrderRequestStatus,
} from "../lib/supplier-marketplace";

const coinSchema = z.enum(supportedCoins);

const demoListings = [
  {
    id: 444,
    sellerId: 1,
    title: "SkyLux VIP Creator Pass",
    description: "AI seed listing inspired by high-demand creator memberships: unlocks beta livestream rooms, profile boosts, and premium creator drops without copying any third-party marketplace listing.",
    category: "creator-tools",
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
    id: 445,
    sellerId: 1,
    title: "AI Dropship Starter Research Pack",
    description: "Private-safe seed content modeled on broad wholesale categories like phone accessories, beauty gadgets, LED home goods, and fitness micro-products; includes trend notes for creators.",
    category: "commerce-intel",
    price: "88",
    token: "USDT",
    inventory: 120,
    status: "live",
    imageUrl: null,
    escrowRequired: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 446,
    sellerId: 1,
    title: "Creator Ring Light + Stream Kit Blueprint",
    description: "Beta marketplace seed item for livestream sellers: a virtual kit blueprint covering lighting, tripod, mic, overlays, and product-pin strategy for first creators.",
    category: "streaming",
    price: "39",
    token: "SKY4444",
    inventory: 90,
    status: "live",
    imageUrl: null,
    escrowRequired: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 447,
    sellerId: 1,
    title: "Smart Wallet NFC Merch Concept",
    description: "AI-generated product concept for Web3 creators selling NFC-enabled merch, private fan links, digital certificates, and on-platform crypto tips.",
    category: "web3-merch",
    price: "64",
    token: "SKY4444",
    inventory: 75,
    status: "live",
    imageUrl: null,
    escrowRequired: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 448,
    sellerId: 1,
    title: "Beauty Tech Viral Bundle Mock Drop",
    description: "Seed listing based on broad market categories such as LED mirrors, skin-care tools, and portable organizers; designed to make the marketplace feel alive for first beta users.",
    category: "beauty-tech",
    price: "52",
    token: "USDT",
    inventory: 60,
    status: "live",
    imageUrl: null,
    escrowRequired: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 449,
    sellerId: 1,
    title: "Mini Drone Creator Shot Pack",
    description: "AI seed product for creators who want aerial-style content prompts, shot lists, affiliate captions, and marketplace bundle templates.",
    category: "creator-electronics",
    price: "144",
    token: "SKY4444",
    inventory: 32,
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
    description: "Beta education bundle for privacy-first wallet hygiene, social marketplace listings, creator safety, and private Web3 checkout readiness.",
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
  supplierProviderStatus: publicProcedure.query(async () => getSupplierProviderStatus()),

  listSupplierCatalog: publicProcedure
    .input(
      z
        .object({
          search: z.string().max(120).optional(),
          category: z.string().max(80).optional(),
          limit: z.number().int().min(1).max(100).default(48),
        })
        .optional(),
    )
    .query(async ({ input }) => listSupplierCatalog(input)),

  adminImportSupplierCatalog: adminProcedure
    .input(
      z.object({
        rows: z.array(
          z.object({
            provider: z.enum(supplierProviders).default("admin_import"),
            externalId: z.string().max(180).optional(),
            title: z.string().min(3).max(220),
            description: z.string().max(5000).optional(),
            category: z.string().max(80).optional(),
            supplierName: z.string().max(180).optional(),
            supplierCountry: z.string().max(80).optional(),
            sourceUrl: z.string().url().optional().or(z.literal("")),
            imageUrls: z.array(z.string().url()).max(12).optional(),
            reviewSummary: z.union([z.record(z.string(), z.unknown()), z.array(z.record(z.string(), z.unknown()))]).optional(),
            specs: z.record(z.string(), z.unknown()).optional(),
            price: z.number().positive(),
            compareAtPrice: z.number().positive().optional(),
            currency: z.string().max(12).default("USD"),
            serviceFee: z.number().min(0).default(44),
            marginPercent: z.number().min(0).max(95).default(18),
            rating: z.number().min(0).max(5).optional(),
            reviewCount: z.number().int().min(0).default(0),
            soldCount: z.number().int().min(0).default(0),
            minOrder: z.number().int().min(1).default(1),
            shippingSummary: z.string().max(180).optional(),
            shippingDays: z.string().max(80).optional(),
            providerStatus: z.enum(["live_api", "admin_import", "curated_seed", "needs_review", "paused", "removed"]).default("admin_import"),
            reviewStatus: z.enum(["queued", "approved", "rejected"]).default("approved"),
          }),
        ).min(1).max(100),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await importSupplierCatalogRows(ctx.user.id, input.rows.map((row) => ({ ...row, sourceUrl: row.sourceUrl || undefined })));
      } catch (error) {
        throw new TRPCError({ code: "PRECONDITION_FAILED", message: error instanceof Error ? error.message : "Supplier catalog import failed." });
      }
    }),

  adminSyncSupplierProvider: adminProcedure
    .input(z.object({ provider: z.enum(["dhgate", "alibaba"]), query: z.string().min(2).max(120).default("popular products") }))
    .mutation(async ({ ctx, input }) => {
      try {
        return await syncSupplierProviderCatalog(input.provider, input.query, ctx.user.id);
      } catch (error) {
        throw new TRPCError({ code: "PRECONDITION_FAILED", message: error instanceof Error ? error.message : "Supplier API sync failed." });
      }
    }),

  createSupplierOrderRequest: protectedProcedure
    .input(
      z.object({
        items: z.array(
          z.object({
            catalogItemId: z.number().int().positive().optional(),
            title: z.string().min(2).max(220),
            provider: z.enum(["dhgate", "alibaba", "admin_import", "private_supplier", "mixed"]).optional(),
            price: z.number().min(0),
            quantity: z.number().int().min(1).max(500),
            imageUrl: z.string().url().optional().or(z.literal("")),
            supplierName: z.string().max(180).optional(),
          }),
        ).min(1).max(50),
        serviceFee: z.number().min(0).default(44),
        shippingName: z.string().max(180).optional(),
        shippingAddress: z.string().max(2000).optional(),
        buyerNote: z.string().max(2000).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await createSupplierOrderRequest(ctx.user.id, { ...input, items: input.items.map((item) => ({ ...item, imageUrl: item.imageUrl || undefined })) });
      } catch (error) {
        throw new TRPCError({ code: "PRECONDITION_FAILED", message: error instanceof Error ? error.message : "Supplier order request failed." });
      }
    }),

  mySupplierOrderRequests: protectedProcedure.query(async ({ ctx }) => listSupplierOrderRequests({ userId: ctx.user.id, limit: 25 })),

  adminSupplierOrderRequests: adminProcedure
    .input(z.object({ limit: z.number().int().min(1).max(100).default(50) }).optional())
    .query(async ({ input }) => listSupplierOrderRequests({ limit: input?.limit ?? 50 })),

  adminUpdateSupplierOrderRequest: adminProcedure
    .input(
      z.object({
        orderId: z.number().int().positive(),
        orderStatus: z.enum(["queued", "admin_review", "approved", "provider_submitted", "fulfilled", "rejected", "cancelled"]),
        paymentStatus: z.enum(["not_charged", "quote_sent", "held", "paid", "refunded"]).optional(),
        adminNote: z.string().max(2000).optional(),
      }),
    )
    .mutation(async ({ input }) => updateSupplierOrderRequestStatus(input)),

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

      const rows = await db
        .select()
        .from(marketplaceListings)
        .where(and(...filters))
        .orderBy(desc(marketplaceListings.updatedAt))
        .limit(input?.limit ?? 24);
      return rows.length ? rows : demoListings.slice(0, input?.limit ?? 24);
    }),

  seedBetaListings: protectedProcedure.mutation(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Database is required for marketplace seed generation." });
    const created: number[] = [];
    for (const listing of demoListings) {
      const [row] = await db.insert(marketplaceListings).values({
        sellerId: ctx.user.id,
        title: listing.title,
        description: `${listing.description}\n\nSeeded by SkyCoin4444 AI so the private beta is not empty for first users. Replace with verified seller inventory before public launch.`,
        category: listing.category,
        price: listing.price,
        token: listing.token,
        inventory: listing.inventory,
        imageUrl: listing.imageUrl,
        escrowRequired: listing.escrowRequired,
        status: "live",
      }).$returningId();
      created.push(row.id);
    }
    return { success: true, created, count: created.length, betaNotice: "Created private-safe AI marketplace seed listings; no protected third-party listing copy was used." };
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
