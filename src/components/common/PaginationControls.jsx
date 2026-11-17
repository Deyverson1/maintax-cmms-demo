export default function PaginationControls({
  totalPages,
  currentPage,
  onPageChange,
}) {
  return (
    <div className="flex justify-end gap-2 py-2 mt-4">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="text-[#0A3960] font-bold  hover:underline hover:cursor-pointer"
      >
        Anterior
      </button>
      <span className="italic">
        Página {currentPage} de {totalPages}
      </span>
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="text-[#0A3960] font-bold hover:underline hover:cursor-pointer"
      >
        Siguiente
      </button>
    </div>
  );
}
