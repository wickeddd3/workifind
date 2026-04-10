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

  if (!hasJobs) return <EmptyPlaceholder message="No jobs found" />;

  return (
    <>
      <Jobs jobs={results.data || []} />
      <JobsPagination
        currentPage={currentPage}
        totalPages={Math.ceil((totalResults.data || 0) / size)}
      />
    </>
  );
}
