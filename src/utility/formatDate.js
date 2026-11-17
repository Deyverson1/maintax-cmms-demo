import { format, parseISO, isValid } from "date-fns";
import { es } from "date-fns/locale";

export function formatDate(date) {
  const parsed = typeof date === "string" ? parseISO(date) : date;

  return isValid(parsed)
    ? format(parsed, "dd 'de' MMMM',' yyyy", { locale: es })
    : "—";
}
