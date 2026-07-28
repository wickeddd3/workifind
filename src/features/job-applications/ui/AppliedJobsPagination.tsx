import { Pagination } from "@/shared/ui/Pagination";

/** Thin binding of the shared pager to the applicant's applied-jobs list. */
export function AppliedJobsPagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      getPageHref={(page) => `/applicant/jobs?page=${page}`}
      label="Applied job pages"
    />
  );
}
