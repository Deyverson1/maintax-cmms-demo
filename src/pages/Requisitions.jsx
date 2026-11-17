import { useEffect, useState } from "react";
import SidebarNavigation from "../components/ui/SidebarNavigation";
import { supabase } from "../utility/supabase";
import GeneralHeader from "../components/general-header/GeneralHeader";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "../icons/shoppingCarrt";
import FilterSearch from "../icons/filterSearch";
import RequisitionViewerCard from "../components/requisition-viewer/RequisitionViewerCard";
import SearchIcon from "../icons/searchIcon";
import { useKpis } from "../hooks/useKpis";

export default function Requisitions() {
  //búsqueda por text
  const [searchText, setSearchText] = useState("");
  //búsqueda por filtros predefinidos
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [refresh, setRefresh] = useState(0);
  //KPIS para datos rápidos
  const { kpiData } = useKpis(refresh);

  const statuses = [
    "Todos",
    "Aprobado",
    "En Revisión",
    "Pendiente",
    "Cancelado",
  ];

  const formatCompact = (value) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value}`;
  };
  const dataRequisitions = [
    { name: "Requisiciones activas", amount: kpiData.active, note: "+3 hoy" },
    {
      name: "Requisiciones mes actual",
      amount: kpiData.thisMonth,
      note: "5 esta semana",
    },
    {
      name: "Gasto mensual",
      amount: formatCompact(kpiData.monthlySpend),
      note: "COP",
    },
  ];

  return (
    <section className="flex bg-[#F8FAFB]">
      <SidebarNavigation />
      <section className="w-full px-2 md:w-[80%] md:px-12">
        <GeneralHeader />
        <section className="mt-10 flex flex-wrap gap-4 md:flex-nowrap">
          <div className="flex w-full flex-wrap gap-x-6 gap-y-4 text-center md:w-[70%] md:flex-row">
            {dataRequisitions.map((data) => (
              <div
                className="flex flex-1 items-center justify-center gap-4 gap-y-4 rounded-xl border border-gray-200 bg-white px-8 py-4 md:flex-col md:items-start md:justify-start md:py-8 md:pb-10"
                key={data.name}
              >
                <h4 className="font-mono text-xs tracking-wider text-[#546371] uppercase md:text-base">
                  {data.name}{" "}
                </h4>
                <p className="text-lg font-black text-[#0A3960] md:text-4xl">
                  {data.amount}{" "}
                  {/* <span className="ml-2 text-lg font-semibold text-[#5E7E95] ">
                    {data.note}{" "}
                  </span> */}
                </p>
              </div>
            ))}
          </div>
          <div className="w-full md:w-[30%]">
            <div className="flex flex-col gap-y-3 rounded-xl border border-gray-200 bg-[#0A3960] p-6 md:px-10 md:py-8 md:pb-10">
              <h4 className="z-1 font-bold tracking-widest text-gray-300 uppercase">
                Nueva Requisición
              </h4>
              <p className="z-1 text-gray-300">
                Crea una nueva requisición por materiales, activos o servicios
              </p>
              <Link
                to={"/RequisitionGenerator"}
                className="z-1 mt-3 self-start rounded bg-white px-6 py-2 font-semibold tracking-widest text-[#0A3960] uppercase"
              >
                Crear requisición
              </Link>
              <ShoppingCartIcon
                size={250}
                className={
                  "absolute top-62 right-0 z-0 text-white/10 md:top-39 md:right-6"
                }
              />
            </div>
          </div>
        </section>
        <section className="flex justify-between py-10">
          <div className="flex flex-col items-center gap-2 md:flex-row">
            <h3 className="mr-4 text-xl font-bold text-[#191C1D]">
              Listado de Requisiciones
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`cursor-pointer rounded-full border px-4 py-1.5 text-xs uppercase md:text-sm ${
                    statusFilter === status
                      ? "border-gray-400 bg-gray-200"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </section>
        <RequisitionViewerCard
          setRefresh={setRefresh}
          searchText={searchText}
          statusFilter={statusFilter}
        />
      </section>
    </section>
  );
}
