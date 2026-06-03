import { NextRequest, NextResponse } from 'next/server';
import { readProfile, writeProfile, saveProfileImage } from '../../../lib/profile';

export async function GET() {
  const profile = readProfile();
  return NextResponse.json(profile);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { b64, filename, bio, alt } = body as { b64?: string; filename?: string; bio?: string; alt?: string };

    const profile = readProfile();

    if (b64 && filename) {
      const src = await saveProfileImage(filename, b64);
      profile.src = src;
      profile.alt = alt || profile.alt || 'Profile image';
    }

    if (typeof bio === 'string') profile.bio = bio;
    profile.updatedAt = new Date().toISOString();

    writeProfile(profile);
    return NextResponse.json(profile, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Profile update failed' }, { status: 500 });
  }
}
