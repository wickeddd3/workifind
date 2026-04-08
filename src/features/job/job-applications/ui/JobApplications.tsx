import { JobApplication } from "@/entities/job-application";
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
