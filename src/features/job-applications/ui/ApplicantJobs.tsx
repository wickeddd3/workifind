import {
  getJobApplicationsCountQuery,
  getJobApplicationsQuery,
} from "../api/job-application.queries";
import { AppliedJobs } from "./AppliedJobs";
import { AppliedJobsPagination } from "./AppliedJobsPagination";
import { EmptyPlaceholder } from "./EmptyPlaceholder";

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

  if (!hasJobs)
    return <EmptyPlaceholder message="You haven't applied to any jobs yet" />;

  return (
    <>
      <AppliedJobs jobApplications={results.data || []} />
      <AppliedJobsPagination
        currentPage={currentPage}
        totalPages={Math.ceil((totalResults.data || 0) / size)}
      />
    </>
  );
}
