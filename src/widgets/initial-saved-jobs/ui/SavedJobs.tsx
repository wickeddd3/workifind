import { SavedJob } from "@/entities/job";
import { SavedJobList } from "./SavedJobList";
import { ViewMoreButton } from "@/shared/ui/ViewMoreButton";

export function SavedJobs({ savedJobs }: { savedJobs: SavedJob[] }) {
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
