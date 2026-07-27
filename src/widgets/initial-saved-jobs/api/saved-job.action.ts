"use server";

import type { SavedJob } from "@/entities/saved-job";
import { getAuthUser } from "@/shared/lib/clerk.server";

import { getInitialSavedJobs } from "./saved-job.service";

export interface InitialSavedJobsState {
  isSignedIn: boolean;
  isApplicant: boolean;
  jobs: SavedJob[];
}

/**
 * The viewer's saved jobs for the home page.
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

    if (!userId) return { isSignedIn: false, isApplicant: false, jobs: [] };

    const isApplicant = role === "APPLICANT";
    const jobs = isApplicant ? await getInitialSavedJobs(userId, 8) : [];

    return { isSignedIn: true, isApplicant, jobs };
  } catch (error) {
    return { isSignedIn: false, isApplicant: false, jobs: [] };
  }
}
