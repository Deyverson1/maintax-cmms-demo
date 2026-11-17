import { Document, Page, pdfjs } from "react-pdf";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";

// Worker correcto para react-pdf v10 + Vite
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "react-pdf/node_modules/pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

export default function PdfCard({ file, removeFile }) {
  const [like, setLiked] = useState(false);
  return (
    <div className="flex items-center justify-between rounded-xl bg-white p-4 shadow">
      <div className="flex items-center gap-4">
        <Document file={file}>
          <Page
            pageNumber={1}
            width={80}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>

        <div>
          <p>{file.name}</p>
          <p>{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
        </div>
      </div>

      <button onClick={removeFile}>
        <FaTrash
          onMouseEnter={() => setLiked(!like)}
          onMouseLeave={() => setLiked(!like)}
          color={like ? "red" : "black"}
          className="cursor-pointer transition-transform duration-200 hover:scale-110"
        />
      </button>
    </div>
  );
}
