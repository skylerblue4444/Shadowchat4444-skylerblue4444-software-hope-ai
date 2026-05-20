import { and, desc, eq, sql } from "drizzle-orm";
import { z } from "zod";
import { feedInteractions, liveStreams, posts } from "../../drizzle/schema";
import { protectedProcedure, publicProcedure, router, TRPCError } from "../_core/trpc";
import { createPost, getFeedPosts } from "../db";
import { getDb } from "../db";
import { multiCoinService, supportedCoins, type Coin } from "../lib/multi-coin";

const coinSchema = z.enum(supportedCoins);

const demoStreams = [
  {
    id: 1,
    hostId: 1,
    title: "SKYCOIN4444 After Dark",
    topic: "Dating marketplace launch, creator drops, and beta wallet tipping.",
    channelType: "livestream",
    streamUrl: null,
    thumbnailUrl: null,
    viewerCount: 4444,
    tipPool: "4444",
    status: "live",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    hostId: 1,
    title: "Shadow Coin Privacy Lounge",
    topic: "YouTube-style creator feed, private marketplace safety, and creator monetization.",
    channelType: "youtube",
    streamUrl: "https://youtube.com/@skycoin4444",
    thumbnailUrl: null,
    viewerCount: 777,
    tipPool: "777",
    status: "scheduled",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
] as const;

function decoratePostContent(input: { kind: string; title?: string; content: string; mediaUrl?: string }) {
  const header = input.title ? `[${input.kind.toUpperCase()}] ${input.title}` : `[${input.kind.toUpperCase()}]`;
  const media = input.mediaUrl ? `\n\nMedia: ${input.mediaUrl}` : "";
  return `${header}\n\n${input.content}${media}`;
}

export const liveSocialRouter = router({
  listStreams: publicProcedure
    .input(z.object({ status: z.enum(["scheduled", "live", "ended", "flagged", "all"]).default("all"), limit: z.number().int().min(1).max(50).default(12) }).optional())
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return demoStreams.filter((stream) => !input?.status || input.status === "all" || stream.status === input.status).slice(0, input?.limit ?? 12);
      const query = db.select().from(liveStreams);
      if (input?.status && input.status !== "all") {
        return query.where(eq(liveStreams.status, input.status)).orderBy(desc(liveStreams.updatedAt)).limit(input.limit);
      }
      return query.orderBy(desc(liveStreams.updatedAt)).limit(input?.limit ?? 12);
    }),

  startStream: protectedProcedure
    .input(
      z.object({
        title: z.string().min(3).max(180),
        topic: z.string().min(10).max(2000),
        channelType: z.enum(["livestream", "youtube", "audio"]).default("livestream"),
        streamUrl: z.string().url().optional().or(z.literal("")),
        thumbnailUrl: z.string().url().optional().or(z.literal("")),
        goLiveNow: z.boolean().default(true),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Database is required for livestream hosting." });

      const [created] = await db.insert(liveStreams).values({
        hostId: ctx.user.id,
        title: input.title,
        topic: input.topic,
        channelType: input.channelType,
        streamUrl: input.streamUrl || null,
        thumbnailUrl: input.thumbnailUrl || null,
        status: input.goLiveNow ? "live" : "scheduled",
        viewerCount: input.goLiveNow ? 1 : 0,
      }).$returningId();

      return { success: true, id: created.id };
    }),

  endStream: protectedProcedure.input(z.object({ streamId: z.number().int().positive() })).mutation(async ({ ctx, input }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Database is required for livestream controls." });
    await db.update(liveStreams).set({ status: "ended" }).where(and(eq(liveStreams.id, input.streamId), eq(liveStreams.hostId, ctx.user.id)));
    return { success: true };
  }),

  tipStream: protectedProcedure
    .input(z.object({ streamId: z.number().int().positive(), coin: coinSchema.default("SKY4444"), amount: z.number().positive(), memo: z.string().max(255).optional() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Database is required for livestream tipping." });
      const [stream] = await db.select().from(liveStreams).where(eq(liveStreams.id, input.streamId)).limit(1);
      if (!stream) throw new TRPCError({ code: "NOT_FOUND", message: "Livestream not found." });

      const tip = await multiCoinService.tip(ctx, stream.hostId, input.amount, input.coin as Coin, input.memo ?? `Livestream tip for ${stream.title}`);
      await db.update(liveStreams).set({ tipPool: sql`${liveStreams.tipPool} + ${input.amount.toFixed(8)}` }).where(eq(liveStreams.id, input.streamId));
      return { success: true, tip };
    }),

  createFeedPost: protectedProcedure
    .input(
      z.object({
        kind: z.enum(["profile", "youtube", "livestream", "marketplace", "status"]).default("status"),
        title: z.string().max(180).optional(),
        content: z.string().min(1).max(4000),
        mediaUrl: z.string().url().optional().or(z.literal("")),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const post = await createPost(ctx.user.id, decoratePostContent(input), input.mediaUrl || undefined);
      return { success: true, post };
    }),

  listFeed: publicProcedure
    .input(z.object({ limit: z.number().int().min(1).max(100).default(25), offset: z.number().int().min(0).default(0) }).optional())
    .query(async ({ input }) => getFeedPosts(input?.limit ?? 25, input?.offset ?? 0)),

  interactWithPost: protectedProcedure
    .input(
      z.object({
        postId: z.number().int().positive(),
        type: z.enum(["like", "comment", "share", "tip", "flag"]),
        amount: z.number().min(0).default(0),
        content: z.string().max(1000).optional(),
        coin: coinSchema.default("SKY4444"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Database is required for feed interactions." });
      const [post] = await db.select().from(posts).where(eq(posts.id, input.postId)).limit(1);
      if (!post) throw new TRPCError({ code: "NOT_FOUND", message: "Post not found." });

      if (input.type === "tip") {
        if (!input.amount || input.amount <= 0) throw new TRPCError({ code: "BAD_REQUEST", message: "Tip amount must be positive." });
        await multiCoinService.tip(ctx, post.userId, input.amount, input.coin as Coin, input.content ?? "Profile feed creator tip");
      }

      await db.transaction(async (tx) => {
        await tx.insert(feedInteractions).values({
          userId: ctx.user.id,
          postId: input.postId,
          type: input.type,
          amount: input.amount.toFixed(8),
          content: input.content,
        });

        const patch =
          input.type === "like"
            ? { likes: sql`${posts.likes} + 1` }
            : input.type === "share"
              ? { shares: sql`${posts.shares} + 1` }
              : input.type === "comment"
                ? { replies: sql`${posts.replies} + 1` }
                : input.type === "tip"
                  ? { tips: sql`${posts.tips} + ${Math.round(input.amount)}` }
                  : { aiRank: sql`${posts.aiRank} - 10`, sentiment: "flagged" };

        await tx.update(posts).set(patch).where(eq(posts.id, input.postId));
      });

      return { success: true };
    }),
});
