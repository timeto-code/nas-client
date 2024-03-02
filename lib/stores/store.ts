import { create } from "zustand";

interface ThemeStore {
  theme: "light" | "dark" | "system";
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: "system",
}));
