import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { data, error } = await supabase
    .from('portfolio')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error) {
    return NextResponse.json(
      { error: 'Not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(data);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    const { data, error } = await supabase
      .from('portfolio')
      .update(body)
      .eq('id', params.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data);

  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {

    const { data: item } = await supabase
      .from('portfolio')
      .select('*')
      .eq('id', params.id)
      .single();

    if (!item) {
      return NextResponse.json(
        { error: 'Not found' },
        { status: 404 }
      );
    }

    // Delete DB record
    const { error } = await supabase
      .from('portfolio')
      .delete()
      .eq('id', params.id);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true
    });

  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}