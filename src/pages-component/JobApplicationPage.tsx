import { notFound } from "next/navigation";

import { getApplicant } from "@/entities/applicant";
import { getJobBySlug } from "@/entities/job";
import { checkIfAlreadyApplied } from "@/entities/job-application";
import { JobApplicationForm } from "@/features/job/apply-to-job";
import { getAuthUser } from "@/shared/lib/clerk.server";

export async function JobApplicationPage({ slug }: { slug: string }) {
  const { userId } = await getAuthUser();

  if (!userId) notFound();

  const job = await getJobBySlug(slug);

  if (!job) notFound();

  const isAuthorized = await checkIfAlreadyApplied(userId, job.id);

  if (isAuthorized) notFound();

  const applicant = await getApplicant(userId);

  if (!applicant) notFound();

  return (
    <section className="mx-3 my-6 max-w-4xl space-y-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-card md:mx-auto md:p-8">
      <JobApplicationForm job={job} applicant={applicant} />
    </section>
  );
}
