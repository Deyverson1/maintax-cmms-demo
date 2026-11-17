export default function AssetHeader() {
  const AssetData = [
    { label: "Fabricante", labelValue: "FAG" },
    { label: "Modelo", labelValue: "2014" },
    { label: "Identificador", labelValue: "S1" },
    { label: "Tiempo de servicio", labelValue: "12 años" },
    { label: "Ult. Mant. Prev.", labelValue: "06/07/2026" },
  ];
  return (
    <header>
      <div className="relative overflow-hidden rounded-xl">
        <img
          src="/assets/E1.jpg"
          alt="Imagen E1"
          className="object-cover w-full transition-transform duration-400 blur-xs h-72 aspect-4/3 hover:scale-103"
        />
      </div>
      <div className="absolute flex flex-col gap-2 pl-6 text-white top-66">
        <div>
          <p className="text-xs font-bold uppercase">Primera planta</p>
        </div>
        <div className="flex items-center justify-center gap-6">
          <h1 className="text-xl font-bold tracking-tight">
            Selladora S1
          </h1>
          <button className="px-4 py-1 text-[14px] font-bold tracking-tighter uppercase bg-[#BA1A1A] rounded-full ">
            importancia: <span>Prioridad 1 (alta) </span>{" "}
          </button>
        </div>
      </div>
      <div className="flex justify-between gap-4 py-10">
        {AssetData.map((dato) => (
          <article
            key={dato.label}
            className="flex origin-bottom hover:shadow-[0_0_15px_rgba(0,0,0,0.08)] transition-transform duration-300 ease-out hover:scale-105  flex-col gap-1.5 flex-1 px-5 py-6 bg-[#ffffff] border border-gray-200 rounded-lg"
          >
            <p className="text-xs font-semibold tracking-widest text-gray-800 uppercase">
              {dato.label}
            </p>
            <span className="text-[#0A3960] text-xl font-bold">
              {dato.labelValue}{" "}
            </span>
          </article>
        ))}
      </div>
    </header>
  );
}
