import { FileItem } from "../../types/FileViewer";

type FilePreviewProps = {
  file: FileItem;
};

export const FilePreview: React.FC<FilePreviewProps> = ({ file }) => {
  switch (file.type) {
    case "image":
      return <img src={file.url} alt={file.name} className="preview-image" />;
    case "pdf":
      return <iframe src={file.url} title={file.name} className="preview-pdf" />;
    case "video":
      return <video src={file.url} controls className="preview-video" />;
    case "audio":
      return <audio src={file.url} controls className="preview-audio" />;
    case "text":
      return (
        <iframe src={file.url} title={file.name} className="preview-text" />
      );
    default:
      return <p>Tipo de archivo no soportado</p>;
  }
};
