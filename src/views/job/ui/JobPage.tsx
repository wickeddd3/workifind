import { notFound } from "next/navigation";

import {
  buildJobPostingSchema,
  getJobBySlug,
  JobDescription,
  JobHeader,
} from "@/entities/job";
import { JsonLd } from "@/shared/ui/JsonLd";
import { JobActions } from "@/widgets/job-actions";

export async function JobPage({ slug }: { slug: string }) {
  const job = await getJobBySlug(slug);
  if (!job) notFound();

  // No auth read here: everything on this page is the same for every visitor,
  // which is what lets the route be prerendered. `JobActions` resolves the
  // viewer's own state on the client.
  return (
    // No `h-full`/`grow`: combined with the vertical margin the card measured
    // taller than the space available to it and ran under the footer, while a
    // short posting stretched to fill the viewport with empty card.
    <section className="mx-3 my-6 w-full max-w-4xl space-y-5 rounded-2xl border border-border bg-card p-6 shadow-card md:mx-auto md:my-10 md:p-8">
      <JsonLd data={buildJobPostingSchema(job)} />
      <JobHeader job={job} optionSlot={<JobActions job={job} />} />
      <JobDescription description={job.description} />
    </section>
  );
}
