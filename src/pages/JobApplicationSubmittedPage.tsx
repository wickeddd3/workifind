import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getJobDetailsBySlug, JobApplicationSubmitted } from "@/entities/job";
import { authorizeJobApplicationAttempt } from "@/features/job/apply-to-job";

export async function JobApplicationSubmittedPage({ slug }: { slug: string }) {
  const { userId } = auth();

  if (!userId) notFound();

  const job = await getJobDetailsBySlug(slug);

  if (!job) notFound();

  const isAuthorized = await authorizeJobApplicationAttempt(userId, job.id);

  if (isAuthorized) notFound();

  return (
    <section className="mx-auto h-full max-w-4xl p-4">
      <JobApplicationSubmitted job={job} />
    </section>
  );
}
