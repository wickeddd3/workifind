import type { JobSearchParams } from "../lib/job-search-url";
import { JobSortSelect } from "./JobSortSelect";

/**
 * The count and ordering controls above the results list.
 *
 * A job board has to answer "how many, and in what order" before anything else
 * — the list previously opened straight onto cards with neither stated.
 */
export function JobResultsHeader({
  totalResults,
  searchParams,
}: {
  totalResults: number;
  searchParams: JobSearchParams;
}) {
  const formattedTotal = new Intl.NumberFormat("en-US").format(totalResults);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-muted-foreground">
        <span className="tabular font-semibold text-foreground">
          {formattedTotal}
        </span>{" "}
        {totalResults === 1 ? "job" : "jobs"}
        {searchParams.q && (
          <>
            {" "}
            for{" "}
            <span className="font-medium text-foreground">
              {searchParams.q}
            </span>
          </>
        )}
      </p>
      <JobSortSelect searchParams={searchParams} />
    </div>
  );
}
