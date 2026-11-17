import AlertSquareIcon from "../../icons/alertSquareIcon.jsx";
import XIcon from "../../icons/xIcon.jsx";
import XlsIcon from "../../icons/xlsIcon.jsx";
import ListIcon from "../../icons/listIcon.jsx";
import HistoryIcon from "../../icons/historyIcon.jsx";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

export default function InventoryModal({
  setShowUpdateInventory,
  updateInventory,
  setUpdateInventory,
  handleApplyUpdate,
}) {
  return (
    <section className="absolute top-1/2 right-0 z-50 flex w-[80%] -translate-y-1/2 items-center justify-center">
      <main className="right-0 flex w-fit max-w-161.5 flex-col items-center justify-center gap-6 rounded-2xl bg-[#ffffff] p-8">
        <div className="flex items-center justify-between w-full">
          <h3 className="text-xl font-semibold tracking-tight">
            Actualizar inventario desde Excel
          </h3>
          <button
            onClick={() => setShowUpdateInventory(false)}
            className="p-3 text-gray-500 transition-all duration-300 rounded-full hover:scale-105 hover:cursor-pointer hover:bg-gray-100"
          >
            <XIcon size={24} />
          </button>
        </div>
        <input
          id="update-inventory-input"
          type="file"
          accept=".csv"
          className="hidden"
          onChange={(e) => setUpdateInventory(e.target.files[0])}
        />

        <label
          htmlFor="update-inventory-input"
          className="hover:cursor-pointer"
        >
          <div className="flex min-w-144.5 flex-col items-center justify-center gap-1 rounded-2xl border border-dashed border-gray-400 px-20 py-15">
            <div className="mb-4 rounded-full bg-[#1B4F7233] p-3 text-[#1b4f72]">
              <XlsIcon size={34} />
            </div>
            {updateInventory ? (
              <div className="text-center">
                <p className="font-medium">{updateInventory.name}</p>
                <p className="text-sm text-gray-700">
                  {(updateInventory.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            ) : (
              <>
                <p className="font-medium">
                  Arrastrar y soltar archivo Excel o haz click para buscar
                </p>
                <span className="text-sm text-gray-700">
                  Formatos soportados: .xls, .csv
                </span>
              </>
            )}
          </div>
        </label>

        {/* <div className="flex gap-4 p-4 bg-gray-100 rounded-2xl">
          <div className="text-[#1b4f72]">
            <AlertSquareIcon size={26} />
          </div>
          <div className="flex flex-col gap-1">
            <h5 className="font-semibold">Estructura requerida del archivo </h5>
            <p className="text-sm leading-tight text-[#41474e]">
              Resumen de cambios listos para aplicar
              <strong> Se han analizado los datos del archivo subido</strong>
            </p>
          </div>
        </div> */}

        <div className="flex gap-4 rounded-2xl bg-[#1B4F7233] p-4">
          <div className="text-[#1b4f72]">
            <ListIcon size={26} />
          </div>
          <div className="flex flex-col gap-1">
            <h5 className="font-semibold">Estructura requerida del archivo </h5>
            <p className="text-sm leading-tight text-[#41474e]">
              El archivo debe contar con la estructura:{" "}
              <strong>
                Referencia, Descripción, Inv. Anterior, Entradas, Salidas, Inv.
                Final
              </strong>
            </p>
          </div>
        </div>

        <div className="flex justify-end w-full gap-4 mt-8">
          <button className="px-8 py-3 text-sm font-semibold text-gray-500 uppercase transition-all duration-300 border border-gray-300 rounded-xl hover:scale-103 hover:cursor-pointer">
            Cancelar
          </button>
          <button
            onClick={handleApplyUpdate}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#1b4f72] px-8 py-3 text-sm font-semibold text-[#ffffff] uppercase transition-all duration-300 hover:scale-103 hover:cursor-pointer"
          >
            <HistoryIcon size="26" />
            Aplicar actualización
          </button>
        </div>
      </main>
    </section>
  );
}
