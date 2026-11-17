import { differenceInCalendarDays, parseISO } from "date-fns";

export function getAlertLevel(item, now = new Date()) {
  if (item.status === "done" || item.status === "cancelled" || !item.end)
    return null;

  const days = differenceInCalendarDays(parseISO(item.end), now);

  if (days < 0) return { level: "overdue", label: `Vencida hace ${-days} d` };
  if (days === 0) return { level: "today", label: "Vence hoy" };
  if (days === 1) return { level: "soon", label: "Vence mañana" };
  if (days <= 3) return { level: "warning", label: `Vence en ${days} días` };
  return null;
}
