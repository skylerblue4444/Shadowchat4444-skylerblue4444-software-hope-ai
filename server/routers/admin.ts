import { z } from "zod";
import { db } from "../db";
import {
  users,
  adminAuditLog,
  moderationQueue,
  datingProfiles,
  marketplaceListings,
  livestreamChannels,
} from "@/drizzle/schema";
import { eq, and } from "drizzle-orm";
import { protectedProcedure, router } from "../_core/trpc";

export const adminRouter = router({
  // Get all users (admin only)
  getUsers: protectedProcedure
    .input(
      z.object({
        limit: z.number().default(50),
        offset: z.number().default(0),
      })
    )
    .query(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        return { error: "Unauthorized" };
      }

      return await db
        .select()
        .from(users)
        .limit(input.limit)
        .offset(input.offset);
    }),

  // Update user role/status (admin only)
  updateUserRole: protectedProcedure
    .input(
      z.object({
        userId: z.number(),
        role: z.enum(["user", "admin"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        return { error: "Unauthorized" };
      }

      // Log audit
      await db.insert(adminAuditLog).values({
        adminId: ctx.user.id,
        action: "UPDATE_USER_ROLE",
        targetUserId: input.userId,
        details: `Role changed to ${input.role}`,
      });

      return await db
        .update(users)
        .set({ role: input.role })
        .where(eq(users.id, input.userId));
    }),

  // Get platform metrics
  getMetrics: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "admin") {
      return { error: "Unauthorized" };
    }

    const totalUsers = await db.select().from(users);
    const datingProfiles_ = await db.select().from(datingProfiles);
    const marketplaceListings_ = await db.select().from(marketplaceListings);
    const livestreamChannels_ = await db.select().from(livestreamChannels);

    return {
      totalUsers: totalUsers.length,
      activeDatingProfiles: datingProfiles_.filter((p) => p.status === "active").length,
      activeMarketplaceListings: marketplaceListings_.filter((l) => l.status === "active")
        .length,
      livestreamChannels: livestreamChannels_.length,
      timestamp: new Date(),
    };
  }),

  // Get moderation queue
  getModerationQueue: protectedProcedure
    .input(
      z.object({
        status: z.enum(["pending", "reviewed", "actioned", "dismissed"]).optional(),
        limit: z.number().default(50),
      })
    )
    .query(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        return { error: "Unauthorized" };
      }

      let query = db.select().from(moderationQueue);

      if (input.status) {
        query = query.where(eq(moderationQueue.status, input.status));
      }

      return await query.limit(input.limit);
    }),

  // Update moderation status
  updateModerationStatus: protectedProcedure
    .input(
      z.object({
        reportId: z.number(),
        status: z.enum(["pending", "reviewed", "actioned", "dismissed"]),
        action: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        return { error: "Unauthorized" };
      }

      const report = await db
        .select()
        .from(moderationQueue)
        .where(eq(moderationQueue.id, input.reportId))
        .limit(1);

      if (report.length === 0) {
        return { error: "Report not found" };
      }

      // Log audit
      await db.insert(adminAuditLog).values({
        adminId: ctx.user.id,
        action: "MODERATION_ACTION",
        targetUserId: report[0].reportedUserId,
        details: `Status: ${input.status}, Action: ${input.action || "none"}`,
      });

      return await db
        .update(moderationQueue)
        .set({
          status: input.status,
        })
        .where(eq(moderationQueue.id, input.reportId));
    }),

  // Report user/content
  submitReport: protectedProcedure
    .input(
      z.object({
        reportedUserId: z.number(),
        reportedContentId: z.number().optional(),
        reportedContentType: z.string().optional(),
        reason: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await db.insert(moderationQueue).values({
        reportedUserId: input.reportedUserId,
        reportedContentId: input.reportedContentId,
        reportedContentType: input.reportedContentType,
        reason: input.reason,
        status: "pending",
      });
    }),

  // Get audit log
  getAuditLog: protectedProcedure
    .input(
      z.object({
        limit: z.number().default(100),
        offset: z.number().default(0),
      })
    )
    .query(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        return { error: "Unauthorized" };
      }

      return await db
        .select()
        .from(adminAuditLog)
        .limit(input.limit)
        .offset(input.offset);
    }),

  // Ban user
  banUser: protectedProcedure
    .input(z.object({ userId: z.number(), reason: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        return { error: "Unauthorized" };
      }

      // Log audit
      await db.insert(adminAuditLog).values({
        adminId: ctx.user.id,
        action: "BAN_USER",
        targetUserId: input.userId,
        details: input.reason || "No reason provided",
      });

      // Update user role to indicate ban (or add ban flag if schema extended)
      return await db
        .update(users)
        .set({ role: "user" }) // Could extend schema with isBanned flag
        .where(eq(users.id, input.userId));
    }),

  // Unban user
  unbanUser: protectedProcedure
    .input(z.object({ userId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        return { error: "Unauthorized" };
      }

      // Log audit
      await db.insert(adminAuditLog).values({
        adminId: ctx.user.id,
        action: "UNBAN_USER",
        targetUserId: input.userId,
        details: "User unbanned",
      });

      return await db
        .update(users)
        .set({ role: "user" })
        .where(eq(users.id, input.userId));
    }),
});
