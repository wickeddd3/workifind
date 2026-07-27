import type { JobApplicationWithJob } from "@/entities/job-application";

import { AppliedJobItem } from "./AppliedJobItem";

export function AppliedJobs({
  jobApplications,
}: {
  jobApplications: JobApplicationWithJob[];
}) {
  return (
    <>
      {jobApplications.map((jobApplication) => (
        <AppliedJobItem
          jobApplication={jobApplication}
          key={jobApplication.id}
        />
      ))}
    </>
  );
}
