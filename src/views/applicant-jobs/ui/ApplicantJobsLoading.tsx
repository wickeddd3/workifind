import { JobListSkeleton } from "@/entities/job";
import { ApplicantJobsTabs } from "@/widgets/applicant-jobs-tabs";

/**
 * Stands in for the whole applications route.
 *
 * The heading and the tabs are rendered for real rather than as grey bars —
 * neither depends on data, so there is nothing to wait for, and rendering them
 * twice (once as a placeholder, once for real) made the tab bar flicker and
 * shift on every load. Only the list is unknown, so only the list is a
 * skeleton, and it hands over to the page's own `JobListSkeleton` without a
 * visible seam.
 */
export function ApplicantJobsLoading() {
  return (
    // Matches the page's container exactly, so nothing moves when it resolves.
    <section className="mx-auto my-6 flex w-full max-w-3xl flex-col gap-4 px-4 md:my-10">
      <ApplicantJobsTabs description="Track the jobs you've applied to." />
      <JobListSkeleton />
    </section>
  );
}
