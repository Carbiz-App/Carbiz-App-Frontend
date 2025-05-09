// stores/useAuthStore.ts
import { create } from "zustand";

interface User {
  businessName: string;
  email: string;
  // onboardingActions: string;
  // onboardingPercentage: GLfloat;
  // onboardingStatus: {
  //   add_Products: boolean;
  //   create_Account: boolean;
  //   setup_Payment: boolean;
  // };
}

interface AuthStore {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => {
    set({ user });
  },
  logout: () => {
    localStorage.removeItem("authToken");
    set({ user: null });
  },
}));
