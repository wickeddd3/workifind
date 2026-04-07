import { JobApplication } from "../model/types";
import { JobApplicationItem } from "./JobApplicationItem";

export function JobApplications({
  jobApplications,
}: {
  jobApplications: JobApplication[];
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
