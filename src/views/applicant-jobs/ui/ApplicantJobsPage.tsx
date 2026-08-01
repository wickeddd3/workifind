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
    <section className="mx-auto my-6 flex w-full max-w-3xl flex-col gap-4 px-4 md:my-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-bold text-foreground md:text-xl">
          Your applications
        </h1>
        <p className="text-sm text-muted-foreground">
          Track the jobs you&apos;ve applied to.
        </p>
      </div>
      <Suspense
        key={JSON.stringify(searchParams)}
        fallback={<ListSkeleton rows={5} metaLines={3} />}
      >
        <ApplicantJobs userId={userId} searchParams={searchParams} />
      </Suspense>
    </section>
  );
}
