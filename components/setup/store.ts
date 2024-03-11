import { create } from "zustand";

type SetupStore = {
  tab: string;
};

export const useSetupStore = create<SetupStore>((set) => ({
  tab: "资源管理器",
}));
