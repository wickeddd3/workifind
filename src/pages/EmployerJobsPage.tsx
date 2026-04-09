import { notFound } from "next/navigation";
import { getAuthUser } from "@/shared/lib/clerk.server";
import { EmployerJobs } from "@/features/employer/job-posts";

export async function EmployerJobsPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const { userId, role } = await getAuthUser();

  const isEmployer = role === "EMPLOYER";

  if (!isEmployer || !userId) return notFound();

  return (
    <section className="m-auto flex flex-col gap-6 px-0 md:px-4">
      <h1 className="px-4 text-md font-bold md:text-lg">My jobs</h1>
      <div className="flex flex-col gap-2">
        <EmployerJobs userId={userId} searchParams={searchParams} />
      </div>
    </section>
  );
}
