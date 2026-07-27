import { getApplicant } from "@/entities/applicant";
import type { Job } from "@/entities/job";
import { checkIfAlreadyApplied } from "@/entities/job-application";
import { checkIfAlreadySaved } from "@/entities/saved-job";
import { ApplyButton } from "@/features/job/apply-to-job";
import { SaveButton } from "@/features/job/save-job";
import type { UserRole } from "@/shared/lib/clerk.server";

/**
 * The per-viewer half of a job page: whether *this* user has applied or saved.
 *
 * Auth is resolved by the caller and passed in, so the Clerk lookup can run in
 * parallel with the job query rather than after it.
 */
export async function JobActions({
  job,
  role,
  userId,
}: {
  job: Job;
  role: UserRole | undefined;
  userId: string | undefined;
}) {
  // Signed-out visitors are the majority on a public job page, and none of the
  // lookups below can match without a user. Bail before touching the database.
  if (!userId || role !== "APPLICANT") return null;

  // Independent once `userId` is known — these were three sequential awaits.
  const [applicant, hasApplied, isSaved] = await Promise.all([
    getApplicant(userId),
    checkIfAlreadyApplied(userId, job.id),
    checkIfAlreadySaved(userId, job.id),
  ]);

  if (!applicant) return null;

  return (
    <div className="flex flex-wrap items-center gap-3 pt-1">
      <ApplyButton job={job} hasApplied={hasApplied} />
      <SaveButton
        jobId={job.id}
        applicantId={applicant.id}
        initialIsSaved={isSaved}
      />
    </div>
  );
}
