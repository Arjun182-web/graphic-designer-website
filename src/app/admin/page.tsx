"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ProtectedAdminRoute } from '../../components/admin/ProtectedRoute';

function DashboardContent() {
  const [counts, setCounts] = useState({ works: 0 });

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/portfolio');
        const data = await res.json();
        setCounts({ works: (data || []).length });
      } catch (e) {
        setCounts({ works: 0 });
      }
    }
    load();
  }, []);

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-silver mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link href="/admin/portfolio" className="glass-card p-6 rounded-2xl">
            <p className="text-sm text-gray-400">Portfolio Items</p>
            <p className="text-2xl font-semibold text-silver">{counts.works}</p>
          </Link>

          <Link href="/admin/profile" className="glass-card p-6 rounded-2xl">
            <p className="text-sm text-gray-400">About</p>
            <p className="text-2xl font-semibold text-silver">Edit profile</p>
          </Link>

          <Link href="/admin/contact" className="glass-card p-6 rounded-2xl">
            <p className="text-sm text-gray-400">Contact</p>
            <p className="text-2xl font-semibold text-silver">Edit</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AdminIndex() {
  return (
    <ProtectedAdminRoute>
      <DashboardContent />
    </ProtectedAdminRoute>
  );
}
