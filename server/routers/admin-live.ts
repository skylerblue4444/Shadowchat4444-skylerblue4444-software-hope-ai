import { desc, eq, like, or } from "drizzle-orm";
import { z } from "zod";
import { adminAuditLogs, datingActions, datingProfiles, escrowTransactions, liveStreams, marketplaceListings, marketplaceOrders, posts, tokenSupplyEvents, transactions, users } from "../../drizzle/schema";
import { adminProcedure, router, TRPCError } from "../_core/trpc";
import { getDb } from "../db";

const roleSchema = z.enum(["user", "creator", "seller", "moderator", "admin", "god"]);
const statusSchema = z.enum(["active", "pending", "suspended", "banned"]);

type AdminPatch = Partial<typeof users.$inferInsert>;

async function writeAudit(actorId: number, action: string, details: unknown, targetUserId?: number) {
  const db = await getDb();
  if (!db) return;
  await db.insert(adminAuditLogs).values({
    actorId,
    targetUserId,
    action,
    details: JSON.stringify(details),
  });
}

export const adminLiveRouter = router({
  overview: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) {
      return {
        users: 0,
        datingProfiles: 0,
        marketplaceListings: 0,
        marketplaceOrders: 0,
        liveStreams: 0,
        feedPosts: 0,
        escrowHolds: 0,
        recentTransactions: [],
        recentSupplyEvents: [],
        betaNotice: "Database not configured; admin overview is in demo-safe mode.",
      };
    }

    const [userRows, profileRows, listingRows, orderRows, streamRows, postRows, escrowRows, recentTransactions, recentSupplyEvents] = await Promise.all([
      db.select({ id: users.id }).from(users).limit(10000),
      db.select({ id: datingProfiles.id }).from(datingProfiles).limit(10000),
      db.select({ id: marketplaceListings.id }).from(marketplaceListings).limit(10000),
      db.select({ id: marketplaceOrders.id }).from(marketplaceOrders).limit(10000),
      db.select({ id: liveStreams.id }).from(liveStreams).limit(10000),
      db.select({ id: posts.id }).from(posts).limit(10000),
      db.select({ id: escrowTransactions.id }).from(escrowTransactions).limit(10000),
      db.select().from(transactions).orderBy(desc(transactions.createdAt)).limit(10),
      db.select().from(tokenSupplyEvents).orderBy(desc(tokenSupplyEvents.createdAt)).limit(10),
    ]);

    return {
      users: userRows.length,
      datingProfiles: profileRows.length,
      marketplaceListings: listingRows.length,
      marketplaceOrders: orderRows.length,
      liveStreams: streamRows.length,
      feedPosts: postRows.length,
      escrowHolds: escrowRows.length,
      recentTransactions,
      recentSupplyEvents,
      betaNotice: "Admin analytics are backed by production database tables while external money movement remains gated.",
    };
  }),

  listUsers: adminProcedure
    .input(z.object({ search: z.string().max(120).optional(), role: roleSchema.optional(), status: statusSchema.optional(), limit: z.number().int().min(1).max(200).default(50) }).optional())
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];
      const filters = [];
      if (input?.role) filters.push(eq(users.role, input.role));
      if (input?.status) filters.push(eq(users.accountStatus, input.status));
      if (input?.search) filters.push(or(like(users.email, `%${input.search}%`), like(users.name, `%${input.search}%`))!);

      const query = db.select().from(users);
      if (filters.length > 0) return query.where(filters.length === 1 ? filters[0] : or(...filters)!).orderBy(desc(users.createdAt)).limit(input?.limit ?? 50);
      return query.orderBy(desc(users.createdAt)).limit(input?.limit ?? 50);
    }),

  updateUserControls: adminProcedure
    .input(
      z.object({
        userId: z.number().int().positive(),
        role: roleSchema.optional(),
        accountStatus: statusSchema.optional(),
        verified: z.boolean().optional(),
        balance: z.string().regex(/^\d+(\.\d{1,8})?$/).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Database is required for admin user controls." });
      const patch: AdminPatch = {};
      if (input.role) patch.role = input.role;
      if (input.accountStatus) patch.accountStatus = input.accountStatus;
      if (typeof input.verified === "boolean") patch.verified = input.verified ? 1 : 0;
      if (input.balance) patch.balance = input.balance;
      if (Object.keys(patch).length === 0) throw new TRPCError({ code: "BAD_REQUEST", message: "No admin update fields supplied." });

      await db.update(users).set(patch).where(eq(users.id, input.userId));
      await writeAudit(ctx.user.id, "user.controls.updated", input, input.userId);
      return { success: true };
    }),

  moderationQueue: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];
    const [flaggedPosts, datingBlocks] = await Promise.all([
      db.select().from(posts).where(eq(posts.sentiment, "flagged")).orderBy(desc(posts.updatedAt)).limit(25),
      db.select().from(datingActions).where(eq(datingActions.action, "block")).orderBy(desc(datingActions.createdAt)).limit(25),
    ]);
    return { flaggedPosts, datingBlocks };
  }),

  auditLog: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];
    return db.select().from(adminAuditLogs).orderBy(desc(adminAuditLogs.createdAt)).limit(100);
  }),
});
