import { Pagination } from "@/shared/ui/Pagination";

import { buildJobsUrl, type JobSearchParams } from "../lib/job-search-url";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  searchParams: JobSearchParams;
}

/**
 * Thin binding of the shared pager to the jobs route.
 *
 * `scroll={false}` because this list sits beside a detail pane — jumping to
 * the top on a page change would move the posting the reader is looking at.
 */
export function JobResultsPagination({
  currentPage,
  totalPages,
  searchParams,
}: PaginationProps) {
  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      getPageHref={(page) =>
        buildJobsUrl(searchParams, { page: page.toString() })
      }
      label="Job results pages"
      scroll={false}
    />
  );
}
