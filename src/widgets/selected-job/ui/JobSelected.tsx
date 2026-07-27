import { getJobBySlug, JobDescription, JobHeader } from "@/entities/job";
import { getAuthUser } from "@/shared/lib/clerk.server";
import { JobActions } from "@/widgets/job-actions";

import { EmptyPlaceholder } from "./EmptyPlaceholder";

export async function JobSelected({ slug }: { slug: string }) {
  if (!slug) return <EmptyPlaceholder />;

  // Independent lookups — the Clerk round trip overlaps the job query instead
  // of queueing behind it.
  const [job, { role, userId }] = await Promise.all([
    getJobBySlug(slug),
    getAuthUser(),
  ]);

  if (!job) return <EmptyPlaceholder />;

  return (
    <div className="m-auto h-full w-full">
      <div className="flex flex-col gap-4">
        <JobHeader
          job={job}
          optionSlot={<JobActions job={job} role={role} userId={userId} />}
        />
        <JobDescription description={job.description} />
      </div>
    </div>
  );
}
