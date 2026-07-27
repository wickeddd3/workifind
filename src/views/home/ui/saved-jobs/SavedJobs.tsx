import { Bookmark } from "lucide-react";

import type { SavedJob } from "@/entities/saved-job";
import { ViewMoreButton } from "@/shared/ui/ViewMoreButton";

import { SavedJobList } from "./SavedJobList";

export function SavedJobs({ savedJobs }: { savedJobs: SavedJob[] }) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="flex items-center gap-2 text-md font-semibold text-gray-900 md:text-lg lg:text-xl">
        <Bookmark size={20} className="text-indigo-600" aria-hidden="true" />
        Saved jobs
      </h2>
      <SavedJobList savedJobs={savedJobs} />
      <ViewMoreButton text="View all" route="/applicant/jobs/saved" />
    </div>
  );
}
