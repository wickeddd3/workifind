import {
  JobFilter,
  JobsContent,
  JobSelected,
} from "@/features/job/search-jobs";

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
        <section className="sticky top-0 hidden h-fit rounded-xl bg-background md:block md:w-3/5">
          <JobSelected slug={searchParams.job} />
        </section>
      </div>
    </div>
  );
}
