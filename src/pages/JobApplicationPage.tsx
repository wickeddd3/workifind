import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getApplicant } from "@/entities/applicant";
import { getJobBySlug } from "@/entities/job";
import { JobApplicationForm } from "@/features/job/apply-to-job";
import { checkIfAlreadyApplied } from "@/entities/job-application";

export async function JobApplicationPage({ slug }: { slug: string }) {
  const { userId } = auth();

  if (!userId) notFound();

  const job = await getJobBySlug(slug);

  if (!job) notFound();

  const isAuthorized = await checkIfAlreadyApplied(userId, job.id);

  if (isAuthorized) notFound();

  const applicant = await getApplicant(userId);

  if (!applicant) notFound();

  return (
    <section className="mx-auto h-full max-w-4xl p-4">
      <JobApplicationForm userId={userId} job={job} applicant={applicant} />
    </section>
  );
}
