export default function GeneralFooter() {
  return (
    <footer className="flex items-center justify-between bg-[#1B4F72] py-5 text-center text-[10px] lg:text-base">
      <p className="flex-1 tracking-wider text-[#FFFFFFCC]">
        MaintaX CMMS © 2026
      </p>
      <p className="flex-1 tracking-wider text-[#FFFFFFCC] uppercase">
        Gestión industrial de mantenimiento
      </p>
      <p className="flex-1 font-mono tracking-wider text-[#FFFFFFCC] uppercase">
        {" "}
        v 0.1.0 beta
      </p>
    </footer>
  );
}
