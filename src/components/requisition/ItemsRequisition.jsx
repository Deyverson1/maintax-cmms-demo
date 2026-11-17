export default function ItemsRequisition({
  handleItemChange,
  item,
  index,
  formatNumber,
}) {
  const subtotal =
    (Number(item?.itemAmount) || 0) * (Number(item?.itemValue) || 0);

  const subtotalFormatted = formatNumber(subtotal);
  return (
    <main className="flex flex-wrap items-center gap-4 mx-4 md:mx-0 md:grid md:grid-cols-5">
      <div className="flex flex-col w-full gap-1 md:w-auto">
        <label
          htmlFor="itemName"
          className="text-xs font-semibold tracking-tighter text-center text-gray-700 uppercase md:hidden"
        >
          Nombre del Ítem
        </label>
        <textarea
          type="text"
          placeholder="Nombre del Ítem"
          name="itemName"
          spellCheck={true}
          lang="es"
          autoComplete="on"
          value={item.itemName}
          onChange={(e) => handleItemChange(e, index)}
          contentEditable="true"
          rows={1}
          onInput={(e) => {
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight + "px";
          }}
          className="w-full text-center resize-none overflow-hidden  py-3 rounded-sm border text-neutral-950 transition-all duration-200 focus:shadow-[0_0_5px_rgba(0,0,0,0.15)] focus:border-slate-500 focus:outline-none md:border-none md:focus:border-none md:focus:shadow-none"
        />
      </div>
      <div className="w-1/2 md:w-auto">
        <label
          htmlFor="itemAmount"
          className="text-xs font-semibold tracking-tighter text-center uppercase md:hidden"
        >
          Cantidad
        </label>
        <textarea
          type="number"
          placeholder="Ej. 10 unidades"
          name="itemAmount"
          value={item.itemAmount}
          onChange={(e) => handleItemChange(e, index)}
          rows={1}
          onInput={(e) => {
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight + "px";
          }}
          className="w-full text-center resize-none overflow-hidden  py-3 rounded-sm border text-neutral-950 transition-all duration-200 focus:shadow-[0_0_5px_rgba(0,0,0,0.15)] focus:border-slate-500 focus:outline-none md:border-none md:focus:border-none md:focus:shadow-none"
        />
      </div>
      <div className="flex-1 w-1/2 md:flex-none md:w-auto">
        <label
          htmlFor="itemType"
          className="text-xs font-semibold tracking-tighter uppercase md:hidden"
        >
          Tipo de compra
        </label>
        {/*  */}
        <textarea
          type="itemType"
          id="itemType"
          placeholder="Ej: Servicios"
          name="itemType"
          value={item.itemType}
          rows={1}
          onInput={(e) => {
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight + "px";
          }}
          onChange={(e) => handleItemChange(e, index)}
          className="w-full text-center resize-none overflow-hidden  py-3 rounded-sm border text-neutral-950 transition-all duration-200 focus:shadow-[0_0_5px_rgba(0,0,0,0.15)] focus:border-slate-500 focus:outline-none md:border-none md:focus:border-none md:focus:shadow-none"
        />
      </div>

      <div className="flex flex-col w-1/2 md:w-auto">
        <label
          htmlFor="itemValue"
          className="text-xs font-semibold tracking-tighter uppercase md:hidden"
        >
          Valor
        </label>
        <textarea
          type="number"
          name="itemValue"
          placeholder="Valor"
          value={item.itemValue}
          onChange={(e) => handleItemChange(e, index)}
          rows={1}
          onInput={(e) => {
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight + "px";
          }}
          className="w-full text-center resize-none overflow-hidden  py-3 rounded-sm border text-neutral-950 transition-all duration-200 focus:shadow-[0_0_5px_rgba(0,0,0,0.15)] focus:border-slate-500 focus:outline-none md:border-none md:focus:border-none md:focus:shadow-none"
        />
      </div>

      <div className="flex flex-col items-center justify-center flex-1 w-1/2 text-xs font-semibold uppercase md:w-auto md:flex-none">
        <h2 className="md:hidden">Subtotal</h2>
        <p className="text-[#1B4F72]">${subtotalFormatted} </p>
      </div>
    </main>
  );
}
