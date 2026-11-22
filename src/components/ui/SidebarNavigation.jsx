import { Link } from "react-router-dom";
import Sidebar from "../common/Sidebar";

export default function SidebarNavigation({ isModalActive }) {
  return (
    <nav
      className={`z-40 hidden min-h-screen w-[20%] bg-[#F5F7F8] px-6 py-6 md:flex md:flex-col ${isModalActive ? "blur transition-all duration-500" : ""} `}
    >
      <Link
        to={"/MainDashboard"}
        className="flex flex-col items-center justify-center"
      >
        <img
          src="/maintaxLogoNoBg.svg"
          alt="Logo de Maintax CMMS Industrial"
          className="aspect-square w-2/8 rounded-2xl"
        />

        <p className="text-sm font-normal tracking-widest text-neutral-950 uppercase">
          Industrial CMMS
        </p>
      </Link>
      <Sidebar />
    </nav>
  );
}
