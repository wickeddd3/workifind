import { BriefcaseBusiness } from "lucide-react";
import Link from "next/link";

import { getCompanyJobs, JobCard } from "@/entities/job";
import { EmptyState } from "@/shared/ui/EmptyState";

/**
 * How many roles the profile lists. A company with more than this is rare
 * enough that paging the tab is not worth it — the extras are one search away.
 */
const MAX_LISTED_JOBS = 24;

/**
 * A company's open roles, on its public profile.
 *
 * The same card the search results and the home page use, so a role looks the
 * same wherever a candidate meets it.
 */
export async function CompanyJobs({
  employerId,
  companyName,
}: {
  employerId: number;
  companyName: string;
}) {
  // One over the cap, which is what tells a full page apart from an exact
  // match without paying for a second count query.
  const found = await getCompanyJobs(employerId, MAX_LISTED_JOBS + 1);
  const jobs = found.slice(0, MAX_LISTED_JOBS);
  const hasMore = found.length > MAX_LISTED_JOBS;

  if (jobs.length === 0) {
    return (
      <EmptyState
        icon={BriefcaseBusiness}
        title="No open roles right now"
        description={`${companyName} isn't hiring at the moment. Browse the rest of the board in the meantime.`}
        action={{ label: "Browse all jobs", href: "/jobs" }}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        {hasMore
          ? `The ${jobs.length} most recent roles at ${companyName}.`
          : `${jobs.length} open ${jobs.length === 1 ? "role" : "roles"} at ${companyName}.`}
      </p>
      <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {jobs.map((job) => (
          <li key={job.id}>
            <Link
              href={`/jobs/${job.slug}`}
              className="block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <JobCard job={job} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
