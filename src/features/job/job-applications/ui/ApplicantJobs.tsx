import {
  getJobApplicationsCountQuery,
  getJobApplicationsQuery,
} from "../api/job-application.queries";
import { EmptyPlaceholder } from "./EmptyPlaceholder";
import { JobApplications } from "./JobApplications";
import { JobApplicationsPagination } from "./JobApplicationsPagination";

export async function ApplicantJobs({
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
    getJobApplicationsQuery(userId, { size, page: currentPage }),
    getJobApplicationsCountQuery(userId),
  ]);

  const hasJobs = results.data && results.data?.length > 0;

  if (!hasJobs) return <EmptyPlaceholder message="No job applications found" />;

  return (
    <>
      <JobApplications jobApplications={results.data || []} />
      <JobApplicationsPagination
        currentPage={currentPage}
        totalPages={Math.ceil((totalResults.data || 0) / size)}
      />
    </>
  );
}
