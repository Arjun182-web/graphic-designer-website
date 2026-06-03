import { NextRequest, NextResponse } from 'next/server';
import { getPortfolioItem, updatePortfolioItem, deletePortfolioItem } from '../../../../lib/portfolio';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const item = getPortfolioItem(params.id);
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const updated = updatePortfolioItem(params.id, body);
    if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Update failed' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const ok = deletePortfolioItem(params.id);
  if (!ok) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true });
}
