import { categoriesOptions } from "../../constants/noteCategories";
import { formatDate } from "../../utility/formatDate";

import CalendarCheckIcon from "../../icons/calendarCheckIcon";
export default function CalendarNoteForm({
  title,
  setTitle,
  description,
  setDescription,
  startDate,
  setStartDate,
  days,
  setDays,
  category,
  setCategory,
  finalDate,
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleNoteSave();
      }}
    >
      <main className="flex flex-col gap-6 p-8">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="noteTitle"
            className="text-sm font-semibold tracking-wider text-gray-800 uppercase"
          >
            Título
          </label>
          <input
            required
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="noteTitle"
            placeholder="Ej. Revisión técnica de rodillos laminadores "
            className="rounded-lg border border-gray-200 p-4 outline-[#0A3960]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="noteDescription"
            className="text-sm font-semibold tracking-wider text-gray-800 uppercase"
          >
            Descripción
          </label>
          <textarea
            name="noteDescription"
            id="noteDescription"
            type="text"
            lang="ES"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            spellCheck="true"
            placeholder="Ej. Revisión de diámetro externo y programación de pedido para realizar el envió para servicio de rectificado..."
            className="field-sizing-content min-h-30 resize-none rounded-lg border border-gray-200 p-4 outline-[#0A3960]"
          />
        </div>
        <div className="flex justify-between gap-2">
          <div className="flex w-[50%] flex-col gap-2">
            <label
              htmlFor="starDate"
              className="text-sm font-semibold tracking-wider text-gray-800 uppercase"
            >
              Fecha de inicio
            </label>
            <input
              type="date"
              value={startDate}
              id="startDate"
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="Ej. Revision técnica de rodillos laminadores "
              className="w-full rounded-lg border border-gray-200 p-4 outline-[#0A3960]"
            />
          </div>
          <div className="flex w-[50%] flex-col gap-2">
            <label
              htmlFor="endDate"
              className="text-sm font-semibold tracking-wider text-gray-800 uppercase"
            >
              Días (Min. 1)
            </label>
            <div className="relative">
              <input
                type="number"
                name="days"
                id="days"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                placeholder="1"
                className="w-full rounded-lg border border-gray-200 p-4"
              />
              <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-gray-400">
                días
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-md border border-gray-200 bg-gray-200/30 px-3 py-1 text-[#0A3960]">
          <CalendarCheckIcon size={20} />
          <p className="text-gray-600">
            Termina el
            <span className="font-bold text-gray-800">
              {" "}
              {formatDate(finalDate)}
            </span>
          </p>
        </div>
        <fieldset>
          <legend className="mb-3 text-sm font-semibold tracking-wider text-gray-800 uppercase">
            Categoría
          </legend>
          <div className="grid grid-cols-2 gap-2">
            {categoriesOptions.map((dato) => (
              <button
                key={dato.name}
                type="button"

                onClick={() => setCategory(dato.value)}
                className={`${dato.buttonStyle} flex cursor-pointer items-center gap-2 rounded-lg border px-6 py-2 text-left ${dato.value === category ? "ring-2" : ""}`}
              >
                <span
                  className={`size-2 shrink-0 ${dato.dotStyle} rounded-full`}
                  aria-hidden="true"
                />
                {dato.name}
              </button>
            ))}
          </div>
        </fieldset>
      </main>
    </form>
  );
}
