"use client";

import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  EMPLOYMENT_TYPES,
  JOB_SALARY,
  LOCATION_TYPES,
} from "@/shared/constants/tags";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import SimpleSelect from "@/shared/ui/simple-select";
import { useSearchHistory } from "@/widgets/search-history";

import { JobFilterSchema } from "./../model/schema";

export function JobFilter({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const router = useRouter();

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
    });
    const searchFilter = `/jobs?${queryParams.toString()}`;
    const searchTitle = q?.trim();

    router.push(searchFilter);
    saveSearchFilter({ searchFilter, searchTitle });
  }

  return (
    <aside className="mx-auto flex h-full w-full max-w-7xl flex-col gap-4 px-4 pt-6 lg:py-12">
      <h2 className="text-lg font-semibold text-gray-900">
        Find the best jobs in workifind
      </h2>
      <form
        action={handleFilterJobs}
        key={JSON.stringify(searchParams)}
        className="w-full rounded-2xl border border-gray-100 bg-white p-4 shadow-card"
      >
        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:items-end">
          <div className="flex w-full flex-col gap-2">
            <Label
              htmlFor="employmentType"
              className="font-medium text-gray-700"
            >
              Job type
            </Label>
            <SimpleSelect
              id="employmentType"
              name="employmentType"
              className="h-10 w-full text-sm"
              defaultValue={searchParams.employmentType || ""}
            >
              <option value="">Select job type</option>
              {EMPLOYMENT_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </SimpleSelect>
          </div>
          <div className="flex w-full flex-col gap-2">
            <Label htmlFor="salary" className="font-medium text-gray-700">
              Salary
            </Label>
            <SimpleSelect
              id="salary"
              name="salary"
              className="h-10 w-full text-sm"
              defaultValue={searchParams.salary || ""}
            >
              <option value="">Select salary</option>
              {JOB_SALARY.map((salary) => (
                <option key={salary.value} value={salary.value}>
                  {salary.name}
                </option>
              ))}
            </SimpleSelect>
          </div>
          <div className="flex w-full flex-col gap-2">
            <Label htmlFor="locationType" className="font-medium text-gray-700">
              Location
            </Label>
            <SimpleSelect
              id="locationType"
              name="locationType"
              className="h-10 w-full text-sm"
              defaultValue={searchParams.locationType || ""}
            >
              <option value="">Select location</option>
              {LOCATION_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </SimpleSelect>
          </div>
          <div className="flex w-full flex-col gap-2">
            <Label htmlFor="q" className="font-medium text-gray-700">
              Keywords
            </Label>
            <div className="relative">
              <SearchIcon
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                aria-hidden="true"
              />
              <Input
                id="q"
                name="q"
                placeholder="Search by job title"
                className="w-full pl-9 text-sm"
                defaultValue={searchParams.q}
              />
            </div>
          </div>
          <Button className="flex h-10 w-full items-center gap-2 sm:col-span-2 lg:col-span-1">
            <SearchIcon size={16} aria-hidden="true" />
            <span className="text-sm font-semibold">Search</span>
          </Button>
        </div>
      </form>
    </aside>
  );
}
