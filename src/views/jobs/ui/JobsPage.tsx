import { Suspense } from "react";

import { JobResultsSkeleton, JobsContent } from "@/features/search-jobs";
import { JobFilter } from "@/features/search-jobs/client";
import { JobDetailSkeleton, JobSelected } from "@/widgets/selected-job";

export async function JobsPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  // Each panel streams independently, so the page no longer blocks on whichever
  // query is slower. The `key`s matter: without them React reuses the boundary
  // across navigations and the fallback never re-shows, so changing a filter
  // looks like nothing happened until the new results land.
  const resultsKey = JSON.stringify(searchParams);

  return (
    <div className="flex flex-col">
      {/* The search bar pins to the top: on a long results list the controls
          were otherwise scrolled away exactly when a refinement is wanted. */}
      <div className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-card/85">
        <JobFilter searchParams={searchParams} />
      </div>

      <div className="mx-auto mb-10 flex w-full max-w-7xl gap-5 px-3 pt-5 md:flex-row">
        <section className="h-full w-full md:w-[42%] lg:w-2/5">
          <Suspense key={resultsKey} fallback={<JobResultsSkeleton />}>
            <JobsContent searchParams={searchParams} />
          </Suspense>
        </section>

        {/* Sticks clear of the filter bar rather than under it: --filter-bar-h
            is published by JobFilter, which measures itself, since the bar's
            height moves with the breakpoint and with the refinements being
            open. The fallback matches its tallest resting state.

            `self-start` keeps the pane hugging its content — as a flex child it
            otherwise stretched to the full height of the results column and
            rendered a short posting as a mostly empty card. */}
        <section className="sticky top-[calc(var(--filter-bar-h,10.25rem)+1.25rem)] hidden max-h-[calc(100vh-var(--filter-bar-h,10.25rem)-2.5rem)] self-start overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-card md:block md:w-[58%] lg:w-3/5">
          <Suspense key={searchParams.job} fallback={<JobDetailSkeleton />}>
            <JobSelected slug={searchParams.job} />
          </Suspense>
        </section>
      </div>
    </div>
  );
}
