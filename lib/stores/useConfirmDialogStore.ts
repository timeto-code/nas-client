import { create } from "zustand";

interface ConfirmDialogStore {
  open?: boolean;
  title?: string;
  description?: string;
  cancelText?: string;
  confirmText?: string;
  onConfirm: (e: any) => void;
  onCancel?: () => void;
  className?: string;
}

export const useConfirmDialogStore = create<ConfirmDialogStore>((set) => ({
  open: false,
  title: "",
  description: "",
  cancelText: "取消",
  confirmText: "确定",
  onConfirm: () => {},
  onCancel: () => {},
  className: "",
}));
