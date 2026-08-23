import { create } from "zustand";

import type { AuthUser } from "@/lib/api/types";

type AuthState = {
  user: AuthUser | null;
  isInitializing: boolean;
  setUser: (user: AuthUser) => void;
  clearUser: () => void;
  setInitializing: (value: boolean) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isInitializing: true,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  setInitializing: (value) => set({ isInitializing: value }),
}));
