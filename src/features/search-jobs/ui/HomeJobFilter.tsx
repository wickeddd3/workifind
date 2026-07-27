"use client";

import { BriefcaseBusiness, SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";

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

import { JobFilterSchema, type JobFilterSchemaType } from "./../model/schema";

const TRUST_AVATARS = [
  { initials: "AM", className: "bg-brand-500" },
  { initials: "JD", className: "bg-brand-700" },
  { initials: "SK", className: "bg-feature" },
  { initials: "RL", className: "bg-ink-700" },
];

export function HomeJobFilter({
  defaultValues,
}: {
  defaultValues?: JobFilterSchemaType;
}) {
  const router = useRouter();

  const { saveSearchFilter } = useSearchHistory({
    localStorageName: "workifind.search-history",
  });

  async function handleFilterJobs(formData: FormData) {
    const values = Object.fromEntries(formData.entries());
    const { q, employmentType, salary, locationType } =
      JobFilterSchema.parse(values);
    const searchParams = new URLSearchParams({
      ...(q && { q: q.trim() }),
      ...(employmentType && { employmentType }),
      ...(salary && { salary }),
      ...(locationType && { locationType }),
    });
    const searchFilter = `/jobs?${searchParams.toString()}`;
    const searchTitle = q?.trim();

    router.push(searchFilter);
    saveSearchFilter({ searchFilter, searchTitle });
  }

  return (
    <aside
      // Tinted from `primary` rather than a fixed brand-50: a literal light
      // step washed the hero out to pale grey under the dark theme and all but
      // hid the badge on it.
      className="w-full border-b border-border bg-gradient-to-b from-primary/[0.07] to-background py-10 md:py-14"
      data-testid="home-job-filter"
    >
      {/* Centred rather than a left column beside artwork: the previous layout
          held open a 540px decorative block that pushed the hero tall and left
          a wide empty band beside the copy. */}
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 px-3 text-center">
        <div className="flex w-full flex-col items-center gap-3">
          <div className="flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5">
            <BriefcaseBusiness
              size={16}
              className="text-primary"
              aria-hidden="true"
            />
            <p className="text-xs font-semibold text-primary md:text-sm">
              Your next opportunity awaits
            </p>
          </div>
          <h1 className="w-full text-balance text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Connecting talent with opportunity
          </h1>
          {/* The headline alone left the reader to infer what the product
                does; this says it. */}
          <p className="max-w-xl text-balance text-md text-muted-foreground md:text-lg">
            Search thousands of roles from companies hiring now, and apply in a
            couple of clicks.
          </p>
        </div>

        <form
          action={handleFilterJobs}
          key={JSON.stringify(defaultValues)}
          className="w-full space-y-3 rounded-2xl border border-border bg-card p-4 text-left shadow-card"
        >
          {/* Keywords and submit lead: the selects only narrow what this
                finds. */}
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
                data-testid="keywords-input"
                placeholder="Job title, company, or keyword"
                className="h-12 w-full rounded-xl pl-11 text-sm"
                defaultValue={defaultValues?.q}
              />
            </div>
            <Button
              className="h-12 shrink-0 gap-2 rounded-xl px-6"
              data-testid="search-button"
            >
              <SearchIcon size={16} aria-hidden="true" />
              <span className="text-sm font-semibold">Find jobs</span>
            </Button>
          </div>

          <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
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
                data-testid="job-type-select"
                className="h-10 w-full text-sm"
                defaultValue={defaultValues?.employmentType || ""}
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
                data-testid="job-salary-select"
                className="h-10 w-full text-sm"
                defaultValue={defaultValues?.salary || ""}
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
                data-testid="location-type-select"
                className="h-10 w-full text-sm"
                defaultValue={defaultValues?.locationType || ""}
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

        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {TRUST_AVATARS.map((avatar) => (
              <div
                key={avatar.initials}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full text-2xs font-semibold text-white ring-4 ring-background",
                  avatar.className,
                )}
                aria-hidden="true"
              >
                {avatar.initials}
              </div>
            ))}
            {/* Inverts with the theme — a literal ink-900 disc vanished
                against the dark background. */}
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-2xs font-semibold text-background ring-4 ring-background">
              +2K
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            <span className="font-bold text-foreground">12,000+</span>{" "}
            professionals hired
          </p>
        </div>
      </div>
    </aside>
  );
}
