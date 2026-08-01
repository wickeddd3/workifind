import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

import { JobCard } from "@/entities/job";
import type { JobApplicationWithJob } from "@/entities/job-application";
import { relativeDate } from "@/shared/utils/format-date";

/**
 * One application in the applicant's list.
 *
 * Wraps the shared job card rather than restating it — the hand-rolled version
 * showed a title and three facts, with no company name, no logo and no sense of
 * when the application went in.
 *
 * The whole row is a link now. Reaching the job used to mean opening a menu and
 * picking "View", which also forced a new tab.
 */
export function AppliedJobItem({
  jobApplication: { job, createdAt },
}: {
  jobApplication: JobApplicationWithJob;
}) {
  return (
    <Link
      href={`/jobs/${job.slug}`}
      className="block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <JobCard
        job={job}
        // The date that matters here is when you applied, not when the job was
        // posted.
        note={
          <>
            <CheckCircle2 size={14} className="shrink-0" aria-hidden="true" />
            Applied {relativeDate(createdAt)}
          </>
        }
      />
    </Link>
  );
}
