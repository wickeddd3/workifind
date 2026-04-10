import { notFound } from "next/navigation";
import { getAuthUser } from "@/shared/lib/clerk.server";
import { ApplicantJobs } from "@/features/job/job-applications";

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
      <h1 className="px-4 text-md font-bold md:text-lg">Applied jobs</h1>
      <div className="flex flex-col gap-2">
        <ApplicantJobs userId={userId} searchParams={searchParams} />
      </div>
    </section>
  );
}
