import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import { addDays, parseISO, format } from "date-fns";
import { getAlertLevel } from "../utility/alerts";
import SidebarNavigation from "../components/ui/SidebarNavigation";
import { supabase } from "../utility/supabase";
import { use, useEffect, useState } from "react";
import GeneralHeader from "../components/general-header/GeneralHeader";
import "./Calendar.css";
import { useNavigate } from "react-router-dom";
import CalendarNoteModal from "../components/calendar/CalendarNoteModal";
import { categoriesOptions } from "../constants/noteCategories";
import { ALERT_STYLES, ordersAlerts } from "../constants/calendarAlertStyles";

export default function Calendar() {
  //fetch principal de las ordenes
  const [orders, setOrders] = useState([]);
  const [notes, setNotes] = useState([]);
  // const [selected, setSelected] = useState(null);
  const [showNotes, setShowNotes] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [isEditing, setEditing] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [idNoteEditing, setIdNoteEditing] = useState(null);
  const navigate = useNavigate();

  const priorityWeight = { Alta: 0, Media: 1, Baja: 2 };
  useEffect(() => {
    supabase
      .from("work-orders")
      .select("*")
      .then(({ data, error }) => {
        if (error) return console.error(error);
        setOrders(data);
      });
  }, [refresh]);

  useEffect(() => {
    supabase
      .from("notes")
      .select("*")
      .then(({ data, error }) => {
        if (error) return console.error(error);
        setNotes(data);
      });
  }, [refresh]);

  const noteEvents = notes.map((n) => ({
    id: `${n.id}`,
    title: n.title,
    start: n.start_date,
    end: n.final_date,
    allDay: true,
    extendedProps: {
      type: "note",
      item: { ...n, status: n.completed_at ? "done" : "active" },
    },
  }));

  const events = orders
    .filter((ot) => ot.deadline)
    .map((ot) => {
      const start = format(new Date(ot.created_at), "yyyy-MM-dd");
      const end = ot.deadline;

      return {
        id: ot.id,
        title: ot.title ?? `OT-${ot.order_number}`,
        start: start <= end ? start : end,
        end: format(addDays(parseISO(end), 1), "yyyy-MM-dd"),
        allDay: true,
        extendedProps: {
          type: "order",
          item: {
            ...ot,
            end,
            status:
              ot.completed_at || ot.status === "completed" ? "done" : "active",
          },
        },
      };
    });

  const allEvents = [...events, ...noteEvents];
  return (
    <section className="flex">
      <SidebarNavigation isModalActive={showNotes} />
      {showNotes ? (
        <CalendarNoteModal
          isEditing={isEditing}
          setShowNotes={setShowNotes}
          showNotes={showNotes}
          startDate={startDate}
          setStartDate={setStartDate}
          idNoteEditing={idNoteEditing}
          setIdNoteEditing={setIdNoteEditing}
          setEditing={setEditing}
          setRefresh={setRefresh}
          refresh={refresh}
        />
      ) : (
        ""
      )}
      <section className="w-full px-4 lg:w-[80%] lg:px-12">
        <GeneralHeader />
        <div className="maintax-calendar w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <FullCalendar
            initialView="dayGridWeek"
            dateClick={(info) => {
              setStartDate(info.dateStr);
              setShowNotes(!showNotes);
            }}
            plugins={[dayGridPlugin, listPlugin, interactionPlugin]}

            eventOrder={(a, b) => {
              const A = a.extendedProps.item;
              const B = b.extendedProps.item;

              // completados al final
              const aDone = A.status === "done";
              const bDone = B.status === "done";
              if (aDone !== bDone) return aDone ? 1 : -1;

              // mayor prioridad primero
              const pa = priorityWeight[A.priority] ?? 3;
              const pb = priorityWeight[B.priority] ?? 3;
              if (pa !== pb) return pa - pb;

              // deadline más próximo primero
              if (A.deadline !== B.deadline)
                return A.deadline < B.deadline ? -1 : 1;

              // desempate estable
              return A.order_number - B.order_number;
            }}
            locale={esLocale}
            firstDay={1}
            height="auto"
            expandRows={false}
            fixedWeekCount={false}

            dayMaxEvents={3}
            views={{
              dayGridMonth: { dayMaxEvents: 3 },
              dayGridWeek: { dayMaxEvents: false },
            }}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,dayGridWeek,listMonth",
            }}
            buttonText={{
              today: "Hoy",
              month: "Mes",
              week: "Semana",
              list: "Lista",
            }}
            moreLinkContent={(arg) => `+${arg.num} más`}
            events={allEvents}

            eventContent={renderEvent}
            eventClick={(info) => {
              const { type, item } = info.event.extendedProps;
              if (type === "note") {
                setEditing(true);
                setShowNotes(true);
                setIdNoteEditing(info.event.id);
              } else navigate(`/WorkOrders/Edit/${info.event.id}`);
            }}
          />
        </div>
        <div className="jus flex flex-col gap-2 py-10">
          <h5 className="font-mono uppercase">Código de colores:</h5>
          <ul className="flex gap-2">
            {categoriesOptions.map((dato) => (
              <li
                key={dato.value}
                className={`${dato.eventStyle} rounded-lg border px-4 py-0.5`}
              >
                {dato.name}{" "}
              </li>
            ))}
            {ordersAlerts.map((dato) => (
              <li
                key={dato.name}
                className={`${dato.style} rounded-lg border px-4 py-0.5`}
              >
                {dato.name}{" "}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </section>
  );
}

function renderEvent({ event, view }) {
  // const isMonth = view.type === "dayGridMonth";
  const { type, item } = event.extendedProps;
  const isDone = item.status === "done";
  const alert = isDone || type === "note" ? null : getAlertLevel(item);

  let style;
  if (isDone) {
    style = "bg-emerald-50 border-emerald-400 text-emerald-800 opacity-80";
  } else if (type === "note") {
    style =
      categoriesOptions.find((c) => c.value === item.category)?.eventStyle ??
      "bg-stone-100 border-stone-500 text-stone-900";
  } else {
    style = alert
      ? ALERT_STYLES[alert.level]
      : "bg-violet-100 border-violet-600 text-violet-900";
  }
  return (
    <div
      className={`line-clamp-3 w-full rounded-md border border-l-4 px-2 py-1 text-xs leading-snug font-medium break-words whitespace-normal ${style}`}
    >
      {alert && <span className="mr-1 font-semibold">{alert.label} ·</span>}
      {event.title}
    </div>
  );
}
