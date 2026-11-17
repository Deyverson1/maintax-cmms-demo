import { Link } from "react-router-dom";
import GeneralHeader from "../components/general-header/GeneralHeader";
import SidebarNavigation from "../components/ui/SidebarNavigation";
import FilterSearch from "../icons/filterSearch";
import PlusIconAlone from "../icons/plusIconAlone";
import SearchIcon from "../icons/searchIcon";
import ChevronDown from "../icons/chevronDown";
import OrderCard from "../components/work-orders/list/orderCard";
import Footer from "../layouts/Footer";
import DashboardFooter from "../components/dashboard/DashboardFooter";
import { useEffect, useState } from "react";
import { supabase } from "../utility/supabase";
import SkeletonCard from "../components/common/SkeletonCard";
import WatchIcon from "../icons/watchIcon";

export default function WorkOrders() {
  //almacena todos los datos
  const [workOrders, setWorkOrders] = useState([]);
  //verifica si la pagina se encuentra en carga para mostrar unos skeletons
  const [loading, setLoading] = useState(true);
  //filtros para búsqueda, por buscador
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  //filtar por fecha de creación
  const [timeFilter, setTimeFilter] = useState(true);
  //obtener todos los datos
  useEffect(() => {
    const fetchWorkOrders = async () => {
      const { data, error } = await supabase.from("work-orders").select("*");

      if (error) {
        console.error("Error:", error);
      } else {
        setWorkOrders(data);
        setLoading(false);
      }
    };

    fetchWorkOrders();
  }, []);
  //filtrar por fecha de creación
  const handleSortTime = () => {
    setTimeFilter(!timeFilter);
  };

  return (
    <main>
      <div className="mb-10 flex bg-[#F8FAFB]">
        <SidebarNavigation />
        <section className="w-full px-4 lg:w-[80%] lg:px-12">
          <GeneralHeader />
          <div className="flex flex-col gap-8 py-10">
            <section className="flex flex-col items-center gap-4 lg:flex-row lg:justify-between lg:gap-0">
              <div>
                <h2 className="pb-1 font-black text-[#0A3960] lg:text-4xl">
                  Órdenes de Trabajo
                </h2>
                <p className="text-lg text-gray-700">
                  Gestionar y realizar seguimiento de las tareas de
                  mantenimiento industrial en toda la instalación
                </p>
              </div>
              <div>
                <Link
                  to={"/WorkOrders/Create"}
                  className="flex items-center justify-center gap-2 rounded-xl bg-linear-to-b from-[#0A3960] to-[#1B4F72] px-4 py-2 text-xs text-white transition-all duration-300 hover:scale-102 lg:py-3.5 lg:text-lg lg:font-semibold"
                >
                  <PlusIconAlone size={18} md:size={26} />
                  Crear Orden de Trabajo
                </Link>
              </div>
            </section>
            <section className="hidden justify-between gap-4 rounded-2xl bg-[#f2f4f5] p-4 lg:flex">
              <div className="relative w-[70%]">
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="w-full rounded-xl bg-[#ffffff] px-13 py-3"
                  placeholder="Buscar tareas y Ordenes de Trabajo..."
                />
                <div className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500">
                  <SearchIcon size={20} />
                </div>
              </div>
              <div className="relative flex items-center">
                <select
                  name="Estado"
                  className="appearance-none rounded-xl bg-[#ffffff] px-4 py-3 pr-10 text-gray-800 hover:cursor-pointer"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="Todos">Todos los estados</option>
                  <option value="Completado">Completado</option>
                  <option value="Pendiente">Pendiente</option>
                  <option value="En Progreso">En Progreso</option>
                  <option value="Cotizado">Cotizado</option>
                  <option value="Cancelado">Cancelado</option>
                </select>
                <div className="pointer-events-none absolute right-3 pt-0.5">
                  <ChevronDown size={24} />
                </div>
              </div>
              <button
                onClick={handleSortTime}
                className="flex items-center justify-center rounded-xl bg-[#ffffff] px-4 py-3 hover:cursor-pointer"
              >
                <WatchIcon size={24} />
              </button>
              {/* <div className="relative flex items-center">
                <select
                  name="Prioridades"
                  className="bg-[#ffffff] text-gray-800 rounded-xl px-4 pr-10 py-3 appearance-none"
                >
                  <option value="Select">Todos las prioridades</option>
                  <option value="Alta">Alta</option>
                  <option value="Baja">Baja</option>
                </select>
                <div className="absolute pt-0.5 pointer-events-none right-3">
                  <ChevronDown size={24} />
                </div>
              </div> */}
              <button className="cursor-pointer rounded-xl bg-gray-300 px-4">
                <FilterSearch size={24} />
              </button>
            </section>
          </div>
          {loading ? (
            <div className="grid grid-cols-3 gap-6">
              {[...Array(8)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <OrderCard
              workOrders={workOrders}
              searchText={searchText}
              statusFilter={statusFilter}
              timeFilter={timeFilter}
            />
          )}
        </section>
      </div>
      <DashboardFooter />
    </main>
  );
}
