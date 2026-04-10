import type { SavedJob } from "@/entities/saved-job";
import Link from "next/link";

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
    <Link href={`/jobs/${slug}`} className="h-full w-full md:w-[48%]">
      <div className="flex h-full w-full cursor-pointer flex-col justify-center rounded-xl border border-gray-100 bg-white p-4 hover:bg-gray-50">
        <h2 className="truncate text-sm font-medium text-gray-900 md:text-md">
          {title}
        </h2>
        <h3 className="truncate text-xs font-medium text-gray-500 md:text-sm">
          {companyName}
        </h3>
      </div>
    </Link>
  );
}
