export default function Footer() {
  return (
    <footer className="fixed bottom-0 z-40 flex w-full items-center justify-between gap-2 border-t border-gray-300 bg-[#ffffff] px-4 py-4 text-gray-600 uppercase md:px-80">
      <div className="flex gap-4">
        <p className="text-center font-bold text-[#1B4F72]">
          MaintaX CMMS © 2026
        </p>
        <p className="text-center">v 0.1.0 – Beta</p>
      </div>
      <p className="hidden text-center font-medium md:flex">
        Gestión Industrial de Mantenimiento
      </p>
    </footer>
  );
}
