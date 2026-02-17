import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { paymentSchema } from '@/lib/validation';
import { createRazorpayOrder } from '@/lib/payments/razorpay';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = paymentSchema.parse(body);

    if (validated.provider !== 'RAZORPAY') {
      return NextResponse.json(
        { success: false, error: 'Invalid provider' },
        { status: 400 }
      );
    }

    // Create Razorpay order
    const result = await createRazorpayOrder({
      amount: validated.amount,
      currency: validated.currency,
      receipt: `creovis-${Date.now()}`,
      notes: {
        bookingId: validated.bookingId,
        email: validated.email,
      },
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: 'Failed to create payment order' },
        { status: 400 }
      );
    }

    // Save payment record
    const payment = await db.payment.create({
      data: {
        email: validated.email,
        amount: validated.amount,
        currency: validated.currency,
        paymentMethod: validated.paymentMethod as any,
        provider: 'RAZORPAY',
        transactionId: result.orderId,
        orderId: result.orderId,
        bookingId: validated.bookingId,
        status: 'PENDING',
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          orderId: result.orderId,
          amount: result.amount,
          currency: result.currency,
          paymentId: payment.id,
          keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Payment creation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process payment' },
      { status: 500 }
    );
  }
}





