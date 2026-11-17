import { PDFDocument } from "pdf-lib";
import { pdf } from "@react-pdf/renderer";

export const mergeGeneratedPdf = async (
  PdfComponent,
  formData,
  uploadedFiles,
) => {
  // Crear PDF vacío
  const mergedPdf = await PDFDocument.create();

  // Generar PDF desde React
  if (!formData || !formData.requisitionNumber) {
    throw new Error("formData incompleto");
  }

  const generatedBlob = await pdf(
    <PdfComponent formData={formData} />,
  ).toBlob();

  const generatedBytes = await generatedBlob.arrayBuffer();

  const generatedPdf = await PDFDocument.load(generatedBytes);

  // Agregar páginas del PDF principal
  const generatedPages = await mergedPdf.copyPages(
    generatedPdf,
    generatedPdf.getPageIndices(),
  );

  generatedPages.forEach((page) => mergedPdf.addPage(page));

  // Agregar PDFs cargados
  for (const file of uploadedFiles) {
    const fileBytes = await file.arrayBuffer();

    const quotationPdf = await PDFDocument.load(fileBytes);

    const quotationPages = await mergedPdf.copyPages(
      quotationPdf,
      quotationPdf.getPageIndices(),
    );

    quotationPages.forEach((page) => mergedPdf.addPage(page));
  }

  return await mergedPdf.save();
};
