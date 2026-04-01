import EditJobForm from "@/components/employer/EditJobForm";
import { getJob } from "@/app/_services/employer-jobs";
import { cache } from "react";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

const handleFetchJob = cache(async (userId: string, jobId: number) => {
  return await getJob(userId, jobId);
});

export async function EmployerJobPage({ id }: { id: number }) {
  const { userId } = auth();

  if (!userId) notFound();

  const job = await handleFetchJob(userId, id);

  if (!job) notFound();

  return job && <EditJobForm userId={userId} jobId={id} job={job} />;
}
