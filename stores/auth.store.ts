import { create } from "zustand";

type AuthStore = {
  accessToken: string;
  refreshToken: string;
  loggedIn: boolean;
  setTokens: (accessToken: string, refreshToken: string) => void;
  setLoggedIn: (status: boolean) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  accessToken: "",
  refreshToken: "",
  loggedIn: false,
  setTokens: (accessToken, refreshToken) => {
    set({
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  },
  setLoggedIn: (status: boolean) => {
    set({
      loggedIn: status,
    });
  },
}));
