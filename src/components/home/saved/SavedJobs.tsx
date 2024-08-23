import ViewMoreButton from "@/components/ViewMoreButton";
import SavedJobList from "@/components/home/saved/SavedJobList";
import { Employer, Job, SavedJob } from "@prisma/client";

interface SavedJobsProps {
  savedJobs: (SavedJob & { job: Job & { employer: Employer } })[];
}

export default function SavedJobs({ savedJobs }: SavedJobsProps) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-gray-900">Saved jobs</h1>
      <SavedJobList savedJobs={savedJobs} />
      <ViewMoreButton text="View all" route="" />
    </div>
  );
}
