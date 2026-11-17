import PlusIconAlone from "../../icons/plusIconAlone";
import GeneralHeader from "../general-header/GeneralHeader";

export default function AssetsHeader() {
  return (
    <section>
      <GeneralHeader />
      <header className="mt-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-[#0A3960]">
            Directorio de Activos
          </h2>
          <p className="mt-1 text-gray-800">
            Registro completo de maquinaria industrial y equipos críticos
          </p>
        </div>
        <button className="flex cursor-pointer gap-2 rounded bg-[#0A3960] px-4 py-3 font-semibold text-white uppercase transition-all duration-200 hover:scale-105">
          <PlusIconAlone size={24} />
          Registrar Activo
        </button>
      </header>
    </section>
  );
}
