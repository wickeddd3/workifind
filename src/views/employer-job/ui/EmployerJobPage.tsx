import { notFound } from "next/navigation";

import { getEmployerJob } from "@/entities/job";
import { JobForm } from "@/features/update-job";
import { getAuthUser } from "@/shared/lib/clerk.server";

export async function EmployerJobPage({ id }: { id: string }) {
  const { userId, role } = await getAuthUser();

  if (role !== "EMPLOYER" || !userId) notFound();

  // Scoped to the owner — the save already was, but the editor would happily
  // load someone else's post from a pasted id and show its contents.
  const job = await getEmployerJob(userId, id);

  if (!job) notFound();

  return <JobForm job={job} />;
}
