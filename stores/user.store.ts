import { create } from "zustand";

type User = {
  id: string;
  email: string;
  rollNo: number;
  password?: string | null;
  userName: string;
  currentSemester: number;
  role: string;
  refreshTokenVersion: number;
};

type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user: User) => {
    set({ user: user });
  },
}));
