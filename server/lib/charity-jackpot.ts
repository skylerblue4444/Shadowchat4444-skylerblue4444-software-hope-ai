/**
 * Charity Jackpot Gambling Module
 * ─────────────────────────────────────────────────────────────────────────────
 * Fun, transparent gambling system where 50% goes to charity, 50% to winners
 */

import { Decimal } from "decimal.js";

export interface JackpotTicket {
  ticketId: string;
  userId: number;
  coin: string;
  amount: string;
  ticketNumbers: number[];
  purchaseTime: Date;
  drawId: string;
  status: "active" | "won" | "lost";
}

export interface JackpotDraw {
  drawId: string;
  coin: string;
  startTime: Date;
  endTime: Date;
  totalPool: string;
  winningNumbers: number[];
  winners: {
    ticketId: string;
    userId: number;
    winAmount: string;
  }[];
  charityAmount: string;
  status: "active" | "completed" | "cancelled";
}

export interface CharityOrganization {
  orgId: string;
  name: string;
  description: string;
  cause: string;
  website: string;
  verified: boolean;
  totalReceived: string;
  currentDraw: string;
}

export const CHARITY_ORGS: CharityOrganization[] = [
  {
    orgId: "CHARITY-001",
    name: "Water for Africa",
    description: "Providing clean drinking water to communities in Africa",
    cause: "Water & Sanitation",
    website: "https://waterforafrica.org",
    verified: true,
    totalReceived: "250000",
    currentDraw: "DRAW-2026-05",
  },
  {
    orgId: "CHARITY-002",
    name: "Education First",
<<<<<<< HEAD
    description: "Building schools and providing education to underprivileged children",
=======
    description:
      "Building schools and providing education to underprivileged children",
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
    cause: "Education",
    website: "https://educationfirst.org",
    verified: true,
    totalReceived: "180000",
    currentDraw: "DRAW-2026-05",
  },
  {
    orgId: "CHARITY-003",
    name: "Climate Action Now",
    description: "Fighting climate change through renewable energy projects",
    cause: "Environment",
    website: "https://climateactionnow.org",
    verified: true,
    totalReceived: "320000",
    currentDraw: "DRAW-2026-05",
  },
];

export class CharityJackpot {
  /**
   * Generate random ticket numbers (6 numbers from 1-49)
   */
  static generateTicketNumbers(): number[] {
    const numbers = new Set<number>();
    while (numbers.size < 6) {
      numbers.add(Math.floor(Math.random() * 49) + 1);
    }
    return Array.from(numbers).sort((a, b) => a - b);
  }

  /**
   * Purchase jackpot ticket
   */
  static purchaseTicket(
    userId: number,
    coin: string,
    amount: string,
<<<<<<< HEAD
    ticketNumbers?: number[],
=======
    ticketNumbers?: number[]
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
  ): JackpotTicket {
    const numbers = ticketNumbers || this.generateTicketNumbers();

    return {
      ticketId: `TICKET-${Date.now()}`,
      userId,
      coin,
      amount,
      ticketNumbers: numbers,
      purchaseTime: new Date(),
      drawId: `DRAW-${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`,
      status: "active",
    };
  }

  /**
   * Calculate matching numbers
   */
  static calculateMatches(
    ticketNumbers: number[],
<<<<<<< HEAD
    winningNumbers: number[],
  ): number {
    return ticketNumbers.filter((num) => winningNumbers.includes(num)).length;
=======
    winningNumbers: number[]
  ): number {
    return ticketNumbers.filter(num => winningNumbers.includes(num)).length;
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
  }

  /**
   * Calculate win amount based on matches
   */
<<<<<<< HEAD
  static calculateWinAmount(
    matches: number,
    poolAmount: string,
  ): string {
=======
  static calculateWinAmount(matches: number, poolAmount: string): string {
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
    // Prize tiers
    const prizePercentages: Record<number, number> = {
      6: 50, // 50% of pool for 6 matches
      5: 20, // 20% for 5 matches
      4: 15, // 15% for 4 matches
      3: 10, // 10% for 3 matches
      2: 5, // 5% for 2 matches
      1: 0, // No prize for 1 match
      0: 0, // No prize for 0 matches
    };

    const percentage = prizePercentages[matches] || 0;
    const winAmount = new Decimal(poolAmount).times(percentage).dividedBy(100);

    return winAmount.toFixed(18);
  }

  /**
   * Split jackpot pool: 50% winners, 50% charity
   */
  static splitJackpotPool(poolAmount: string): {
    winnerPool: string;
    charityPool: string;
  } {
    const pool = new Decimal(poolAmount);
    const half = pool.dividedBy(2);

    return {
      winnerPool: half.toFixed(18),
      charityPool: half.toFixed(18),
    };
  }

  /**
   * Process draw and determine winners
   */
  static processDraw(
    tickets: JackpotTicket[],
<<<<<<< HEAD
    winningNumbers: number[],
  ): {
    winners: { ticketId: string; userId: number; matches: number; winAmount: string }[];
    charityAmount: string;
  } {
    const { winnerPool, charityPool } = this.splitJackpotPool(
      tickets.reduce((sum, t) => new Decimal(sum).plus(t.amount).toString(), "0"),
    );

    const winners = tickets
      .map((ticket) => {
        const matches = this.calculateMatches(ticket.ticketNumbers, winningNumbers);
=======
    winningNumbers: number[]
  ): {
    winners: {
      ticketId: string;
      userId: number;
      matches: number;
      winAmount: string;
    }[];
    charityAmount: string;
  } {
    const { winnerPool, charityPool } = this.splitJackpotPool(
      tickets.reduce(
        (sum, t) => new Decimal(sum).plus(t.amount).toString(),
        "0"
      )
    );

    const winners = tickets
      .map(ticket => {
        const matches = this.calculateMatches(
          ticket.ticketNumbers,
          winningNumbers
        );
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
        const winAmount = this.calculateWinAmount(matches, winnerPool);

        return {
          ticketId: ticket.ticketId,
          userId: ticket.userId,
          matches,
          winAmount,
        };
      })
<<<<<<< HEAD
      .filter((w) => parseFloat(w.winAmount) > 0);
=======
      .filter(w => parseFloat(w.winAmount) > 0);
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498

    return {
      winners,
      charityAmount: charityPool,
    };
  }

  /**
   * Calculate odds for matching N numbers
   */
  static calculateOdds(matches: number): string {
    // Odds of matching N numbers out of 6 from 49
    const combinations: Record<number, number> = {
      6: 13983816, // 1 in 13.9M
      5: 54201, // 1 in 54k
      4: 1032, // 1 in 1k
      3: 57, // 1 in 57
      2: 7.5, // 1 in 7.5
    };

    const odds = combinations[matches] || 1;
    return `1 in ${Math.round(odds).toLocaleString()}`;
  }

  /**
   * Get expected value for ticket
   */
  static getExpectedValue(ticketPrice: string): {
    expectedValue: string;
    roi: number;
  } {
    // Simplified EV calculation
    // Assuming 50% goes to winners, 50% to charity
    const ev = new Decimal(ticketPrice).times(0.5);
<<<<<<< HEAD
    const roi = new Decimal(ev).minus(ticketPrice).dividedBy(ticketPrice).times(100);
=======
    const roi = new Decimal(ev)
      .minus(ticketPrice)
      .dividedBy(ticketPrice)
      .times(100);
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498

    return {
      expectedValue: ev.toFixed(18),
      roi: parseFloat(roi.toFixed(2)),
    };
  }

  /**
   * Get charity organization by ID
   */
  static getCharityOrg(orgId: string): CharityOrganization | undefined {
<<<<<<< HEAD
    return CHARITY_ORGS.find((org) => org.orgId === orgId);
=======
    return CHARITY_ORGS.find(org => org.orgId === orgId);
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
  }

  /**
   * Get all verified charities
   */
  static getVerifiedCharities(): CharityOrganization[] {
<<<<<<< HEAD
    return CHARITY_ORGS.filter((org) => org.verified);
=======
    return CHARITY_ORGS.filter(org => org.verified);
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
  }

  /**
   * Calculate total charity donations
   */
  static getTotalCharityDonations(): string {
    return CHARITY_ORGS.reduce(
      (sum, org) => new Decimal(sum).plus(org.totalReceived).toString(),
<<<<<<< HEAD
      "0",
=======
      "0"
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
    );
  }

  /**
   * Generate draw statistics
   */
  static generateDrawStats(draw: JackpotDraw): {
    totalTickets: number;
    totalWinners: number;
    largestWin: string;
    averageWin: string;
    charityAmount: string;
  } {
    const totalWinners = draw.winners.length;
    const largestWin = draw.winners.length
<<<<<<< HEAD
      ? draw.winners.reduce((max, w) =>
        new Decimal(w.winAmount).gt(max) ? w.winAmount : max,
        "0",
      )
=======
      ? draw.winners.reduce(
          (max, w) => (new Decimal(w.winAmount).gt(max) ? w.winAmount : max),
          "0"
        )
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
      : "0";

    const averageWin =
      totalWinners > 0
        ? draw.winners
<<<<<<< HEAD
          .reduce((sum, w) => new Decimal(sum).plus(w.winAmount), new Decimal(0))
          .dividedBy(totalWinners)
          .toFixed(18)
=======
            .reduce(
              (sum, w) => new Decimal(sum).plus(w.winAmount),
              new Decimal(0)
            )
            .dividedBy(totalWinners)
            .toFixed(18)
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
        : "0";

    return {
      totalTickets: Math.floor(parseFloat(draw.totalPool) / 10), // Estimate
      totalWinners,
      largestWin,
      averageWin,
      charityAmount: draw.charityAmount,
    };
  }

  /**
   * Check if user is eligible for bonus draw
   */
  static isEligibleForBonusDraw(
    totalTicketsPurchased: number,
<<<<<<< HEAD
    totalSpent: string,
=======
    totalSpent: string
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
  ): boolean {
    // Bonus draw eligibility: 5+ tickets or 500+ coins spent
    return totalTicketsPurchased >= 5 || parseFloat(totalSpent) >= 500;
  }

  /**
   * Calculate loyalty multiplier
   */
  static getLoyaltyMultiplier(totalTicketsPurchased: number): number {
    if (totalTicketsPurchased >= 100) return 1.5; // 50% bonus
    if (totalTicketsPurchased >= 50) return 1.3; // 30% bonus
    if (totalTicketsPurchased >= 20) return 1.15; // 15% bonus
    if (totalTicketsPurchased >= 10) return 1.1; // 10% bonus
    return 1.0;
  }
}
