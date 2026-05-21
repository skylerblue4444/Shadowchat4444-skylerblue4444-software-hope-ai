import { type Request, type Response } from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2026-04-22.dahlia',
});

export const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    const { productId, quantity } = req.body;

    // In a real application, you would fetch product details from your database
    const product = {
      id: productId,
      name: 'Premium Service',
      price: 9999, // Price in cents
      currency: 'usd',
    };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: product.currency,
            product_data: {
              name: product.name,
            },
            unit_amount: product.price,
          },
          quantity: quantity,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      metadata: { userId: req.user.id, productId: product.id },
    });

    res.json({ id: session.id });
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ message: error.message });
  }
};

export const handleWebhook = async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'];
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig!, process.env.STRIPE_WEBHOOK_SECRET || '');
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      console.log(`Payment successful for session ID: ${session.id}`);
      // Fulfill the purchase, update your database, send confirmation emails, etc.
      // Access metadata: session.metadata.userId, session.metadata.productId
      break;
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log(`PaymentIntent ${paymentIntent.id} succeeded!`);
      // Handle successful payment intent
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};

export const createSubscription = async (req: Request, res: Response) => {
  try {
    const { priceId } = req.body; // Stripe Price ID for the subscription product

    const customer = await stripe.customers.create({
      email: req.user.email, // Assuming req.user is populated by auth middleware
      metadata: { userId: req.user.id },
    });

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    });

    res.json({ subscriptionId: subscription.id, clientSecret: (subscription.latest_invoice as Stripe.Invoice & { payment_intent: Stripe.PaymentIntent })?.payment_intent?.client_secret });
  } catch (error: any) {
    console.error('Error creating subscription:', error);
    res.status(500).json({ message: error.message });
  }
};
