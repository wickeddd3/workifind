/**
 * Placeholder for `LatestJobs`. Holds the same grid and card height so the
 * sections below it do not jump when the jobs resolve.
 */
export function LatestJobsSkeleton() {
  return (
    <section
      className="flex w-full flex-col gap-4 py-2 md:py-4"
      aria-hidden="true"
    >
      <div className="flex flex-col gap-2">
        <div className="h-5 w-40 animate-pulse rounded bg-muted" />
        <div className="h-4 w-64 animate-pulse rounded bg-muted" />
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex gap-3.5 rounded-2xl border border-border bg-card p-4 shadow-soft"
          >
            <div className="h-12 w-12 shrink-0 animate-pulse rounded-xl bg-muted" />
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <div className="h-4 w-3/5 animate-pulse rounded bg-muted" />
              <div className="h-3 w-2/5 animate-pulse rounded bg-muted" />
              <div className="h-4 w-24 animate-pulse rounded bg-muted" />
              <div className="h-3 w-32 animate-pulse rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
