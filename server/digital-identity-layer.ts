/**
 * DIGITAL IDENTITY LAYER - Enterprise Production Grade
 * Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
 * Version: 4.0.0 — Persistent Digital Identity Infrastructure
 * 
 * Complete digital identity system with reputation scoring, wallet-linked identities,
 * governance trust levels, creator credibility, verified contributors, and role-based permissions
 */

import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

// ─── Identity Types ───────────────────────────────────────────────────────
export type UserRole = 'user' | 'creator' | 'vendor' | 'moderator' | 'governance_member' | 'admin';

export interface DigitalIdentity {
  userId: string;
  username: string;
  walletAddress: string;
  roles: UserRole[];
  reputationScore: number; // 0-1000
  trustLevel: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  creatorCredibility: number; // 0-100
  verifiedContributor: boolean;
  stakeAmount: number;
  influenceWeight: number; // 0-100
  socialGraphRank: number; // 0-100
  createdAt: number;
  lastUpdated: number;
}

export interface ReputationHistory {
  userId: string;
  timestamp: number;
  action: string;
  pointsEarned: number;
  reason: string;
  metadata?: Record<string, any>;
}

export interface TrustMetric {
  userId: string;
  marketplaceReputation: number; // 0-100
  governanceParticipation: number; // 0-100
  creatorImpact: number; // 0-100
  socialActivity: number; // 0-100
  stakingCommitment: number; // 0-100
  overallTrust: number; // 0-100
  lastCalculated: number;
}

export interface CreatorCredibility {
  creatorId: string;
  verificationLevel: 'unverified' | 'verified' | 'certified' | 'elite';
  nftsSold: number;
  totalEarnings: number;
  followerCount: number;
  engagementRate: number;
  averageRating: number; // 0-5
  totalReviews: number;
  credibilityScore: number; // 0-100
  badges: string[];
}

export interface RolePermission {
  role: UserRole;
  permissions: {
    canCreateContent: boolean;
    canTrade: boolean;
    canVend: boolean;
    canModerate: boolean;
    canParticipateInGovernance: boolean;
    canStake: boolean;
    canMint: boolean;
    canAccessAnalytics: boolean;
    canManageUsers: boolean;
  };
}

export interface VerificationRecord {
  userId: string;
  verificationId: string;
  type: 'email' | 'phone' | 'kyc' | 'creator_verification' | 'vendor_verification';
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  verifiedAt?: number;
  expiresAt?: number;
  metadata?: Record<string, any>;
}

// ─── Digital Identity Layer ───────────────────────────────────────────────
export class DigitalIdentityLayer {
  private identities: Map<string, DigitalIdentity> = new Map();
  private reputationHistory: Map<string, ReputationHistory[]> = new Map();
  private trustMetrics: Map<string, TrustMetric> = new Map();
  private creatorCredentials: Map<string, CreatorCredibility> = new Map();
  private verifications: Map<string, VerificationRecord> = new Map();
  private rolePermissions: Map<UserRole, RolePermission> = new Map();

  constructor() {
    this.initializeRolePermissions();
  }

  private initializeRolePermissions() {
    const roles: RolePermission[] = [
      {
        role: 'user',
        permissions: {
          canCreateContent: false,
          canTrade: true,
          canVend: false,
          canModerate: false,
          canParticipateInGovernance: false,
          canStake: false,
          canMint: false,
          canAccessAnalytics: false,
          canManageUsers: false,
        },
      },
      {
        role: 'creator',
        permissions: {
          canCreateContent: true,
          canTrade: true,
          canVend: false,
          canModerate: false,
          canParticipateInGovernance: true,
          canStake: true,
          canMint: true,
          canAccessAnalytics: true,
          canManageUsers: false,
        },
      },
      {
        role: 'vendor',
        permissions: {
          canCreateContent: true,
          canTrade: true,
          canVend: true,
          canModerate: false,
          canParticipateInGovernance: true,
          canStake: true,
          canMint: false,
          canAccessAnalytics: true,
          canManageUsers: false,
        },
      },
      {
        role: 'moderator',
        permissions: {
          canCreateContent: true,
          canTrade: true,
          canVend: false,
          canModerate: true,
          canParticipateInGovernance: true,
          canStake: true,
          canMint: false,
          canAccessAnalytics: true,
          canManageUsers: true,
        },
      },
      {
        role: 'governance_member',
        permissions: {
          canCreateContent: true,
          canTrade: true,
          canVend: true,
          canModerate: true,
          canParticipateInGovernance: true,
          canStake: true,
          canMint: true,
          canAccessAnalytics: true,
          canManageUsers: true,
        },
      },
      {
        role: 'admin',
        permissions: {
          canCreateContent: true,
          canTrade: true,
          canVend: true,
          canModerate: true,
          canParticipateInGovernance: true,
          canStake: true,
          canMint: true,
          canAccessAnalytics: true,
          canManageUsers: true,
        },
      },
    ];

    roles.forEach((rp) => this.rolePermissions.set(rp.role, rp));
  }

  // ─── Identity Creation & Management ────────────────────────────────────
  createIdentity(userId: string, username: string, walletAddress: string): DigitalIdentity {
    const identity: DigitalIdentity = {
      userId,
      username,
      walletAddress,
      roles: ['user'],
      reputationScore: 100,
      trustLevel: 'bronze',
      creatorCredibility: 0,
      verifiedContributor: false,
      stakeAmount: 0,
      influenceWeight: 10,
      socialGraphRank: 5,
      createdAt: Date.now(),
      lastUpdated: Date.now(),
    };

    this.identities.set(userId, identity);
    this.reputationHistory.set(userId, []);
    this.trustMetrics.set(userId, this.calculateTrustMetrics(userId));

    console.log(`🪪 Digital Identity Created: ${username} (${userId})`);
    return identity;
  }

  getIdentity(userId: string): DigitalIdentity | undefined {
    return this.identities.get(userId);
  }

  // ─── Reputation System ────────────────────────────────────────────────
  addReputationPoints(userId: string, points: number, reason: string, metadata?: Record<string, any>): number {
    const identity = this.identities.get(userId);
    if (!identity) return 0;

    identity.reputationScore += points;
    identity.reputationScore = Math.max(0, Math.min(identity.reputationScore, 1000));

    const record: ReputationHistory = {
      userId,
      timestamp: Date.now(),
      action: reason,
      pointsEarned: points,
      reason,
      metadata,
    };

    if (!this.reputationHistory.has(userId)) {
      this.reputationHistory.set(userId, []);
    }

    this.reputationHistory.get(userId)!.push(record);

    // Update trust level based on reputation
    this.updateTrustLevel(userId);

    console.log(`⭐ Reputation Updated: ${username} +${points} points (${reason})`);
    return identity.reputationScore;
  }

  private updateTrustLevel(userId: string): void {
    const identity = this.identities.get(userId);
    if (!identity) return;

    if (identity.reputationScore >= 900) {
      identity.trustLevel = 'diamond';
    } else if (identity.reputationScore >= 700) {
      identity.trustLevel = 'platinum';
    } else if (identity.reputationScore >= 500) {
      identity.trustLevel = 'gold';
    } else if (identity.reputationScore >= 250) {
      identity.trustLevel = 'silver';
    } else {
      identity.trustLevel = 'bronze';
    }

    identity.lastUpdated = Date.now();
  }

  getReputationHistory(userId: string, limit: number = 50): ReputationHistory[] {
    const history = this.reputationHistory.get(userId) || [];
    return history.slice(-limit);
  }

  // ─── Trust Metrics ────────────────────────────────────────────────────
  private calculateTrustMetrics(userId: string): TrustMetric {
    const identity = this.identities.get(userId);
    if (!identity) {
      return {
        userId,
        marketplaceReputation: 0,
        governanceParticipation: 0,
        creatorImpact: 0,
        socialActivity: 0,
        stakingCommitment: 0,
        overallTrust: 0,
        lastCalculated: Date.now(),
      };
    }

    const marketplaceReputation = Math.min((identity.reputationScore / 1000) * 100, 100);
    const governanceParticipation = identity.roles.includes('governance_member') ? 50 : 0;
    const creatorImpact = identity.creatorCredibility;
    const socialActivity = identity.socialGraphRank * 10;
    const stakingCommitment = Math.min((identity.stakeAmount / 10000) * 100, 100);

    const overallTrust =
      (marketplaceReputation * 0.3 +
        governanceParticipation * 0.2 +
        creatorImpact * 0.2 +
        socialActivity * 0.15 +
        stakingCommitment * 0.15) /
      100;

    return {
      userId,
      marketplaceReputation,
      governanceParticipation,
      creatorImpact,
      socialActivity,
      stakingCommitment,
      overallTrust: Math.round(overallTrust),
      lastCalculated: Date.now(),
    };
  }

  getTrustMetrics(userId: string): TrustMetric {
    let metrics = this.trustMetrics.get(userId);
    if (!metrics) {
      metrics = this.calculateTrustMetrics(userId);
      this.trustMetrics.set(userId, metrics);
    }
    return metrics;
  }

  // ─── Role Management ──────────────────────────────────────────────────
  addRole(userId: string, role: UserRole): DigitalIdentity | undefined {
    const identity = this.identities.get(userId);
    if (!identity) return undefined;

    if (!identity.roles.includes(role)) {
      identity.roles.push(role);
      identity.lastUpdated = Date.now();

      // Update influence weight based on roles
      identity.influenceWeight = identity.roles.length * 15;

      console.log(`🔑 Role Added: ${userId} → ${role}`);
    }

    return identity;
  }

  removeRole(userId: string, role: UserRole): DigitalIdentity | undefined {
    const identity = this.identities.get(userId);
    if (!identity) return undefined;

    const index = identity.roles.indexOf(role);
    if (index > -1) {
      identity.roles.splice(index, 1);
      identity.lastUpdated = Date.now();
      identity.influenceWeight = Math.max(10, identity.roles.length * 15);

      console.log(`🔓 Role Removed: ${userId} ← ${role}`);
    }

    return identity;
  }

  hasPermission(userId: string, permission: keyof RolePermission['permissions']): boolean {
    const identity = this.identities.get(userId);
    if (!identity) return false;

    for (const role of identity.roles) {
      const rolePerms = this.rolePermissions.get(role);
      if (rolePerms && rolePerms.permissions[permission]) {
        return true;
      }
    }

    return false;
  }

  // ─── Creator Credibility ──────────────────────────────────────────────
  recordCreatorCredibility(
    creatorId: string,
    nftsSold: number,
    totalEarnings: number,
    followerCount: number,
    engagementRate: number,
    averageRating: number,
    totalReviews: number
  ): CreatorCredibility {
    const credibilityScore = this.calculateCredibilityScore(
      nftsSold,
      totalEarnings,
      followerCount,
      engagementRate,
      averageRating
    );

    const verificationLevel = this.getVerificationLevel(credibilityScore);

    const credential: CreatorCredibility = {
      creatorId,
      verificationLevel,
      nftsSold,
      totalEarnings,
      followerCount,
      engagementRate,
      averageRating,
      totalReviews,
      credibilityScore,
      badges: this.generateBadges(credibilityScore, averageRating, nftsSold),
    };

    this.creatorCredentials.set(creatorId, credential);

    // Update identity creator credibility
    const identity = this.identities.get(creatorId);
    if (identity) {
      identity.creatorCredibility = credibilityScore;
      this.addRole(creatorId, 'creator');
    }

    return credential;
  }

  private calculateCredibilityScore(
    nftsSold: number,
    totalEarnings: number,
    followerCount: number,
    engagementRate: number,
    averageRating: number
  ): number {
    const nftScore = Math.min((nftsSold / 100) * 20, 20);
    const earningsScore = Math.min((totalEarnings / 100000) * 20, 20);
    const followerScore = Math.min((followerCount / 10000) * 20, 20);
    const engagementScore = Math.min(engagementRate * 0.2, 20);
    const ratingScore = (averageRating / 5) * 20;

    return Math.round(nftScore + earningsScore + followerScore + engagementScore + ratingScore);
  }

  private getVerificationLevel(credibilityScore: number): CreatorCredibility['verificationLevel'] {
    if (credibilityScore >= 90) return 'elite';
    if (credibilityScore >= 75) return 'certified';
    if (credibilityScore >= 50) return 'verified';
    return 'unverified';
  }

  private generateBadges(credibilityScore: number, averageRating: number, nftsSold: number): string[] {
    const badges: string[] = [];

    if (credibilityScore >= 80) badges.push('⭐ Top Creator');
    if (averageRating >= 4.8) badges.push('🏆 Highly Rated');
    if (nftsSold >= 100) badges.push('🎨 Prolific Artist');
    if (credibilityScore >= 90) badges.push('💎 Elite Creator');

    return badges;
  }

  getCreatorCredibility(creatorId: string): CreatorCredibility | undefined {
    return this.creatorCredentials.get(creatorId);
  }

  // ─── Verification System ──────────────────────────────────────────────
  createVerification(
    userId: string,
    type: VerificationRecord['type'],
    metadata?: Record<string, any>
  ): VerificationRecord {
    const record: VerificationRecord = {
      userId,
      verificationId: `verify-${Date.now()}`,
      type,
      status: 'pending',
      metadata,
    };

    this.verifications.set(record.verificationId, record);
    console.log(`📋 Verification Requested: ${userId} (${type})`);

    return record;
  }

  approveVerification(verificationId: string): VerificationRecord | undefined {
    const record = this.verifications.get(verificationId);
    if (!record) return undefined;

    record.status = 'approved';
    record.verifiedAt = Date.now();
    record.expiresAt = Date.now() + 31536000000; // 1 year

    const identity = this.identities.get(record.userId);
    if (identity) {
      identity.verifiedContributor = true;
      this.addReputationPoints(record.userId, 50, `${record.type} verification approved`);
    }

    console.log(`✅ Verification Approved: ${record.userId}`);
    return record;
  }

  getVerifications(userId: string): VerificationRecord[] {
    return Array.from(this.verifications.values()).filter((v) => v.userId === userId);
  }

  // ─── System Status ────────────────────────────────────────────────────
  getSystemStatus(): object {
    return {
      timestamp: Date.now(),
      totalIdentities: this.identities.size,
      totalCreators: this.creatorCredentials.size,
      totalVerifications: this.verifications.size,
      averageReputationScore:
        Array.from(this.identities.values()).reduce((sum, i) => sum + i.reputationScore, 0) /
          this.identities.size || 0,
      systemStatus: 'OPERATIONAL',
    };
  }
}

// ─── Fastify Routes ───────────────────────────────────────────────────────
export async function registerIdentityRoutes(
  fastify: FastifyInstance,
  identity: DigitalIdentityLayer
) {
  fastify.post(
    '/api/identity/create',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { userId, username, walletAddress } = request.body as {
        userId: string;
        username: string;
        walletAddress: string;
      };

      const newIdentity = identity.createIdentity(userId, username, walletAddress);
      reply.send({ success: true, identity: newIdentity });
    }
  );

  fastify.get(
    '/api/identity/:userId',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { userId } = request.params as { userId: string };
      const userIdentity = identity.getIdentity(userId);
      reply.send(userIdentity || { error: 'Identity not found' });
    }
  );

  fastify.post(
    '/api/identity/:userId/reputation/add',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { userId } = request.params as { userId: string };
      const { points, reason, metadata } = request.body as {
        points: number;
        reason: string;
        metadata?: Record<string, any>;
      };

      const newScore = identity.addReputationPoints(userId, points, reason, metadata);
      reply.send({ success: true, reputationScore: newScore });
    }
  );

  fastify.get(
    '/api/identity/:userId/trust-metrics',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { userId } = request.params as { userId: string };
      const metrics = identity.getTrustMetrics(userId);
      reply.send(metrics);
    }
  );

  fastify.post(
    '/api/identity/:userId/role/add',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { userId } = request.params as { userId: string };
      const { role } = request.body as { role: UserRole };

      const updated = identity.addRole(userId, role);
      reply.send({ success: !!updated, identity: updated });
    }
  );

  fastify.get(
    '/api/identity/:userId/system/health',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const health = identity.getSystemStatus();
      reply.send(health);
    }
  );
}

export default DigitalIdentityLayer;
