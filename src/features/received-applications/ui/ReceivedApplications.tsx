import {
  getReceivedApplicationsCountQuery,
  getReceivedApplicationsQuery,
} from "../api/received-application.queries";
import { EmptyPlaceholder } from "./EmptyPlaceholder";
import { ReceivedApplicationList } from "./ReceivedApplicationList";
import { ReceivedApplicationsPagination } from "./ReceivedApplicationsPagination";

/** A page of applicants at a time. The whole set used to be loaded with the
 *  job, applicant records and all, however many there were. */
const PAGE_SIZE = 10;

export async function ReceivedApplications({
  userId,
  jobId,
  searchParams,
}: {
  userId: string;
  jobId: number;
  searchParams: Record<string, string>;
}) {
  const { page } = searchParams;
  const currentPage = page ? parseInt(page) : 1;

  const [results, totalResults] = await Promise.all([
    getReceivedApplicationsQuery(userId, jobId, {
      size: PAGE_SIZE,
      page: currentPage,
    }),
    getReceivedApplicationsCountQuery(userId, jobId),
  ]);

  const hasApplications = results.data && results.data.length > 0;

  if (!hasApplications) return <EmptyPlaceholder />;

  const total = totalResults.data || 0;

  return (
    // Same frame as the applicant's applied and saved lists: a count, the rows,
    // the pager.
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">
        <span className="tabular font-semibold text-foreground">{total}</span>{" "}
        {total === 1 ? "applicant" : "applicants"}
      </p>
      <ReceivedApplicationList jobApplications={results.data || []} />
      <ReceivedApplicationsPagination
        jobId={jobId}
        currentPage={currentPage}
        totalPages={Math.ceil(total / PAGE_SIZE)}
      />
    </div>
  );
}
