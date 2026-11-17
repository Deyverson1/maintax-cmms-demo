import { useState } from "react";
import { addDays, parseISO } from "date-fns";

export function useNoteForm(startDate) {
  //variables base de datos
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [days, setDays] = useState("");
  const [category, setCategory] = useState("pending");
  //calcular la fecha final de la tarea/orden de trabajo
  const starDateFormatted = parseISO(startDate);
  const daysFormatted = parseInt(days, 10);

  //se valida el valor de los días de la nota
  const validDays =
    Number.isNaN(daysFormatted) || daysFormatted < 1 ? 0 : daysFormatted;

  //almacena el valor de la fecha de terminación de la tarea/orden de trabajo
  const finalDate = addDays(starDateFormatted - 1, validDays);

  return {
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
  };
}
