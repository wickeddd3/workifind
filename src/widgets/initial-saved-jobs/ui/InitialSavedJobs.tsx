import { Unauthenticated } from "./Unauthenticated";
import { LoadingPlaceholder } from "./LoadingPlaceholder";
import { SavedJobs } from "./SavedJobs";
import { EmptyPlaceholder } from "./EmptyPlaceholder";
import { Suspense } from "react";
import { getAuthUser } from "@/shared/lib/clerk.server";
import { getInitialSavedJobs } from "@/entities/saved-job/server";

export async function InitialSavedJobs() {
  const { userId, role } = await getAuthUser();
  if (!userId) return <Unauthenticated />;

  const isApplicant = role === "APPLICANT";
  const jobs = await getInitialSavedJobs(userId);
  const hasJobs = jobs && jobs.length > 0;

  return (
    <section className="w-full py-2 md:py-4">
      <Suspense fallback={<LoadingPlaceholder />}>
        {isApplicant && hasJobs && <SavedJobs savedJobs={jobs} />}
        {isApplicant && !hasJobs && <EmptyPlaceholder />}
        {!isApplicant && !hasJobs && (
          <EmptyPlaceholder message="Only applicant can save jobs" />
        )}
      </Suspense>
    </section>
  );
}
