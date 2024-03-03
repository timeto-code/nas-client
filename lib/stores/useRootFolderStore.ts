import { create } from "zustand";

interface rootFolderStore {
  rootFolderId: string;
}

export const useRootFolderStore = create<rootFolderStore>((set) => ({
  rootFolderId: "",
}));
