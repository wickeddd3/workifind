import { Pagination } from "@/shared/ui/Pagination";

import {
  buildProfessionalsUrl,
  type ProfessionalSearchParams,
} from "../lib/professional-search-url";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  searchParams: ProfessionalSearchParams;
}

/**
 * Thin binding of the shared pager to the professionals route.
 *
 * `scroll={false}` because this list sits beside a detail pane — jumping to the
 * top on a page change would move the profile the reader is looking at.
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
        buildProfessionalsUrl(searchParams, { page: page.toString() })
      }
      label="Professional results pages"
      scroll={false}
    />
  );
}
