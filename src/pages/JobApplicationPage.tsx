import JobApplicationForm from "@/components/jobs/JobApplication/JobApplicationForm";
import { cache } from "react";
import { notFound } from "next/navigation";
import { findJobBySlug } from "@/app/_services/job";
import { applyToJobAuthorize } from "@/app/_services/applicant-job-applications";
import { auth } from "@clerk/nextjs/server";
import { getApplicantProfile } from "@/entities/applicant";

const handleFetchJob = cache(async (slug: string) => {
  return await findJobBySlug(slug);
});

export async function JobApplicationPage({ slug }: { slug: string }) {
  const { userId } = auth();

  if (!userId) notFound();

  const job = await handleFetchJob(slug);

  if (!job) notFound();

  const isAuthorized = await applyToJobAuthorize(userId, job.id);

  if (!isAuthorized) notFound();

  const applicant = await getApplicantProfile(userId);

  if (!applicant) notFound();

  return (
    <main className="mx-auto max-w-4xl p-4">
      <div className="h-full">
        <JobApplicationForm userId={userId} job={job} applicant={applicant} />
      </div>
    </main>
  );
}
