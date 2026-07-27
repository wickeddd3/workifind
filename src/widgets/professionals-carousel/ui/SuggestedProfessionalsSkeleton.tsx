/**
 * Placeholder for `SuggestedProfessionals`. Card dimensions match
 * `ProfessionalCard` and the 276px carousel slide width.
 */
export function SuggestedProfessionalsSkeleton() {
  return (
    <section className="flex flex-col space-y-2 py-6" aria-hidden="true">
      <div className="h-6 w-60 animate-pulse rounded bg-gray-100" />
      <div className="h-4 w-80 animate-pulse rounded bg-gray-100" />
      <div className="flex gap-4 overflow-hidden py-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-[130px] w-[276px] shrink-0 animate-pulse rounded-xl border border-gray-100 bg-white shadow-card"
          />
        ))}
      </div>
    </section>
  );
}
