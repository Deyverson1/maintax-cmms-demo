import { BiChevronDown } from "react-icons/bi";
import SearchIcon from "../../icons/searchIcon";
import XIcon from "../../icons/xIcon";
import ChevronDown from "../../icons/chevronDown";
import ChevronUpIcon from "../../icons/chevronUpIcon";
import { useEffect, useState } from "react";
import DeviceFloppyIcon from "../../icons/deviceFloppyIcon";
import { supabase } from "../../utility/supabase";

export default function OutboundModal({ setModalActive, setRefresh }) {
  // const [searchActive, setSearchActive] = useState(false);
  //prueba
  const [date, setDate] = useState("");
  const [reference, setReference] = useState("");
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState(0);
  const [destination, setDestination] = useState("");
  const [employee, setEmployee] = useState();
  const [outboundNumber, setOutboundNumber] = useState(0);

  //fetch

  // const destinyData = [
  //   { name: "Planta", grupo: "Planta" },
  //   { name: "Producción", grupo: "Planta" },
  //   { name: "Flexo F1", grupo: "Flexografía" },
  // ];

  // OutboundForm
  const handleSubmit = async () => {
    const { error } = await supabase.from("outbounds").insert({
      numero: outboundNumber,
      fecha: date,
      referencia: reference,
      item,
      cantidad: amount,
      destino: destination,
      colaborador: employee,
    });

    if (error) {
      console.log("Error:", error);
      return;
    }
    setRefresh((r) => r + 1);
    setModalActive(false);
  };

  useEffect(() => {
    //si conocemos la referencia
    const fetchReference = async () => {
      const { data, error } = await supabase
        .from("catalogo_referencias")
        .select("*")
        .eq("referencia", reference.trim());

      if (error) {
        console.log("Error buscando referencia", error);
        setData([]);
        return;
      }

      setItem(data[0]?.descripcion ?? "");
    };
    fetchReference();
  }, [reference]);

  return (
    <section className="absolute top-0 right-0 z-50 h-screen w-3/11 bg-[#ffffff]">
      <header className="flex items-center justify-between border-b border-gray-200 bg-[#F8FAFB] p-8">
        <div>
          <h3 className="text-2xl font-bold">Registrar salida </h3>
          <span className="tracking-tight">
            Nueva salida de repuesto del almacén
          </span>
        </div>
        <button
          onClick={() => setModalActive(false)}
          className="rounded-full p-3 transition-all duration-500 hover:cursor-pointer hover:bg-gray-200"
        >
          <XIcon size={26} />
        </button>
      </header>
      <main className="flex flex-col gap-8 p-8">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="outbound-date"
            className="text-sm font-semibold tracking-wider text-gray-800 uppercase"
          >
            Fecha
          </label>
          <input
            id="outbound-date"
            onChange={(e) => setDate(e.target.value)}
            type="date"
            className="rounded-lg border border-gray-200 p-4 outline-[#0A3960]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="outbound-reference"
            className="text-sm font-semibold tracking-wider text-gray-800 uppercase"
          >
            Referencia (Código de repuesto){" "}
          </label>
          <input
            type="text"
            value={reference}
            onChange={(e) => {
              setReference(e.target.value);
            }}
            id="outbound-collaborator"
            className="rounded-lg border border-gray-200 p-4 outline-[#0A3960]"
            placeholder="Ej. R300-160"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="item-search-outbound"
            className="text-sm font-semibold tracking-wider text-gray-800 uppercase"
          >
            Ítem / Repuesto
          </label>
          <div className="relative w-full">
            <div className="rounded-lg border border-gray-200">
              <input
                id="item-search-outbound"
                value={item}
                onChange={(e) => setItem(e.target.value)}
                type="text"
                className="w-full p-4 pl-12 outline-[#0A3960]"
                placeholder="Busca y selecciona un repuesto..."
              />
              <div className="absolute top-7.5 left-4 -translate-y-1/2 text-gray-500">
                <SearchIcon size={20} />
              </div>
              {/* <div
                onClick={() => setSearchActive(!searchActive)}
                className="absolute top-7.5 right-2 -translate-y-1/2 p-2 text-gray-500 transition-all duration-1000 hover:cursor-pointer"
              >
                {searchActive ? (
                  <ChevronUpIcon size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </div>

              {searchActive ? (
                <ul className="flex flex-col gap-1 px-12 pt-2 pb-4 text-gray-500">
                  <li>Rodamiento 6006</li>
                  <li>Rodamiento 6005</li>
                  <li>Rodamiento 6004</li>
                  <li>Rodamiento 6002</li>
                  <li>Rodamiento 6008</li>
                </ul>
              ) : (
                ""
              )} */}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="item-outbound-amount"
              className="text-sm font-semibold tracking-wider text-gray-800 uppercase"
            >
              Cantidad
            </label>
            <input
              id="item-outbound-amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              className="rounded-lg border border-gray-200 p-4 outline-[#0A3960]"
              placeholder="0"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="item-outbound-amount"
              className="text-sm font-semibold tracking-wider text-gray-800 uppercase"
            >
              Numero de salida
            </label>
            <input
              id="item-outbound-amount"
              value={outboundNumber}
              onChange={(e) => setOutboundNumber(e.target.value)}
              type="number"
              className="rounded-lg border border-gray-200 p-4 outline-[#0A3960]"
              placeholder="0"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="outbound-destiny"
            className="text-sm font-semibold tracking-wider text-gray-800 uppercase"
          >
            Destino (Equipo / Área)
          </label>
          <div className="relative w-full">
            <div className="rounded-lg border border-gray-200">
              <input
                id="outbound-destiny"
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full p-4 pl-12 outline-[#0A3960]"
                placeholder="Busca y selecciona un destino..."
              />
              <div className="absolute top-7.5 left-4 -translate-y-1/2 text-gray-500">
                <SearchIcon size={20} />
              </div>
              {/* <div
                onClick={() => setSearchActive(!searchActive)}
                className="absolute top-7.5 right-2 -translate-y-1/2 p-2 text-gray-500 transition-all duration-1000 hover:cursor-pointer"
              >
                {searchActive ? (
                  <ChevronUpIcon size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </div>

              {searchActive ? (
                <ul className="flex flex-col gap-1 px-12 pt-2 pb-4 text-gray-500">
                  {destinyData.map((dato) => (
                    <li>{dato.name} </li>
                  ))}
                </ul>
              ) : (
                ""
              )} */}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="outbound-collaborator"
            className="text-sm font-semibold tracking-wider text-gray-800 uppercase"
          >
            Colaborador (Solicitante){" "}
          </label>
          <input
            type="text"
            value={employee}
            onChange={(e) => setEmployee(e.target.value)}
            id="outbound-collaborator"
            className="rounded-lg border border-gray-200 p-4 outline-[#0A3960]"
            placeholder="Escribe el nombre del solicitante..."
          />
        </div>
      </main>
      <footer className="absolute right-0 bottom-0 left-0 border-t border-gray-200 bg-[#F8FAFB]">
        <div className="flex w-full flex-1 items-center justify-center gap-4 p-8">
          <button
            onClick={() => setModalActive(false)}
            className="flex-1 rounded-xl border border-gray-300 py-4 text-sm font-semibold text-gray-500 uppercase transition-all duration-300 hover:scale-103 hover:cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#1b4f72] py-4 text-sm font-semibold text-[#ffffff] uppercase transition-all duration-300 hover:scale-103 hover:cursor-pointer"
          >
            <DeviceFloppyIcon size={20} />
            Registrar Salida
          </button>
        </div>
      </footer>
    </section>
  );
}
