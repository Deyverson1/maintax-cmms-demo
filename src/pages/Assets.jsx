import AssetsCard from "../components/assets/AssetsCard";
import AssetsFilters from "../components/assets/AssetsFilters";
import AssetsHeader from "../components/assets/AssetsHeader";

import SidebarNavigation from "../components/ui/SidebarNavigation";

export default function Assets() {
  return (
    <section className="flex bg-[#F8FAFB]">
      <SidebarNavigation />
      <div className="flex w-[80%] flex-col gap-8 px-12">
        <section>
          <AssetsHeader />
          <AssetsFilters />
          <AssetsCard />
        </section>
      </div>
    </section>
  );
}
