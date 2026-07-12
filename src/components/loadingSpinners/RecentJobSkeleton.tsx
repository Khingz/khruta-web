export function RecentJobsSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="surface-card p-5 space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gray-200 animate-pulse shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 rounded bg-gray-200 animate-pulse" />
              <div className="h-3.5 w-1/2 rounded bg-gray-100 animate-pulse" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-3.5 w-full rounded bg-gray-100 animate-pulse" />
            <div className="h-3.5 w-2/3 rounded bg-gray-100 animate-pulse" />
          </div>
          <div className="flex gap-2 pt-1">
            <div className="h-6 w-16 rounded-full bg-gray-100 animate-pulse" />
            <div className="h-6 w-16 rounded-full bg-gray-100 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}
