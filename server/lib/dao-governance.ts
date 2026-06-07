/**
 * DAO Governance System
 * ─────────────────────────────────────────────────────────────────────────────
 * Decentralized governance for SKY4444 and SHADOW token holders.
 * Voting power based on token holdings.
 */

import { Decimal } from "decimal.js";

export enum ProposalStatus {
  PENDING = "pending",
  ACTIVE = "active",
  CANCELLED = "cancelled",
  DEFEATED = "defeated",
  SUCCEEDED = "succeeded",
  QUEUED = "queued",
  EXPIRED = "expired",
  EXECUTED = "executed",
}

export enum VoteType {
  FOR = "for",
  AGAINST = "against",
  ABSTAIN = "abstain",
}

export interface DAOProposal {
  id: string;
  title: string;
  description: string;
  proposer: number; // userId
  startBlock: number;
  endBlock: number;
  forVotes: string;
  againstVotes: string;
  abstainVotes: string;
  status: ProposalStatus;
  actions: ProposalAction[];
  createdAt: Date;
  executedAt?: Date;
}

export interface ProposalAction {
  target: string;
  functionSignature: string;
  callData: string;
  value: string;
}

export interface DAOVote {
  proposalId: string;
  voter: number; // userId
  votes: string;
  support: VoteType;
  reason?: string;
  timestamp: Date;
}

export class DAOGovernance {
  private static readonly VOTING_DELAY = 1; // blocks
  private static readonly VOTING_PERIOD = 45818; // ~1 week on Ethereum
  private static readonly PROPOSAL_THRESHOLD = "25000"; // 25k tokens to propose

  /**
   * Check if user can create proposal
   */
  static canPropose(tokenBalance: string): boolean {
    return new Decimal(tokenBalance).gte(this.PROPOSAL_THRESHOLD);
  }

  /**
   * Calculate voting power based on token balance
   */
  static getVotingPower(tokenBalance: string): string {
    // 1 token = 1 vote
    return new Decimal(tokenBalance).toFixed(18);
  }

  /**
   * Calculate proposal quorum (minimum participation)
   * Quorum = 4% of total token supply
   */
  static getQuorumVotes(totalSupply: string): string {
    const quorum = new Decimal(totalSupply).times(0.04);
    return quorum.toFixed(18);
  }

  /**
   * Check if proposal has reached quorum
   */
  static hasReachedQuorum(totalVotes: string, totalSupply: string): boolean {
    const quorumVotes = this.getQuorumVotes(totalSupply);
    return new Decimal(totalVotes).gte(quorumVotes);
  }

  /**
   * Calculate proposal result
   */
  static getProposalResult(
    forVotes: string,
    againstVotes: string,
    abstainVotes: string,
  ): { passed: boolean; margin: string } {
    const forDecimal = new Decimal(forVotes);
    const againstDecimal = new Decimal(againstVotes);

    const passed = forDecimal.gt(againstDecimal);
    const margin = forDecimal.minus(againstDecimal).abs().toFixed(18);

    return { passed, margin };
  }

  /**
   * Calculate voting power percentage
   */
  static getVotingPowerPercentage(votingPower: string, totalSupply: string): number {
    const percentage = new Decimal(votingPower).dividedBy(totalSupply).times(100);
    return parseFloat(percentage.toFixed(4));
  }

  /**
   * Simulate proposal outcome
   */
  static simulateOutcome(
    forVotes: string,
    againstVotes: string,
    abstainVotes: string,
  ): {
    result: "passed" | "defeated";
    forPercentage: number;
    againstPercentage: number;
    abstainPercentage: number;
  } {
    const total = new Decimal(forVotes).plus(againstVotes).plus(abstainVotes);

    if (total.eq(0)) {
      return {
        result: "defeated",
        forPercentage: 0,
        againstPercentage: 0,
        abstainPercentage: 0,
      };
    }

    const forPercentage = parseFloat(
      new Decimal(forVotes).dividedBy(total).times(100).toFixed(2),
    );
    const againstPercentage = parseFloat(
      new Decimal(againstVotes).dividedBy(total).times(100).toFixed(2),
    );
    const abstainPercentage = parseFloat(
      new Decimal(abstainVotes).dividedBy(total).times(100).toFixed(2),
    );

    const result = new Decimal(forVotes).gt(againstVotes) ? "passed" : "defeated";

    return {
      result,
      forPercentage,
      againstPercentage,
      abstainPercentage,
    };
  }

  /**
   * Calculate delegation effect
   * When tokens are delegated, voting power transfers
   */
  static calculateDelegationEffect(
    delegatorBalance: string,
    delegateCurrentVotingPower: string,
  ): { newDelegateVotingPower: string; delegatorVotingPower: string } {
    const delegateNewPower = new Decimal(delegateCurrentVotingPower)
      .plus(delegatorBalance)
      .toFixed(18);
    return {
      newDelegateVotingPower: delegateNewPower,
      delegatorVotingPower: "0",
    };
  }

  /**
   * Calculate proposal voting timeline
   */
  static getVotingTimeline(startBlock: number, currentBlock: number): {
    status: "not_started" | "active" | "ended";
    blocksRemaining: number;
    percentageComplete: number;
  } {
    const votingEndBlock = startBlock + this.VOTING_PERIOD;
    const blocksElapsed = currentBlock - startBlock;

    if (currentBlock < startBlock) {
      return {
        status: "not_started",
        blocksRemaining: startBlock - currentBlock,
        percentageComplete: 0,
      };
    }

    if (currentBlock >= votingEndBlock) {
      return {
        status: "ended",
        blocksRemaining: 0,
        percentageComplete: 100,
      };
    }

    const blocksRemaining = votingEndBlock - currentBlock;
    const percentageComplete = (blocksElapsed / this.VOTING_PERIOD) * 100;

    return {
      status: "active",
      blocksRemaining,
      percentageComplete: parseFloat(percentageComplete.toFixed(2)),
    };
  }
}
