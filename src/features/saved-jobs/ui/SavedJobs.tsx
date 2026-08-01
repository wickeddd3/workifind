import { type SavedJob } from "@/entities/saved-job";

import { SavedJobItem } from "./SavedJobItem";

/** A list of results is a list — it gives assistive tech the item count. */
export function SavedJobs({ savedJobs }: { savedJobs: SavedJob[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {savedJobs.map((savedJob) => (
        <li key={savedJob.id}>
          <SavedJobItem savedJob={savedJob} />
        </li>
      ))}
    </ul>
  );
}
