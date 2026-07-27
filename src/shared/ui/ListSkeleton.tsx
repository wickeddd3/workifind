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
            className="flex flex-col gap-2 rounded-lg bg-gray-50 px-4 py-2"
            key={row}
          >
            <div className="flex items-center justify-between">
              <div className="h-7 w-2/5 rounded bg-gray-200" />
              <span className="h-7 w-7 rounded-lg bg-gray-200" />
            </div>
            <div className="flex flex-col gap-1">
              {Array.from({ length: metaLines }).map((_, line) => (
                <div className="flex w-1/4 items-center gap-1.5" key={line}>
                  <span className="h-4 w-4 rounded-full bg-gray-200" />
                  <p className="h-3 w-full rounded bg-gray-200" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
