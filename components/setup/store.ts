import { create } from "zustand";

type SetupStore = {
  tab: string;
};

export const useSetupStore = create<SetupStore>((set) => ({
  tab: "资源管理器",
}));

type SetupFormSubmitStore = {
  submit: boolean;
};

export const useSetupFormSubmitStore = create<SetupFormSubmitStore>((set) => ({
  submit: false,
}));
