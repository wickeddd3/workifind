import { Banknote, Briefcase, Clock, MapPin } from "lucide-react";
import Image from "next/image";

import { getJobSalaryCompact, hasJobSalary, type Job } from "@/entities/job";
import { DEFAULT_COMPANY_LOGO } from "@/shared/constants/logo";
import { cn } from "@/shared/lib/utils";
import { relativeDate } from "@/shared/utils/format-date";

/** A listing posted within this window earns the "New" flag. */
const NEW_JOB_DAYS = 3;

function isRecentlyPosted(createdAt: Date) {
  const ageInDays = (Date.now() - new Date(createdAt).getTime()) / 86_400_000;
  return ageInDays <= NEW_JOB_DAYS;
}

export function JobItem({
  job: {
    title,
    employmentType,
    locationType,
    location,
    createdAt,
    minSalary,
    maxSalary,
    employer: { companyName, companyLogoUrl },
  },
  isSelected = false,
}: {
  job: Job;
  isSelected?: boolean;
}) {
  // A fully-remote job stores "Remote" as both the arrangement and the place,
  // which rendered as "Remote · Remote". Collapse the duplicate.
  const place = location && location !== locationType ? location : null;
  const showSalary = hasJobSalary(minSalary, maxSalary);
  const isNew = createdAt ? isRecentlyPosted(createdAt) : false;

  return (
    <article
      className={cn(
        "group relative flex gap-3.5 overflow-hidden rounded-2xl border bg-card p-4 transition-all duration-200",
        isSelected
          ? "border-primary/40 shadow-selected"
          : "border-border shadow-soft hover:-translate-y-0.5 hover:border-ink-300 hover:shadow-card-hover",
      )}
    >
      {/* Selection is carried by a rail rather than a fill, so text contrast
          stays identical whether or not the row is the active one. */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute left-0 top-4 h-[calc(100%-2rem)] w-1 rounded-r-full bg-primary transition-opacity duration-200",
          isSelected ? "opacity-100" : "opacity-0",
        )}
      />

      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-muted">
        <Image
          src={companyLogoUrl || DEFAULT_COMPANY_LOGO}
          alt={`${companyName} logo`}
          width={48}
          height={48}
          className="h-full w-full object-contain"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3
              className={cn(
                "truncate text-sm font-semibold transition-colors lg:text-md",
                isSelected
                  ? "text-primary"
                  : "text-foreground group-hover:text-primary",
              )}
            >
              {title}
            </h3>
            <p className="truncate text-xs font-medium text-muted-foreground lg:text-sm">
              {companyName}
            </p>
          </div>
          {isNew && (
            <span className="shrink-0 rounded-full bg-feature-subtle px-2 py-0.5 text-2xs font-bold uppercase tracking-wide text-feature-subtle-foreground">
              New
            </span>
          )}
        </div>

        {/* Salary leads the meta and carries the only strong weight in it — it
            is the figure people scan a results list for. */}
        {showSalary && (
          <p className="tabular flex items-center gap-1.5 text-sm font-semibold text-foreground">
            <Banknote
              size={15}
              className="shrink-0 text-muted-foreground"
              aria-hidden="true"
            />
            {getJobSalaryCompact(minSalary, maxSalary)}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground lg:text-sm">
          {employmentType && (
            <span className="flex items-center gap-1">
              <Briefcase size={14} className="shrink-0" aria-hidden="true" />
              {employmentType}
            </span>
          )}
          {locationType && (
            <span className="flex items-center gap-1">
              <MapPin size={14} className="shrink-0" aria-hidden="true" />
              {locationType}
            </span>
          )}
          {place && <span className="min-w-0 truncate">{place}</span>}
          {createdAt && (
            <span className="ml-auto flex shrink-0 items-center gap-1 text-muted-foreground/80">
              <Clock size={14} className="shrink-0" aria-hidden="true" />
              {relativeDate(createdAt)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
