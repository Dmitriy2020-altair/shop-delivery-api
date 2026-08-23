'use client';

import { useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';

import { useAuthStore } from '@/store/auth.store';

type RequireAuthProps = {
  children: ReactNode;
};

export function RequireAuth({ children }: RequireAuthProps) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const isInitializing = useAuthStore((state) => state.isInitializing);

  useEffect(() => {
    if (!isInitializing && user === null) {
      router.replace('/login');
    }
  }, [isInitializing, user, router]);

  if (isInitializing) {
    return <div>Loading...</div>;
  }

  if (user === null) {
    return null;
  }

  return children;
}
