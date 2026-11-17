import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../utility/supabase";
import SidebarNavigation from "../ui/SidebarNavigation";

export default function RequisitionViewerPDF() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [requisition, setRequisition] = useState(null);

  useEffect(() => {
    async function fetchRequisition() {
      const { data } = await supabase
        .from("requisitions")
        .select("*")
        .eq("id", id)
        .single();

      if (data) setRequisition(data);
    }
    fetchRequisition();
  }, [id]);

  const handleDownload = async () => {
    const response = await fetch(requisition.pdf_url);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${requisition.requisition_number}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <main className="flex">
      <SidebarNavigation />
      <section className="w-[80%] flex px-12 flex-col">
        <div className="flex justify-between p-6">
          <div>
            <h2 className="text-xl font-semibold tracking-wide text-gray-700 uppercase">
              {requisition?.requisition_name}
            </h2>
            <p className="text-gray-500">
              Requisición {requisition?.requisition_number}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-1.5 bg-gray-200 border hover:scale-105 duration-200 cursor-pointer border-gray-300 rounded full"
            >
              Volver
            </button>
            <button
              onClick={handleDownload}
              download
              className="px-6 hover:scale-105 duration-200 py-1.5 bg-[#1B4F72] text-white border border-gray-300 cursor-pointer rounded full"
            >
              Descargar
            </button>
          </div>
        </div>
        {requisition && (
          <iframe
            src={requisition.pdf_url}
            className="w-full h-screen rounded-4xl"
          />
        )}
      </section>
    </main>
  );
}
