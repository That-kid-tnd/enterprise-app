export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-muted rounded-lg p-4 ${className}`}>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-2" />
      <div className="h-8 bg-gray-300 rounded w-3/4" />
    </div>
  );
}
