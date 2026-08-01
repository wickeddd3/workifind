import { BadgeCheck, Clock, Mail, MapPin } from "lucide-react";
import Link from "next/link";

import { relativeDate } from "@/shared/utils/format-date";

import type { JobApplicationWithApplicant } from "../model/types";
import { JobApplicationPitch } from "./JobApplicationPitch";

/**
 * One person who applied.
 *
 * Built like the job card the applicant's own lists use — avatar, a title
 * block, a meta row with the date pushed to the end — so the two sides of the
 * same application read the same way.
 *
 * The card is not itself a link, because the pitch expands in place; the name
 * carries the link to the full profile instead. Reaching it at all is new:
 * previously the employer saw a name, a profession and a location, and no way
 * to get to the profile behind them.
 */
export function ReceivedApplicationItem({
  jobApplication: { pitch, createdAt, applicant },
}: {
  jobApplication: JobApplicationWithApplicant;
}) {
  const { id, firstName, lastName, email, location, profession, experienced } =
    applicant;

  const initials =
    `${firstName?.charAt(0) ?? ""}${lastName?.charAt(0) ?? ""}`.toUpperCase();
  // `experienced` holds the label, not a flag — the badge used to render for
  // anyone with a value in the column, so "No experience" showed as
  // "Experienced".
  const hasExperience = experienced === "With experience";

  return (
    <article className="group flex gap-3.5 rounded-2xl border border-border bg-card p-4 shadow-soft transition-all duration-200 hover:border-ink-300 hover:shadow-card-hover">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-semibold text-white">
        {initials}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-foreground lg:text-md">
              <Link
                href={`/professionals/${id}`}
                className="transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background group-hover:text-primary"
              >
                {`${firstName} ${lastName}`}
              </Link>
            </h3>
            {profession && (
              <p className="truncate text-xs font-medium text-muted-foreground lg:text-sm">
                {profession}
              </p>
            )}
          </div>
          {hasExperience && (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-2xs font-bold uppercase tracking-wide text-primary">
              <BadgeCheck size={13} className="shrink-0" aria-hidden="true" />
              Experienced
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground lg:text-sm">
          {location && (
            <span className="flex items-center gap-1">
              <MapPin size={14} className="shrink-0" aria-hidden="true" />
              {location}
            </span>
          )}
          {email && (
            // The employer's next move after reading a pitch is to write back,
            // and the address was not on the card at all.
            <a
              href={`mailto:${email}`}
              className="flex min-w-0 items-center gap-1 transition-colors hover:text-primary"
            >
              <Mail size={14} className="shrink-0" aria-hidden="true" />
              <span className="truncate">{email}</span>
            </a>
          )}
          <span className="ml-auto flex shrink-0 items-center gap-1 text-muted-foreground/80">
            <Clock size={14} className="shrink-0" aria-hidden="true" />
            Applied {relativeDate(createdAt)}
          </span>
        </div>

        <JobApplicationPitch pitch={pitch} />
      </div>
    </article>
  );
}
