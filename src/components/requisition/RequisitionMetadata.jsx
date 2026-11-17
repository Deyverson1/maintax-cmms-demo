import MetadataList from "../common/MetadataList";
import MergePdf from "./MergePdf";
import { RequisitionDocument } from "../pdf-render/RequisitionDocument.jsx";
import { mergeGeneratedPdf } from "../../utility/mergeGeneratedPdf.jsx";
import { supabase } from "../../utility/supabase.jsx";

export default function RequisitionMetadata({
  formData,
  files,
  setFiles,
  setIsGenerating,
  isGenerating,
}) {
  const handleGeneratePdf = async () => {
    setIsGenerating(true);
    try {
      const pdfBytes = await mergeGeneratedPdf(
        RequisitionDocument,
        formData,
        files,
      );

      const fileName = `${formData.requisitionNumber}.pdf`;

      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const { error: uploadError } = await supabase.storage
        .from("requisitions")
        .upload(fileName, blob, {
          contentType: "application/pdf",
          upsert: true,
        });

      if (!uploadError) {
        const { data: urlData } = supabase.storage
          .from("requisitions")
          .getPublicUrl(fileName);

        await supabase.from("requisitions").insert([
          {
            requisition_number: formData.requisitionNumber,
            pdf_url: urlData.publicUrl,
            requisition_status: "Pendiente",
            requisition_name: formData.requisitionName,
            total_value: formData.items.reduce(
              (sum, item) =>
                sum + Number(item.itemValue) * Number(item.itemAmount),
              0,
            ),
          },
        ]);
      }

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${formData.requisitionNumber + " " + formData.requisitionName}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generando PDF:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat("es-CO").format(value);
  };

  const subtotal = formData.items.reduce(
    (sum, item) => sum + Number(item.itemValue) * Number(item.itemAmount),
    0,
  );

  const valorIva = subtotal * 0.19;
  const finalValue = subtotal + valorIva;

  const totalValue = formatNumber(finalValue);

  const time = new Date();
  const metadata = [
    { label: "Solicitante", value: "Deyverson Herrera" },
    { label: "Fecha", value: time.toLocaleDateString() },
    { label: "F. de llegada", value: time.toLocaleDateString() },
  ];

  const summaryMetadata = [
    { label: "Subtotal", value: `$ ${formatNumber(subtotal)}` },
    { label: "IVA (19%)", value: `$ ${formatNumber(valorIva)}` },
  ];
  return (
    <main className="flex-col hidden p-4 gap-8 w-[30%] md:flex">
      <section className="flex items-center justify-center w-full gap-4 my-8">
        <button className="text-[#1B4F72] font-bold">Cancelar</button>
        <button
          type="button"
          onClick={handleGeneratePdf}
          className="cursor-pointer bg-[#1B4F72] text-white font-semibold py-3 px-6 rounded"
        >
          Generar Requisición
        </button>
      </section>
      <section className="flex flex-col  justify-center  py-8 text-lg  bg-[#F5F7F8] rounded-xl border-gray-200 border">
        <h3 className="pb-6 pl-8 text-sm font-black tracking-wider uppercase border-b border-gray-300 text-neutral-700">
          Contabilidad detallada
        </h3>
        <MetadataList metadata={summaryMetadata} />
        <p className="flex px-8 justify-between pt-2 uppercase  text-[#1B4F72] text-lg font-black border-gray-300">
          Precio total <span className="text-xl"> ${totalValue} </span>
        </p>
        <h3 className="pb-6 pl-8 mt-10 text-sm font-black tracking-wider uppercase border-b border-gray-300 text-neutral-700">
          Resumen de Compra
        </h3>
        <MetadataList metadata={metadata} />
      </section>
      <MergePdf files={files} setFiles={setFiles} />
    </main>
  );
}
