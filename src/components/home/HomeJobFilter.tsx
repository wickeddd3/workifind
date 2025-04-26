"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SimpleSelect from "@/components/ui/simple-select";
import useSearchHistory from "@/hooks/useSearchHistory";
import { JOB_SALARY, EMPLOYMENT_TYPES, LOCATION_TYPES } from "@/constants/tags";
import { JobFilterSchema, JobFilterSchemaType } from "@/schema/job-filter";
import { useRouter } from "next/navigation";
import { BriefcaseBusiness, PlusIcon, SearchIcon } from "lucide-react";
import Image from "next/image";

interface HomeJobFilterProps {
  defaultValues: JobFilterSchemaType;
}

export default function HomeJobFilter({ defaultValues }: HomeJobFilterProps) {
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
            <div className="flex items-center gap-2">
              <BriefcaseBusiness size={20} color="#4635c1" />
              <h6 className="text-sm font-medium text-gray-700 md:text-md lg:text-lg">
                Find the best jobs in workifind
              </h6>
            </div>
            <h1 className="w-full text-balance text-3xl font-bold text-gray-900 md:text-4xl md:leading-[4rem] lg:text-5xl">
              Connecting talents with opportunities
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
                <PlusIcon size={24} color="#ffffff" />
              </div>
            </div>
            <div className="flex flex-col">
              <h6 className="flex items-center text-xl font-extrabold leading-4 text-gray-800">
                12K
                <PlusIcon size={20} color="#000000" />
              </h6>
              <h6 className="text-sm font-medium text-gray-600">
                Company jobs
              </h6>
            </div>
          </div>
          <div className="h-full w-full rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 p-[3px]">
            <form
              action={handleFilterJobs}
              key={JSON.stringify(defaultValues)}
              className="h-full w-full rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
            >
              <div className="w-full space-y-4">
                <div className="grid w-full grid-cols-1 items-center gap-2 md:grid-cols-3">
                  <div className="flex w-full flex-col gap-3">
                    <Label
                      htmlFor="employmentType"
                      className="font-medium text-gray-500"
                    >
                      Job type
                    </Label>
                    <SimpleSelect
                      id="employmentType"
                      name="employmentType"
                      className="h-10 w-full pr-12 text-sm"
                      defaultValue={defaultValues.employmentType || ""}
                    >
                      <option value="">Select job type</option>
                      {EMPLOYMENT_TYPES.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </SimpleSelect>
                  </div>
                  <div className="flex w-full flex-col gap-3">
                    <Label
                      htmlFor="salary"
                      className="font-medium text-gray-500"
                    >
                      Job salary
                    </Label>
                    <SimpleSelect
                      id="salary"
                      name="salary"
                      className="h-10 w-full pr-12 text-sm"
                      defaultValue={defaultValues.salary || ""}
                    >
                      <option value="">Select job salary</option>
                      {JOB_SALARY.map((salary) => (
                        <option key={salary.value} value={salary.value}>
                          {salary.name}
                        </option>
                      ))}
                    </SimpleSelect>
                  </div>
                  <div className="flex w-full flex-col gap-3">
                    <Label
                      htmlFor="locationType"
                      className="font-medium text-gray-500"
                    >
                      Location type
                    </Label>
                    <SimpleSelect
                      id="locationType"
                      name="locationType"
                      className="h-10 w-full pr-12 text-sm"
                      defaultValue={defaultValues.locationType || ""}
                    >
                      <option value="">Select location type</option>
                      {LOCATION_TYPES.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </SimpleSelect>
                  </div>
                </div>
                <div className="flex w-full flex-col items-end justify-between gap-2 md:flex-row">
                  <div className="flex w-full flex-col gap-3">
                    <Label htmlFor="q" className="font-medium text-gray-500">
                      Keywords
                    </Label>
                    <Input
                      id="q"
                      name="q"
                      placeholder="Search by job title"
                      className="w-full text-sm placeholder:text-sm placeholder:text-gray-900"
                      defaultValue={defaultValues.q}
                    />
                  </div>
                  <Button className="mt-3 flex w-full items-center gap-2 rounded-full bg-emerald-500 shadow-sm hover:bg-emerald-600 md:my-0 md:w-fit">
                    <SearchIcon size={18} color="#ffffff" strokeWidth={3} />
                    <span className="text-sm font-bold uppercase tracking-wider text-white">
                      Search
                    </span>
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="hidden h-[540px] w-full bg-colored-shapes bg-left bg-no-repeat lg:block lg:w-2/5"></div>
      </div>
    </aside>
  );
}
