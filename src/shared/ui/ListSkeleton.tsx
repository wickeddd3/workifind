/**
 * List-only loading placeholder for Suspense boundaries nested inside a page
 * that has already rendered its own heading.
 *
 * The page-level `loading.tsx` placeholders include a heading bar because they
 * stand in for the entire route; this one deliberately does not.
 */
export function ListSkeleton({
  rows = 5,
  metaLines = 4,
}: {
  rows?: number;
  metaLines?: number;
}) {
  return (
    <div className="m-auto w-full animate-pulse px-4" aria-hidden="true">
      <div className="flex flex-col gap-2">
        {Array.from({ length: rows }).map((_, row) => (
          <div
            className="flex flex-col gap-2 rounded-lg bg-muted px-4 py-2"
            key={row}
          >
            <div className="flex items-center justify-between">
              <div className="h-7 w-2/5 rounded bg-muted" />
              <span className="h-7 w-7 rounded-lg bg-muted" />
            </div>
            <div className="flex flex-col gap-1">
              {Array.from({ length: metaLines }).map((_, line) => (
                <div className="flex w-1/4 items-center gap-1.5" key={line}>
                  <span className="h-4 w-4 rounded-full bg-muted" />
                  <p className="h-3 w-full rounded bg-muted" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
