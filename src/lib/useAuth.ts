// Client-side auth hook using localStorage
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const ADMIN_EMAIL = 'adharshadharshm61@gmail.com';
const ADMIN_PASSWORD = 'Adharsh@33591';
const AUTH_TOKEN_KEY = 'admin_auth_token';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if token exists in localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem(AUTH_TOKEN_KEY) : null;
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, []);

  const login = (email: string, password: string) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const token = Math.random().toString(36).substring(2, 15);
      localStorage.setItem(AUTH_TOKEN_KEY, token);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setIsAuthenticated(false);
    router.push('/secure-dashboard-login')
  };

  const requireAuth = () => {
    if (!isLoading && !isAuthenticated) {
      router.push('/secure-dashboard-login')
    }
  };

  return { isAuthenticated, isLoading, login, logout, requireAuth };
}
