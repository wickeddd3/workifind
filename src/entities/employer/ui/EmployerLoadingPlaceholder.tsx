/**
 * Stands in for the whole company profile route.
 *
 * Shaped like the page it replaces — a completeness bar, a header card, then a
 * stack of section cards — so the layout does not jump when the data lands.
 */
export function EmployerLoadingPlaceholder() {
  return (
    <div
      className="mx-auto my-6 flex w-full max-w-3xl animate-pulse flex-col gap-4 px-4 md:my-10"
      aria-hidden="true"
    >
      <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft">
        <div className="flex items-start justify-between gap-3">
          <div className="flex w-2/3 flex-col gap-2">
            <div className="h-4 w-1/3 rounded bg-muted" />
            <div className="h-3 w-full rounded bg-muted" />
          </div>
          <div className="h-6 w-12 rounded bg-muted" />
        </div>
        <div className="h-1.5 w-full rounded-full bg-muted" />
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-card md:p-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 shrink-0 rounded-2xl bg-muted" />
          <div className="h-6 w-2/5 rounded bg-muted" />
        </div>
        <div className="flex gap-4">
          {Array.from({ length: 2 }).map((_, index) => (
            <div className="h-4 w-1/4 rounded bg-muted" key={index} />
          ))}
        </div>
      </div>

      {Array.from({ length: 4 }).map((_, section) => (
        <div
          className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-card md:p-6"
          key={section}
        >
          <div className="h-5 w-1/4 rounded bg-muted" />
          <div className="h-16 w-full rounded bg-muted" />
        </div>
      ))}
    </div>
  );
}
