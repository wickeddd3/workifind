import { JobItem } from "./JobItem";
import type { EmployerJob } from "@/entities/job";

export function Jobs({ jobs }: { jobs: EmployerJob[] }) {
  return (
    <>
      {jobs.map((job) => (
        <JobItem job={job} key={job.id} />
      ))}
    </>
  );
}
