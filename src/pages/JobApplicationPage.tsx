import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getApplicantProfile } from "@/entities/applicant";
import { getJobDetailsBySlug } from "@/entities/job";
import {
  authorizeJobApplicationAttempt,
  JobApplicationForm,
} from "@/features/job/apply-to-job";

export async function JobApplicationPage({ slug }: { slug: string }) {
  const { userId } = auth();

  if (!userId) notFound();

  const job = await getJobDetailsBySlug(slug);

  if (!job) notFound();

  const isAuthorized = await authorizeJobApplicationAttempt(userId, job.id);

  if (!isAuthorized) notFound();

  const applicant = await getApplicantProfile(userId);

  if (!applicant) notFound();

  return (
    <section className="mx-auto h-full max-w-4xl p-4">
      <JobApplicationForm userId={userId} job={job} applicant={applicant} />
    </section>
  );
}
