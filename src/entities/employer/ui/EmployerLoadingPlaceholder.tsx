/**
 * Stands in for the whole company profile route.
 *
 * Mirrors that page's two columns and their widths, so the rail and the
 * section stack do not shift sideways once the data lands.
 */
export function EmployerLoadingPlaceholder() {
  return (
    <div
      className="mx-auto my-6 w-full max-w-6xl animate-pulse px-4 md:my-10"
      aria-hidden="true"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-6">
        <div className="flex flex-col gap-4 lg:w-72 lg:shrink-0">
          {/* Identity card: logo, company name, contact links, edit button. */}
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-5">
            <span className="h-16 w-16 rounded-2xl bg-muted" />
            <span className="h-5 w-2/3 rounded bg-muted" />
            <div className="flex w-full flex-col gap-2">
              {Array.from({ length: 2 }).map((_, index) => (
                <span className="h-4 w-full rounded bg-muted" key={index} />
              ))}
            </div>
            <span className="h-9 w-full rounded-lg bg-muted" />
          </div>

          {/* Completeness meter. */}
          <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5">
            <span className="h-4 w-2/3 rounded bg-muted" />
            <span className="h-1.5 w-full rounded-full bg-muted" />
          </div>

          {/* Section jump links — desktop only, like the nav itself. */}
          <div className="hidden flex-col gap-2 rounded-2xl border border-border bg-card p-4 lg:flex">
            {Array.from({ length: 4 }).map((_, index) => (
              <span className="h-4 w-3/4 rounded bg-muted" key={index} />
            ))}
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-4 lg:max-w-3xl">
          {Array.from({ length: 4 }).map((_, section) => (
            <div
              className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 md:p-6"
              key={section}
            >
              <span className="h-5 w-40 rounded bg-muted" />
              <div className="flex flex-col gap-2">
                <span className="h-4 w-full rounded bg-muted" />
                <span className="h-4 w-5/6 rounded bg-muted" />
                <span className="h-4 w-2/3 rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
