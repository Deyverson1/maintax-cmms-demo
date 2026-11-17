import CircleCheck from "../icons/circleCheck";
import ClockIcon from "../icons/clockHour";
import IconBan from "../icons/iconBan";
import Loader from "../icons/loader";
import MoneyIcon from "../icons/moneyIcon";

export const statusData = [
  {
    id: "Pendiente",
    label: "Pendiente",
    activeClass: "bg-yellow-100 text-yellow-600 border border-yellow-500",
    icon: <ClockIcon size={18} />,
  },
  {
    id: "Cotizado",
    label: "Cotizado",
    activeClass: "bg-purple-100 text-purple-700 border border-purple-500",
    icon: <MoneyIcon size={18} />,
  },
  {
    id: "En Progreso",
    label: "En Progreso",
    activeClass: "bg-blue-100 text-[#0A3960] border border-blue-500",
    icon: <Loader size={18} />,
  },
  {
    id: "Completado",
    label: "Completado",
    activeClass: "bg-green-100 text-green-700 border border-green-500",
    icon: <CircleCheck size={18} />,
  },
  {
    id: "Cancelado",
    label: "Cancelado",
    activeClass: "bg-black text-white border border-black",
    icon: <IconBan size={18} />,
  },
];
