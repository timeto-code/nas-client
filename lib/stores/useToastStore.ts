import { create } from "zustand";

interface ToastStore {
  refresh: boolean;
  title: string;
  varient: "default" | "destructive" | "success" | "warning";
  description: string;
}

export const useToastStore = create<ToastStore>((set) => ({
  refresh: false,
  title: "",
  varient: "default",
  description: "",
}));
