import type { Job } from "@/entities/job";
import { JobCard } from "@/entities/job";

import { buildJobsUrl } from "../lib/job-search-url";
import { JobCardLink } from "./JobCardLink";

interface JobResultsProps {
  jobs: Job[];
  searchParams: Record<string, string>;
  page?: number;
}

export function JobResults({ jobs, searchParams, page }: JobResultsProps) {
  const { job: selectedSlug } = searchParams;

  /**
   * The current filter state, with `job` swapped to the previewed listing.
   *
   * Built from the shared helper rather than re-listing the params by hand:
   * the hand-rolled version had to be extended for every new facet, and
   * forgetting one meant clicking a card silently dropped that filter.
   */
  function getPreviewUrl(jobSlug: string): string {
    return buildJobsUrl(searchParams, {
      job: jobSlug,
      page: page?.toString(),
    });
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
            <JobCard job={job} isSelected={job.slug === selectedSlug} />
          </JobCardLink>
        </li>
      ))}
    </ul>
  );
}
