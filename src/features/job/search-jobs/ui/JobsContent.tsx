import { searchJobsCountQuery, searchJobsQuery } from "../api/job.queries";
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
    query: q ?? "",
    employmentType: employmentType ?? "",
    salary: salary ?? "",
    locationType: locationType ?? "",
    size: jobsPerPage,
    page: currentPage,
  };

  const [results, totalResults] = await Promise.all([
    searchJobsQuery(filterParams),
    searchJobsCountQuery(filterParams),
  ]);

  const hasResults = results.data && results.data?.length > 0;

  if (!hasResults) return <EmptyPlaceholder />;

  return (
    <div className="flex flex-col gap-3">
      <JobResults
        jobs={results.data || []}
        searchParams={searchParams}
        page={currentPage}
      />
      <JobResultsPagination
        currentPage={currentPage}
        totalPages={Math.ceil((totalResults.data || 0) / jobsPerPage)}
        searchParams={searchParams}
      />
    </div>
  );
}
