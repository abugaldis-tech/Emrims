import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'tailor' | 'boutique';
  modules: string[];
  avatar?: string;
}

export interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  logout: () => void;
  hasModuleAccess: (module: string) => boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user: User) =>
        set({
          user,
          isAuthenticated: true,
        }),
      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),
      hasModuleAccess: (module: string) => {
        const { user } = get();
        return user?.modules.includes(module) ?? false;
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);