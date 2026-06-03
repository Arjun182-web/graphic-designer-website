import { NextRequest, NextResponse } from 'next/server';
import { readContact, writeContact } from '../../../lib/contact';

export async function GET() {
  const data = readContact();
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { whatsapp, instagram, email, socials, preferred } = body as any;
    const current = readContact();
    const next = {
      ...current,
      whatsapp: whatsapp ?? current.whatsapp,
      instagram: instagram ?? current.instagram,
      email: email ?? current.email,
      socials: Array.isArray(socials) ? socials : current.socials,
      preferred: preferred ?? current.preferred,
    };
    writeContact(next);
    return NextResponse.json(next);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Failed' }, { status: 500 });
  }
}
