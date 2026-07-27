/**
 * Placeholder for `JobSelected`. Mirrors the `JobHeader` block — 80px logo,
 * title, company, meta pills — followed by description lines.
 */
export function JobDetailSkeleton() {
  return (
    <div className="flex flex-col gap-4" aria-hidden="true">
      <div className="flex items-start gap-4">
        <div className="h-16 w-16 shrink-0 animate-pulse rounded-xl bg-muted md:h-20 md:w-20" />
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="h-7 w-3/4 animate-pulse rounded bg-muted" />
          <div className="h-5 w-1/3 animate-pulse rounded bg-muted" />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-7 w-24 animate-pulse rounded-full bg-muted"
          />
        ))}
      </div>
      <div className="flex flex-col gap-2 pt-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-4 animate-pulse rounded bg-muted"
            style={{ width: i % 3 === 2 ? "70%" : "100%" }}
          />
        ))}
      </div>
    </div>
  );
}
