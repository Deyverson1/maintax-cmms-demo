import { useParams } from "react-router-dom";
import ChevronDown from "../../../icons/chevronDown";
import ClipboardIcon from "../../../icons/clipboard";
import IconTrash from "../../../icons/iconTrash";
import ItemsList from "../../../icons/itemsList";
import SendIcon from "../../../icons/sendIcon";
import SelectorGroup from "../../common/SelectorGroup";
import OrderParameters from "./OrderParameters";
import OrderTypeSelector from "./OrderTypeSelector";
import { supabase } from "../../../utility/supabase";
import { useEffect, useState } from "react";

export default function GeneralInfo({
  orderType,
  setOrderType,
  priority,
  setPriority,
  title,
  setTitle,
  description,
  setDescription,
  deadline,
  setDeadline,
  area,
  setArea,
  status,
  setStatus,
  isEditing,
  handleDelete,
}) {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState("");
  const { id } = useParams();

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from("orders_events")
      .select("*")
      .eq("work_order_id", id)
      .order("created_at", { ascending: false });

    if (error) return console.error(error);
    setEvents(data);
  };

  useEffect(() => {
    fetchEvents();
  }, [id]);

  const handleEvent = async () => {
    if (!newEvent.trim()) return;

    await supabase.from("orders_events").insert({
      work_order_id: id,
      event_description: newEvent,
    });

    setNewEvent("");
    fetchEvents();
  };
  return (
    <section className="flex w-full flex-col gap-8 py-8 lg:flex-row">
      <section className="flex w-full flex-col gap-6 rounded-2xl bg-[#ffffff] px-4 shadow-[0_5px_50px_-15px_rgba(0,0,0,10)] shadow-gray-200 lg:w-[78%] lg:p-10">
        <section className="flex flex-col items-center justify-between gap-4 lg:flex-row lg:gap-0">
          <div className="flex items-center gap-2 text-[#0A3960]">
            <ItemsList size={26} />
            <h3 className="text-md font-semibold tracking-wider uppercase">
              Información General
            </h3>
          </div>
          {isEditing ? (
            <button
              onClick={handleDelete}
              className="flex cursor-pointer gap-2 rounded border border-red-500 px-4 py-1.5 text-red-500 uppercase transition-all duration-200 hover:bg-red-100"
            >
              <IconTrash size={24} />
              Eliminar
            </button>
          ) : (
            ""
          )}
        </section>

        <OrderTypeSelector orderType={orderType} setOrderType={setOrderType} />
        <div>
          <label htmlFor="WorkTitle">Título</label>
          <textarea
            name="WorkTitle"
            id="WorkTitle"
            lang="ES"
            rows={1}
            placeholder="Realizar cotización requerida en area de producción..."
            spellCheck={true}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 h-25 w-full resize-none overflow-hidden rounded-sm border border-gray-300 bg-[#F5F7F8] p-4 py-3 text-sm text-neutral-950 transition-all duration-300 focus:border-[#0A3960] focus:shadow-[0_0_5px_rgba(0,0,0,0.15)] focus:outline-none lg:h-auto lg:text-base"
          ></textarea>
        </div>
        <div>
          <label htmlFor="WorkDescription">Descripción</label>
          <textarea
            name="WorkDescription"
            id="WorkDescription"
            lang="ES"
            placeholder="Realizar cotización requerida en area de producción..."
            spellCheck={true}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-2 field-sizing-content min-h-35 w-full resize-none overflow-hidden rounded-sm border border-gray-300 bg-[#F5F7F8] p-4 py-3 text-sm text-neutral-950 transition-all duration-300 focus:border-[#0A3960] focus:shadow-[0_0_5px_rgba(0,0,0,0.15)] focus:outline-none lg:text-base"
          ></textarea>
        </div>
        <div className="w-full">
          {events.length === 0 ? (
            " "
          ) : (
            <h4 className="mt-4 mb-6 font-bold text-[#0A3960] uppercase">
              Historial de Eventos o avances
            </h4>
          )}
          {events.map((data) => (
            <div className="relative flex w-full justify-between gap-4 px-8">
              <div className="absolute left-4.5 z-10 rounded-full border-2 border-[#0A3960] bg-white p-4">
                <ClipboardIcon size={24} />
              </div>
              <div className="ml-4 w-[90%] border-l-2 border-gray-400 pb-5 pl-12">
                <h3 className="text-lg font-semibold text-[#191C1D]">Nota</h3>
                <p className="mb-1 text-gray-600">{data.event_description} </p>
                <span className="text-sm font-bold text-[#0A3960] uppercase">
                  Registrado por Deyverson H.
                </span>
                <div className="pt-4 text-sm md:hidden">
                  <p> {new Date(data.created_at).toLocaleString("es-CO")} </p>
                </div>
              </div>
              <div className="hidden w-[12%] text-sm md:block">
                <p> {new Date(data.created_at).toLocaleString("es-CO")} </p>
              </div>
            </div>
          ))}
        </div>
        {isEditing ? (
          <div className="relative mt-2">
            <label
              htmlFor="newEvent"
              className="font-bold text-[#0A3960] uppercase"
            >
              Registrar Nuevo Evento
            </label>
            <textarea
              name="newEvent"
              id="newEvent"
              rows={1}
              value={newEvent}
              placeholder="Ej. Cambios en la requisición por parte del proveedor..."
              onChange={(e) => setNewEvent(e.target.value)}
              className="mt-2 w-[94%] resize-none overflow-hidden rounded-sm border border-gray-300 bg-[#F5F7F8] p-4 py-3 text-neutral-950 transition-all duration-300 focus:border-[#0A3960] focus:shadow-[0_0_5px_rgba(0,0,0,0.15)] focus:outline-none"
            ></textarea>
            <button
              type="button"
              onClick={handleEvent}
              className="absolute top-8 right-0 rounded-r-sm border border-gray-300 bg-gray-200 p-4 py-2.75 hover:cursor-pointer"
            >
              <SendIcon size={26} />
            </button>
          </div>
        ) : (
          ""
        )}
      </section>
      <OrderParameters
        priority={priority}
        setPriority={setPriority}
        deadline={deadline}
        setDeadline={setDeadline}
        area={area}
        setArea={setArea}
        status={status}
        setStatus={setStatus}
        isEditing={isEditing}
      />
    </section>
  );
}
