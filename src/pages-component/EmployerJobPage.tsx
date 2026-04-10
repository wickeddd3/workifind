import { notFound } from "next/navigation";
import { JobForm } from "@/features/job/update-job";
import { getJob } from "@/entities/job";
import { getAuthUser } from "@/shared/lib/clerk.server";

export async function EmployerJobPage({ id }: { id: number }) {
  const { userId } = await getAuthUser();

  if (!userId) notFound();

  const job = await getJob(id);

  if (!job) notFound();

  return <JobForm job={job} />;
}
