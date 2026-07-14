export function ProfileSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Mirrors ProfileCard */}
      <div className="surface-card p-6 flex items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-gray-200" />
        <div className="space-y-2 flex-1">
          <div className="h-4 w-40 bg-gray-200 rounded" />
          <div className="h-3 w-28 bg-gray-200 rounded" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* Bio card */}
        <div className="surface-card p-6 space-y-2">
          <div className="h-3 w-16 bg-gray-200 rounded" />
          <div className="h-3 w-full bg-gray-200 rounded" />
          <div className="h-3 w-3/4 bg-gray-200 rounded" />
        </div>

        {/* Skills tracked card */}
        <div className="surface-card p-6 space-y-2">
          <div className="h-3 w-24 bg-gray-200 rounded" />
          <div className="h-7 w-10 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}
