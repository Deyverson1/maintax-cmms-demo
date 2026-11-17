import ChevronDown from "../../icons/chevronDown";
import LayoutGrid from "../../icons/layoutGrid";
import ListIcon from "../../icons/listIcon";

export default function AssetsFilters() {
  return (
    <section className="flex items-center justify-between py-2 bg-gray-200 rounded-lg">
      <div className="flex gap-2 px-2">
        <div className="relative flex items-center border border-gray-200">
          <select
            name="assetArea"
            id="assetArea"
            className="bg-[#ffffff] text-gray-800 rounded-lg px-4 pr-10 py-3 appearance-none"
          >
            <option value="allAreas">Todas las Áreas</option>
            <option value="Extrusión">Extrusión</option>
            <option value="Flexografía">Flexografía</option>
            <option value="Refilado">Refilado</option>
            <option value="Sellado">Sellado</option>
          </select>
          <div className="absolute pt-0.5 pointer-events-none right-3">
            <ChevronDown size={24} />
          </div>
        </div>
        <div className="relative flex items-center border border-gray-200">
          <select
            name="machineStatus"
            id="machineStatus"
            className="bg-[#ffffff] text-gray-800 rounded-lg px-4 pr-10 py-3 appearance-none"
          >
            <option value="allStatus">Todos los estados</option>
            <option value="Operativa">Operativa</option>
            <option value="Fuera de servicio">Fuera de servicio</option>
            <option value="En mantenimiento">En mantenimiento</option>
          </select>
          <div className="absolute pt-0.5 pointer-events-none right-3">
            <ChevronDown size={24} />
          </div>
        </div>
      </div>
      <div className="flex gap-2 px-2 text-[#0A3960] ">
        <div className="px-3 py-2 bg-gray-300 rounded-lg cursor-pointer">
          <LayoutGrid size={30} />
        </div>
        <div className="px-3 py-2 rounded-lg cursor-pointer">
          <ListIcon size={30} />
        </div>
      </div>
    </section>
  );
}
