import JobItem from "@/components/jobs/JobItem";
import Link from "next/link";
import { JobFilterValues } from "@/lib/validation";
import { Job, Employer } from "@prisma/client";

interface JobResultsProps {
  jobs: (Job & { employer: Employer })[];
  filterValues: JobFilterValues;
  page?: number;
}

export default function JobResults({
  jobs,
  filterValues,
  page,
}: JobResultsProps) {
  const { q, employmentType, salary, locationType } = filterValues;

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
    <>
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
    </>
  );
}
