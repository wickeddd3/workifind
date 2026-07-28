import { Pagination } from "@/shared/ui/Pagination";

/** Thin binding of the shared pager to the applicant's saved-jobs list. */
export function SavedJobsPagination({
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
      getPageHref={(page) => `/applicant/jobs/saved?page=${page}`}
      label="Saved job pages"
    />
  );
}
