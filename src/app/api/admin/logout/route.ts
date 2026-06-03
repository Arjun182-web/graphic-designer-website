import { NextRequest, NextResponse } from 'next/server';
import { revokeSession } from '../../../../lib/auth';

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('admin_token')?.value;
    revokeSession(token);
    const res = NextResponse.json({ success: true });
    res.cookies.set('admin_token', '', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 0 });
    return res;
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Logout failed' }, { status: 500 });
  }
}
