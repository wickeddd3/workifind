import EmployerJobs from "@/components/employer/EmployerJobs";
import EmployerJobsEmptyPlaceholder from "@/components/employer/EmployerJobsEmptyPlaceholder";
import EmployerJobsLoadingPlaceholder from "@/components/employer/EmployerJobsLoadingPlaceholder";
import EmployerJobsPagination from "@/components/employer/EmployerJobsPagination";
import { Suspense } from "react";
import { getJobs, getJobsCount } from "@/app/_services/employer-jobs";
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

interface PageProps {
  searchParams: {
    page?: string;
  };
}

export default async function Page({ searchParams: { page } }: PageProps) {
  const user = await currentUser();
  const role = user?.unsafeMetadata?.role;
  const userId = user?.id;
  const isEmployer = role === "EMPLOYER";

  if (!isEmployer || !userId) return notFound();

  const jobsPerPage = 5;
  const currentPage = page ? parseInt(page) : 1;

  const [jobs, jobsCount] = await Promise.all([
    getJobs({ userId, jobsPerPage, page: currentPage }),
    getJobsCount(userId),
  ]);

  const hasJobs = jobs && jobs.length > 0;

  return (
    <main className="m-auto flex flex-col gap-6 px-0 md:px-4">
      <h1 className="px-4 text-md font-bold md:text-lg">My jobs</h1>
      <div className="flex flex-col gap-2">
        {hasJobs && (
          <Suspense fallback={<EmployerJobsLoadingPlaceholder />}>
            <EmployerJobs jobs={jobs} />
            <EmployerJobsPagination
              currentPage={currentPage}
              totalPages={Math.ceil(jobsCount / jobsPerPage)}
            />
          </Suspense>
        )}
        {!hasJobs && <EmployerJobsEmptyPlaceholder message="No jobs found" />}
      </div>
    </main>
  );
}
