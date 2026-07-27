import type { JobApplicationWithApplicant } from "../model/types";
import { ReceivedApplicationItem } from "./ReceivedApplicationItem";

export function ReceivedApplications({
  jobApplications,
}: {
  jobApplications: JobApplicationWithApplicant[];
}) {
  return (
    <div className="flex flex-col gap-4">
      {jobApplications.map((jobApplication) => (
        <ReceivedApplicationItem
          jobApplication={jobApplication}
          key={jobApplication.id}
        />
      ))}
    </div>
  );
}
