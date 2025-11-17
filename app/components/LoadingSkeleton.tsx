export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-4 bg-gray-700 rounded w-3/4"></div>
      <div className="h-4 bg-gray-700 rounded w-1/2"></div>
      <div className="h-4 bg-gray-700 rounded w-5/6"></div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="h-24 bg-gray-700 rounded"></div>
        <div className="h-24 bg-gray-700 rounded"></div>
        <div className="h-24 bg-gray-700 rounded"></div>
      </div>
    </div>
  );
}
