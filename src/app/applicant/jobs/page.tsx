import ApplicantJobApplications from "@/components/applicant/ApplicantJobApplications";
import ApplicantJobApplicationsPagination from "@/components/applicant/ApplicantJobApplicationsPagination";
import ApplicantJobsEmptyPlaceholder from "@/components/applicant/ApplicantJobsEmptyPlaceholder";
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import {
  getJobApplications,
  getJobApplicationsCount,
} from "@/app/_services/applicant-job-applications";

interface PageProps {
  searchParams: {
    page?: string;
  };
}

export default async function Page({ searchParams: { page } }: PageProps) {
  const user = await currentUser();
  const role = user?.unsafeMetadata?.role;
  const userId = user?.id;
  const isApplicant = role === "APPLICANT";

  if (!isApplicant || !userId) return notFound();

  const jobsPerPage = 5;
  const currentPage = page ? parseInt(page) : 1;

  const [jobs, jobsCount] = await Promise.all([
    getJobApplications({ userId, jobsPerPage, page: currentPage }),
    getJobApplicationsCount(userId),
  ]);

  const hasJobs = jobs && jobs.length > 0;

  return (
    <main className="m-auto flex flex-col gap-6 px-0 md:px-4">
      <h1 className="px-4 text-md font-bold md:text-lg">Applied jobs</h1>
      <div className="flex flex-col gap-2">
        {hasJobs && (
          <>
            <ApplicantJobApplications jobApplications={jobs} />
            <ApplicantJobApplicationsPagination
              currentPage={currentPage}
              totalPages={Math.ceil(jobsCount / jobsPerPage)}
            />
          </>
        )}
        {!hasJobs && (
          <ApplicantJobsEmptyPlaceholder message="No job applications found" />
        )}
      </div>
    </main>
  );
}
