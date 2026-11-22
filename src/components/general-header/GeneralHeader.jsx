import { useState } from "react";
import BellIcon from "../../icons/bellIcon";
import SearchIcon from "../../icons/searchIcon";
import SettingIcons from "../../icons/settingsIcon";
import ProfileHeader from "./ProfileHeader";
import UserProfile from "./UserProfile";

export default function GeneralHeader() {
  const [profileActive, setProfileActive] = useState(false);
  return (
    <section className="inline-flex w-full justify-between py-10 lg:justify-end">
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
      <div className="flex items-center justify-end gap-4 text-[#0A3960] lg:w-[15%] lg:gap-15">
        <span>
          <BellIcon size={30} />
        </span>
        <span>
          <SettingIcons size={30} />
        </span>
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
