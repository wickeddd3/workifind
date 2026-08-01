import type { EmployerJob } from "@/entities/job";

import { JobItem } from "./JobItem";

/** A list of results is a list — it gives assistive tech the item count. */
export function Jobs({ jobs }: { jobs: EmployerJob[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {jobs.map((job) => (
        <li key={job.id}>
          <JobItem job={job} />
        </li>
      ))}
    </ul>
  );
}
