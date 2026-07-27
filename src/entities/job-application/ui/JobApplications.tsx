import type { JobApplicationWithApplicant } from "../model/types";
import { JobApplicationItem } from "./JobApplicationItem";

export function JobApplications({
  jobApplications,
}: {
  jobApplications: JobApplicationWithApplicant[];
}) {
  return (
    <div className="flex flex-col gap-4">
      {jobApplications.map((jobApplication) => (
        <JobApplicationItem
          jobApplication={jobApplication}
          key={jobApplication.id}
        />
      ))}
    </div>
  );
}
