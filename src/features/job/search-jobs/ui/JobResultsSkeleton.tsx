/**
 * Placeholder for `JobsContent`. Mirrors the `JobItem` card — 48px logo, two
 * text lines, a meta row — at the same page size, so results replace it without
 * shifting the column.
 */
export function JobResultsSkeleton() {
  return (
    <div className="flex flex-col gap-3" aria-hidden="true">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="flex gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-soft"
        >
          <div className="h-12 w-12 shrink-0 animate-pulse rounded-lg bg-gray-100" />
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <div className="h-4 w-3/5 animate-pulse rounded bg-gray-100" />
            <div className="h-3 w-2/5 animate-pulse rounded bg-gray-100" />
            <div className="flex gap-3 pt-1">
              <div className="h-3 w-16 animate-pulse rounded bg-gray-100" />
              <div className="h-3 w-20 animate-pulse rounded bg-gray-100" />
              <div className="h-3 w-14 animate-pulse rounded bg-gray-100" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
