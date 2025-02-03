import { Job, SavedJob } from "@prisma/client";
import ApplicantSavedJobItem from "@/components/applicant/ApplicantSavedJobItem";

interface ApplicantSavedJobsProps {
  savedJobs: (SavedJob & { job: Job })[];
}

export default function ApplicantSavedJobs({
  savedJobs,
}: ApplicantSavedJobsProps) {
  return (
    <>
      {savedJobs.map((savedJob) => (
        <ApplicantSavedJobItem savedJob={savedJob} key={savedJob.id} />
      ))}
    </>
  );
}
