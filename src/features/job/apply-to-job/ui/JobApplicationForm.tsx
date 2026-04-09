import { Suspense } from "react";
import { type Applicant, ApplicantHeader } from "@/entities/applicant";
import { LoadingPlaceholder } from "./LoadingPlaceholder";
import { JobDetails } from "./JobDetails";
import { ApplicationForm } from "./ApplicationForm";
import type { Job } from "@/entities/job";

export function JobApplicationForm({
  userId,
  job,
  applicant,
}: {
  userId: string;
  job: Job;
  applicant: Applicant;
}) {
  return (
    <Suspense fallback={<LoadingPlaceholder />}>
      <section className="flex h-full w-full flex-col gap-4 md:gap-8">
        <JobDetails job={job} />
        <ApplicantHeader applicant={applicant} />
        <ApplicationForm
          userId={userId}
          applicantId={applicant.id}
          jobId={job.id}
          jobSlug={job.slug}
        />
      </section>
    </Suspense>
  );
}
