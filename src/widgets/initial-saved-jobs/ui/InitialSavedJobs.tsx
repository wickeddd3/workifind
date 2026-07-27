import { getAuthUser } from "@/shared/lib/clerk.server";

import { getInitialSavedJobsQuery } from "../api/saved-job.queries";
import { EmptyPlaceholder } from "./EmptyPlaceholder";
import { SavedJobs } from "./SavedJobs";
import { Unauthenticated } from "./Unauthenticated";

export async function InitialSavedJobs() {
  const { userId, role } = await getAuthUser();
  if (!userId) return <Unauthenticated />;

  const isApplicant = role === "APPLICANT";
  const jobs = await getInitialSavedJobsQuery(userId);
  const hasJobs = jobs.data && jobs.data?.length > 0;

  // No Suspense here — by this point every await has resolved, so a boundary
  // around static JSX could never suspend. The real boundary lives in the page
  // that renders this widget.
  return (
    <section className="w-full py-2 md:py-4">
      {isApplicant && hasJobs && <SavedJobs savedJobs={jobs.data || []} />}
      {isApplicant && !hasJobs && <EmptyPlaceholder />}
      {!isApplicant && !hasJobs && (
        <EmptyPlaceholder message="Sign in as an applicant to save jobs" />
      )}
    </section>
  );
}
