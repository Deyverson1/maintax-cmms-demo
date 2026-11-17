export default function MetadataList({ metadata }) {
  return (
    <div className="flex flex-col justify-between w-full gap-2 px-8 mt-2">
      {metadata.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between w-full gap-2 pb-2 mb-2 "
        >
          <p className="text-sm font-semibold tracking-wide text-gray-500 uppercase">
            {item.label}:
          </p>
          <p className="text-[#1B4F72]  tracking-tight font-bold">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}
