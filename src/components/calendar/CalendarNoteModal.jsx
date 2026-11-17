import { createNote } from "../../services/noteService";
import { useNoteForm } from "../../hooks/useNoteForm";
import CalendarIcon from "../../icons/calendarIcon";
import XIcon from "../../icons/xIcon";
import CalendarNoteForm from "./CalendarNoteForm";
import CalendarNoteFooter from "./CalendarNoteFooter";
import { useEffect, useState } from "react";
import { supabase } from "../../utility/supabase";
import CircleCheckIcon from "../../icons/circleCheckIcon";
import DotsCircleIcon from "../../icons/dotsCircleIcon";
import { set } from "date-fns";
import { FaTrash } from "react-icons/fa";
import IconTrash from "../../icons/iconTrash";

export default function CalendarNoteModal({
  setShowNotes,
  showNotes,
  startDate,
  setStartDate,
  isEditing,
  idNoteEditing,
  setIdNoteEditing,
  setEditing,
  setRefresh,
  refresh,
}) {
  //logic custom hook
  const {
    title,
    setTitle,
    description,
    setDescription,
    days,
    setDays,
    category,
    setCategory,
    finalDate,
    validDays,
  } = useNoteForm(startDate);

  const [noteCompleted, setNoteCompleted] = useState(false);
  const [originalCompletedAt, setOriginalCompletedAt] = useState(null);
  //verificar el estado del completed_at
  const completedAt = noteCompleted
    ? (originalCompletedAt ?? new Date().toISOString())
    : null;
  // manejo del insert
  const handleNoteSave = async () => {
    if (idNoteEditing) {
      const { error } = await supabase
        .from("notes")
        .update({
          title,
          description,
          start_date: startDate,
          days: validDays,
          final_date: finalDate,
          category,
          completed_at: completedAt,
        })
        .eq("id", idNoteEditing);

      if (error) return console.error("Error al actualizar", error);
    } else {
      try {
        await createNote({
          title,
          description,
          startDate,
          days: validDays,
          finalDate,
          category,
        });
      } catch (error) {
        return console.error("Error al guardar:", error.message);
      }
    }

    setRefresh((r) => r + 1);
    setShowNotes(false);
  };

  //manejo del edit
  useEffect(() => {
    const fetchNote = async () => {
      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .eq("id", idNoteEditing)
        .single();

      if (!error) {
        // console.log(data);
        setTitle(data.title);
        setDescription(data.description);
        setDays(data.days);
        setStartDate(data.start_date);
        setCategory(data.category);
        setNoteCompleted(!!data.completed_at);
        setOriginalCompletedAt(data.completed_at);
      } else return console.log(error);
    };
    fetchNote();
  }, [idNoteEditing]);
  //manejar el delete
  const handleNoteDelete = async () => {
    const { error } = await supabase
      .from("notes")
      .delete()
      .eq("id", idNoteEditing);

    if (error)
      return console.log("Error al eliminar la nota seleccionada", error);
    setRefresh((r) => r + 1);
    setShowNotes(false);
  };

  //manejar evento de cerrar el modal
  const handleClose = () => {
    setShowNotes(!showNotes);
    setIdNoteEditing(null);
    setEditing(false);
  };

  return (
    <div className="absolute inset-0 z-50 flex w-full justify-center bg-black/40 pt-4 backdrop-blur-sm">
      <section className="h-fit max-w-[30%] min-w-[30%] rounded-3xl bg-white">
        <header className="flex items-center justify-between border-b border-gray-200 p-8">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-[#0A3960]/15 p-2 text-[#0A3960]">
              <CalendarIcon size={25} aria-hidden="true" />
            </div>
            <div>
              <h2 className="pb-0 text-xl font-bold">Nueva nota</h2>
              <p className="-mt-0.5 text-base text-gray-500">
                Anotación rápida para el calendario
              </p>
            </div>
          </div>
          <button
            aria-label="Cerrar"
            type="button"
            className="rounded-lg p-2 text-gray-500 hover:cursor-pointer hover:bg-[#0A3960]/10 hover:text-[#0A3960]"
            onClick={(e) => handleClose()}
          >
            <XIcon size={25} arial-hidden="true" />
          </button>
        </header>
        {isEditing ? (
          <div className="flex flex-col gap-2 p-8 pb-0">
            <p className="text-sm font-semibold tracking-wide text-gray-800 uppercase">
              Estado de la nota
            </p>
            <div className="flex justify-around gap-1.5 rounded-lg border border-gray-300 bg-gray-100/50 p-1.5">
              <button
                type="button"
                onClick={() => setNoteCompleted(false)}
                className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg py-2 ${noteCompleted ? "text-gray-100 hover:bg-slate-100" : "border border-gray-200 bg-white text-white"}`}
              >
                <DotsCircleIcon
                  size={21}
                  fill={noteCompleted ? "#94A3B8" : "#F59E0B"}
                />
                <span
                  className={`${noteCompleted ? " text-gray-500" : "font-semibold text-neutral-950"}`}
                >
                  No completada
                </span>
              </button>
              <button
                type="button"
                onClick={() => setNoteCompleted(true)}
                className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg py-2 ${noteCompleted ? "border border-emerald-500 bg-emerald-500 text-white" : "border-gray-200 bg-gray-100 text-gray-500 hover:bg-emerald-50 hover:text-emerald-700"}`}
              >
                <CircleCheckIcon size={21} />
                <span
                  className={`${noteCompleted ? "font-semibold text-white" : " text-gray-500"}`}
                >
                  Completada
                </span>
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
        <CalendarNoteForm
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          startDate={startDate}
          setStartDate={setStartDate}
          days={days}
          setDays={setDays}
          category={category}
          setCategory={setCategory}
          finalDate={finalDate}
        />
        <CalendarNoteFooter
          isEditing={isEditing}
          handleNoteSave={handleNoteSave}
          handleClose={handleClose}
          handleNoteDelete={handleNoteDelete}
        />
      </section>
    </div>
  );
}
