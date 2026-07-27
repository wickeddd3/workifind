import { notFound } from "next/navigation";

import { getJobBySlug, JobDescription, JobHeader } from "@/entities/job";
import { getAuthUser } from "@/shared/lib/clerk.server";
import { buildJobPostingSchema } from "@/shared/lib/structured-data";
import { JsonLd } from "@/shared/ui/JsonLd";
import { JobActions } from "@/widgets/job-actions";

export async function JobPage({ slug }: { slug: string }) {
  // Independent lookups — the Clerk round trip overlaps the job query instead
  // of queueing behind it.
  const [job, { role, userId }] = await Promise.all([
    getJobBySlug(slug),
    getAuthUser(),
  ]);

  if (!job) notFound();

  return (
    <section className="mx-3 my-6 h-full w-full max-w-4xl grow space-y-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-card md:mx-auto md:p-8">
      <JsonLd data={buildJobPostingSchema(job)} />
      <JobHeader
        job={job}
        optionSlot={<JobActions job={job} role={role} userId={userId} />}
      />
      <JobDescription description={job.description} />
    </section>
  );
}
