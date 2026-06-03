"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../lib/useAuth';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (login(email, password)) {
      router.push('/admin');
    } else {
      setError('Invalid email or password');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-900">
      <form onSubmit={handleLogin} className="w-full max-w-md glass-card p-8 rounded-2xl">
        <h2 className="text-2xl font-semibold text-silver mb-4">Admin Login</h2>
        <p className="text-gray-400 mb-6">Sign in to access the admin dashboard.</p>

        <label className="block mb-4">
          <div className="text-sm text-gray-300 mb-2">Email</div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@example.com"
            className="w-full bg-dark-900 border border-white/8 rounded-md px-3 py-2"
          />
        </label>

        <label className="block mb-4">
          <div className="text-sm text-gray-300 mb-2">Password</div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="admin123"
            className="w-full bg-dark-900 border border-white/8 rounded-md px-3 py-2"
          />
        </label>

        {error && <div className="text-red-400 mb-4 text-sm">{error}</div>}

        <button disabled={loading} className="btn-primary w-full">
          {loading ? 'Signing in...' : 'Sign In'}
        </button>

        <p className="text-xs text-gray-500 mt-4 text-center">Demo: admin@example.com / admin123</p>
      </form>
    </div>
  );
}
