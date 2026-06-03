"use client";

import Link from 'next/link';
import { useAuth } from '../../lib/useAuth';

export default function Sidebar() {
  const { logout } = useAuth();

  return (
    <div className="space-y-6">
      <div className="text-2xl font-bold text-gold-500"> Admin</div>
      <nav className="space-y-2">
        <Link href="/admin" className="block px-3 py-2 rounded hover:bg-dark-800">Dashboard</Link>
        <Link href="/admin/portfolio" className="block px-3 py-2 rounded hover:bg-dark-800">Portfolio</Link>
        <Link href="/admin/profile" className="block px-3 py-2 rounded hover:bg-dark-800">About</Link>
        <Link href="/admin/contact" className="block px-3 py-2 rounded hover:bg-dark-800">Contact</Link>
      </nav>

      <div>
        <button onClick={logout} className="mt-6 w-full text-left px-3 py-2 rounded bg-red-600/20 text-sm">Logout</button>
      </div>
    </div>
  );
}
