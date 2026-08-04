/**
 * Placeholder for `SearchContent`. Mirrors the result card — 56px logo, name
 * and jobs badge, industry, a two-line summary and the meta row — at the same
 * page size, so results replace it without shifting the column.
 */
export function SearchResultsSkeleton() {
  return (
    <div className="flex flex-col gap-4" aria-hidden="true">
      <div className="flex items-center justify-between">
        <div className="h-4 w-24 animate-pulse rounded bg-muted" />
        <div className="h-9 w-40 animate-pulse rounded-md bg-muted" />
      </div>

      <div className="flex flex-col gap-3">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="flex gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft"
          >
            <div className="h-14 w-14 shrink-0 animate-pulse rounded-xl bg-muted" />
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <div className="flex items-start justify-between gap-3">
                <div className="h-4 w-2/5 animate-pulse rounded bg-muted" />
                <div className="h-6 w-16 shrink-0 animate-pulse rounded-full bg-muted" />
              </div>
              <div className="h-3 w-1/3 animate-pulse rounded bg-muted" />
              <div className="h-3 w-full animate-pulse rounded bg-muted" />
              <div className="flex gap-3">
                <div className="h-3 w-20 animate-pulse rounded bg-muted" />
                <div className="h-3 w-24 animate-pulse rounded bg-muted" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
