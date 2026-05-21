import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, trades, portfolios, posts, messages, vaults, leaderboard } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Trading queries
export async function createTrade(userId: number, trade: any) {
  const db = await getDb();
  if (!db) return null;
  return db.insert(trades).values({ userId, ...trade });
}

export async function getUserTrades(userId: number, limit = 50) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(trades).where(eq(trades.userId, userId)).limit(limit);
}

// Portfolio queries
export async function getOrCreatePortfolio(userId: number) {
  const db = await getDb();
  if (!db) return null;
  const existing = await db.select().from(portfolios).where(eq(portfolios.userId, userId)).limit(1);
  if (existing.length > 0) return existing[0];
  await db.insert(portfolios).values({ userId });
  return db.select().from(portfolios).where(eq(portfolios.userId, userId)).limit(1).then(r => r[0]);
}

// Social queries
export async function createPost(userId: number, content: string, imageUrl?: string) {
  const db = await getDb();
  if (!db) return null;
  return db.insert(posts).values({ userId, content, imageUrl });
}

export async function getFeedPosts(limit = 20, offset = 0) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(posts).orderBy(desc(posts.aiRank)).limit(limit).offset(offset);
}

// Message queries
export async function sendMessage(senderId: number, recipientId: number, content: string, tipAmount = 0) {
  const db = await getDb();
  if (!db) return null;
  return db.insert(messages).values({ senderId, recipientId, content, tipAmount });
}

// Vault queries
export async function createVault(userId: number, vault: any) {
  const db = await getDb();
  if (!db) return null;
  return db.insert(vaults).values({ userId, ...vault });
}

export async function getUserVaults(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(vaults).where(eq(vaults.userId, userId));
}

// Leaderboard queries
export async function getLeaderboard(category: string, limit = 20) {
  const db = await getDb();
  if (!db) return [];
  const orderByField = category === 'xp' ? leaderboard.xpScore : 
                       category === 'mining' ? leaderboard.miningScore :
                       category === 'staking' ? leaderboard.stakingScore :
                       category === 'trading' ? leaderboard.tradingScore :
                       leaderboard.referralScore;
  return db.select().from(leaderboard).orderBy(desc(orderByField)).limit(limit);
}
