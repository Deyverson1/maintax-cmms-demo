export const ALERT_STYLES = {
  overdue: "bg-red-600 border-red-800 text-white",
  today: "bg-orange-400 border-orange-700 text-orange-950",
  soon: "bg-amber-200 border-amber-500 text-amber-950",
  warning: "bg-yellow-100 border-yellow-400 text-yellow-900",
};

export const ordersAlerts = [
  { name: "Vencida", style: ALERT_STYLES.overdue },
  { name: "Vence hoy", style: ALERT_STYLES.today },
  { name: "Vence mañana", style: ALERT_STYLES.soon },
  { name: "Vence pronto", style: ALERT_STYLES.warning },
  {
    name: "Completado",
    style: "bg-emerald-50 border-emerald-400 text-emerald-800 opacity-80",
  },
];
