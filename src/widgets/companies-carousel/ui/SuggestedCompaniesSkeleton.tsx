/**
 * Placeholder for `SuggestedCompanies`. Card dimensions match `CompanyCard`
 * and the 300px carousel slide width so the row does not resize on swap.
 */
export function SuggestedCompaniesSkeleton() {
  return (
    <section
      className="flex w-full flex-col space-y-2 py-2 md:py-4"
      aria-hidden="true"
    >
      <div className="h-6 w-56 animate-pulse rounded bg-muted" />
      <div className="h-4 w-80 animate-pulse rounded bg-muted" />
      <div className="flex gap-4 overflow-hidden py-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-[200px] w-[300px] shrink-0 animate-pulse rounded-xl border border-border bg-card shadow-card md:h-[208px]"
          />
        ))}
      </div>
    </section>
  );
}
