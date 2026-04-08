import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { JobForm } from "@/features/job/update-job";
import { getJob } from "@/entities/job";

export async function EmployerJobPage({ id }: { id: number }) {
  const { userId } = auth();

  if (!userId) notFound();

  const job = await getJob(id);

  if (!job) notFound();

  return <JobForm userId={userId} jobId={id} job={job} />;
}
