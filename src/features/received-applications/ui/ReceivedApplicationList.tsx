import {
  type JobApplicationWithApplicant,
  ReceivedApplicationItem,
} from "@/entities/job-application";

/** A list of results is a list — it gives assistive tech the item count. */
export function ReceivedApplicationList({
  jobApplications,
}: {
  jobApplications: JobApplicationWithApplicant[];
}) {
  return (
    <ul className="flex flex-col gap-3">
      {jobApplications.map((jobApplication) => (
        <li key={jobApplication.id}>
          <ReceivedApplicationItem jobApplication={jobApplication} />
        </li>
      ))}
    </ul>
  );
}
