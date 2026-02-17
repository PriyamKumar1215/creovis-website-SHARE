export interface Lead {
  id: string;
  email: string;
  phone: string;
  name: string;
  company?: string;
  service: string;
  message: string;
  budget?: string;
  status: 'NEW' | 'CONTACTED' | 'IN_PROGRESS' | 'CONVERTED' | 'REJECTED';
  createdAt: Date;
  updatedAt: Date;
}

export interface Booking {
  id: string;
  email: string;
  phone: string;
  name: string;
  serviceId: string;
  scheduledAt: Date;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'RESCHEDULED';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Payment {
  id: string;
  email: string;
  amount: number;
  currency: string;
  paymentMethod: 'CARD' | 'UPI' | 'WALLET' | 'NET_BANKING';
  provider: 'RAZORPAY' | 'STRIPE';
  transactionId: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
  createdAt: Date;
  updatedAt: Date;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  features: string[];
  active: boolean;
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  projectUrl?: string;
  featured: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  image?: string;
  content: string;
  rating: number;
}

export interface AuthPayload {
  email: string;
  password: string;
}

export interface JWTPayload {
  userId: string;
  email: string;
  role: 'USER' | 'ADMIN';
  iat: number;
  exp: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  message: string;
  budget?: string;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  serviceId: string;
  scheduledAt: Date;
  notes?: string;
}

export interface PaymentPayload {
  bookingId?: string;
  email: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  provider: 'RAZORPAY' | 'STRIPE';
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface DashboardStats {
  totalLeads: number;
  totalBookings: number;
  totalRevenue: number;
  conversionRate: number;
}