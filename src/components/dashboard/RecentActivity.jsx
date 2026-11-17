import ClipboardIcon from "../../icons/clipboard";

export default function RecentActivity() {
  const RecentActivityData = [
    {
      task: "Orden de trabajo #151 creada",
      description:
        "Extrusora E3 - Cambio de husillo y revisión de resistencias",
      timeAgo: "Hace 8 minutos",
    },
    {
      task: "Requisición REQ-815 enviada a aprobación",
      description: "Rodamientos 6205-2RS x 12 para línea de empaque",
      timeAgo: "Hace 25 minutos",
    },
    {
      task: "Stock bajo: Filtro aspiradoras",
      description: "Quedan 2 unidades, mínimo configurado: 5",
      timeAgo: "Hace 40 minutos",
    },
    {
      task: "Orden de trabajo #144 cambió a En Progreso",
      description: "Reductor bobinador E2 ",
      timeAgo: "Hace 1 hora",
    },
    {
      task: "Salida de repuestos registrada",
      description:
        "Correa dentada B-85 x 3 entregadas a Mantenimiento Mecánico",
      timeAgo: "Hace 2 horas",
    },
    {
      task: "Orden de compra OC-342 recibida",
      description:
        "Proveedor Rodamientos del Valle - 5 ítems ingresados a bodega",
      timeAgo: "Hace 3 horas",
    },
  ];

  return (
    <section className="flex w-[40%] flex-col gap-5">
      <h2 className="text-xl font-bold text-[#0A3960]">Actividad reciente</h2>
      <section className="flex flex-1 flex-col self-start rounded-xl bg-[#f2f4f5] p-8">
        {RecentActivityData.map((data, index) => (
          <div key={index} className="relative flex flex-1 gap-4">
            <div className="absolute -left-3 z-10 rounded-xl border-2 border-[#0A3960] bg-white p-4">
              <ClipboardIcon size={24} />
            </div>
            <div className="pb-6 pl-10 ml-4 border-l-2 border-gray-400">
              <h3 className="text-lg font-semibold text-[#191C1D]">
                {data.task}
              </h3>
              <p className="mb-1 text-gray-600">{data.description}</p>
              <span className="text-sm uppercase text-slate-500">
                {data.timeAgo}
              </span>
            </div>
          </div>
        ))}
      </section>
    </section>
  );
}
