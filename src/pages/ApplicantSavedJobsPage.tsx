import ApplicantSavedJobs from "@/components/applicant/ApplicantSavedJobs";
import ApplicantSavedJobsPagination from "@/components/applicant/ApplicantSavedJobsPagination";
import ApplicantJobsEmptyPlaceholder from "@/components/applicant/ApplicantJobsEmptyPlaceholder";
import { notFound } from "next/navigation";
import {
  getSavedJobs,
  getSavedJobsCount,
} from "@/app/_services/applicant-saved-jobs";
import { getAuthUser } from "@/shared/lib/clerk";

export async function ApplicantSavedJobsPage({
  searchParams: { page },
}: {
  searchParams: Record<string, string>;
}) {
  const { user, role } = await getAuthUser();
  const userId = user?.id;
  const isApplicant = role === "APPLICANT";

  if (!isApplicant || !userId) return notFound();

  const jobsPerPage = 5;
  const currentPage = page ? parseInt(page) : 1;

  const [jobs, jobsCount] = await Promise.all([
    getSavedJobs({ userId, jobsPerPage, page: currentPage }),
    getSavedJobsCount(userId),
  ]);

  const hasJobs = jobs && jobs.length > 0;

  return (
    <main className="m-auto flex flex-col gap-6 px-0 md:px-4">
      <h1 className="px-4 text-md font-bold md:text-lg">Saved jobs</h1>
      <div className="flex flex-col gap-2">
        {hasJobs && (
          <>
            <ApplicantSavedJobs savedJobs={jobs} />
            <ApplicantSavedJobsPagination
              currentPage={currentPage}
              totalPages={Math.ceil(jobsCount / jobsPerPage)}
            />
          </>
        )}
        {!hasJobs && (
          <ApplicantJobsEmptyPlaceholder message="No saved jobs found" />
        )}
      </div>
    </main>
  );
}
