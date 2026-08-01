/**
 * Stands in for the whole job-posts route, heading included — the page-level
 * `loading.tsx` replaces everything, unlike the nested `ListSkeleton`.
 *
 * Shaped like the rows it replaces: a logo, a title, a company and a meta line.
 */
export function LoadingPlaceholder() {
  return (
    <div
      className="mx-auto my-6 flex w-full max-w-3xl animate-pulse flex-col gap-4 px-4 md:my-10"
      aria-hidden="true"
    >
      <div className="flex items-end justify-between gap-3">
        <div className="flex w-2/5 flex-col gap-2">
          <div className="h-6 w-full rounded bg-muted" />
          <div className="h-4 w-3/4 rounded bg-muted" />
        </div>
        <div className="h-8 w-24 rounded-lg bg-muted" />
      </div>
      <div className="flex flex-col gap-3">
        {Array.from({ length: 5 }).map((_, row) => (
          <div
            className="flex gap-3.5 rounded-2xl border border-border bg-card p-4"
            key={row}
          >
            <div className="h-12 w-12 shrink-0 rounded-lg bg-muted" />
            <div className="flex flex-1 flex-col gap-2">
              <div className="h-4 w-2/5 rounded bg-muted" />
              <div className="h-3 w-1/4 rounded bg-muted" />
              <div className="h-3 w-3/5 rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
