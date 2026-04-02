import JobDetails from "@/components/jobs/JobApplication/JobDetails";
import ApplicationForm from "@/components/jobs/JobApplication/ApplicationForm";
import LoadingPlaceholder from "@/components/jobs/JobApplication/LoadingPlaceholder";
import { Employer, Job } from "@prisma/client";
import { Suspense } from "react";
import { type Applicant, ApplicantHeader } from "@/entities/applicant";

interface JobApplicationFormProps {
  userId: string;
  job: Job & { employer: Employer };
  applicant: Applicant;
}

export default function JobApplicationForm({
  userId,
  job,
  applicant,
}: JobApplicationFormProps) {
  return (
    <Suspense fallback={<LoadingPlaceholder />}>
      <section className="flex h-full w-full flex-col gap-4 md:gap-8">
        <JobDetails job={job} />
        <ApplicantHeader applicant={applicant} />
        <ApplicationForm userId={userId} jobId={job.id} jobSlug={job.slug} />
      </section>
    </Suspense>
  );
}
