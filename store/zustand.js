import { create } from "zustand";

export const useBearStore = create((set) => ({
  bears: 0,
  user: null,
  setUser: (data) => set((state) => ({ user: data })),
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));
