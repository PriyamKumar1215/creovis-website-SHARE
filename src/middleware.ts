import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Public routes
  if (
    pathname === '/' ||
    pathname.startsWith('/services') ||
    pathname.startsWith('/portfolio') ||
    pathname.startsWith('/about') ||
    pathname.startsWith('/contact') ||
    pathname.startsWith('/book-call') ||
    pathname.startsWith('/api/leads') ||
    pathname.startsWith('/api/bookings') ||
    pathname.startsWith('/api/payments/webhook')
  ) {
    return NextResponse.next();
  }

  // Protected routes - require authentication
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/api/admin')) {
    const token = extractTokenFromHeader(request.headers.get('authorization'));

    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    const payload = verifyToken(token);

    if (!payload || payload.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.svg).*)',
  ],
};