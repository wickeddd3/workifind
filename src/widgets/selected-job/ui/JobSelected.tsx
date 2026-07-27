import { getJobBySlug, JobDescription, JobHeader } from "@/entities/job";
import { JobActions } from "@/widgets/job-actions";

import { EmptyPlaceholder } from "./EmptyPlaceholder";

export async function JobSelected({ slug }: { slug: string }) {
  if (!slug) return <EmptyPlaceholder />;

  const job = await getJobBySlug(slug);
  if (!job) return <EmptyPlaceholder />;

  return (
    <div className="m-auto h-full w-full">
      <div className="flex flex-col gap-4">
        <JobHeader job={job} optionSlot={<JobActions job={job} />} />
        <JobDescription description={job.description} />
      </div>
    </div>
  );
}
