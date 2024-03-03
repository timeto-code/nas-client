import { create } from "zustand";

interface FolderStore {
  folderId: string;
  folderParentId: string | null;
  parentFolderId: string;
  refresh: boolean;
}

export const useFolderStore = create<FolderStore>((set) => ({
  folderId: "",
  folderParentId: null,
  parentFolderId: "",
  refresh: false,
}));
