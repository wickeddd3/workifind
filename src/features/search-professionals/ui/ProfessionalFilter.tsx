"use client";

import { MapPin, SearchIcon, SlidersHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import {
  AVAILABILITY_TYPES,
  EMPLOYMENT_TYPES,
  LOCATION_TYPES,
  WORK_EXPERIENCE_TYPES,
} from "@/shared/constants/tags";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import SimpleSelect from "@/shared/ui/simple-select";

import { buildProfessionalsFilterUrl } from "../lib/professional-search-url";
import { ProfessionalFilterSchema } from "../model/schema";

/**
 * The directory's search bar, built to the same rules as `JobFilter`: "who" and
 * "where" on one line, the rest of the facets collapsed behind a toggle below
 * the large breakpoint, and the measured bar height published so the detail
 * pane can stick clear of it.
 */
export function ProfessionalFilter({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const router = useRouter();

  const [showRefinements, setShowRefinements] = useState(false);

  const activeRefinements = [
    searchParams.employmentType,
    searchParams.locationType,
    searchParams.availability,
    searchParams.experienced,
  ].filter(Boolean).length;

  // Shared with the jobs page by name on purpose: only one filter bar is ever
  // mounted, and the detail pane's offset reads the same custom property
  // whichever search the visitor is on.
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

  function handleFilter(formData: FormData) {
    const values = Object.fromEntries(formData.entries());
    const parsed = ProfessionalFilterSchema.parse(values);

    router.push(
      buildProfessionalsFilterUrl(
        // Ordering is a view preference, so it survives a new search; the
        // previewed profile does not, since it may not be in the new results.
        { sort: searchParams.sort },
        { ...parsed, professional: undefined },
      ),
    );
  }

  return (
    <div ref={barRef} className="border-b border-border bg-card">
      <form
        action={handleFilter}
        key={JSON.stringify(searchParams)}
        className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-4 lg:py-5"
      >
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
              placeholder="Profession, skill, or name"
              className="h-12 w-full rounded-xl pl-11 text-sm"
              defaultValue={searchParams.q}
            />
          </div>
          <div className="relative flex-1 sm:max-w-xs">
            <Label htmlFor="location" className="sr-only">
              Location
            </Label>
            <MapPin
              size={18}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              id="location"
              name="location"
              placeholder="City or region"
              className="h-12 w-full rounded-xl pl-11 text-sm"
              defaultValue={searchParams.location}
            />
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowRefinements((open) => !open)}
              aria-expanded={showRefinements}
              aria-controls="professional-refinements"
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
          id="professional-refinements"
          className={cn(
            "grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4",
            showRefinements ? "grid" : "hidden lg:grid",
          )}
        >
          <div className="flex w-full flex-col gap-1.5">
            <Label
              htmlFor="employmentType"
              className="text-xs font-medium text-muted-foreground"
            >
              Open to
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

          <div className="flex w-full flex-col gap-1.5">
            <Label
              htmlFor="availability"
              className="text-xs font-medium text-muted-foreground"
            >
              Available
            </Label>
            <SimpleSelect
              id="availability"
              name="availability"
              className="h-10 w-full text-sm"
              defaultValue={searchParams.availability || ""}
            >
              <option value="">Any notice period</option>
              {AVAILABILITY_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </SimpleSelect>
          </div>

          <div className="flex w-full flex-col gap-1.5">
            <Label
              htmlFor="experienced"
              className="text-xs font-medium text-muted-foreground"
            >
              Experience
            </Label>
            <SimpleSelect
              id="experienced"
              name="experienced"
              className="h-10 w-full text-sm"
              defaultValue={searchParams.experienced || ""}
            >
              <option value="">Any experience</option>
              {WORK_EXPERIENCE_TYPES.map((type) => (
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
