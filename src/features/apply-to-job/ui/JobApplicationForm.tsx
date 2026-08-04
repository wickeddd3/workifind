import { Suspense } from "react";

import {
  type Applicant,
  ApplicantHeader,
  toResumeSummary,
} from "@/entities/applicant";
import type { Job } from "@/entities/job";

import { ApplicationForm } from "./ApplicationForm";
import { JobDetails } from "./JobDetails";
import { LoadingPlaceholder } from "./LoadingPlaceholder";

export function JobApplicationForm({
  job,
  applicant,
}: {
  job: Job;
  applicant: Applicant;
}) {
  return (
    <Suspense fallback={<LoadingPlaceholder />}>
      <section className="flex h-full w-full flex-col gap-4 md:gap-8">
        <JobDetails job={job} />
        {/* The tinted panel lives here rather than inside ApplicantHeader: on
            this page it separates "who is applying" from the job above and the
            pitch below, whereas on the profile pages the header already sits in
            a card of its own. */}
        <div className="rounded-xl bg-muted p-4 md:p-6">
          <ApplicantHeader applicant={applicant} />
        </div>
        <ApplicationForm
          applicantId={applicant.id}
          jobId={job.id}
          jobSlug={job.slug}
          // A summary, never the record — see the note on `ApplicationForm`.
          profileResume={toResumeSummary(applicant)}
        />
      </section>
    </Suspense>
  );
}
