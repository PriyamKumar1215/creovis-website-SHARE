import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+?[\d\s\-()]{10,}$/, 'Invalid phone number'),
  company: z.string().optional(),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
  budget: z.string().optional(),
});

export const bookingFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+?[\d\s\-()]{10,}$/, 'Invalid phone number'),
  serviceId: z.string().min(1, 'Please select a service'),
  scheduledAt: z.string().refine((date) => new Date(date) > new Date(), 'Date must be in the future'),
  notes: z.string().optional(),
});

export const paymentSchema = z.object({
  bookingId: z.string().optional(),
  email: z.string().email(),
  amount: z.number().positive(),
  currency: z.enum(['INR', 'USD']),
  paymentMethod: z.string(),
  provider: z.enum(['RAZORPAY', 'STRIPE']),
});

export const serviceSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(10),
  price: z.number().positive(),
  duration: z.number().positive(),
  features: z.array(z.string()),
  active: z.boolean().default(true),
});

export const portfolioSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(10),
  category: z.string().min(1),
  imageUrl: z.string().url(),
  projectUrl: z.string().url().optional(),
  featured: z.boolean().default(false),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type ContactFormInput = z.infer<typeof contactFormSchema>;
export type BookingFormInput = z.infer<typeof bookingFormSchema>;
export type PaymentInput = z.infer<typeof paymentSchema>;
export type ServiceInput = z.infer<typeof serviceSchema>;
export type PortfolioInput = z.infer<typeof portfolioSchema>;