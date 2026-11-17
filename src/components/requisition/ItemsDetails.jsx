import ItemsList from "../../icons/itemsList";
import MinusIcon from "../../icons/minusIcon";
import PlusIcon from "../../icons/plusIcon";
import ItemsRequisition from "./ItemsRequisition";

export default function ItemsDetails({
  formData,
  handleItemChange,
  setFormData,
}) {
  const formatNumber = (value) => {
    return new Intl.NumberFormat("es-CO").format(value);
  };

  const subtotal = formData.items.reduce(
    (sum, item) => sum + Number(item.itemValue) * Number(item.itemAmount),
    0,
  );

  const valorIva = subtotal * 0.19;
  const finalValue = subtotal + valorIva;

  const totalValue = formatNumber(finalValue);
  const handleAddItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          itemName: "",
          itemAmount: "",
          itemType: "",
          itemValue: "",
        },
      ],
    }));
  };
  const handleRemoveItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.slice(0, -1),
    }));
  };
  return (
    <section className="flex flex-col gap-4 p-4 lg:p-10 m-4 bg-[f2f4f5] py-6 rounded-xl border border-gray-200">
      <div className="flex items-center mb-6 justify-between text-[#1B4F72] w-full">
        <div className="flex items-center gap-1">
          <ItemsList size={20} />
          <h2 className="text-sm font-semibold uppercase ">Item a solicitar</h2>
        </div>
        <div className="flex items-center gap-8">
          <button
            className="text-sm flex gap-1 items-center font-semibold uppercase cursor-pointer text-[#1B4F72]"
            onClick={handleRemoveItem}
          >
            <MinusIcon size={20} />
            Eliminar
          </button>
          <button
            type="button"
            onClick={handleAddItem}
            className="text-sm flex gap-1 items-center font-semibold uppercase cursor-pointer text-[#1B4F72]"
          >
            <PlusIcon size={17} />
            Agregar
          </button>
        </div>
      </div>
      <section className="items-center hidden text-center text-gray-700 md:gap-4 md:flex">
        <h3
          htmlFor="itemName"
          className="flex-1 text-xs font-semibold tracking-tighter uppercase"
        >
          Nombre del Ítem
        </h3>
        <h3
          htmlFor="itemAmount"
          className="flex-1 text-xs font-semibold tracking-tighter uppercase"
        >
          Cantidad
        </h3>
        <h3
          htmlFor="itemType"
          className="flex-1 text-xs font-semibold tracking-tighter uppercase"
        >
          Tipo de compra
        </h3>

        <h3
          htmlFor="itemValue"
          className="flex-1 text-xs font-semibold tracking-tighter uppercase"
        >
          Valor
        </h3>
        <h3
          htmlFor="itemValue"
          className="flex-1 text-xs font-semibold tracking-tighter text-center uppercase"
        >
          subtotal
        </h3>
      </section>

      {formData.items.map((item, index) => (
        <ItemsRequisition
          handleAddItem={handleAddItem}
          key={index}
          handleItemChange={handleItemChange}
          index={index}
          item={item}
          formatNumber={formatNumber}
        />
      ))}
      <section className="items-center justify-end hidden gap-6 pt-4 text-lg font-bold mx-7 md:flex w-8/9">
        <h3 className="uppercase text-md">Total estimado</h3>
        <h3 className="text-[#1B4F72]">${totalValue} </h3>
      </section>
    </section>
  );
}
