import { notFound } from "next/navigation";

import { ApplicantSavedJobs } from "@/features/job/saved-jobs";
import { getAuthUser } from "@/shared/lib/clerk.server";

export async function ApplicantSavedJobsPage({
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
          Your saved jobs
        </h1>
        <p className="text-sm text-gray-500">
          Jobs you&apos;ve bookmarked to revisit later.
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <ApplicantSavedJobs userId={userId} searchParams={searchParams} />
      </div>
    </section>
  );
}
