import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});

export interface RazorpayOrderOptions {
  amount: number;
  currency: string;
  receipt: string;
  notes?: Record<string, any>;
}

export const createRazorpayOrder = async (options: RazorpayOrderOptions) => {
  try {
    const order = await razorpay.orders.create({
      amount: Math.round(options.amount * 100), // Convert to paise
      currency: options.currency,
      receipt: options.receipt,
      notes: options.notes,
    });

    return {
      success: true,
      orderId: order.id,
      amount: order.amount / 100,
      currency: order.currency,
    };
  } catch (error) {
    console.error('Razorpay order creation error:', error);
    return { success: false, error: String(error) };
  }
};

export const verifyRazorpayPayment = async (
  orderId: string,
  paymentId: string,
  signature: string
) => {
  try {
    const crypto = require('crypto');
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
      .update(`${orderId}|${paymentId}`)
      .digest('hex');

    const isValid = expectedSignature === signature;

    return { success: isValid, message: isValid ? 'Payment verified' : 'Invalid signature' };
  } catch (error) {
    console.error('Razorpay verification error:', error);
    return { success: false, error: String(error) };
  }
};

export const fetchRazorpayPayment = async (paymentId: string) => {
  try {
    const payment = await razorpay.payments.fetch(paymentId);
    return {
      success: true,
      payment: {
        id: payment.id,
        amount: payment.amount / 100,
        status: payment.status,
        method: payment.method,
        email: payment.email,
        contact: payment.contact,
      },
    };
  } catch (error) {
    console.error('Razorpay fetch error:', error);
    return { success: false, error: String(error) };
  }
};