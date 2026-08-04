import { X } from "lucide-react";
import Link from "next/link";

import {
  buildProfessionalsFilterUrl,
  type ProfessionalSearchKey,
  type ProfessionalSearchParams,
} from "../lib/professional-search-url";

function activeChips(searchParams: ProfessionalSearchParams) {
  const {
    q,
    location,
    employmentType,
    locationType,
    availability,
    experienced,
  } = searchParams;

  const chips: { key: ProfessionalSearchKey; label: string }[] = [];
  if (q) chips.push({ key: "q", label: `“${q}”` });
  if (location) chips.push({ key: "location", label: `in ${location}` });
  if (employmentType)
    chips.push({ key: "employmentType", label: `Open to ${employmentType}` });
  if (locationType) chips.push({ key: "locationType", label: locationType });
  if (availability)
    chips.push({ key: "availability", label: `Available ${availability}` });
  if (experienced) chips.push({ key: "experienced", label: experienced });

  return chips;
}

/**
 * The filters currently narrowing the results, each removable on its own — the
 * only visible record of an applied filter once the bar scrolls away.
 */
export function ActiveFilters({
  searchParams,
}: {
  searchParams: ProfessionalSearchParams;
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
          href={buildProfessionalsFilterUrl(searchParams, { [key]: undefined })}
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
          href="/professionals/search"
          scroll={false}
          className="rounded-full px-2 py-1 text-xs font-semibold text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
        >
          Clear all
        </Link>
      )}
    </div>
  );
}
