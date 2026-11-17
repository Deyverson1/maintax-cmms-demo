import PlusIconAlone from "../../icons/plusIconAlone";

export default function AssetCriticalSpare() {
  const SparePartsColumns = [
    { label: "Nombre de la pieza" },
    { label: "Cantidad necesaria" },
    { label: "Proveedor" },
    { label: "Tiempo de entrega" },
    { label: "Último cambio" },
  ];
  const rowFields = [
    { key: "name", className: "text-[#0A3960] font-bold" },
    { key: "amount", className: "text-[#0A3960] font-bold" },
    { key: "supplier", className: "text-gray-600" },
    { key: "leadTimeDays", className: "text-gray-700" },
    { key: "lastChangeDate", className: "text-gray-800" },
  ];
  const sparePartsData = [
    {
      id: "sp-1",
      name: "Seal Kit HK-09",
      amount: 1,
      supplier: "HydraForce LLC",
      leadTimeDays: "15 días",
      lastChangeDate: "2024-11-12",
    },
    {
      id: "sp-2",
      name: "Rodamiento Principal B-102",
      amount: 2,
      supplier: "Global Tech Parts",
      leadTimeDays: "5 días",
      lastChangeDate: "2024-08-05",
    },
    {
      id: "sp-3",
      name: "Cuchilla de Corte Precisión C-40",
      amount: 4,
      supplier: "SteelBlade Supply",
      leadTimeDays: "10 días",
      lastChangeDate: "2025-02-18",
    },
  ];
  return (
    <section>
      <div className="flex items-center justify-between">
        <h4 className="text-xl font-bold tracking-wider text-gray-700 uppercase">
          Repuestos Críticos
        </h4>
        <button className="bg-[#0A3960] hover:cursor-pointer flex items-center gap-2 p-1 text-[#ffffff] uppercase text-md rounded-full font-semibold ">
          <PlusIconAlone size={20} />
        </button>
      </div>
      <section className="mt-6 border border-gray-200 rounded-2xl">
        <div className="grid grid-cols-5  text-center p-8  text-gray-600 uppercase text-[13px] tracking-widest font-bold bg-gray-100">
          {SparePartsColumns.map((dato) => (
            <article key={dato.label}>
              <p>{dato.label} </p>
            </article>
          ))}
        </div>
        <div className="flex flex-col">
          {sparePartsData.map((dato) => (
            <article
              key={dato.id}
              className="grid items-center grid-cols-5 px-8 py-4 text-center"
            >
              {rowFields.map((field) => (
                <p key={field.key} className={field.className}>
                  {dato[field.key]}
                </p>
              ))}
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
