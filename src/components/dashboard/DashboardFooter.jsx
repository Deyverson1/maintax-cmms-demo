export default function DashboardFooter() {
  return (
    <footer className="bg-[#1B4F72] text-xs text-center flex lg:text-base justify-between py-5 items-center">
      <p className="text-[#FFFFFFCC] flex-1 tracking-wider ">
        MaintaX CMMS © 2026
      </p>
      <p className="uppercase flex-1 text-[#FFFFFFCC] tracking-wider">
        Gestión industrial de producción
      </p>
      <p className="uppercase flex-1 tracking-wider font-mono text-[#FFFFFFCC]">
        {" "}
        v 0.1.0 beta
      </p>
    </footer>
  );
}
