import JobDetails from "@/components/jobs/JobDetails";
import { cache } from "react";
import { notFound } from "next/navigation";
import { findJobBySlug } from "@/app/_services/job";

interface PageProps {
  params: { slug: string };
}

const handleFetchJob = cache(async (slug: string) => {
  return await findJobBySlug(slug);
});

export default async function Page({ params: { slug } }: PageProps) {
  const job = await handleFetchJob(slug);

  if (!job) notFound();

  return (
    <main className="mx-auto max-w-4xl p-4">
      <div className="h-full">
        <JobDetails job={job} />
      </div>
    </main>
  );
}
