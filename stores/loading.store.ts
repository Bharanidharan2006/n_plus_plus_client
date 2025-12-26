import { create } from "zustand";

type LoadingStore = {
  isLoading: boolean;
  setLoading: (status: boolean) => void;
};

export const useLoadingStore = create<LoadingStore>((set) => ({
  isLoading: false,
  setLoading: (status: boolean) => {
    set({ isLoading: status });
  },
}));
