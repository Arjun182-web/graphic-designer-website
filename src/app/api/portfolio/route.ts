import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  const { data, error } = await supabase
    .from('portfolio')
    .select('*')
    .order('created_at', { ascending: false });

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

    const {
      filename,
      b64,
      title,
      category
    } = body;

    const fileName = `${uuidv4()}-${filename}`;

    const matches = b64.match(
      /^data:([A-Za-z-+/]+);base64,(.+)$/
    );

    const fileData = matches ? matches[2] : b64;

    const buffer = Buffer.from(
      fileData,
      'base64'
    );

    const { error: uploadError } =
      await supabase.storage
        .from('portfolio-images')
        .upload(fileName, buffer, {
          contentType: 'image/jpeg',
          upsert: false,
        });

    if (uploadError) {
      throw uploadError;
    }

    const {
      data: publicUrlData,
    } = supabase.storage
      .from('portfolio-images')
      .getPublicUrl(fileName);

    const imageUrl =
      publicUrlData.publicUrl;

    const { data, error } =
      await supabase
        .from('portfolio')
        .insert([
          {
            title,
            category,
            image_url: imageUrl,
          },
        ])
        .select()
        .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (err: any) {
  console.error('UPLOAD ERROR:', err);

  return NextResponse.json(
    {
      error: err?.message || 'Upload failed',
    },
    { status: 500 }
  );
}
}