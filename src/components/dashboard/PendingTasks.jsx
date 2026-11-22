import { Link, useNavigate } from "react-router-dom";
import ClipboardIcon from "../../icons/clipboard";
import { useActiveWorkOrders } from "../../utility/useActiveWorkOrders";
import { sortCards } from "../../utility/sortCards";
import { statusData } from "../../utility/statusData";
import { usePriorityOrders } from "../../utility/usePriorityOrders";
import HourGlassIcon from "../../icons/hourGlassIcon";
import ClockIcon from "../../icons/clockHour";

export default function PendingTasks() {
  //ordenes prioritarias
  const { priorityOrders } = usePriorityOrders();
  const priorityAmount = priorityOrders?.length ?? 0;
  //ordenes de trabajo activas
  const { activeWorkOrders } = useActiveWorkOrders();
  //ordenar las ordenes de trabajo con la función sortCards para que las ordenes de trabajo con mayor prioridad aparezcan primero
  const WorkOrdersPending = sortCards(activeWorkOrders);

  const navigate = useNavigate();

  function getTiempoRestanteTexto(deadlineStr) {
    if (!deadlineStr) return "";

    const deadline = new Date(`${deadlineStr}T23:59:00-05:00`).getTime();
    if (isNaN(deadline)) return "";

    const timeLeft = deadline - Date.now();

    const vencido = timeLeft < 0;
    const absMs = Math.abs(timeLeft);

    const dias = Math.floor(absMs / (1000 * 60 * 60 * 24));
    const horas = Math.floor(
      (absMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutos = Math.floor((absMs % (1000 * 60 * 60)) / (1000 * 60));

    const partes = [];
    if (dias > 0) partes.push(`${dias}d`);
    if (horas > 0) partes.push(`${horas}h`);

    const texto = partes.join(" ");
    return vencido ? `Retraso ${texto}` : `Faltan ${texto}`;
  }
  return (
    <main className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="items flex text-xl font-bold text-[#0A3960]">
          Tareas Pendientes
          <span className="10s ml-4 animate-pulse rounded-full bg-red-500 px-4 py-1 text-sm text-white uppercase [animation-duration:2s]">
            {priorityAmount} Urgentes
          </span>
          {/* <span className="ml-4 px-3 py-1.5 rounded-3xl text-sm bg-[#0A3960] text-white bg-">
            5 Prioridades
          </span> */}
        </h2>
        <Link
          to={"/WorkOrders"}
          className="text-lg font-bold text-[#0A3960] underline"
        >
          Ver todas las tareas
        </Link>
      </div>
      <section className="flex flex-1 flex-col gap-4">
        {WorkOrdersPending.slice(0, 5).map((data) => {
          const timeLeft = getTiempoRestanteTexto(data.deadline);
          const workOrderDescription =
            data.description.length > 175
              ? `${data.description.slice(0, 174).trimEnd()}...`
              : data.description;
          const currentStatus = statusData.find(
            (elemento) => elemento.id === data.status,
          );
          // console.log("currentStatus", currentStatus);
          return (
            <article
              onClick={() => navigate(`/WorkOrders/Edit/${data.id}`)}
              key={data.id}
              className="flex min-h-38 flex-1 items-center justify-between gap-8 rounded-2xl border border-white bg-[#ffffff] px-8 py-4 shadow-[0_5px_50px_-15px_rgba(0,0,0,0.3)] shadow-gray-200 hover:cursor-pointer hover:border-[#0A3960]"
            >
              <section className="flex items-center justify-between gap-6">
                <div className="flex items-center justify-center self-center rounded-lg bg-gray-100 p-4 text-[#0A3960]">
                  <ClipboardIcon size={30} />
                </div>
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center">
                    <h4 className="text-medium gray-500 text-sm tracking-wider">
                      Orden de trabajo #{data.order_number} •
                    </h4>
                    <h4 className="text-lg font-bold tracking-wide text-[#0A3960]">
                      {/* {data.title} -{" "} */}
                      <span
                        className={`flex w-fit items-center gap-1 rounded-full border-0 px-1 text-sm lg:mt-0 ${
                          currentStatus ? currentStatus.activeClass : ""
                        } bg-white!`}
                      >
                        {data.status}
                      </span>
                    </h4>
                  </div>
                  <h3 className="text-xl font-bold text-[#191C1D]">
                    {data.title}
                  </h3>
                  <p className="line-clamp-3 text-gray-500">
                    {workOrderDescription}
                  </p>
                </div>
              </section>
              <div
                className={`flex max-w-2/12 min-w-2/12 items-center justify-center gap-0.5 text-center text-sm ${timeLeft.includes("Retraso") ? "text-red-700" : "text-[#0A3960]"}`}
              >
                <span>
                  {" "}
                  <ClockIcon size={16} />{" "}
                </span>
                <h4 className="line-clamp-1 font-semibold">{timeLeft}</h4>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}
