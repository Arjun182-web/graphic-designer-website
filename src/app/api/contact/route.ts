import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  const { data, error } = await supabase
    .from('contact')
    .select('*')
    .single();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { data: contactRow, error: fetchError } = await supabase
      .from('contact')
      .select('id')
      .single();

    if (fetchError) throw fetchError;

    const { data, error } = await supabase
  .from('contact')
  .update({
    whatsapp: body.whatsapp,
    instagram: body.instagram,
    email: body.email,
  })
  .eq('id', contactRow.id)
  .select();

console.log('UPDATED DATA:', data);
console.log('UPDATE ERROR:', error);

      console.log('UPDATE ERROR:', error);
      console.log('UPDATED ID:', contactRow.id);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}