import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserType {
  businessName: string;
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
        localStorage.removeItem("authToken");
        set({ user: null });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
