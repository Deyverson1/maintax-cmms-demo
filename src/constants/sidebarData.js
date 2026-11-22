import Briefcase from "../icons/briefcase";
import BuildingFactoryIcon from "../icons/buildingFactoryIcon";
import CalendarIcon from "../icons/calendarIcon";
import ClipboardIcon from "../icons/clipboard";
import DashboardIcon from "../icons/dashboard";
import ShoppingCartIcon from "../icons/shoppingCarrt";
import TruckDeliveryIcon from "../icons/truckDeliveryIcon";
import WarehouseIcon from "../icons/warehouseIcon";

export const SidebarData = [
  {
    name: "Inicio",
    icon: DashboardIcon,
    path: "/MainDashboard",
  },
  {
    name: "Calendario de Trabajo",
    icon: CalendarIcon,
    path: "/Calendar",
  },

  {
    name: "Ordenes de Trabajo",
    icon: Briefcase,
    path: "/WorkOrders",
  },
  {
    name: "Inventario",
    icon: WarehouseIcon,
    path: "/Inventory",
  },
  {
    name: "Salida de repuestos",
    icon: TruckDeliveryIcon,
    path: "/PartOutbound",
  },
  {
    name: "Requisiciones",
    icon: ClipboardIcon,
    path: "/Requisitions",
  },
  {
    name: "Maquinaria",
    icon: BuildingFactoryIcon,
    path: "/Assets",
  },
  {
    name: "Compras",
    icon: ShoppingCartIcon,
    path: "/RequisitionGenerator",
  },
];
