import Briefcase from "../../icons/briefcase";
import ClipboardIcon from "../../icons/clipboard";
import DashboardIcon from "../../icons/dashboard";
import ShoppingCartIcon from "../../icons/shoppingCarrt";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../utility/supabase";
import BuildingFactoryIcon from "../../icons/buildingFactoryIcon";
import WarehouseIcon from "../../icons/warehouseIcon";
import TruckDeliveryIcon from "../../icons/truckDeliveryIcon";
import CalendarIcon from "../../icons/calendarIcon";

export default function SidebarNavigation({ isModalActive }) {
  const SidebarData = [
    {
      name: "Inicio",
      icon: <DashboardIcon size={26} />,
      path: "/MainDashboard",
    },
    {
      name: "Calendario de Trabajo",
      icon: <CalendarIcon size={26} />,
      path: "/Calendar",
    },

    {
      name: "Ordenes de Trabajo",
      icon: <Briefcase size={26} />,
      path: "/WorkOrders",
    },
    {
      name: "Inventario",
      icon: <WarehouseIcon size={26} />,
      path: "/Inventory",
    },
    {
      name: "Salida de repuestos",
      icon: <TruckDeliveryIcon size={26} />,
      path: "/PartOutbound",
    },
    {
      name: "Requisiciones",
      icon: <ClipboardIcon size={26} />,
      path: "/Requisitions",
    },
    {
      name: "Maquinaria",
      icon: <BuildingFactoryIcon size={26} />,
      path: "/Assets",
    },
    // {
    //   name: "Inventario",
    //   icon: <ClipboardIcon size={26} />,
    //   path: "/ded",
    // },
    {
      name: "Compras",
      icon: <ShoppingCartIcon size={26} />,
      path: "/RequisitionGenerator",
    },
  ];

  const locationActual = window.location.pathname;

  return (
    <nav
      className={`z-40 hidden min-h-screen w-[20%] bg-[#F5F7F8] px-6 py-6 md:flex md:flex-col ${isModalActive ? "blur transition-all duration-500" : ""} `}
    >
      <Link
        to={"/MainDashboard"}
        className="flex flex-col items-center justify-center"
      >
        <img
          src="/maintaxLogoNoBg.svg"
          alt="Logo de Maintax CMMS Industrial"
          className="aspect-square w-2/8 rounded-2xl"
        />

        <p className="text-sm font-normal tracking-widest uppercase text-neutral-950">
          Industrial CMMS
        </p>
      </Link>
      <div className="flex flex-col gap-1.5 pt-16 text-lg text-[#0A3960]">
        {SidebarData.map((data) => (
          <Link
            key={data.name}
            to={data.path}
            className={`flex items-center gap-3 py-3 transition-all duration-100 hover:scale-102 ${
              locationActual.startsWith(data.path)
                ? "rounded-r-lg border-l-4 border-[#1B4F72] bg-gray-200 px-3 font-black"
                : "px-4"
            }`}
          >
            {data.icon}
            <p>{data.name} </p>
          </Link>
        ))}
      </div>
    </nav>
  );
}
