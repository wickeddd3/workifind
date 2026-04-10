import { notFound } from "next/navigation";
import { JobApplicationSubmitted, getJobBySlug } from "@/entities/job";
import { checkIfAlreadyApplied } from "@/entities/job-application";
import { getAuthUser } from "@/shared/lib/clerk.server";

export async function JobApplicationSubmittedPage({ slug }: { slug: string }) {
  const { userId } = await getAuthUser();

  if (!userId) notFound();

  const job = await getJobBySlug(slug);

  if (!job) notFound();

  const isAuthorized = await checkIfAlreadyApplied(userId, job.id);

  if (!isAuthorized) notFound();

  return (
    <section className="mx-auto h-full max-w-4xl p-4">
      <JobApplicationSubmitted job={job} />
    </section>
  );
}
