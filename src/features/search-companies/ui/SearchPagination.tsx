import { Pagination } from "@/shared/ui/Pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  query: string;
}

/** Thin binding of the shared pager to the company search route. */
export function SearchPagination({
  currentPage,
  totalPages,
  query,
}: PaginationProps) {
  function generatePageLink(page: number) {
    const searchParams = new URLSearchParams({
      ...(query && { q: query.trim() }),
      ...(page && { page: page.toString() }),
    });

    return `/companies/search?${searchParams.toString()}`;
  }

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      getPageHref={generatePageLink}
      label="Company results pages"
    />
  );
}
