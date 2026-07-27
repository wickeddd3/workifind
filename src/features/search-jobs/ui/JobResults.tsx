import type { Job } from "@/entities/job";

import { JobCardLink } from "./JobCardLink";
import { JobItem } from "./JobItem";

interface JobResultsProps {
  jobs: Job[];
  searchParams: Record<string, string>;
  page?: number;
}

export function JobResults({ jobs, searchParams, page }: JobResultsProps) {
  const {
    q,
    employmentType,
    salary,
    locationType,
    sort,
    job: selectedSlug,
  } = searchParams;

  /** The current filter state, with `job` swapped to the previewed listing. */
  function getPreviewUrl(jobSlug: string): string {
    const params = new URLSearchParams({
      ...(q && { q: q.trim() }),
      ...(employmentType && { employmentType }),
      ...(salary && { salary }),
      ...(locationType && { locationType }),
      ...(sort && { sort }),
      ...(jobSlug && { job: jobSlug }),
      ...(page && { page: page.toString() }),
    });

    return `/jobs?${params.toString()}`;
  }

  // A list of results is a list: it gives assistive tech the item count and
  // lets users jump between rows.
  return (
    <ul className="flex flex-col gap-3">
      {jobs.map((job) => (
        <li key={job.id}>
          <JobCardLink
            href={`/jobs/${job.slug}`}
            previewHref={getPreviewUrl(job.slug)}
            isSelected={job.slug === selectedSlug}
          >
            <JobItem job={job} isSelected={job.slug === selectedSlug} />
          </JobCardLink>
        </li>
      ))}
    </ul>
  );
}
