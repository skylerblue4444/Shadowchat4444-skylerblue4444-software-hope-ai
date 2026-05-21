import { z } from "zod";
import { db } from "../db";
import {
  stripeCustomers,
  payments,
  subscriptions,
  invoices,
  walletTransactions,
  financialMetrics,
  users,
} from "@/drizzle/schema";
import { eq, and } from "drizzle-orm";
import { protectedProcedure, router } from "../_core/trpc";
import {
  createStripeCustomer,
  createPaymentIntent,
  getPaymentIntent,
  confirmPaymentIntent,
  createRefund,
  getCustomerPaymentMethods,
  createSubscription,
  cancelSubscription,
  getSubscription,
} from "../lib/stripe-integration";

export const paymentsRouter = router({
  // Initialize Stripe customer for user
  initializeStripeCustomer: protectedProcedure.mutation(async ({ ctx }) => {
    // Check if customer already exists
    const existing = await db
      .select()
      .from(stripeCustomers)
      .where(eq(stripeCustomers.userId, ctx.user.id))
      .limit(1);

    if (existing.length > 0) {
      return existing[0];
    }

    // Create new Stripe customer
    const stripeCustomer = await createStripeCustomer({
      email: ctx.user.email || `user_${ctx.user.id}@skycoin.local`,
      name: ctx.user.name,
      metadata: {
        userId: ctx.user.id.toString(),
      },
    });

    // Save to database
    const dbCustomer = await db.insert(stripeCustomers).values({
      userId: ctx.user.id,
      stripeCustomerId: stripeCustomer.id,
      email: stripeCustomer.email || "",
    });

    return {
      userId: ctx.user.id,
      stripeCustomerId: stripeCustomer.id,
      email: stripeCustomer.email || "",
    };
  }),

  // Create payment intent
  createPayment: protectedProcedure
    .input(
      z.object({
        amount: z.number().positive(),
        currency: z.string().default("USD"),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Get or create Stripe customer
      let stripeCustomer = await db
        .select()
        .from(stripeCustomers)
        .where(eq(stripeCustomers.userId, ctx.user.id))
        .limit(1);

      if (stripeCustomer.length === 0) {
        const newCustomer = await createStripeCustomer({
          email: ctx.user.email || `user_${ctx.user.id}@skycoin.local`,
          name: ctx.user.name,
          metadata: { userId: ctx.user.id.toString() },
        });

        await db.insert(stripeCustomers).values({
          userId: ctx.user.id,
          stripeCustomerId: newCustomer.id,
          email: newCustomer.email || "",
        });

        stripeCustomer = [
          {
            id: 0,
            userId: ctx.user.id,
            stripeCustomerId: newCustomer.id,
            email: newCustomer.email || "",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ];
      }

      // Create payment intent
      const paymentIntent = await createPaymentIntent(
        stripeCustomer[0].stripeCustomerId,
        {
          amount: input.amount,
          currency: input.currency,
          description: input.description,
          metadata: {
            userId: ctx.user.id.toString(),
          },
        }
      );

      // Save payment to database
      await db.insert(payments).values({
        userId: ctx.user.id,
        stripePaymentIntentId: paymentIntent.id,
        amount: input.amount.toString(),
        currency: input.currency,
        status: "pending",
        description: input.description,
      });

      return {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        amount: input.amount,
        currency: input.currency,
      };
    }),

  // Confirm payment
  confirmPayment: protectedProcedure
    .input(
      z.object({
        paymentIntentId: z.string(),
        paymentMethodId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Confirm with Stripe
      const paymentIntent = await confirmPaymentIntent(
        input.paymentIntentId,
        input.paymentMethodId
      );

      // Update payment status
      await db
        .update(payments)
        .set({
          status: paymentIntent.status as any,
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(payments.stripePaymentIntentId, input.paymentIntentId),
            eq(payments.userId, ctx.user.id)
          )
        );

      // If successful, create wallet transaction and update metrics
      if (paymentIntent.status === "succeeded") {
        await db.insert(walletTransactions).values({
          userId: ctx.user.id,
          type: "deposit",
          amount: (paymentIntent.amount_received / 100).toString(),
          currency: paymentIntent.currency.toUpperCase(),
          status: "completed",
          description: "Payment deposit",
          relatedPaymentId: 0, // Would need to fetch actual ID
        });

        // Update financial metrics
        const metrics = await db
          .select()
          .from(financialMetrics)
          .where(eq(financialMetrics.userId, ctx.user.id))
          .limit(1);

        if (metrics.length > 0) {
          const newTotal = (
            parseFloat(metrics[0].totalSpent) +
            paymentIntent.amount_received / 100
          ).toString();

          await db
            .update(financialMetrics)
            .set({
              totalSpent: newTotal,
              lastPaymentDate: new Date(),
              updatedAt: new Date(),
            })
            .where(eq(financialMetrics.userId, ctx.user.id));
        } else {
          await db.insert(financialMetrics).values({
            userId: ctx.user.id,
            totalSpent: (paymentIntent.amount_received / 100).toString(),
            lastPaymentDate: new Date(),
          });
        }
      }

      return {
        status: paymentIntent.status,
        amount: paymentIntent.amount_received / 100,
      };
    }),

  // Get payment history
  getPaymentHistory: protectedProcedure
    .input(
      z.object({
        limit: z.number().default(20),
        offset: z.number().default(0),
      })
    )
    .query(async ({ ctx, input }) => {
      return await db
        .select()
        .from(payments)
        .where(eq(payments.userId, ctx.user.id))
        .limit(input.limit)
        .offset(input.offset);
    }),

  // Create subscription
  createSubscription: protectedProcedure
    .input(
      z.object({
        priceId: z.string(),
        plan: z.enum(["starter", "pro", "enterprise"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Get Stripe customer
      const stripeCustomer = await db
        .select()
        .from(stripeCustomers)
        .where(eq(stripeCustomers.userId, ctx.user.id))
        .limit(1);

      if (stripeCustomer.length === 0) {
        return { error: "Stripe customer not found" };
      }

      // Create subscription
      const subscription = await createSubscription(
        stripeCustomer[0].stripeCustomerId,
        input.priceId,
        { userId: ctx.user.id.toString(), plan: input.plan }
      );

      // Save to database
      await db.insert(subscriptions).values({
        userId: ctx.user.id,
        stripeSubscriptionId: subscription.id,
        stripePriceId: input.priceId,
        plan: input.plan,
        status: subscription.status as any,
        currentPeriodStart: new Date(
          subscription.current_period_start * 1000
        ),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      });

      // Update metrics
      await db
        .update(financialMetrics)
        .set({
          activeSubscription: 1,
          updatedAt: new Date(),
        })
        .where(eq(financialMetrics.userId, ctx.user.id));

      return {
        subscriptionId: subscription.id,
        status: subscription.status,
        plan: input.plan,
      };
    }),

  // Get active subscription
  getSubscription: protectedProcedure.query(async ({ ctx }) => {
    const sub = await db
      .select()
      .from(subscriptions)
      .where(
        and(
          eq(subscriptions.userId, ctx.user.id),
          eq(subscriptions.status, "active")
        )
      )
      .limit(1);

    return sub.length > 0 ? sub[0] : null;
  }),

  // Cancel subscription
  cancelSubscription: protectedProcedure
    .input(z.object({ subscriptionId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Cancel with Stripe
      const subscription = await cancelSubscription(input.subscriptionId);

      // Update database
      await db
        .update(subscriptions)
        .set({
          status: "canceled",
          canceledAt: new Date(),
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(subscriptions.stripeSubscriptionId, input.subscriptionId),
            eq(subscriptions.userId, ctx.user.id)
          )
        );

      // Update metrics
      await db
        .update(financialMetrics)
        .set({
          activeSubscription: 0,
          updatedAt: new Date(),
        })
        .where(eq(financialMetrics.userId, ctx.user.id));

      return { success: true };
    }),

  // Get financial metrics
  getMetrics: protectedProcedure.query(async ({ ctx }) => {
    const metrics = await db
      .select()
      .from(financialMetrics)
      .where(eq(financialMetrics.userId, ctx.user.id))
      .limit(1);

    if (metrics.length === 0) {
      // Create default metrics
      await db.insert(financialMetrics).values({
        userId: ctx.user.id,
      });

      return {
        userId: ctx.user.id,
        totalSpent: "0",
        totalEarned: "0",
        totalRefunded: "0",
        activeSubscription: 0,
        paymentMethodCount: 0,
      };
    }

    return metrics[0];
  }),

  // Request refund
  requestRefund: protectedProcedure
    .input(
      z.object({
        paymentIntentId: z.string(),
        amount: z.number().optional(),
        reason: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Verify payment belongs to user
      const payment = await db
        .select()
        .from(payments)
        .where(
          and(
            eq(payments.stripePaymentIntentId, input.paymentIntentId),
            eq(payments.userId, ctx.user.id)
          )
        )
        .limit(1);

      if (payment.length === 0) {
        return { error: "Payment not found" };
      }

      // Create refund
      const refund = await createRefund(
        input.paymentIntentId,
        input.amount
      );

      // Update payment status
      await db
        .update(payments)
        .set({
          status: "refunded",
          updatedAt: new Date(),
        })
        .where(eq(payments.stripePaymentIntentId, input.paymentIntentId));

      // Create wallet transaction
      await db.insert(walletTransactions).values({
        userId: ctx.user.id,
        type: "refund",
        amount: (refund.amount / 100).toString(),
        currency: payment[0].currency,
        status: "completed",
        description: input.reason || "Refund processed",
      });

      return { success: true, refundId: refund.id };
    }),
});
