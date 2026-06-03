import { NextRequest, NextResponse } from 'next/server';
import { readContact } from '../../../../lib/contact';

function sanitizeNumber(n?: string) {
  if (!n) return '';
  return n.replace(/[^0-9]/g, '');
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, projectType, budget, message } = body;
    const contact = readContact();

    const text = `Hi, I'm ${name} (${email}).\nProject: ${projectType}\nBudget: ${budget}\nMessage: ${message}`;

    // Try sending email via nodemailer if available and SMTP env vars are set
    try {
      const hasSMTP = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.ADMIN_EMAIL;
      if (hasSMTP) {
        const pkg = 'nodemailer';
        const nodemailer = await import(pkg);
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT || 587),
          secure: !!process.env.SMTP_SECURE,
          auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
        });

        await transporter.sendMail({
          from: process.env.SMTP_FROM || process.env.SMTP_USER,
          to: process.env.ADMIN_EMAIL,
          subject: `New inquiry from ${name}`,
          text,
          replyTo: email,
        });

        return NextResponse.json({ success: true, method: 'email' });
      }
    } catch (e) {
      // ignore and fall back to WhatsApp redirect
    }

    // Fallback: redirect to WhatsApp using admin number
    const num = sanitizeNumber(contact.whatsapp);
    if (!num) return NextResponse.json({ error: 'No contact number configured' }, { status: 400 });
    const waText = encodeURIComponent(text);
    const waUrl = `https://wa.me/${num}?text=${waText}`;
    return NextResponse.json({ success: true, method: 'whatsapp', redirect: waUrl });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Submit failed' }, { status: 500 });
  }
}
