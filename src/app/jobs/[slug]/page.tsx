import { cache } from "react";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import JobDetails from "@/components/jobs/JobDetails";

interface PageProps {
  params: { slug: string };
}

const getJob = cache(async (slug: string) => {
  const job = await prisma.job.findUnique({
    where: { slug },
    include: {
      employer: true,
    },
  });

  if (!job) notFound();

  return job;
});

export default async function Page({ params: { slug } }: PageProps) {
  const job = await getJob(slug);

  return (
    <main className="mx-auto max-w-4xl p-4">
      <div className="h-full">
        <JobDetails job={job} />
      </div>
    </main>
  );
}
