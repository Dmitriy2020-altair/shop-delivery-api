import { apiClient, authClient } from './client';

import type {
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  RefreshResponse,
  RegisterRequest,
  RegisterResponse,
  User,
} from './types';

export const authApi = {
  async register(data: RegisterRequest): Promise<RegisterResponse> {
    const response = await apiClient.post<RegisterResponse>('/auth/register', data);

    return response.data;
  },

  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/auth/login', data);

    return response.data;
  },

  async refresh(): Promise<RefreshResponse> {
    const response = await authClient.post<RefreshResponse>('/auth/refresh');

    return response.data;
  },

  async logout(): Promise<LogoutResponse> {
    const response = await apiClient.post<LogoutResponse>('/auth/logout');

    return response.data;
  },

  async me(): Promise<User> {
    const response = await apiClient.get<User>('/users/me');

    return response.data;
  },
};
