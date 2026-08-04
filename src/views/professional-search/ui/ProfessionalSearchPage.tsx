import { Suspense } from "react";

import {
  PROFESSIONAL_FILTER_KEYS,
  SearchContent,
  SearchResultsSkeleton,
} from "@/features/search-professionals";
import { ProfessionalFilter } from "@/features/search-professionals/client";
import {
  ProfessionalDetailSkeleton,
  ProfessionalSelected,
} from "@/widgets/selected-professional";

export async function ProfessionalSearchPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  // Open to everyone. What changes with the visitor is how much of a profile
  // comes back — see `profileVisibility` in the applicant entity — not whether
  // the directory answers at all.
  //
  // Each panel streams independently. The results key excludes `professional`
  // for the same reason the jobs page excludes `job`: that param only picks
  // what the pane shows, and keying the list on it would tear the list down and
  // re-run its skeleton on every card click.
  const resultsKey = JSON.stringify(
    PROFESSIONAL_FILTER_KEYS.map((key) => searchParams[key]),
  );

  return (
    <div className="flex flex-col">
      <div className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-card/85">
        <ProfessionalFilter searchParams={searchParams} />
      </div>

      <div className="mx-auto mb-10 flex w-full max-w-7xl gap-5 px-3 pt-5 md:flex-row">
        <section className="h-full w-full md:w-[42%] lg:w-2/5">
          <Suspense key={resultsKey} fallback={<SearchResultsSkeleton />}>
            <SearchContent searchParams={searchParams} />
          </Suspense>
        </section>

        {/* Sticks clear of the filter bar, which publishes its measured height
            as --filter-bar-h. See the note on the jobs page: `self-start` keeps
            the pane hugging its content, and `no-scrollbar` hides the inner
            bar while leaving the pane scrollable. */}
        <section className="no-scrollbar sticky top-[calc(var(--filter-bar-h,10.25rem)+1.25rem)] hidden max-h-[calc(100vh-var(--filter-bar-h,10.25rem)-2.5rem)] self-start overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-card md:block md:w-[58%] lg:w-3/5">
          <Suspense
            key={searchParams.professional}
            fallback={<ProfessionalDetailSkeleton />}
          >
            <ProfessionalSelected id={searchParams.professional} />
          </Suspense>
        </section>
      </div>
    </div>
  );
}
