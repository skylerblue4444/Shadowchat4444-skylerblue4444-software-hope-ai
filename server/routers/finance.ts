import { z } from "zod";
import { desc, eq } from "drizzle-orm";
import { router, protectedProcedure } from "../_core/trpc";
import { getDb } from "../db";
import { financialAccounts, financialEvents } from "../../drizzle/schema";

const accountTypeSchema = z.enum(["cash", "bank", "card", "crypto", "investment", "loan", "other"]);
const eventTypeSchema = z.enum(["income", "expense", "transfer", "trade", "tip", "payment", "adjustment"]);

function asNumber(value: string | null | undefined) {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

export const financeRouter = router({
  addAccount: protectedProcedure
    .input(z.object({
      accountName: z.string().min(1).max(255),
      accountType: accountTypeSchema.default("cash"),
      provider: z.string().max(64).default("manual"),
      maskedIdentifier: z.string().max(64).optional(),
      balance: z.string().default("0"),
      currency: z.string().max(12).default("USD"),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return { success: false, reason: "Database is not configured." };
      await db.insert(financialAccounts).values({ userId: ctx.user.id, ...input, status: "active" });
      return { success: true };
    }),

  listAccounts: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) {
      return [
        { id: 0, userId: ctx.user.id, provider: "demo", accountName: "Demo Cash", accountType: "cash", maskedIdentifier: "DEMO", balance: "10000", currency: "USD", status: "active" },
      ];
    }
    return db.select().from(financialAccounts).where(eq(financialAccounts.userId, ctx.user.id)).orderBy(desc(financialAccounts.updatedAt));
  }),

  recordEvent: protectedProcedure
    .input(z.object({
      accountId: z.number().int().positive().optional(),
      eventType: eventTypeSchema,
      amount: z.string().min(1).max(50),
      currency: z.string().max(12).default("USD"),
      category: z.string().max(80).default("general"),
      note: z.string().max(2000).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return { success: false, reason: "Database is not configured." };
      await db.insert(financialEvents).values({ userId: ctx.user.id, ...input });
      return { success: true };
    }),

  listEvents: protectedProcedure
    .input(z.object({ limit: z.number().min(1).max(100).default(50) }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return [];
      return db
        .select()
        .from(financialEvents)
        .where(eq(financialEvents.userId, ctx.user.id))
        .orderBy(desc(financialEvents.occurredAt))
        .limit(input.limit);
    }),

  summary: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) {
      return { totalAssets: 10000, totalLiabilities: 0, netWorth: 10000, monthlyCashFlow: 0, currency: "USD", demo: true };
    }

    const [accounts, events] = await Promise.all([
      db.select().from(financialAccounts).where(eq(financialAccounts.userId, ctx.user.id)),
      db.select().from(financialEvents).where(eq(financialEvents.userId, ctx.user.id)).limit(250),
    ]);

    const totalAssets = accounts
      .filter((account) => account.accountType !== "loan" && account.status === "active")
      .reduce((sum, account) => sum + asNumber(account.balance), 0);
    const totalLiabilities = accounts
      .filter((account) => account.accountType === "loan" && account.status === "active")
      .reduce((sum, account) => sum + Math.abs(asNumber(account.balance)), 0);
    const monthlyCashFlow = events.reduce((sum, event) => {
      const amount = asNumber(event.amount);
      if (event.eventType === "income") return sum + amount;
      if (["expense", "payment"].includes(event.eventType)) return sum - amount;
      return sum;
    }, 0);

    return {
      totalAssets,
      totalLiabilities,
      netWorth: totalAssets - totalLiabilities,
      monthlyCashFlow,
      currency: accounts[0]?.currency ?? "USD",
      demo: false,
    };
  }),
});
