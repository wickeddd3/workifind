import EmployerJob from "@/components/employer/EmployerJob";
import { getJob } from "@/app/_services/employer-jobs";
import { cache } from "react";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

interface PageProps {
  params: { id: number };
}

const handleFetchJob = cache(async (userId: string, jobId: number) => {
  return await getJob(userId, jobId);
});

export default async function Page({ params: { id } }: PageProps) {
  const { userId } = auth();

  if (!userId) notFound();

  const job = await handleFetchJob(userId, id);

  if (!job) notFound();

  return job && <EmployerJob job={job} />;
}
