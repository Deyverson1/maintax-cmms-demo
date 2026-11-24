import ClipboardIcon from "../../icons/clipboard";
import MoneyReportIcon from "../../icons/moneyReport";
import ReloadIcon from "../../icons/reloadIcon";
import { useKpis } from "../../hooks/useKpis";
import { useEffect, useState } from "react";
import { supabase } from "../../utility/supabase";
import { useActiveWorkOrders } from "../../utility/useActiveWorkOrders";
import CashIcon from "../../icons/cashIcon";

export default function KpiCards() {
  const [refresh, setRefresh] = useState(0);
  //KPIS para datos rápidos
  const { kpiData } = useKpis(refresh);
  //ordenes de trabajo activas
  const { activeWorkOrders } = useActiveWorkOrders();
  const activeWorkOrdersAmount = activeWorkOrders.length;

  const KpiContent = [
    {
      description: "Ordenes de trabajo activas",
      amount: activeWorkOrdersAmount,
      icon: <ClipboardIcon size={30} />,
    },
    {
      description: "Requisiciones pendientes",
      amount: kpiData.active,
      icon: <MoneyReportIcon size={30} />,
    },
    {
      description: "Gasto Mensual",
      amount: kpiData.monthlySpendFinal,
      icon: <CashIcon size={30} />,
    },
    // {
    //   description: "Tiempo improductivo",
    //   amount: "10",
    //   icon: <ReloadIcon size={30} />,
    // },
    // {
    //   description: "Tiempo improductivo",
    //   amount: "10",
    //   icon: <ReloadIcon size={30} />,
    // },
  ];

  return (
    <section className="mt-5 flex flex-wrap gap-4 lg:mt-0 lg:flex-row lg:gap-8">
      {KpiContent.map((data, index) => (
        <section
          key={index}
          className="flex-1 rounded-xl bg-[#ffffff] p-4 text-lg shadow-[0_5px_50px_-15px_rgba(0,0,0,0.3)] shadow-gray-200 lg:p-8"
        >
          <div className="mb-6 flex w-auto justify-between">
            <div className="rounded bg-gray-200 p-2 text-[#0A3960]">
              {data.icon}
            </div>
            {/* <span className="text-sm inline-block py-1 px-3 rounded-full self-start font-semibold text-[#059669] bg-[#D4EFDF]">
              {" "}
              +2 esta semana
            </span>{" "} */}
          </div>
          <h3 className="text-lg font-black text-[#0A3960] md:text-2xl">
            {data.amount}
          </h3>
          <p className="tracking- font-mono text-xs text-[#546371] uppercase md:text-base">
            {data.description}
          </p>
        </section>
      ))}
    </section>
  );
}
