import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getJobDetails } from "@/entities/job";
import { JobForm } from "@/features/job/update-job";

export async function EmployerJobPage({ id }: { id: number }) {
  const { userId } = auth();

  if (!userId) notFound();

  const job = await getJobDetails(id);

  if (!job) notFound();

  return <JobForm userId={userId} jobId={id} job={job} />;
}
