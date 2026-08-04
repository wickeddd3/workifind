import { ArrowUpRight, BriefcaseBusiness } from "lucide-react";
import Link from "next/link";

import {
  EmployerHeader,
  EmployerOverview,
  EmployerPerkList,
  EmployerRichText,
  getEmployerBySlug,
} from "@/entities/employer";
import { getCompanyJobs, JobCard } from "@/entities/job";

import { EmptyPlaceholder } from "./EmptyPlaceholder";

/**
 * How many roles the preview lists before deferring to the full page. Small on
 * purpose — the pane is a decision aid, not the company's profile.
 */
const MAX_PREVIEW_JOBS = 5;

/**
 * The previewed company beside the results list.
 *
 * Flattened rather than tabbed, unlike the full page: a tab strip inside a
 * preview asks the reader to navigate within something they opened to skim, and
 * the two most-asked questions — what do they do, and what are they hiring for
 * — should both be answerable by scrolling.
 */
export async function CompanySelected({ slug }: { slug?: string }) {
  if (!slug) return <EmptyPlaceholder />;

  const employer = await getEmployerBySlug(slug);
  if (!employer) return <EmptyPlaceholder />;

  const jobs = await getCompanyJobs(employer.id, MAX_PREVIEW_JOBS);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <EmployerHeader
          companyName={employer.companyName}
          companyEmail={employer.companyEmail}
          companyWebsite={employer.companyWebsite}
          companyLogoUrl={employer.companyLogoUrl}
        />
        <Link
          href={`/companies/${employer.slug}`}
          className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline"
        >
          Open full profile
          <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </div>

      <EmployerOverview
        industry={employer.industry}
        location={employer.location}
      />

      {employer.about?.trim() && (
        <PaneSection title="About">
          <EmployerRichText>{employer.about}</EmployerRichText>
        </PaneSection>
      )}

      {employer.pitch?.trim() && (
        <PaneSection title="Why join us">
          <EmployerRichText>{employer.pitch}</EmployerRichText>
        </PaneSection>
      )}

      {employer.perks.length > 0 && (
        <PaneSection title="Perks">
          <EmployerPerkList perks={employer.perks} />
        </PaneSection>
      )}

      <PaneSection title="Open roles">
        {jobs.length === 0 ? (
          <p className="flex items-center gap-2 rounded-xl border border-dashed border-border bg-muted/40 px-3 py-2.5 text-sm text-muted-foreground">
            <BriefcaseBusiness
              size={15}
              className="shrink-0"
              aria-hidden="true"
            />
            No open roles right now.
          </p>
        ) : (
          <ul className="flex flex-col gap-3">
            {jobs.map((job) => (
              <li key={job.id}>
                <Link
                  href={`/jobs/${job.slug}`}
                  className="block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <JobCard job={job} />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </PaneSection>
    </div>
  );
}

/**
 * A heading and its block. Deliberately not `ProfileSection`: that renders its
 * own bordered card, and the pane is already one — nesting the two read as a
 * box inside a box down the whole column.
 */
function PaneSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </h3>
      {children}
    </section>
  );
}
