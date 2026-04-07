import { SavedJob } from "@/entities/job";
import { SavedJobListItem } from "./SavedJobListItem";

export function SavedJobList({ savedJobs }: { savedJobs: SavedJob[] }) {
  return (
    <div className="flex w-full flex-wrap justify-between gap-3">
      {savedJobs.map((savedJob) => (
        <SavedJobListItem savedJob={savedJob} key={savedJob.id} />
      ))}
    </div>
  );
}
