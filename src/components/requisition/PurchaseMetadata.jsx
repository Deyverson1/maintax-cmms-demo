import DetailsIcon from "../../icons/detailsIcon";

export default function PurchaseMetadata({ formData, handleChange }) {
  return (
    <section className="p-4 py-6 m-4 border border-gray-300 lg:p-10 rounded-xl">
      <div className="flex gap-1 items-center text-[#1B4F72]">
        <DetailsIcon size={20} />
        <h2 className="text-sm font-semibold uppercase ">
          Detalles de la Requisición
        </h2>
      </div>
      <main className="flex flex-col gap-6">
        <div className="flex flex-col gap-1 mt-4 text-[#41474E]">
          <label
            htmlFor="priority"
            className="text-xs font-semibold tracking-tighter uppercase "
          >
            Prioridad
          </label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full mt-1 bg-[#F5F7F8] p-3 rounded-sm border border-[#c1c7cf] transition-all duration-200
             focus:shadow-[0_0_5px_rgba(0,0,0,0.15)] focus:border-slate-500 focus:outline-none"
          >
            <option value="Select">Selecciona una opción</option>
            <option value="Alta">Alta</option>
            <option value="Media">Media</option>
            <option value="Baja">Baja</option>
          </select>
        </div>
        {/*  */}
        <div className="text-[#41474E]">
          <label
            htmlFor="supplier"
            className="text-xs font-semibold tracking-tighter uppercase "
          >
            Proveedor elegido
          </label>
          <input
            id="supplier"
            name="supplier"
            type="text"
            placeholder="Nombre de la empresa o contacto"
            value={formData.supplier}
            onChange={handleChange}
            className="w-full mt-1 bg-[#F5F7F8] p-3 rounded-sm border border-[#c1c7cf] transition-all duration-200
             focus:shadow-[0_0_5px_rgba(0,0,0,0.15)] focus:border-slate-500 focus:outline-none"
          />
        </div>

        {/*  */}
        <div className="flex flex-col gap-1 text-[#41474E]">
          <label
            htmlFor="description"
            className="text-xs font-semibold tracking-tighter uppercase"
          >
            Descripcion
          </label>
          <textarea
            name="description"
            placeholder="Detalle el motivo de la compra..."
            value={formData.description}
            onChange={handleChange}
            lang="ES"
            spellCheck={true}
            className="w-full mt-1 bg-[#F5F7F8] p-3 rounded-sm border border-[#c1c7cf] transition-all duration-200
             focus:shadow-[0_0_5px_rgba(0,0,0,0.15)] focus:border-slate-500 focus:outline-none leading-5"
            rows={4}
          />
        </div>
      </main>
    </section>
  );
}
