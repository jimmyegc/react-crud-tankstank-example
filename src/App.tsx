import DataTable from './components/DataTable/DataTable'
import { FileViewer } from './components/FileViewer/FileViewer';
import { FileItem } from './types/FileViewer';

const files: FileItem[] = [
  { id: "1", name: "Imagen", url: "https://i.ytimg.com/vi/eFSeq0lAfnk/maxresdefault.jpg", type: "image" },
  { id: "2", name: "PDF", url: "/docs/sample.pdf", type: "pdf" },
  { id: "3", name: "Video", url: "/videos/sample.mp4", type: "video" },
  { id: "4", name: "Audio", url: "/audio/sample.mp3", type: "audio" },
];

function App() {

  return (
    <>
      <h2>Ejemplo</h2>
      <DataTable />
      <h2>Visor de Archivos</h2>
      <FileViewer files={files} />
    </>
  )
}

export default App
