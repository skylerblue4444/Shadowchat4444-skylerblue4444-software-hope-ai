import { z } from "zod";
import { db } from "../db";
import {
  livestreamChannels,
  livestreamPosts,
  livestreamComments,
  users,
} from "@/drizzle/schema";
import { eq, and } from "drizzle-orm";
import { protectedProcedure, router } from "../_core/trpc";

export const livestreamRouter = router({
  // Create or update creator channel
  upsertChannel: protectedProcedure
    .input(
      z.object({
        channelName: z.string(),
        description: z.string().optional(),
        youtubeUrl: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const existing = await db
        .select()
        .from(livestreamChannels)
        .where(eq(livestreamChannels.creatorId, ctx.user.id))
        .limit(1);

      if (existing.length > 0) {
        return await db
          .update(livestreamChannels)
          .set({
            channelName: input.channelName,
            description: input.description,
            youtubeUrl: input.youtubeUrl,
            updatedAt: new Date(),
          })
          .where(eq(livestreamChannels.creatorId, ctx.user.id));
      } else {
        return await db.insert(livestreamChannels).values({
          creatorId: ctx.user.id,
          channelName: input.channelName,
          description: input.description,
          youtubeUrl: input.youtubeUrl,
        });
      }
    }),

  // Get creator's channel
  getChannel: protectedProcedure.query(async ({ ctx }) => {
    const channel = await db
      .select()
      .from(livestreamChannels)
      .where(eq(livestreamChannels.creatorId, ctx.user.id))
      .limit(1);

    return channel.length > 0 ? channel[0] : null;
  }),

  // Get all channels (discovery)
  getChannels: protectedProcedure
    .input(z.object({ limit: z.number().default(20), offset: z.number().default(0) }))
    .query(async ({ input }) => {
      return await db
        .select()
        .from(livestreamChannels)
        .limit(input.limit)
        .offset(input.offset);
    }),

  // Toggle live status
  toggleLiveStatus: protectedProcedure
    .input(z.object({ isLive: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      const channel = await db
        .select()
        .from(livestreamChannels)
        .where(eq(livestreamChannels.creatorId, ctx.user.id))
        .limit(1);

      if (channel.length === 0) {
        return { error: "Channel not found" };
      }

      return await db
        .update(livestreamChannels)
        .set({
          isLive: input.isLive ? 1 : 0,
          updatedAt: new Date(),
        })
        .where(eq(livestreamChannels.creatorId, ctx.user.id));
    }),

  // Create feed post
  createPost: protectedProcedure
    .input(
      z.object({
        content: z.string(),
        mediaUrl: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const channel = await db
        .select()
        .from(livestreamChannels)
        .where(eq(livestreamChannels.creatorId, ctx.user.id))
        .limit(1);

      if (channel.length === 0) {
        return { error: "Channel not found" };
      }

      return await db.insert(livestreamPosts).values({
        channelId: channel[0].id,
        creatorId: ctx.user.id,
        content: input.content,
        mediaUrl: input.mediaUrl,
      });
    }),

  // Get channel posts
  getChannelPosts: protectedProcedure
    .input(
      z.object({
        channelId: z.number(),
        limit: z.number().default(20),
        offset: z.number().default(0),
      })
    )
    .query(async ({ input }) => {
      return await db
        .select()
        .from(livestreamPosts)
        .where(eq(livestreamPosts.channelId, input.channelId))
        .limit(input.limit)
        .offset(input.offset);
    }),

  // Get creator's posts
  getCreatorPosts: protectedProcedure.query(async ({ ctx }) => {
    return await db
      .select()
      .from(livestreamPosts)
      .where(eq(livestreamPosts.creatorId, ctx.user.id));
  }),

  // Like post
  likePost: protectedProcedure
    .input(z.object({ postId: z.number() }))
    .mutation(async ({ input }) => {
      const post = await db
        .select()
        .from(livestreamPosts)
        .where(eq(livestreamPosts.id, input.postId))
        .limit(1);

      if (post.length === 0) {
        return { error: "Post not found" };
      }

      return await db
        .update(livestreamPosts)
        .set({ likes: post[0].likes + 1 })
        .where(eq(livestreamPosts.id, input.postId));
    }),

  // Add comment
  addComment: protectedProcedure
    .input(
      z.object({
        postId: z.number(),
        content: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const post = await db
        .select()
        .from(livestreamPosts)
        .where(eq(livestreamPosts.id, input.postId))
        .limit(1);

      if (post.length === 0) {
        return { error: "Post not found" };
      }

      // Insert comment
      await db.insert(livestreamComments).values({
        postId: input.postId,
        userId: ctx.user.id,
        content: input.content,
      });

      // Increment comment count
      return await db
        .update(livestreamPosts)
        .set({ comments: post[0].comments + 1 })
        .where(eq(livestreamPosts.id, input.postId));
    }),

  // Get post comments
  getPostComments: protectedProcedure
    .input(z.object({ postId: z.number() }))
    .query(async ({ input }) => {
      const comments = await db
        .select()
        .from(livestreamComments)
        .where(eq(livestreamComments.postId, input.postId));

      // Enrich with user data
      return await Promise.all(
        comments.map(async (comment) => {
          const user = await db
            .select()
            .from(users)
            .where(eq(users.id, comment.userId))
            .limit(1);

          return {
            ...comment,
            user: user[0] || null,
          };
        })
      );
    }),

  // Share post
  sharePost: protectedProcedure
    .input(z.object({ postId: z.number() }))
    .mutation(async ({ input }) => {
      const post = await db
        .select()
        .from(livestreamPosts)
        .where(eq(livestreamPosts.id, input.postId))
        .limit(1);

      if (post.length === 0) {
        return { error: "Post not found" };
      }

      return await db
        .update(livestreamPosts)
        .set({ shares: post[0].shares + 1 })
        .where(eq(livestreamPosts.id, input.postId));
    }),

  // Tip creator
  tipCreator: protectedProcedure
    .input(
      z.object({
        channelId: z.number(),
        amount: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const channel = await db
        .select()
        .from(livestreamChannels)
        .where(eq(livestreamChannels.id, input.channelId))
        .limit(1);

      if (channel.length === 0) {
        return { error: "Channel not found" };
      }

      const newTotal = (
        parseFloat(channel[0].totalTips) + parseFloat(input.amount)
      ).toString();

      return await db
        .update(livestreamChannels)
        .set({
          totalTips: newTotal,
          updatedAt: new Date(),
        })
        .where(eq(livestreamChannels.id, input.channelId));
    }),
});
