export type FileItem = {
  id: string;
  name: string;
  url: string;
  type: "image" | "pdf" | "video" | "audio" | "text" | "other";
};