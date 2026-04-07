import { Job } from "@/entities/job";
import { JobItem } from "./JobItem";

export function Jobs({ jobs }: { jobs: Job[] }) {
  return (
    <>
      {jobs.map((job) => (
        <JobItem job={job} key={job.id} />
      ))}
    </>
  );
}
