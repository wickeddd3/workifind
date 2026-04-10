import { JobItem } from "./JobItem";
import Link from "next/link";
import type { Job } from "@/entities/job";

interface JobResultsProps {
  jobs: Job[];
  searchParams: Record<string, string>;
  page?: number;
}

export function JobResults({ jobs, searchParams, page }: JobResultsProps) {
  const { q, employmentType, salary, locationType } = searchParams;

  function getLinkUrl(jobSlug: string): string {
    const searchParams = new URLSearchParams({
      ...(q && { q: q.trim() }),
      ...(employmentType && { employmentType }),
      ...(salary && { salary }),
      ...(locationType && { locationType }),
      ...(jobSlug && { job: jobSlug }),
      ...(page && { page: page.toString() }),
    });

    return `/jobs?${searchParams.toString()}`;
  }

  return (
    <div className="flex flex-col gap-3">
      {jobs.map((job) => (
        <Link
          href={getLinkUrl(job.slug)}
          scroll={false}
          key={job.id}
          className="block"
          passHref
          legacyBehavior
        >
          <JobItem job={job} />
        </Link>
      ))}
    </div>
  );
}
