import { useState } from "react";
import UserProfile from "./UserProfile";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../utility/supabase";

export default function ProfileHeader({ setProfileActive, profileActive }) {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };
  return (
    <>
      {profileActive ? (
        <section className="absolute z-50 flex flex-col gap-4 p-4 bg-gray-200 rounded-lg top-25 right-12">
          <div className="">
            <h4>Deyverson Herrera</h4>
            <p>deyversongp@gmail.com</p>
            <h5>Planeador de mantenimiento</h5>
          </div>
          <div>
            <button
              className="top-6 right-8 z-10 cursor-pointer rounded bg-[#0A3960] px-4 py-1.5 text-white uppercase transition-all duration-300 hover:scale-105"
              onClick={handleLogout}
            >
              Cerrar sesión
            </button>
          </div>
        </section>
      ) : (
        ""
      )}
    </>
  );
}
