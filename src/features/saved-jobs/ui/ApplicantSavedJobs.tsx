import {
  getSavedJobsCountQuery,
  getSavedJobsQuery,
} from "../api/saved-job.queries";
import { EmptyPlaceholder } from "./EmptyPlaceholder";
import { SavedJobs } from "./SavedJobs";
import { SavedJobsPagination } from "./SavedJobsPagination";

export async function ApplicantSavedJobs({
  userId,
  searchParams,
}: {
  userId: string;
  searchParams: Record<string, string>;
}) {
  const { page } = searchParams;
  const size = 5;
  const currentPage = page ? parseInt(page) : 1;

  const [results, totalResults] = await Promise.all([
    getSavedJobsQuery(userId, { size, page: currentPage }),
    getSavedJobsCountQuery(userId),
  ]);

  const hasJobs = results.data && results.data?.length > 0;

  if (!hasJobs)
    return <EmptyPlaceholder message="No saved jobs yet — start exploring" />;

  const total = totalResults.data || 0;

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">
        <span className="tabular font-semibold text-foreground">{total}</span>{" "}
        {total === 1 ? "saved job" : "saved jobs"}
      </p>
      <SavedJobs savedJobs={results.data || []} />
      <SavedJobsPagination
        currentPage={currentPage}
        totalPages={Math.ceil(total / size)}
      />
    </div>
  );
}
