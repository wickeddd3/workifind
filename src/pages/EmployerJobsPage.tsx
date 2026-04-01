import EmployerJobs from "@/components/employer/EmployerJobs";
import EmployerJobsEmptyPlaceholder from "@/components/employer/EmployerJobsEmptyPlaceholder";
import EmployerJobsPagination from "@/components/employer/EmployerJobsPagination";
import { getJobs, getJobsCount } from "@/app/_services/employer-jobs";
import { notFound } from "next/navigation";
import { getAuthUser } from "@/shared/lib/clerk";

export async function EmployerJobsPage({
  searchParams: { page },
}: {
  searchParams: Record<string, string>;
}) {
  const { user, role } = await getAuthUser();
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
          <>
            <EmployerJobs jobs={jobs} />
            <EmployerJobsPagination
              currentPage={currentPage}
              totalPages={Math.ceil(jobsCount / jobsPerPage)}
            />
          </>
        )}
        {!hasJobs && <EmployerJobsEmptyPlaceholder message="No jobs found" />}
      </div>
    </main>
  );
}
