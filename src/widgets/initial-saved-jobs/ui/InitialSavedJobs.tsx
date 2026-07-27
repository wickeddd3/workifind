"use client";

import { useEffect, useState } from "react";

import {
  getInitialSavedJobsState,
  type InitialSavedJobsState,
} from "../api/saved-job.action";
import { EmptyPlaceholder } from "./EmptyPlaceholder";
import { LoadingPlaceholder } from "./LoadingPlaceholder";
import { SavedJobs } from "./SavedJobs";
import { Unauthenticated } from "./Unauthenticated";

/**
 * Saved-jobs strip on the home page.
 *
 * Resolved on the client so `/` stays prerenderable. Everything else on that
 * page — hero, company carousel, marketing — is the same for every visitor.
 */
export function InitialSavedJobs() {
  const [state, setState] = useState<InitialSavedJobsState | null>(null);

  useEffect(() => {
    let active = true;

    getInitialSavedJobsState()
      .then((result) => {
        if (active) setState(result);
      })
      .catch(() => {
        if (active)
          setState({ isSignedIn: false, isApplicant: false, jobs: [] });
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="w-full py-2 md:py-4">
      {state === null && <LoadingPlaceholder />}
      {state !== null && !state.isSignedIn && <Unauthenticated />}
      {state !== null && state.isSignedIn && (
        <>
          {state.isApplicant && state.jobs.length > 0 && (
            <SavedJobs savedJobs={state.jobs} />
          )}
          {state.isApplicant && state.jobs.length === 0 && <EmptyPlaceholder />}
          {!state.isApplicant && (
            <EmptyPlaceholder message="Sign in as an applicant to save jobs" />
          )}
        </>
      )}
    </section>
  );
}
