import type { AxiosError, InternalAxiosRequestConfig } from 'axios';

import { apiClient } from './client';
import { authApi } from './auth';
import { useAuthStore } from '@/store/auth.store';

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

let refreshPromise: Promise<void> | null = null;

export const setupAuthInterceptor = () => {
  const interceptorId = apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as RetryableRequestConfig | undefined;

      const isRefreshRequest = originalRequest?.url?.includes('/auth/refresh');

      if (
        error.response?.status !== 401 ||
        isRefreshRequest ||
        !originalRequest ||
        originalRequest._retry
      ) {
        throw error;
      }

      originalRequest._retry = true;

      if (!refreshPromise) {
        refreshPromise = authApi
          .refresh()
          .then(() => undefined)
          .catch((refreshError) => {
            useAuthStore.getState().clearUser();
            throw refreshError;
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      await refreshPromise;

      return apiClient(originalRequest);
    }
  );

  return () => {
    apiClient.interceptors.response.eject(interceptorId);
  };
};
