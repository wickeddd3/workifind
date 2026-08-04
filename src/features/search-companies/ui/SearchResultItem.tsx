import { Briefcase, Globe, MapPin } from "lucide-react";

import { type Company } from "@/entities/employer";
import { cn } from "@/shared/lib/utils";
import { Avatar } from "@/shared/ui/avatar";

/**
 * One company in the results list.
 *
 * The card used to be a logo, a name and two grey lines. It now leads with what
 * a company is actually being scanned for — whether they are hiring, and what
 * they say about themselves — because "12 jobs" against a name is the whole
 * reason to click one of these.
 */
export function SearchResultItem({
  company: {
    companyName,
    companyLogoUrl,
    companyWebsite,
    industry,
    location,
    pitch,
    about,
    jobsCount,
  },
  isSelected = false,
}: {
  company: Company;
  isSelected?: boolean;
}) {
  // The pitch is the one-liner an employer writes for exactly this slot; `about`
  // is the long form, used only as a fallback so a card is never blank.
  const summary = pitch?.trim() || about?.trim();
  const isHiring = jobsCount > 0;

  return (
    <article
      className={cn(
        "flex gap-4 rounded-2xl border bg-card p-4 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card",
        isSelected
          ? "border-primary/60 ring-1 ring-primary/30"
          : "border-border hover:border-primary/40",
      )}
    >
      <Avatar name={companyName} src={companyLogoUrl} size={56} />

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="min-w-0 truncate text-sm font-semibold text-foreground md:text-md">
            {companyName}
          </h3>
          <span
            className={cn(
              "tabular shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold",
              isHiring
                ? "bg-primary/10 text-primary"
                : "bg-muted text-muted-foreground",
            )}
          >
            {isHiring
              ? `${jobsCount} ${jobsCount === 1 ? "job" : "jobs"}`
              : "No open roles"}
          </span>
        </div>

        {industry && (
          <p className="truncate text-xs font-medium text-muted-foreground md:text-sm">
            {industry}
          </p>
        )}

        {summary && (
          <p className="line-clamp-2 text-xs text-muted-foreground md:text-sm">
            {summary}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          {location && (
            <span className="flex min-w-0 items-center gap-1.5">
              <MapPin size={13} className="shrink-0" aria-hidden="true" />
              <span className="truncate">{location}</span>
            </span>
          )}
          {companyWebsite && (
            <span className="flex min-w-0 items-center gap-1.5">
              <Globe size={13} className="shrink-0" aria-hidden="true" />
              <span className="truncate">
                {/* Host only: a full URL wraps the row and adds nothing a
                    reader needs at this size. */}
                {companyWebsite.replace(/^https?:\/\/(www\.)?/, "")}
              </span>
            </span>
          )}
          {isHiring && (
            <span className="flex items-center gap-1.5">
              <Briefcase size={13} className="shrink-0" aria-hidden="true" />
              Hiring now
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
