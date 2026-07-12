import { notFound } from "next/navigation";

import { EmployerJobs } from "@/features/employer/job-posts";
import { getAuthUser } from "@/shared/lib/clerk.server";

export async function EmployerJobsPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const { userId, role } = await getAuthUser();

  const isEmployer = role === "EMPLOYER";

  if (!isEmployer || !userId) return notFound();

  return (
    <section className="m-auto my-6 flex max-w-5xl flex-col gap-6 px-0 md:px-4">
      <div className="flex flex-col gap-1 px-4">
        <h1 className="text-lg font-bold text-gray-900 md:text-xl">
          Your job posts
        </h1>
        <p className="text-sm text-gray-500">
          Manage the roles you&apos;re hiring for.
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <EmployerJobs userId={userId} searchParams={searchParams} />
      </div>
    </section>
  );
}
