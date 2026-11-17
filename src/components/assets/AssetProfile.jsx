import GeneralHeader from "../general-header/GeneralHeader";
import SidebarNavigation from "../ui/SidebarNavigation";
import AssetCriticalSpare from "./AssetCriticalSpare";
import AssetDocumentation from "./AssetDocumentation";
import AssetHeader from "./AssetHeader";
import AssetOperationalReports from "./AssetOperationalReports";
import AssetPendingTask from "./AssetPendingTask";
import AssetPerformance from "./AssetPerformance";
import AssetRecentActivity from "./AssetRecentActivity";
import AssetMaintenanceHistory from "./AsssetMaintenanceHistory";

export default function AssetProfile() {
  return (
    <main className="flex bg-[#F8FAFB]">
      <SidebarNavigation />
      <section className="flex w-[80%] flex-col gap-8 px-12">
        <GeneralHeader />
        <div>
          <AssetHeader />
          <section className="flex gap-10">
            <section className="w-[70%]">
              <AssetPerformance />
              <AssetDocumentation />
              <AssetCriticalSpare />
              <div className="flex gap-10">
                <AssetMaintenanceHistory />
                <AssetPendingTask />
              </div>
            </section>
            <section className="flex w-[30%] flex-col gap-10">
              <AssetRecentActivity />
              <AssetOperationalReports />
            </section>
          </section>
        </div>
      </section>
    </main>
  );
}
