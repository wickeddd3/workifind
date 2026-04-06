import { getJobDetailsBySlug, JobDescription, JobHeader } from "@/entities/job";
import { JobSelectedEmptyPlaceholder } from "./JobSelectedEmptyPlaceholder";

export async function JobSelected({ slug }: { slug: string }) {
  const job = await getJobDetailsBySlug(slug);

  return (
    <div className="m-auto h-full w-full">
      {job && (
        <div>
          <JobHeader job={job} />
          <JobDescription description={job.description} />
        </div>
      )}
      {!job && <JobSelectedEmptyPlaceholder />}
    </div>
  );
}
