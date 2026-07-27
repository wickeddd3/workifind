"use server";

import { revalidatePath } from "next/cache";

import type { SavedJob } from "@/entities/saved-job";
import { getAuthUser, requireRole } from "@/shared/lib/clerk.server";

import { getSavedJobs, unsaveJob } from "./saved-job.service";

/** How many saved jobs the home-page strip shows. */
const HOME_STRIP_SIZE = 8;

export interface InitialSavedJobsState {
  isSignedIn: boolean;
  isApplicant: boolean;
  jobs: SavedJob[];
}

const NO_SAVED_JOBS: InitialSavedJobsState = {
  isSignedIn: false,
  isApplicant: false,
  jobs: [],
};

/**
 * The viewer's saved jobs for the home-page strip.
 *
 * Called from the client so `/` itself can be prerendered — the hero, company
 * carousel, and marketing sections are identical for everyone, and this is the
 * only slice that varies.
 *
 * Resolves the viewer from their own session; it takes no user id, so it cannot
 * be used to read someone else's saved jobs.
 */
export async function getInitialSavedJobsState(): Promise<InitialSavedJobsState> {
  try {
    const { userId, role } = await getAuthUser();

    if (!userId) return NO_SAVED_JOBS;

    const isApplicant = role === "APPLICANT";
    const jobs = isApplicant
      ? await getSavedJobs(userId, { take: HOME_STRIP_SIZE, skip: 0 })
      : [];

    return { isSignedIn: true, isApplicant, jobs };
  } catch (error) {
    return NO_SAVED_JOBS;
  }
}

export async function unsaveJobAction(
  jobId: number,
): Promise<{ success: boolean; data: boolean; message: string }> {
  try {
    const { userId } = await requireRole("APPLICANT");

    await unsaveJob(userId, jobId);

    // The job page is prerendered and no longer depends on save state, which
    // JobActions resolves per viewer on the client.
    revalidatePath("/applicant/jobs/saved");
    return {
      success: true,
      data: true,
      message: "Unsaved successfully",
    };
  } catch (error) {
    return { success: false, data: false, message: "Unsave failed" };
  }
}
