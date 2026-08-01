import type { JobApplicationWithJob } from "@/entities/job-application";

import { AppliedJobItem } from "./AppliedJobItem";

/** A list of results is a list — it gives assistive tech the item count. */
export function AppliedJobs({
  jobApplications,
}: {
  jobApplications: JobApplicationWithJob[];
}) {
  return (
    <ul className="flex flex-col gap-3">
      {jobApplications.map((jobApplication) => (
        <li key={jobApplication.id}>
          <AppliedJobItem jobApplication={jobApplication} />
        </li>
      ))}
    </ul>
  );
}
