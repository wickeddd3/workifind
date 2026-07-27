import type { EmployerJob } from "@/entities/job";

import { JobItem } from "./JobItem";

export function Jobs({ jobs }: { jobs: EmployerJob[] }) {
  return (
    <>
      {jobs.map((job) => (
        <JobItem job={job} key={job.id} />
      ))}
    </>
  );
}
