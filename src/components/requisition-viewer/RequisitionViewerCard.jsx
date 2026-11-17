import { useEffect, useState } from "react";
import PdfIcon from "../../icons/pdfIcon";
import { supabase } from "../../utility/supabase";
import SkeletonCard from "../common/SkeletonCard";
import { requisitionStatusData } from "../../utility/RequisitionStatusData";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

export default function RequisitionViewerCard({
  setRefresh,
  searchText,
  statusFilter,
}) {
  //lista de elementos
  const [lista, setLista] = useState([]);
  //revisar una requisición especifica
  const [isViewerLoading, setViewerLoading] = useState(true);
  //estados posibles de las requisiciones
  const requisitionStatuses = [
    "Pendiente",
    "En Revisión",
    "Aprobado",
    "Cancelado",
  ];
  //navigate
  const navigate = useNavigate();
  //filtros para búsquedas
  const listaFiltrada = lista.filter((item) => {
    const matchesText =
      item.requisition_name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.requisition_number.includes(searchText);

    const matchesStatus =
      statusFilter === "Todos" || item.requisition_status === statusFilter;

    return matchesText && matchesStatus;
  });
  //paginado
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const listaPaginada = listaFiltrada.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(listaFiltrada.length / itemsPerPage);

  //cambios de estado de la requisición
  const handleStatusChange = async (currentStatus, id) => {
    const currentIndex = requisitionStatuses.indexOf(currentStatus);
    const nextStatus =
      requisitionStatuses[(currentIndex + 1) % requisitionStatuses.length];

    await supabase
      .from("requisitions")
      .update({ requisition_status: nextStatus })
      .eq("id", id);

    setLista((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, requisition_status: nextStatus } : item,
      ),
    );
    setRefresh((r) => r + 1);
  };
  //obtener los datos
  useEffect(() => {
    async function obtenerDatos() {
      const { data, error } = await supabase
        .from("requisitions")
        .select("*")
        .order("requisition_number", { ascending: false });

      if (data) (setLista(data), setViewerLoading(false));
    }

    obtenerDatos();
  }, []);

  //eliminar requisiciones
  const handleRequisitionDelete = async (id) => {
    const { error } = await supabase.from("requisitions").delete().eq("id", id);
    if (error) {
      console.log("Error:", error);
    } else {
      setLista((prev) => prev.filter((item) => item.id !== id));
      setRefresh((r) => r + 1);
    }
  };

  return (
    <section className="flex flex-col gap-4">
      {isViewerLoading ? (
        <div className="grid grid-cols-3 gap-6">
          {[...Array(8)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        listaPaginada.map((data) => {
          const currentStatus = requisitionStatusData.find(
            (elemento) => elemento.id === data.requisition_status,
          );
          const total = data.total_value * 0.19 + data.total_value;

          return (
            <article
              key={data.id}
              className="group flex cursor-pointer items-center gap-6 rounded-2xl border border-gray-200 bg-white px-4 py-4 text-[#191C1D] hover:text-[#0A3960]"
            >
              <div className="hidden rounded-xl bg-gray-200 px-4 py-3 text-[#0A3960] transition-all duration-300 group-hover:bg-[#0A3960] group-hover:text-white md:block">
                <PdfIcon size={50} />
              </div>
              <div
                onClick={() => navigate(`/Requisitions/${data.id}`)}
                className="w-full"
              >
                <h3 className="text-md font-bold md:text-xl">
                  {" "}
                  <span className="text-red-700">
                    {" "}
                    #{data.requisition_number}
                  </span>{" "}
                  {data.requisition_name}
                </h3>
                <p className="mt-1 flex gap-2 text-sm text-gray-800">
                  {" "}
                  {new Date(data.created_at).toLocaleDateString("es-CO")}
                </p>
              </div>
              <div className="flex w-[60%] flex-col items-center justify-center gap-8 text-center md:flex-row md:justify-end">
                <div>
                  <p className="text-center text-xs tracking-wider text-gray-800 uppercase">
                    Costo total
                  </p>
                  <span className="text-sm font-bold text-[#0A3960] md:text-base">
                    $ {new Intl.NumberFormat("es-CO").format(total)} COP
                  </span>
                </div>
                <button
                  onClick={() =>
                    handleStatusChange(data.requisition_status, data.id)
                  }
                  className={`flex items-center gap-1 rounded-full bg-[#d7ecfb] px-4 py-0.5 text-[#4a6174] ${
                    currentStatus
                      ? currentStatus.activeClass
                      : "bg-[#d7ecfb] text-[#4a6174]"
                  }`}
                >
                  {data.requisition_status}
                </button>
                <button
                  onClick={() => handleRequisitionDelete(data.id)}
                  className="hidden cursor-pointer hover:scale-115 hover:text-red-600 md:block"
                >
                  <FaTrash />
                </button>
              </div>
            </article>
          );
        })
      )}
      <div className="flex justify-center gap-2 py-4 md:justify-end">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="font-bold text-[#0A3960] hover:cursor-pointer hover:underline"
        >
          Anterior
        </button>
        <span className="italic">
          Página {currentPage} de {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="font-bold text-[#0A3960] hover:cursor-pointer hover:underline"
        >
          Siguiente
        </button>
      </div>
    </section>
  );
}
