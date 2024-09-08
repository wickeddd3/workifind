import { cache } from "react";
import { notFound } from "next/navigation";
import JobSelectedDetails from "@/components/jobs/JobSelectedDetails";
import JobSelectedEmptyPlaceholder from "@/components/jobs/JobSelectedEmptyPlaceholder";
import { getJob } from "@/actions/jobs";

interface PageProps {
  jobSlug: string | undefined;
}

const handleGetJob = cache(async (slug: string | undefined) => {
  if (!slug) return null;

  const job = await getJob(slug);

  if (!job) notFound();

  return job;
});

export default async function JobSelected({ jobSlug }: PageProps) {
  const job = await handleGetJob(jobSlug);

  return (
    <section className="sticky top-0 hidden h-fit rounded-xl bg-background py-2 md:block md:w-3/5">
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
