import { create } from "zustand";

interface NavbarStore {
  isTablet: boolean;
}

export const useNavbarStore = create<NavbarStore>((set) => ({
  isTablet: true,
}));
