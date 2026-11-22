export default function UserProfile({ setProfileActive, profileActive }) {
  return (
    <div
      className="flex items-center justify-end gap-4 hover:cursor-pointer lg:w-[25%]"
      onClick={(e) => setProfileActive(!profileActive)}
    >
      <div className="text-right">
        <h3 className="mb-0 pb-0 font-extrabold text-[#0A3960] lg:text-lg">
          Deyverson Herrera
        </h3>{" "}
        <p className="-mt-0.5 pt-0 text-sm tracking-tight text-gray-500 uppercase">
          Desarrollador
        </p>{" "}
      </div>
      <div>
        <img
          className="h-13 w-12 rounded-lg"
          src="/deyversonicon.jpg"
          alt="Foto del desarrollador del aplicativo"
        />
      </div>
    </div>
  );
}
