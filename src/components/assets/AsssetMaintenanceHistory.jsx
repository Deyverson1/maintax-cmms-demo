export default function AssetMaintenanceHistory() {
  const assetMaintenanceHistoryData = [
    {
      type: "Mantenimiento Preventivo",
      date: "Jul 22, 2026",
      description: "Cambio de bandas, arreglo de cabezal, cambio de prensas",
      role: "Auxiliar",
      performedBy: "Jorge Q.",
      cost: "4.850",
    },
    {
      type: "Mantenimiento Correctivo",
      date: "Jul 22, 2022",
      description:
        "Reparación de motor por sobrecalentamiento, cambio de rodamientos",
      role: "Técnico",
      performedBy: "Andrés M.",
      cost: "6.200",
    },
  ];
  return (
    <section className="w-[50%] py-15">
      <h4 className="text-xl font-bold tracking-wider text-gray-700 uppercase">
        Historial de mantenimiento
      </h4>
      <section className="relative flex gap-6">
        <div className="mt-6 border border-gray-200 "></div>

        <div className="relative w-full">
          {assetMaintenanceHistoryData.map((dato, index) => (
            <div key={index}>
              <div
                className={`absolute z-10 w-3 h-3 rounded-full -left-7.75  ${dato.type === "Mantenimiento Preventivo" ? "bg-[#0A3960] " : "bg-red-700"}`}
              ></div>
              <article className="flex flex-1  flex-col gap-1 p-5 mt-6 bg-[#ffffff] border border-gray-200 rounded-xl hover:shadow-[0_0_15px_rgba(0,0,0,0.08)] origin-bottom transition-transform duration-300 ease-out hover:scale-101 ">
                <header className="flex items-center justify-between">
                  <h3
                    className={` text-lg font-bold ${dato.type === "Mantenimiento Preventivo" ? "text-[#0A3960]" : "text-red-700"}`}
                  >
                    {dato.type}
                  </h3>
                  <time dateTime={dato.date} className="uppercase text-[14px] ">
                    {dato.date}
                  </time>
                </header>
                <p className="text-gray-700 min-h-12">{dato.description}</p>
                <footer className="flex text-[14px] items-center justify-between pt-4">
                  <span className="font-semibold text-gray-700 uppercase ">
                    {dato.role}: {dato.performedBy}
                  </span>
                  <span className="text-[#0A3960] font-bold">
                    ${dato.cost} COP{" "}
                  </span>
                </footer>
              </article>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
