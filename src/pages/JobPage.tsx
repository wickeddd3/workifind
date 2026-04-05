import { notFound } from "next/navigation";
import { getJobDetailsBySlug, JobDescription, JobHeader } from "@/entities/job";

export async function JobPage({ slug }: { slug: string }) {
  const job = await getJobDetailsBySlug(slug);

  if (!job) notFound();

  return (
    <section className="mx-auto h-full w-full max-w-4xl grow space-y-5 p-4">
      <JobHeader job={job} />
      <JobDescription description={job.description} />
    </section>
  );
}
