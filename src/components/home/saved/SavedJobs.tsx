import ViewMoreButton from "@/components/ViewMoreButton";
import SavedJobList from "@/components/home/saved/SavedJobList";
import { Employer, Job, SavedJob } from "@prisma/client";

interface SavedJobsProps {
  savedJobs: (SavedJob & { job: Job & { employer: Employer } })[];
}

export default function SavedJobs({ savedJobs }: SavedJobsProps) {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-md font-semibold text-gray-900 md:text-lg lg:text-xl">
        Saved jobs
      </h1>
      <SavedJobList savedJobs={savedJobs} />
      <ViewMoreButton text="View all" route="/applicant/jobs/saved" />
    </div>
  );
}
