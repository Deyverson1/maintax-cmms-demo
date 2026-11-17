import { useState } from "react";
import { sortCards } from "../utility/sortCards";

export function useFilteredWorkOrders(workOrders, searchText, statusFilter, itemsPerPage, timeFilter) {
  //filtros para búsquedas
  const listaFiltrada = workOrders.filter((item) => {
    const matchesText = item.title
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchesStatus =
      statusFilter === "Todos" || item.status === statusFilter;

    return matchesText && matchesStatus;
  });
  //filtar por recientes
  const sorted = timeFilter
    ? sortCards(listaFiltrada)
    : [...listaFiltrada].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
  //paginado
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const listaPaginada = sorted.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(listaFiltrada.length / itemsPerPage);

  //devolvemos los valores
  return { listaPaginada, currentPage, setCurrentPage, totalPages };
}
