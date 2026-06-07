import { z } from 'zod';

/**
 * Sovereign Policy Engine: Free Will, Guardrails, Receipts, Audit Logging
 * 
 * Enables users to define their own policies for:
 * - Transaction limits and approvals
 * - Spending categories and budgets
 * - Automated rules and triggers
 * - Privacy preferences
 * - Data retention policies
 * - Compliance requirements
 */

export type PolicyType = 'transaction' | 'spending' | 'automation' | 'privacy' | 'compliance' | 'custom';
export type PolicyStatus = 'active' | 'paused' | 'archived';
export type ActionType = 'allow' | 'deny' | 'require_approval' | 'log' | 'alert' | 'execute';

export interface Policy {
  id: string;
  userId: number;
  name: string;
  description: string;
  type: PolicyType;
  status: PolicyStatus;
  conditions: {
    field: string;
    operator: 'equals' | 'greater_than' | 'less_than' | 'contains' | 'matches';
    value: any;
  }[];
  actions: {
    type: ActionType;
    payload?: any;
  }[];
  createdAt: Date;
  updatedAt: Date;
  expiresAt?: Date;
}

export interface Receipt {
  id: string;
  userId: number;
  transactionId: string;
  type: 'transaction' | 'purchase' | 'stake' | 'swap' | 'tip';
  amount: string;
  coin: string;
  description: string;
  metadata: Record<string, any>;
  policyApplied?: string;
  createdAt: Date;
}

export interface AuditLog {
  id: string;
  userId: number;
  action: string;
  resource: string;
  resourceId: string;
  changes?: {
    before: any;
    after: any;
  };
  ipAddress?: string;
  userAgent?: string;
  status: 'success' | 'failure';
  reason?: string;
  createdAt: Date;
}

export interface Guardrail {
  id: string;
  userId: number;
  name: string;
  type: 'spending_limit' | 'transaction_limit' | 'rate_limit' | 'whitelist' | 'blacklist' | 'custom';
  threshold: string;
  period: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'unlimited';
  action: 'block' | 'warn' | 'approve' | 'log';
  enabled: boolean;
  createdAt: Date;
}

// ==================== SOVEREIGN POLICY ENGINE CLASS ====================

export class SovereignPolicyEngine {
  private policies: Map<string, Policy> = new Map();
  private receipts: Map<string, Receipt[]> = new Map();
  private auditLogs: Map<string, AuditLog[]> = new Map();
  private guardrails: Map<string, Guardrail[]> = new Map();
  private userPolicies: Map<number, string[]> = new Map();

  /**
   * Create a policy
   */
  createPolicy(
    userId: number,
    name: string,
    description: string,
    type: PolicyType,
    conditions: Policy['conditions'],
    actions: Policy['actions'],
    expiresAt?: Date
  ): Policy {
    const policy: Policy = {
      id: `policy-${Date.now()}-${Math.random()}`,
      userId,
      name,
      description,
      type,
      status: 'active',
      conditions,
      actions,
      createdAt: new Date(),
      updatedAt: new Date(),
      expiresAt,
    };

    this.policies.set(policy.id, policy);

    const userPolicies = this.userPolicies.get(userId) || [];
    userPolicies.push(policy.id);
    this.userPolicies.set(userId, userPolicies);

    return policy;
  }

  /**
   * Get user's policies
   */
  getUserPolicies(userId: number): Policy[] {
    const policyIds = this.userPolicies.get(userId) || [];
    return policyIds
      .map(id => this.policies.get(id))
      .filter(Boolean) as Policy[];
  }

  /**
   * Evaluate policies against an action
   */
  evaluatePolicies(
    userId: number,
    action: {
      type: string;
      amount?: string;
      coin?: string;
      recipient?: string;
      [key: string]: any;
    }
  ): {
    allowed: boolean;
    requiresApproval: boolean;
    actions: ActionType[];
    appliedPolicies: string[];
    reason?: string;
  } {
    const userPolicies = this.getUserPolicies(userId);
    const appliedPolicies: string[] = [];
    let allowed = true;
    let requiresApproval = false;
    const actions: ActionType[] = [];

    for (const policy of userPolicies) {
      if (policy.status !== 'active') continue;
      if (policy.expiresAt && policy.expiresAt < new Date()) continue;

      const conditionsMet = this.evaluateConditions(policy.conditions, action);
      if (conditionsMet) {
        appliedPolicies.push(policy.id);

        for (const policyAction of policy.actions) {
          if (policyAction.type === 'deny') {
            allowed = false;
          } else if (policyAction.type === 'require_approval') {
            requiresApproval = true;
          } else if (policyAction.type === 'alert') {
            actions.push('alert');
          } else if (policyAction.type === 'log') {
            actions.push('log');
          }
        }
      }
    }

    return {
      allowed,
      requiresApproval,
      actions,
      appliedPolicies,
      reason: allowed ? undefined : 'Policy violation',
    };
  }

  /**
   * Evaluate policy conditions
   */
  private evaluateConditions(
    conditions: Policy['conditions'],
    action: Record<string, any>
  ): boolean {
    return conditions.every(condition => {
      const value = action[condition.field];
      if (value === undefined) return false;

      switch (condition.operator) {
        case 'equals':
          return value === condition.value;
        case 'greater_than':
          return parseFloat(value) > parseFloat(condition.value);
        case 'less_than':
          return parseFloat(value) < parseFloat(condition.value);
        case 'contains':
          return String(value).includes(condition.value);
        case 'matches':
          return new RegExp(condition.value).test(String(value));
        default:
          return false;
      }
    });
  }

  /**
   * Create a receipt
   */
  createReceipt(
    userId: number,
    transactionId: string,
    type: Receipt['type'],
    amount: string,
    coin: string,
    description: string,
    metadata: Record<string, any> = {},
    policyApplied?: string
  ): Receipt {
    const receipt: Receipt = {
      id: `receipt-${Date.now()}-${Math.random()}`,
      userId,
      transactionId,
      type,
      amount,
      coin,
      description,
      metadata,
      policyApplied,
      createdAt: new Date(),
    };

    const userReceipts = this.receipts.get(`user-${userId}`) || [];
    userReceipts.push(receipt);
    this.receipts.set(`user-${userId}`, userReceipts);

    return receipt;
  }

  /**
   * Get user's receipts
   */
  getUserReceipts(userId: number, limit: number = 100): Receipt[] {
    return (this.receipts.get(`user-${userId}`) || [])
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  /**
   * Log an audit event
   */
  logAuditEvent(
    userId: number,
    action: string,
    resource: string,
    resourceId: string,
    status: 'success' | 'failure' = 'success',
    changes?: AuditLog['changes'],
    reason?: string,
    ipAddress?: string,
    userAgent?: string
  ): AuditLog {
    const log: AuditLog = {
      id: `audit-${Date.now()}-${Math.random()}`,
      userId,
      action,
      resource,
      resourceId,
      changes,
      ipAddress,
      userAgent,
      status,
      reason,
      createdAt: new Date(),
    };

    const userLogs = this.auditLogs.get(`user-${userId}`) || [];
    userLogs.push(log);
    this.auditLogs.set(`user-${userId}`, userLogs);

    return log;
  }

  /**
   * Get user's audit logs
   */
  getUserAuditLogs(userId: number, limit: number = 100): AuditLog[] {
    return (this.auditLogs.get(`user-${userId}`) || [])
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  /**
   * Create a guardrail
   */
  createGuardrail(
    userId: number,
    name: string,
    type: Guardrail['type'],
    threshold: string,
    period: Guardrail['period'] = 'daily',
    action: Guardrail['action'] = 'warn'
  ): Guardrail {
    const guardrail: Guardrail = {
      id: `guardrail-${Date.now()}-${Math.random()}`,
      userId,
      name,
      type,
      threshold,
      period,
      action,
      enabled: true,
      createdAt: new Date(),
    };

    const userGuardrails = this.guardrails.get(`user-${userId}`) || [];
    userGuardrails.push(guardrail);
    this.guardrails.set(`user-${userId}`, userGuardrails);

    return guardrail;
  }

  /**
   * Get user's guardrails
   */
  getUserGuardrails(userId: number): Guardrail[] {
    return this.guardrails.get(`user-${userId}`) || [];
  }

  /**
   * Check guardrail violations
   */
  checkGuardrailViolations(
    userId: number,
    amount: string,
    type: 'spending' | 'transaction' | 'rate'
  ): { violated: boolean; guardrails: Guardrail[]; action: Guardrail['action'] } {
    const guardrails = this.getUserGuardrails(userId);
    const violated = guardrails.some(g => {
      if (!g.enabled) return false;
      if (g.type === 'spending_limit' && type === 'spending') {
        return parseFloat(amount) > parseFloat(g.threshold);
      }
      if (g.type === 'transaction_limit' && type === 'transaction') {
        return parseFloat(amount) > parseFloat(g.threshold);
      }
      return false;
    });

    const violatedGuardrails = guardrails.filter(g => {
      if (!g.enabled) return false;
      if (g.type === 'spending_limit' && type === 'spending') {
        return parseFloat(amount) > parseFloat(g.threshold);
      }
      if (g.type === 'transaction_limit' && type === 'transaction') {
        return parseFloat(amount) > parseFloat(g.threshold);
      }
      return false;
    });

    const action = violatedGuardrails.length > 0 ? violatedGuardrails[0].action : 'warn';

    return {
      violated,
      guardrails: violatedGuardrails,
      action,
    };
  }

  /**
   * Export audit trail (for compliance)
   */
  exportAuditTrail(userId: number, startDate: Date, endDate: Date): AuditLog[] {
    return (this.auditLogs.get(`user-${userId}`) || []).filter(
      log => log.createdAt >= startDate && log.createdAt <= endDate
    );
  }

  /**
   * Generate compliance report
   */
  generateComplianceReport(userId: number): {
    totalTransactions: number;
    totalReceipts: number;
    auditLogCount: number;
    policiesCount: number;
    guardrailsCount: number;
    lastActivity: Date | null;
  } {
    const receipts = this.receipts.get(`user-${userId}`) || [];
    const logs = this.auditLogs.get(`user-${userId}`) || [];
    const policies = this.userPolicies.get(userId) || [];
    const guardrails = this.guardrails.get(`user-${userId}`) || [];

    const allActivities = [...receipts, ...logs].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );

    return {
      totalTransactions: receipts.length,
      totalReceipts: receipts.length,
      auditLogCount: logs.length,
      policiesCount: policies.length,
      guardrailsCount: guardrails.length,
      lastActivity: allActivities[0]?.createdAt || null,
    };
  }
}

// ==================== SINGLETON INSTANCE ====================

let policyEngineInstance: SovereignPolicyEngine | null = null;

export function getSovereignPolicyEngine(): SovereignPolicyEngine {
  if (!policyEngineInstance) {
    policyEngineInstance = new SovereignPolicyEngine();
  }
  return policyEngineInstance;
}

export function resetSovereignPolicyEngine(): void {
  policyEngineInstance = null;
}
