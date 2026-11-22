import { useState } from "react";
import BellIcon from "../../icons/bellIcon";
import SearchIcon from "../../icons/searchIcon";
import SettingIcons from "../../icons/settingsIcon";
import ProfileHeader from "./ProfileHeader";
import UserProfile from "./UserProfile";
import MenuIcon from "../../icons/menuIcon";
import MobileNav from "./MobileNav";

export default function GeneralHeader() {
  const [profileActive, setProfileActive] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <section className="inline-flex w-full justify-between lg:justify-end">
      {isMobileNavOpen ? (
        <MobileNav
          isMobileNavOpen={isMobileNavOpen}
          setIsMobileNavOpen={setIsMobileNavOpen}
        />
      ) : (
        ""
      )}
      {/* <div className="relative flex w-[60%]">
        <input
          type="text"
          className="w-full rounded-xl bg-[#f2f4f5] px-12 py-2"
          placeholder="Buscar requisiciones, repuestos, ordenes de trabajo..."
        />
        <div className="absolute text-gray-500 -translate-y-1/2 top-1/2 left-4">
          <SearchIcon size={18} />
        </div>
      </div> */}
      <div className="flex items-center justify-end gap-4 py-10 text-[#0A3960] lg:w-[15%] lg:gap-15">
        <button
          type="button"
          onClick={() => setIsMobileNavOpen(true)}
          className="cursor-pointer transition-all duration-300 hover:-translate-y-0.5 lg:hidden"
        >
          {" "}
          <MenuIcon size={30} />
        </button>
        {/* <span>
          <BellIcon size={30} />
        </span>
        <span>
          <SettingIcons size={30} />
        </span> */}
      </div>

      <ProfileHeader
        setProfileActive={setProfileActive}
        profileActive={profileActive}
      />

      <UserProfile
        setProfileActive={setProfileActive}
        profileActive={profileActive}
      />
    </section>
  );
}
