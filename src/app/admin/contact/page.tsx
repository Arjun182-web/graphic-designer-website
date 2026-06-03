"use client";

import { useEffect, useState } from 'react';
import { ProtectedAdminRoute } from '@/components/admin/ProtectedRoute';

function ContactContent() {
  const [whatsapp, setWhatsapp] = useState('');
  const [instagram, setInstagram] = useState('');
  const [email, setEmail] = useState('');
  const [socials, setSocials] = useState<{ name: string; url: string }[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/contact')
      .then((r) => r.json())
      .then((data) => {
        setWhatsapp(data.whatsapp || '');
        setInstagram(data.instagram || '');
        setEmail(data.email || '');
        setSocials(data.socials || []);
      });
  }, []);

  async function save() {
    setMessage(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ whatsapp, instagram, email, socials }),
      });
      if (!res.ok) throw new Error('Save failed');
      setMessage('Saved');
    } catch (err: any) {
      setMessage(err?.message || 'Error');
    }
  }

  function addSocial() {
    setSocials([...socials, { name: '', url: '' }]);
  }

  function updateSocial(idx: number, key: 'name' | 'url', value: string) {
    const copy = [...socials];
    copy[idx] = { ...copy[idx], [key]: value };
    setSocials(copy);
  }

  return (
    <section className="min-h-[60vh] py-20">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-2xl font-semibold text-silver mb-4">Contact Settings</h2>
        <p className="text-gray-400 mb-6">Configure WhatsApp, Instagram, email, and social links shown on the contact page.</p>

        <div className="glass-card p-6 rounded-2xl">
          <label className="block mb-4">
            <div className="text-sm text-gray-300 mb-2">WhatsApp Number</div>
            <input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="+1 555 123 4567" className="w-full bg-dark-900 border border-white/8 rounded-md px-3 py-2" />
          </label>

          <label className="block mb-4">
            <div className="text-sm text-gray-300 mb-2">Instagram ID</div>
            <input value={instagram} onChange={(e) => setInstagram(e.target.value)} placeholder="yourhandle" className="w-full bg-dark-900 border border-white/8 rounded-md px-3 py-2" />
          </label>

          <label className="block mb-4">
            <div className="text-sm text-gray-300 mb-2">Email</div>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="hello@you.com" className="w-full bg-dark-900 border border-white/8 rounded-md px-3 py-2" />
          </label>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-300">Social Links</div>
              <button onClick={addSocial} type="button" className="text-sm text-gold-300">Add</button>
            </div>
            <div className="space-y-2">
              {socials.map((s, idx) => (
                <div key={idx} className="grid grid-cols-2 gap-2">
                  <input value={s.name} onChange={(e) => updateSocial(idx, 'name', e.target.value)} placeholder="Name" className="bg-dark-900 border border-white/8 rounded-md px-3 py-2" />
                  <input value={s.url} onChange={(e) => updateSocial(idx, 'url', e.target.value)} placeholder="https://" className="bg-dark-900 border border-white/8 rounded-md px-3 py-2" />
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={save} className="btn-primary px-4 py-2">Save</button>
            {message && <div className="text-sm text-gray-300">{message}</div>}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AdminContact() {
  return (
    <ProtectedAdminRoute>
      <ContactContent />
    </ProtectedAdminRoute>
  );
}