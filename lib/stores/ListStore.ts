import { create } from "zustand";

interface ListItemContextMenuStore {
  focusedItemId: string;
}

export const useListItemContextMenuStore = create<ListItemContextMenuStore>(
  (set) => ({
    focusedItemId: "",
  })
);

interface ListItemRenameStore {
  renameItemId: string;
}

export const useListItemRenameStore = create<ListItemRenameStore>((set) => ({
  renameItemId: "",
}));
