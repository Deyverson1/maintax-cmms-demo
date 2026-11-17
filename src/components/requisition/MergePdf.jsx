import { useState } from "react";
import PdfCard from "./PdfCard";
import CloudUpload from "../../icons/cloudUpload";

export default function MergePdf({ files, setFiles }) {
  const [dragActive, setDragActive] = useState(false);

  // Función reutilizable
  const addFiles = (newFiles) => {
    const pdfFiles = Array.from(newFiles).filter(
      (file) => file.type === "application/pdf",
    );

    setFiles((prev) => [...prev, ...pdfFiles]);
  };

  // Input normal
  const handleFiles = (e) => {
    addFiles(e.target.files);
  };

  // Eliminar
  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Arrastrando encima
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  // Sale del área
  const handleDragLeave = () => {
    setDragActive(false);
  };

  // Soltar
  const handleDrop = (e) => {
    e.preventDefault();

    setDragActive(false);

    addFiles(e.dataTransfer.files);
  };

  return (
    <div className="flex flex-col justify-center px-8 py-8 text-lg bg-white border border-gray-200 rounded-xl">
      <h2 className="pb-4 text-sm font-black tracking-wider uppercase text-neutral-700">
        Adjuntar documentos
      </h2>

      <input
        id="pdfInput"
        type="file"
        multiple
        accept=".pdf"
        onChange={handleFiles}
        className="hidden"
      />

      <label
        htmlFor="pdfInput"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded border border-dashed py-10 text-gray-500 transition-all ${
          dragActive
            ? "scale-[1.02] border-blue-500 bg-blue-50"
            : "border-gray-400"
        } `}
      >
        <CloudUpload size={50} />

        <p className="font-bold tracking-tighter text-md text-neutral-950">
          {dragActive
            ? "Suelta los PDFs aquí"
            : "Cargar cotizaciones relacionadas"}
        </p>

        <span className="text-sm tracking-tighter text-gray-400">
          PDF MAX. 10MB
        </span>
      </label>

      {files.length > 0 && (
        <div className="flex flex-col gap-4 mt-4">
          {files.map((file, index) => (
            <PdfCard
              key={index}
              file={file}
              removeFile={() => removeFile(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
