import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface UserType {
  businessName: string;
  isVerified?: boolean;
  isApproved?: boolean;
  email?: string;
  businessLicense?: string;
  CAC?: string;
  taxID?: string;
  validIDcard?: string;
  address?: string;
  city?: string;
  country?: string;
  phoneNumber?: string;
  postalCode?: string;
  businessPics?: string;
}

interface AuthStoreType {
  user: UserType | null;
  setUser: (user: UserType) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStoreType>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => {
        sessionStorage.clear();
        set({ user: null });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
