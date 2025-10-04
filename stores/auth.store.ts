import { create } from "zustand";

type AuthStore = {
  accessToken: string;
  refreshToken: string;
  setTokens: (accessToken: string, refreshToken: string) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  accessToken: "",
  refreshToken: "",
  setTokens: (accessToken, refreshToken) => {
    set({
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  },
}));
