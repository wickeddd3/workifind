import { X } from "lucide-react";
import Link from "next/link";

import { JOB_SALARY } from "@/shared/constants/tags";

import {
  buildJobsFilterUrl,
  type JobSearchKey,
  type JobSearchParams,
} from "../lib/job-search-url";

/** Reads back a salary bound as its band label rather than the raw figure. */
function salaryLabel(value: string) {
  const band = JOB_SALARY.find((item) => item.value.toString() === value);
  return band ? `From ${band.name}` : `From ${value}`;
}

function activeChips(searchParams: JobSearchParams) {
  const { q, location, employmentType, salary, locationType, industry } =
    searchParams;

  const chips: { key: JobSearchKey; label: string }[] = [];
  if (q) chips.push({ key: "q", label: `“${q}”` });
  if (location) chips.push({ key: "location", label: `in ${location}` });
  if (employmentType)
    chips.push({ key: "employmentType", label: employmentType });
  if (locationType) chips.push({ key: "locationType", label: locationType });
  if (industry) chips.push({ key: "industry", label: industry });
  if (salary) chips.push({ key: "salary", label: salaryLabel(salary) });

  return chips;
}

/**
 * The filters currently narrowing the results, each removable on its own.
 *
 * Without this the only record of an applied filter was the form control's own
 * value, which scrolls out of view — people could not see why a result set had
 * gone thin.
 */
export function ActiveFilters({
  searchParams,
}: {
  searchParams: JobSearchParams;
}) {
  const chips = activeChips(searchParams);
  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-medium text-muted-foreground">
        Filtered by
      </span>
      {chips.map(({ key, label }) => (
        <Link
          key={key}
          href={buildJobsFilterUrl(searchParams, { [key]: undefined })}
          scroll={false}
          className="group inline-flex items-center gap-1.5 rounded-full border border-border bg-card py-1 pl-3 pr-2 text-xs font-medium text-foreground shadow-soft transition-colors hover:border-primary/40 hover:text-primary"
        >
          {label}
          <X
            size={13}
            className="text-muted-foreground transition-colors group-hover:text-primary"
            aria-hidden="true"
          />
          <span className="sr-only">Remove filter</span>
        </Link>
      ))}
      {chips.length > 1 && (
        <Link
          href="/jobs"
          scroll={false}
          className="rounded-full px-2 py-1 text-xs font-semibold text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
        >
          Clear all
        </Link>
      )}
    </div>
  );
}
