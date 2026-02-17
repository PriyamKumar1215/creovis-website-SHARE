import { NextRequest, NextResponse } from 'next/server';
import { loginSchema } from '@/lib/validation';
import { generateToken, comparePassword, hashPassword } from '@/lib/auth';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = loginSchema.parse(body);

    // Find user by email
    let user = await db.user.findUnique({
      where: { email: validated.email },
    });

    // If no user exists, create one (first-time admin setup)
    if (!user && validated.email === process.env.ADMIN_EMAIL) {
      const hashedPassword = await hashPassword(validated.password);
      user = await db.user.create({
        data: {
          email: validated.email,
          password: hashedPassword,
          name: 'Admin',
          role: 'ADMIN',
        },
      });
    } else if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await comparePassword(validated.password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const response = NextResponse.json(
      {
        success: true,
        message: 'Login successful',
        data: {
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          },
          token,
        },
      },
      { status: 200 }
    );

    // Set secure cookie
    response.cookies.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Authentication failed' },
      { status: 500 }
    );
  }
}