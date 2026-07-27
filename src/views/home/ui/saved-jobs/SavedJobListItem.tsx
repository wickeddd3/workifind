import { Bookmark } from "lucide-react";
import Link from "next/link";

import type { SavedJob } from "@/entities/saved-job";

export function SavedJobListItem({
  savedJob: {
    job: {
      slug,
      title,
      employer: { companyName },
    },
  },
}: {
  savedJob: SavedJob;
}) {
  return (
    <Link href={`/jobs/${slug}`} className="w-full md:w-[48%]">
      <div className="flex h-full items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-200 hover:shadow-card-hover">
        <div className="flex min-w-0 flex-1 flex-col">
          <h3 className="truncate text-sm font-semibold text-gray-900 md:text-md">
            {title}
          </h3>
          <p className="truncate text-xs font-medium text-gray-500 md:text-sm">
            {companyName}
          </p>
        </div>
        <Bookmark
          size={18}
          className="shrink-0 fill-indigo-600 text-indigo-600"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}
