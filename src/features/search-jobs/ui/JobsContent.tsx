import { searchJobsCountQuery, searchJobsQuery } from "../api/job.queries";
import type { JobSort } from "../api/job.service";
import { ActiveFilters } from "./ActiveFilters";
import { EmptyPlaceholder } from "./EmptyPlaceholder";
import { JobResults } from "./JobResults";
import { JobResultsHeader } from "./JobResultsHeader";
import { JobResultsPagination } from "./JobResultsPagination";

/** Anything the URL offers that we do not implement falls back to recency. */
function parseSort(sort?: string): JobSort {
  return sort === "salary" ? "salary" : "newest";
}

export async function JobsContent({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const { q, page, employmentType, salary, locationType, sort } = searchParams;

  const jobsPerPage = 10;
  const currentPage = page ? parseInt(page) : 1;
  const filterParams = {
    query: q ?? "",
    employmentType: employmentType ?? "",
    salary: salary ?? "",
    locationType: locationType ?? "",
    size: jobsPerPage,
    page: currentPage,
    sort: parseSort(sort),
  };

  const [results, totalResults] = await Promise.all([
    searchJobsQuery(filterParams),
    searchJobsCountQuery(filterParams),
  ]);

  const jobs = results.data ?? [];
  const total = totalResults.data ?? 0;

  // The chips stay visible on an empty result set — they are both the
  // explanation for it and the way back out.
  return (
    <div className="flex flex-col gap-4">
      <ActiveFilters searchParams={searchParams} />

      {jobs.length === 0 ? (
        <EmptyPlaceholder />
      ) : (
        <>
          <JobResultsHeader totalResults={total} searchParams={searchParams} />
          <JobResults
            jobs={jobs}
            searchParams={searchParams}
            page={currentPage}
          />
          <JobResultsPagination
            currentPage={currentPage}
            totalPages={Math.ceil(total / jobsPerPage)}
            searchParams={searchParams}
          />
        </>
      )}
    </div>
  );
}
