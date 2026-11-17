import { useNavigate } from "react-router-dom";
import UserCircleIcon from "../../../icons/userCircleIcon";
import AlertSquareIcon from "../../../icons/alertSquareIcon";
import AlertTriangleIcon from "../../../icons/alertTriangleIcon";
import { statusData } from "../../../utility/statusData";
import { formatDuration } from "../../../utility/formatDuration";

export default function OrderCardItem({ data }) {
  const navigate = useNavigate();
  const durationHours = data.completed_at
    ? (new Date(data.completed_at) - new Date(data.created_at)) /
      (1000 * 60 * 60)
    : null;

  const duration = formatDuration(durationHours);
  const currentStatus = statusData.find(
    (elemento) => elemento.id === data.status,
  );
  return (
    <article
      onClick={() => navigate(`/WorkOrders/Edit/${data.id}`)}
      className={`cursor-pointer items-center border-gray-100 bg-[#ffffff] text-[#191C1D] shadow-gray-300 hover:shadow-[0_0_10px_0_rgba(0,0,0,0.3)] ${data.priority === "Alta" && data.status !== "Completado" && data.status !== "Cancelado" ? "hover:text-red-700" : data.priority === "Urgente" ? "hover:text-[#E24B4A] " : "hover:text-[#0A3960]"} flex rounded-xl border hover:border-gray-300`}
    >
      <div className="flex flex-col justify-between w-full h-full gap-4 p-6 py-4">
        <header className="flex flex-col items-center justify-between lg:flex-row">
          <span className="rounded bg-[#f4f8f9] px-2 py-0.5 font-bold text-[#5c869e]">
            OT #{data.order_number}
          </span>
          <div className="flex gap-4">
            {data.priority === "Alta" && data.status !== "Completado" ? (
              <span
                className={`mt-2 flex items-center gap-1 rounded-full border border-[#F09595] bg-[#FCEBEB] px-2 py-0.5 text-xs text-[#791F1F] uppercase lg:mt-0`}
              >
                <AlertSquareIcon size={18} />
                prioritario
              </span>
            ) : data.priority === "Urgente" && data.status !== "Completado" ? (
              <span
                className={`mt-2 flex animate-[pulse_1s_cubic-bezier(0.4,0,0.6,1)_infinite] items-center gap-1 rounded-full border border-[#F09595] bg-[#E24B4A] px-2 py-0.5 text-xs text-[#ffffff] uppercase lg:mt-0`}
              >
                <AlertTriangleIcon size={18} />
                urgente
              </span>
            ) : (
              ""
            )}

            <span
              className={`mt-2 flex items-center gap-1 rounded-full bg-[#d7ecfb] px-2 py-0.5 text-xs text-[#4a6174] uppercase lg:mt-0 ${
                currentStatus
                  ? currentStatus.activeClass
                  : "bg-[#d7ecfb] text-[#4a6174]"
              }`}
            >
              {currentStatus ? currentStatus.icon : ""}
              {data.status}
            </span>
          </div>
        </header>
        <div className="flex flex-col gap-0.5">
          <h3 className="text-sm font-bold leading-tight lg:text-lg">
            {data.title}
          </h3>
          <p className="flex items-center gap-2 mt-2 text-sm text-gray-600 lg:text-base">
            {/* <AdjustmentCog size={20} /> */}
            <span>
              {data.area} - {data.description.slice(0, 350)}
            </span>
          </p>
        </div>
        {data.status === "Completado" ? (
          <div className="">
            <h3 className="font-semibold text-center text-gray-500">
              Completado en{" "}
              <span className="font-black text-[#0A3960]">{duration}</span> por
              Deyverson Herrera
            </h3>{" "}
          </div>
        ) : (
          <section className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-gray-800">
              <UserCircleIcon size={25} />
              <p className="font-semibold tracking-tight">Deyverson Herrera</p>
            </div>
            <div className="flex flex-col items-end">
              {/* <span className="text-sm text-gray-800 uppercase">
                        Desde
                      </span> */}
              <p className="font-semibold text-[#191C1D]">
                {new Date(data.created_at).toLocaleDateString("es-CO")}
              </p>
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
