/**
 * Casino Games Engine
 * ─────────────────────────────────────────────────────────────────────────────
 * Complete casino system: Slots, Blackjack, Roulette, Dice, Poker
 * All games support multi-coin betting with charity donations
 */

import { Decimal } from "decimal.js";

export type GameType = "slots" | "blackjack" | "roulette" | "dice" | "poker";

export interface CasinoGame {
  gameId: string;
  userId: number;
  gameType: GameType;
  coin: string;
  betAmount: string;
  winAmount: string;
  charityDonation: string;
  result: "win" | "lose" | "draw";
  timestamp: Date;
  status: "completed" | "in_progress";
}

export interface SlotResult {
  reels: string[][];
  winAmount: string;
  multiplier: number;
  isWin: boolean;
}

export interface BlackjackHand {
  playerCards: string[];
  dealerCards: string[];
  playerScore: number;
  dealerScore: number;
  result: "win" | "lose" | "push";
  winAmount: string;
}

export interface RouletteResult {
  number: number;
  color: "red" | "black" | "green";
  winAmount: string;
  isWin: boolean;
}

export interface DiceResult {
  roll1: number;
  roll2: number;
  total: number;
  winAmount: string;
  isWin: boolean;
}

export class CasinoGames {
  /**
   * Play Slots Game
   */
  static playSlots(betAmount: string): SlotResult {
    const symbols = ["🍎", "🍊", "🍋", "🍌", "🍉", "💎", "🔔", "7️⃣"];
    const reels: string[][] = [];

    // Generate 3 reels with 3 symbols each
    for (let i = 0; i < 3; i++) {
      const reel: string[] = [];
      for (let j = 0; j < 3; j++) {
        reel.push(symbols[Math.floor(Math.random() * symbols.length)]);
      }
      reels.push(reel);
    }

    // Check for wins
    const middleSymbols = [reels[0][1], reels[1][1], reels[2][1]];
    const allMatch = middleSymbols[0] === middleSymbols[1] && middleSymbols[1] === middleSymbols[2];

    let multiplier = 0;
    if (allMatch) {
      if (middleSymbols[0] === "💎") multiplier = 10;
      else if (middleSymbols[0] === "7️⃣") multiplier = 8;
      else multiplier = 3;
    }

    const winAmount = multiplier > 0
      ? new Decimal(betAmount).times(multiplier).toFixed(18)
      : "0";

    return {
      reels,
      winAmount,
      multiplier,
      isWin: multiplier > 0,
    };
  }

  /**
   * Play Blackjack
   */
  static playBlackjack(betAmount: string): BlackjackHand {
    const deck = this.generateDeck();

    // Deal initial cards
    const playerCards = [this.drawCard(deck), this.drawCard(deck)];
    const dealerCards = [this.drawCard(deck), this.drawCard(deck)];

    const playerScore = this.calculateBlackjackScore(playerCards);
    const dealerScore = this.calculateBlackjackScore(dealerCards);

    // Determine result
    let result: "win" | "lose" | "push" = "lose";
    let winAmount = "0";

    if (playerScore === 21 && playerCards.length === 2) {
      result = "win";
      winAmount = new Decimal(betAmount).times(2.5).toFixed(18);
    } else if (playerScore > 21) {
      result = "lose";
    } else if (dealerScore > 21) {
      result = "win";
      winAmount = new Decimal(betAmount).times(2).toFixed(18);
    } else if (playerScore > dealerScore) {
      result = "win";
      winAmount = new Decimal(betAmount).times(2).toFixed(18);
    } else if (playerScore === dealerScore) {
      result = "push";
      winAmount = betAmount;
    }

    return {
      playerCards,
      dealerCards,
      playerScore,
      dealerScore,
      result,
      winAmount,
    };
  }

  /**
   * Play Roulette
   */
  static playRoulette(betAmount: string, betNumber: number): RouletteResult {
    const spinNumber = Math.floor(Math.random() * 37); // 0-36
    const colors: Record<number, "red" | "black" | "green"> = {};

    // Red numbers
    [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].forEach(
      (n) => (colors[n] = "red"),
    );

    // Black numbers
    [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35].forEach(
      (n) => (colors[n] = "black"),
    );

    // Green (0)
    colors[0] = "green";

    const color = colors[spinNumber];
    const isWin = spinNumber === betNumber;
    const winAmount = isWin
      ? new Decimal(betAmount).times(36).toFixed(18)
      : "0";

    return {
      number: spinNumber,
      color,
      winAmount,
      isWin,
    };
  }

  /**
   * Play Dice Game
   */
  static playDice(betAmount: string, prediction: "high" | "low" | "even" | "odd"): DiceResult {
    const roll1 = Math.floor(Math.random() * 6) + 1;
    const roll2 = Math.floor(Math.random() * 6) + 1;
    const total = roll1 + roll2;

    let isWin = false;
    if (prediction === "high") isWin = total > 7;
    else if (prediction === "low") isWin = total < 7;
    else if (prediction === "even") isWin = total % 2 === 0;
    else if (prediction === "odd") isWin = total % 2 === 1;

    const winAmount = isWin
      ? new Decimal(betAmount).times(1.95).toFixed(18)
      : "0";

    return {
      roll1,
      roll2,
      total,
      winAmount,
      isWin,
    };
  }

  /**
   * Calculate house edge
   */
  static calculateHouseEdge(gameType: GameType): number {
    const edges: Record<GameType, number> = {
      slots: 5,
      blackjack: 0.5,
      roulette: 2.7,
      dice: 2,
      poker: 5,
    };
    return edges[gameType];
  }

  /**
   * Calculate expected value
   */
  static calculateExpectedValue(gameType: GameType, betAmount: string): string {
    const houseEdge = this.calculateHouseEdge(gameType);
    const ev = new Decimal(betAmount).times(100 - houseEdge).dividedBy(100);
    return ev.toFixed(18);
  }

  /**
   * Generate charity donation (1-5% of winnings)
   */
  static generateCharityDonation(winAmount: string): string {
    const donationPercentage = Math.floor(Math.random() * 5) + 1; // 1-5%
    const donation = new Decimal(winAmount).times(donationPercentage).dividedBy(100);
    return donation.toFixed(18);
  }

  /**
   * Calculate player stats
   */
  static calculatePlayerStats(games: CasinoGame[]): {
    totalBet: string;
    totalWon: string;
    totalLost: string;
    winRate: number;
    charityDonated: string;
    profitLoss: string;
  } {
    let totalBet = new Decimal(0);
    let totalWon = new Decimal(0);
    let totalLost = new Decimal(0);
    let charityDonated = new Decimal(0);
    let wins = 0;

    games.forEach((game) => {
      totalBet = totalBet.plus(game.betAmount);
      if (game.result === "win") {
        totalWon = totalWon.plus(game.winAmount);
        wins++;
      } else {
        totalLost = totalLost.plus(game.betAmount);
      }
      charityDonated = charityDonated.plus(game.charityDonation);
    });

    const winRate = games.length > 0 ? (wins / games.length) * 100 : 0;
    const profitLoss = totalWon.minus(totalBet);

    return {
      totalBet: totalBet.toFixed(18),
      totalWon: totalWon.toFixed(18),
      totalLost: totalLost.toFixed(18),
      winRate: parseFloat(winRate.toFixed(2)),
      charityDonated: charityDonated.toFixed(18),
      profitLoss: profitLoss.toFixed(18),
    };
  }

  /**
   * Helper: Generate deck
   */
  private static generateDeck(): string[] {
    const suits = ["♠", "♥", "♦", "♣"];
    const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    const deck: string[] = [];

    suits.forEach((suit) => {
      ranks.forEach((rank) => {
        deck.push(`${rank}${suit}`);
      });
    });

    return deck.sort(() => Math.random() - 0.5);
  }

  /**
   * Helper: Draw card
   */
  private static drawCard(deck: string[]): string {
    return deck.pop() || "2♠";
  }

  /**
   * Helper: Calculate blackjack score
   */
  private static calculateBlackjackScore(cards: string[]): number {
    let score = 0;
    let aces = 0;

    cards.forEach((card) => {
      const rank = card.slice(0, -1);

      if (rank === "A") {
        aces++;
        score += 11;
      } else if (["J", "Q", "K"].includes(rank)) {
        score += 10;
      } else {
        score += parseInt(rank);
      }
    });

    while (score > 21 && aces > 0) {
      score -= 10;
      aces--;
    }

    return score;
  }
}
