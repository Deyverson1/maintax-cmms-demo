import SidebarNavigation from "../components/ui/SidebarNavigation";
import GeneralHeader from "../components/general-header/GeneralHeader";
import KpiCopilot from "../components/dashboard/KpiCard";
import KpiCards from "../components/dashboard/KpiCard";
import PendingTasks from "../components/dashboard/PendingTasks";
import RecentActivity from "../components/dashboard/RecentActivity";
import DashboardFooter from "../components/dashboard/DashboardFooter";

export default function MainDashboard() {
  const hora = new Date().getHours();
  return (
    <main>
      <div className="flex">
        <SidebarNavigation />
        <section className="w-full bg-[#F8FAFB] px-4 lg:w-[80%] lg:px-12">
          <GeneralHeader />
          <main className="mt-5 flex flex-col">
            <section className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center lg:gap-0 lg:py-10">
              <div>
                <h2 className="text-xs tracking-widest text-[#41474E] uppercase lg:text-lg">
                  Industrial CMMS Maintax
                </h2>
                <p className="text-lg font-bold text-[#0A3960] lg:text-xl">
                  {hora < 12 ? (
                    <span> Buenos días, Deyverson</span>
                  ) : hora < 18 ? (
                    <span> Buenas tardes, Deyverson</span>
                  ) : (
                    <span> Buenas noches, Deyverson</span>
                  )}
                </p>
              </div>
              <div>
                <div className="flex items-center rounded-xl border border-gray-200 bg-[#F5F7F8] px-4 py-1.5 text-sm lg:text-lg">
                  <div className="relative mr-3 h-3 w-3">
                    <div className="absolute inset-0 animate-ping rounded-full bg-emerald-500/30" />
                    <div className="relative h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                  </div>
                  Estado del sistema:
                  <span className="pl-1 font-bold text-[#191C1D]">
                    Operativo
                  </span>{" "}
                </div>
              </div>
            </section>
            <KpiCards />
            <section className="flex gap-8 py-12">
              <PendingTasks />
              {/* <RecentActivity /> */}
            </section>
          </main>
        </section>
      </div>
      <DashboardFooter />
    </main>
  );
}
