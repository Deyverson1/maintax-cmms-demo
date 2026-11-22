import { useEffect, useState } from "react";
import { supabase } from "../../utility/supabase";
import { priority } from "../../utility/priority";
import { Link, useNavigate } from "react-router-dom";
import PlusIconAlone from "../../icons/plusIconAlone";
import { formatDate } from "../../utility/formatDate";

export default function AssetPendingTask() {
  //almacenamiento de los datos del fetch
  const [assetTask, setAssetTask] = useState([]);
  //navegación
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAssetTask = async () => {
      const { data, error } = await supabase
        .from("work-orders")
        .select("*")
        .eq("area", "Selladora S1")
        .neq("status", "Completado");

      if (error) {
        console.error("Error:", error);
      } else {
        setAssetTask(data);
      }
    };

    fetchAssetTask();
  }, []);

  return (
    <section className="w-[50%] py-15">
      <div className="flex items-center justify-between">
        <h4 className="text-xl font-bold tracking-wider text-gray-700 uppercase">
          tareas pendientes
        </h4>
        <Link to={"/WorkOrders/Create"}>
          <button className="text-md flex items-center gap-2 rounded-full bg-[#0A3960] p-1 font-semibold text-[#ffffff] uppercase hover:cursor-pointer">
            <PlusIconAlone size={20} />
          </button>
        </Link>
      </div>
      <section className="flex gap-6">
        <div className="w-full">
          {assetTask.map((dato, index) => {
            // console.log(dato.deadline);
            const currentStatus = priority.find(
              (elemento) => elemento.id === dato.priority,
            );
            return (
              <article
                key={index}
                onClick={() => navigate(`/WorkOrders/Edit/${dato.id}`)}
                className={`mt-6 flex origin-bottom flex-col gap-1 rounded-xl border border-l-5 border-gray-200 bg-[#ffffff] p-5 transition-transform duration-300 ease-out hover:scale-101 hover:cursor-pointer hover:shadow-[0_0_15px_rgba(0,0,0,0.08)] ${currentStatus ? currentStatus.activeClass : ""} `}
              >
                <header className="flex items-center justify-between">
                  <h3 className="text-lg font-bold">{dato.title}</h3>
                  <span
                    className={`rounded-sm px-3 py-0.5 text-[14px] font-bold uppercase ${currentStatus ? currentStatus.button : ""}`}
                  >
                    {dato.priority}
                  </span>
                </header>
                <p className="min-h-12 text-gray-700">
                  Programación:{" "}
                  <span className="font-medium text-gray-700">
                    {formatDate(dato.deadline)}
                  </span>
                </p>
                <footer className="flex items-center justify-between pt-4 text-[14px]">
                  <span className="font-semibold text-gray-700 uppercase">
                    Planeador: Deyverson
                  </span>
                  <span className="font-bold text-[#0A3960]">
                    ${dato.cost} COP{" "}
                  </span>
                </footer>
              </article>
            );
          })}
        </div>
      </section>
    </section>
  );
}
