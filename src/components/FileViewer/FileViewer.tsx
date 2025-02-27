import React, { useState } from "react";

import { FileItem } from "../../types/FileViewer";
import { FilePreview } from "../FilePreview/FilePreview";

type FileViewerProps = {
  files: FileItem[];
};

export const FileViewer: React.FC<FileViewerProps> = ({ files }) => {
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);

  return (
    <div className="file-viewer">
      <div className="file-list">
        {files.map((file) => (
          <button key={file.id} onClick={() => setSelectedFile(file)}>
            {file.name}
          </button>
        ))}
      </div>

      <div className="file-preview">
        {selectedFile ? (
          <FilePreview file={selectedFile} />
        ) : (
          <p>Selecciona un archivo para previsualizarlo</p>
        )}
      </div>
    </div>
  );
};
