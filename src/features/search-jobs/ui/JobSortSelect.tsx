"use client";

import { ArrowUpDown } from "lucide-react";
import { useRouter } from "next/navigation";

import SimpleSelect from "@/shared/ui/simple-select";

import {
  buildJobsFilterUrl,
  type JobSearchParams,
} from "../lib/job-search-url";

const SORT_OPTIONS = [
  { value: "newest", label: "Most recent" },
  { value: "salary", label: "Highest paying" },
];

export function JobSortSelect({
  searchParams,
}: {
  searchParams: JobSearchParams;
}) {
  const router = useRouter();

  return (
    <div className="flex shrink-0 items-center gap-2">
      <label
        htmlFor="sort"
        className="hidden items-center gap-1.5 text-sm text-muted-foreground sm:flex"
      >
        <ArrowUpDown size={14} aria-hidden="true" />
        Sort by
      </label>
      <SimpleSelect
        id="sort"
        name="sort"
        className="h-9 w-auto min-w-[9.5rem] text-sm"
        defaultValue={searchParams.sort || "newest"}
        onChange={(event) =>
          // Reset to page 1: a re-sorted set has different contents on page 4.
          router.push(
            buildJobsFilterUrl(searchParams, {
              sort: event.currentTarget.value,
            }),
            { scroll: false },
          )
        }
      >
        {SORT_OPTIONS.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </SimpleSelect>
    </div>
  );
}
