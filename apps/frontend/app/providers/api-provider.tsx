'use client';

import { useEffect } from 'react';

import { setupAuthInterceptor } from '@/lib/api/auth.interceptor';

export function ApiProvider() {
  useEffect(() => {
    return setupAuthInterceptor();
  }, []);

  return null;
}
