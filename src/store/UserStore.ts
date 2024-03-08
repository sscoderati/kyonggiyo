import type { TokenResponse } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStore {
  accountId: number | null;
  token: TokenResponse | null;
  // eslint-disable-next-line no-unused-vars
  setAccountId: (accountId: number) => void;
  // eslint-disable-next-line no-unused-vars
  setToken: (token: TokenResponse) => void;
  reset: () => void;
}

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      accountId: null,
      token: null,
      setAccountId: (accountId: number) => set({ accountId }),
      setToken: (token: TokenResponse) => set({ token }),
      reset: () => set({ accountId: null, token: null }),
    }),
    {
      name: "user-storage",
    },
  ),
);
