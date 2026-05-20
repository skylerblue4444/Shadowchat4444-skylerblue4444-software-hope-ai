import { desc, eq, sql } from "drizzle-orm";
import { z } from "zod";
import {
  adminAuditLogs,
  datingActions,
  feedInteractions,
  hopeAiActionRuns,
  liveStreams,
  marketplaceListings,
  posts,
} from "../../drizzle/schema";
import { protectedProcedure, router, TRPCError } from "../_core/trpc";
import { getDb } from "../db";
import { multiCoinService, supportedCoins, type Coin } from "../lib/multi-coin";

const marketSchema = z.enum(["usa", "china", "global"]);
const modeSchema = z.enum(["hands_free", "guided", "admin", "market", "companion"]);
const coinSchema = z.enum(supportedCoins);
const quickActionSchema = z.enum([
  "create_feed_post",
  "like_post",
  "comment_post",
  "share_post",
  "tip_creator",
  "publish_listing",
  "start_stream",
  "dating_wave",
  "admin_review",
]);

type Market = z.infer<typeof marketSchema>;
type Mode = z.infer<typeof modeSchema>;
type QuickAction = z.infer<typeof quickActionSchema>;

type PlannedAction = {
  key: QuickAction | "review_metrics" | "localize_offer" | "protect_trust";
  label: string;
  labelZh: string;
  description: string;
  confidence: number;
};

const marketCopy: Record<Market, { name: string; zhName: string; positioning: string; guidance: string[] }> = {
  usa: {
    name: "United States",
    zhName: "美国市场",
    positioning: "Trust-first creator commerce, community dating, livestream monetization, and authenticated beta-wallet utilities.",
    guidance: ["Lead with founder story and trust.", "Use clear beta-wallet disclosures.", "Highlight Hope Campus roots, family mission, and ethical hacker discipline."],
  },
  china: {
    name: "China-ready",
    zhName: "中国市场准备",
    positioning: "Mini-program style discovery, creator storefronts, bilingual profile feeds, and community-first social commerce.",
    guidance: ["Keep copy concise and mobile-first.", "Surface bilingual value statements.", "Emphasize privacy, family value, verified sellers, and community benefit."],
  },
  global: {
    name: "Global",
    zhName: "全球市场",
    positioning: "Hands-free Hope AI orchestration across social, marketplace, livestream, dating, admin, and beta ledger experiences.",
    guidance: ["Recommend one safe next action at a time.", "Log every automated action.", "Keep real-money movement gated behind provider configuration and operator approval."],
  },
};

const defaultPlan: PlannedAction[] = [
  {
    key: "create_feed_post",
    label: "Publish a Hope AI founder-update post",
    labelZh: "发布 Hope AI 创始人动态",
    description: "Turn the current founder story and product progress into a YouTube-style profile-feed update.",
    confidence: 0.94,
  },
  {
    key: "start_stream",
    label: "Open a live Hope AI build room",
    labelZh: "开启 Hope AI 实时构建直播间",
    description: "Create a livestream slot for product demos, community questions, and marketplace announcements.",
    confidence: 0.9,
  },
  {
    key: "publish_listing",
    label: "Publish a service marketplace offer",
    labelZh: "发布服务市场产品",
    description: "List a cybersecurity, full-stack, or Hope AI implementation service with beta escrow support.",
    confidence: 0.88,
  },
  {
    key: "protect_trust",
    label: "Run trust and safety checklist",
    labelZh: "执行信任与安全检查清单",
    description: "Keep live money movement, payment processing, and external transfers behind secure provider configuration.",
    confidence: 0.97,
  },
];

function summarizeIntent(intent: string, market: Market) {
  const trimmed = intent.trim().replace(/\s+/g, " ").slice(0, 160);
  return trimmed || `Hope AI hands-free ${marketCopy[market].name} growth sprint`;
}

function buildPlan(intent: string, market: Market, mode: Mode): PlannedAction[] {
  const base = [...defaultPlan];
  if (market === "china") {
    base.splice(1, 0, {
      key: "localize_offer",
      label: "Add bilingual China-ready positioning",
      labelZh: "添加中英双语市场定位",
      description: "Generate concise bilingual feature copy for social commerce, marketplace, and creator profiles.",
      confidence: 0.91,
    });
  }
  if (mode === "admin") {
    base.push({
      key: "admin_review",
      label: "Queue admin control review",
      labelZh: "加入管理员审核队列",
      description: "Record a moderation, role, and production-readiness review for the current sprint.",
      confidence: 0.86,
    });
  }
  if (/dating|friend|family|community/i.test(intent)) {
    base.push({
      key: "dating_wave",
      label: "Send a respectful connection wave",
      labelZh: "发送尊重式好友互动",
      description: "Use dating/social networking as a community-building action rather than spam automation.",
      confidence: 0.84,
    });
  }
  return base;
}

async function recordAction(input: {
  userId: number;
  mode: Mode;
  market: Market;
  intent: string;
  status?: "planned" | "completed" | "blocked" | "failed";
  actions: unknown;
  resultSummary: string;
  nextSteps?: unknown;
}) {
  const db = await getDb();
  if (!db) return null;

  const [created] = await db
    .insert(hopeAiActionRuns)
    .values({
      userId: input.userId,
      mode: input.mode,
      market: input.market,
      intent: summarizeIntent(input.intent, input.market),
      status: input.status ?? "completed",
      actionsJson: JSON.stringify(input.actions),
      resultSummary: input.resultSummary,
      nextStepsJson: JSON.stringify(input.nextSteps ?? []),
    })
    .$returningId();

  return created?.id ?? null;
}

function requireAdminRole(role?: string) {
  if (!role || !["admin", "god"].includes(role)) {
    throw new TRPCError({ code: "FORBIDDEN", message: "Hope AI admin review requires an admin or god-mode operator." });
  }
}

export const hopeAiRouter = router({
  missionControl: protectedProcedure
    .input(z.object({ market: marketSchema.default("global") }).optional())
    .query(async ({ ctx, input }) => {
      const market = input?.market ?? "global";
      const db = await getDb();
      const balances = await multiCoinService.getBalances(ctx.user.id);
      const latestRuns = db
        ? await db.select().from(hopeAiActionRuns).where(eq(hopeAiActionRuns.userId, ctx.user.id)).orderBy(desc(hopeAiActionRuns.createdAt)).limit(8)
        : [];

      return {
        operator: {
          userId: ctx.user.id,
          role: ctx.user.role,
          brand: "Hope AI Hands-Free Free-Will Engineering",
          founder: "Skyler Blue Spillers",
        },
        market: marketCopy[market],
        balances,
        latestRuns,
        recommendedActions: buildPlan("hands-free Hope AI sprint", market, "hands_free"),
        productionGate: {
          liveMoneyMovement: "provider_config_required",
          stripe: "test_mode_or_env_secret_required",
          cryptoTransfers: "beta_ledger_enabled_real_onchain_gated",
        },
      };
    }),

  planSprint: protectedProcedure
    .input(
      z.object({
        intent: z.string().min(1).max(1200),
        market: marketSchema.default("global"),
        mode: modeSchema.default("guided"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const actions = buildPlan(input.intent, input.market, input.mode);
      const resultSummary = `Hope AI planned ${actions.length} guided action(s) for ${marketCopy[input.market].name}: ${summarizeIntent(input.intent, input.market)}.`;
      const actionRunId = await recordAction({
        userId: ctx.user.id,
        mode: input.mode,
        market: input.market,
        intent: input.intent,
        status: "planned",
        actions,
        resultSummary,
        nextSteps: ["Review the plan", "Run one quick action", "Validate changes before production publishing"],
      });

      return {
        success: true,
        actionRunId,
        resultSummary,
        market: marketCopy[input.market],
        actions,
      };
    }),

  quickAction: protectedProcedure
    .input(
      z.object({
        action: quickActionSchema,
        market: marketSchema.default("global"),
        mode: modeSchema.default("hands_free"),
        title: z.string().max(180).optional(),
        content: z.string().max(4000).optional(),
        postId: z.number().int().positive().optional(),
        targetUserId: z.number().int().positive().optional(),
        listingId: z.number().int().positive().optional(),
        amount: z.number().positive().max(1_000_000).optional(),
        coin: coinSchema.default("SKY4444"),
        category: z.string().max(80).optional(),
        price: z.string().max(50).optional(),
        imageUrl: z.string().url().optional().or(z.literal("")),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) {
        return {
          success: true,
          demo: true,
          resultSummary: `Hope AI prepared ${input.action} in demo mode because the database is not configured.`,
          nextSteps: ["Configure DATABASE_URL", "Run the same action again", "Validate the persisted action in mission control"],
        };
      }

      let result: unknown = null;
      let resultSummary = "Hope AI completed the requested action.";

      if (input.action === "create_feed_post") {
        const [created] = await db
          .insert(posts)
          .values({
            userId: ctx.user.id,
            content: `[HOPE AI ${marketCopy[input.market].zhName}]\n\n${input.content ?? "Building Hope AI hands-free social commerce, dating, livestream, and marketplace features for family-centered innovation."}`,
            imageUrl: input.imageUrl || null,
            aiRank: 44,
            sentiment: "hopeful",
          })
          .$returningId();
        result = { postId: created?.id };
        resultSummary = "Hope AI published a founder/profile feed post.";
      }

      if (["like_post", "comment_post", "share_post"].includes(input.action)) {
        if (!input.postId) throw new TRPCError({ code: "BAD_REQUEST", message: "postId is required for feed interactions." });
        const type = input.action === "like_post" ? "like" : input.action === "comment_post" ? "comment" : "share";
        await db.insert(feedInteractions).values({
          userId: ctx.user.id,
          postId: input.postId,
          type,
          amount: "0",
          content: input.content ?? (type === "comment" ? "Hope AI hands-free support and encouragement." : undefined),
        });
        const patch =
          type === "like" ? { likes: sql`${posts.likes} + 1`, aiRank: sql`${posts.aiRank} + 4` } :
          type === "share" ? { shares: sql`${posts.shares} + 1`, aiRank: sql`${posts.aiRank} + 8` } :
          { replies: sql`${posts.replies} + 1`, aiRank: sql`${posts.aiRank} + 6` };
        await db.update(posts).set(patch).where(eq(posts.id, input.postId));
        result = { postId: input.postId, type };
        resultSummary = `Hope AI recorded a ${type} interaction.`;
      }

      if (input.action === "tip_creator") {
        if (!input.targetUserId || !input.amount) throw new TRPCError({ code: "BAD_REQUEST", message: "targetUserId and amount are required for creator tipping." });
        result = await multiCoinService.tip({ user: ctx.user }, input.targetUserId, input.amount, input.coin as Coin, input.content ?? "Hope AI creator support tip");
        resultSummary = `Hope AI sent a beta-ledger ${input.coin} creator tip.`;
      }

      if (input.action === "publish_listing") {
        const [created] = await db
          .insert(marketplaceListings)
          .values({
            sellerId: ctx.user.id,
            title: input.title ?? "Hope AI Hands-Free Innovation Service",
            description: input.content ?? "Production-grade full-stack, cybersecurity, social commerce, and AI automation support by Sky Blue Innovative Information Technology Resolutions.",
            category: input.category ?? "ai-services",
            price: input.price ?? "444.00",
            token: input.coin,
            inventory: 1,
            status: "live",
            imageUrl: input.imageUrl || null,
            escrowRequired: 1,
          })
          .$returningId();
        result = { listingId: created?.id };
        resultSummary = "Hope AI published a marketplace service listing.";
      }

      if (input.action === "start_stream") {
        const [created] = await db
          .insert(liveStreams)
          .values({
            hostId: ctx.user.id,
            title: input.title ?? "Hope AI Hands-Free Build Room",
            topic: input.content ?? "Live platform polish, founder story, marketplace launches, dating/social community, and beta wallet education.",
            channelType: "livestream",
            status: "live",
            viewerCount: 1,
          })
          .$returningId();
        result = { streamId: created?.id };
        resultSummary = "Hope AI opened a livestream build room.";
      }

      if (input.action === "dating_wave") {
        if (!input.targetUserId) throw new TRPCError({ code: "BAD_REQUEST", message: "targetUserId is required for dating/community waves." });
        const [created] = await db
          .insert(datingActions)
          .values({
            actorId: ctx.user.id,
            targetId: input.targetUserId,
            action: "superlike",
            message: input.content ?? "Hope AI respectful community wave: friendship, family values, creativity, and positive collaboration.",
          })
          .$returningId();
        result = { datingActionId: created?.id };
        resultSummary = "Hope AI sent a respectful dating/community wave.";
      }

      if (input.action === "admin_review") {
        requireAdminRole(ctx.user.role);
        const [created] = await db
          .insert(adminAuditLogs)
          .values({
            actorId: ctx.user.id,
            targetUserId: input.targetUserId,
            action: "hope_ai_admin_review",
            details: JSON.stringify({ market: input.market, content: input.content ?? "Hope AI production readiness review", listingId: input.listingId, postId: input.postId }),
          })
          .$returningId();
        result = { auditId: created?.id };
        resultSummary = "Hope AI recorded an admin production-readiness review.";
      }

      const actionRunId = await recordAction({
        userId: ctx.user.id,
        mode: input.mode,
        market: input.market,
        intent: `${input.action}: ${input.title ?? input.content ?? "hands-free action"}`,
        actions: [{ action: input.action, input, result }],
        resultSummary,
        nextSteps: ["Review mission control", "Validate frontend display", "Commit and push the coherent update"],
      });

      return { success: true, actionRunId, resultSummary, result };
    }),

  runHandsFreeBoost: protectedProcedure
    .input(
      z.object({
        market: marketSchema.default("global"),
        focus: z.enum(["founder_story", "marketplace", "livestream", "dating", "full_platform"]).default("full_platform"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Database is required for Hope AI hands-free boost persistence." });

      const market = marketCopy[input.market];
      const postContent = `[HOPE AI HANDS-FREE]\n\nSkyler Blue Spillers is building Hope AI and SkyCoin4444 as a family-centered, cybersecurity-aware, full-stack innovation platform for ${market.name}. Focus: ${input.focus}.\n\n${market.positioning}`;

      const result = await db.transaction(async (tx) => {
        const [post] = await tx.insert(posts).values({ userId: ctx.user.id, content: postContent, aiRank: 88, sentiment: "hopeful" }).$returningId();
        const [stream] = await tx
          .insert(liveStreams)
          .values({ hostId: ctx.user.id, title: "Hope AI Hands-Free Founder Sprint", topic: `${market.positioning} ${market.guidance.join(" ")}`, channelType: "livestream", status: "scheduled", viewerCount: 0 })
          .$returningId();
        const [listing] = await tx
          .insert(marketplaceListings)
          .values({
            sellerId: ctx.user.id,
            title: "Hope AI Full-Stack Cybersecurity Innovation Package",
            description: "Founder-led implementation support for social commerce, livestreaming, marketplace, beta wallet UX, admin operations, and ethical-hacker-informed trust architecture.",
            category: "ai-services",
            price: "4444.00",
            token: "SKY4444",
            inventory: 4,
            status: "live",
            escrowRequired: 1,
          })
          .$returningId();
        return { postId: post?.id, streamId: stream?.id, listingId: listing?.id };
      });

      const actionRunId = await recordAction({
        userId: ctx.user.id,
        mode: "hands_free",
        market: input.market,
        intent: `Hands-free boost: ${input.focus}`,
        actions: [{ action: "create_feed_post" }, { action: "start_stream" }, { action: "publish_listing" }],
        resultSummary: "Hope AI completed a three-part hands-free boost across feed, livestream, and marketplace.",
        nextSteps: ["Surface this boost in the frontend Hope AI panel", "Invite users to tip, like, share, and buy through beta-safe flows"],
      });

      return {
        success: true,
        actionRunId,
        resultSummary: "Hope AI completed a three-part hands-free boost across feed, livestream, and marketplace.",
        result,
      };
    }),
});
