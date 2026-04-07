import { JobApplication } from "@/entities/job";
import { JobApplicationItem } from "./JobApplicationItem";

export function JobApplications({
  jobApplications,
}: {
  jobApplications: JobApplication[];
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
