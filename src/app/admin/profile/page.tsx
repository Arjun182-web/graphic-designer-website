"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ProtectedAdminRoute } from '@/components/admin/ProtectedRoute';

function ProfileContent() {
  const [file, setFile] = useState<File | null>(null);
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/profile')
      .then((r) => r.json())
      .then((data) => {
        setBio(data?.bio || '');
        setPreview(data?.src || null);
      });
  }, []);

  function toBase64(file: File) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = (err) => reject(err);
    });
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      let b64: string | undefined;
      let filename: string | undefined;
      if (file) {
        b64 = await toBase64(file);
        filename = `${Date.now()}-${file.name}`;
      }

      const res = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ b64, filename, bio, alt: 'Profile image' }),
      });

      if (!res.ok) throw new Error('Save failed');
      const data = await res.json();
      setMessage('Profile updated');
      setPreview(data.src || preview);
      setFile(null);
    } catch (err: any) {
      setMessage(err?.message || 'Error saving');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-[60vh] py-20">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-2xl font-semibold text-silver mb-4">Edit Profile</h2>
        <p className="text-gray-400 mb-6">Upload your profile image and update your biography text.</p>

        <form onSubmit={handleSave} className="glass-card p-6 rounded-2xl">
          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-2">Profile Image</label>
            {preview && (
              <div className="mb-3 w-32 h-32 relative rounded-full overflow-hidden">
                <Image src={preview} alt="preview" fill style={{ objectFit: 'cover' }} />
              </div>
            )}
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-2">Biography</label>
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={6} className="w-full bg-dark-900 border border-white/8 rounded-md px-3 py-2" />
          </div>

          <div className="flex items-center gap-4">
            <button disabled={loading} type="submit" className="btn-primary px-4 py-2">{loading ? 'Saving...' : 'Save Profile'}</button>
            {message && <div className="text-sm text-gray-300">{message}</div>}
          </div>
        </form>
      </div>
    </section>
  );
}

export default function AdminProfile() {
  return (
    <ProtectedAdminRoute>
      <ProfileContent />
    </ProtectedAdminRoute>
  );
}
 