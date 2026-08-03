"use server";

import { getApplicant } from "@/entities/applicant";
import { checkIfAlreadyApplied } from "@/entities/job-application";
import { checkIfAlreadySaved } from "@/entities/saved-job";
import { getAuthUser } from "@/shared/lib/clerk.server";

export interface JobActionState {
  /** False for signed-out visitors, employers, and applicants with no profile. */
  canAct: boolean;
  hasApplied: boolean;
  isSaved: boolean;
  applicantId: string | null;
}

const NO_ACTIONS: JobActionState = {
  canAct: false,
  hasApplied: false,
  isSaved: false,
  applicantId: null,
};

/**
 * Per-viewer state for a job's Apply/Save controls.
 *
 * Called from the client so `/jobs/[slug]` itself can be prerendered — the job
 * content is identical for everyone, and only this slice varies.
 *
 * Takes just a job id: the viewer is resolved from their own session, so this
 * cannot be used to read another user's application state.
 */
export async function getJobActionState(
  jobId: string,
): Promise<JobActionState> {
  try {
    const { role, userId } = await getAuthUser();

    if (!userId || role !== "APPLICANT") return NO_ACTIONS;

    const [applicant, hasApplied, isSaved] = await Promise.all([
      getApplicant(userId),
      checkIfAlreadyApplied(userId, jobId),
      checkIfAlreadySaved(userId, jobId),
    ]);

    if (!applicant) return NO_ACTIONS;

    return { canAct: true, hasApplied, isSaved, applicantId: applicant.id };
  } catch (error) {
    return NO_ACTIONS;
  }
}
