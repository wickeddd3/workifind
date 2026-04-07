import { SavedJob } from "../model/types";
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
