import { cache } from "react";
import { notFound } from "next/navigation";
import JobDetails from "@/components/jobs/JobDetails";
import { getJob } from "@/actions/jobs";

interface PageProps {
  params: { slug: string };
}

const handleGetJob = cache(async (slug: string) => {
  const job = await getJob(slug);

  if (!job) notFound();

  return job;
});

export default async function Page({ params: { slug } }: PageProps) {
  const job = await handleGetJob(slug);

  return (
    <main className="mx-auto max-w-4xl p-4">
      <div className="h-full">
        <JobDetails job={job} />
      </div>
    </main>
  );
}
