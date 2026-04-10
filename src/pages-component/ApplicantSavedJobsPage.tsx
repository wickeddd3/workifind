import { notFound } from "next/navigation";
import { getAuthUser } from "@/shared/lib/clerk.server";
import { ApplicantSavedJobs } from "@/features/job/saved-jobs";

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
      <h1 className="px-4 text-md font-bold md:text-lg">Saved jobs</h1>
      <div className="flex flex-col gap-2">
        <ApplicantSavedJobs userId={userId} searchParams={searchParams} />
      </div>
    </section>
  );
}
