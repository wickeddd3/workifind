import SavedJobs from "@/components/home/saved/SavedJobs";
import SavedJobsEmptyPlaceholder from "@/components/home/saved/SavedJobsEmptyPlaceholder";
import SavedJobsUnauthenticated from "@/components/home/saved/SavedJobsUnauthenticated";
import SavedJobsLoadingPlaceholder from "@/components/home/saved/SavedJobsLoadingPlaceholder";
import { cache } from "react";
import { Suspense } from "react";
import { currentUser } from "@clerk/nextjs/server";
import { getInitialSavedJobs } from "@/app/_services/applicant-saved-jobs";

const handleFetchInitialSavedJobs = cache(async (userId: string) => {
  return await getInitialSavedJobs(userId);
});

export default async function HomeInitialSavedJobs() {
  const user = await currentUser();
  const role = user?.unsafeMetadata?.role;

  const userId = user?.id;
  if (!userId) return <SavedJobsUnauthenticated />;

  const isApplicant = role === "APPLICANT";
  const jobs = await handleFetchInitialSavedJobs(userId);
  const hasJobs = jobs && jobs.length > 0;

  return (
    <section className="w-full py-2 md:py-4">
      <Suspense fallback={<SavedJobsLoadingPlaceholder />}>
        {isApplicant && hasJobs && <SavedJobs savedJobs={jobs} />}
        {isApplicant && !hasJobs && <SavedJobsEmptyPlaceholder />}
        {!isApplicant && !hasJobs && (
          <SavedJobsEmptyPlaceholder message="Only applicant can save jobs" />
        )}
      </Suspense>
    </section>
  );
}
