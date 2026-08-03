import { notFound } from "next/navigation";
import { Suspense } from "react";

import { JobListSkeleton } from "@/entities/job";
import { ApplicantSavedJobs } from "@/features/saved-jobs";
import { getAuthUser } from "@/shared/lib/clerk.server";
import { ApplicantJobsTabs } from "@/widgets/applicant-jobs-tabs";

export async function ApplicantSavedJobsPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const { userId, role } = await getAuthUser();

  const isApplicant = role === "APPLICANT";

  if (!isApplicant || !userId) return notFound();

  return (
    <section className="mx-auto my-6 flex w-full max-w-3xl flex-col gap-4 px-4 md:my-10">
      <ApplicantJobsTabs description="Jobs you've bookmarked to revisit later." />
      <Suspense
        key={JSON.stringify(searchParams)}
        fallback={<JobListSkeleton />}
      >
        <ApplicantSavedJobs userId={userId} searchParams={searchParams} />
      </Suspense>
    </section>
  );
}
