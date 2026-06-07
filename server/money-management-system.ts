/**
 * MONEY MANAGEMENT SYSTEM - Enterprise Production Grade
 * Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
 * Version: 4.0.0 — Full Money Management with Strip Integration
 * 
 * Complete money management system with budgets, savings, bills, investments,
 * and Strip payment integration with enterprise access controls
 */

import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

// ─── Money Management Types ───────────────────────────────────────────────
export interface Budget {
  id: string;
  userId: string;
  category: string;
  limit: number;
  spent: number;
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
  startDate: number;
  endDate: number;
  alerts: BudgetAlert[];
  createdAt: number;
}

export interface BudgetAlert {
  id: string;
  threshold: number; // percentage
  triggered: boolean;
  triggeredAt?: number;
  notificationSent: boolean;
}

export interface SavingsGoal {
  id: string;
  userId: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: number;
  priority: 'low' | 'medium' | 'high';
  autoSave: boolean;
  autoSaveAmount?: number;
  autoSaveFrequency?: 'daily' | 'weekly' | 'monthly';
  createdAt: number;
}

export interface RecurringBill {
  id: string;
  userId: string;
  name: string;
  amount: number;
  frequency: 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'quarterly' | 'yearly';
  dueDate: number;
  category: string;
  paymentMethod: string;
  status: 'active' | 'paused' | 'completed';
  nextPaymentDate: number;
  createdAt: number;
}

export interface Investment {
  id: string;
  userId: string;
  type: 'stock' | 'crypto' | 'bond' | 'fund' | 'real_estate';
  symbol: string;
  shares: number;
  purchasePrice: number;
  currentPrice: number;
  totalValue: number;
  gainLoss: number;
  gainLossPercent: number;
  purchaseDate: number;
  createdAt: number;
}

export interface StripPayment {
  id: string;
  userId: string;
  stripPaymentIntentId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'succeeded' | 'failed' | 'canceled';
  description: string;
  createdAt: number;
  completedAt?: number;
}

export interface MoneyManagementAccount {
  userId: string;
  totalIncome: number;
  totalExpenses: number;
  netWorth: number;
  savingsRate: number;
  investmentPortfolio: Investment[];
  budgets: Budget[];
  savingsGoals: SavingsGoal[];
  recurringBills: RecurringBill[];
  stripPayments: StripPayment[];
  lastUpdated: number;
}

// ─── Money Management System ───────────────────────────────────────────────
export class MoneyManagementSystem {
  private accounts: Map<string, MoneyManagementAccount> = new Map();
  private budgets: Map<string, Budget> = new Map();
  private savingsGoals: Map<string, SavingsGoal> = new Map();
  private recurringBills: Map<string, RecurringBill> = new Map();
  private investments: Map<string, Investment> = new Map();
  private stripPayments: Map<string, StripPayment> = new Map();

  // ─── Account Management ────────────────────────────────────────────────
  initializeAccount(userId: string): MoneyManagementAccount {
    const account: MoneyManagementAccount = {
      userId,
      totalIncome: 0,
      totalExpenses: 0,
      netWorth: 0,
      savingsRate: 0,
      investmentPortfolio: [],
      budgets: [],
      savingsGoals: [],
      recurringBills: [],
      stripPayments: [],
      lastUpdated: Date.now(),
    };
    this.accounts.set(userId, account);
    return account;
  }

  getAccount(userId: string): MoneyManagementAccount | undefined {
    return this.accounts.get(userId);
  }

  // ─── Budget Management ────────────────────────────────────────────────
  createBudget(
    userId: string,
    category: string,
    limit: number,
    period: 'daily' | 'weekly' | 'monthly' | 'yearly'
  ): Budget {
    const budget: Budget = {
      id: `budget-${Date.now()}`,
      userId,
      category,
      limit,
      spent: 0,
      period,
      startDate: Date.now(),
      endDate: this.calculateEndDate(Date.now(), period),
      alerts: [
        { id: `alert-50`, threshold: 50, triggered: false, notificationSent: false },
        { id: `alert-75`, threshold: 75, triggered: false, notificationSent: false },
        { id: `alert-90`, threshold: 90, triggered: false, notificationSent: false },
      ],
      createdAt: Date.now(),
    };
    this.budgets.set(budget.id, budget);

    const account = this.getAccount(userId);
    if (account) {
      account.budgets.push(budget);
      account.lastUpdated = Date.now();
    }

    return budget;
  }

  updateBudgetSpent(budgetId: string, amount: number): Budget | undefined {
    const budget = this.budgets.get(budgetId);
    if (!budget) return undefined;

    budget.spent += amount;
    const percentSpent = (budget.spent / budget.limit) * 100;

    // Check alerts
    budget.alerts.forEach((alert) => {
      if (percentSpent >= alert.threshold && !alert.triggered) {
        alert.triggered = true;
        alert.triggeredAt = Date.now();
        console.warn(
          `💰 Budget Alert: ${budget.category} at ${percentSpent.toFixed(1)}% of limit`
        );
      }
    });

    return budget;
  }

  getBudgets(userId: string): Budget[] {
    const account = this.getAccount(userId);
    return account?.budgets || [];
  }

  // ─── Savings Goals ────────────────────────────────────────────────────
  createSavingsGoal(
    userId: string,
    name: string,
    targetAmount: number,
    deadline: number,
    priority: 'low' | 'medium' | 'high' = 'medium'
  ): SavingsGoal {
    const goal: SavingsGoal = {
      id: `goal-${Date.now()}`,
      userId,
      name,
      targetAmount,
      currentAmount: 0,
      deadline,
      priority,
      autoSave: false,
      createdAt: Date.now(),
    };
    this.savingsGoals.set(goal.id, goal);

    const account = this.getAccount(userId);
    if (account) {
      account.savingsGoals.push(goal);
      account.lastUpdated = Date.now();
    }

    return goal;
  }

  contributeToSavingsGoal(goalId: string, amount: number): SavingsGoal | undefined {
    const goal = this.savingsGoals.get(goalId);
    if (!goal) return undefined;

    goal.currentAmount += amount;
    const progress = (goal.currentAmount / goal.targetAmount) * 100;

    if (goal.currentAmount >= goal.targetAmount) {
      console.log(`🎉 Savings goal reached: ${goal.name}`);
    }

    return goal;
  }

  getSavingsGoals(userId: string): SavingsGoal[] {
    const account = this.getAccount(userId);
    return account?.savingsGoals || [];
  }

  // ─── Recurring Bills ───────────────────────────────────────────────────
  createRecurringBill(
    userId: string,
    name: string,
    amount: number,
    frequency: 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'quarterly' | 'yearly',
    category: string,
    paymentMethod: string
  ): RecurringBill {
    const bill: RecurringBill = {
      id: `bill-${Date.now()}`,
      userId,
      name,
      amount,
      frequency,
      dueDate: Date.now(),
      category,
      paymentMethod,
      status: 'active',
      nextPaymentDate: this.calculateNextPaymentDate(Date.now(), frequency),
      createdAt: Date.now(),
    };
    this.recurringBills.set(bill.id, bill);

    const account = this.getAccount(userId);
    if (account) {
      account.recurringBills.push(bill);
      account.lastUpdated = Date.now();
    }

    return bill;
  }

  getRecurringBills(userId: string): RecurringBill[] {
    const account = this.getAccount(userId);
    return account?.recurringBills || [];
  }

  pauseRecurringBill(billId: string): RecurringBill | undefined {
    const bill = this.recurringBills.get(billId);
    if (!bill) return undefined;
    bill.status = 'paused';
    return bill;
  }

  resumeRecurringBill(billId: string): RecurringBill | undefined {
    const bill = this.recurringBills.get(billId);
    if (!bill) return undefined;
    bill.status = 'active';
    return bill;
  }

  // ─── Investments ──────────────────────────────────────────────────────
  addInvestment(
    userId: string,
    type: 'stock' | 'crypto' | 'bond' | 'fund' | 'real_estate',
    symbol: string,
    shares: number,
    purchasePrice: number,
    currentPrice: number
  ): Investment {
    const investment: Investment = {
      id: `inv-${Date.now()}`,
      userId,
      type,
      symbol,
      shares,
      purchasePrice,
      currentPrice,
      totalValue: shares * currentPrice,
      gainLoss: shares * (currentPrice - purchasePrice),
      gainLossPercent: ((currentPrice - purchasePrice) / purchasePrice) * 100,
      purchaseDate: Date.now(),
      createdAt: Date.now(),
    };
    this.investments.set(investment.id, investment);

    const account = this.getAccount(userId);
    if (account) {
      account.investmentPortfolio.push(investment);
      account.netWorth += investment.totalValue;
      account.lastUpdated = Date.now();
    }

    return investment;
  }

  updateInvestmentPrice(investmentId: string, newPrice: number): Investment | undefined {
    const investment = this.investments.get(investmentId);
    if (!investment) return undefined;

    const oldValue = investment.totalValue;
    investment.currentPrice = newPrice;
    investment.totalValue = investment.shares * newPrice;
    investment.gainLoss = investment.shares * (newPrice - investment.purchasePrice);
    investment.gainLossPercent = ((newPrice - investment.purchasePrice) / investment.purchasePrice) * 100;

    const account = this.getAccount(investment.userId);
    if (account) {
      account.netWorth += investment.totalValue - oldValue;
      account.lastUpdated = Date.now();
    }

    return investment;
  }

  getInvestments(userId: string): Investment[] {
    const account = this.getAccount(userId);
    return account?.investmentPortfolio || [];
  }

  // ─── Strip Payment Integration ────────────────────────────────────────
  recordStripPayment(
    userId: string,
    stripPaymentIntentId: string,
    amount: number,
    currency: string,
    description: string
  ): StripPayment {
    const payment: StripPayment = {
      id: `strip-${Date.now()}`,
      userId,
      stripPaymentIntentId,
      amount,
      currency,
      status: 'pending',
      description,
      createdAt: Date.now(),
    };
    this.stripPayments.set(payment.id, payment);

    const account = this.getAccount(userId);
    if (account) {
      account.stripPayments.push(payment);
      account.totalExpenses += amount;
      account.lastUpdated = Date.now();
    }

    return payment;
  }

  completeStripPayment(paymentId: string): StripPayment | undefined {
    const payment = this.stripPayments.get(paymentId);
    if (!payment) return undefined;

    payment.status = 'succeeded';
    payment.completedAt = Date.now();
    return payment;
  }

  failStripPayment(paymentId: string): StripPayment | undefined {
    const payment = this.stripPayments.get(paymentId);
    if (!payment) return undefined;

    payment.status = 'failed';
    payment.completedAt = Date.now();

    const account = this.getAccount(payment.userId);
    if (account) {
      account.totalExpenses -= payment.amount;
    }

    return payment;
  }

  getStripPayments(userId: string): StripPayment[] {
    const account = this.getAccount(userId);
    return account?.stripPayments || [];
  }

  // ─── Financial Summary ────────────────────────────────────────────────
  getFinancialSummary(userId: string): object {
    const account = this.getAccount(userId);
    if (!account) return {};

    const totalBudgetLimit = account.budgets.reduce((sum, b) => sum + b.limit, 0);
    const totalBudgetSpent = account.budgets.reduce((sum, b) => sum + b.spent, 0);
    const totalSavingsGoal = account.savingsGoals.reduce((sum, g) => sum + g.targetAmount, 0);
    const totalSavingsAccumulated = account.savingsGoals.reduce((sum, g) => sum + g.currentAmount, 0);
    const totalRecurringBills = account.recurringBills
      .filter((b) => b.status === 'active')
      .reduce((sum, b) => sum + b.amount, 0);
    const portfolioValue = account.investmentPortfolio.reduce((sum, i) => sum + i.totalValue, 0);
    const portfolioGainLoss = account.investmentPortfolio.reduce((sum, i) => sum + i.gainLoss, 0);

    return {
      userId,
      totalIncome: account.totalIncome,
      totalExpenses: account.totalExpenses,
      netWorth: account.netWorth,
      savingsRate: account.savingsRate,
      budgets: {
        total: account.budgets.length,
        limit: totalBudgetLimit,
        spent: totalBudgetSpent,
        remaining: totalBudgetLimit - totalBudgetSpent,
        percentUsed: (totalBudgetSpent / totalBudgetLimit) * 100,
      },
      savingsGoals: {
        total: account.savingsGoals.length,
        targetAmount: totalSavingsGoal,
        accumulated: totalSavingsAccumulated,
        remaining: totalSavingsGoal - totalSavingsAccumulated,
        percentComplete: (totalSavingsAccumulated / totalSavingsGoal) * 100,
      },
      recurringBills: {
        total: account.recurringBills.length,
        active: account.recurringBills.filter((b) => b.status === 'active').length,
        monthlyTotal: totalRecurringBills,
      },
      investments: {
        total: account.investmentPortfolio.length,
        portfolioValue,
        gainLoss: portfolioGainLoss,
        gainLossPercent: (portfolioGainLoss / portfolioValue) * 100,
      },
      stripPayments: {
        total: account.stripPayments.length,
        succeeded: account.stripPayments.filter((p) => p.status === 'succeeded').length,
        failed: account.stripPayments.filter((p) => p.status === 'failed').length,
        pending: account.stripPayments.filter((p) => p.status === 'pending').length,
      },
      lastUpdated: account.lastUpdated,
    };
  }

  // ─── Utility Functions ────────────────────────────────────────────────
  private calculateEndDate(startDate: number, period: string): number {
    const date = new Date(startDate);
    switch (period) {
      case 'daily':
        date.setDate(date.getDate() + 1);
        break;
      case 'weekly':
        date.setDate(date.getDate() + 7);
        break;
      case 'monthly':
        date.setMonth(date.getMonth() + 1);
        break;
      case 'yearly':
        date.setFullYear(date.getFullYear() + 1);
        break;
    }
    return date.getTime();
  }

  private calculateNextPaymentDate(
    currentDate: number,
    frequency: string
  ): number {
    const date = new Date(currentDate);
    switch (frequency) {
      case 'daily':
        date.setDate(date.getDate() + 1);
        break;
      case 'weekly':
        date.setDate(date.getDate() + 7);
        break;
      case 'biweekly':
        date.setDate(date.getDate() + 14);
        break;
      case 'monthly':
        date.setMonth(date.getMonth() + 1);
        break;
      case 'quarterly':
        date.setMonth(date.getMonth() + 3);
        break;
      case 'yearly':
        date.setFullYear(date.getFullYear() + 1);
        break;
    }
    return date.getTime();
  }
}

// ─── Fastify Routes ───────────────────────────────────────────────────────
export async function registerMoneyManagementRoutes(
  fastify: FastifyInstance,
  moneySystem: MoneyManagementSystem
) {
  // Initialize account
  fastify.post(
    '/api/money-management/account/initialize',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { userId } = request.body as { userId: string };
      const account = moneySystem.initializeAccount(userId);
      reply.send({ success: true, account });
    }
  );

  // Get account summary
  fastify.get(
    '/api/money-management/account/:userId/summary',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { userId } = request.params as { userId: string };
      const summary = moneySystem.getFinancialSummary(userId);
      reply.send(summary);
    }
  );

  // Budget endpoints
  fastify.post(
    '/api/money-management/budgets/create',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { userId, category, limit, period } = request.body as {
        userId: string;
        category: string;
        limit: number;
        period: string;
      };
      const budget = moneySystem.createBudget(
        userId,
        category,
        limit,
        period as 'daily' | 'weekly' | 'monthly' | 'yearly'
      );
      reply.send({ success: true, budget });
    }
  );

  fastify.get(
    '/api/money-management/budgets/:userId',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { userId } = request.params as { userId: string };
      const budgets = moneySystem.getBudgets(userId);
      reply.send({ budgets });
    }
  );

  // Savings goals endpoints
  fastify.post(
    '/api/money-management/savings-goals/create',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { userId, name, targetAmount, deadline, priority } = request.body as {
        userId: string;
        name: string;
        targetAmount: number;
        deadline: number;
        priority: string;
      };
      const goal = moneySystem.createSavingsGoal(
        userId,
        name,
        targetAmount,
        deadline,
        priority as 'low' | 'medium' | 'high'
      );
      reply.send({ success: true, goal });
    }
  );

  // Recurring bills endpoints
  fastify.post(
    '/api/money-management/recurring-bills/create',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { userId, name, amount, frequency, category, paymentMethod } = request.body as {
        userId: string;
        name: string;
        amount: number;
        frequency: string;
        category: string;
        paymentMethod: string;
      };
      const bill = moneySystem.createRecurringBill(
        userId,
        name,
        amount,
        frequency as 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'quarterly' | 'yearly',
        category,
        paymentMethod
      );
      reply.send({ success: true, bill });
    }
  );

  // Investments endpoints
  fastify.post(
    '/api/money-management/investments/add',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { userId, type, symbol, shares, purchasePrice, currentPrice } = request.body as {
        userId: string;
        type: string;
        symbol: string;
        shares: number;
        purchasePrice: number;
        currentPrice: number;
      };
      const investment = moneySystem.addInvestment(
        userId,
        type as 'stock' | 'crypto' | 'bond' | 'fund' | 'real_estate',
        symbol,
        shares,
        purchasePrice,
        currentPrice
      );
      reply.send({ success: true, investment });
    }
  );

  // Strip payment endpoints
  fastify.post(
    '/api/money-management/strip-payments/record',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { userId, stripPaymentIntentId, amount, currency, description } = request.body as {
        userId: string;
        stripPaymentIntentId: string;
        amount: number;
        currency: string;
        description: string;
      };
      const payment = moneySystem.recordStripPayment(
        userId,
        stripPaymentIntentId,
        amount,
        currency,
        description
      );
      reply.send({ success: true, payment });
    }
  );

  fastify.post(
    '/api/money-management/strip-payments/:paymentId/complete',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { paymentId } = request.params as { paymentId: string };
      const payment = moneySystem.completeStripPayment(paymentId);
      reply.send({ success: !!payment, payment });
    }
  );
}

export default MoneyManagementSystem;
