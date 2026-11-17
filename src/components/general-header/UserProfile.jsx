export default function UserProfile({ setProfileActive, profileActive }) {
  return (
    <div
      className="flex w-[25%] items-center justify-end gap-4 hover:cursor-pointer"
      onClick={(e) => setProfileActive(!profileActive)}
    >
      <div className="text-right">
        <h3 className="mb-0 pb-0 text-lg font-extrabold text-[#0A3960]">
          Deyverson Herrera
        </h3>{" "}
        <p className="-mt-0.5 pt-0 text-sm tracking-tight text-gray-500 uppercase">
          Desarrollador
        </p>{" "}
      </div>
      <div>
        <img
          className="w-12 rounded-lg h-13"
          src="/deyversonicon.jpg"
          alt="Foto del desarrollador del aplicativo"
        />
      </div>
    </div>
  );
}
