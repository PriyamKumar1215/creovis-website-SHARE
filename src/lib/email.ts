import { Resend } from 'resend';
import nodemailer from 'nodemailer';

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  type: 'contact' | 'booking' | 'payment' | 'confirmation';
}

export const sendEmail = async (payload: EmailPayload) => {
  try {
    // Try Resend first
    if (process.env.RESEND_API_KEY) {
      const response = await resend.emails.send({
        from: process.env.SENDER_EMAIL || 'noreply@creovis.co',
        to: payload.to,
        subject: payload.subject,
        html: payload.html,
      });
      return { success: true, messageId: response.id };
    }

    // Fallback to Nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.SENDER_EMAIL || 'noreply@creovis.co',
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
    });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error: String(error) };
  }
};

export const contactFormEmailTemplate = (data: {
  name: string;
  email: string;
  company?: string;
  service: string;
  message: string;
}) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto; background: #f3f4f6; }
    .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; }
    h1 { color: #111827; margin-bottom: 20px; }
    .field { margin-bottom: 15px; }
    .label { color: #6b7280; font-size: 12px; text-transform: uppercase; }
    .value { color: #111827; font-size: 14px; margin-top: 5px; }
    .accent { color: #ec4899; }
  </style>
</head>
<body>
  <div class="container">
    <h1>New Lead from <span class="accent">Creovis</span> Website</h1>
    <div class="field">
      <div class="label">Name</div>
      <div class="value">${data.name}</div>
    </div>
    <div class="field">
      <div class="label">Email</div>
      <div class="value">${data.email}</div>
    </div>
    ${data.company ? `
    <div class="field">
      <div class="label">Company</div>
      <div class="value">${data.company}</div>
    </div>
    ` : ''}
    <div class="field">
      <div class="label">Service Interested</div>
      <div class="value">${data.service}</div>
    </div>
    <div class="field">
      <div class="label">Message</div>
      <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
    </div>
  </div>
</body>
</html>
`;

export const bookingConfirmationTemplate = (data: {
  name: string;
  service: string;
  date: string;
  time: string;
}) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto; background: #f3f4f6; }
    .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; }
    h1 { color: #111827; margin-bottom: 20px; }
    .booking-details { background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ec4899; }
    .cta-button { background: #ec4899; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; display: inline-block; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Booking Confirmed! 🎉</h1>
    <p>Hi ${data.name},</p>
    <p>Your booking has been confirmed. Here are the details:</p>
    <div class="booking-details">
      <strong>Service:</strong> ${data.service}<br>
      <strong>Date:</strong> ${data.date}<br>
      <strong>Time:</strong> ${data.time}
    </div>
    <p>We're excited to work with you! If you need to reschedule, please contact us as soon as possible.</p>
    <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" class="cta-button">View Booking Details</a>
  </div>
</body>
</html>
`;

export const paymentSuccessTemplate = (data: {
  name: string;
  amount: string;
  service: string;
}) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto; background: #f3f4f6; }
    .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; }
    h1 { color: #111827; margin-bottom: 20px; }
    .success { color: #10b981; font-size: 24px; margin-bottom: 10px; }
    .amount { font-size: 32px; color: #ec4899; font-weight: bold; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="success">✓ Payment Successful</div>
    <h1>Thank you for your payment</h1>
    <p>Hi ${data.name},</p>
    <div class="amount">${data.amount}</div>
    <p><strong>Service:</strong> ${data.service}</p>
    <p>Your payment has been processed successfully. You'll receive a confirmation email shortly with further instructions.</p>
  </div>
</body>
</html>
`;