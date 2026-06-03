import { NextRequest, NextResponse } from 'next/server';
import { createSession } from '../../../../lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin_password_change_me';
    if (!password || password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = createSession(24);
    const res = NextResponse.json({ success: true });
    // set secure cookie
    res.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 24 * 3600,
    });
    return res;
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Login failed' }, { status: 500 });
  }
}
