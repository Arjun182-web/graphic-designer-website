'use client';

import { useAuth } from '../../lib/useAuth';
import { ReactNode, useEffect } from 'react';

export function ProtectedAdminRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading, requireAuth } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      requireAuth();
    }
  }, [isAuthenticated, isLoading, requireAuth]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-900">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
