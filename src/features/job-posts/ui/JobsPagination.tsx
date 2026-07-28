import { Pagination } from "@/shared/ui/Pagination";

/** Thin binding of the shared pager to the employer's own job list. */
export function JobsPagination({
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
      getPageHref={(page) => `/employer/jobs?page=${page}`}
      label="Job post pages"
    />
  );
}
