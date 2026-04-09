import {
  getJobApplications,
  getJobApplicationsCount,
} from "@/entities/job-application/server";
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

  const [jobs, jobsCount] = await Promise.all([
    getJobApplications(userId, { size, page: currentPage }),
    getJobApplicationsCount(userId),
  ]);

  const hasJobs = jobs && jobs.length > 0;

  if (!hasJobs) return <EmptyPlaceholder message="No job applications found" />;

  return (
    <>
      <JobApplications jobApplications={jobs} />
      <JobApplicationsPagination
        currentPage={currentPage}
        totalPages={Math.ceil(jobsCount / size)}
      />
    </>
  );
}
