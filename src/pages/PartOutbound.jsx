import { useEffect, useState } from "react";
import OutboundModal from "../components/outbounds/OutboundModal";
import SidebarNavigation from "../components/ui/SidebarNavigation";
import FilterSearch from "../icons/filterSearch";
import PackageIcon from "../icons/packageIcon";
import SearchIcon from "../icons/searchIcon";
import UploadIcon from "../icons/uploadIcon";
import GeneralHeader from "../components/general-header/GeneralHeader";
import { supabase } from "../utility/supabase";

export default function PartOutbound() {
  const [isModalActive, setModalActive] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [data, setData] = useState([]);

  const [inputOutbound, setInputOutbound] = useState("");

  const outboundFilter = data.filter((item) => {
    const matches =
      item?.item.toLowerCase().includes(inputOutbound.toLowerCase()) ||
      item?.referencia.toLowerCase().includes(inputOutbound.toLowerCase());

    return matches;
  });

  useEffect(() => {
    const fetchOutbounds = async () => {
      const { data, error } = await supabase.from("outbounds").select("*");
      setData(data);
    };
    fetchOutbounds();
  }, [refresh]);

  console.log(data);
  return (
    <section className="flex">
      <SidebarNavigation isModalActive={isModalActive} />
      <section
        className={`z-0 w-full px-2 md:w-[80%] md:px-12 ${isModalActive ? "blur transition-all duration-500 " : ""}`}
      >
        <div>
          <GeneralHeader />
          <section className="flex items-center justify-between pt-10">
            <div>
              <h2 className="pb-2 text-4xl font-semibold tracking-tight">
                Salida de Repuestos
              </h2>
              <span className="text-gray-600">
                Ver, crear o consultar las salidas correspondientes al almacén
                de repuestos
              </span>
            </div>
            <button
              onClick={() => setModalActive(true)}
              className="flex h-fit items-center gap-2 rounded-xl bg-[#1b4f72] px-8 py-3 font-bold text-[#ffffff] uppercase hover:cursor-pointer"
            >
              <PackageIcon size={24} />
              Nueva salida
            </button>
          </section>
          <section className="mt-10 hidden justify-between gap-4 rounded-2xl border border-gray-200 bg-[#ffffff] p-4 lg:flex">
            <div className="relative w-full">
              <input
                type="text"
                value={inputOutbound}
                onChange={(e) => setInputOutbound(e.target.value)}
                className="w-full rounded-xl bg-[#f2f4f5] px-13 py-3"
                placeholder="Buscar reportes de salida de repuestos de almacén..."
              />
              <div className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500">
                <SearchIcon size={20} />
              </div>
            </div>

            <button className="cursor-pointer rounded-xl bg-gray-200 px-4">
              <FilterSearch size={24} />
            </button>
          </section>
          <section className="mt-10 flex flex-col">
            <ul className="grid w-full grid-cols-7 justify-around rounded-lg bg-gray-100 py-5 text-center text-sm font-semibold text-[#0A3960] uppercase">
              <li>Fecha</li>
              <li>Ítem</li>
              <li>Cantidad</li>
              <li>Referencia</li>
              <li>Destino</li>
              <li>Colaborador</li>
              <li>Numero de salida</li>
            </ul>
            {outboundFilter.map((dato) => (
              <ul className="grid w-full grid-cols-7 py-5 text-center text-sm font-semibold">
                <li className="uppercase">{dato.fecha} </li>
                <li>{dato.item} </li>
                <li>{dato.cantidad} </li>
                <li>{dato.referencia} </li>
                <li>{dato.destino} </li>
                <li>{dato.colaborador} </li>
                <li>{dato.numero} </li>
              </ul>
            ))}
          </section>
        </div>
      </section>

      {isModalActive ? (
        <OutboundModal
          setModalActive={setModalActive}
          setRefresh={setRefresh}
        />
      ) : (
        ""
      )}
      {isModalActive && (
        <div className="pointer-events-none absolute inset-0 z-30 bg-black/20" />
      )}
    </section>
  );
}
