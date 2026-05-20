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

const quickActionInputSchema = z.object({
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
});

type Market = z.infer<typeof marketSchema>;
type Mode = z.infer<typeof modeSchema>;
type QuickAction = z.infer<typeof quickActionSchema>;
type QuickActionInput = z.infer<typeof quickActionInputSchema>;
type HopeActorContext = { user: { id: number; role?: string | null } };

type PlannedAction = {
  key: QuickAction | "review_metrics" | "localize_offer" | "protect_trust";
  label: string;
  labelZh: string;
  description: string;
  confidence: number;
};

type NavigationTarget = {
  key: string;
  label: string;
  labelZh: string;
  route: string;
  section: "mission" | "commerce" | "social" | "creator" | "wallet" | "admin" | "ai" | "security";
  aliases: string[];
  description: string;
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

const navigationTargets: NavigationTarget[] = [
  { key: "hope_ai", label: "Hope AI Mission Control", labelZh: "Hope AI 任务控制台", route: "/dashboard/hope-ai", section: "mission", aliases: ["hope", "hope ai", "mission control", "hands free", "voice command", "希望", "任务控制"], description: "Return to the Hope AI command center for voice, planning, and quick actions." },
  { key: "marketplace", label: "Marketplace", labelZh: "市场", route: "/dashboard/marketplace", section: "commerce", aliases: ["marketplace", "shop", "store", "seller", "listing", "commerce", "buy", "sell", "市场", "商店", "商品"], description: "Open the product and service marketplace for seller offers, checkout, and beta escrow flows." },
  { key: "dating", label: "Dating Marketplace", labelZh: "约会与社交市场", route: "/dashboard/dating", section: "social", aliases: ["dating", "match", "friend", "connections", "community dating", "约会", "匹配", "好友"], description: "Open respectful social discovery, dating, networking, and creator-collaboration profiles." },
  { key: "livestream", label: "Polished Livestream Studio", labelZh: "直播工作室", route: "/dashboard/live-polished", section: "creator", aliases: ["livestream", "live stream", "go live", "stream", "build room", "youtube", "video", "直播", "视频"], description: "Open the livestream and YouTube-style feed studio for creator broadcasts and tips." },
  { key: "social_feed", label: "Social Feed", labelZh: "社交动态", route: "/dashboard/social-feed", section: "social", aliases: ["feed", "profile feed", "social feed", "post feed", "timeline", "动态", "帖子"], description: "Open the creator profile feed for posts, likes, comments, shares, and social proof." },
  { key: "wallet", label: "Wallet", labelZh: "钱包", route: "/dashboard/wallet", section: "wallet", aliases: ["wallet", "balance", "coins", "skycoin", "skycoin4444", "shadow coin", "shadow", "crypto", "ledger", "钱包", "余额", "币"], description: "Open beta ledger balances for SKYCOIN4444, Shadow Coin, and supported platform coins." },
  { key: "admin", label: "Admin Command Center", labelZh: "管理员控制台", route: "/dashboard/admin", section: "admin", aliases: ["admin", "administrator", "moderation", "control panel", "audit", "financial tracking", "管理员", "审核"], description: "Open admin controls for users, moderation queues, analytics, compliance, and audit trails." },
  { key: "analytics", label: "Analytics", labelZh: "分析", route: "/dashboard/analytics", section: "admin", aliases: ["analytics", "metrics", "stats", "financial dashboard", "numbers", "分析", "数据"], description: "Open analytics and operational metrics for the platform." },
  { key: "ai_tools", label: "AI Tools Hub", labelZh: "AI 工具中心", route: "/dashboard/ai", section: "ai", aliases: ["ai tools", "ai hub", "copilot", "automation", "assistant", "工具", "人工智能"], description: "Open the broader AI tools hub for copilots, automation, and creative build support." },
  { key: "skyblue_it", label: "Sky Blue IT Dashboard", labelZh: "Sky Blue IT 控制台", route: "/dashboard/it-dashboard", section: "security", aliases: ["sky blue", "it dashboard", "cybersecurity", "service center", "client portal", "information technology", "网络安全", "信息技术"], description: "Open the founder-led IT services dashboard for cybersecurity and full-stack service delivery." },
  { key: "shadow_pay", label: "Shadow Pay", labelZh: "Shadow Pay 支付", route: "/dashboard/pay", section: "wallet", aliases: ["pay", "shadow pay", "payment", "stripe", "checkout", "支付", "付款"], description: "Open payment and checkout surfaces while keeping live money movement behind provider configuration." },
  { key: "ico", label: "SKYCOIN4444 ICO Hub", labelZh: "SKYCOIN4444 ICO 中心", route: "/dashboard/ico", section: "wallet", aliases: ["ico", "launch", "token sale", "sky4444", "skycoin4444 ico", "代币", "发行"], description: "Open SKYCOIN4444 launch education and beta economy surfaces." },
];

const defaultPlan: PlannedAction[] = [
  { key: "create_feed_post", label: "Publish a Hope AI founder-update post", labelZh: "发布 Hope AI 创始人动态", description: "Turn the current founder story and product progress into a YouTube-style profile-feed update.", confidence: 0.94 },
  { key: "start_stream", label: "Open a live Hope AI build room", labelZh: "开启 Hope AI 实时构建直播间", description: "Create a livestream slot for product demos, community questions, and marketplace announcements.", confidence: 0.9 },
  { key: "publish_listing", label: "Publish a service marketplace offer", labelZh: "发布服务市场产品", description: "List a cybersecurity, full-stack, or Hope AI implementation service with beta escrow support.", confidence: 0.88 },
  { key: "protect_trust", label: "Run trust and safety checklist", labelZh: "执行信任与安全检查清单", description: "Keep live money movement, payment processing, and external transfers behind secure provider configuration.", confidence: 0.97 },
];

function summarizeIntent(intent: string, market: Market) {
  const trimmed = intent.trim().replace(/\s+/g, " ").slice(0, 160);
  return trimmed || `Hope AI hands-free ${marketCopy[market].name} growth sprint`;
}

function buildPlan(intent: string, market: Market, mode: Mode): PlannedAction[] {
  const base = [...defaultPlan];
  if (market === "china") base.splice(1, 0, { key: "localize_offer", label: "Add bilingual China-ready positioning", labelZh: "添加中英双语市场定位", description: "Generate concise bilingual feature copy for social commerce, marketplace, and creator profiles.", confidence: 0.91 });
  if (mode === "admin") base.push({ key: "admin_review", label: "Queue admin control review", labelZh: "加入管理员审核队列", description: "Record a moderation, role, and production-readiness review for the current sprint.", confidence: 0.86 });
  if (/dating|friend|family|community|约会|好友|社区/i.test(intent)) base.push({ key: "dating_wave", label: "Send a respectful connection wave", labelZh: "发送尊重式好友互动", description: "Use dating/social networking as a community-building action rather than spam automation.", confidence: 0.84 });
  return base;
}

function normalizeCommand(command: string) {
  return command.trim().replace(/\s+/g, " ").toLowerCase();
}

function scoreNavigationTarget(command: string, target: NavigationTarget) {
  const normalized = normalizeCommand(command);
  let score = 0;
  for (const alias of target.aliases) if (normalized.includes(alias.toLowerCase())) score += alias.length > 8 ? 3 : 2;
  if (/\b(go|open|navigate|show|take me|bring me|launch|switch|route)\b/i.test(command) || /打开|前往|进入|导航/.test(command)) score += 2;
  if (normalized.includes(target.key.replace(/_/g, " "))) score += 2;
  return score;
}

function resolveNavigationIntent(command: string) {
  const [best] = navigationTargets.map((target) => ({ target, score: scoreNavigationTarget(command, target) })).sort((a, b) => b.score - a.score);
  if (!best || best.score <= 0) return null;
  const confidence = Math.min(0.99, 0.55 + best.score * 0.08);
  return { key: best.target.key, label: best.target.label, labelZh: best.target.labelZh, route: best.target.route, section: best.target.section, description: best.target.description, confidence, spokenResponse: `Opening ${best.target.label}. ${best.target.description}` };
}

function inferQuickAction(command: string): QuickAction | null {
  const normalized = normalizeCommand(command);
  if (/\b(admin|moderation|audit|review|compliance|god mode)\b/.test(normalized) || /管理员|审核/.test(command)) return "admin_review";
  if (/\b(tip|reward|support creator|send.*coin|send.*sky|donate)\b/.test(normalized) || /打赏|小费|奖励/.test(command)) return "tip_creator";
  if (/\b(like|heart|thumbs up)\b/.test(normalized) || /点赞/.test(command)) return "like_post";
  if (/\b(comment|reply|respond)\b/.test(normalized) || /评论|回复/.test(command)) return "comment_post";
  if (/\b(share|repost|boost post)\b/.test(normalized) || /分享|转发/.test(command)) return "share_post";
  if (/\b(list|listing|sell|publish offer|marketplace offer|service package|storefront)\b/.test(normalized) || /上架|商品|服务/.test(command)) return "publish_listing";
  if (/\b(go live|start stream|livestream|live stream|open.*build room|broadcast)\b/.test(normalized) || /直播|开播/.test(command)) return "start_stream";
  if (/\b(dating|wave|superlike|match|connection|friend request)\b/.test(normalized) || /约会|匹配|好友|打招呼/.test(command)) return "dating_wave";
  if (/\b(post|publish|feed update|founder update|status update|youtube-style post)\b/.test(normalized) || /发布|动态|帖子/.test(command)) return "create_feed_post";
  return null;
}

function extractAmount(command: string) {
  const match = command.match(/(?:tip|send|reward|打赏|奖励)\s+(\d+(?:\.\d+)?)/i) ?? command.match(/(\d+(?:\.\d+)?)\s*(?:sky|sky4444|shadow|coin|coins|币)/i);
  const parsed = match ? Number(match[1]) : undefined;
  return parsed && Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
}

function actionNeeds(action: QuickAction) {
  if (["like_post", "comment_post", "share_post"].includes(action)) return "postId" as const;
  if (["tip_creator", "dating_wave"].includes(action)) return "targetUserId" as const;
  return null;
}

function defaultTitleForAction(action: QuickAction) {
  if (action === "publish_listing") return "Hope AI Full-Stack Cybersecurity Innovation Package";
  if (action === "start_stream") return "Hope AI Hands-Free Build Room";
  if (action === "admin_review") return "Hope AI Production Readiness Review";
  return "Hope AI Founder Update";
}

function spokenActionResponse(action: QuickAction, market: Market, executed: boolean) {
  const labels: Record<QuickAction, string> = {
    create_feed_post: "a founder feed post",
    like_post: "a post like",
    comment_post: "a post comment",
    share_post: "a post share",
    tip_creator: "a beta-ledger creator tip",
    publish_listing: "a marketplace service listing",
    start_stream: "a livestream build room",
    dating_wave: "a respectful dating and community wave",
    admin_review: "an admin production-readiness review",
  };
  return `Hope AI ${executed ? "completed" : "prepared"} ${labels[action]} for the ${marketCopy[market].name} mission. Financial and crypto-adjacent actions remain beta-safe and provider-gated.`;
}

async function recordAction(input: { userId: number; mode: Mode; market: Market; intent: string; status?: "planned" | "completed" | "blocked" | "failed"; actions: unknown; resultSummary: string; nextSteps?: unknown }) {
  const db = await getDb();
  if (!db) return null;
  const [created] = await db.insert(hopeAiActionRuns).values({ userId: input.userId, mode: input.mode, market: input.market, intent: summarizeIntent(input.intent, input.market), status: input.status ?? "completed", actionsJson: JSON.stringify(input.actions), resultSummary: input.resultSummary, nextStepsJson: JSON.stringify(input.nextSteps ?? []) }).$returningId();
  return created?.id ?? null;
}

function requireAdminRole(role?: string | null) {
  if (!role || !["admin", "god"].includes(role)) throw new TRPCError({ code: "FORBIDDEN", message: "Hope AI admin review requires an admin or god-mode operator." });
}

async function executeQuickAction(ctx: HopeActorContext, input: QuickActionInput) {
  const db = await getDb();
  if (!db) return { success: true, demo: true, resultSummary: `Hope AI prepared ${input.action} in demo mode because the database is not configured.`, result: { demo: true, action: input.action }, nextSteps: ["Configure DATABASE_URL", "Run the same action again", "Validate the persisted action in mission control"] };

  let result: unknown = null;
  let resultSummary = "Hope AI completed the requested action.";

  if (input.action === "create_feed_post") {
    const [created] = await db.insert(posts).values({ userId: ctx.user.id, content: `[HOPE AI ${marketCopy[input.market].zhName}]\n\n${input.content ?? "Building Hope AI hands-free social commerce, dating, livestream, and marketplace features for family-centered innovation."}`, imageUrl: input.imageUrl || null, aiRank: 44, sentiment: "hopeful" }).$returningId();
    result = { postId: created?.id };
    resultSummary = "Hope AI published a founder/profile feed post.";
  }

  if (["like_post", "comment_post", "share_post"].includes(input.action)) {
    if (!input.postId) throw new TRPCError({ code: "BAD_REQUEST", message: "postId is required for feed interactions." });
    const type = input.action === "like_post" ? "like" : input.action === "comment_post" ? "comment" : "share";
    await db.insert(feedInteractions).values({ userId: ctx.user.id, postId: input.postId, type, amount: "0", content: input.content ?? (type === "comment" ? "Hope AI hands-free support and encouragement." : undefined) });
    const patch = type === "like" ? { likes: sql`${posts.likes} + 1`, aiRank: sql`${posts.aiRank} + 4` } : type === "share" ? { shares: sql`${posts.shares} + 1`, aiRank: sql`${posts.aiRank} + 8` } : { replies: sql`${posts.replies} + 1`, aiRank: sql`${posts.aiRank} + 6` };
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
    const [created] = await db.insert(marketplaceListings).values({ sellerId: ctx.user.id, title: input.title ?? "Hope AI Hands-Free Innovation Service", description: input.content ?? "Production-grade full-stack, cybersecurity, social commerce, and AI automation support by Sky Blue Innovative Information Technology Resolutions.", category: input.category ?? "ai-services", price: input.price ?? "444.00", token: input.coin, inventory: 1, status: "live", imageUrl: input.imageUrl || null, escrowRequired: 1 }).$returningId();
    result = { listingId: created?.id };
    resultSummary = "Hope AI published a marketplace service listing.";
  }

  if (input.action === "start_stream") {
    const [created] = await db.insert(liveStreams).values({ hostId: ctx.user.id, title: input.title ?? "Hope AI Hands-Free Build Room", topic: input.content ?? "Live platform polish, founder story, marketplace launches, dating/social community, and beta wallet education.", channelType: "livestream", status: "live", viewerCount: 1 }).$returningId();
    result = { streamId: created?.id };
    resultSummary = "Hope AI opened a livestream build room.";
  }

  if (input.action === "dating_wave") {
    if (!input.targetUserId) throw new TRPCError({ code: "BAD_REQUEST", message: "targetUserId is required for dating/community waves." });
    const [created] = await db.insert(datingActions).values({ actorId: ctx.user.id, targetId: input.targetUserId, action: "superlike", message: input.content ?? "Hope AI respectful community wave: friendship, family values, creativity, and positive collaboration." }).$returningId();
    result = { datingActionId: created?.id };
    resultSummary = "Hope AI sent a respectful dating/community wave.";
  }

  if (input.action === "admin_review") {
    requireAdminRole(ctx.user.role);
    const [created] = await db.insert(adminAuditLogs).values({ actorId: ctx.user.id, targetUserId: input.targetUserId, action: "hope_ai_admin_review", details: JSON.stringify({ market: input.market, content: input.content ?? "Hope AI production readiness review", listingId: input.listingId, postId: input.postId }) }).$returningId();
    result = { auditId: created?.id };
    resultSummary = "Hope AI recorded an admin production-readiness review.";
  }

  return { success: true, resultSummary, result, nextSteps: ["Review mission control", "Validate frontend display", "Commit and push the coherent update"] };
}

export const hopeAiRouter = router({
  missionControl: protectedProcedure.input(z.object({ market: marketSchema.default("global") }).optional()).query(async ({ ctx, input }) => {
    const market = input?.market ?? "global";
    const db = await getDb();
    const balances = await multiCoinService.getBalances(ctx.user.id);
    const latestRuns = db ? await db.select().from(hopeAiActionRuns).where(eq(hopeAiActionRuns.userId, ctx.user.id)).orderBy(desc(hopeAiActionRuns.createdAt)).limit(8) : [];
    return {
      operator: { userId: ctx.user.id, role: ctx.user.role, brand: "Hope AI Hands-Free Free-Will Engineering", founder: "Skyler Blue Spillers" },
      market: marketCopy[market],
      balances,
      latestRuns,
      navigationTargets,
      voiceExamples: ["Hope, go to marketplace", "Open livestream studio", "Post a Hope AI founder update", "Tip creator 144 SKY4444", "Like post 1", "带我去市场"],
      recommendedActions: buildPlan("hands-free Hope AI sprint", market, "hands_free"),
      productionGate: { liveMoneyMovement: "provider_config_required", stripe: "test_mode_or_env_secret_required", cryptoTransfers: "beta_ledger_enabled_real_onchain_gated" },
    };
  }),

  aiDevSection: protectedProcedure.input(z.object({ market: marketSchema.default("global") }).optional()).query(async ({ ctx, input }) => {
    const market = input?.market ?? "global";
    const db = await getDb();
    const balances = await multiCoinService.getBalances(ctx.user.id);
    const walletUsdTotal = balances.reduce((sum, balance) => sum + Number((balance as { usdValue?: number }).usdValue ?? 0), 0);
    const latestRuns = db ? await db.select().from(hopeAiActionRuns).where(eq(hopeAiActionRuns.userId, ctx.user.id)).orderBy(desc(hopeAiActionRuns.createdAt)).limit(12) : [];
    return {
      headline: "AI Development Showcase: hands-free, bilingual, crypto-social orchestration",
      subheadline: "Hope AI is evolving from a page into an operator layer that can understand voice intent, navigate the product, trigger safe quick actions, and explain every market move.",
      market: marketCopy[market],
      metrics: [
        { label: "Voice-ready command layer", value: "3 procedures", detail: "voiceCommand, navigationIntent, and aiDevSection expose the hands-free brain to the React mission-control UI." },
        { label: "Beta economy coverage", value: `${supportedCoins.length} coins`, detail: "SKYCOIN4444, Shadow Coin, and multi-coin beta ledger balances stay visible while real transfers remain gated." },
        { label: "Hands-free destinations", value: `${navigationTargets.length} routes`, detail: "Marketplace, dating, livestream, social feed, wallet, admin, analytics, AI tools, and Sky Blue IT surfaces are voice-addressable." },
        { label: "Recorded Hope AI runs", value: `${latestRuns.length}`, detail: "Recent planned, completed, and blocked automations are retained for audit-style review." },
        { label: "Wallet visibility", value: `$${walletUsdTotal.toLocaleString(undefined, { maximumFractionDigits: 2 })}`, detail: "Estimated beta-ledger value across the currently configured account balances." },
        { label: "Market stance", value: marketCopy[market].zhName, detail: marketCopy[market].positioning },
      ],
      innovationHighlights: [
        "Natural-language voice commands map to product routes or safe quick actions instead of leaving users stranded in static dashboards.",
        "Free-will engineering keeps Hope AI assistive and accountable: every action is explainable, logged, and visible to the operator.",
        "Bilingual U.S. and China-ready messaging is built into market guidance, navigation labels, and creator-commerce positioning.",
        "Creator monetization, dating/community discovery, livestreaming, marketplace listings, admin reviews, and beta wallet utilities now share one orchestration layer.",
      ],
      technicalStack: ["Vite + React + TypeScript mission-control frontend", "tRPC protected procedures with authenticated user context", "Drizzle ORM persistence for audit runs, marketplace listings, live streams, feed interactions, and dating actions", "Multi-coin beta ledger service with SKY4444 and SHADOW support", "Provider-gated Stripe/on-chain production controls for responsible rollout"],
      safetyArchitecture: ["Real-money movement stays behind provider configuration and environment secrets.", "On-chain transfers remain disabled until a production blockchain provider is intentionally configured.", "Admin review actions require admin or god-mode role checks.", "Voice commands that lack required IDs return a clear blocked state instead of guessing unsafe targets."],
      nextBuildMoves: ["Wire browser Web Speech API input and SpeechSynthesis output to voiceCommand.", "Add a route-launch panel that calls navigationIntent and lets users jump to marketplace, dating, livestream, wallet, and admin.", "Surface AI development metrics as a founder-grade showcase section for investors, partners, and operators."],
    };
  }),

  navigationIntent: protectedProcedure.input(z.object({ command: z.string().min(1).max(500), market: marketSchema.default("global") })).query(async ({ input }) => {
    const navigation = resolveNavigationIntent(input.command) ?? resolveNavigationIntent("hope ai");
    return { success: true, market: marketCopy[input.market], navigation, spokenResponse: navigation?.spokenResponse ?? "Opening Hope AI Mission Control.", allTargets: navigationTargets };
  }),

  voiceCommand: protectedProcedure.input(z.object({ command: z.string().min(1).max(1200), market: marketSchema.default("global"), mode: modeSchema.default("hands_free"), execute: z.boolean().default(true), content: z.string().max(4000).optional(), postId: z.number().int().positive().optional(), targetUserId: z.number().int().positive().optional(), listingId: z.number().int().positive().optional(), amount: z.number().positive().max(1_000_000).optional(), coin: coinSchema.default("SKY4444") })).mutation(async ({ ctx, input }) => {
    const navigation = resolveNavigationIntent(input.command);
    const action = inferQuickAction(input.command);
    const commandLooksNavigational = /\b(go|open|navigate|show|take me|bring me|launch|switch|route)\b/i.test(input.command) || /打开|前往|进入|导航/.test(input.command);

    if (navigation && (!action || commandLooksNavigational)) {
      const resultSummary = `Hope AI resolved a voice navigation command to ${navigation.label}.`;
      const actionRunId = await recordAction({ userId: ctx.user.id, mode: input.mode, market: input.market, intent: input.command, status: "completed", actions: [{ type: "navigation", navigation }], resultSummary, nextSteps: [`Navigate to ${navigation.route}`, "Continue with the next hands-free action"] });
      return { success: true, intentType: "navigation" as const, needsInput: false, actionRunId, navigation, action: null, resultSummary, spokenResponse: navigation.spokenResponse };
    }

    if (action) {
      const required = actionNeeds(action);
      if ((required === "postId" && !input.postId) || (required === "targetUserId" && !input.targetUserId)) {
        const missingLabel = required === "postId" ? "a post ID" : "a creator or community member user ID";
        const resultSummary = `Hope AI understood ${action}, but needs ${missingLabel} before executing.`;
        const actionRunId = await recordAction({ userId: ctx.user.id, mode: input.mode, market: input.market, intent: input.command, status: "blocked", actions: [{ type: "quick_action", action, missing: required }], resultSummary, nextSteps: [`Provide ${missingLabel}`, "Run the command again", "Keep the action beta-safe and auditable"] });
        return { success: false, intentType: "quick_action" as const, needsInput: true, missing: required, actionRunId, navigation: null, action, resultSummary, spokenResponse: resultSummary };
      }

      const quickInput: QuickActionInput = { action, market: input.market, mode: input.mode, title: defaultTitleForAction(action), content: input.content ?? `Voice command: ${input.command}`, postId: input.postId, targetUserId: input.targetUserId, listingId: input.listingId, amount: input.amount ?? extractAmount(input.command) ?? (action === "tip_creator" ? 144 : undefined), coin: input.coin, category: "ai-services", price: "444.00" };
      const actionResult = input.execute ? await executeQuickAction(ctx, quickInput) : { success: true, resultSummary: `Hope AI prepared ${action} without executing it.`, result: { action, preparedOnly: true }, nextSteps: ["Review the suggested action", "Execute when ready"] };
      const actionRunId = await recordAction({ userId: ctx.user.id, mode: input.mode, market: input.market, intent: input.command, status: input.execute ? "completed" : "planned", actions: [{ type: "quick_action", action, input: quickInput, result: actionResult.result }], resultSummary: actionResult.resultSummary, nextSteps: actionResult.nextSteps });
      return { success: true, intentType: "quick_action" as const, needsInput: false, actionRunId, navigation: null, action, resultSummary: actionResult.resultSummary, result: actionResult.result, spokenResponse: spokenActionResponse(action, input.market, input.execute) };
    }

    const actions = buildPlan(input.command, input.market, input.mode);
    const resultSummary = `Hope AI converted the voice command into a ${actions.length}-step guided sprint plan.`;
    const actionRunId = await recordAction({ userId: ctx.user.id, mode: input.mode, market: input.market, intent: input.command, status: "planned", actions, resultSummary, nextSteps: ["Review the plan", "Run a quick action", "Use a navigation command such as go to marketplace"] });
    return { success: true, intentType: "plan" as const, needsInput: false, actionRunId, navigation: null, action: null, actions, resultSummary, spokenResponse: `Hope AI planned ${actions.length} steps. Say go to marketplace, open livestream, post an update, tip creator, or show wallet to move hands-free.` };
  }),

  planSprint: protectedProcedure.input(z.object({ intent: z.string().min(1).max(1200), market: marketSchema.default("global"), mode: modeSchema.default("guided") })).mutation(async ({ ctx, input }) => {
    const actions = buildPlan(input.intent, input.market, input.mode);
    const resultSummary = `Hope AI planned ${actions.length} guided action(s) for ${marketCopy[input.market].name}: ${summarizeIntent(input.intent, input.market)}.`;
    const actionRunId = await recordAction({ userId: ctx.user.id, mode: input.mode, market: input.market, intent: input.intent, status: "planned", actions, resultSummary, nextSteps: ["Review the plan", "Run one quick action", "Validate changes before production publishing"] });
    return { success: true, actionRunId, resultSummary, market: marketCopy[input.market], actions };
  }),

  quickAction: protectedProcedure.input(quickActionInputSchema).mutation(async ({ ctx, input }) => {
    const actionResult = await executeQuickAction(ctx, input);
    const actionRunId = await recordAction({ userId: ctx.user.id, mode: input.mode, market: input.market, intent: `${input.action}: ${input.title ?? input.content ?? "hands-free action"}`, actions: [{ action: input.action, input, result: actionResult.result }], resultSummary: actionResult.resultSummary, nextSteps: actionResult.nextSteps });
    return { success: true, demo: actionResult.demo, actionRunId, resultSummary: actionResult.resultSummary, result: actionResult.result };
  }),

  runHandsFreeBoost: protectedProcedure.input(z.object({ market: marketSchema.default("global"), focus: z.enum(["founder_story", "marketplace", "livestream", "dating", "full_platform"]).default("full_platform") })).mutation(async ({ ctx, input }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Database is required for Hope AI hands-free boost persistence." });
    const market = marketCopy[input.market];
    const postContent = `[HOPE AI HANDS-FREE]\n\nSkyler Blue Spillers is building Hope AI and SkyCoin4444 as a family-centered, cybersecurity-aware, full-stack innovation platform for ${market.name}. Focus: ${input.focus}.\n\n${market.positioning}`;
    const result = await db.transaction(async (tx) => {
      const [post] = await tx.insert(posts).values({ userId: ctx.user.id, content: postContent, aiRank: 88, sentiment: "hopeful" }).$returningId();
      const [stream] = await tx.insert(liveStreams).values({ hostId: ctx.user.id, title: "Hope AI Hands-Free Founder Sprint", topic: `${market.positioning} ${market.guidance.join(" ")}`, channelType: "livestream", status: "scheduled", viewerCount: 0 }).$returningId();
      const [listing] = await tx.insert(marketplaceListings).values({ sellerId: ctx.user.id, title: "Hope AI Full-Stack Cybersecurity Innovation Package", description: "Founder-led implementation support for social commerce, livestreaming, marketplace, beta wallet UX, admin operations, and ethical-hacker-informed trust architecture.", category: "ai-services", price: "4444.00", token: "SKY4444", inventory: 4, status: "live", escrowRequired: 1 }).$returningId();
      return { postId: post?.id, streamId: stream?.id, listingId: listing?.id };
    });
    const actionRunId = await recordAction({ userId: ctx.user.id, mode: "hands_free", market: input.market, intent: `Hands-free boost: ${input.focus}`, actions: [{ action: "create_feed_post" }, { action: "start_stream" }, { action: "publish_listing" }], resultSummary: "Hope AI completed a three-part hands-free boost across feed, livestream, and marketplace.", nextSteps: ["Surface this boost in the frontend Hope AI panel", "Invite users to tip, like, share, and buy through beta-safe flows"] });
    return { success: true, actionRunId, resultSummary: "Hope AI completed a three-part hands-free boost across feed, livestream, and marketplace.", result };
  }),
});
