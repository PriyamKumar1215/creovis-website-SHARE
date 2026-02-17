import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { contactFormSchema } from '@/lib/validation';
import { sendEmail, contactFormEmailTemplate } from '@/lib/email';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const { success } = await rateLimit(ip);
    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Validation
    const validated = contactFormSchema.parse(body);

    // Check for duplicate email (prevent spam)
    const existingLead = await db.lead.findUnique({
      where: { email: validated.email },
    });

    if (existingLead) {
      return NextResponse.json(
        { success: false, error: 'This email has already been registered. Check your inbox for our response.' },
        { status: 400 }
      );
    }

    // Save to database
    const lead = await db.lead.create({
      data: {
        email: validated.email,
        phone: validated.phone,
        name: validated.name,
        company: validated.company,
        service: validated.service,
        message: validated.message,
        budget: validated.budget,
        status: 'NEW',
      },
    });

    // Send email to admin
    await sendEmail({
      to: process.env.ADMIN_EMAIL || 'admin@creovis.co',
      subject: `New Lead: ${validated.name}`,
      html: contactFormEmailTemplate(validated),
      type: 'contact',
    });

    // Send confirmation email to user
    await sendEmail({
      to: validated.email,
      subject: 'We received your message - Creovis',
      html: `<h2>Thank you, ${validated.name}!</h2><p>We've received your message and will get back to you within 24 hours.</p>`,
      type: 'contact',
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Lead created successfully',
        data: { id: lead.id },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Lead creation error:', error);

    if (error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Invalid input data' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create lead' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const token = request.headers.get('authorization');
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const leads = await db.lead.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    return NextResponse.json({
      success: true,
      data: leads,
    });
  } catch (error) {
    console.error('Leads fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}