import { getJobs, getJobsCount } from "@/entities/job/server";
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

  const [jobs, jobsCount] = await Promise.all([
    getJobs(userId, { size, page: currentPage }),
    getJobsCount(userId),
  ]);

  const hasJobs = jobs && jobs.length > 0;

  if (!hasJobs) return <EmptyPlaceholder message="No jobs found" />;

  return (
    <>
      <Jobs jobs={jobs} />
      <JobsPagination
        currentPage={currentPage}
        totalPages={Math.ceil(jobsCount / size)}
      />
    </>
  );
}
