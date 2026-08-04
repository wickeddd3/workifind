import { Pagination } from "@/shared/ui/Pagination";

import {
  buildCompaniesUrl,
  type CompanySearchParams,
} from "../lib/company-search-url";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  searchParams: CompanySearchParams;
}

/**
 * Thin binding of the shared pager to the companies route.
 *
 * `scroll={false}` because this list sits beside a detail pane — jumping to the
 * top on a page change would move the company the reader is looking at.
 */
export function SearchPagination({
  currentPage,
  totalPages,
  searchParams,
}: PaginationProps) {
  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      getPageHref={(page) =>
        buildCompaniesUrl(searchParams, { page: page.toString() })
      }
      label="Company results pages"
      scroll={false}
    />
  );
}
