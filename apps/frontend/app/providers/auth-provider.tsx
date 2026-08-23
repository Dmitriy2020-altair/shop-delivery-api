'use client';

import { useEffect } from 'react';

import { authApi } from '@/lib/api/auth';
import { useAuthStore } from '@/store/auth.store';

export function AuthProvider() {
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);
  const setInitializing = useAuthStore((state) => state.setInitializing);

  useEffect(() => {
    let cancelled = false;

    async function initializeAuth() {
      setInitializing(true);

      try {
        const user = await authApi.me();
        if (!cancelled) {
          setUser(user);
        }
      } catch {
        if (!cancelled) {
          clearUser();
        }
      } finally {
        if (!cancelled) {
          setInitializing(false);
        }
      }
    }

    void initializeAuth();

    return () => {
      cancelled = true;
    };
  }, [setUser, clearUser, setInitializing]);

  return null;
}
