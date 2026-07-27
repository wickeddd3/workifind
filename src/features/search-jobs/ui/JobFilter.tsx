"use client";

import { SearchIcon, SlidersHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import {
  EMPLOYMENT_TYPES,
  JOB_SALARY,
  LOCATION_TYPES,
} from "@/shared/constants/tags";
import { useSearchHistory } from "@/shared/lib/use-search-history";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import SimpleSelect from "@/shared/ui/simple-select";

import { JobFilterSchema } from "./../model/schema";

export function JobFilter({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const router = useRouter();

  // The three dropdowns are collapsed behind a toggle on small screens. Four
  // stacked controls filled a phone viewport entirely, so the first job sat
  // below the fold on the page whose whole purpose is listing jobs.
  const [showRefinements, setShowRefinements] = useState(false);

  const activeRefinements = [
    searchParams.employmentType,
    searchParams.salary,
    searchParams.locationType,
  ].filter(Boolean).length;

  // The detail pane sticks below this bar, and the bar's height changes with
  // the breakpoint and with the refinements being open — a fixed offset left
  // the pane sliding underneath it. Publish the measured height so the pane's
  // own offset and max-height can be derived from one source.
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = barRef.current;
    if (!node) return;

    const publishHeight = () => {
      document.documentElement.style.setProperty(
        "--filter-bar-h",
        `${node.getBoundingClientRect().height}px`,
      );
    };

    publishHeight();
    const observer = new ResizeObserver(publishHeight);
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const { saveSearchFilter } = useSearchHistory({
    localStorageName: "workifind.search-history",
  });

  async function handleFilterJobs(formData: FormData) {
    const values = Object.fromEntries(formData.entries());
    const { q, employmentType, salary, locationType } =
      JobFilterSchema.parse(values);
    const queryParams = new URLSearchParams({
      ...(q && { q: q.trim() }),
      ...(employmentType && { employmentType }),
      ...(salary && { salary }),
      ...(locationType && { locationType }),
      // Ordering is a view preference, so it survives a new search.
      ...(searchParams.sort && { sort: searchParams.sort }),
    });
    const searchFilter = `/jobs?${queryParams.toString()}`;
    const searchTitle = q?.trim();

    router.push(searchFilter);
    saveSearchFilter({ searchFilter, searchTitle });
  }

  return (
    <div ref={barRef} className="border-b border-border bg-card">
      <form
        action={handleFilterJobs}
        key={JSON.stringify(searchParams)}
        className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-4 lg:py-5"
      >
        {/* Keywords and submit stay on one line at every size — this is the
            control people came to use. */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Label htmlFor="q" className="sr-only">
              Keywords
            </Label>
            <SearchIcon
              size={18}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              id="q"
              name="q"
              placeholder="Search by job title, company, or keyword"
              className="h-12 w-full rounded-xl pl-11 text-sm"
              defaultValue={searchParams.q}
            />
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowRefinements((open) => !open)}
              aria-expanded={showRefinements}
              aria-controls="job-refinements"
              className="h-12 shrink-0 gap-2 rounded-xl px-4 lg:hidden"
            >
              <SlidersHorizontal size={16} aria-hidden="true" />
              Filters
              {activeRefinements > 0 && (
                <span className="tabular inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-2xs font-bold text-primary-foreground">
                  {activeRefinements}
                </span>
              )}
            </Button>
            <Button className="h-12 flex-1 gap-2 rounded-xl px-6 sm:flex-none">
              <SearchIcon size={16} aria-hidden="true" />
              <span className="text-sm font-semibold">Search</span>
            </Button>
          </div>
        </div>

        <div
          id="job-refinements"
          className={cn(
            "grid-cols-1 gap-3 sm:grid-cols-3",
            // Always laid out on large screens; toggled below that.
            showRefinements ? "grid" : "hidden lg:grid",
          )}
        >
          <div className="flex w-full flex-col gap-1.5">
            <Label
              htmlFor="employmentType"
              className="text-xs font-medium text-muted-foreground"
            >
              Job type
            </Label>
            <SimpleSelect
              id="employmentType"
              name="employmentType"
              className="h-10 w-full text-sm"
              defaultValue={searchParams.employmentType || ""}
            >
              <option value="">Any job type</option>
              {EMPLOYMENT_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </SimpleSelect>
          </div>

          <div className="flex w-full flex-col gap-1.5">
            <Label
              htmlFor="salary"
              className="text-xs font-medium text-muted-foreground"
            >
              Minimum salary
            </Label>
            <SimpleSelect
              id="salary"
              name="salary"
              className="h-10 w-full text-sm"
              defaultValue={searchParams.salary || ""}
            >
              <option value="">Any salary</option>
              {JOB_SALARY.map((salary) => (
                <option key={salary.value} value={salary.value}>
                  From {salary.name}
                </option>
              ))}
            </SimpleSelect>
          </div>

          <div className="flex w-full flex-col gap-1.5">
            <Label
              htmlFor="locationType"
              className="text-xs font-medium text-muted-foreground"
            >
              Work arrangement
            </Label>
            <SimpleSelect
              id="locationType"
              name="locationType"
              className="h-10 w-full text-sm"
              defaultValue={searchParams.locationType || ""}
            >
              <option value="">Any arrangement</option>
              {LOCATION_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </SimpleSelect>
          </div>
        </div>
      </form>
    </div>
  );
}
