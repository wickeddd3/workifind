import { Employer, Job, SavedJob } from "@prisma/client";
import Link from "next/link";

interface SavedJobListItemProps {
  savedJob: SavedJob & { job: Job & { employer: Employer } };
}

export default function SavedJobListItem({
  savedJob: {
    job: {
      slug,
      title,
      employer: { companyName },
    },
  },
}: SavedJobListItemProps) {
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
