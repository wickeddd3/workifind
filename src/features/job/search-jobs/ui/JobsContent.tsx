import { filterJobs, filterJobsCount } from "../model/search-jobs";
import { JobResults } from "./JobResults";
import { JobResultsPagination } from "./JobResultsPagination";
import { EmptyPlaceholder } from "./EmptyPlaceholder";

export async function JobsContent({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const { q, page, employmentType, salary, locationType } = searchParams;

  const jobsPerPage = 10;
  const currentPage = page ? parseInt(page) : 1;
  const filterParams = {
    searchQuery: q ?? "",
    employmentType: employmentType ?? "",
    salary: salary ?? "",
    locationType: locationType ?? "",
    size: jobsPerPage,
    page: currentPage,
  };

  const [results, jobsCount] = await Promise.all([
    filterJobs(filterParams),
    filterJobsCount(filterParams),
  ]);

  const hasResults = results && results.length > 0;

  if (!hasResults) return <EmptyPlaceholder />;

  return (
    <div className="flex flex-col gap-3">
      <JobResults
        jobs={results}
        searchParams={searchParams}
        page={currentPage}
      />
      <JobResultsPagination
        currentPage={currentPage}
        totalPages={Math.ceil(jobsCount / jobsPerPage)}
        searchParams={searchParams}
      />
    </div>
  );
}
