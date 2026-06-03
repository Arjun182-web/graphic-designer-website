'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Social = { name: string; url: string };

export default function ContactInfo() {
  const [contact, setContact] = useState<{ whatsapp?: string; instagram?: string; email?: string; socials?: Social[] } | null>(null);

  useEffect(() => {
    fetch('/api/contact').then((r) => r.json()).then((d) => setContact(d)).catch(() => setContact(null));
  }, []);

  if (!contact) return <div className="text-gray-400">Loading contact…</div>;

  const waNumber = contact.whatsapp ? contact.whatsapp.replace(/[^0-9]/g, '') : '';
  const waHref = waNumber ? `https://wa.me/${waNumber}` : '#';
  const igHref = contact.instagram ? `https://instagram.com/${contact.instagram.replace(/^@/, '')}` : '#';
  const mailHref = contact.email ? `mailto:${contact.email}` : '#';

  return (
    <div className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-1 lg:grid-cols-1">
        <a href={mailHref} className="block rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_32px_80px_-64px_rgba(255,255,255,0.2)] backdrop-blur-xl transition">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-dark-900 border border-white/10 text-3xl">📧</div>
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-[0.32em] mb-1">Email</p>
              <p className="text-silver font-semibold">{contact.email || 'Not configured'}</p>
            </div>
          </div>
        </a>

        <a href={waHref} target="_blank" rel="noreferrer" className="block rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_32px_80px_-64px_rgba(255,255,255,0.2)] backdrop-blur-xl transition">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-dark-900 border border-white/10 text-3xl">📱</div>
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-[0.32em] mb-1">WhatsApp</p>
              <p className="text-silver font-semibold">{contact.whatsapp || 'Not configured'}</p>
            </div>
          </div>
        </a>
      </div>

      <div className="rounded-[36px] border border-white/10 bg-white/5 p-8 shadow-[0_40px_120px_-80px_rgba(255,255,255,0.18)] backdrop-blur-xl">
        <p className="text-gold-300 uppercase tracking-[0.32em] text-xs mb-6">Socials</p>
        <div className="grid grid-cols-4 gap-4">
          <Link href={igHref} className="flex h-14 items-center justify-center rounded-3xl border border-white/10 bg-dark-900 text-lg text-silver transition hover:border-gold-500/40 hover:text-gold-300">
            📸
          </Link>
          {(contact.socials || []).slice(0,3).map((social) => (
            <a key={social.name} href={social.url} target="_blank" rel="noreferrer" className="flex h-14 items-center justify-center rounded-3xl border border-white/10 bg-dark-900 text-lg text-silver transition hover:border-gold-500/40 hover:text-gold-300">{social.name}</a>
          ))}
        </div>
      </div>

      <div className="rounded-[32px] border border-gold-500/20 bg-gold-500/10 p-6 text-gray-200">
        <p className="text-silver font-semibold mb-2">Premium response</p>
        <p className="text-gray-400">You will receive a prompt, considered reply. For immediate chats use WhatsApp.</p>
      </div>
    </div>
  );
}
