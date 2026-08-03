import { Pagination } from "@/shared/ui/Pagination";

/** Thin binding of the shared pager to one job's applicants. */
export function ReceivedApplicationsPagination({
  jobId,
  currentPage,
  totalPages,
}: {
  jobId: string;
  currentPage: number;
  totalPages: number;
}) {
  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      getPageHref={(page) => `/employer/jobs/${jobId}/applicants?page=${page}`}
      label="Applicant pages"
    />
  );
}
