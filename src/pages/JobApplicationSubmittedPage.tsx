import { notFound } from "next/navigation";
import { applyToJobAuthorize } from "@/app/_services/applicant-job-applications";
import { auth } from "@clerk/nextjs/server";
import { getJobDetailsBySlug, JobApplicationSubmitted } from "@/entities/job";

export async function JobApplicationSubmittedPage({ slug }: { slug: string }) {
  const { userId } = auth();

  if (!userId) notFound();

  const job = await getJobDetailsBySlug(slug);

  if (!job) notFound();

  const isAuthorized = await applyToJobAuthorize(userId, job.id);

  if (isAuthorized) notFound();

  return (
    <section className="mx-auto h-full max-w-4xl p-4">
      <JobApplicationSubmitted job={job} />
    </section>
  );
}
