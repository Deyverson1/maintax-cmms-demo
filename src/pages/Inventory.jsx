import { useEffect, useState } from "react";
import { supabase } from "../utility/supabase";
import SidebarNavigation from "../components/ui/SidebarNavigation";
import FilterSearch from "../icons/filterSearch";
import SearchIcon from "../icons/searchIcon";
import UploadIcon from "../icons/uploadIcon";
import InventoryModal from "../components/inventory/InventoryModal";
import Papa from "papaparse";
import GeneralHeader from "../components/general-header/GeneralHeader";
import GeneralFooter from "../components/common/GeneralFooter";

export default function Inventory() {
  const [showUpdateInventory, setShowUpdateInventory] = useState(false);
  const [inventoryData, setInventoryData] = useState([]);
  const [inputInventory, setInputInventory] = useState("");
  const [updateInventory, setUpdateInventory] = useState(null);

  const inventoryFilter = inventoryData.filter((item) => {
    const matches =
      item.descripcion.toLowerCase().includes(inputInventory.toLowerCase()) ||
      item.referencia.toLowerCase().includes(inputInventory.toLowerCase());

    return matches;
  });
  useEffect(() => {
    const fetchInventory = async () => {
      const { data, error } = await supabase.from("inventory").select("*");

      if (error) {
        console.error("Error:", error);
      } else {
        setInventoryData(data);
      }
    };

    fetchInventory();
  }, []);

  //comparador para ordenar por referencia
  const parseCSV = (file) => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        complete: (results) => resolve(results.data),
        error: (error) => reject(error),
      });
    });
  };

  const upsertCatalogo = async (parsedData) => {
    const catalogoRows = parsedData.map((row) => ({
      descripcion: row.descripcion,
      referencia: row.referencia,
    }));

    const { error } = await supabase
      .from("catalogo_referencias")
      .upsert(catalogoRows, {
        onConflict: "referencia",
        ignoreDuplicates: true,
      });

    if (error) {
      console.error("Error al actualizar catálogo:", error);
      throw error;
    }
  };

  const replaceInventory = async (parsedData) => {
    // 1. Borrar todo el inventario anterior
    const { error: deleteError } = await supabase
      .from("inventory")
      .delete()
      .neq("id", 0);

    if (deleteError) {
      console.error("Error al borrar inventario anterior:", deleteError);
      throw deleteError;
    }

    // 2. Insertar los datos nuevos
    const { error: insertError } = await supabase
      .from("inventory")
      .insert(parsedData);

    if (insertError) {
      console.error("Error al insertar inventario nuevo:", insertError);
      throw insertError;
    }
  };

  const handleApplyUpdate = async () => {
    if (!updateInventory) return;

    try {
      const parsedData = await parseCSV(updateInventory);

      await upsertCatalogo(parsedData);
      await replaceInventory(parsedData);

      // console.log("Actualización completada con éxito");
    } catch (error) {
      console.error("Error en la actualización:", error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <section className="flex flex-1">
        <SidebarNavigation />
        <section className="w-full px-2 md:w-[80%] md:px-12">
          <GeneralHeader />
          <main className={`z-1 pt-10 ${showUpdateInventory ? "blur" : ""} `}>
            <div>
              <h2 className="text-xl font-medium tracking-tight md:mb-2 md:text-4xl">
                Inventario del Almacén de repuestos
              </h2>
              <span className="leading-relaxed text-gray-800 md:leading-normal">
                Estado actual de los componentes pertenecientes al area del
                almacén
              </span>
            </div>
            <section className="my-4 flex justify-between gap-4 rounded-2xl border border-gray-200 bg-[#ffffff] p-4 md:mt-10">
              <div className="relative w-full md:w-[70%]">
                <input
                  type="text"
                  value={inputInventory}
                  onChange={(e) => setInputInventory(e.target.value)}
                  className="w-full rounded-xl bg-[#f2f4f5] py-3 pl-13 text-xs md:px-13 md:text-base"
                  placeholder="Buscar referencias y descripción de repuestos..."
                />
                <div className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500">
                  <SearchIcon size={20} />
                </div>
              </div>
              <button
                onClick={() => setShowUpdateInventory(true)}
                className="hidden items-center justify-center gap-2 font-semibold text-[#1b4f72] transition-all duration-300 hover:scale-101 hover:cursor-pointer hover:text-[#0A3960] md:flex"
              >
                <UploadIcon size={24} />
                Actualizar inventario (Excel)
              </button>

              <button className="hidden cursor-pointer items-center justify-center rounded-xl bg-gray-200 px-4 md:flex">
                <FilterSearch size={24} />
              </button>
            </section>
            <section className="flex flex-col md:mt-10">
              <ul className="grid w-full grid-cols-7 justify-around rounded-lg bg-gray-100 py-5 text-center text-[9px] font-semibold text-[#0A3960] uppercase md:text-sm">
                <li>Referencia</li>
                <li className="col-span-2 text-left">
                  Descripción del articulo
                </li>
                <li>Cantidad Ant.</li>
                <li>Entradas</li>
                <li>Salidas</li>
                <li>Cantidad Act.</li>
              </ul>
              <ul className="w-full py-2 text-sm [&>*:nth-child(even)]:bg-gray-200 [&>*:nth-child(odd)]:bg-white">
                {inventoryFilter.map((dato) => (
                  <ul
                    key={dato.id}
                    className="grid w-full grid-cols-7 rounded-lg py-1 text-[9px] md:text-sm"
                  >
                    <li className="text-center uppercase">
                      {dato.referencia}{" "}
                    </li>
                    <li className="col-span-2">{dato.descripcion} </li>
                    <li className="text-center">{dato.anterior} </li>
                    <li className="text-center">{dato.entradas}</li>
                    <li className="text-center">{dato.salidas}</li>
                    <li className="text-center">{dato.final}</li>
                  </ul>
                ))}
              </ul>
            </section>
          </main>
        </section>
        {showUpdateInventory ? (
          <InventoryModal
            setShowUpdateInventory={setShowUpdateInventory}
            updateInventory={updateInventory}
            setUpdateInventory={setUpdateInventory}
            handleApplyUpdate={handleApplyUpdate}
          />
        ) : (
          ""
        )}
        {showUpdateInventory && (
          <div className="pointer-events-none absolute top-1/2 right-0 z-40 flex h-screen w-[80%] -translate-y-1/2 bg-black/30" />
        )}
      </section>
      <GeneralFooter />
    </div>
  );
}
