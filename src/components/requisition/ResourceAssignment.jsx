export default function ResourceAssignment({ formData, handleChange }) {
  return (
    <section className="p-4 lg:p-10 m-4 flex-col flex text-[#41474E]  rounded-xl border border-gray-200">
      <section className="flex flex-col pt-1">
        <label
          htmlFor="requisitionNumber"
          className="text-xs font-semibold tracking-tighter"
        >
          CÓDIGO DE REQUISICIÓN
        </label>
        <input
          id="requisitionNumber"
          name="requisitionNumber"
          type="number"
          placeholder="REQ-2026"
          value={formData.requisitionNumber}
          onChange={handleChange}
          className="text-xl mt-2 font-bold text-[#1B4F72] placeholder:text-[#1B4F72] focus:outline-none"
        />
      </section>
      <section className="flex flex-col pt-4">
        <label
          htmlFor="requisitionName"
          className="text-xs font-semibold tracking-tighter uppercase"
        >
          Nombre de la requisición:
        </label>
        <input
          id="requisitionName"
          name="requisitionName"
          type="text"
          placeholder="Nombre o descripción de la requisición"
          value={formData.requisitionName}
          onChange={handleChange}
          className="w-full mt-2 bg-[#f2f4f5] p-3 py-2.5 rounded-sm border border-[#c1c7cf] transition-all duration-200
             focus:shadow-[0_0_5px_rgba(0,0,0,0.15)] focus:border-slate-500 focus:outline-none"
        />
      </section>
      <section className="flex gap-3 pt-3">
        <div className="w-1/2">
          <label
            htmlFor="section"
            className="text-xs font-semibold tracking-tighter uppercase "
          >
            Sección
          </label>

          <input
            id="section"
            name="section"
            type="text"
            placeholder="Ej. Producción"
            value={formData.section}
            onChange={handleChange}
            className="w-full mt-1 bg-[#f2f4f5] p-3 rounded-sm border border-[#c1c7cf] transition-all duration-200
             focus:shadow-[0_0_5px_rgba(0,0,0,0.15)] focus:border-slate-500 focus:outline-none"
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="machine"
            className="text-xs font-semibold tracking-tighter uppercase"
          >
            Máquina
          </label>
          <input
            id="machine"
            name="machine"
            type="text"
            placeholder="Ej. Extrusión"
            value={formData.machine}
            onChange={handleChange}
            className="w-full mt-1 bg-[#f2f4f5] p-3 rounded-sm border border-[#c1c7cf] transition-all duration-200
             focus:shadow-[0_0_5px_rgba(0,0,0,0.15)] focus:border-slate-500 focus:outline-none"
          />
        </div>
      </section>
    </section>
  );
}
