export function sortCards(cards) {
  //filtrar los datos
  if (!cards || cards.length === 0) return [];

  const completed = cards.filter((c) => c.status === "Completado");
  const urgent = cards.filter(
    (c) => c.priority === "Urgente" && c.status !== "Completado",
  );
  const priority = cards.filter(
    (c) =>
      c.priority === "Alta" &&
      c.status !== "Completado" &&
      c.status !== "Cancelado",
  );
  const canceled = cards.filter((c) => c.status === "Cancelado");
  const pending = cards.filter(
    (c) =>
      c.status === "Pendiente" &&
      c.priority !== "Urgente" &&
      c.priority !== "Alta",
  );
  const others = cards.filter(
    (c) =>
      c.status !== "Completado" &&
      c.status !== "Cancelado" &&
      c.priority !== "Urgente" &&
      c.priority !== "Alta" &&
      c.status !== "Pendiente",
  );

  const byCreatedDesc = (a, b) =>
    new Date(b.created_at) - new Date(a.created_at);
  const byCompletedDesc = (a, b) =>
    new Date(b.completed_at) - new Date(a.completed_at);

  return [
    ...urgent.sort(byCreatedDesc),
    ...priority.sort(byCreatedDesc),
    ...pending.sort(byCreatedDesc),
    ...others.sort(byCreatedDesc),
    ...completed.sort(byCompletedDesc),
    ...canceled.sort(byCreatedDesc),
  ];
}