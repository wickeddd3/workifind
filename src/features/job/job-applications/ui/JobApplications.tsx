import type { JobApplicationWithJob } from "@/entities/job-application";

import { JobApplicationItem } from "./JobApplicationItem";

export function JobApplications({
  jobApplications,
}: {
  jobApplications: JobApplicationWithJob[];
}) {
  return (
    <>
      {jobApplications.map((jobApplication) => (
        <JobApplicationItem
          jobApplication={jobApplication}
          key={jobApplication.id}
        />
      ))}
    </>
  );
}
