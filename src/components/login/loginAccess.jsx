import { Link, useNavigate } from "react-router-dom";
import User from "../../icons/user";
import Lock from "../../icons/lock";
import { useState } from "react";
import { supabase } from "../../utility/supabase";
import EyeIconOn from "../../icons/eyeIconOn";
import EyeOffIcon from "../../icons/eyeIconOff";

export default function LoginAccess({ setRequestForm }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Credenciales incorrectas");
    } else {
      navigate("/MainDashboard");
    }
  };
  return (
    <section className="mt-10 mb-32 flex flex-col items-center justify-center rounded-2xl px-5 py-5 pb-8 sm:mx-20 md:mx-40">
      <div className="w-full">
        <h2 className="text-xl font-bold text-neutral-950 md:text-3xl">
          Acceso de Usuario
        </h2>
        <p className="pt-2 text-lg font-semibold text-gray-700">
          Ingrese sus credenciales para continuar
        </p>
      </div>

      <form
        onSubmit={handleLogin}
        className="flex w-full flex-col gap-y-5 pt-8 tracking-tight uppercase"
      >
        {error && <p className="text-sm text-red-500">{error}</p>}
        <div>
          <label
            htmlFor="correo"
            className="block items-center justify-center pb-2 text-sm font-bold text-gray-600"
          >
            ID de Empleado o Correo Electrónico
          </label>
          <div className="flex items-center rounded-sm border border-gray-300 bg-white px-2">
            <User size={24} />
            <input
              id="correo"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingrese su ID o correo"
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
              id="contraseña"
              type={showPassword ? "password" : "text"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese su contraseña"
              className="text-md w-full px-2 py-3 placeholder:text-gray-500 focus:outline-0"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="cursor-pointer pr-2 text-gray-600 hover:scale-105"
            >
              {showPassword ? (
                <EyeOffIcon size={20} />
              ) : (
                <EyeIconOn size={20} />
              )}
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between gap-2">
            <input
              type="checkbox"
              className="w-4 accent-[#1B4F72] hover:cursor-pointer"
            />
            <label
              htmlFor=""
              className="block text-sm font-semibold text-gray-600"
            >
              Recuérdame
            </label>
          </div>
          <h3 className="text-sm font-semibold text-[#1B4F72] hover:cursor-pointer">
            ¿Olvidaste tu contraseña?
          </h3>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-5">
          <button
            type="submite"
            className="tracking-wie mouse rounded-lg bg-[#1e5a7d] px-10 py-4 text-xl font-bold text-white transition hover:scale-101 hover:cursor-pointer md:w-full"
          >
            Iniciar sesión
          </button>

          <span
            onClick={setRequestForm}
            className="font-semibold text-[#0A3960] normal-case hover:cursor-pointer hover:underline"
          >
            ¿No tienes cuenta? Solicita acceso
          </span>
        </div>
      </form>
    </section>
  );
}
