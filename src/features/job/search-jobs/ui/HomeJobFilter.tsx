"use client";

import { BriefcaseBusiness, PlusIcon, SearchIcon } from "lucide-react";
import Image from "next/image";
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

import { JobFilterSchema, type JobFilterSchemaType } from "./../model/schema";

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
      className="h-full w-full py-8 md:py-12"
      data-testid="home-job-filter"
    >
      <div className="mx-auto flex h-full w-full max-w-7xl">
        <div className="flex w-full flex-col gap-4 px-3 lg:w-3/5 lg:gap-14">
          <div className="flex w-full flex-col gap-4">
            <div className="flex w-fit items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3.5 py-1.5">
              <BriefcaseBusiness
                size={18}
                className="text-indigo-600"
                aria-hidden="true"
              />
              <p className="text-xs font-semibold text-indigo-700 md:text-sm">
                Your next opportunity awaits
              </p>
            </div>
            <h1 className="w-full text-balance text-3xl font-bold tracking-tight text-gray-900 md:text-4xl md:leading-[4rem] lg:text-5xl">
              Connecting talent with opportunity
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2 overflow-hidden">
              <Image
                className="inline-block h-11 w-11 rounded-full ring-4 ring-white"
                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                width={44}
                height={44}
                alt="Employer 1"
              />
              <Image
                className="inline-block h-11 w-11 rounded-full ring-4 ring-white"
                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                width={44}
                height={44}
                alt="Employer 2"
              />
              <Image
                className="inline-block h-11 w-11 rounded-full ring-4 ring-white"
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                width={44}
                height={44}
                alt="Employer 3"
              />
              <Image
                className="inline-block h-11 w-11 rounded-full ring-4 ring-white"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                width={44}
                height={44}
                alt="Employer 4"
              />
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-indigo-600 text-xs font-medium text-white">
                <PlusIcon size={24} className="text-white" aria-hidden="true" />
              </div>
            </div>
            <div className="flex flex-col">
              <p className="flex items-center text-xl font-extrabold leading-4 text-gray-800">
                12K
                <PlusIcon
                  size={20}
                  className="text-gray-800"
                  aria-hidden="true"
                />
              </p>
              <p className="text-sm font-medium text-gray-600">
                Open positions
              </p>
            </div>
          </div>
          <form
            action={handleFilterJobs}
            key={JSON.stringify(defaultValues)}
            className="w-full space-y-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-card"
          >
            <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-3">
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
                  data-testid="job-type-select"
                  className="h-10 w-full text-sm"
                  defaultValue={defaultValues?.employmentType || ""}
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
                  data-testid="job-salary-select"
                  className="h-10 w-full text-sm"
                  defaultValue={defaultValues?.salary || ""}
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
                <Label
                  htmlFor="locationType"
                  className="font-medium text-gray-700"
                >
                  Location
                </Label>
                <SimpleSelect
                  id="locationType"
                  name="locationType"
                  data-testid="location-type-select"
                  className="h-10 w-full text-sm"
                  defaultValue={defaultValues?.locationType || ""}
                >
                  <option value="">Select location</option>
                  {LOCATION_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </SimpleSelect>
              </div>
            </div>
            <div className="flex w-full flex-col items-end justify-between gap-3 md:flex-row">
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
                    data-testid="keywords-input"
                    placeholder="Search by job title"
                    className="w-full pl-9 text-sm"
                    defaultValue={defaultValues?.q}
                  />
                </div>
              </div>
              <Button
                className="flex h-10 w-full items-center gap-2 md:w-fit"
                data-testid="search-button"
              >
                <SearchIcon size={16} aria-hidden="true" />
                <span className="text-sm font-semibold">Find jobs</span>
              </Button>
            </div>
          </form>
        </div>
        <div className="hidden h-[540px] w-full bg-colored-shapes bg-left bg-no-repeat lg:block lg:w-2/5"></div>
      </div>
    </aside>
  );
}
