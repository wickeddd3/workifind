import { notFound } from "next/navigation";
import { Suspense } from "react";

import { ApplicantJobs } from "@/features/job-applications";
import { getAuthUser } from "@/shared/lib/clerk.server";
import { ListSkeleton } from "@/shared/ui/ListSkeleton";

export async function ApplicantJobsPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const { userId, role } = await getAuthUser();

  const isApplicant = role === "APPLICANT";

  if (!isApplicant || !userId) return notFound();

  return (
    <section className="m-auto flex flex-col gap-6 px-0 md:px-4">
      <div className="flex flex-col gap-1 px-4">
        <h1 className="text-lg font-bold text-gray-900 md:text-xl">
          Your applications
        </h1>
        <p className="text-sm text-gray-500">
          Track the jobs you&apos;ve applied to.
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <Suspense
          key={JSON.stringify(searchParams)}
          fallback={<ListSkeleton rows={5} metaLines={3} />}
        >
          <ApplicantJobs userId={userId} searchParams={searchParams} />
        </Suspense>
      </div>
    </section>
  );
}
