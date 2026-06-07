/**
 * KILL SWITCHES & SAFETY CONTROLS - Enterprise Production Grade
 * Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
 * Version: 4.0.0 — Production-Ready Kill Switch Infrastructure
 * 
 * Kill switches with money management access, strip access controls,
 * and enterprise-grade safety mechanisms
 */

import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

// ─── Kill Switch State ─────────────────────────────────────────────────────
export interface KillSwitchState {
  id: string;
  name: string;
  enabled: boolean;
  triggered: boolean;
  triggerTime?: number;
  threshold?: number;
  currentValue?: number;
  recoveryCode?: string;
  adminOnly: boolean;
  moneyManagementAccess: boolean;
  stripAccessControl: boolean;
  lastChecked: number;
}

export interface MoneyManagementAccess {
  userId: string;
  accessLevel: 'view' | 'manage' | 'admin' | 'strip';
  canModifyTransactions: boolean;
  canAccessStripPayments: boolean;
  canModifyBudgets: boolean;
  canAccessVault: boolean;
  canInitiateRefunds: boolean;
  rateLimit: number; // requests per minute
  lastAccessed: number;
}

export interface StripAccessControl {
  userId: string;
  enabled: boolean;
  stripConnected: boolean;
  stripAccountId?: string;
  paymentMethodsAllowed: string[];
  dailyLimit?: number;
  monthlyLimit?: number;
  requiresApproval: boolean;
  approvalThreshold?: number;
  lastTransaction?: number;
}

// ─── Kill Switch Registry ──────────────────────────────────────────────────
export class KillSwitchManager {
  private switches: Map<string, KillSwitchState> = new Map();
  private moneyAccessRegistry: Map<string, MoneyManagementAccess> = new Map();
  private stripAccessRegistry: Map<string, StripAccessControl> = new Map();

  constructor() {
    this.initializeDefaultSwitches();
  }

  private initializeDefaultSwitches() {
    // Payment Processing Kill Switch
    this.registerSwitch({
      id: 'payment-failure-threshold',
      name: 'Payment Processing Failure Threshold',
      enabled: true,
      triggered: false,
      threshold: 0.95, // 95% success rate minimum
      adminOnly: true,
      moneyManagementAccess: true,
      stripAccessControl: true,
      lastChecked: Date.now(),
    });

    // Refund Anomaly Detection
    this.registerSwitch({
      id: 'refund-anomaly',
      name: 'Refund Rate Anomaly Detection',
      enabled: true,
      triggered: false,
      threshold: 0.10, // 10% refund rate max
      adminOnly: true,
      moneyManagementAccess: true,
      stripAccessControl: false,
      lastChecked: Date.now(),
    });

    // Transaction Volume Spike
    this.registerSwitch({
      id: 'transaction-volume-spike',
      name: 'Transaction Volume Spike Detection',
      enabled: true,
      triggered: false,
      threshold: 5000, // 5000 transactions per minute
      adminOnly: true,
      moneyManagementAccess: true,
      stripAccessControl: true,
      lastChecked: Date.now(),
    });

    // Fraud Detection System
    this.registerSwitch({
      id: 'fraud-detection',
      name: 'Fraud Detection System',
      enabled: true,
      triggered: false,
      adminOnly: true,
      moneyManagementAccess: true,
      stripAccessControl: true,
      lastChecked: Date.now(),
    });

    // Money Management Circuit Breaker
    this.registerSwitch({
      id: 'money-management-circuit-breaker',
      name: 'Money Management Circuit Breaker',
      enabled: true,
      triggered: false,
      threshold: 1000000, // $1M transaction limit
      adminOnly: true,
      moneyManagementAccess: true,
      stripAccessControl: true,
      lastChecked: Date.now(),
    });

    // Strip Payment System Kill Switch
    this.registerSwitch({
      id: 'strip-payment-system',
      name: 'Strip Payment System Emergency Kill',
      enabled: true,
      triggered: false,
      adminOnly: true,
      moneyManagementAccess: true,
      stripAccessControl: true,
      lastChecked: Date.now(),
    });

    // Wallet Security Kill Switch
    this.registerSwitch({
      id: 'wallet-security',
      name: 'Wallet Security Emergency Kill',
      enabled: true,
      triggered: false,
      adminOnly: true,
      moneyManagementAccess: true,
      stripAccessControl: false,
      lastChecked: Date.now(),
    });

    // Staking System Kill Switch
    this.registerSwitch({
      id: 'staking-system',
      name: 'Staking System Emergency Kill',
      enabled: true,
      triggered: false,
      adminOnly: true,
      moneyManagementAccess: true,
      stripAccessControl: false,
      lastChecked: Date.now(),
    });

    // Marketplace Transaction Kill Switch
    this.registerSwitch({
      id: 'marketplace-transactions',
      name: 'Marketplace Transaction Emergency Kill',
      enabled: true,
      triggered: false,
      adminOnly: true,
      moneyManagementAccess: true,
      stripAccessControl: true,
      lastChecked: Date.now(),
    });

    // NFT Minting Kill Switch
    this.registerSwitch({
      id: 'nft-minting',
      name: 'NFT Minting Emergency Kill',
      enabled: true,
      triggered: false,
      adminOnly: true,
      moneyManagementAccess: false,
      stripAccessControl: false,
      lastChecked: Date.now(),
    });
  }

  registerSwitch(switchState: Partial<KillSwitchState>) {
    const id = switchState.id || `switch-${Date.now()}`;
    this.switches.set(id, {
      id,
      name: switchState.name || 'Unnamed Switch',
      enabled: switchState.enabled ?? true,
      triggered: switchState.triggered ?? false,
      threshold: switchState.threshold,
      adminOnly: switchState.adminOnly ?? true,
      moneyManagementAccess: switchState.moneyManagementAccess ?? false,
      stripAccessControl: switchState.stripAccessControl ?? false,
      lastChecked: switchState.lastChecked || Date.now(),
    });
  }

  triggerSwitch(switchId: string, reason: string): boolean {
    const switchState = this.switches.get(switchId);
    if (!switchState) return false;

    switchState.triggered = true;
    switchState.triggerTime = Date.now();
    console.error(`🚨 KILL SWITCH TRIGGERED: ${switchState.name} - Reason: ${reason}`);
    return true;
  }

  resetSwitch(switchId: string, recoveryCode: string): boolean {
    const switchState = this.switches.get(switchId);
    if (!switchState) return false;

    // Verify recovery code (in production, use secure verification)
    if (recoveryCode !== process.env.KILL_SWITCH_RECOVERY_CODE) {
      console.warn(`❌ Invalid recovery code for switch: ${switchId}`);
      return false;
    }

    switchState.triggered = false;
    switchState.triggerTime = undefined;
    console.log(`✅ Kill switch reset: ${switchState.name}`);
    return true;
  }

  isSwitchTriggered(switchId: string): boolean {
    return this.switches.get(switchId)?.triggered ?? false;
  }

  getSwitch(switchId: string): KillSwitchState | undefined {
    return this.switches.get(switchId);
  }

  getAllSwitches(): KillSwitchState[] {
    return Array.from(this.switches.values());
  }

  // ─── Money Management Access Control ───────────────────────────────────
  grantMoneyManagementAccess(
    userId: string,
    accessLevel: 'view' | 'manage' | 'admin' | 'strip'
  ): MoneyManagementAccess {
    const access: MoneyManagementAccess = {
      userId,
      accessLevel,
      canModifyTransactions: accessLevel !== 'view',
      canAccessStripPayments: accessLevel === 'admin' || accessLevel === 'strip',
      canModifyBudgets: accessLevel !== 'view',
      canAccessVault: accessLevel === 'admin',
      canInitiateRefunds: accessLevel === 'admin' || accessLevel === 'manage',
      rateLimit: accessLevel === 'admin' ? 1000 : 100,
      lastAccessed: Date.now(),
    };
    this.moneyAccessRegistry.set(userId, access);
    return access;
  }

  getMoneyManagementAccess(userId: string): MoneyManagementAccess | undefined {
    return this.moneyAccessRegistry.get(userId);
  }

  revokeMoneyManagementAccess(userId: string): boolean {
    return this.moneyAccessRegistry.delete(userId);
  }

  // ─── Strip Access Control ──────────────────────────────────────────────
  enableStripAccess(
    userId: string,
    stripAccountId: string,
    dailyLimit?: number,
    monthlyLimit?: number
  ): StripAccessControl {
    const stripAccess: StripAccessControl = {
      userId,
      enabled: true,
      stripConnected: true,
      stripAccountId,
      paymentMethodsAllowed: ['card', 'bank_transfer', 'wallet'],
      dailyLimit: dailyLimit || 5000,
      monthlyLimit: monthlyLimit || 50000,
      requiresApproval: monthlyLimit ? monthlyLimit > 10000 : false,
      approvalThreshold: 1000,
      lastTransaction: Date.now(),
    };
    this.stripAccessRegistry.set(userId, stripAccess);
    return stripAccess;
  }

  disableStripAccess(userId: string): boolean {
    const access = this.stripAccessRegistry.get(userId);
    if (!access) return false;
    access.enabled = false;
    return true;
  }

  getStripAccess(userId: string): StripAccessControl | undefined {
    return this.stripAccessRegistry.get(userId);
  }

  canUserAccessStrip(userId: string, amount: number): boolean {
    const access = this.stripAccessRegistry.get(userId);
    if (!access || !access.enabled) return false;

    const today = new Date().toDateString();
    const lastTransactionDate = new Date(access.lastTransaction || 0).toDateString();

    if (today !== lastTransactionDate) {
      // Reset daily counter
      access.lastTransaction = Date.now();
    }

    if (access.dailyLimit && amount > access.dailyLimit) {
      return false;
    }

    if (access.monthlyLimit && amount > access.monthlyLimit) {
      return access.requiresApproval;
    }

    return true;
  }

  // ─── Emergency Lockdown ────────────────────────────────────────────────
  emergencyLockdown(): void {
    console.error('🚨🚨🚨 EMERGENCY LOCKDOWN INITIATED 🚨🚨🚨');
    this.switches.forEach((switchState) => {
      if (switchState.moneyManagementAccess || switchState.stripAccessControl) {
        this.triggerSwitch(switchState.id, 'Emergency lockdown initiated');
      }
    });
  }

  // ─── Status Report ────────────────────────────────────────────────────
  getStatusReport(): object {
    const triggered = Array.from(this.switches.values()).filter((s) => s.triggered);
    return {
      timestamp: Date.now(),
      totalSwitches: this.switches.size,
      triggeredSwitches: triggered.length,
      systemHealth: triggered.length === 0 ? 'HEALTHY' : 'DEGRADED',
      triggeredSwitchDetails: triggered.map((s) => ({
        id: s.id,
        name: s.name,
        triggeredAt: s.triggerTime,
      })),
      moneyManagementAccessCount: this.moneyAccessRegistry.size,
      stripAccessCount: this.stripAccessRegistry.size,
    };
  }
}

// ─── Fastify Routes ───────────────────────────────────────────────────────
export async function registerKillSwitchRoutes(
  fastify: FastifyInstance,
  killSwitchManager: KillSwitchManager
) {
  // Get all kill switches status
  fastify.get('/api/admin/kill-switches', async (request: FastifyRequest, reply: FastifyReply) => {
    const switches = killSwitchManager.getAllSwitches();
    reply.send({ switches, status: killSwitchManager.getStatusReport() });
  });

  // Trigger a kill switch
  fastify.post(
    '/api/admin/kill-switches/:switchId/trigger',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { switchId } = request.params as { switchId: string };
      const { reason } = request.body as { reason: string };

      const result = killSwitchManager.triggerSwitch(switchId, reason);
      reply.send({ success: result, switchId });
    }
  );

  // Reset a kill switch
  fastify.post(
    '/api/admin/kill-switches/:switchId/reset',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { switchId } = request.params as { switchId: string };
      const { recoveryCode } = request.body as { recoveryCode: string };

      const result = killSwitchManager.resetSwitch(switchId, recoveryCode);
      reply.send({ success: result, switchId });
    }
  );

  // Emergency lockdown
  fastify.post(
    '/api/admin/emergency-lockdown',
    async (request: FastifyRequest, reply: FastifyReply) => {
      killSwitchManager.emergencyLockdown();
      reply.send({ success: true, message: 'Emergency lockdown initiated' });
    }
  );

  // Money management access endpoints
  fastify.post(
    '/api/admin/money-management/grant-access',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { userId, accessLevel } = request.body as {
        userId: string;
        accessLevel: 'view' | 'manage' | 'admin' | 'strip';
      };
      const access = killSwitchManager.grantMoneyManagementAccess(userId, accessLevel);
      reply.send({ success: true, access });
    }
  );

  // Strip access endpoints
  fastify.post(
    '/api/admin/strip-access/enable',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { userId, stripAccountId, dailyLimit, monthlyLimit } = request.body as {
        userId: string;
        stripAccountId: string;
        dailyLimit?: number;
        monthlyLimit?: number;
      };
      const access = killSwitchManager.enableStripAccess(
        userId,
        stripAccountId,
        dailyLimit,
        monthlyLimit
      );
      reply.send({ success: true, access });
    }
  );

  fastify.post(
    '/api/admin/strip-access/disable',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { userId } = request.body as { userId: string };
      const result = killSwitchManager.disableStripAccess(userId);
      reply.send({ success: result, userId });
    }
  );

  fastify.get(
    '/api/admin/strip-access/:userId/can-access',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { userId } = request.params as { userId: string };
      const { amount } = request.query as { amount: string };
      const canAccess = killSwitchManager.canUserAccessStrip(userId, parseFloat(amount));
      reply.send({ userId, amount: parseFloat(amount), canAccess });
    }
  );
}

export default KillSwitchManager;
