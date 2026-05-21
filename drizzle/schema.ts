import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "creator", "seller", "moderator", "admin", "god"]).default("user").notNull(),
  accountStatus: mysqlEnum("accountStatus", ["active", "pending", "suspended", "banned"]).default("active").notNull(),
  verified: int("verified").default(0).notNull(),
  /** Demo beta balance used by playground mining, staking, tips, and testnet-style flows. */
  balance: varchar("balance", { length: 50 }).default("10000").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Trading and Portfolio Tables
export const trades = mysqlTable("trades", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  pair: varchar("pair", { length: 20 }).notNull(), // e.g., "SKY/USD"
  type: mysqlEnum("type", ["buy", "sell"]).notNull(),
  amount: varchar("amount", { length: 50 }).notNull(), // Use string for precision
  price: varchar("price", { length: 50 }).notNull(),
  total: varchar("total", { length: 50 }).notNull(),
  status: mysqlEnum("status", ["pending", "filled", "cancelled"]).default("pending"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const portfolios = mysqlTable("portfolios", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique().references(() => users.id),
  totalValue: varchar("totalValue", { length: 50 }).notNull().default("10000"),
  totalXP: int("totalXP").default(0),
  level: int("level").default(1),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const holdings = mysqlTable("holdings", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  asset: varchar("asset", { length: 20 }).notNull(), // e.g., "SKY", "BTC", "ETH"
  amount: varchar("amount", { length: 50 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// Social Tables
export const posts = mysqlTable("posts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  content: text("content").notNull(),
  imageUrl: text("imageUrl"),
  likes: int("likes").default(0),
  replies: int("replies").default(0),
  shares: int("shares").default(0),
  tips: int("tips").default(0),
  aiRank: int("aiRank").default(0),
  sentiment: varchar("sentiment", { length: 20 }).default("neutral"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const datingProfiles = mysqlTable("datingProfiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique().references(() => users.id),
  displayName: varchar("displayName", { length: 120 }).notNull(),
  age: int("age").default(18).notNull(),
  location: varchar("location", { length: 160 }).default("Global").notNull(),
  bio: text("bio").notNull(),
  interests: text("interests").notNull(),
  seeking: varchar("seeking", { length: 120 }).default("networking, dating, creator collabs").notNull(),
  avatarUrl: text("avatarUrl"),
  compatibilityScore: int("compatibilityScore").default(72).notNull(),
  isVisible: int("isVisible").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const datingActions = mysqlTable("datingActions", {
  id: int("id").autoincrement().primaryKey(),
  actorId: int("actorId").notNull().references(() => users.id),
  targetId: int("targetId").notNull().references(() => users.id),
  action: mysqlEnum("action", ["like", "pass", "superlike", "block"]).notNull(),
  message: text("message"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const follows = mysqlTable("follows", {
  id: int("id").autoincrement().primaryKey(),
  followerId: int("followerId").notNull().references(() => users.id),
  followingId: int("followingId").notNull().references(() => users.id),
  status: mysqlEnum("status", ["active", "muted", "blocked"]).default("active").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const feedInteractions = mysqlTable("feedInteractions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  postId: int("postId").notNull().references(() => posts.id),
  type: mysqlEnum("type", ["like", "comment", "share", "tip", "flag"]).notNull(),
  amount: varchar("amount", { length: 50 }).default("0").notNull(),
  content: text("content"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const messages = mysqlTable("messages", {
  id: int("id").autoincrement().primaryKey(),
  senderId: int("senderId").notNull().references(() => users.id),
  recipientId: int("recipientId").notNull().references(() => users.id),
  content: text("content").notNull(),
  tipAmount: int("tipAmount").default(0),
  read: int("read").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const chatHistory = mysqlTable("chatHistory", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  role: mysqlEnum("role", ["user", "assistant"]).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// Vault and Staking Tables
export const vaults = mysqlTable("vaults", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  amount: varchar("amount", { length: 50 }).notNull(),
  tier: mysqlEnum("tier", ["flex", "quarter", "annual", "diamond"]).notNull(),
  apy: varchar("apy", { length: 10 }).notNull(),
  lockedUntil: timestamp("lockedUntil").notNull(),
  label: varchar("label", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const stakingPositions = mysqlTable("stakingPositions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  token: varchar("token", { length: 20 }).notNull(),
  amount: varchar("amount", { length: 50 }).notNull(),
  apy: varchar("apy", { length: 10 }).notNull(),
  lockedUntil: timestamp("lockedUntil").notNull(),
  status: mysqlEnum("status", ["active", "complete", "cancelled"]).default("active").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const miningSessions = mysqlTable("miningSessions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  coin: varchar("coin", { length: 20 }).notNull(),
  hashRate: varchar("hashRate", { length: 50 }).notNull().default("0"),
  blocksFound: int("blocksFound").default(0).notNull(),
  balance: varchar("balance", { length: 50 }).notNull().default("0"),
  status: mysqlEnum("status", ["active", "paused", "ended"]).default("active").notNull(),
  startedAt: timestamp("startedAt").defaultNow().notNull(),
  endedAt: timestamp("endedAt"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const transactions = mysqlTable("transactions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  toUserId: int("toUserId").references(() => users.id),
  type: mysqlEnum("type", ["transfer", "swap", "mining", "staking", "tip", "airdrop", "reward", "fee", "burn", "charity", "escrow"]).notNull(),
  token: varchar("token", { length: 20 }).notNull(),
  amount: varchar("amount", { length: 50 }).notNull(),
  status: mysqlEnum("status", ["pending", "complete", "failed"]).default("complete").notNull(),
  memo: varchar("memo", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const settlementLedger = mysqlTable("settlementLedger", {
  id: int("id").autoincrement().primaryKey(),
  idempotencyKey: varchar("idempotencyKey", { length: 160 }).notNull().unique(),
  transactionId: int("transactionId").references(() => transactions.id),
  userId: int("userId").notNull().references(() => users.id),
  counterpartyUserId: int("counterpartyUserId").references(() => users.id),
  source: mysqlEnum("source", ["mining", "staking", "casino", "tip", "trading", "wallet", "payment", "escrow", "admin"]).notNull(),
  direction: mysqlEnum("direction", ["credit", "debit", "neutral"]).notNull(),
  token: varchar("token", { length: 20 }).notNull(),
  amount: varchar("amount", { length: 50 }).notNull(),
  provider: varchar("provider", { length: 80 }).default("beta-ledger").notNull(),
  providerStatus: mysqlEnum("providerStatus", ["beta_ledger", "paper", "test_mode", "provider_gated", "disabled", "review_required"]).default("beta_ledger").notNull(),
  settlementStatus: mysqlEnum("settlementStatus", ["recorded", "pending_review", "approved", "rejected", "voided", "provider_pending"]).default("recorded").notNull(),
  reviewStatus: mysqlEnum("reviewStatus", ["none", "queued", "approved", "rejected"]).default("none").notNull(),
  memo: varchar("memo", { length: 255 }),
  auditJson: text("auditJson"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const marketplaceListings = mysqlTable("marketplaceListings", {
  id: int("id").autoincrement().primaryKey(),
  sellerId: int("sellerId").notNull().references(() => users.id),
  title: varchar("title", { length: 180 }).notNull(),
  description: text("description").notNull(),
  category: varchar("category", { length: 80 }).default("digital").notNull(),
  price: varchar("price", { length: 50 }).notNull(),
  token: varchar("token", { length: 20 }).default("SKY4444").notNull(),
  inventory: int("inventory").default(1).notNull(),
  status: mysqlEnum("status", ["draft", "live", "sold", "paused", "removed"]).default("live").notNull(),
  imageUrl: text("imageUrl"),
  escrowRequired: int("escrowRequired").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const marketplaceOrders = mysqlTable("marketplaceOrders", {
  id: int("id").autoincrement().primaryKey(),
  listingId: int("listingId").notNull().references(() => marketplaceListings.id),
  buyerId: int("buyerId").notNull().references(() => users.id),
  sellerId: int("sellerId").notNull().references(() => users.id),
  escrowId: int("escrowId").references(() => escrowTransactions.id),
  token: varchar("token", { length: 20 }).default("SKY4444").notNull(),
  amount: varchar("amount", { length: 50 }).notNull(),
  quantity: int("quantity").default(1).notNull(),
  status: mysqlEnum("status", ["created", "held", "released", "refunded", "disputed", "cancelled"]).default("created").notNull(),
  shippingName: varchar("shippingName", { length: 180 }),
  shippingAddress: text("shippingAddress"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const escrowTransactions = mysqlTable("escrowTransactions", {
  id: int("id").autoincrement().primaryKey(),
  buyerId: int("buyerId").notNull().references(() => users.id),
  sellerId: int("sellerId").references(() => users.id),
  token: varchar("token", { length: 20 }).notNull().default("SKY4444"),
  amount: varchar("amount", { length: 50 }).notNull(),
  platformFee: varchar("platformFee", { length: 50 }).notNull().default("0"),
  charityAmount: varchar("charityAmount", { length: 50 }).notNull().default("0"),
  status: mysqlEnum("status", ["held", "released", "refunded", "disputed", "cancelled"]).default("held").notNull(),
  memo: varchar("memo", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const liveStreams = mysqlTable("liveStreams", {
  id: int("id").autoincrement().primaryKey(),
  hostId: int("hostId").notNull().references(() => users.id),
  title: varchar("title", { length: 180 }).notNull(),
  topic: text("topic").notNull(),
  channelType: mysqlEnum("channelType", ["livestream", "youtube", "audio"]).default("livestream").notNull(),
  streamUrl: text("streamUrl"),
  thumbnailUrl: text("thumbnailUrl"),
  viewerCount: int("viewerCount").default(0).notNull(),
  tipPool: varchar("tipPool", { length: 50 }).default("0").notNull(),
  status: mysqlEnum("status", ["scheduled", "live", "ended", "flagged"]).default("scheduled").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const tokenSupplyEvents = mysqlTable("tokenSupplyEvents", {
  id: int("id").autoincrement().primaryKey(),
  actorId: int("actorId").notNull().references(() => users.id),
  token: varchar("token", { length: 20 }).default("SKY4444").notNull(),
  eventType: mysqlEnum("eventType", ["mint", "burn", "airdrop", "reserve", "charity", "fee"]).notNull(),
  amount: varchar("amount", { length: 50 }).notNull(),
  memo: varchar("memo", { length: 255 }),
  status: mysqlEnum("status", ["queued", "posted", "rejected"]).default("posted").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const adminAuditLogs = mysqlTable("adminAuditLogs", {
  id: int("id").autoincrement().primaryKey(),
  actorId: int("actorId").notNull().references(() => users.id),
  targetUserId: int("targetUserId").references(() => users.id),
  action: varchar("action", { length: 120 }).notNull(),
  details: text("details"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const hopeAiActionRuns = mysqlTable("hopeAiActionRuns", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  mode: mysqlEnum("mode", ["hands_free", "guided", "admin", "market", "companion"]).default("guided").notNull(),
  intent: varchar("intent", { length: 160 }).notNull(),
  market: mysqlEnum("market", ["usa", "china", "global"]).default("global").notNull(),
  status: mysqlEnum("status", ["planned", "completed", "blocked", "failed"]).default("completed").notNull(),
  actionsJson: text("actionsJson").notNull(),
  resultSummary: text("resultSummary"),
  nextStepsJson: text("nextStepsJson"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// API Keys Table
export const apiKeys = mysqlTable("apiKeys", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  name: varchar("name", { length: 255 }).notNull(),
  prefix: varchar("prefix", { length: 20 }).notNull().unique(),
  secret: text("secret").notNull(),
  scopes: text("scopes").notNull(), // JSON array
  lastUsed: timestamp("lastUsed"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// Referral Table
export const referrals = mysqlTable("referrals", {
  id: int("id").autoincrement().primaryKey(),
  referrerId: int("referrerId").notNull().references(() => users.id),
  referredId: int("referredId").notNull().references(() => users.id),
  tier: mysqlEnum("tier", ["bronze", "silver", "gold", "platinum", "diamond"]).default("bronze"),
  earned: varchar("earned", { length: 50 }).default("0"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// Leaderboard Table
export const leaderboard = mysqlTable("leaderboard", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique().references(() => users.id),
  xpScore: int("xpScore").default(0),
  miningScore: int("miningScore").default(0),
  stakingScore: int("stakingScore").default(0),
  tradingScore: int("tradingScore").default(0),
  referralScore: int("referralScore").default(0),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// Onboarding Progress Table
export const onboardingProgress = mysqlTable("onboardingProgress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique().references(() => users.id),
  step: int("step").default(1),
  completed: int("completed").default(0),
  xpEarned: int("xpEarned").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Trade = typeof trades.$inferSelect;
export type Portfolio = typeof portfolios.$inferSelect;
export type Post = typeof posts.$inferSelect;
export type Message = typeof messages.$inferSelect;
export type Vault = typeof vaults.$inferSelect;
export type StakingPosition = typeof stakingPositions.$inferSelect;
export type MiningSession = typeof miningSessions.$inferSelect;
export type Transaction = typeof transactions.$inferSelect;
export type SettlementLedgerEntry = typeof settlementLedger.$inferSelect;
export type EscrowTransaction = typeof escrowTransactions.$inferSelect;
export type DatingProfile = typeof datingProfiles.$inferSelect;
export type DatingAction = typeof datingActions.$inferSelect;
export type MarketplaceListing = typeof marketplaceListings.$inferSelect;
export type MarketplaceOrder = typeof marketplaceOrders.$inferSelect;
export type LiveStream = typeof liveStreams.$inferSelect;
export type FeedInteraction = typeof feedInteractions.$inferSelect;
export type Follow = typeof follows.$inferSelect;
export type TokenSupplyEvent = typeof tokenSupplyEvents.$inferSelect;
export type AdminAuditLog = typeof adminAuditLogs.$inferSelect;
export type HopeAiActionRun = typeof hopeAiActionRuns.$inferSelect;
export type ApiKey = typeof apiKeys.$inferSelect;
export type Referral = typeof referrals.$inferSelect;
export type Leaderboard = typeof leaderboard.$inferSelect;
