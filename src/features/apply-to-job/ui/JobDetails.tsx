import { ArrowRight } from "lucide-react";
import Link from "next/link";

import type { Job } from "@/entities/job";
import { Avatar } from "@/shared/ui/avatar";

export function JobDetails({
  job: {
    slug,
    title,
    employer: { companyName, companyLogoUrl },
  },
}: {
  job: Job;
}) {
  return (
    <div className="flex items-center gap-4">
      <Avatar
        name={companyName}
        src={companyLogoUrl}
        size={72}
        className="rounded-2xl"
      />
      <div className="flex min-w-0 flex-col gap-0.5">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Applying for
        </p>
        <h1 className="truncate text-lg font-bold text-foreground md:text-xl lg:text-2xl">
          {title}
        </h1>
        <p className="truncate text-sm font-medium text-muted-foreground md:text-md">
          {companyName}
        </p>
        <Link
          href={`/jobs/${slug}`}
          className="mt-1 inline-flex w-fit items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-primary md:text-sm"
        >
          View job description
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
