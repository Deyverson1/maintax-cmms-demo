import CircleCheckIcon from "../../icons/circleCheckIcon";
import ClockIcon from "../../icons/clockHour";
import DollarIcon from "../../icons/cashIcon";
import MoneyReportIcon from "../../icons/moneyReport";
import ToolIcon from "../../icons/toolIcon";
import CashIcon from "../../icons/cashIcon";

export default function AssetPerformance() {
  const iconSize = 40;
  const AssetPerformanceData = [
    {
      label: "Disponibilidad",
      labelValue: "40%",
      icon: <CircleCheckIcon size={iconSize} />,
      iconStyle: "text-green-300",
    },
    {
      label: "MTBF",
      labelValue: "120 H",
      icon: <ClockIcon size={iconSize} />,
      iconStyle: "text-[#7A93A8]",
    },
    {
      label: "MTTR",
      labelValue: "20 H",
      icon: <ToolIcon size={iconSize} />,
      iconStyle: "text-orange-300",
    },
    {
      label: "Costo de Mant.",
      labelValue: "$350.465",
      icon: <CashIcon size={iconSize} />,
      iconStyle: "text-gray-400",
    },
  ];
  return (
    <section>
      <h4 className="text-xl font-bold tracking-wider text-gray-700 uppercase">
        Métricas de rendimiento último mes
      </h4>
      <article className="flex gap-4 pt-6">
        {AssetPerformanceData.map((dato) => (
          <article
            key={dato.label}
            className="flex justify-between hover:shadow-[0_0_15px_rgba(0,0,0,0.08)] origin-bottom transition-transform duration-300 ease-out hover:scale-105  items-center gap-1.5 flex-1 px-5 py-6 bg-[#ffffff] border border-gray-200 rounded-lg"
          >
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold tracking-widest text-gray-800 uppercase">
                {dato.label}
              </p>
              <span className="text-[#0A3960] text-xl font-bold">
                {dato.labelValue}{" "}
              </span>
            </div>
            <span className={`${dato.iconStyle} `}>{dato.icon}</span>
          </article>
        ))}
      </article>
    </section>
  );
}
