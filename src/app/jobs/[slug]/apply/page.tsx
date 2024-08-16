import { getJob } from "@/actions/jobs";
import JobApplicationForm from "@/components/jobs/JobApplicationForm";
import { notFound } from "next/navigation";
import { cache } from "react";

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
        <JobApplicationForm job={job} />
      </div>
    </main>
  );
}
