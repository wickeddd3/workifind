import JobFilter from "@/components/jobs/JobFilter";
import JobResults from "@/components/jobs/JobResults";
import JobResultsEmptyPlaceholder from "@/components/jobs/JobResultsEmptyPlaceholder";
import JobResultsPagination from "@/components/jobs/JobResultsPagination";
import JobSelected from "@/components/jobs/JobSelected";
import { JobFilterValues } from "@/lib/validation";
import { filterJobs, filterJobsCount } from "@/app/_services/jobs";

interface PageProps {
  searchParams: {
    q?: string;
    employmentType?: string;
    salary?: string;
    locationType?: string;
    job?: string;
    page?: string;
  };
}

export default async function Page({
  searchParams: { q, employmentType, salary, locationType, job, page },
}: PageProps) {
  const filterValues: JobFilterValues = {
    q,
    employmentType,
    salary,
    locationType,
  };
  const jobsPerPage = 10;
  const currentPage = page ? parseInt(page) : 1;
  const jobSlug = job;
  const query = {
    searchQuery: q ?? "",
    employmentType: employmentType ?? "",
    salary: salary ?? "",
    locationType: locationType ?? "",
  };
  const filterJobsQuery = {
    ...query,
    jobsPerPage,
    page: currentPage,
  };

  const [jobs, jobsCount] = await Promise.all([
    filterJobs(filterJobsQuery),
    filterJobsCount(query),
  ]);

  const hasJobs = jobs && jobs.length > 0;

  return (
    <main className="m-auto mb-10 space-y-6">
      <JobFilter defaultValues={filterValues} />
      <section className="m-auto flex h-full max-w-7xl gap-4 px-3 md:flex-row">
        <div className="w-full space-y-4 py-2 md:w-2/5">
          <JobResults
            jobs={jobs}
            filterValues={filterValues}
            page={currentPage}
          />
          {hasJobs && (
            <>
              <JobResultsEmptyPlaceholder />
              <JobResultsPagination
                currentPage={currentPage}
                totalPages={Math.ceil(jobsCount / jobsPerPage)}
                filterValues={filterValues}
                jobSlug={jobSlug}
              />
            </>
          )}
        </div>
        <JobSelected jobSlug={job} />
      </section>
    </main>
  );
}
