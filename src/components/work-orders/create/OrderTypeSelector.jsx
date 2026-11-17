import { useState } from "react";

export default function OrderTypeSelector({ orderType, setOrderType }) {
  const orderTypes = [
    { id: "nota", label: "Nota" },
    { id: "cotizacion", label: "Cotización" },
  ];
  const handleType = (id) => {
    setOrderType(id);
    // console.log(id);
  };
  return (
    <div>
      <p className="font-semibold tracking-wider text-gray-700 uppercase text-md">
        Tipo de orden
      </p>
      <div className="self-start mt-3 bg-gray-200 rounded-lg w-fit">
        {orderTypes.map((data) => (
          <button
            type="button"
            id={data.id}
            className={`py-2.5 cursor-pointer transition-all rounded-lg duration-300 text-md px-10 m-1 ${orderType === data.id ? "bg-[#ffffff]" : "hover:bg-white/30"} `}
            onClick={() => handleType(data.id)}
          >
            {data.label}
          </button>
        ))}
      </div>
    </div>
  );
}
