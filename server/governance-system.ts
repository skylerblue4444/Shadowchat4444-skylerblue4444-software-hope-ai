/**
 * GOVERNANCE SYSTEM - Enterprise Production Grade
 * Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
 * Version: 4.0.0 — Decentralized Governance & Treasury Management
 * 
 * Complete governance system with voting, proposals, treasury management,
 * delegation, and multi-signature approval workflows
 */

import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

// ─── Governance Types ─────────────────────────────────────────────────────
export interface Proposal {
  proposalId: string;
  title: string;
  description: string;
  proposer: string;
  type: 'budget' | 'parameter' | 'upgrade' | 'partnership' | 'charity' | 'feature';
  status: 'draft' | 'active' | 'passed' | 'failed' | 'executed' | 'cancelled';
  votingStartTime: number;
  votingEndTime: number;
  executionTime?: number;
  budget?: number;
  requiredQuorum: number;
  requiredMajority: number;
  votes: Map<string, Vote>;
  totalVotes: number;
  yesVotes: number;
  noVotes: number;
  abstainVotes: number;
}

export interface Vote {
  voterId: string;
  proposalId: string;
  choice: 'yes' | 'no' | 'abstain';
  votingPower: number;
  timestamp: number;
  reason?: string;
}

export interface Treasury {
  treasuryId: string;
  totalBalance: number;
  currency: string;
  allocations: Map<string, TreasuryAllocation>;
  transactions: TreasuryTransaction[];
  lastUpdated: number;
}

export interface TreasuryAllocation {
  id: string;
  category: 'development' | 'marketing' | 'operations' | 'charity' | 'reserves' | 'rewards';
  amount: number;
  percentage: number;
  spent: number;
  remaining: number;
  lastUpdated: number;
}

export interface TreasuryTransaction {
  id: string;
  type: 'allocation' | 'spending' | 'income' | 'transfer';
  amount: number;
  from?: string;
  to?: string;
  description: string;
  approvalStatus: 'pending' | 'approved' | 'rejected' | 'executed';
  timestamp: number;
  executedAt?: number;
}

export interface Delegation {
  delegationId: string;
  delegator: string;
  delegate: string;
  votingPower: number;
  delegatedAt: number;
  revokedAt?: number;
  active: boolean;
}

export interface MultiSigApproval {
  approvalId: string;
  action: string;
  requiredSignatures: number;
  signatures: Map<string, { signer: string; timestamp: number }>;
  status: 'pending' | 'approved' | 'rejected' | 'executed';
  createdAt: number;
  executedAt?: number;
}

export interface GovernanceAnalytics {
  period: 'daily' | 'weekly' | 'monthly';
  totalProposals: number;
  passedProposals: number;
  failedProposals: number;
  averageParticipation: number;
  averageQuorum: number;
  treasuryStatus: Treasury;
  generatedAt: number;
}

// ─── Governance System ────────────────────────────────────────────────────
export class GovernanceSystem {
  private proposals: Map<string, Proposal> = new Map();
  private votes: Map<string, Vote> = new Map();
  private treasury: Map<string, Treasury> = new Map();
  private delegations: Map<string, Delegation> = new Map();
  private multiSigApprovals: Map<string, MultiSigApproval> = new Map();
  private analytics: GovernanceAnalytics[] = [];

  constructor() {
    this.initializeTreasury();
    console.log('🏛️ Governance System initialized');
  }

  private initializeTreasury() {
    const treasury: Treasury = {
      treasuryId: 'main-treasury',
      totalBalance: 10000000,
      currency: 'SKY4444',
      allocations: new Map([
        [
          'development',
          {
            id: 'alloc-dev',
            category: 'development',
            amount: 3000000,
            percentage: 30,
            spent: 500000,
            remaining: 2500000,
            lastUpdated: Date.now(),
          },
        ],
        [
          'marketing',
          {
            id: 'alloc-mkt',
            category: 'marketing',
            amount: 2000000,
            percentage: 20,
            spent: 300000,
            remaining: 1700000,
            lastUpdated: Date.now(),
          },
        ],
        [
          'operations',
          {
            id: 'alloc-ops',
            category: 'operations',
            amount: 2000000,
            percentage: 20,
            spent: 400000,
            remaining: 1600000,
            lastUpdated: Date.now(),
          },
        ],
        [
          'charity',
          {
            id: 'alloc-charity',
            category: 'charity',
            amount: 1500000,
            percentage: 15,
            spent: 100000,
            remaining: 1400000,
            lastUpdated: Date.now(),
          },
        ],
        [
          'reserves',
          {
            id: 'alloc-reserves',
            category: 'reserves',
            amount: 1500000,
            percentage: 15,
            spent: 0,
            remaining: 1500000,
            lastUpdated: Date.now(),
          },
        ],
      ]),
      transactions: [],
      lastUpdated: Date.now(),
    };

    this.treasury.set('main-treasury', treasury);
  }

  // ─── Proposal Management ──────────────────────────────────────────────
  createProposal(
    title: string,
    description: string,
    proposer: string,
    type: Proposal['type'],
    budget?: number,
    votingDuration: number = 604800000 // 7 days
  ): Proposal {
    const now = Date.now();
    const proposal: Proposal = {
      proposalId: `prop-${Date.now()}`,
      title,
      description,
      proposer,
      type,
      status: 'draft',
      votingStartTime: now + 86400000, // Start in 1 day
      votingEndTime: now + 86400000 + votingDuration,
      budget,
      requiredQuorum: 40, // 40% participation
      requiredMajority: 50, // 50% majority
      votes: new Map(),
      totalVotes: 0,
      yesVotes: 0,
      noVotes: 0,
      abstainVotes: 0,
    };

    this.proposals.set(proposal.proposalId, proposal);

    console.log(`📋 Proposal Created: ${title} (${type})`);
    return proposal;
  }

  getProposal(proposalId: string): Proposal | undefined {
    return this.proposals.get(proposalId);
  }

  getActiveProposals(): Proposal[] {
    const now = Date.now();
    return Array.from(this.proposals.values()).filter(
      (p) => p.status === 'active' && p.votingStartTime <= now && p.votingEndTime > now
    );
  }

  activateProposal(proposalId: string): Proposal | undefined {
    const proposal = this.proposals.get(proposalId);
    if (!proposal) return undefined;

    proposal.status = 'active';
    console.log(`✅ Proposal Activated: ${proposal.title}`);

    return proposal;
  }

  // ─── Voting System ────────────────────────────────────────────────────
  castVote(
    proposalId: string,
    voterId: string,
    choice: 'yes' | 'no' | 'abstain',
    votingPower: number,
    reason?: string
  ): Vote {
    const proposal = this.proposals.get(proposalId);
    if (!proposal) throw new Error('Proposal not found');

    const vote: Vote = {
      voterId,
      proposalId,
      choice,
      votingPower,
      timestamp: Date.now(),
      reason,
    };

    this.votes.set(`${proposalId}-${voterId}`, vote);
    proposal.votes.set(voterId, vote);

    // Update vote counts
    proposal.totalVotes += votingPower;
    switch (choice) {
      case 'yes':
        proposal.yesVotes += votingPower;
        break;
      case 'no':
        proposal.noVotes += votingPower;
        break;
      case 'abstain':
        proposal.abstainVotes += votingPower;
        break;
    }

    // Check if proposal should be finalized
    this.checkProposalFinalization(proposalId);

    console.log(`🗳️ Vote Cast: ${voterId} voted ${choice} on ${proposalId}`);
    return vote;
  }

  private checkProposalFinalization(proposalId: string): void {
    const proposal = this.proposals.get(proposalId);
    if (!proposal || proposal.status !== 'active') return;

    const now = Date.now();
    if (now > proposal.votingEndTime) {
      this.finalizeProposal(proposalId);
    }
  }

  private finalizeProposal(proposalId: string): void {
    const proposal = this.proposals.get(proposalId);
    if (!proposal) return;

    const totalVotingPower = 1000000; // Total voting power in ecosystem
    const participationRate = (proposal.totalVotes / totalVotingPower) * 100;
    const majorityPercentage = (proposal.yesVotes / proposal.totalVotes) * 100;

    if (participationRate >= proposal.requiredQuorum && majorityPercentage >= proposal.requiredMajority) {
      proposal.status = 'passed';
      console.log(`✅ Proposal Passed: ${proposal.title}`);
    } else {
      proposal.status = 'failed';
      console.log(`❌ Proposal Failed: ${proposal.title}`);
    }
  }

  // ─── Delegation System ────────────────────────────────────────────────
  delegateVotingPower(delegator: string, delegate: string, votingPower: number): Delegation {
    const delegation: Delegation = {
      delegationId: `deleg-${Date.now()}`,
      delegator,
      delegate,
      votingPower,
      delegatedAt: Date.now(),
      active: true,
    };

    this.delegations.set(delegation.delegationId, delegation);

    console.log(`🤝 Voting Power Delegated: ${delegator} → ${delegate} (${votingPower} power)`);
    return delegation;
  }

  revokeDelegation(delegationId: string): Delegation | undefined {
    const delegation = this.delegations.get(delegationId);
    if (!delegation) return undefined;

    delegation.active = false;
    delegation.revokedAt = Date.now();

    console.log(`🔄 Delegation Revoked: ${delegation.delegator} ← ${delegation.delegate}`);
    return delegation;
  }

  // ─── Treasury Management ──────────────────────────────────────────────
  getTreasury(treasuryId: string = 'main-treasury'): Treasury | undefined {
    return this.treasury.get(treasuryId);
  }

  allocateFunds(
    treasuryId: string,
    category: TreasuryAllocation['category'],
    amount: number
  ): TreasuryAllocation | undefined {
    const treasury = this.treasury.get(treasuryId);
    if (!treasury) return undefined;

    const allocation = treasury.allocations.get(category);
    if (!allocation) return undefined;

    allocation.amount = amount;
    allocation.percentage = (amount / treasury.totalBalance) * 100;
    allocation.remaining = allocation.amount - allocation.spent;
    allocation.lastUpdated = Date.now();

    console.log(`💰 Funds Allocated: ${category} = ${amount}`);
    return allocation;
  }

  recordTreasuryTransaction(
    treasuryId: string,
    type: TreasuryTransaction['type'],
    amount: number,
    description: string,
    from?: string,
    to?: string
  ): TreasuryTransaction {
    const treasury = this.treasury.get(treasuryId);
    if (!treasury) throw new Error('Treasury not found');

    const transaction: TreasuryTransaction = {
      id: `txn-${Date.now()}`,
      type,
      amount,
      from,
      to,
      description,
      approvalStatus: 'pending',
      timestamp: Date.now(),
    };

    treasury.transactions.push(transaction);

    if (type === 'income') {
      treasury.totalBalance += amount;
    } else if (type === 'spending' && to) {
      treasury.totalBalance -= amount;
      const allocation = treasury.allocations.get(to as any);
      if (allocation) {
        allocation.spent += amount;
        allocation.remaining = allocation.amount - allocation.spent;
      }
    }

    console.log(`📊 Treasury Transaction: ${description} (${amount})`);
    return transaction;
  }

  // ─── Multi-Signature Approvals ────────────────────────────────────────
  createMultiSigApproval(action: string, requiredSignatures: number): MultiSigApproval {
    const approval: MultiSigApproval = {
      approvalId: `multisig-${Date.now()}`,
      action,
      requiredSignatures,
      signatures: new Map(),
      status: 'pending',
      createdAt: Date.now(),
    };

    this.multiSigApprovals.set(approval.approvalId, approval);

    console.log(`🔐 Multi-Sig Approval Created: ${action} (${requiredSignatures} signatures required)`);
    return approval;
  }

  addSignature(approvalId: string, signer: string): MultiSigApproval | undefined {
    const approval = this.multiSigApprovals.get(approvalId);
    if (!approval) return undefined;

    approval.signatures.set(signer, { signer, timestamp: Date.now() });

    if (approval.signatures.size >= approval.requiredSignatures) {
      approval.status = 'approved';
      approval.executedAt = Date.now();
      console.log(`✅ Multi-Sig Approval Executed: ${approval.action}`);
    }

    return approval;
  }

  // ─── Analytics ────────────────────────────────────────────────────────
  generateAnalytics(period: 'daily' | 'weekly' | 'monthly'): GovernanceAnalytics {
    const proposals = Array.from(this.proposals.values());
    const passed = proposals.filter((p) => p.status === 'passed').length;
    const failed = proposals.filter((p) => p.status === 'failed').length;
    const participation = proposals.length > 0 ? proposals.reduce((sum, p) => sum + p.totalVotes, 0) / proposals.length : 0;

    const analytics: GovernanceAnalytics = {
      period,
      totalProposals: proposals.length,
      passedProposals: passed,
      failedProposals: failed,
      averageParticipation: participation,
      averageQuorum: 40,
      treasuryStatus: this.treasury.get('main-treasury')!,
      generatedAt: Date.now(),
    };

    this.analytics.push(analytics);
    return analytics;
  }

  getAnalytics(period?: 'daily' | 'weekly' | 'monthly'): GovernanceAnalytics[] {
    if (period) {
      return this.analytics.filter((a) => a.period === period);
    }
    return this.analytics;
  }

  // ─── System Status ────────────────────────────────────────────────────
  getSystemStatus(): object {
    const proposals = Array.from(this.proposals.values());
    const activeProposals = this.getActiveProposals();
    const treasury = this.treasury.get('main-treasury');

    return {
      timestamp: Date.now(),
      totalProposals: proposals.length,
      activeProposals: activeProposals.length,
      passedProposals: proposals.filter((p) => p.status === 'passed').length,
      failedProposals: proposals.filter((p) => p.status === 'failed').length,
      totalVotes: Array.from(this.votes.values()).length,
      activeDelegations: Array.from(this.delegations.values()).filter((d) => d.active).length,
      treasuryBalance: treasury?.totalBalance || 0,
      systemStatus: 'OPERATIONAL',
    };
  }
}

// ─── Fastify Routes ───────────────────────────────────────────────────────
export async function registerGovernanceRoutes(
  fastify: FastifyInstance,
  governance: GovernanceSystem
) {
  fastify.post('/api/governance/proposal/create', async (request: FastifyRequest, reply: FastifyReply) => {
    const { title, description, proposer, type, budget, votingDuration } = request.body as {
      title: string;
      description: string;
      proposer: string;
      type: Proposal['type'];
      budget?: number;
      votingDuration?: number;
    };

    const proposal = governance.createProposal(title, description, proposer, type, budget, votingDuration);
    reply.send({ success: true, proposal });
  });

  fastify.get('/api/governance/proposals/active', async (request: FastifyRequest, reply: FastifyReply) => {
    const proposals = governance.getActiveProposals();
    reply.send({ proposals });
  });

  fastify.post('/api/governance/vote/cast', async (request: FastifyRequest, reply: FastifyReply) => {
    const { proposalId, voterId, choice, votingPower, reason } = request.body as {
      proposalId: string;
      voterId: string;
      choice: 'yes' | 'no' | 'abstain';
      votingPower: number;
      reason?: string;
    };

    try {
      const vote = governance.castVote(proposalId, voterId, choice, votingPower, reason);
      reply.send({ success: true, vote });
    } catch (error) {
      reply.status(400).send({ success: false, error: (error as Error).message });
    }
  });

  fastify.post('/api/governance/delegate', async (request: FastifyRequest, reply: FastifyReply) => {
    const { delegator, delegate, votingPower } = request.body as {
      delegator: string;
      delegate: string;
      votingPower: number;
    };

    const delegation = governance.delegateVotingPower(delegator, delegate, votingPower);
    reply.send({ success: true, delegation });
  });

  fastify.get('/api/governance/treasury', async (request: FastifyRequest, reply: FastifyReply) => {
    const treasury = governance.getTreasury();
    reply.send(treasury || { error: 'Treasury not found' });
  });

  fastify.get('/api/governance/system/status', async (request: FastifyRequest, reply: FastifyReply) => {
    const status = governance.getSystemStatus();
    reply.send(status);
  });
}

export default GovernanceSystem;
