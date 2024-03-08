import type { TokenResponse } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AccountStore {
  accountId: number | null;
  // eslint-disable-next-line no-unused-vars
  setAccountId: (accountId: number) => void;
  reset: () => void;
}

interface TokenStore {
  token: TokenResponse | null;
  // eslint-disable-next-line no-unused-vars
  setToken: (token: TokenResponse) => void;
  reset: () => void;
}

export const useAccountStore = create<AccountStore>((set) => ({
  accountId: null,
  setAccountId: (accountId: number) => set({ accountId }),
  reset: () => set({ accountId: null }),
}));

export const useTokenStore = create(
  persist<TokenStore>(
    (set) => ({
      token: null,
      setToken: (token: TokenResponse) => set({ token }),
      reset: () => set({ token: null }),
    }),
    {
      name: "token-storage",
    },
  ),
);
