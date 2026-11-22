import { useState } from "react";

export default function OrderTypeSelector({ orderType, setOrderType }) {
  const orderTypes = [
    // { id: "nota", label: "Nota" },
    { id: "cotizacion", label: "Cotización" },
  ];
  const handleType = (id) => {
    setOrderType(id);
    // console.log(id);
  };
  return (
    <div>
      <p className="text-md font-semibold tracking-wider text-gray-700 uppercase">
        Tipo de orden
      </p>
      <div className="mt-3 w-fit self-start rounded-lg bg-gray-200">
        {orderTypes.map((data) => (
          <button
            type="button"
            id={data.id}
            className={`text-md m-1 cursor-pointer rounded-lg px-10 py-2.5 transition-all duration-300 ${orderType === data.id ? "bg-[#ffffff]" : "hover:bg-white/30"} `}
            onClick={() => handleType(data.id)}
          >
            {data.label}
          </button>
        ))}
      </div>
    </div>
  );
}
