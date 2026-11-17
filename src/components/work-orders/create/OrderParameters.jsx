import AdjustmentCog from "../../../icons/adjustmentsCog";
import SelectorGroup from "../../common/SelectorGroup";
import PrioritySelector from "./PrioritySelector";

export default function OrderParameters({
  priority,
  setPriority,
  deadline,
  setDeadline,
  area,
  setArea,
  status,
  setStatus,
  isEditing,
}) {
  const priorityTags = {
    Baja: "bg-green-100 text-green-700 border border-green-500",
    Media: "bg-yellow-100 text-yellow-700 border border-yellow-500",
    Alta: "bg-orange-100 text-orange-700 border border-orange-500",
    Urgente: "bg-red-100 text-red-700 border border-red-500",
  };
  const statusTags = {
    Pendiente: "bg-yellow-100 text-yellow-700 border border-yellow-500",
    "En Progreso": "bg-blue-100 text-blue-700 border border-blue-500",
    Cotizado: "bg-purple-100 text-purple-700 border border-purple-500",
    Completado: "bg-green-100 text-green-700 border border-green-500",
    Cancelado: "bg-red-100 text-red-700 border border-red-500",
  };

  const priorityData = [
    { id: "Baja", label: "Baja", activeClass: priorityTags.Baja },
    { id: "Media", label: "Media", activeClass: priorityTags.Media },
    { id: "Alta", label: "Alta", activeClass: priorityTags.Alta },
    { id: "Urgente", label: "Urgente", activeClass: priorityTags.Urgente },
  ];

  const statusData = [
    {
      id: "Pendiente",
      label: "Pendiente",
      activeClass: "bg-yellow-100 text-yellow-700 border border-yellow-500",
    },
    {
      id: "Cotizado",
      label: "Cotizado",
      activeClass: "bg-purple-100 text-purple-700 border border-purple-500",
    },
    {
      id: "En Progreso",
      label: "En Progreso",
      activeClass: "bg-blue-100 text-[#0A3960] border border-blue-500",
    },
    {
      id: "Completado",
      label: "Completado",
      activeClass: "bg-green-100 text-green-700 border border-green-500",
    },
    {
      id: "Cancelado",
      label: "Cancelado",
      activeClass: "bg-red-100 text-red-700 border border-red-500",
    },
  ];
  return (
    <section className="h-fit rounded-2xl bg-gray-200 px-6 py-10 lg:max-w-[25%]">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2 text-gray-800">
          <AdjustmentCog size={24} />
          <h3 className="font-semibold tracking-widest uppercase">
            Parámetros
          </h3>
        </div>
        {isEditing ? (
          <SelectorGroup
            label="Estado"
            options={statusData}
            selected={status}
            setSelected={setStatus}
          />
        ) : (
          ""
        )}
        <SelectorGroup
          label="Prioridad"
          options={priorityData}
          selected={priority}
          setSelected={setPriority}
        />
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="OrderDate"
            className="font-semibold tracking-wider text-gray-700 uppercase text-md"
          >
            Fecha limite
          </label>
          <input
            id="OrderDate"
            name="OrderDate"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="mt-2 rounded-sm border border-gray-300 bg-[#F5F7F8] p-4 py-3 text-neutral-950 transition-all duration-300 focus:border-[#0A3960] focus:shadow-[0_0_5px_rgba(0,0,0,0.15)] focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="OrderArea"
            className="font-semibold tracking-wider text-gray-700 uppercase text-md"
          >
            área/Máquina
          </label>
          <input
            id="OrderArea"
            name="OrderArea"
            type="text"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="Ingrese un area de destino..."
            className="mt-2 w-full rounded-sm border border-gray-300 bg-[#F5F7F8] p-4 py-3 text-neutral-950 transition-all duration-300 focus:border-[#0A3960] focus:shadow-[0_0_5px_rgba(0,0,0,0.15)] focus:outline-none"
          />
        </div>
      </div>
    </section>
  );
}
