import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { addPortfolioItem, getAllPortfolioItems } from '../../../lib/portfolio';

const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');

export async function GET() {
  const items = getAllPortfolioItems();
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { filename, b64, title, category, alt } = body as {
      filename: string;
      b64: string;
      title: string;
      category: string;
      alt?: string;
    };

    if (!filename || !b64) {
      return NextResponse.json({ error: 'Missing file data' }, { status: 400 });
    }

    if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

    // decode base64 (data:image/...;base64,...) if present
    const matches = b64.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    const data = matches ? matches[2] : b64;
    const buffer = Buffer.from(data, 'base64');
    const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '-');
    const filePath = path.join(UPLOADS_DIR, safeName);
    fs.writeFileSync(filePath, buffer);

    const item = await addPortfolioItem({ title, category, filename: safeName, alt });

    return NextResponse.json(item, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Upload failed' }, { status: 500 });
  }
}
