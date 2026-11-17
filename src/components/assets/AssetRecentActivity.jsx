import { use, useEffect, useEffectEvent, useState } from "react";
import CheckIcon from "../../icons/checkIcon";
import { supabase } from "../../utility/supabase";
import { formatDate } from "../../utility/formatDate";

export default function AssetRecentActivity() {
  const [assetRecentActivity, setAssetRecentActivity] = useState([]);
  useEffect(() => {
    const fetchAssetRecentActivity = async () => {
      const { data, error } = await supabase
        .from("work-orders")
        .select("*")
        .eq("area", "Selladora S1")
        .eq("status", "Completado")
        .order("completed_at", { ascending: false });

      if (error) {
        console.error("Error:", error);
      } else {
        setAssetRecentActivity(data);
      }
    };

    fetchAssetRecentActivity();
  }, []);

  return (
    <section className="w-[full] rounded-xl border border-gray-200 bg-[#ffffff] p-8">
      <h4 className="text-xl font-bold tracking-wider text-gray-700 uppercase">
        Actividad reciente
      </h4>
      <section className="relative flex">
        <div className="absolute top-10 bottom-0 left-4.25 w-px bg-gray-200"></div>
        <main className="flex flex-col">
          {assetRecentActivity.map((dato, index) => (
            <article key={index} className="mt-8 flex gap-4">
              <div className="z-10 h-fit w-fit rounded-full bg-green-100 p-2 text-green-500">
                <CheckIcon size={20} />
              </div>
              <div className="">
                <h4 className="text-lg font-semibold text-[#0A3960]">
                  Tarea completada
                </h4>
                <p className="pt-1 pb-3 text-gray-800">{dato.title}</p>
                <span className="text-gray-600">
                  {formatDate(dato.completed_at)}{" "}
                </span>
              </div>
            </article>
          ))}
        </main>
      </section>
    </section>
  );
}
