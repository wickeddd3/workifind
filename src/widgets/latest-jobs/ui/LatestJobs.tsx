import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { getLatestJobs } from "@/entities/job";
import { JobCard } from "@/entities/job";

/**
 * Newest openings on the home page.
 *
 * A job board whose front page carried no jobs asked every visitor to run a
 * search before seeing any of the inventory. These are the same cards the
 * results list uses, so the two surfaces stay in step.
 */
export async function LatestJobs({ limit = 6 }: { limit?: number }) {
  const jobs = await getLatestJobs(limit);

  // The section is the point of the page, but it is not worth an empty shell
  // on a fresh install with nothing posted yet.
  if (jobs.length === 0) return null;

  return (
    <section className="flex w-full flex-col gap-4 py-2 md:py-4">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div className="flex flex-col gap-1">
          <h2 className="text-md font-semibold text-foreground md:text-lg lg:text-xl">
            Latest openings
          </h2>
          <p className="text-sm font-normal text-muted-foreground md:text-md">
            Fresh roles from companies hiring right now.
          </p>
        </div>
        <Link
          href="/jobs"
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline"
        >
          Browse all jobs
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>

      <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
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
    </section>
  );
}
