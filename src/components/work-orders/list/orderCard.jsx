import { useFilteredWorkOrders } from "../../../hooks/useFilteredWorkOrders";
import OrderCardItem from "./OrderCardItem";
import PaginationControls from "../../common/PaginationControls";

export default function OrderCard({
  workOrders,
  searchText,
  statusFilter,
  timeFilter,
}) {
  //filtros para texto, estado, etc
  const { listaPaginada, currentPage, setCurrentPage, totalPages } =
    useFilteredWorkOrders(workOrders, searchText, statusFilter, 12, timeFilter);
  return (
    <main>
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {listaPaginada.map((data) => {
          return <OrderCardItem key={data.id} data={data} />;
        })}
      </section>
      <PaginationControls
        onPageChange={setCurrentPage}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </main>
  );
}
