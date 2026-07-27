import { Suspense } from "react";

import { JobResultsSkeleton, JobsContent } from "@/features/job/search-jobs";
import { JobFilter } from "@/features/job/search-jobs/client";
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
    <div className="m-auto mb-10 space-y-6">
      <JobFilter searchParams={searchParams} />
      <div className="m-auto flex h-full max-w-7xl gap-4 px-3 md:flex-row">
        <section className="h-full w-full md:w-2/5">
          <Suspense key={resultsKey} fallback={<JobResultsSkeleton />}>
            <JobsContent searchParams={searchParams} />
          </Suspense>
        </section>
        <section className="sticky top-4 hidden max-h-[calc(100vh-2rem)] overflow-y-auto rounded-xl border border-gray-100 bg-background p-6 shadow-card md:block md:w-3/5">
          <Suspense key={searchParams.job} fallback={<JobDetailSkeleton />}>
            <JobSelected slug={searchParams.job} />
          </Suspense>
        </section>
      </div>
    </div>
  );
}
