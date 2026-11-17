export default function PrioritySelector({
  priority,
  setPriority,
  status,
  setStatus,
}) {
  const handlePriority = (id) => {
    setPriority(id);
  };
  return (
    <div>
      <p className="font-semibold tracking-wider text-gray-700 uppercase text-md">
        Prioridad
      </p>
      <div className="grid self-start grid-cols-2 mt-3 bg-gray-200 rounded-lg w-fit">
        {priorityData.map((data) => (
          <button
            type="button"
            id={data.id}
            className={`py-2.5 cursor-pointer transition-all text-[#0A3960] font-medium rounded duration-300 text-md px-6 m-1 ${priority === data.id ? data.activeClass : "bg-white border border-transparent"} `}
            onClick={() => handlePriority(data.id)}
          >
            {data.label}
          </button>
        ))}
      </div>
    </div>
  );
}
