/**
 * Placeholder for `ProfessionalSelected`. Mirrors the header block — round
 * avatar, name, profession, contact row — followed by a couple of sections.
 */
export function ProfessionalDetailSkeleton() {
  return (
    <div className="flex flex-col gap-6" aria-hidden="true">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 shrink-0 animate-pulse rounded-full bg-muted md:h-16 md:w-16" />
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <div className="h-6 w-1/2 animate-pulse rounded bg-muted" />
            <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="h-4 w-40 animate-pulse rounded bg-muted" />
          <div className="h-4 w-28 animate-pulse rounded bg-muted" />
        </div>
      </div>

      {Array.from({ length: 3 }).map((_, section) => (
        <div key={section} className="flex flex-col gap-3">
          <div className="h-3 w-24 animate-pulse rounded bg-muted" />
          <div className="flex flex-col gap-2">
            {Array.from({ length: 3 }).map((_, line) => (
              <div
                key={line}
                className="h-4 animate-pulse rounded bg-muted"
                style={{ width: line === 2 ? "60%" : "100%" }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
