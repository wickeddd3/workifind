import { getSavedJobs, getSavedJobsCount } from "@/entities/saved-job";
import { EmptyPlaceholder } from "./EmptyPlaceholder";
import { SavedJobs } from "./SavedJobs";
import { SavedJobsPagination } from "./SavedJobsPagination";

export async function ApplicantSavedJobs({
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
    getSavedJobs(userId, { size, page: currentPage }),
    getSavedJobsCount(userId),
  ]);

  const hasJobs = jobs && jobs.length > 0;

  if (!hasJobs) return <EmptyPlaceholder message="No saved jobs found" />;

  return (
    <>
      <SavedJobs savedJobs={jobs} />
      <SavedJobsPagination
        currentPage={currentPage}
        totalPages={Math.ceil(jobsCount / size)}
      />
    </>
  );
}
