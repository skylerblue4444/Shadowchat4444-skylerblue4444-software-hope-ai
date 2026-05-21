import Stripe from "stripe";

// Initialize Stripe with test API key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
  apiVersion: "2024-04-10",
});

export interface PaymentIntentData {
  amount: number;
  currency: string;
  description?: string;
  metadata?: Record<string, string>;
}

export interface StripeCustomerData {
  email: string;
  name?: string;
  metadata?: Record<string, string>;
}

/**
 * Create a Stripe customer for a user
 */
export async function createStripeCustomer(data: StripeCustomerData) {
  try {
    const customer = await stripe.customers.create({
      email: data.email,
      name: data.name,
      metadata: data.metadata,
    });
    return customer;
  } catch (error) {
    console.error("Error creating Stripe customer:", error);
    throw error;
  }
}

/**
 * Create a payment intent for a transaction
 */
export async function createPaymentIntent(
  customerId: string,
  data: PaymentIntentData
) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: data.amount * 100, // Convert to cents
      currency: data.currency.toLowerCase(),
      customer: customerId,
      description: data.description,
      metadata: data.metadata,
      automatic_payment_methods: {
        enabled: true,
      },
    });
    return paymentIntent;
  } catch (error) {
    console.error("Error creating payment intent:", error);
    throw error;
  }
}

/**
 * Retrieve a payment intent
 */
export async function getPaymentIntent(intentId: string) {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(intentId);
    return paymentIntent;
  } catch (error) {
    console.error("Error retrieving payment intent:", error);
    throw error;
  }
}

/**
 * Confirm a payment intent
 */
export async function confirmPaymentIntent(
  intentId: string,
  paymentMethodId: string
) {
  try {
    const paymentIntent = await stripe.paymentIntents.confirm(intentId, {
      payment_method: paymentMethodId,
    });
    return paymentIntent;
  } catch (error) {
    console.error("Error confirming payment intent:", error);
    throw error;
  }
}

/**
 * Create a refund
 */
export async function createRefund(paymentIntentId: string, amount?: number) {
  try {
    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
      amount: amount ? amount * 100 : undefined,
    });
    return refund;
  } catch (error) {
    console.error("Error creating refund:", error);
    throw error;
  }
}

/**
 * List customer payment methods
 */
export async function getCustomerPaymentMethods(customerId: string) {
  try {
    const paymentMethods = await stripe.customers.listPaymentMethods(
      customerId,
      {
        type: "card",
      }
    );
    return paymentMethods.data;
  } catch (error) {
    console.error("Error listing payment methods:", error);
    throw error;
  }
}

/**
 * Detach a payment method
 */
export async function detachPaymentMethod(paymentMethodId: string) {
  try {
    const result = await stripe.paymentMethods.detach(paymentMethodId);
    return result;
  } catch (error) {
    console.error("Error detaching payment method:", error);
    throw error;
  }
}

/**
 * Create a subscription
 */
export async function createSubscription(
  customerId: string,
  priceId: string,
  metadata?: Record<string, string>
) {
  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      metadata,
      automatic_tax: {
        enabled: true,
      },
    });
    return subscription;
  } catch (error) {
    console.error("Error creating subscription:", error);
    throw error;
  }
}

/**
 * Cancel a subscription
 */
export async function cancelSubscription(subscriptionId: string) {
  try {
    const subscription = await stripe.subscriptions.del(subscriptionId);
    return subscription;
  } catch (error) {
    console.error("Error canceling subscription:", error);
    throw error;
  }
}

/**
 * Retrieve subscription
 */
export async function getSubscription(subscriptionId: string) {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    return subscription;
  } catch (error) {
    console.error("Error retrieving subscription:", error);
    throw error;
  }
}

/**
 * Verify webhook signature
 */
export function verifyWebhookSignature(
  body: string,
  signature: string,
  secret: string
): Stripe.Event | null {
  try {
    const event = stripe.webhooks.constructEvent(body, signature, secret);
    return event;
  } catch (error) {
    console.error("Error verifying webhook signature:", error);
    return null;
  }
}

export default stripe;
