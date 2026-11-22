import { Link, useLocation } from "react-router-dom";
import { SidebarData } from "../../constants/sidebarData";

export default function Sidebar({ isMobileNavOpen }) {
  const { pathname } = useLocation();

  return (
    <div
      className={`flex flex-col text-[#0A3960] ${isMobileNavOpen ? "text-sm" : "gap-1.5 pt-16 text-lg"}`}
    >
      {SidebarData.map((data) => (
        <Link
          key={data.name}
          to={data.path}
          className={`flex items-center py-3 transition-all duration-100 hover:scale-102 ${isMobileNavOpen ? "gap-2" : "gap-3"} ${
            pathname.startsWith(data.path)
              ? "rounded-r-lg border-l-4 border-[#1B4F72] bg-gray-200 px-3 font-black"
              : "px-4"
          }`}
        >
          <data.icon size={isMobileNavOpen ? 18 : 26} />
          <p>{data.name}</p>
        </Link>
      ))}
    </div>
  );
}
