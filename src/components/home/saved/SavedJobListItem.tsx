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
    <Link href={`/jobs/${slug}`} className="h-[100px] w-full md:w-[48%]">
      <div className="flex h-full w-full cursor-pointer flex-col justify-center rounded-xl border-2 border-gray-100 bg-white p-4 hover:bg-gray-50">
        <h2 className="truncate text-lg font-medium">{title}</h2>
        <h3 className="text-md truncate font-medium text-muted-foreground">
          {companyName}
        </h3>
      </div>
    </Link>
  );
}
