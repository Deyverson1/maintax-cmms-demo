import DeviceFloppyIcon from "../../icons/deviceFloppyIcon";
import IconTrash from "../../icons/iconTrash";

export default function CalendarNoteFooter({
  handleNoteSave,
  handleClose,
  isEditing,
  handleNoteDelete,
}) {
  return (
    <footer className="flex items-center justify-around border-t border-gray-200 p-8">
      <button
        type="button"
        onClick={handleNoteDelete}
        className="flex w-fit cursor-pointer justify-start gap-2 rounded-md px-4 py-2 text-red-500 hover:bg-red-50"
      >
        <IconTrash size={20} /> Eliminar nota
      </button>
      <div className="flex justify-end">
        <button
          type="button"
          className="cursor-pointer px-4 py-2 text-gray-600"
          onClick={(e) => handleClose()}
        >
          Cancelar
        </button>

        <button
          type="button"
          onClick={handleNoteSave}
          className="flex cursor-pointer items-center gap-2 rounded-md bg-[#0A3960] px-4 py-2 font-bold whitespace-nowrap text-gray-100"
        >
          <DeviceFloppyIcon size={23} />
          {isEditing ? "Guardar Cambios" : "Guardar"}
        </button>
      </div>
    </footer>
  );
}
