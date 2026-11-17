import { useState } from "react";
import DownloadIcon from "../../icons/downloadIcon";
import PdfIcon from "../../icons/pdfIcon";
import XlsIcon from "../../icons/xlsIcon";
import MergePdf from "../requisition/MergePdf";

export default function AssetDocumentation() {
  const [files, setFiles] = useState();
  const AssetDocumentationData = [
    {
      id: "doc-3",
      name: "User Manual",
      type: "pdf",
      version: "v3.0",
      size: "45.8 MB",
      updatedAt: "2023-03-22",
    },
    {
      id: "doc-2",
      name: "Detalles Técnicos",
      type: "excel",
      version: "v1.0",
      size: "15.8 MB",
      updatedAt: "2023-09-22",
    },
  ];
  return (
    <section className="py-15">
      <h4 className="text-xl font-bold tracking-wider text-gray-700 uppercase">
        Documentación Técnica
      </h4>
      <section className="flex gap-4 pt-6">
        {AssetDocumentationData.map((dato) => (
          <article
            key={dato.id}
            className={`flex w-[30%] origin-bottom flex-col gap-8 rounded-lg border bg-[#ffffff] px-6 py-7 transition-transform duration-300 ease-out hover:scale-105 hover:shadow-[0_0_15px_rgba(0,0,0,0.08)] ${dato.type === "pdf" ? "border-l-5 border-red-500" : "border-l-5 border-green-500"}`}
          >
            <div className="flex gap-4">
              <div
                className={`rounded-md p-2 ${dato.type === "pdf" ? "bg-red-50 text-red-500" : "bg-green-50 text-green-400"}`}
              >
                {dato.type === "pdf" ? (
                  <PdfIcon size={35} />
                ) : (
                  <XlsIcon size={35} />
                )}
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-lg font-semibold text-gray-800 t">
                  {dato.name}
                </p>
                <span className="text-xs font-bold text-[#0A3960] uppercase">
                  {dato.version} - {dato.type} - {dato.size}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between text-gray-700">
              <p className="text-[14px]">Actualizado: {dato.updatedAt}</p>
              <span>
                <DownloadIcon size={26} />
              </span>
            </div>
          </article>
        ))}
      </section>
    </section>
  );
}
