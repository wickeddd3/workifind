import { notFound } from "next/navigation";

import { getJobBySlug, JobDescription, JobHeader } from "@/entities/job";
import { buildJobPostingSchema } from "@/shared/lib/structured-data";
import { JsonLd } from "@/shared/ui/JsonLd";
import { JobActions } from "@/widgets/job-actions";

export async function JobPage({ slug }: { slug: string }) {
  const job = await getJobBySlug(slug);
  if (!job) notFound();

  // No auth read here: everything on this page is the same for every visitor,
  // which is what lets the route be prerendered. `JobActions` resolves the
  // viewer's own state on the client.
  return (
    <section className="mx-3 my-6 h-full w-full max-w-4xl grow space-y-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-card md:mx-auto md:p-8">
      <JsonLd data={buildJobPostingSchema(job)} />
      <JobHeader job={job} optionSlot={<JobActions job={job} />} />
      <JobDescription description={job.description} />
    </section>
  );
}
