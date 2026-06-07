// server/lib/command-control-20250520-v11.ts
// Central Command & Control Layer - Production Polish v11
// Real transaction orchestration, audit hooks, error boundaries, persistence
// Thick, production-grade, heavily commented

import { db } from '@/drizzle/db';
import { eq, sql } from 'drizzle-orm';
import { users, transactions, miningSessions, stakingPositions } from '@/drizzle/schema';

interface CommandContext {
  userId: string;
  action: string;
  payload: any;
  timestamp: Date;
}

interface AuditLog {
  id: string;
  userId: string;
  action: string;
  details: any;
  status: 'success' | 'failed';
  timestamp: Date;
}

export class CommandControl {
  private auditLogs: AuditLog[] = [];

  /**
   * Central command executor with full transaction wrapping and audit
   */
  async executeCommand(ctx: CommandContext) {
    const startTime = Date.now();
    let status: 'success' | 'failed' = 'success';
    let result: any = null;

    try {
      await db.transaction(async (tx) => {
        switch (ctx.action) {
          case 'mining.start':
            result = await this.handleStartMining(tx, ctx);
            break;
          case 'wallet.transfer':
            result = await this.handleWalletTransfer(tx, ctx);
            break;
          case 'tip.send':
            result = await this.handleTipSend(tx, ctx);
            break;
          case 'staking.stake':
            result = await this.handleStaking(tx, ctx);
            break;
          default:
            throw new Error(`Unknown command: ${ctx.action}`);
        }
      });

      this.logAudit(ctx, 'success', result);
    } catch (error: any) {
      status = 'failed';
      this.logAudit(ctx, 'failed', { error: error.message });
      throw error;
    }

    return {
      success: status === 'success',
      result,
      durationMs: Date.now() - startTime,
    };
  }

  private async handleStartMining(tx: any, ctx: CommandContext) {
    const { coin = 'SKY4444' } = ctx.payload;
    
    // Create or resume mining session with real DB insert
    const [session] = await tx.insert(miningSessions).values({
      userId: ctx.userId,
      coin,
      hashRate: 0,
      blocksFound: 0,
      balance: 0,
      status: 'active',
      startedAt: new Date(),
    }).returning();

    return { sessionId: session.id, status: 'mining_started' };
  }

  private async handleWalletTransfer(tx: any, ctx: CommandContext) {
    const { toUserId, amount, coin = 'SKY4444' } = ctx.payload;

    // Atomic balance update
    await tx.update(users)
      .set({ balance: sql`balance - ${amount}` })
      .where(eq(users.id, ctx.userId));

    await tx.update(users)
      .set({ balance: sql`balance + ${amount}` })
      .where(eq(users.id, toUserId));

    // Record transaction
    await tx.insert(transactions).values({
      fromUserId: ctx.userId,
      toUserId,
      amount,
      coin,
      type: 'transfer',
      status: 'completed',
      createdAt: new Date(),
    });

    return { transferred: amount, to: toUserId };
  }

  private async handleTipSend(tx: any, ctx: CommandContext) {
    const { toUserId, amount, coin = 'SKY4444' } = ctx.payload;
    const platformFee = Math.floor(amount * 0.15);
    const charityAmount = Math.floor(platformFee * 0.33);
    const netAmount = amount - platformFee;

    // Deduct from sender
    await tx.update(users)
      .set({ balance: sql`balance - ${amount}` })
      .where(eq(users.id, ctx.userId));

    // Credit recipient (net)
    await tx.update(users)
      .set({ balance: sql`balance + ${netAmount}` })
      .where(eq(users.id, toUserId));

    // Record tip transaction with fee breakdown
    await tx.insert(transactions).values({
      fromUserId: ctx.userId,
      toUserId,
      amount,
      coin,
      type: 'tip',
      metadata: { platformFee, charityAmount, netAmount },
      status: 'completed',
      createdAt: new Date(),
    });

    return { tipped: netAmount, fee: platformFee, charity: charityAmount };
  }

  private async handleStaking(tx: any, ctx: CommandContext) {
    const { amount, apy = 12.5 } = ctx.payload;

    const [position] = await tx.insert(stakingPositions).values({
      userId: ctx.userId,
      amount,
      apy,
      lockedUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      rewardsEarned: 0,
      status: 'active',
    }).returning();

    return { positionId: position.id, apy };
  }

  private logAudit(ctx: CommandContext, status: 'success' | 'failed', details: any) {
    const log: AuditLog = {
      id: crypto.randomUUID(),
      userId: ctx.userId,
      action: ctx.action,
      details,
      status,
      timestamp: new Date(),
    };
    this.auditLogs.push(log);
    // In production: also persist to dedicated audit table
    console.log(`[AUDIT] ${status.toUpperCase()}: ${ctx.action} by ${ctx.userId}`);
  }

  getAuditLogs(userId?: string) {
    return userId 
      ? this.auditLogs.filter(log => log.userId === userId)
      : this.auditLogs;
  }
}

export const commandControl = new CommandControl();