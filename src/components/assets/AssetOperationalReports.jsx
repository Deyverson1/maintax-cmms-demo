import PlusIconAlone from "../../icons/plusIconAlone";

export default function AssetOperationalReports() {
  return (
    <section className="w-[full] bg-[#ffffff] border border-gray-200 rounded-xl p-8 ">
      <h4 className="text-xl font-bold tracking-wider text-gray-700 uppercase">
        Reportes operativos
      </h4>
      <section className="flex flex-col gap-4 pt-6">
        <article className="bg-[#F8FAFB] rounded-md border-gray-200 p-4 border">
          <div className="flex items-center justify-between">
            <h5 className="uppercase max-w-1/2 text-[#0A3960]  font-bold">
              PM - Deyverson
            </h5>
            <time dateTime="7/26/2026">7/26//2026</time>
          </div>
          <p className="pt-3 text-gray-700">
            Orden de mantenimiento preventivo establecida, completando diversas
            tareas importantes en el funcionamiento principal de la maquina
          </p>
        </article>
      </section>
      <div
        className="flex flex-col items-center justify-center gap-2 mt-10"
        aria-placeholder="d"
      >
        <textarea
          className="w-full field-sizing-content resize-none p-4 border rounded-md border-gray-300 focus:outline-[#0A3960] text-gray-600"
          placeholder="Ej: Vibración leve en el motor..."
        />
        <button className="flex w-full uppercase rounded-md text-white font-semibold tracking-wide justify-center items-center bg-[#0A3960] p-2 gap-2">
          <span className="bg-white font-black rounded-full text-[#0A3960]">
            <PlusIconAlone size={17} />{" "}
          </span>
          Generar reporte
        </button>
      </div>
    </section>
  );
}
