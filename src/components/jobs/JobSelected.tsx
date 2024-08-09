import { cache } from "react";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import JobSelectedDetails from "@/components/jobs/JobSelectedDetails";
import JobSelectedEmptyPlaceholder from "@/components/jobs/JobSelectedEmptyPlaceholder";

interface PageProps {
  jobId: number | undefined;
}

const getJob = cache(async (id: number | undefined) => {
  if (!id) return null;

  const job = await prisma.job.findUnique({
    where: { id },
    include: {
      employer: true,
    },
  });

  if (!job) notFound();

  return job;
});

export default async function JobSelected({ jobId }: PageProps) {
  const job = await getJob(jobId);

  return (
    <section className="sticky top-0 hidden h-fit rounded-xl bg-background md:block md:w-3/5">
      <div className="m-auto h-full">
        {job ? (
          <JobSelectedDetails job={job} />
        ) : (
          <JobSelectedEmptyPlaceholder />
        )}
      </div>
    </section>
  );
}
