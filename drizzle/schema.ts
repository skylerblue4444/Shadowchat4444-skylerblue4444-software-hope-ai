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
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
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
export type ApiKey = typeof apiKeys.$inferSelect;
export type Referral = typeof referrals.$inferSelect;
export type Leaderboard = typeof leaderboard.$inferSelect;