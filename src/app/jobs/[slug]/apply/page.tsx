import JobApplicationForm from "@/components/jobs/JobApplication/JobApplicationForm";
import LoadingPlaceholder from "@/components/jobs/JobApplication/LoadingPlaceholder";
import { cache, Suspense } from "react";
import { notFound } from "next/navigation";
import { findJobBySlug } from "@/app/_services/job";
import { applyToJobAuthorize } from "@/app/_services/applicant-job-applications";
import { auth } from "@clerk/nextjs/server";
import { getApplicantProfileByUserId } from "@/app/_services/applicant";

interface PageProps {
  params: { slug: string };
}

const handleFetchJob = cache(async (slug: string) => {
  return await findJobBySlug(slug);
});

export default async function Page({ params: { slug } }: PageProps) {
  const { userId } = auth();

  if (!userId) notFound();

  const job = await handleFetchJob(slug);

  if (!job) notFound();

  const isAuthorized = await applyToJobAuthorize(userId, job.id);

  if (!isAuthorized) notFound();

  const applicant = await getApplicantProfileByUserId(userId);

  if (!applicant) notFound();

  return (
    <main className="mx-auto max-w-4xl p-4">
      <div className="h-full">
        <Suspense fallback={<LoadingPlaceholder />}>
          <JobApplicationForm userId={userId} job={job} applicant={applicant} />
        </Suspense>
      </div>
    </main>
  );
}
