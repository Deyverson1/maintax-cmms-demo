export default function SkeletonCard({ size }) {
  return (
    <div className="p-6 bg-white rounded-xl animate-pulse">
      <div className="flex justify-between mb-6">
        <div className="w-24 h-4 bg-gray-200 rounded" />
        <div className="w-20 h-4 bg-gray-200 rounded-full" />
      </div>
      <div className="w-3/4 h-5 mb-2 bg-gray-200 rounded" />
      <div className="w-1/2 h-4 mb-6 bg-gray-200 rounded" />
      <div className="flex justify-between">
        <div className="w-32 h-4 bg-gray-200 rounded" />
        <div className="w-20 h-4 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
