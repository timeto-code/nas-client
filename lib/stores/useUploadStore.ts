import { create } from "zustand";

export type ProgressFile = {
  id: string;
  name: string;
  size: number;
  totalChunks: number;
  status: "pending" | "uploading" | "success" | "error" | "cancel";
  progress: number;
  progressSize: number;
};

interface UploadStore {
  files: ProgressFile[];
  setFiles: (file: ProgressFile) => void;
  clearFiles: () => void;
  setStatus: (
    id: string,
    status: "pending" | "uploading" | "success" | "error" | "cancel"
  ) => void;
  setProgress: (id: string, chunkIndex: number, chunkSize: number) => void;
}

export const useUploadStore = create<UploadStore>((set) => ({
  files: [],
  setFiles: (file) => {
    set((state) => ({ files: [...state.files, file] }));
  },
  clearFiles: () => {
    set({ files: [] });
  },
  setStatus: (
    id: string,
    status: "pending" | "uploading" | "success" | "error" | "cancel"
  ) => {
    set((state) => ({
      files: state.files.map((file) =>
        file.id === id ? { ...file, status } : file
      ),
    }));
  },
  setProgress: (id: string, chunkIndex: number, chunkSize: number) => {
    set((state) => ({
      files: state.files.map((file) =>
        file.id === id
          ? {
              ...file,
              progress: (chunkIndex / file.totalChunks) * 100,
              progressSize: file.progressSize + chunkSize,
            }
          : file
      ),
    }));
  },
}));

interface CancelUploadStore {
  cancel: boolean;
  allUploadDone: boolean;
}

export const useCancelUploadStore = create<CancelUploadStore>((set) => ({
  cancel: false,
  allUploadDone: false,
}));
