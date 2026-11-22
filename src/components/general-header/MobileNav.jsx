import { useEffect } from "react";
import LogoutIcon from "../../icons/logoutIcon";
import XIcon from "../../icons/xIcon";
import Sidebar from "../common/Sidebar";
import Logout from "../../hooks/useLogout";

export default function MobileNav({ isMobileNavOpen, setIsMobileNavOpen }) {
  useEffect(() => {
    if (!isMobileNavOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileNavOpen]);
  return (
    <section>
      <div className="fixed inset-0 z-40 bg-black/10 backdrop-blur-sm transition-all duration-200" />
      <nav className="fixed top-0 right-0 z-50 flex h-dvh w-[75%] flex-col overflow-y-auto border-l border-gray-300 bg-white">
        <div className="flex justify-between p-4 text-sm font-semibold text-gray-400">
          <button className="flex items-center uppercase">
            <div className="relative mr-3 h-2 w-2">
              <div className="absolute inset-0 animate-ping rounded-full bg-emerald-500/30" />
              <div className="relative h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            </div>
            En línea
          </button>
          <button
            type="button"
            onClick={() => setIsMobileNavOpen(false)}
            className="cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
          >
            <XIcon size={25} />
          </button>
        </div>
        <header className="flex gap-4 border-y border-gray-200 p-4 text-xs">
          <div>
            <button className="h-fit rounded-xl bg-[#0A3960] p-3.5 text-lg font-bold text-white">
              DH
            </button>
            <div className="relative mr-3 h-2 w-2 translate-x-10.5 -translate-y-3.5">
              {/* <div className="absolute inset-0 rounded-full animate-ping bg-emerald-500/30" /> */}
              <div className="relative h-4 w-4 rounded-full border border-gray-100 bg-emerald-500" />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-base font-bold">Deyverson Herrera</h3>
            <span className="w-fit rounded-md bg-[#0A3960]/15 px-2 py-0.5 font-semibold text-[#0A3960] uppercase">
              Desarrollador
            </span>
            <p className="mt-1 text-gray-500">deyversongp@gmail.com</p>
          </div>
        </header>
        <section className="overflow-hidden">
          <Sidebar isMobileNavOpen={isMobileNavOpen} />
        </section>
        <footer className="mt-auto gap-4 p-4">
          <button
            className="flex gap-2 text-sm text-red-500"
            onClick={Logout()}
          >
            <LogoutIcon size={20} />
            Cerrar sesión
          </button>
        </footer>
      </nav>
    </section>
  );
}
