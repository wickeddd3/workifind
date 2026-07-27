"use client";

import { useEffect, useState } from "react";

import type { Job } from "@/entities/job";
// Taken from the `client` public APIs rather than `index`: this is a client
// component, and those barrels also export server-only code — `apply-to-job`
// re-exports JobApplicationForm, which reaches Prisma through the applicant
// entity.
import { ApplyButton } from "@/features/job/apply-to-job/client";
import { SaveButton } from "@/features/job/save-job/client";

import {
  getJobActionState,
  type JobActionState,
} from "../api/job-actions.action";

/**
 * The per-viewer half of a job page: whether *this* user has applied or saved.
 *
 * Resolved on the client so the surrounding page stays prerenderable. The job
 * content is the same for every visitor and is what matters for SEO and LCP;
 * only these two controls vary, and they matter to signed-in applicants alone.
 *
 * Renders nothing until the state arrives, so signed-out visitors — the
 * majority here — never see controls appear and then vanish.
 */
export function JobActions({ job }: { job: Job }) {
  const [state, setState] = useState<JobActionState | null>(null);

  useEffect(() => {
    let active = true;

    getJobActionState(job.id)
      .then((result) => {
        if (active) setState(result);
      })
      .catch(() => {
        // Leave the controls hidden rather than rendering a broken affordance.
        if (active) setState(null);
      });

    return () => {
      active = false;
    };
  }, [job.id]);

  if (!state?.canAct || state.applicantId === null) return null;

  return (
    <div className="flex flex-wrap items-center gap-3 pt-1">
      <ApplyButton job={job} hasApplied={state.hasApplied} />
      <SaveButton
        jobId={job.id}
        applicantId={state.applicantId}
        initialIsSaved={state.isSaved}
      />
    </div>
  );
}
