import SavedJobListItem from "@/components/home/saved/SavedJobListItem";
import { Employer, Job, SavedJob } from "@prisma/client";

interface SavedJobListProps {
  savedJobs: (SavedJob & { job: Job & { employer: Employer } })[];
}

export default function SavedJobList({ savedJobs }: SavedJobListProps) {
  return (
    <div className="flex w-full flex-wrap justify-between gap-4">
      {savedJobs.map((savedJob) => (
        <SavedJobListItem savedJob={savedJob} key={savedJob.id} />
      ))}
    </div>
  );
}
