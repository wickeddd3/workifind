/**
 * A paginated list of jobs, before it arrives.
 *
 * Shaped like `JobCard`, because it stands in for one: same 2xl radius, same
 * card surface and border, same 48px logo, and the same four rows of content
 * beside it. The placeholder it replaces was a stack of `bg-muted` blocks
 * inside `bg-muted` rows — the two surfaces are the same colour, so the shapes
 * were invisible and the whole list read as a run of grey bars.
 *
 * Lives with the entity so the card and its skeleton stay the same shape. They
 * had already drifted once, when the card grew a salary line and a logo that
 * the skeleton never got.
 *
 * The pager is deliberately absent: it hides itself below two pages, and a
 * skeleton control that vanishes on load is worse than one that was never
 * promised.
 */
export function JobListSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="flex animate-pulse flex-col gap-3" aria-hidden="true">
      {/* The "N applications" count above the list. */}
      <span className="h-4 w-28 rounded bg-muted" />

      <div className="flex flex-col gap-3">
        {Array.from({ length: rows }).map((_, row) => (
          <div
            className="flex gap-3.5 rounded-2xl border border-border bg-card p-4 shadow-soft"
            key={row}
          >
            {/* Company logo. */}
            <span className="h-12 w-12 shrink-0 rounded-xl bg-muted" />

            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <div className="flex flex-col gap-1.5">
                {/* Title, then company name. */}
                <span className="h-4 w-1/2 rounded bg-muted" />
                <span className="h-3 w-1/3 rounded bg-muted" />
              </div>

              {/* Salary — the one line carrying weight in the real card. */}
              <span className="h-4 w-28 rounded bg-muted" />

              {/* Employment type, location type, and the trailing date. */}
              <div className="flex items-center gap-3">
                <span className="h-3 w-20 rounded bg-muted" />
                <span className="h-3 w-16 rounded bg-muted" />
                <span className="ml-auto h-3 w-24 rounded bg-muted" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
