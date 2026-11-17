import { useState } from "react";
import User from "../../icons/user";
import Lock from "../../icons/lock";
import IdIcon from "../../icons/idIcon";
import BuildingIcon from "../../icons/buildingIcon";

export default function RequesAccessForm({ setRequestForm, showRequestForm }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <section className="mt-10 mb-32 flex flex-col items-center justify-center rounded-2xl px-5 py-5 pb-8 sm:mx-20 md:mx-40">
      <div className="w-full">
        <h2 className="text-xl font-bold text-neutral-950 md:text-3xl">
          Solicitud de Acceso
        </h2>
        <p className="pt-2 text-lg text-gray-500">
          Complete el formulario para solicitar acceso al sistema
        </p>
      </div>

      <form className="flex w-full flex-col gap-y-5 pt-8 tracking-tight uppercase">
        <div>
          <label
            htmlFor="correo"
            className="block items-center justify-center pb-2 text-sm font-bold text-gray-600"
          >
            Nombre completo
          </label>
          <div className="flex items-center rounded-sm border border-gray-300 bg-white px-2">
            <User size={24} />
            <input
              id="correo"
              type="email"

              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ej. Juan Camilo Mendoza"
              className="text-md w-full px-2 py-3 placeholder:text-gray-500 focus:outline-0"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="correo"
            className="block items-center justify-center pb-2 text-sm font-bold text-gray-600"
          >
            Cargo
          </label>
          <div className="flex items-center rounded-sm border border-gray-300 bg-white px-2">
            <IdIcon size={24} />
            <input
              id="correo"
              type="email"

              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ej. Jefe de Mantenimiento"
              className="text-md w-full px-2 py-3 placeholder:text-gray-500 focus:outline-0"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="correo"
            className="block items-center justify-center pb-2 text-sm font-bold text-gray-600"
          >
            Empresa
          </label>
          <div className="flex items-center rounded-sm border border-gray-300 bg-white px-2">
            <BuildingIcon size={24} />
            <input
              id="correo"
              type="email"

              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ej. Ecopetrol S.A"
              className="text-md w-full px-2 py-3 placeholder:text-gray-500 focus:outline-0"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="contraseña"
            className="block pb-2 text-sm font-bold text-gray-600"
          >
            Contraseña
          </label>
          <div className="flex items-center rounded-sm border border-gray-300 bg-white px-2">
            <Lock />
            <input
              type="password"

              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese una contraseña"
              className="text-md w-full px-2 py-3 placeholder:text-gray-500 focus:outline-0"
            />
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-5">
          <button
            type="submite"
            className="tracking-wie mouse rounded-lg bg-[#1e5a7d] px-10 py-4 text-xl font-bold text-white transition hover:scale-101 hover:cursor-pointer md:w-full"
          >
            Enviar solicitud
          </button>

          <span
            onClick={() => setRequestForm(!showRequestForm)}
            className="font-semibold text-[#0A3960] normal-case hover:cursor-pointer hover:underline"
          >
            ¿Ya tienes cuenta? Inicia sesión
          </span>
        </div>
      </form>
    </section>
  );
}
