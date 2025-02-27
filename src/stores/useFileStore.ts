import { create } from "zustand";
import { FileItem } from "../types/FileViewer";

type FileStore = {
  files: FileItem[];
  setFiles: (files: FileItem[]) => void;
};

export const useFileStore = create<FileStore>((set) => ({
  files: [],
  setFiles: (files) => set({ files }),
}));
