import { JobListSkeleton } from "@/entities/job";
import { ApplicantJobsTabs } from "@/widgets/applicant-jobs-tabs";

/** The saved list's route placeholder — see `ApplicantJobsLoading`. */
export function ApplicantSavedJobsLoading() {
  return (
    <section className="mx-auto my-6 flex w-full max-w-3xl flex-col gap-4 px-4 md:my-10">
      <ApplicantJobsTabs description="Jobs you've bookmarked to revisit later." />
      <JobListSkeleton />
    </section>
  );
}
