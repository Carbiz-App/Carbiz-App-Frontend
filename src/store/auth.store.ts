// stores/useAuthStore.ts
import { create } from "zustand";

interface User {
  businessName: string;
  email: string;
  onboadingActions: string;
  onboardingPercentage: GLfloat;
  onboardingStatus: string;
}

interface AuthStore {
  user: User | null;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => {
    set({ user });
  },
}));
