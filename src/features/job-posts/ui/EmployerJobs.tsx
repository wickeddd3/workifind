import { getJobsCountQuery, getJobsQuery } from "../api/job.queries";
import { EmptyPlaceholder } from "./EmptyPlaceholder";
import { Jobs } from "./Jobs";
import { JobsPagination } from "./JobsPagination";

export async function EmployerJobs({
  userId,
  searchParams,
}: {
  userId: string;
  searchParams: Record<string, string>;
}) {
  const { page } = searchParams;
  const size = 5;
  const currentPage = page ? parseInt(page) : 1;

  const [results, totalResults] = await Promise.all([
    getJobsQuery(userId, { size, page: currentPage }),
    getJobsCountQuery(userId),
  ]);

  const hasJobs = results.data && results.data?.length > 0;

  if (!hasJobs)
    return <EmptyPlaceholder message="You haven't posted any jobs yet" />;

  const total = totalResults.data || 0;

  return (
    // Same frame as the applicant's applied and saved lists: a count, the rows,
    // the pager.
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">
        <span className="tabular font-semibold text-foreground">{total}</span>{" "}
        {total === 1 ? "job post" : "job posts"}
      </p>
      <Jobs jobs={results.data || []} />
      <JobsPagination
        currentPage={currentPage}
        totalPages={Math.ceil(total / size)}
      />
    </div>
  );
}
