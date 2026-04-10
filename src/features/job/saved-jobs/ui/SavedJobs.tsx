import { SavedJob } from "@/entities/saved-job";
import { SavedJobItem } from "./SavedJobItem";

export function SavedJobs({ savedJobs }: { savedJobs: SavedJob[] }) {
  return (
    <>
      {savedJobs.map((savedJob) => (
        <SavedJobItem savedJob={savedJob} key={savedJob.id} />
      ))}
    </>
  );
}
