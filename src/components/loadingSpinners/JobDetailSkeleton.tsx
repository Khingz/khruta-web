export function JobDetailSkeleton() {
  return (
    <div>
      {/* Header */}
      <div className="bg-[#F8FAFC] border-b border-[#E5E7EB]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          {/* Back link */}
          <div className="h-4 w-24 rounded bg-gray-200 animate-pulse mb-5" />

          <div className="flex items-start gap-5">
            {/* Company avatar */}
            <div className="h-16 w-16 rounded-2xl bg-gray-200 animate-pulse shrink-0" />

            <div className="flex-1 min-w-0 space-y-3">
              {/* Title */}
              <div className="h-7 w-2/3 rounded bg-gray-200 animate-pulse" />
              {/* Company name */}
              <div className="h-4 w-1/3 rounded bg-gray-100 animate-pulse" />

              {/* Meta row: location, type, posted */}
              <div className="flex flex-wrap gap-x-5 gap-y-2 pt-2">
                <div className="h-4 w-24 rounded bg-gray-100 animate-pulse" />
                <div className="h-4 w-20 rounded bg-gray-100 animate-pulse" />
                <div className="h-4 w-28 rounded bg-gray-100 animate-pulse" />
              </div>

              {/* Badge + salary row */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <div className="h-6 w-16 rounded-full bg-gray-100 animate-pulse" />
                <div className="h-5 w-24 rounded bg-gray-100 animate-pulse ml-auto" />
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-6 flex flex-wrap gap-2">
            <div className="h-11 w-32 rounded-lg bg-gray-200 animate-pulse" />
            <div className="h-11 w-28 rounded-lg bg-gray-100 animate-pulse" />
            <div className="h-11 w-24 rounded-lg bg-gray-100 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 grid lg:grid-cols-[1fr_280px] gap-10">
        <article className="space-y-8">
          {/* About the role */}
          <section className="space-y-3">
            <div className="h-5 w-40 rounded bg-gray-200 animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-gray-100 animate-pulse" />
              <div className="h-4 w-full rounded bg-gray-100 animate-pulse" />
              <div className="h-4 w-3/4 rounded bg-gray-100 animate-pulse" />
            </div>
          </section>

          {/* Responsibilities */}
          <section className="space-y-3">
            <div className="h-5 w-48 rounded bg-gray-200 animate-pulse" />
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-4 w-5/6 rounded bg-gray-100 animate-pulse" />
              ))}
            </div>
          </section>

          {/* Requirements */}
          <section className="space-y-3">
            <div className="h-5 w-56 rounded bg-gray-200 animate-pulse" />
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-4 w-4/5 rounded bg-gray-100 animate-pulse" />
              ))}
            </div>
          </section>

          {/* Benefits */}
          <section className="space-y-3">
            <div className="h-5 w-32 rounded bg-gray-200 animate-pulse" />
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-4 w-2/3 rounded bg-gray-100 animate-pulse" />
              ))}
            </div>
          </section>
        </article>

        <aside className="space-y-4">
          {/* Skills card */}
          <div className="surface-card p-5">
            <div className="h-5 w-16 rounded bg-gray-200 animate-pulse mb-3" />
            <div className="flex flex-wrap gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-6 w-14 rounded-full bg-gray-100 animate-pulse" />
              ))}
            </div>
          </div>

          {/* Job details card */}
          <div className="surface-card p-5">
            <div className="h-5 w-24 rounded bg-gray-200 animate-pulse mb-3" />
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex justify-between">
                  <div className="h-4 w-16 rounded bg-gray-100 animate-pulse" />
                  <div className="h-4 w-20 rounded bg-gray-100 animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
