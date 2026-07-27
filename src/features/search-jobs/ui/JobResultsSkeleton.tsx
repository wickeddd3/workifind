/**
 * Placeholder for `JobsContent`. Mirrors the `JobItem` card — 48px logo, a
 * title/company pair, the salary line and the meta row — at the same page size,
 * so results replace it without shifting the column.
 */
export function JobResultsSkeleton() {
  return (
    <div className="flex flex-col gap-4" aria-hidden="true">
      {/* Stands in for the results header, which is part of the layout the
          skeleton has to reserve room for. */}
      <div className="flex items-center justify-between">
        <div className="h-4 w-24 animate-pulse rounded bg-muted" />
        <div className="h-9 w-36 animate-pulse rounded-md bg-muted" />
      </div>

      <div className="flex flex-col gap-3">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="flex gap-3.5 rounded-2xl border border-border bg-card p-4 shadow-soft"
          >
            <div className="h-12 w-12 shrink-0 animate-pulse rounded-xl bg-muted" />
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <div className="h-4 w-3/5 animate-pulse rounded bg-muted" />
              <div className="h-3 w-2/5 animate-pulse rounded bg-muted" />
              <div className="h-4 w-28 animate-pulse rounded bg-muted" />
              <div className="flex gap-3">
                <div className="h-3 w-16 animate-pulse rounded bg-muted" />
                <div className="h-3 w-20 animate-pulse rounded bg-muted" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
