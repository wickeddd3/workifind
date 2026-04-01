import JobApplicationSubmitted from "@/components/jobs/JobApplicationSubmitted";
import { cache } from "react";
import { notFound } from "next/navigation";
import { findJobBySlug } from "@/app/_services/job";
import { applyToJobAuthorize } from "@/app/_services/applicant-job-applications";
import { auth } from "@clerk/nextjs/server";

const handleFetchJob = cache(async (slug: string) => {
  return await findJobBySlug(slug);
});

export async function JobApplicationSubmittedPage({ slug }: { slug: string }) {
  const { userId } = auth();

  if (!userId) notFound();

  const job = await handleFetchJob(slug);

  if (!job) notFound();

  const isAuthorized = await applyToJobAuthorize(userId, job.id);

  if (isAuthorized) notFound();

  return (
    <main className="mx-auto max-w-4xl p-4">
      <div className="h-full">
        <JobApplicationSubmitted job={job} />
      </div>
    </main>
  );
}
