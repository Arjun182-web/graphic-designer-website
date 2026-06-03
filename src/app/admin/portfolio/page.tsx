"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ProtectedAdminRoute } from '@/components/admin/ProtectedRoute';

const categories = [
  { value: 'posters', label: 'Movie Posters' },
  { value: 'flex', label: 'Flex Designs' },
  { value: 'branding', label: 'Branding' },
  { value: 'social', label: 'Social Media' },
];

function PortfolioContent() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('posters');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [items, setItems] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  async function loadItems() {
    try {
      const res = await fetch('/api/portfolio');
      const data = await res.json();
      setItems(data || []);
    } catch (e) {
      setItems([]);
    }
  }

  useEffect(() => {
    // initial load
    loadItems();
  }, []);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return setMessage('Please choose a file');
    setLoading(true);
    setMessage(null);

    try {
      const b64 = await toBase64(file);
      const filename = `${Date.now()}-${file.name}`;

      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename, b64, title: title || file.name, category, alt: title || file.name }),
      });

      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      setMessage('Uploaded successfully');
      setFile(null);
      setTitle('');
      loadItems();
    } catch (err: any) {
      setMessage(err?.message || 'Upload error');
    } finally {
      setLoading(false);
    }
  }

  function toBase64(file: File) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = (err) => reject(err);
    });
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this work?')) return;
    const res = await fetch(`/api/portfolio/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setMessage('Deleted');
      loadItems();
    } else {
      setMessage('Delete failed');
    }
  }

  async function startEdit(item: any) {
    setEditing(item);
  }

  async function saveEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    const res = await fetch(`/api/portfolio/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: editing.title, category: editing.category, alt: editing.alt }) });
    if (res.ok) {
      setMessage('Updated');
      setEditing(null);
      loadItems();
    } else {
      setMessage('Update failed');
    }
  }

  return (
    <section className="min-h-[60vh] py-20">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-2xl font-semibold text-silver mb-4">Manage Portfolio</h2>
        <p className="text-gray-400 mb-6">Upload images to the portfolio. Files are stored in <strong>/public/uploads</strong> and recorded in the data store.</p>

        <form onSubmit={handleUpload} className="glass-card p-6 rounded-2xl">
          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-2">Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-dark-900 border border-white/8 rounded-md px-3 py-2" />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-2">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-dark-900 border border-white/8 rounded-md px-3 py-2">
              {categories.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-2">Image File</label>
            {filePreview && <div className="mb-2 w-48 h-48 relative rounded-md overflow-hidden"><Image src={filePreview} alt="preview" fill style={{ objectFit: 'cover' }} /></div>}
            <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0] || null; setFile(f); if (f) setFilePreview(URL.createObjectURL(f)); else setFilePreview(null); }} />
          </div>

          <div className="flex items-center gap-4">
            <button disabled={loading} type="submit" className="btn-primary px-4 py-2">{loading ? 'Uploading...' : 'Upload'}</button>
            {message && <div className="text-sm text-gray-300">{message}</div>}
          </div>
        </form>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12">
        <h3 className="text-xl font-semibold text-silver mb-4">Uploaded Works</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it) => (
            <div key={it.id} className="rounded-2xl border border-white/8 overflow-hidden bg-white/3">
              <div className="relative h-48 bg-dark-800">
                <Image src={it.src} alt={it.title} fill style={{ objectFit: 'cover' }} />
              </div>
              <div className="p-4">
                <h4 className="text-silver font-semibold">{it.title}</h4>
                <p className="text-gray-400 text-sm">{it.category}</p>
                <div className="mt-3 flex gap-2">
                  <button onClick={() => startEdit(it)} className="px-3 py-1 bg-dark-800 rounded">Edit</button>
                  <button onClick={() => handleDelete(it.id)} className="px-3 py-1 bg-red-700/20 rounded">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <form onSubmit={saveEdit} className="bg-dark-900 p-6 rounded-2xl w-full max-w-lg">
            <h3 className="text-lg font-semibold text-silver mb-3">Edit Work</h3>
            <label className="block mb-3">
              <div className="text-sm text-gray-300 mb-1">Title</div>
              <input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="w-full bg-dark-800 border border-white/6 rounded px-3 py-2" />
            </label>
            <label className="block mb-3">
              <div className="text-sm text-gray-300 mb-1">Category</div>
              <input value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className="w-full bg-dark-800 border border-white/6 rounded px-3 py-2" />
            </label>
            <div className="flex gap-3">
              <button type="submit" className="btn-primary">Save</button>
              <button type="button" onClick={() => setEditing(null)} className="btn-secondary">Cancel</button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}

export default function AdminPortfolio() {
  return (
    <ProtectedAdminRoute>
      <PortfolioContent />
    </ProtectedAdminRoute>
  );
}
  