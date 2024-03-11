import { create } from "zustand";

interface ToastStore {
  refresh: boolean;
  title: string;
  varient: "default" | "destructive" | "success" | "warning";
  description: string;
  setToast: (
    title: string,
    description: string,
    varient: "default" | "destructive" | "success" | "warning"
  ) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  refresh: false,
  title: "",
  varient: "default",
  description: "",
  setToast: (
    title: string,
    description: string,
    varient: "default" | "destructive" | "success" | "warning"
  ) =>
    set((state) => ({
      title,
      description,
      varient,
      refresh: !state.refresh,
    })),
}));
