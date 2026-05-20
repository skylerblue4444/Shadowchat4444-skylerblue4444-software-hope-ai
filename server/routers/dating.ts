import { and, desc, eq, ne, or } from "drizzle-orm";
import { z } from "zod";
import { datingActions, datingProfiles } from "../../drizzle/schema";
import { protectedProcedure, router, TRPCError } from "../_core/trpc";
import { getDb } from "../db";

const datingActionSchema = z.enum(["like", "pass", "superlike", "block"]);

const demoProfiles = [
  {
    id: 1,
    userId: 101,
    displayName: "Ari Nova",
    age: 27,
    location: "Miami / Web3 Events",
    bio: "Creator, livestream host, and marketplace seller looking for high-vibe matches and collaborations.",
    interests: JSON.stringify(["crypto", "music", "travel", "founders"]),
    seeking: "dating, creator collabs, live co-hosts",
    avatarUrl: null,
    compatibilityScore: 94,
    isVisible: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    userId: 102,
    displayName: "Kai Shadow",
    age: 31,
    location: "Atlanta / Global",
    bio: "Builder of privacy-first social tools, Shadow Coin collector, and late-night livestream regular.",
    interests: JSON.stringify(["privacy", "fitness", "marketplace", "livestream"]),
    seeking: "serious dating, social trading partners",
    avatarUrl: null,
    compatibilityScore: 88,
    isVisible: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const datingRouter = router({
  getMyProfile: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return null;
    const [profile] = await db.select().from(datingProfiles).where(eq(datingProfiles.userId, ctx.user.id)).limit(1);
    return profile ?? null;
  }),

  upsertProfile: protectedProcedure
    .input(
      z.object({
        displayName: z.string().min(2).max(120),
        age: z.number().int().min(18).max(120),
        location: z.string().min(2).max(160),
        bio: z.string().min(10).max(2000),
        interests: z.array(z.string().min(1).max(40)).min(1).max(12),
        seeking: z.string().min(2).max(120).default("networking, dating, creator collabs"),
        avatarUrl: z.string().url().optional().or(z.literal("")),
        isVisible: z.boolean().default(true),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Database is required for dating profiles." });

      const values = {
        userId: ctx.user.id,
        displayName: input.displayName,
        age: input.age,
        location: input.location,
        bio: input.bio,
        interests: JSON.stringify(input.interests),
        seeking: input.seeking,
        avatarUrl: input.avatarUrl || null,
        isVisible: input.isVisible ? 1 : 0,
        compatibilityScore: Math.min(99, 72 + input.interests.length * 3),
      };

      const [existing] = await db.select({ id: datingProfiles.id }).from(datingProfiles).where(eq(datingProfiles.userId, ctx.user.id)).limit(1);
      if (existing) {
        await db.update(datingProfiles).set(values).where(eq(datingProfiles.id, existing.id));
        return { success: true, mode: "updated" as const };
      }

      const [created] = await db.insert(datingProfiles).values(values).$returningId();
      return { success: true, mode: "created" as const, id: created.id };
    }),

  discover: protectedProcedure
    .input(z.object({ limit: z.number().int().min(1).max(50).default(12) }).optional())
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return demoProfiles.slice(0, input?.limit ?? 12);
      return db
        .select()
        .from(datingProfiles)
        .where(and(eq(datingProfiles.isVisible, 1), ne(datingProfiles.userId, ctx.user.id)))
        .orderBy(desc(datingProfiles.compatibilityScore), desc(datingProfiles.updatedAt))
        .limit(input?.limit ?? 12);
    }),

  react: protectedProcedure
    .input(
      z.object({
        targetUserId: z.number().int().positive(),
        action: datingActionSchema,
        message: z.string().max(500).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (input.targetUserId === ctx.user.id) throw new TRPCError({ code: "BAD_REQUEST", message: "You cannot react to your own profile." });
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Database is required for dating reactions." });

      await db.insert(datingActions).values({
        actorId: ctx.user.id,
        targetId: input.targetUserId,
        action: input.action,
        message: input.message,
      });

      const [reciprocal] = await db
        .select({ id: datingActions.id })
        .from(datingActions)
        .where(
          and(
            eq(datingActions.actorId, input.targetUserId),
            eq(datingActions.targetId, ctx.user.id),
            or(eq(datingActions.action, "like"), eq(datingActions.action, "superlike")),
          ),
        )
        .limit(1);

      return { success: true, matched: Boolean(reciprocal && ["like", "superlike"].includes(input.action)) };
    }),

  getMatches: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];
    const outgoing = await db
      .select()
      .from(datingActions)
      .where(and(eq(datingActions.actorId, ctx.user.id), or(eq(datingActions.action, "like"), eq(datingActions.action, "superlike"))))
      .orderBy(desc(datingActions.createdAt))
      .limit(50);

    const reciprocal = await db
      .select()
      .from(datingActions)
      .where(and(eq(datingActions.targetId, ctx.user.id), or(eq(datingActions.action, "like"), eq(datingActions.action, "superlike"))))
      .limit(50);

    const reciprocalActors = new Set(reciprocal.map((item) => item.actorId));
    return outgoing.filter((item) => reciprocalActors.has(item.targetId));
  }),
});
