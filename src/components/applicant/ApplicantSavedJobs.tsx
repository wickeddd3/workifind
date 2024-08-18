import { Job, SavedJob } from "@prisma/client";
import ApplicantSavedJobItem from "@/components/applicant/ApplicantSavedJobItem";

interface ApplicantSavedJobsProps {
  savedJobs: (SavedJob & { job: Job })[];
}

export default function ApplicantSavedJobs({
  savedJobs,
}: ApplicantSavedJobsProps) {
  return (
    <main className="m-auto space-y-6 px-4">
      <h1 className="px-4 text-xl font-medium">Saved jobs</h1>
      <div className="flex flex-col gap-2">
        {savedJobs.map((savedJob) => (
          <ApplicantSavedJobItem savedJob={savedJob} key={savedJob.id} />
        ))}
      </div>
    </main>
  );
}
