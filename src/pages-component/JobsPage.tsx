import { JobsContent } from "@/features/job/search-jobs";
import { JobFilter } from "@/features/job/search-jobs/client";
import { JobSelected } from "@/widgets/selected-job";

export async function JobsPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  return (
    <div className="m-auto mb-10 space-y-6">
      <JobFilter searchParams={searchParams} />
      <div className="m-auto flex h-full max-w-7xl gap-4 px-3 md:flex-row">
        <section className="h-full w-full md:w-2/5">
          <JobsContent searchParams={searchParams} />
        </section>
        <section className="sticky top-4 hidden max-h-[calc(100vh-2rem)] overflow-y-auto rounded-xl border border-gray-100 bg-background p-6 shadow-card md:block md:w-3/5">
          <JobSelected slug={searchParams.job} key={searchParams.job} />
        </section>
      </div>
    </div>
  );
}
