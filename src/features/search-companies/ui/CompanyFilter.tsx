"use client";

import { MapPin, SearchIcon, SlidersHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { INDUSTRY_TYPES } from "@/shared/constants/tags";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import SimpleSelect from "@/shared/ui/simple-select";

import { buildCompaniesFilterUrl } from "../lib/company-search-url";
import { CompanyFilterSchema } from "../model/schema";

/**
 * The directory's search bar, built to the same rules as `JobFilter`: "what"
 * and "where" on one line, the rest collapsed behind a toggle below the large
 * breakpoint, and the measured height published as `--filter-bar-h` so the
 * detail pane can stick clear of it.
 */
export function CompanyFilter({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const router = useRouter();

  const [showRefinements, setShowRefinements] = useState(false);

  const activeRefinements = [searchParams.industry, searchParams.hiring].filter(
    Boolean,
  ).length;

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
    const parsed = CompanyFilterSchema.parse(values);

    router.push(
      buildCompaniesFilterUrl(
        // Ordering is a view preference, so it survives a new search; the
        // previewed company does not, since it may not be in the new results.
        { sort: searchParams.sort },
        {
          ...parsed,
          // An unchecked checkbox submits nothing at all, so the parsed value
          // is `undefined` and the key drops out of the URL on its own.
          hiring: parsed.hiring ? "1" : undefined,
          company: undefined,
        },
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
              placeholder="Company name or what they do"
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
              aria-controls="company-refinements"
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
          id="company-refinements"
          className={cn(
            "grid-cols-1 items-end gap-3 sm:grid-cols-2",
            showRefinements ? "grid" : "hidden lg:grid",
          )}
        >
          <div className="flex w-full flex-col gap-1.5">
            <Label
              htmlFor="industry"
              className="text-xs font-medium text-muted-foreground"
            >
              Industry
            </Label>
            <SimpleSelect
              id="industry"
              name="industry"
              className="h-10 w-full text-sm"
              defaultValue={searchParams.industry || ""}
            >
              <option value="">Any industry</option>
              {INDUSTRY_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </SimpleSelect>
          </div>

          <label
            htmlFor="hiring"
            className="flex h-10 w-fit cursor-pointer items-center gap-2.5 rounded-xl border border-border px-3.5 text-sm font-medium text-foreground transition-colors hover:border-primary/40"
          >
            <input
              type="checkbox"
              id="hiring"
              name="hiring"
              defaultChecked={searchParams.hiring === "1"}
              className="h-4 w-4 rounded border-border accent-primary"
            />
            Hiring now
          </label>
        </div>
      </form>
    </div>
  );
}
