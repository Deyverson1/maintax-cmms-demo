export default function SelectorGroup({
  label,
  options,
  selected,
  setSelected,
}) {
  return (
    <div>
      <p className="font-semibold tracking-wider text-gray-700 uppercase text-md">
        {label}
      </p>
      <div className="flex flex-wrap mt-3 bg-gray-200 rounded-lg w-fit">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => setSelected(option.id)}
            className={`flex-1 py-2.5 cursor-pointer transition-all font-medium rounded duration-300 text-md px-6 m-1 ${
              selected === option.id
                ? option.activeClass
                : "bg-white border border-transparent"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
