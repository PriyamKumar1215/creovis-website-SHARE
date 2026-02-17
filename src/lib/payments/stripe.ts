import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

export interface StripePaymentIntentOptions {
  amount: number;
  currency: string;
  email: string;
  metadata?: Record<string, any>;
}

export const createStripePaymentIntent = async (
  options: StripePaymentIntentOptions
) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(options.amount * 100), // Convert to cents
      currency: options.currency.toLowerCase(),
      receipt_email: options.email,
      metadata: options.metadata,
    });

    return {
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: paymentIntent.amount / 100,
    };
  } catch (error) {
    console.error('Stripe payment intent error:', error);
    return { success: false, error: String(error) };
  }
};

export const retrieveStripePaymentIntent = async (paymentIntentId: string) => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    return {
      success: true,
      status: paymentIntent.status,
      amount: paymentIntent.amount / 100,
      currency: paymentIntent.currency,
      email: paymentIntent.receipt_email,
      metadata: paymentIntent.metadata,
    };
  } catch (error) {
    console.error('Stripe retrieve error:', error);
    return { success: false, error: String(error) };
  }
};

export const verifyStripeWebhook = (
  body: string | Buffer,
  signature: string
): Stripe.Event | null => {
  try {
    return stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );
  } catch (error) {
    console.error('Stripe webhook verification error:', error);
    return null;
  }
};