import { useNavigate } from "react-router-dom";
import ChevronRightIcon from "../../icons/chevronRightIcon";
import HistoryIcon from "../../icons/historyIcon";
import MapPinIcon from "../../icons/mapPinIcon";
import { machineryStatus } from "../../utility/machineryStatus";

export default function AssetsCard() {
  //navegación
  const navigate = useNavigate();
  const assetsData = [
    {
      id: "S11",
      machineryImg: "/assets/E11.jpg",
      machineryStatus: "Operativo",
      machineryName: "Maquina Selladora S11",
      machineryArea: "Área de Selladoras",
      machineryEfficiency: "88.5%",
      machineryInactivity: "2 H",
      machineryRecentActivity: "Mantenimiento preventivo realizado",
    },
  ];

  return (
    <section className="grid grid-cols-4 gap-8">
      <section>
        {assetsData.map((data) => {
          const currentStatus = machineryStatus.find(
            (elemento) => elemento.id === data.machineryStatus,
          );
          return (
            <article
              key={data.id}
              onClick={() => navigate("/Assets/Profile")}
              className="group flex-1 cursor-pointer rounded-xl border border-white hover:border hover:border-gray-200 hover:shadow-[0_0_2px_rgba(0,0,0,0.1)]"
            >
              <div className="relative overflow-hidden rounded-t-xl">
                <img
                  src={data.machineryImg}
                  alt={`Imagen de la maquina ${data.machineryName}`}
                  className="object-cover w-full transition-transform duration-300 aspect-4/3 hover:scale-105"
                />
                <span className="absolute top-3 left-3 flex items-center rounded-full bg-blue-100 px-4 py-1.5 text-xs font-semibold text-blue-700 uppercase">
                  ID: {data.id}
                </span>
                <span
                  className={`absolute top-3 right-3 flex items-center rounded-full px-4 py-1.5 text-xs font-semibold uppercase ${
                    currentStatus
                      ? currentStatus.activeClass
                      : "bg-[#d7ecfb] text-[#4a6174]"
                  }`}
                >
                  {data.machineryStatus === "Operativo" ? (
                    <div className="relative flex items-center w-2 h-2 mr-3">
                      <div className="absolute inset-0 rounded-full animate-ping bg-emerald-500/30" />
                      <div className="relative h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                    </div>
                  ) : (
                    ""
                  )}
                  {data.machineryStatus}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-[#191C1D] group-hover:text-[#0A3960]">
                  {data.machineryName}
                </h3>
                <p className="flex items-center gap-2 font-normal text-gray-600">
                  {" "}
                  <MapPinIcon size={20} /> {data.machineryArea}
                </p>
                <div className="flex justify-between mt-6">
                  <p className="flex flex-col px-3 py-2 text-xs text-gray-700 uppercase bg-gray-200 rounded-md">
                    Eficiencia{" "}
                    <span className="mt-0.5 text-lg font-bold text-[#191C1D]">
                      {data.machineryEfficiency}
                    </span>
                  </p>
                  <p className="flex flex-col px-3 py-2 text-xs text-gray-700 uppercase bg-gray-200 rounded-md">
                    Inactividad{" "}
                    <span className="mt-0.5 text-lg font-bold text-[#191C1D]">
                      {data.machineryInactivity}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex items-center self-end justify-center gap-3 p-4 mt-10 text-gray-700 bg-gray-200 min-h-20 rounded-b-xl">
                <HistoryIcon size={24} />
                <p className="">{data.machineryRecentActivity} </p>
                <ChevronRightIcon size={30} />
              </div>
            </article>
          );
        })}
      </section>
    </section>
  );
}
